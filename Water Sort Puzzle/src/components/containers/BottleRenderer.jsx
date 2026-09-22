import React, { useId } from 'react';
import { LiquidFill } from './LiquidFill';
import { getGlass } from '../../game/glassGeometry.js';

/**
 * High-fidelity SVG Bottle Renderer.
 *
 * Silhouettes come from the shared glass geometry (single source of truth with
 * gameplay), so every one of the 40 catalog skins has its own unique shape.
 * `layers` is the real game state (colour IDs, bottom to top) and `level` is the
 * fractional amount of liquid currently shown, so the renderer can animate a
 * pour without ever inventing colours.
 */
const geometryFor = (skin) => {
  const g = getGlass('bottle', skin);
  return {
    clipPath: g.d,
    neckRect: g.rim,
    fillBounds: { yBottom: g.fillBottom ?? 134, yTop: g.fillTop },
    mouthY: g.rim.y + g.rim.h,
    rimColor: g.accent,
  };
};

export const BottleRenderer = React.memo(function BottleRenderer({
  skin = 'default',
  layers = [],
  level,
  surfaceTilt = 0,
  surfaceCurve = 0,
  lift = 0,
  shiftX = 0,
  shiftY = 0,
  tiltAngle = 0,
  height = 150,
  width = 67,
  shaking = false,
  animating = false,
  containerRef,
  className = '',
  onClick,
}) {
  const clipId = `bottle-clip-${useId().replace(/:/g, '')}`;
  const geom = geometryFor(skin);

  return (
    <div
      ref={containerRef}
      data-mouth-y={geom.mouthY}
      data-fill-top={geom.fillBounds.yTop}
      data-fill-bottom={geom.fillBounds.yBottom}
      className={`bottle-container-wrap ${shaking ? 'container-shake' : ''} ${className}`}
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: `translate3d(${shiftX.toFixed(2)}px, ${(lift + shiftY).toFixed(2)}px, 0) rotate(${tiltAngle.toFixed(2)}deg)`,
        transformOrigin: '50% 95%',
        transition: animating ? 'none' : 'transform 0.26s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        willChange: 'transform',
        filter: animating && shiftY < -8 ? 'drop-shadow(0 12px 10px rgba(15, 23, 42, 0.25))' : 'none',
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 64 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', display: 'block' }}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={geom.clipPath} />
          </clipPath>
        </defs>

        {/* Transparent glass body */}
        <path d={geom.clipPath} fill="#FFFFFF" fillOpacity="0.75" />

        <g clipPath={`url(#${clipId})`}>
          <LiquidFill
            layers={layers}
            level={level}
            yBottom={geom.fillBounds.yBottom}
            yTop={geom.fillBounds.yTop}
            tiltDeg={surfaceTilt}
            curve={surfaceCurve}
          />
        </g>

        {/* Glass outline, rim and reflections sit above the liquid */}
        <path d={geom.clipPath} stroke="#94A3B8" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        <rect
          x={geom.neckRect.x}
          y={geom.neckRect.y}
          width={geom.neckRect.w}
          height={geom.neckRect.h}
          rx="2.5"
          fill="#F1F5F9"
          stroke={geom.rimColor}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
});
