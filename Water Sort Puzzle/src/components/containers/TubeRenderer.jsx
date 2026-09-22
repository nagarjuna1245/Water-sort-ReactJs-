import React, { useId } from 'react';
import { LiquidFill } from './LiquidFill';
import { getGlass } from '../../game/glassGeometry.js';

/**
 * High-fidelity SVG Test-Tube Renderer — silhouettes come from the shared glass
 * geometry (single source of truth with gameplay), so every one of the 40
 * catalog styles has its own unique shape.
 */
const geometryFor = (styleType) => {
  const g = getGlass('tube', styleType);
  return {
    clipPath: g.d,
    lipRect: { x: g.rim.x, y: g.rim.y, w: g.rim.w, h: g.rim.h, rx: 3 },
    fillBounds: { yBottom: g.fillBottom ?? 135, yTop: g.fillTop },
    mouthY: g.rim.y + g.rim.h,
    lipStroke: g.accent,
    hasRainbowLip: String(styleType || '').toLowerCase() === 'rainbow',
  };
};

export const TubeRenderer = React.memo(function TubeRenderer({
  styleType = 'default',
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
  const rawId = useId().replace(/:/g, '');
  const clipId = `tube-clip-${rawId}`;
  const rainbowId = `tube-rainbow-${rawId}`;
  const geom = geometryFor(styleType);

  return (
    <div
      ref={containerRef}
      data-mouth-y={geom.mouthY}
      data-fill-top={geom.fillBounds.yTop}
      data-fill-bottom={geom.fillBounds.yBottom}
      className={`tube-container-wrap ${shaking ? 'container-shake' : ''} ${className}`}
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
          {geom.hasRainbowLip && (
            <linearGradient id={rainbowId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="33%" stopColor="#8B5CF6" />
              <stop offset="66%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>
          )}
        </defs>

        <path d={geom.clipPath} fill="#FFFFFF" fillOpacity="0.8" />

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

        <path d={geom.clipPath} stroke="#94A3B8" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        <rect
          x={geom.lipRect.x}
          y={geom.lipRect.y}
          width={geom.lipRect.w}
          height={geom.lipRect.h}
          rx={geom.lipRect.rx}
          fill={geom.hasRainbowLip ? `url(#${rainbowId})` : '#F1F5F9'}
          stroke={geom.hasRainbowLip ? '#635BFF' : geom.lipStroke}
          strokeWidth="2"
        />
        <line x1="16" y1="22" x2="16" y2="118" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
        <line x1="48" y1="26" x2="48" y2="110" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </svg>
    </div>
  );
});
