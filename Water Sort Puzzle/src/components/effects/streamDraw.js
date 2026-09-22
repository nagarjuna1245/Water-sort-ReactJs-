/**
 * Overlay drawing for the falling liquid: one ballistic stream, its droplets,
 * and the splash particles. All coordinates are local to the overlay canvas.
 */

export const GRAVITY = 2300; // design px / s^2, tuned for the play area

/** Initial velocity that carries the stream from the lip to the landing spot. */
export const launchVelocity = (lip, land, flight) => ({
  x: (land.x - lip.x) / flight,
  y: (land.y - lip.y) / flight - 0.5 * GRAVITY * flight,
});

export const streamPoint = (lip, v0, t) => ({
  x: lip.x + v0.x * t,
  y: lip.y + v0.y * t + 0.5 * GRAVITY * t * t,
});

export const streamVelocity = (v0, t) => ({ x: v0.x, y: v0.y + GRAVITY * t });

/**
 * A continuous, tapering, slightly irregular liquid ribbon.
 * @param {number} headT 0..1 how far down the stream has travelled
 */
export const drawStream = (ctx, { lip, v0, flight, headT, color, width, alpha, time }) => {
  if (alpha <= 0.01 || headT <= 0.001) return;
  const steps = 26;
  const left = [];
  const right = [];

  for (let i = 0; i <= steps; i++) {
    const s = (i / steps) * headT;
    const p = streamPoint(lip, v0, s * flight);
    const vel = streamVelocity(v0, s * flight);
    const speed = Math.max(1, Math.hypot(vel.x, vel.y));
    const nx = -vel.y / speed;
    const ny = vel.x / speed;
    // Continuity: a faster fall means a thinner stream. Tapered at both ends.
    const squeeze = Math.sqrt(Math.max(0.35, Math.hypot(v0.x, v0.y) / speed));
    const ends = Math.min(1, (i / steps) * 6 + 0.35) * (headT < 1 ? Math.min(1, (1 - i / steps) * 5) : 1);
    const jitter = 1 + 0.1 * Math.sin(s * 42 - time * 26) + 0.05 * Math.sin(s * 17 + time * 13);
    const hw = (width / 2) * squeeze * ends * jitter;
    left.push({ x: p.x + nx * hw, y: p.y + ny * hw });
    right.push({ x: p.x - nx * hw, y: p.y - ny * hw });
  }

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < left.length; i++) ctx.lineTo(left[i].x, left[i].y);
  for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i].x, right[i].y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  // Inner movement: light sliding down the column
  ctx.beginPath();
  for (let i = 0; i <= steps; i++) {
    const s = (i / steps) * headT;
    const p = streamPoint(lip, v0, s * flight);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = Math.max(0.6, width * 0.22);
  ctx.setLineDash([width * 1.1, width * 2.6]);
  ctx.lineDashOffset = -time * 260;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
};

/** Organic droplets: irregular ellipses stretched along their travel. */
export const drawDroplets = (ctx, drops, color) => {
  ctx.save();
  for (const d of drops) {
    if (d.life <= 0 || d.alpha <= 0) continue;
    const speed = Math.hypot(d.vx, d.vy);
    const stretch = Math.min(2.1, 0.75 + speed / 520);
    const angle = Math.atan2(d.vy, d.vx);
    ctx.save();
    ctx.translate(d.x, d.y);
    ctx.rotate(angle);
    ctx.globalAlpha = Math.max(0, Math.min(1, d.alpha)) * d.life;
    ctx.beginPath();
    ctx.ellipse(0, 0, d.r * stretch, d.r / Math.sqrt(stretch), 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-d.r * 0.3, -d.r * 0.22, d.r * 0.28, d.r * 0.18, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
};
