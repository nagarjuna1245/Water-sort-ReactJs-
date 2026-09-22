import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { playTapSound, playWinSound } from '../utils/audio';
import './DailyRewardsScreen.css';

const getLocalDateString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

/* ═══════════════════════════════════════════════
   INLINE SVG ATOMS
═══════════════════════════════════════════════ */

const Sparkle = ({ size = 14, className = '', style = {} }) => (
  <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 1.5 C13 8 16 11 22.5 12 C16 13 13 16 12 22.5 C11 16 8 13 1.5 12 C8 11 11 8 12 1.5 Z" fill="#FFE566" />
    <path d="M12 5 C12.6 9.4 14.6 11.4 19 12 C14.6 12.6 12.6 14.6 12 19 C11.4 14.6 9.4 12.6 5 12 C9.4 11.4 11.4 9.4 12 5 Z" fill="#FFF6C4" />
  </svg>
);

const GiftBox = ({ size = 64, className = '', style = {} }) => (
  <svg className={className} style={style} width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`drgift-a-${size}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C084FC" />
        <stop offset="55%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#6B21A8" />
      </linearGradient>
      <linearGradient id={`drgift-b-${size}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F0ABFC" />
        <stop offset="100%" stopColor="#C026D3" />
      </linearGradient>
      <linearGradient id={`drgift-r-${size}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE066" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect x="10" y="26" width="44" height="30" rx="6" fill={`url(#drgift-a-${size})`} />
    <rect x="10" y="26" width="20" height="30" rx="6" fill={`url(#drgift-b-${size})`} opacity="0.55" />
    <rect x="7" y="18" width="50" height="12" rx="5" fill={`url(#drgift-b-${size})`} />
    <rect x="27" y="18" width="10" height="38" rx="3" fill={`url(#drgift-r-${size})`} />
    <path d="M32 16 C24 4 12 6 14 13 C15.5 18 26 18 32 16 Z" fill={`url(#drgift-r-${size})`} />
    <path d="M32 16 C40 4 52 6 50 13 C48.5 18 38 18 32 16 Z" fill={`url(#drgift-r-${size})`} />
    <circle cx="32" cy="16" r="4.5" fill="#FFD84D" />
    <ellipse cx="17" cy="33" rx="4" ry="7" fill="#FFFFFF" opacity="0.28" transform="rotate(14 17 33)" />
  </svg>
);

const CoinStack = ({ size = 46 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="drstk-top" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF3C4" />
        <stop offset="60%" stopColor="#FFD84D" />
        <stop offset="100%" stopColor="#FFC62E" />
      </linearGradient>
      <linearGradient id="drstk-side" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#C2740A" />
      </linearGradient>
      <radialGradient id="drstk-face" cx="38%" cy="32%" r="75%">
        <stop offset="0%" stopColor="#FFE9A8" />
        <stop offset="55%" stopColor="#FFC62E" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
    </defs>
    {[40, 31, 22].map((cy) => (
      <g key={cy}>
        <path d={`M8 ${cy} v5 a16 6.5 0 0 0 32 0 v-5 Z`} fill="url(#drstk-side)" />
        <ellipse cx="24" cy={cy} rx="16" ry="6.5" fill="url(#drstk-top)" stroke="#E08A0C" strokeWidth="1" />
      </g>
    ))}
    <circle cx="44" cy="42" r="14" fill="#B45309" opacity="0.35" />
    <circle cx="44" cy="40.5" r="14" fill="url(#drstk-face)" stroke="#E08A0C" strokeWidth="1.4" />
    <path d="M44 33 L46.2 37.8 L51.4 38.4 L47.6 41.9 L48.7 47 L44 44.4 L39.3 47 L40.4 41.9 L36.6 38.4 L41.8 37.8 Z" fill="#E8940A" />
    <path d="M44 34.2 L46 38.4 L50.6 39 L47.2 42.1 L48.2 46.2 L44 43.9 L39.8 46.2 L40.8 42.1 L37.4 39 L42 38.4 Z" fill="#FFF3C4" />
    <ellipse cx="38.5" cy="34.5" rx="4.4" ry="2.4" fill="#FFFFFF" opacity="0.55" transform="rotate(-30 38.5 34.5)" />
  </svg>
);

const CoinsTrio = ({ size = 44, uid = 'a' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id={`drtri-f-${uid}`} cx="38%" cy="32%" r="75%">
        <stop offset="0%" stopColor="#FFE9A8" />
        <stop offset="55%" stopColor="#FFC62E" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
    </defs>
    {[
      { cx: 22, cy: 26, r: 12.5 },
      { cx: 42, cy: 26, r: 12.5 },
      { cx: 32, cy: 41, r: 13.5 },
    ].map((c, i) => (
      <g key={i}>
        <circle cx={c.cx} cy={c.cy + 1.6} r={c.r} fill="#B45309" opacity="0.32" />
        <circle cx={c.cx} cy={c.cy} r={c.r} fill={`url(#drtri-f-${uid})`} stroke="#E08A0C" strokeWidth="1.3" />
        <path
          d={`M${c.cx} ${c.cy - 6.4} l1.9 4 l4.4 0.5 l-3.2 3 l0.9 4.3 l-4 -2.2 l-4 2.2 l0.9 -4.3 l-3.2 -3 l4.4 -0.5 Z`}
          fill="#E8940A"
        />
        <path
          d={`M${c.cx} ${c.cy - 5.2} l1.6 3.4 l3.7 0.4 l-2.7 2.5 l0.8 3.6 l-3.4 -1.9 l-3.4 1.9 l0.8 -3.6 l-2.7 -2.5 l3.7 -0.4 Z`}
          fill="#FFF3C4"
        />
        <ellipse cx={c.cx - 4} cy={c.cy - 5} rx="3.4" ry="1.8" fill="#FFFFFF" opacity="0.5" transform={`rotate(-30 ${c.cx - 4} ${c.cy - 5})`} />
      </g>
    ))}
  </svg>
);

const BoosterChest = ({ size = 46 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="drch-lid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F0ABFC" />
        <stop offset="55%" stopColor="#C026D3" />
        <stop offset="100%" stopColor="#86198F" />
      </linearGradient>
      <linearGradient id="drch-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#D33BC4" />
        <stop offset="100%" stopColor="#701A75" />
      </linearGradient>
      <linearGradient id="drch-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE066" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path d="M10 28 C10 16 20 10 32 10 C44 10 54 16 54 28 L54 30 L10 30 Z" fill="url(#drch-lid)" />
    <rect x="10" y="28" width="44" height="26" rx="6" fill="url(#drch-body)" />
    <rect x="8" y="26" width="48" height="7" rx="3.5" fill="url(#drch-gold)" />
    <rect x="28" y="10" width="8" height="44" rx="3" fill="url(#drch-gold)" />
    <rect x="10" y="28" width="5" height="26" rx="2.5" fill="url(#drch-gold)" opacity="0.85" />
    <rect x="49" y="28" width="5" height="26" rx="2.5" fill="url(#drch-gold)" opacity="0.85" />
    <circle cx="32" cy="33" r="6" fill="url(#drch-gold)" stroke="#B45309" strokeWidth="1.4" />
    <circle cx="32" cy="33" r="2.4" fill="#86198F" />
    <ellipse cx="20" cy="18" rx="6" ry="3" fill="#FFFFFF" opacity="0.4" transform="rotate(-18 20 18)" />
  </svg>
);

const SpecialChest = ({ size = 46 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="drsp-lid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="55%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#4C1D95" />
      </linearGradient>
      <linearGradient id="drsp-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#3B0F7E" />
      </linearGradient>
      <linearGradient id="drsp-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE066" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path d="M10 28 C10 16 20 10 32 10 C44 10 54 16 54 28 L54 30 L10 30 Z" fill="url(#drsp-lid)" />
    <rect x="10" y="28" width="44" height="26" rx="6" fill="url(#drsp-body)" />
    <rect x="8" y="26" width="48" height="7" rx="3.5" fill="url(#drsp-gold)" />
    <rect x="28" y="10" width="8" height="44" rx="3" fill="url(#drsp-gold)" />
    <rect x="10" y="28" width="5" height="26" rx="2.5" fill="url(#drsp-gold)" opacity="0.85" />
    <rect x="49" y="28" width="5" height="26" rx="2.5" fill="url(#drsp-gold)" opacity="0.85" />
    <path d="M32 27 L34.4 32 L39.6 32.6 L35.8 36.1 L36.9 41.2 L32 38.6 L27.1 41.2 L28.2 36.1 L24.4 32.6 L29.6 32 Z" fill="url(#drsp-gold)" stroke="#B45309" strokeWidth="1.2" />
    <ellipse cx="20" cy="18" rx="6" ry="3" fill="#FFFFFF" opacity="0.4" transform="rotate(-18 20 18)" />
  </svg>
);

const HintDrop = ({ size = 42 }) => (
  <svg width={size} height={size * 1.14} viewBox="0 0 44 50" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="drdrop-f" cx="38%" cy="34%" r="80%">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="45%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0369A1" />
      </radialGradient>
    </defs>
    <path d="M22 2 C22 2 5 22 5 33 C5 42.4 12.6 48 22 48 C31.4 48 39 42.4 39 33 C39 22 22 2 22 2 Z" fill="url(#drdrop-f)" stroke="#0EA5E9" strokeWidth="1.4" />
    <ellipse cx="14.5" cy="30" rx="4" ry="7" fill="#FFFFFF" opacity="0.6" transform="rotate(-24 14.5 30)" />
    <circle cx="28" cy="40" r="2.4" fill="#FFFFFF" opacity="0.35" />
  </svg>
);

const UndoBoost = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="drundo-f" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D8B4FE" />
        <stop offset="55%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#7E22CE" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#drundo-f)" />
    <rect x="6" y="5" width="36" height="18" rx="9" fill="#FFFFFF" opacity="0.22" />
    <path d="M28 15 C19 15 14 20 13.5 26 L9.5 22.5 L8 28.5 L14.5 31 C16 22.5 21 19.5 28 19.5 C35 19.5 39 24 39 30 C39 35 35.5 38.5 30 39" stroke="#FFFFFF" strokeWidth="4.6" strokeLinecap="round" fill="none" />
    <path d="M30 33 L30 45 L20 39 Z" fill="#FFFFFF" transform="rotate(-24 30 39)" />
  </svg>
);

const LockBadge = () => (
  <span className="dr-lock-badge" aria-label="Locked">
    <svg width="13" height="14" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="6.5" width="11" height="8.5" rx="2.5" fill="#FFFFFF" />
      <path d="M4 6.5 V4.6 A3 3 0 0 1 10 4.6 V6.5" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="7" cy="10.4" r="1.4" fill="#8E97D8" />
    </svg>
  </span>
);

const CheckBadge = ({ dim = false }) => (
  <span className={`dr-check-badge ${dim ? 'is-dim' : ''}`} aria-label="Claimed">
    <svg width="15" height="13" viewBox="0 0 16 14" fill="none" aria-hidden="true">
      <path d="M2.5 7.5 L6.2 11 L13.5 2.8" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const CalendarGlyph = () => (
  <span className="dr-cal-glyph" aria-hidden="true">
    <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
      <rect x="1.5" y="3.5" width="23" height="21" rx="5" fill="#FFFFFF" />
      <rect x="5.5" y="1.5" width="3.4" height="6" rx="1.7" fill="#FFFFFF" />
      <rect x="17" y="1.5" width="3.4" height="6" rx="1.7" fill="#FFFFFF" />
      <rect x="5" y="9.5" width="16" height="2.6" rx="1.3" fill="#5B4BD8" />
      <circle cx="8.6" cy="16" r="1.7" fill="#5B4BD8" />
      <circle cx="13" cy="16" r="1.7" fill="#5B4BD8" />
      <circle cx="17.4" cy="16" r="1.7" fill="#5B4BD8" />
      <circle cx="8.6" cy="20.4" r="1.7" fill="#5B4BD8" />
      <circle cx="13" cy="20.4" r="1.7" fill="#5B4BD8" />
    </svg>
  </span>
);

const HeartOutline = () => (
  <svg className="dr-heart" width="26" height="24" viewBox="0 0 26 24" fill="none" aria-hidden="true">
    <path
      d="M13 21 C6 15.5 2 11.6 2 7.6 C2 4.4 4.4 2 7.4 2 C9.6 2 11.6 3.3 13 5.4 C14.4 3.3 16.4 2 18.6 2 C21.6 2 24 4.4 24 7.6 C24 11.6 20 15.5 13 21 Z"
      stroke="#B9A8F5"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);

const FlameIcon = ({ size = 26 }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 30 36" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="drflame-o" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="60%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
      <linearGradient id="drflame-i" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <path d="M15 1 C16 8 24 11 24 21 C24 29 19.5 34.5 15 34.5 C10.5 34.5 6 29 6 21 C6 15 9 12 10.5 8 C11.6 10.6 13 12 14.6 12.6 C14 8.6 14.4 4.6 15 1 Z" fill="url(#drflame-o)" />
    <path d="M15 16 C16 20 20 21 20 26 C20 30.4 17.6 33 15 33 C12.4 33 10 30.4 10 26 C10 22 13 20 15 16 Z" fill="url(#drflame-i)" />
  </svg>
);

const CoinIcon = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="drcoin-f" cx="38%" cy="32%" r="75%">
        <stop offset="0%" stopColor="#FFE9A8" />
        <stop offset="45%" stopColor="#FFC93C" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
    </defs>
    <circle cx="20" cy="21" r="17" fill="#B45309" opacity="0.35" />
    <circle cx="20" cy="20" r="17.5" fill="#F9A825" />
    <circle cx="20" cy="20" r="13.5" fill="url(#drcoin-f)" />
    <path d="M20 11.5 L22.6 17 L28.6 17.8 L24.2 22 L25.3 28 L20 25.1 L14.7 28 L15.8 22 L11.4 17.8 L17.4 17.8 Z" fill="#E8940A" opacity="0.85" />
    <path d="M20 12.6 L22.3 17.5 L27.6 18.2 L23.7 21.9 L24.7 27.1 L20 24.6 L15.3 27.1 L16.3 21.9 L12.4 18.2 L17.7 17.5 Z" fill="#FFD75E" />
    <ellipse cx="14.5" cy="12.5" rx="5" ry="3" fill="#FFFFFF" opacity="0.55" transform="rotate(-28 14.5 12.5)" />
  </svg>
);

const LeafSprig = ({ className = '', flip = false }) => (
  <svg className={className} viewBox="0 0 90 70" fill="none" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
    <path d="M84 62 C60 58 34 44 20 16 C46 22 72 38 84 62 Z" fill="#2F8F3A" />
    <path d="M84 62 C56 62 28 52 8 28 C36 28 66 42 84 62 Z" fill="#45AC44" />
    <path d="M84 62 C66 66 42 66 22 56 C44 50 68 52 84 62 Z" fill="#57C25A" />
    <path d="M82 60 C58 50 36 36 22 18" stroke="#7ED97C" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.7" />
  </svg>
);

const WhiteFlower = ({ size = 22, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {[0, 72, 144, 216, 288].map((a) => (
      <ellipse key={a} cx="12" cy="6.4" rx="3.6" ry="5" fill="#FFFFFF" transform={`rotate(${a} 12 12)`} />
    ))}
    <circle cx="12" cy="12" r="3" fill="#FFD84D" />
  </svg>
);

/* ═══════════════════════════════════════════════
   BACKGROUND SCENE — cozy evening puzzle room
═══════════════════════════════════════════════ */

const RoomScene = () => (
  <svg className="dr-room" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="drRoomSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2A2C6E" />
        <stop offset="45%" stopColor="#23255E" />
        <stop offset="100%" stopColor="#33286B" />
      </linearGradient>
      <linearGradient id="drWinSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B79BE8" />
        <stop offset="45%" stopColor="#E8A7C9" />
        <stop offset="78%" stopColor="#FFC9A8" />
        <stop offset="100%" stopColor="#FFE3C4" />
      </linearGradient>
      <linearGradient id="drWood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C08048" />
        <stop offset="55%" stopColor="#9A6231" />
        <stop offset="100%" stopColor="#7A4A22" />
      </linearGradient>
      <linearGradient id="drShelf" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A9713C" />
        <stop offset="100%" stopColor="#6E4419" />
      </linearGradient>
      <radialGradient id="drWinGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFC9A8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFC9A8" stopOpacity="0" />
      </radialGradient>
      <clipPath id="drWinClip">
        <path d="M286 486 V212 Q286 118 356 116 Q426 118 426 212 V486 Z" />
      </clipPath>
    </defs>

    <rect width="390" height="844" fill="url(#drRoomSky)" />
    <circle cx="352" cy="300" r="190" fill="url(#drWinGlow)" />
    <circle cx="120" cy="120" r="150" fill="#4C3D9E" opacity="0.25" />

    {/* arched twilight window */}
    <g>
      <path d="M286 486 V212 Q286 118 356 116 Q426 118 426 212 V486 Z" fill="url(#drWinSky)" />
      <g clipPath="url(#drWinClip)">
        <path d="M286 400 L320 344 L352 392 L384 336 L426 402 V486 H286 Z" fill="#8E7BD8" opacity="0.85" />
        <path d="M286 428 L330 380 L368 424 L404 384 L426 416 V486 H286 Z" fill="#6E5AC4" opacity="0.9" />
        <ellipse cx="330" cy="220" rx="34" ry="10" fill="#FFFFFF" opacity="0.4" />
        <ellipse cx="392" cy="258" rx="28" ry="8" fill="#FFFFFF" opacity="0.3" />
        <circle cx="392" cy="170" r="12" fill="#FFF3C4" opacity="0.85" />
      </g>
      <path d="M286 486 V212 Q286 118 356 116 Q426 118 426 212 V486" fill="none" stroke="#4A3C8C" strokeWidth="12" />
      <rect x="350" y="116" width="10" height="370" fill="#4A3C8C" />
      <rect x="286" y="296" width="140" height="10" fill="#4A3C8C" />
      <rect x="276" y="482" width="160" height="14" rx="7" fill="#5A4AA8" />
    </g>

    {/* left shelves with plants & bottles */}
    <g>
      {[150, 268, 386].map((y, i) => (
        <g key={y}>
          <rect x="-16" y={y} width="104" height="13" rx="6" fill="url(#drShelf)" />
          <rect x="-16" y={y + 11} width="104" height="5" rx="2.5" fill="#5A3617" opacity="0.8" />
          {i === 0 && (
            <g>
              <path d="M18 150 L22 122 H48 L52 150 Z" fill="#C96A4A" />
              <path d="M34 122 C24 108 22 96 26 84 C36 94 40 108 38 122 Z" fill="#3E9E38" />
              <path d="M36 122 C44 106 50 98 60 92 C58 106 50 116 40 122 Z" fill="#57C25A" />
            </g>
          )}
          {i === 1 && (
            <g>
              <rect x="14" y="230" width="18" height="38" rx="7" fill="#7C5CF0" opacity="0.9" />
              <rect x="18" y="234" width="5" height="26" rx="2.5" fill="#FFFFFF" opacity="0.4" />
              <rect x="40" y="240" width="16" height="28" rx="6" fill="#38BDF8" opacity="0.9" />
              <rect x="62" y="252" width="22" height="16" rx="3" fill="#D97706" />
              <rect x="64" y="240" width="18" height="12" rx="3" fill="#7C3AED" />
            </g>
          )}
          {i === 2 && (
            <g>
              <path d="M20 386 L24 362 H44 L48 386 Z" fill="#B85C3E" />
              <path d="M33 362 C26 350 26 340 30 330 C38 340 40 352 37 362 Z" fill="#45AC44" />
              <rect x="56" y="352" width="14" height="34" rx="6" fill="#2BBDE6" opacity="0.85" />
            </g>
          )}
        </g>
      ))}
    </g>

    {/* warm wooden table */}
    <g>
      <rect x="0" y="756" width="390" height="88" fill="url(#drWood)" />
      <rect x="0" y="756" width="390" height="7" fill="#E8B77A" opacity="0.75" />
      <path d="M60 763 V844 M150 763 V844 M250 763 V844 M330 763 V844" stroke="#6E4419" strokeWidth="3" opacity="0.4" />
      <rect x="0" y="806" width="390" height="38" fill="#5A3617" opacity="0.55" />
    </g>

    {/* blue potion flask, bottom left */}
    <g>
      <rect x="26" y="676" width="22" height="16" rx="5" fill="#C89A5B" />
      <rect x="29" y="690" width="16" height="20" fill="#DCEBFF" opacity="0.4" />
      <path d="M29 706 C14 716 8 730 8 744 C8 762 21 772 37 772 C53 772 66 762 66 744 C66 730 60 716 45 706 Z" fill="#DCEBFF" opacity="0.32" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
      <path d="M11 742 C11 758 22 768 37 768 C52 768 63 758 63 742 C63 736 61 730 58 725 H16 C13 730 11 736 11 742 Z" fill="#2BBDE6" />
      <ellipse cx="37" cy="725" rx="21" ry="5" fill="#7DE3F9" />
      <ellipse cx="24" cy="742" rx="5" ry="10" fill="#FFFFFF" opacity="0.5" transform="rotate(18 24 742)" />
    </g>

    {/* slate sign, bottom right */}
    <g transform="translate(4,26) rotate(-7 336 764)">
      <rect x="298" y="706" width="82" height="102" rx="10" fill="#3A3F66" stroke="#2A2E52" strokeWidth="5" />
      <text x="339" y="736" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="600" fontSize="15" fill="#E8ECFF">Sort</text>
      <circle cx="339" cy="745" r="1.8" fill="#B9A8F5" />
      <text x="339" y="764" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="600" fontSize="15" fill="#E8ECFF">Solve</text>
      <circle cx="339" cy="773" r="1.8" fill="#B9A8F5" />
      <text x="339" y="792" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="600" fontSize="15" fill="#E8ECFF">Relax</text>
      <path d="M339 802 C335 798.6 333 796.6 333 794.4 C333 792.6 334.4 791.2 336.2 791.2 C337.4 791.2 338.4 791.9 339 793 C339.6 791.9 340.6 791.2 341.8 791.2 C343.6 791.2 345 792.6 345 794.4 C345 796.6 343 798.6 339 802 Z" fill="#B9A8F5" />
      <rect x="312" y="806" width="58" height="20" rx="5" fill="#8A5426" />
    </g>

    {/* edge foliage */}
    <g opacity="0.95">
      <path d="M-8 40 C30 44 58 62 74 96 C40 92 10 72 -8 40 Z" fill="#2F8F3A" />
      <path d="M-8 70 C24 78 46 96 56 124 C26 116 2 96 -8 70 Z" fill="#45AC44" />
      <path d="M398 560 C360 566 332 586 318 620 C352 614 380 592 398 560 Z" fill="#2F8F3A" />
      <path d="M398 596 C368 604 346 622 336 650 C366 642 388 622 398 596 Z" fill="#57C25A" />
      <path d="M-6 560 C28 570 50 592 58 622 C28 612 6 590 -6 560 Z" fill="#3E9E38" />
      <path d="M60 844 C64 806 84 778 118 762 C110 800 90 828 60 844 Z" fill="#2F8F3A" />
      <path d="M96 844 C104 812 124 790 154 778 C144 810 124 832 96 844 Z" fill="#57C25A" />
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════
   REWARD DEFINITIONS
═══════════════════════════════════════════════ */

const REWARDS = [
  { day: 1, label: '+50 Coins', Icon: (p) => <CoinStack {...p} /> },
  { day: 2, label: '+1 Booster', Icon: (p) => <BoosterChest {...p} /> },
  { day: 3, label: '+1 Hint', Icon: (p) => <HintDrop {...p} /> },
  { day: 4, label: '+75 Coins', Icon: (p) => <CoinsTrio uid="d4" {...p} /> },
  { day: 5, label: '+1 Undo', Icon: (p) => <UndoBoost {...p} /> },
  { day: 6, label: '+100 Coins', Icon: (p) => <CoinsTrio uid="d6" size={46} {...p} /> },
  { day: 7, label: '+1 Special Chest', Icon: (p) => <SpecialChest {...p} /> },
];

/* ═══════════════════════════════════════════════
   SCREEN
═══════════════════════════════════════════════ */

export const DailyRewardsScreen = () => {
  const navigate = useNavigate();
  const { coins, streak, dailyRewards, claimDailyLoginReward, soundEnabled } = usePlayer();

  const today = getLocalDateString();
  const claimedDays = useMemo(() => {
    const stored = dailyRewards?.claimedDays || [];
    if (stored.length === 7 && dailyRewards?.lastClaimDate !== today) return [];
    return stored;
  }, [dailyRewards, today]);

  const todayCard = claimedDays.length + 1;
  const claimedToday = dailyRewards?.lastClaimDate === today;
  const cycleComplete = claimedDays.length === 7;
  const streakDisplay = (streak?.currentStreak || 0) + (claimedToday ? 0 : 1);

  const [justClaimed, setJustClaimed] = useState(false);

  const handleBack = () => {
    playTapSound(soundEnabled);
    navigate(-1);
  };

  const handleClaim = () => {
    if (claimedToday || cycleComplete) return;
    playWinSound(soundEnabled);
    claimDailyLoginReward();
    setJustClaimed(true);
  };

  const cardState = (n) => {
    if (claimedDays.includes(n)) return 'claimed';
    if (n === todayCard && !cycleComplete) return 'active';
    return 'locked';
  };

  const renderCard = (reward, idx) => {
    const state = cardState(reward.day);
    return (
      <div
        key={reward.day}
        className={`dr-card dr-card-${state}`}
        style={{ '--cd': `${0.28 + idx * 0.06}s` }}
        aria-label={`Day ${reward.day}: ${reward.label}${state === 'locked' ? ' (locked)' : ''}`}
      >
        {state === 'active' && <CheckBadge />}
        {state === 'claimed' && <CheckBadge dim />}
        {state === 'locked' && <LockBadge />}
        <span className="dr-card-day">Day {reward.day}</span>
        <span className="dr-card-icon">
          <reward.Icon size={state === 'active' ? 46 : 42} />
        </span>
        <span className="dr-card-reward">{reward.label}</span>
      </div>
    );
  };

  return (
    <div className="dr-root">
      <div className="dr-bg" aria-hidden="true">
        <RoomScene />
        <div className="dr-particles">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className="dr-particle"
              style={{
                left: `${[8, 22, 40, 58, 74, 88, 16, 66, 32, 80][i]}%`,
                top: `${[12, 26, 8, 18, 30, 10, 44, 52, 62, 70][i]}%`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── top bar ── */}
      <div className="dr-topbar">
        <button className="dr-back-btn" onClick={handleBack} aria-label="Go back">
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" aria-hidden="true">
            <path d="M10 2 L2 11 L10 20 M3 11 H22" stroke="#FFFFFF" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="dr-coin-hud" aria-label={`Coins: ${coins}`}>
          <CoinIcon size={32} />
          <span className="dr-coin-amount">{coins}</span>
          <span className="dr-coin-plus" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5V12.5M1.5 7H12.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* ── title ── */}
      <div className="dr-title-wrap">
        <div className="dr-title-gift">
          <GiftBox size={64} />
          <Sparkle size={20} className="dr-tsp dr-tsp-1" />
          <Sparkle size={13} className="dr-tsp dr-tsp-2" />
          <Sparkle size={16} className="dr-tsp dr-tsp-3" />
          <Sparkle size={11} className="dr-tsp dr-tsp-4" />
        </div>
        <div className="dr-sign">
          <LeafSprig className="dr-sign-leaf dr-sign-leaf-l" />
          <LeafSprig className="dr-sign-leaf dr-sign-leaf-r" flip />
          <WhiteFlower className="dr-sign-flower dr-sign-flower-l" size={26} />
          <WhiteFlower className="dr-sign-flower dr-sign-flower-r" size={24} />
          <WhiteFlower className="dr-sign-flower dr-sign-flower-t" size={18} />
          <svg className="dr-sign-svg" viewBox="0 0 340 176" fill="none" aria-label="Daily Rewards">
            <defs>
              <linearGradient id="drTitleGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFE566" />
                <stop offset="55%" stopColor="#FFC62E" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id="drTitleGloss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.12" />
                <stop offset="43%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="drPlank" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C8874A" />
                <stop offset="55%" stopColor="#A9682E" />
                <stop offset="100%" stopColor="#8A5426" />
              </linearGradient>
            </defs>
            <path
              d="M28 44 C60 30 120 24 170 24 C220 24 280 30 312 44 C326 50 330 62 328 78 L322 138 C320 154 310 162 294 164 C250 170 210 172 170 172 C130 172 90 170 46 164 C30 162 20 154 18 138 L12 78 C10 62 14 50 28 44 Z"
              fill="url(#drPlank)"
              stroke="#6E3D14"
              strokeWidth="6"
            />
            <path d="M24 60 C80 48 130 44 170 44 C210 44 260 48 316 60" stroke="#E8B77A" strokeWidth="3" opacity="0.5" fill="none" />
            <path d="M30 150 C90 158 130 160 170 160 C210 160 250 158 310 150" stroke="#5A3617" strokeWidth="4" opacity="0.5" fill="none" />
            <g fontFamily="Fredoka, sans-serif" fontWeight="700" textAnchor="middle">
              <text x="170" y="86" fontSize="62" fill="#5A3212" stroke="#5A3212" strokeWidth="16" strokeLinejoin="round" transform="translate(0,6)">Daily</text>
              <text x="170" y="86" fontSize="62" fill="#5A3212" stroke="#5A3212" strokeWidth="16" strokeLinejoin="round">Daily</text>
              <text x="170" y="86" fontSize="62" fill="url(#drTitleGold)">Daily</text>
              <text x="170" y="86" fontSize="62" fill="url(#drTitleGloss)">Daily</text>
              <text x="170" y="152" fontSize="54" fill="#5A3212" stroke="#5A3212" strokeWidth="15" strokeLinejoin="round" transform="translate(0,6)">Rewards</text>
              <text x="170" y="152" fontSize="54" fill="#5A3212" stroke="#5A3212" strokeWidth="15" strokeLinejoin="round">Rewards</text>
              <text x="170" y="152" fontSize="54" fill="#FFFFFF">Rewards</text>
              <text x="170" y="152" fontSize="54" fill="url(#drTitleGloss)">Rewards</text>
            </g>
          </svg>
        </div>
        <p className="dr-subtitle">
          Log in every day and collect<br />your amazing rewards!
        </p>
      </div>

      {/* ── main panel ── */}
      <section className="dr-panel">
        <header className="dr-panel-head">
          <div className="dr-day-capsule">
            <CalendarGlyph />
            <span className="dr-day-capsule-text">Day {Math.min(todayCard, 7)}</span>
            <Sparkle size={11} className="dr-day-spark" />
          </div>
          <div className="dr-head-right">
            <p className="dr-head-motto">
              A small step today,<br />a big reward tomorrow!
            </p>
            <HeartOutline />
          </div>
        </header>

        <div className="dr-grid-wrap">
          <div className="dr-grid dr-grid-4">
            {REWARDS.slice(0, 4).map(renderCard)}
          </div>
          <div className="dr-grid dr-grid-3">
            {REWARDS.slice(4).map((r, i) => renderCard(r, i + 4))}
          </div>
        </div>

        <div className="dr-miss-banner">
          <div className="dr-miss-gift">
            <GiftBox size={46} />
            <Sparkle size={12} className="dr-miss-sp dr-miss-sp-1" />
            <Sparkle size={9} className="dr-miss-sp dr-miss-sp-2" />
          </div>
          <div className="dr-miss-text">
            <strong>Miss a day?</strong>
            <span>Don't worry!</span>
            <span>Come back and keep the streak alive!</span>
          </div>
          <div className="dr-streak-capsule">
            <FlameIcon size={20} />
            <div className="dr-streak-texts">
              <span className="dr-streak-label">Current Streak</span>
              <span className="dr-streak-value">{streakDisplay} Day{streakDisplay === 1 ? '' : 's'}</span>
            </div>
          </div>
        </div>

        <button
          className={`dr-claim-btn ${claimedToday || cycleComplete ? 'is-done' : ''} ${justClaimed ? 'is-claimed' : ''}`}
          onClick={handleClaim}
          disabled={claimedToday || cycleComplete}
        >
          <span className="dr-claim-shine" aria-hidden="true" />
          {claimedToday || cycleComplete ? (
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <circle cx="13" cy="13" r="11" fill="#FFFFFF" />
              <path d="M7.6 13.4 L11.3 17 L18.4 8.9" stroke="#1FA356" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect x="10" y="26" width="44" height="30" rx="6" fill="#7A3A10" />
              <rect x="7" y="18" width="50" height="12" rx="5" fill="#7A3A10" />
              <rect x="27" y="18" width="10" height="38" rx="3" fill="#A0521C" />
              <path d="M32 16 C24 4 12 6 14 13 C15.5 18 26 18 32 16 Z" fill="#7A3A10" />
              <path d="M32 16 C40 4 52 6 50 13 C48.5 18 38 18 32 16 Z" fill="#7A3A10" />
            </svg>
          )}
          <span className="dr-claim-label">
            {cycleComplete ? 'All 7 Days Claimed!' : claimedToday ? 'Claimed Today!' : 'Claim Reward'}
          </span>
        </button>
      </section>
    </div>
  );
};

export default DailyRewardsScreen;
