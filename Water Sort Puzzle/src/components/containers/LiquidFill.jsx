import React from 'react';
import { getColor } from '../../game/colors';

/**
 * Draws the liquid column of a container from the real game state.
 *
 * `level` is the fractional number of units currently visible, so the same code
 * renders both the settled state (level === layers.length) and every
 * intermediate frame of a pour (e.g. 2.37 units). Colours are never invented:
 * each band is drawn with the colour stored at that index in `layers`, and the
 * surface is simply drawn wherever the level happens to sit.
 */
export const LiquidFill = React.memo(function LiquidFill({
  layers,
  level,
  yBottom,
  yTop,
  capacity = 4,
  tiltDeg = 0,
  curve = 0,
}) {
  const count = layers.length;
  const clamped = Math.max(0, Math.min(level ?? count, capacity));
  const bandH = (yBottom - yTop) / capacity;
  const surfaceY = yBottom - clamped * bandH;

  const tiltOffset = Math.tan((tiltDeg * Math.PI) / 180) * 32;
  const yLeft = surfaceY - tiltOffset / 2;
  const yRight = surfaceY + tiltOffset / 2;
  const ctrlY = (yLeft + yRight) / 2 - curve * 2;
  const surfacePath = `M0,${yLeft.toFixed(2)} Q32,${ctrlY.toFixed(2)} 64,${yRight.toFixed(2)}`;

  const bands = [];
  for (let i = 0; i < count; i++) {
    const color = getColor(layers[i]);
    const bottom = yBottom - i * bandH;
    const top = bottom - bandH;
    if (bottom <= surfaceY + 0.05) continue;

    if (top < surfaceY) {
      bands.push({ key: i, color, path: `${surfacePath} L64,${bottom} L0,${bottom} Z` });
    } else {
      bands.push({ key: i, color, y: top, h: bottom - top + 0.6, divider: i < count - 1 ? top : null });
    }
  }

  const surfaceVisible = clamped > 0.02 && clamped < capacity - 0.02;

  return (
    <g>
      {bands.map((band) =>
        band.path ? (
          <path key={band.key} d={band.path} fill={band.color} />
        ) : (
          <g key={band.key}>
            <rect x="0" y={band.y} width="64" height={band.h} fill={band.color} />
            {band.divider !== null && (
              <line
                x1="4"
                y1={band.divider}
                x2="60"
                y2={band.divider}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1.2"
              />
            )}
          </g>
        )
      )}
      {surfaceVisible && (
        <path
          d={surfacePath}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.45"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </g>
  );
});
