import React from 'react';

/**
 * Premium glossy glass water-sort bottle (2D polished game asset style).
 * Transparent glass, thick rim, translucent liquid layers with glossy
 * highlights and subtle internal gradients.
 */
const GameBottle = ({
  layers = [],
  className = '',
  style = {},
  bottleId = 'bottle',
  width = 66,
  height = 144,
}) => {
  const clipId = `game-bottle-clip-${bottleId}`;
  const glossId = `game-bottle-gloss-${bottleId}`;

  // 3 equal liquid layers inside body (y: 36 to 126, height = 90)
  const layerHeight = 30;
  const bottomY = 126;

  return (
    <div className={`hero-bottle-item ${className}`} style={style}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 66 144"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-bottle-svg"
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M21 8 H45 C46.5 8 47 9.5 47 11 V26 C47 32 55 38 55 46 V114 C55 125 45 133 33 133 C21 133 11 125 11 114 V46 C11 38 19 32 19 26 V11 C19 9.5 19.5 8 21 8 Z" />
          </clipPath>

          <linearGradient id={glossId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.42" />
            <stop offset="26%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="72%" stopColor="#FFFFFF" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.22" />
          </linearGradient>

          <linearGradient id={`${glossId}-layer`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* soft shadow beneath the bottle */}
        <ellipse cx="33" cy="139" rx="21" ry="4" fill="rgba(59, 80, 160, 0.22)" />

        {/* transparent glass body */}
        <path
          d="M21 8 H45 C46.5 8 47 9.5 47 11 V26 C47 32 55 38 55 46 V114 C55 125 45 133 33 133 C21 133 11 125 11 114 V46 C11 38 19 32 19 26 V11 C19 9.5 19.5 8 21 8 Z"
          fill="rgba(233, 249, 255, 0.6)"
        />

        {/* liquid layers, clipped inside the glass */}
        <g clipPath={`url(#${clipId})`}>
          {layers.map((color, idx) => {
            const yPos = bottomY - (idx + 1) * layerHeight;
            return (
              <g key={idx}>
                <rect x="6" y={yPos} width="54" height={layerHeight + 1.5} fill={color} />
                {/* subtle internal gradient for translucent depth */}
                <rect x="6" y={yPos} width="54" height={layerHeight + 1.5} fill={`url(#${glossId}-layer)`} />
                {/* clean horizontal separation — curved meniscus */}
                <ellipse cx="33" cy={yPos + 1.2} rx="22" ry="2.6" fill="#FFFFFF" opacity="0.28" />
                {idx < layers.length - 1 && (
                  <line x1="12" y1={yPos} x2="54" y2={yPos} stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.2" />
                )}
              </g>
            );
          })}

          {/* internal glass refraction / reflection overlay */}
          <rect x="11" y="26" width="44" height="107" fill={`url(#${glossId})`} pointerEvents="none" />
        </g>

        {/* thick glass outline */}
        <path
          d="M21 8 H45 C46.5 8 47 9.5 47 11 V26 C47 32 55 38 55 46 V114 C55 125 45 133 33 133 C21 133 11 125 11 114 V46 C11 38 19 32 19 26 V11 C19 9.5 19.5 8 21 8 Z"
          stroke="#9FC9E8"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M21 8 H45 C46.5 8 47 9.5 47 11 V26 C47 32 55 38 55 46 V114 C55 125 45 133 33 133 C21 133 11 125 11 114 V46 C11 38 19 32 19 26 V11 C19 9.5 19.5 8 21 8 Z"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          fill="none"
        />

        {/* thick glass rim at the neck */}
        <rect x="17" y="3" width="32" height="7" rx="3.5" fill="#FFFFFF" stroke="#8FB8DC" strokeWidth="2" />
        <rect x="19.5" y="4.6" width="27" height="2.2" rx="1.1" fill="#DCEEFB" opacity="0.9" />

        {/* white/cyan reflection stripes along edges */}
        <path d="M16.5 48 L16.5 112" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
        <circle cx="16.5" cy="40" r="1.8" fill="#FFFFFF" opacity="0.75" />
        <path d="M49.5 54 L49.5 108" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
      </svg>
    </div>
  );
};

/**
 * Fantasy water-game pedestal: rounded pale lavender stone platform,
 * glossy top, small rocks, shallow water with soft circular ripples,
 * subtle blue glow, green tropical leaves behind on both sides.
 */
const HeroPlatformScene = () => (
  <svg
    className="hero-platform-svg"
    viewBox="0 0 350 210"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="poolGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.55" />
        <stop offset="65%" stopColor="#60A5FA" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="stoneTop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F1ECFF" />
        <stop offset="55%" stopColor="#DCD3F7" />
        <stop offset="100%" stopColor="#C3B6EE" />
      </linearGradient>
      <linearGradient id="stoneSide" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B9ABE4" />
        <stop offset="100%" stopColor="#9584CE" />
      </linearGradient>
      <linearGradient id="leafGreenA" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#34D399" />
      </linearGradient>
      <linearGradient id="leafGreenB" x1="1" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#047857" />
        <stop offset="100%" stopColor="#2CB88A" />
      </linearGradient>
    </defs>

    {/* shallow water pool with soft blue glow */}
    <ellipse cx="175" cy="168" rx="162" ry="38" fill="url(#poolGlow)" />
    <ellipse cx="175" cy="168" rx="140" ry="28" fill="#BEE5FA" opacity="0.65" />
    <ellipse cx="175" cy="168" rx="140" ry="28" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.6" fill="none" />

    {/* soft circular water ripples */}
    <ellipse cx="175" cy="168" rx="154" ry="33" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.4" fill="none" />
    <ellipse cx="175" cy="168" rx="120" ry="23" stroke="#8CCBF0" strokeWidth="1.2" opacity="0.55" fill="none" />
    <ellipse cx="175" cy="168" rx="96" ry="17" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.35" fill="none" />

    {/* green tropical leaves behind the platform — left */}
    <g>
      <path d="M42 158 C20 128 14 92 30 58 C46 88 52 124 42 158 Z" fill="url(#leafGreenA)" />
      <path d="M42 158 C30 130 28 100 30 58" stroke="#065F46" strokeWidth="1.6" opacity="0.45" fill="none" />
      <path d="M52 160 C44 132 52 100 78 76 C72 108 64 138 52 160 Z" fill="url(#leafGreenB)" opacity="0.95" />
      <path d="M28 156 C8 138 -2 112 2 84 C18 106 28 132 28 156 Z" fill="#34D399" opacity="0.85" />
    </g>
    {/* right */}
    <g>
      <path d="M308 158 C330 128 336 92 320 58 C304 88 298 124 308 158 Z" fill="url(#leafGreenA)" />
      <path d="M308 158 C320 130 322 100 320 58" stroke="#065F46" strokeWidth="1.6" opacity="0.45" fill="none" />
      <path d="M298 160 C306 132 298 100 272 76 C278 108 286 138 298 160 Z" fill="url(#leafGreenB)" opacity="0.95" />
      <path d="M322 156 C342 138 352 112 348 84 C332 106 322 132 322 156 Z" fill="#34D399" opacity="0.85" />
    </g>

    {/* stone platform — side/depth */}
    <path
      d="M72 128 C72 150 100 162 175 162 C250 162 278 150 278 128 L278 140 C278 160 248 172 175 172 C102 172 72 160 72 140 Z"
      fill="url(#stoneSide)"
    />
    {/* stone platform — glossy upper surface */}
    <path
      d="M175 96 C233 96 278 110 278 128 C278 146 233 160 175 160 C117 160 72 146 72 128 C72 110 117 96 175 96 Z"
      fill="url(#stoneTop)"
    />
    {/* surface gloss reflection */}
    <path
      d="M175 101 C224 101 262 112 268 124 C246 116 212 111 175 111 C138 111 104 116 82 124 C88 112 126 101 175 101 Z"
      fill="#FFFFFF"
      opacity="0.55"
    />
    {/* subtle purple-blue shading at surface edge */}
    <path
      d="M175 155 C230 155 272 143 277 129 C274 147 231 160 175 160 C119 160 76 147 73 129 C78 143 120 155 175 155 Z"
      fill="#8B78CE"
      opacity="0.5"
    />

    {/* small rocks around edges */}
    <ellipse cx="88" cy="150" rx="12" ry="7" fill="#C9BDF0" stroke="#A291DD" strokeWidth="1.4" />
    <ellipse cx="85" cy="148" rx="6" ry="3" fill="#EDE8FF" opacity="0.8" />
    <ellipse cx="266" cy="152" rx="10" ry="6" fill="#C9BDF0" stroke="#A291DD" strokeWidth="1.4" />
    <ellipse cx="264" cy="150" rx="5" ry="2.6" fill="#EDE8FF" opacity="0.8" />
    <ellipse cx="238" cy="163" rx="7" ry="4.4" fill="#BEB0EA" stroke="#9A88D8" strokeWidth="1.2" />
    <ellipse cx="112" cy="162" rx="6" ry="3.8" fill="#BEB0EA" stroke="#9A88D8" strokeWidth="1.2" />

    {/* soft reflection of bottles on the glossy surface */}
    <ellipse cx="175" cy="130" rx="118" ry="14" fill="#FFFFFF" opacity="0.22" />
  </svg>
);

export const WaterSortHero = () => {
  // Exact liquid sections per specification (arrays are bottom → top):
  // Left bottle:   blue bottom, pink/magenta middle, purple top
  const bottle1Layers = ['#3B82F6', '#EC4899', '#8B5CF6'];
  // Center bottle: blue bottom, yellow/golden middle, green top
  const bottle2Layers = ['#3B82F6', '#FACC15', '#22C55E'];
  // Right bottle:  orange bottom, cyan/turquoise middle, purple top
  const bottle3Layers = ['#F97316', '#06B6D4', '#8B5CF6'];

  return (
    <div className="water-sort-hero-container">
      <div className="hero-scene">
        {/* fantasy water pedestal */}
        <HeroPlatformScene />

        {/* three staggered glass bottles resting on the platform */}
        <div className="hero-bottles-row">
          <GameBottle
            bottleId="left"
            layers={bottle1Layers}
            className="hero-bottle-left"
            width={66}
            height={144}
          />
          <GameBottle
            bottleId="center"
            layers={bottle2Layers}
            className="hero-bottle-center"
            width={74}
            height={162}
          />
          <GameBottle
            bottleId="right"
            layers={bottle3Layers}
            className="hero-bottle-right"
            width={66}
            height={144}
          />
        </div>
      </div>
    </div>
  );
};

export default WaterSortHero;
