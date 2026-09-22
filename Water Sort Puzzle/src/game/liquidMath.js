/**
 * Geometry-only liquid maths for the pour animation.
 *
 * Liquid is never moved with a CSS trick: the free surface is a plane
 * perpendicular to gravity expressed in the tube's local frame, and its offset
 * is solved so that the area on the liquid side equals the volume being stored.
 * Everything here is pure maths on a sampled glass outline.
 */

const CURVE_STEPS = 10;
const MAX_EDGE = 3;

const fmt = (n) => Number(n.toFixed(3));

/**
 * Flatten an SVG path (M/L/H/V/C/S/Q/T/Z, absolute or relative) into a dense
 * polyline in the glass design space.
 */
export const samplePath = (d) => {
  const tokens = d.match(/[MmLlHhVvCcSsQqTtZz]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
  const pts = [];
  let i = 0;
  let cmd = '';
  let cur = { x: 0, y: 0 };
  let start = { x: 0, y: 0 };
  let prevCubic = null;
  let prevQuad = null;

  const num = () => parseFloat(tokens[i++]);
  const push = (p) => {
    const last = pts[pts.length - 1];
    if (!last || Math.hypot(p.x - last.x, p.y - last.y) > 0.001) pts.push({ x: p.x, y: p.y });
  };
  const cubic = (p0, p1, p2, p3) => {
    for (let s = 1; s <= CURVE_STEPS; s++) {
      const t = s / CURVE_STEPS;
      const m = 1 - t;
      push({
        x: m * m * m * p0.x + 3 * m * m * t * p1.x + 3 * m * t * t * p2.x + t * t * t * p3.x,
        y: m * m * m * p0.y + 3 * m * m * t * p1.y + 3 * m * t * t * p2.y + t * t * t * p3.y,
      });
    }
  };
  const quad = (p0, p1, p2) => {
    for (let s = 1; s <= CURVE_STEPS; s++) {
      const t = s / CURVE_STEPS;
      const m = 1 - t;
      push({
        x: m * m * p0.x + 2 * m * t * p1.x + t * t * p2.x,
        y: m * m * p0.y + 2 * m * t * p1.y + t * t * p2.y,
      });
    }
  };

  while (i < tokens.length) {
    if (/[A-Za-z]/.test(tokens[i])) cmd = tokens[i++];
    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();

    if (C === 'Z') {
      push({ ...start });
      cur = { ...start };
      continue;
    }
    if (C === 'H') {
      const x = num();
      cur = { x: rel ? cur.x + x : x, y: cur.y };
      push(cur);
      cmd = rel ? 'h' : 'H';
      continue;
    }
    if (C === 'V') {
      const y = num();
      cur = { x: cur.x, y: rel ? cur.y + y : y };
      push(cur);
      cmd = rel ? 'v' : 'V';
      continue;
    }

    const abs = (x, y) => ({ x: rel ? cur.x + x : x, y: rel ? cur.y + y : y });
    if (C === 'M') {
      cur = abs(num(), num());
      start = { ...cur };
      push(cur);
      cmd = rel ? 'L' : 'l';
      continue;
    }
    if (C === 'L') {
      cur = abs(num(), num());
      push(cur);
      continue;
    }
    if (C === 'C') {
      const p1 = abs(num(), num());
      const p2 = abs(num(), num());
      const p3 = abs(num(), num());
      cubic(cur, p1, p2, p3);
      prevCubic = p2;
      cur = p3;
      continue;
    }
    if (C === 'S') {
      const refl = prevCubic ? { x: 2 * cur.x - prevCubic.x, y: 2 * cur.y - prevCubic.y } : cur;
      const p2 = abs(num(), num());
      const p3 = abs(num(), num());
      cubic(cur, refl, p2, p3);
      prevCubic = p2;
      cur = p3;
      continue;
    }
    if (C === 'Q') {
      const p1 = abs(num(), num());
      const p2 = abs(num(), num());
      quad(cur, p1, p2);
      prevQuad = p1;
      cur = p2;
      continue;
    }
    if (C === 'T') {
      const refl = prevQuad ? { x: 2 * cur.x - prevQuad.x, y: 2 * cur.y - prevQuad.y } : cur;
      const p2 = abs(num(), num());
      quad(cur, refl, p2);
      prevQuad = refl;
      cur = p2;
      continue;
    }
    i++; // unsupported token: skip defensively
  }

  // Subdivide long straight runs so waves and clipping have enough resolution.
  const dense = [];
  for (let k = 0; k < pts.length; k++) {
    const a = pts[k];
    const b = pts[(k + 1) % pts.length];
    dense.push(a);
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    const steps = Math.floor(len / MAX_EDGE);
    for (let s = 1; s <= steps; s++) {
      const t = s / (steps + 1);
      dense.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return dense;
};

const cache = new Map();

/** Cached dense outline of a glass path, optionally cut off above `fillTop`. */
export const glassOutline = (d, fillTop) => {
  const key = `${d}|${fillTop}`;
  let hit = cache.get(key);
  if (!hit) {
    const full = samplePath(d);
    const pts = fillTop == null ? full : clipToPlane(full, { x: 0, y: 1 }, fillTop);
    hit = { pts, area: Math.abs(polygonArea(pts)) };
    cache.set(key, hit);
  }
  return hit;
};

export const polygonArea = (pts) => {
  let sum = 0;
  for (let i = 0, n = pts.length; i < n; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    sum += a.x * b.y - b.x * a.y;
  }
  return sum / 2;
};

/**
 * Keep the part of a polygon on the high side of the line { p : p·axis = h }.
 * `axis` is the local gravity direction, so the kept region is the liquid.
 */
export const clipToPlane = (pts, axis, h) => {
  const proj = (p) => p.x * axis.x + p.y * axis.y;
  const out = [];
  for (let i = 0, n = pts.length; i < n; i++) {
    const cur = pts[i];
    const prev = pts[(i - 1 + n) % n];
    const cv = proj(cur);
    const pv = proj(prev);
    const cin = cv >= h;
    const pin = pv >= h;
    if (cin !== pin) {
      const t = (pv - h) / (pv - cv);
      out.push({ x: prev.x + (cur.x - prev.x) * t, y: prev.y + (cur.y - prev.y) * t });
    }
    if (cin) out.push(cur);
  }
  return out;
};

export const liquidArea = (pts, axis, h) => Math.abs(polygonArea(clipToPlane(pts, axis, h)));

/** Smallest area error we care about, in design-space square units. */
const EPS_AREA = 0.02;

/**
 * Solve for the free-surface offset that holds `target` area of liquid, with the
 * surface perpendicular to `axis` (local gravity). Binary search: the retained
 * area shrinks monotonically as the plane slides down the gravity vector.
 */
export const solveSurface = (pts, axis, target, lo, hi) => {
  if (target <= EPS_AREA) return hi;
  const total = liquidArea(pts, axis, lo);
  if (target >= total - EPS_AREA) return lo;
  let low = lo;
  let high = hi;
  for (let i = 0; i < 22; i++) {
    const mid = (low + high) / 2;
    if (liquidArea(pts, axis, mid) > target) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
};

/** Range of the gravity projection over the outline — the search bounds. */
export const planeRange = (pts, axis) => {
  let min = Infinity;
  let max = -Infinity;
  for (const p of pts) {
    const v = p.x * axis.x + p.y * axis.y;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return [min, max];
};

/**
 * Local gravity for a tube rotated by `angleDeg` (CSS clockwise, y-down space).
 * The world-down vector (0, 1) pulled back into the tube frame is (sin a, cos a).
 */
export const localGravity = (angleDeg) => {
  const r = (angleDeg * Math.PI) / 180;
  return { x: fmt(Math.sin(r)), y: fmt(Math.cos(r)), deg: angleDeg, rad: r };
};

/**
 * The polygon to fill for one liquid layer: the glass outline cut by the plane
 * at `h`, with a travelling sine wave applied to the free surface.
 */
export const liquidShape = (pts, axis, h, wave) => {
  const cut = clipToPlane(pts, axis, h);
  if (!wave || !wave.amp || cut.length < 3) return cut;

  const tan = { x: -axis.y, y: axis.x };
  const onSurface = (p) => Math.abs(p.x * axis.x + p.y * axis.y - h) < 0.05;
  const u = (p) => p.x * tan.x + p.y * tan.y;

  const out = [];
  for (let i = 0; i < cut.length; i++) {
    const a = cut[i];
    const b = cut[(i + 1) % cut.length];
    if (onSurface(a) && onSurface(b)) {
      const span = Math.abs(u(b) - u(a));
      const steps = Math.max(2, Math.round(span / 2));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const p = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        const off =
          wave.amp * Math.sin(t * span * wave.k + wave.phase) * Math.sin(Math.PI * t);
        out.push({ x: p.x - axis.x * off, y: p.y - axis.y * off });
      }
    } else if (onSurface(a)) {
      out.push(a);
    }
  }
  return out.length > 4 ? out : cut;
};

/** Midpoint of the free surface, used as the landing target of the stream. */
export const surfaceMid = (pts, axis, h) => {
  const seg = surfaceSegment(pts, axis, h);
  return { x: (seg.a.x + seg.b.x) / 2, y: (seg.a.y + seg.b.y) / 2 };
};

/**
 * The segment the surface plane cuts across the liquid: the longest pair of
 * consecutive clipped vertices that both lie on the plane.
 */
export const surfaceSegment = (pts, axis, h) => {
  const cut = clipToPlane(pts, axis, h);
  const on = (p) => Math.abs(p.x * axis.x + p.y * axis.y - h) < 0.06;
  let best = null;
  for (let i = 0; i < cut.length; i++) {
    const a = cut[i];
    const b = cut[(i + 1) % cut.length];
    if (on(a) && on(b)) {
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      if (!best || len > best.len) best = { len, a, b };
    }
  }
  if (best) return { a: best.a, b: best.b };

  const tan = { x: -axis.y, y: axis.x };
  let min = Infinity;
  let max = -Infinity;
  for (const p of cut) {
    const u = p.x * tan.x + p.y * tan.y;
    if (u < min) min = u;
    if (u > max) max = u;
  }
  if (!Number.isFinite(min) || max <= min) return { a: { x: 0, y: h }, b: { x: 0, y: h } };
  return {
    a: { x: min * tan.x + axis.x * h, y: min * tan.y + axis.y * h },
    b: { x: max * tan.x + axis.x * h, y: max * tan.y + axis.y * h },
  };
};

/** The free surface as a wavy polyline (crest pinned to the glass walls). */
export const waveSurfaceLine = (pts, axis, h, wave) => {
  const seg = surfaceSegment(pts, axis, h);
  const span = Math.hypot(seg.b.x - seg.a.x, seg.b.y - seg.a.y);
  const steps = Math.max(8, Math.round(span / 1.6));
  const out = [];
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const px = seg.a.x + (seg.b.x - seg.a.x) * t;
    const py = seg.a.y + (seg.b.y - seg.a.y) * t;
    const off = (wave.amp || 0) * Math.sin(t * span * (wave.k || 0.35) + wave.phase) * Math.sin(Math.PI * t);
    out.push({ x: px - axis.x * off, y: py - axis.y * off });
  }
  return out;
};

/**
 * Inverse of the pour physics: the tilt magnitude at which liquid resting
 * against the lip pivot still holds `volume`. Fuller tubes pour at a shallower
 * angle, so the tube must keep rotating as it drains. `dir` is the lean side
 * (+1 right, -1 left); the returned magnitude is applied as `dir * angle`.
 */
export const spillAngle = ({ pts, pivot, volume, unitArea, dir = 1, maxDeg = 95 }) => {
  const at = (deg) => {
    const g = localGravity(deg * dir);
    const h = pivot.x * g.x + pivot.y * g.y;
    return liquidArea(pts, g, h);
  };
  let low = 0;
  let high = maxDeg;
  for (let i = 0; i < 16; i++) {
    const mid = (low + high) / 2;
    if (at(mid) > volume * unitArea) low = mid;
    else high = mid;
  }
  return (low + high) / 2;
};

export const round = fmt;
