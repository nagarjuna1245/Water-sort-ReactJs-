import { getColor } from '../../game/colors.js';
import { VIEW_W, VIEW_H } from '../../game/glassGeometry.js';
import {
  glassOutline,
  liquidShape,
  localGravity,
  planeRange,
  solveSurface,
  surfaceSegment,
  waveSurfaceLine,
} from '../../game/liquidMath.js';

const pathCache = new Map();
const pathFor = (d) => {
  let p = pathCache.get(d);
  if (!p) {
    p = new Path2D(d);
    pathCache.set(d, p);
  }
  return p;
};

const prepare = (canvas, cssW, cssH) => {
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  const pw = Math.round(cssW * dpr);
  const ph = Math.round(cssH * dpr);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw;
    canvas.height = ph;
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform((pw / VIEW_W), 0, 0, (ph / VIEW_H), 0, 0);
  ctx.clearRect(-4, -4, VIEW_W + 8, VIEW_H + 8);
  return ctx;
};

/**
 * Paint one container: glass body, geometrically-solved liquid layers, outline,
 * rim, reflections. Everything is drawn in the 64 x 144 design space.
 *
 * @param {object} spec { glass, cssW, cssH, layers, level, angle, wave, ripple }
 */
export const drawTube = (canvas, spec) => {
  const { glass, cssW, cssH, layers = [], level, angle = 0, wave, ripple } = spec;
  if (!canvas || !cssW || !cssH) return;
  const ctx = prepare(canvas, cssW, cssH);
  const cap = glassOutline(glass.d, glass.fillTop);
  const pts = cap.pts;
  const capacity = 4;
  const unit = cap.area / capacity;
  const shown = Math.max(0, Math.min(level ?? layers.length, capacity));
  const axis = localGravity(angle);
  const [lo, hi] = planeRange(pts, axis);

  ctx.save();
  ctx.clip(pathFor(glass.d));

  // Glass interior
  ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
  ctx.fill(pathFor(glass.d));

  if (shown > 0.001) {
    const topIdx = Math.min(layers.length - 1, Math.ceil(shown) - 1);
    for (let i = topIdx; i >= 0; i--) {
      const fillTo = Math.min(shown, i + 1);
      const h = solveSurface(pts, axis, fillTo * unit, lo, hi);
      const isTop = i === topIdx;
      const shape = liquidShape(pts, axis, h, isTop ? wave : null);
      if (shape.length < 3) continue;
      ctx.beginPath();
      ctx.moveTo(shape[0].x, shape[0].y);
      for (let k = 1; k < shape.length; k++) ctx.lineTo(shape[k].x, shape[k].y);
      ctx.closePath();
      ctx.fillStyle = getColor(layers[i]);
      ctx.fill();

      if (isTop) {
        strokeSurface(ctx, pts, axis, h, wave, 0.5, '#FFFFFF');
      } else if (fillTo >= i + 1) {
        strokeSurface(ctx, pts, axis, h, null, 0.28, '#FFFFFF');
      }
    }
  }

  // Splash ripples stay clipped inside the receiving glass
  if (ripple && ripple.t > 0 && ripple.t < 1) {
    const h = solveSurface(pts, axis, shown * unit, lo, hi);
    const seg = surfaceSegment(pts, axis, h);
    const cx = (seg.a.x + seg.b.x) / 2;
    const cy = (seg.a.y + seg.b.y) / 2;
    for (let i = 0; i < 2; i++) {
      const p = Math.max(0, Math.min(1, (ripple.t - i * 0.3) / 0.7));
      if (p <= 0) continue;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 3 + p * 15, (3 + p * 15) * 0.3, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - p) * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }
  ctx.restore();

  // Outline, rim and reflections sit above the liquid
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke(pathFor(glass.d));

  const r = glass.rim;
  ctx.beginPath();
  roundRect(ctx, r.x, r.y, r.w, r.h, 2.5);
  ctx.fillStyle = '#F1F5F9';
  ctx.fill();
  ctx.strokeStyle = glass.accent;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.62)';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(16, 26);
  ctx.lineTo(16, 116);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(48, 30);
  ctx.lineTo(48, 108);
  ctx.stroke();
};

const strokeSurface = (ctx, pts, axis, h, wave, alpha, color) => {
  const result = wave ? waveSurfaceLine(pts, axis, h, wave) : surfaceSegment(pts, axis, h);
  const line = Array.isArray(result) ? result : [result.a, result.b];
  if (line.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(line[0].x, line[0].y);
  for (let i = 1; i < line.length; i++) ctx.lineTo(line[i].x, line[i].y);
  ctx.strokeStyle = color;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.globalAlpha = 1;
};

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
};

/**
 * Where the free surface of a tube currently sits, in design coordinates.
 * The stream is aimed at this point, so it always lands on the liquid.
 */
export const liquidSurfacePoint = (glass, layers, level, angle = 0) => {
  const cap = glassOutline(glass.d, glass.fillTop);
  const axis = localGravity(angle);
  const [lo, hi] = planeRange(cap.pts, axis);
  const unit = cap.area / 4;
  const shown = Math.max(0, Math.min(level ?? layers.length, 4));
  if (shown <= 0.02) {
    const seg = surfaceSegment(cap.pts, axis, hi - 0.5);
    return { x: (seg.a.x + seg.b.x) / 2, y: (seg.a.y + seg.b.y) / 2 };
  }
  const h = solveSurface(cap.pts, axis, shown * unit, lo, hi);
  const seg = surfaceSegment(cap.pts, axis, h);
  return { x: (seg.a.x + seg.b.x) / 2, y: (seg.a.y + seg.b.y) / 2 };
};
