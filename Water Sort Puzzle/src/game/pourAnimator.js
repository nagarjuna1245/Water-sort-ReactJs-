import { lipPoint, VIEW_W, VIEW_H } from './glassGeometry.js';
import { glassOutline, spillAngle } from './liquidMath.js';
import { getColor } from './colors.js';
import { drawTube, liquidSurfacePoint } from '../components/containers/tubeDraw.js';
import { drawStream, drawDroplets, launchVelocity, streamPoint, GRAVITY } from '../components/effects/streamDraw.js';

/**
 * The physical pour: lift → top line → travel → settle over the target → hold →
 * tilt to the spill angle → pour → hold → untilt → fly home → settle.
 *
 * `animatePour(sourceIndex, destIndex, amount, color)` resolves when the tube is
 * back in its slot. It reads the bottle arrays through `readContainers` but never
 * writes them; the caller commits the move after the await. Every frame is
 * delta-timed from requestAnimationFrame, and no setTimeout is involved.
 */

const easeInOutSine = (p) => -(Math.cos(Math.PI * p) - 1) / 2;
const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);
const easeInOutCubic = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const lerp = (a, b, p) => a + (b - a) * p;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rand = (a, b) => a + Math.random() * (b - a);

const PHASES = ['lift', 'travel', 'hold', 'tilt', 'pour', 'hold2', 'untilt', 'retx', 'rety', 'settle'];

export const createPourAnimator = ({ getTube, listTubes, getOverlay, getCeiling, readContainers, hooks = {} }) => {
  let current = null;

  const cancel = () => {
    if (!current) return;
    const anim = current;
    current = null;
    cancelAnimationFrame(anim.raf);
    anim.finish();
  };

  const animatePour = (sourceIndex, destIndex, amount, color) =>
    new Promise((resolve) => {
      // Never leave an older pour orphaned: it would never resolve and the
      // caller would block input forever.
      if (current) current.finish();
      const src = getTube(sourceIndex);
      const dst = getTube(destIndex);
      const overlay = getOverlay();
      const bottles = readContainers();
      if (!src?.canvas || !dst?.canvas || !overlay || !bottles?.[sourceIndex] || !bottles?.[destIndex]) {
        resolve();
        return;
      }

      const srcBottle = bottles[sourceIndex];
      const dstBottle = bottles[destIndex];
      const srcLen = srcBottle.length;
      const dstLen = dstBottle.length;
      const units = clamp(Math.round(amount), 1, 4);
      const srcPost = srcBottle.slice(0, Math.max(0, srcLen - units));
      const dstDisplay = [...dstBottle];
      for (let i = 0; i < units; i++) dstDisplay.push(color);

      const srcRect = src.slot.getBoundingClientRect();
      const dstRect = dst.slot.getBoundingClientRect();
      const box = overlay.getBoundingClientRect();
      const ctx = overlay.getContext('2d');

      // Which way the tube leans, and the mouth corner it pivots on.
      const dir = dstRect.left + dstRect.width / 2 >= srcRect.left + srcRect.width / 2 ? 1 : -1;
      const lipDesign = lipPoint(src.glass, dir);
      const lipPx = { x: (lipDesign.x / VIEW_W) * src.cssW, y: (lipDesign.y / VIEW_H) * src.cssH };
      src.flyer.style.transformOrigin = `${lipPx.x}px ${lipPx.y}px`;
      src.flyer.style.willChange = 'transform';
      src.slot.style.zIndex = '30';

      const cap = glassOutline(src.glass.d, src.glass.fillTop);
      const unitArea = cap.area / 4;
      // Physics sets the angle; a visible lean is required even when the tube is
      // so full that gravity alone would only need a few degrees.
      const tiltFor = (level) =>
        clamp(Math.max(24, spillAngle({ pts: cap.pts, pivot: lipDesign, volume: level, unitArea, dir })), 24, 72);
      const tiltFrom = tiltFor(srcLen);

      // Stream coordinates live in overlay space.
      const lipNow = () => ({
        x: srcRect.left - box.left + lipPx.x + anim.sourceX,
        y: srcRect.top - box.top + lipPx.y + anim.sourceY,
      });
      const landNow = (landed) => {
        const p = liquidSurfacePoint(dst.glass, dstDisplay, dstLen + landed);
        return {
          x: dstRect.left - box.left + (p.x / VIEW_W) * dst.cssW,
          y: dstRect.top - box.top + (p.y / VIEW_H) * dst.cssH,
        };
      };

      // Where the lip sits while the tube still rests in its own slot.
      const lipRestY = srcRect.top - box.top + lipPx.y;
      const firstLand = landNow(0);
      // Hover line: high enough that the tube's bottom clears every other tube,
      // but never above the play area.
      let highest = Infinity;
      for (const t of listTubes()) {
        if (t.index !== sourceIndex) highest = Math.min(highest, t.rect.top);
      }
      if (!Number.isFinite(highest)) highest = srcRect.top;
      const clearY = highest - 6 - srcRect.height - srcRect.top;
      // Flight must stay inside the board's play area, never climbing behind
      // the HUD. If that leaves no room to clear the rows, the flyer simply
      // glides over them (it renders above every slot).
      const ceilingY = ((getCeiling?.() ?? box.top + 4) + 4) - srcRect.top;
      const lineY = Math.min(0, Math.max(clearY, ceilingY));
      // The pouring pose: the lip hangs just above the destination's opening.
      // The tube is still upright when it arrives at the hover line, so it only
      // dips into this pose as it leans and the body swings clear.
      const mouthGap = clamp(dst.cssH * 0.24, 20, 44);
      const dstRimY = dstRect.top - box.top + (dst.glass.rim.y / VIEW_H) * dst.cssH;
      const lipPoseY = dstRimY - mouthGap - lipRestY;
      // It may never sit higher than the hover line, nor sink past the target.
      const sinkLimit = dstRect.bottom - 6 - srcRect.bottom;
      const pourY = clamp(lipPoseY, lineY, Math.max(lineY, sinkLimit));
      // The tube parks centred over the destination, then slides the last bit so
      // its lip hangs directly above the opening as it leans in.
      const dstCentre = dstRect.left + dstRect.width / 2;
      const hoverX = dstCentre - (srcRect.left + srcRect.width / 2);
      const pourX = dstCentre - (srcRect.left + lipPx.x);
      const glide = (span) => clamp(200 + span * 0.8, 200, 520);

      const anim = {
        // the temporary animation object: visuals only, never game state
        src,
        dst,
        color,
        streamColor: getColor(color),
        amount: units,
        phase: 'lift',
        progress: 0,
        sourceX: 0,
        sourceY: 0,
        rotation: 0,
        poured: 0,
        landed: 0,

        time: 0,
        clock: 0,
        elapsed: 0,
        last: 0,
        raf: 0,
        resolve,
        flow: [],
        drops: [],
        spray: [],
        dripTimer: 0,
        wavePhase: 0,
        waveAmp: 0,
        streamAlpha: 0,
        pourAt: -1,
        splashed: false,
        from: { x: 0, y: 0, rot: 0 },
        geom: { lineY, hoverX, pourX, pourY },
        flight: 0.16,
        durations: {
          lift: clamp(130 + Math.abs(lineY) * 0.45, 160, 300),
          travel: glide(Math.abs(hoverX)),
          hold: 140,
          tilt: 260 + tiltFrom * 1.6,
          pour: 430 + units * 125,
          hold2: 150,
          untilt: 220 + tiltFrom * 1.1,
          retx: glide(Math.abs(pourX)) * 0.82,
          rety: clamp(130 + Math.abs(lineY) * 0.42, 160, 300),
          settle: 250,
        },
      };
      anim.flight = clamp(Math.abs(firstLand.y - lipRestY - pourY) / 1400, 0.09, 0.24);

      const dur = () => anim.durations[anim.phase] || 0;

      const flowAt = (ms) => {
        const f = anim.flow;
        if (!f.length) return 0;
        if (ms <= f[0].t) return f[0].v;
        for (let i = f.length - 1; i >= 0; i--) {
          if (f[i].t <= ms) {
            const a = f[i];
            const b = f[i + 1];
            if (!b) return a.v;
            return lerp(a.v, b.v, (ms - a.t) / Math.max(1, b.t - a.t));
          }
        }
        return f[f.length - 1].v;
      };

      const enterPhase = (phase) => {
        anim.phase = phase;
        anim.progress = 0;
        anim.clock = 0;
        anim.from = { x: anim.sourceX, y: anim.sourceY, rot: anim.rotation };
        // Airborne shadow everywhere except the final settle back into the slot.
        src.flyer.classList.toggle('is-airborne', phase !== 'settle');
        if (phase === 'pour') {
          anim.pourAt = anim.elapsed;
          anim.flow.push({ t: 0, v: anim.poured });
          hooks.onFlowStart?.();
        }
      };

      const finish = () => {
        cancelAnimationFrame(anim.raf);
        anim.sourceX = 0;
        anim.sourceY = 0;
        anim.rotation = 0;
        src.flyer.style.transform = '';
        src.flyer.style.transformOrigin = '';
        src.flyer.style.willChange = '';
        src.flyer.classList.remove('is-airborne');
        src.slot.style.zIndex = '';
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, overlay.width, overlay.height);
        // Land on exactly what the committed state will draw, so nothing pops.
        drawTube(src.canvas, { glass: src.glass, cssW: src.cssW, cssH: src.cssH, layers: srcPost, level: srcPost.length });
        drawTube(dst.canvas, { glass: dst.glass, cssW: dst.cssW, cssH: dst.cssH, layers: dstDisplay, level: dstDisplay.length });
        if (current === anim) current = null;
        resolve();
      };
      anim.finish = finish;

      const advance = () => {
        let next = PHASES.indexOf(anim.phase) + 1;
        while (next < PHASES.length && anim.durations[PHASES[next]] === 0) next++;
        if (next >= PHASES.length) {
          finish();
          return false;
        }
        anim.clock -= dur();
        enterPhase(PHASES[next]);
        return true;
      };

      const applyPhase = () => {
        const p = anim.progress;
        const { lineY: line, hoverX: hx, pourX: tx, pourY: py } = anim.geom;

        switch (anim.phase) {
          case 'lift':
            anim.sourceY = lerp(anim.from.y, line, easeOutCubic(p));
            break;
          case 'travel':
            anim.sourceX = lerp(anim.from.x, hx, easeInOutCubic(p));
            anim.sourceY = line;
            break;
          case 'hold':
            anim.sourceX = hx;
            anim.sourceY = line;
            anim.waveAmp = 0.4;
            break;
          case 'tilt':
            // Lean in first, then let the tube settle down so the lip ends up over
            // the destination's opening: the swinging body always stays clear of it.
            anim.sourceX = lerp(hx, tx, easeInOutCubic(p));
            anim.sourceY = lerp(line, py, p * p);
            anim.rotation = dir * tiltFrom * easeOutCubic(p);
            anim.waveAmp = 0.5 + 1.3 * p;
            break;
          case 'pour': {
            anim.sourceX = tx;
            anim.sourceY = py;
            anim.poured = anim.amount * easeInOutSine(p);
            anim.rotation = dir * tiltFor(Math.max(0.02, srcLen - anim.poured));
            anim.waveAmp = 1.3;
            anim.streamAlpha = Math.min(1, p * 8);
            break;
          }
          case 'hold2':
            anim.poured = anim.amount;
            anim.waveAmp = 1.4 * (1 - p);
            anim.streamAlpha = 1 - easeInOutSine(p);
            break;
          case 'untilt':
            // Straighten while climbing back to the hover line, so the upright
            // glass never hangs down over the destination it just filled.
            anim.poured = anim.amount;
            anim.sourceY = lerp(py, line, easeInOutCubic(p));
            anim.rotation = lerp(anim.from.rot, 0, easeInOutCubic(p));
            anim.waveAmp = 1.5 * (1 - p);
            break;
          case 'retx':
            anim.sourceY = line;
            anim.sourceX = lerp(anim.from.x, 0, easeInOutCubic(p));
            break;
          case 'rety':
            anim.sourceX = 0;
            anim.sourceY = lerp(anim.from.y, 0, easeOutCubic(p));
            anim.waveAmp = 0.5 * (1 - p);
            break;
          case 'settle':
            anim.sourceX = 0;
            anim.sourceY = -2 * Math.sin(p * Math.PI * 2.5) * (1 - p);
            anim.waveAmp = 1.1 * (1 - p);
            break;
          default:
            break;
        }

        const rel = anim.elapsed - anim.pourAt;
        if (anim.pourAt >= 0 && rel >= 0) {
          anim.flow.push({ t: rel, v: anim.poured });
          if (anim.flow.length > 260) anim.flow.shift();
          anim.landed = clamp(flowAt(rel - anim.flight * 1000), 0, anim.amount);
        }
      };

      const rate = () => {
        if (anim.phase === 'pour') return Math.sin(Math.PI * clamp(anim.progress, 0.08, 1));
        if (anim.phase === 'hold2') return Math.max(0, 1 - anim.progress * 2.4);
        return 0;
      };

      const stepParticles = (dt, landY) => {
        const s = dt / 1000;
        const decay = { drops: 1.05, spray: 2.4 };
        const walk = (arr, key) => {
          for (let i = arr.length - 1; i >= 0; i--) {
            const d = arr[i];
            d.vy += GRAVITY * s;
            d.x += d.vx * s;
            d.y += d.vy * s;
            d.life -= s * decay[key];
            if (d.y >= landY) d.life = 0;
            if (d.life <= 0 || d.y > box.height + 60) {
              arr.splice(i, 1);
              continue;
            }
            d.alpha = clamp(d.life, 0, 1);
          }
        };
        walk(anim.drops, 'drops');
        walk(anim.spray, 'spray');
      };

      const drawStreamLayer = (dt, lip, land, flow) => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, box.width, box.height);

        if (anim.streamAlpha > 0.01 && flow > 0) {
          const v0 = launchVelocity(lip, land, anim.flight);
          const headT = clamp((anim.elapsed - anim.pourAt) / (anim.flight * 1000), 0, 1);
          drawStream(ctx, {
            lip,
            v0,
            flight: anim.flight,
            headT,
            color: anim.streamColor,
            width: (2.2 + anim.amount * 0.8) * (0.45 + 0.55 * flow),
            alpha: anim.streamAlpha,
            time: anim.time / 1000,
          });

          anim.dripTimer += dt;
          while (anim.dripTimer > 30) {
            anim.dripTimer -= 30;
            const t = rand(0.08, 0.8) * anim.flight * headT;
            const p = streamPoint(lip, v0, t);
            anim.drops.push({
              x: p.x + rand(-2, 2),
              y: p.y,
              vx: rand(-10, 10),
              vy: rand(10, 60),
              r: rand(0.9, 1.9),
              life: 1,
              alpha: 1,
            });
          }
          if (headT >= 1 && flow > 0.25 && anim.spray.length < 9 && Math.random() < 0.55) {
            anim.spray.push({
              x: land.x + rand(-4, 4),
              y: land.y,
              vx: rand(-80, 80),
              vy: rand(-165, -60),
              r: rand(0.7, 1.5),
              life: 1,
              alpha: 1,
            });
          }
          if (headT >= 1 && !anim.splashed) {
            anim.splashed = true;
            hooks.onSplash?.();
          }
        }

        stepParticles(dt, land.y);
        drawDroplets(ctx, anim.drops, anim.streamColor);
        drawDroplets(ctx, anim.spray, anim.streamColor);
      };

      const drawTubes = () => {
        anim.wavePhase += 0.18;
        drawTube(src.canvas, {
          glass: src.glass,
          cssW: src.cssW,
          cssH: src.cssH,
          layers: srcBottle,
          level: Math.max(0, srcLen - anim.poured),
          angle: anim.rotation,
          wave: { amp: anim.waveAmp, k: 0.4, phase: anim.wavePhase },
        });
        drawTube(dst.canvas, {
          glass: dst.glass,
          cssW: dst.cssW,
          cssH: dst.cssH,
          layers: dstDisplay,
          level: dstLen + anim.landed,
          angle: 0,
          wave: { amp: anim.landed > 0 && anim.landed < anim.amount ? 1.4 : anim.waveAmp * 0.3, k: 0.5, phase: -anim.wavePhase },
          ripple: anim.landed > 0.02 && anim.landed < anim.amount ? { t: (anim.time / 420) % 1 } : null,
        });
      };

      const pose = () => {
        src.flyer.style.transform =
          `translate3d(${anim.sourceX.toFixed(2)}px, ${anim.sourceY.toFixed(2)}px, 0) rotate(${anim.rotation.toFixed(2)}deg)`;
      };

      const tick = (now) => {
        if (current !== anim) return;

        const dt = clamp(now - anim.last, 0, 48);
        anim.last = now;
        anim.time += dt;
        anim.elapsed += dt;
        anim.clock += dt;
        const d = dur();
        anim.progress = d > 0 ? clamp(anim.clock / d, 0, 1) : 1;

        applyPhase();
        pose();
        drawTubes();
        const lip = lipNow();
        drawStreamLayer(dt, lip, landNow(anim.landed), rate());

        if (anim.progress >= 1 && !advance()) return;
        anim.raf = requestAnimationFrame(tick);
      };

      enterPhase('lift');
      pose();
      drawTubes();
      current = anim;
      anim.last = performance.now();
      anim.raf = requestAnimationFrame(tick);
      hooks.onStart?.({ sourceIndex, destIndex, units });
    });

  return { animatePour, cancel };
};
