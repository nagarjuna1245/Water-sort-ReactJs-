import React, { useState, useId, useRef, useMemo, useCallback, useLayoutEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { playTapSound } from '../utils/audio';
import BottomNav from '../components/common/BottomNav';
import './LevelSelectScreen.css';

/* ─────────────────────────────────────────────
   Golden coin — 3D metallic, embossed star
───────────────────────────────────────────── */
const CoinIcon = () => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg className="lscoin-svg" viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <radialGradient id={`coinFace-${uid}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#FFE9A8" />
          <stop offset="45%" stopColor="#FFC93C" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        <linearGradient id={`coinRim-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F9A825" />
          <stop offset="100%" stopColor="#C77400" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="21" r="17" fill="#B45309" opacity="0.35" />
      <circle cx="20" cy="20" r="17.5" fill={`url(#coinRim-${uid})`} />
      <circle cx="20" cy="20" r="13.5" fill={`url(#coinFace-${uid})`} />
      <path
        d="M20 11.5 L22.6 17 L28.6 17.8 L24.2 22 L25.3 28 L20 25.1 L14.7 28 L15.8 22 L11.4 17.8 L17.4 17 Z"
        fill="#E8940A"
        opacity="0.8"
      />
      <path
        d="M20 12.6 L22.3 17.5 L27.6 18.2 L23.7 21.9 L24.7 27.1 L20 24.6 L15.3 27.1 L16.3 21.9 L12.4 18.2 L17.7 17.5 Z"
        fill="#FFD75E"
      />
      <ellipse cx="14.5" cy="12.5" rx="5" ry="3" fill="#FFFFFF" opacity="0.55" transform="rotate(-28 14.5 12.5)" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   Purple gear — chunky rounded settings icon
───────────────────────────────────────────── */
const GearIcon = () => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id={`gearG-${uid}`} cx="38%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#B06CF5" />
          <stop offset="60%" stopColor="#8B2FE8" />
          <stop offset="100%" stopColor="#6D1BC4" />
        </radialGradient>
      </defs>
      <g fill={`url(#gearG-${uid})`}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x="10.5" y="1.4" width="3" height="6" rx="1.5" transform={`rotate(${a} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="6.6" />
      </g>
      <circle cx="12" cy="12" r="2.7" fill="#FFFFFF" />
      <ellipse cx="9.6" cy="8.6" rx="2.6" ry="1.5" fill="#FFFFFF" opacity="0.4" transform="rotate(-30 9.6 8.6)" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   Chunky rounded back arrow
───────────────────────────────────────────── */
const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M14.8 5 L8 12 L14.8 19 M8.6 12 L19 12"
      fill="none"
      stroke="#7C3AED"
      strokeWidth="3.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   Small golden crown above the logo
───────────────────────────────────────────── */
const CrownIcon = () => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 72 52" aria-hidden="true">
      <defs>
        <linearGradient id={`crownG-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE37A" />
          <stop offset="55%" stopColor="#FFC531" />
          <stop offset="100%" stopColor="#F08C00" />
        </linearGradient>
      </defs>
      <path
        d="M12 40 L8 16 C8 16 17 24 22 24 C27 24 31 10 36 10 C41 10 45 24 50 24 C55 24 64 16 64 16 L60 40 Z"
        fill={`url(#crownG-${uid})`}
        stroke="#D97706"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x="11" y="38" width="50" height="8" rx="4" fill="#FFB02E" stroke="#D97706" strokeWidth="1.6" />
      <circle cx="8" cy="13" r="4.4" fill="#FFD75E" stroke="#D97706" strokeWidth="1.6" />
      <circle cx="36" cy="7" r="4.8" fill="#FFD75E" stroke="#D97706" strokeWidth="1.6" />
      <circle cx="64" cy="13" r="4.4" fill="#FFD75E" stroke="#D97706" strokeWidth="1.6" />
      <path d="M17 34 Q36 40 55 34" stroke="#FFF3C4" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="24" cy="18" rx="6" ry="3" fill="#FFFFFF" opacity="0.35" transform="rotate(-18 24 18)" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   Water droplet decoration
───────────────────────────────────────────── */
const Droplet = ({ size, rotate = 0, style }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      className="lsdroplet-svg"
      viewBox="0 0 20 26"
      style={{ width: size, height: `calc(${size} * 1.28)`, '--lsrot': `${rotate}deg`, transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`dropG-${uid}`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#BFF3FF" />
          <stop offset="55%" stopColor="#4DD3F2" />
          <stop offset="100%" stopColor="#1191D4" />
        </radialGradient>
      </defs>
      <path d="M10 1.5 C10 1.5 2.5 11 2.5 16.5 C2.5 21.5 5.8 24.8 10 24.8 C14.2 24.8 17.5 21.5 17.5 16.5 C17.5 11 10 1.5 10 1.5 Z" fill={`url(#dropG-${uid})`} opacity="0.95" />
      <ellipse cx="7.4" cy="15" rx="2.1" ry="3.4" fill="#FFFFFF" opacity="0.75" transform="rotate(-16 7.4 15)" />
    </svg>
  );
};

/* ─────────────────────────────────────────────
   Sparkle particle
───────────────────────────────────────────── */
const Sparkle = ({ size, style }) => (
  <svg className="lssparkle-svg" viewBox="0 0 12 12" style={{ width: size, height: size, ...style }} aria-hidden="true">
    <path d="M6 0 C6.6 4 8 5.4 12 6 C8 6.6 6.6 8 6 12 C5.4 8 4 6.6 0 6 C4 5.4 5.4 4 6 0 Z" fill="#FFFFFF" />
  </svg>
);

/* ─────────────────────────────────────────────
   Level bottle on its floating island
───────────────────────────────────────────── */
const BODY_PATH =
  'M38 21 C38 29 17 31.5 17 44 L17 81 C17 93.5 30.5 100 50 100 C69.5 100 83 93.5 83 81 L83 44 C83 31.5 62 29 62 21 Z';

const STAR_PATH =
  'M0 -7 L2.05 -2.25 L6.8 -1.65 L3.3 1.65 L4.2 6.3 L0 4.05 L-4.2 6.3 L-3.3 1.65 L-6.8 -1.65 L-2.05 -2.25 Z';

const LevelBottle = ({ num, unlocked, stars }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 100 124" className="lsbottle-svg" aria-hidden="true">
      <defs>
        <linearGradient id={`liquid-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FE3FF" />
          <stop offset="45%" stopColor="#25B7F2" />
          <stop offset="100%" stopColor="#0C7FD8" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="35%" stopColor="#DFF7FF" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.32" />
        </linearGradient>
        <linearGradient id={`lockLiq-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5F4FC" />
          <stop offset="100%" stopColor="#E2E1F2" />
        </linearGradient>
        <linearGradient id={`starG-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE885" />
          <stop offset="100%" stopColor="#FFB02E" />
        </linearGradient>
        <linearGradient id={`rockG-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A79BC8" />
          <stop offset="100%" stopColor="#6B6190" />
        </linearGradient>
        <linearGradient id={`grassG-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8CE563" />
          <stop offset="100%" stopColor="#43A83C" />
        </linearGradient>
        <clipPath id={`bodyClip-${uid}`}>
          <path d={BODY_PATH} />
        </clipPath>
      </defs>

      {/* ── water ripples under island ── */}
      <ellipse cx="50" cy="117.5" rx="45" ry="7.5" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.45" />
      <ellipse cx="50" cy="117.5" rx="34" ry="5.4" fill="none" stroke="#E0FBFF" strokeWidth="1.5" opacity="0.35" />
      <ellipse cx="50" cy="116" rx="39" ry="6.4" fill="#7FE9F5" opacity="0.32" />

      {/* ── floating island ── */}
      <path d="M21 103 L27 115 C33 120.5 67 120.5 73 115 L79 103 C79 98 66 94.5 50 94.5 C34 94.5 21 98 21 103 Z" fill={`url(#rockG-${uid})`} />
      <path d="M33 108 L37 116 M63 108 L60 116 M48 110 L48 117" stroke="#544B78" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M15 101 C15 94.5 31 89.5 50 89.5 C69 89.5 85 94.5 85 101 C85 106 69 109.5 50 109.5 C31 109.5 15 106 15 101 Z" fill={`url(#grassG-${uid})`} />
      <path d="M24 97.5 Q26.5 92.5 29 97.5 M40 95.5 Q42.5 90.5 45 95.5 M58 95.5 Q60.5 90.5 63 95.5 M72 97.5 Q74.5 92.5 77 97.5" stroke="#2F8A32" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8" />
      <circle cx="33" cy="101.5" r="1.7" fill="#FFFFFF" opacity="0.95" />
      <circle cx="66" cy="102" r="1.6" fill="#FFE3F1" opacity="0.95" />
      <ellipse cx="50" cy="97.5" rx="19" ry="3.6" fill="#1F5D3A" opacity="0.26" />

      {/* ── bottle ── */}
      <g className="lsbottle-float">
        {/* glass back tint */}
        <path d={BODY_PATH} fill={unlocked ? '#CFF3FF' : '#EDECF8'} fillOpacity={unlocked ? 0.45 : 0.95} />

        {/* interior */}
        <g clipPath={`url(#bodyClip-${uid})`}>
          {unlocked ? (
            <>
              <rect x="17" y="33" width="66" height="67" fill={`url(#liquid-${uid})`} />
              <ellipse cx="50" cy="96" rx="30" ry="6" fill="#0A70C8" opacity="0.35" />
              <ellipse cx="50" cy="33" rx="33" ry="4.6" fill="#A8EFFF" />
              <ellipse cx="50" cy="33" rx="33" ry="4.6" fill="none" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.75" />
              <circle cx="34" cy="64" r="2.2" fill="#FFFFFF" opacity="0.4" />
              <circle cx="64" cy="76" r="1.7" fill="#FFFFFF" opacity="0.35" />
              <circle cx="44" cy="86" r="1.4" fill="#FFFFFF" opacity="0.3" />
            </>
          ) : (
            <>
              <rect x="17" y="33" width="66" height="67" fill={`url(#lockLiq-${uid})`} opacity="0.9" />
              <ellipse cx="50" cy="33" rx="33" ry="4.4" fill="#FAFAFF" opacity="0.9" />
            </>
          )}
        </g>

        {/* glass overlay + outline */}
        <path d={BODY_PATH} fill={`url(#glass-${uid})`} stroke={unlocked ? '#D6F6FF' : '#C9C7E4'} strokeWidth="2.6" strokeLinejoin="round" />

        {/* neck */}
        <path d="M38 9.5 L38 21 L62 21 L62 9.5" fill={unlocked ? '#CFF3FF' : '#F1F0FA'} fillOpacity={unlocked ? 0.5 : 0.95} stroke={unlocked ? '#D6F6FF' : '#C9C7E4'} strokeWidth="2.6" strokeLinejoin="round" />

        {/* thick glass rim */}
        <rect x="30.5" y="3.5" width="39" height="9" rx="4.5" fill={unlocked ? '#EAFBFF' : '#F5F4FC'} stroke={unlocked ? '#B4E6FA' : '#C9C7E4'} strokeWidth="2.2" />
        <rect x="34.5" y="5.6" width="31" height="3" rx="1.5" fill="#FFFFFF" opacity="0.9" />

        {/* glass highlights */}
        <rect x="23.5" y="47" width="6" height="36" rx="3" fill="#FFFFFF" opacity="0.5" />
        <rect x="23.5" y="38" width="6" height="6" rx="3" fill="#FFFFFF" opacity="0.38" />
        <path d="M76.5 52 Q78.5 66 76.5 79" stroke="#FFFFFF" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.42" />

        {/* level number */}
        <text x="50" y={unlocked ? 50 : 42} textAnchor="middle" dominantBaseline="middle" className={unlocked ? 'lsnum-u' : 'lsnum-l'}>
          {num}
        </text>

        {/* unlocked: three gold stars · locked: padlock */}
        {unlocked ? (
          <g>
            {[35.5, 50, 64.5].map((cx, i) => (
              <g key={i} transform={`translate(${cx} 74)`}>
                <path
                  d={STAR_PATH}
                  fill={i < stars ? `url(#starG-${uid})` : '#FFFFFF'}
                  fillOpacity={i < stars ? 1 : 0.55}
                  stroke={i < stars ? '#E8890C' : '#DDE9F5'}
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
                {i < stars && <circle cx="-1.8" cy="-2.6" r="1.1" fill="#FFFFFF" opacity="0.55" />}
              </g>
            ))}
          </g>
        ) : (
          <g transform="translate(50 70)">
            <path d="M-6 -3 L-6 -7.5 C-6 -12 -3 -14.8 0 -14.8 C3 -14.8 6 -12 6 -7.5 L6 -3" fill="none" stroke="#8B8FC0" strokeWidth="3.6" strokeLinecap="round" />
            <rect x="-10" y="-4" width="20" height="15.5" rx="4.6" fill="#8B8FC0" />
            <rect x="-10" y="-4" width="20" height="6" rx="3" fill="#9CA0CE" />
            <circle cx="0" cy="2.4" r="2.2" fill="#EDEEFB" />
            <rect x="-1" y="3.2" width="2" height="4.4" rx="1" fill="#EDEEFB" />
          </g>
        )}
      </g>
    </svg>
  );
};

/* ─────────────────────────────────────────────
   Curved wooden plaque under the logo
───────────────────────────────────────────── */
const WoodenPlaque = () => {
  const uid = useId().replace(/:/g, '');
  return (
    <div className="lsplaque" aria-hidden="true">
      <svg viewBox="0 0 200 50">
        <defs>
          <linearGradient id={`woodP-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F2A950" />
            <stop offset="55%" stopColor="#D9822B" />
            <stop offset="100%" stopColor="#B3631C" />
          </linearGradient>
        </defs>
        <path d="M14 40 Q100 26 186 40 L186 44.5 Q100 30.5 14 44.5 Z" fill="#7C4A15" />
        <path d="M10 22 Q100 7 190 22 L186 40 Q100 26 14 40 Z" fill={`url(#woodP-${uid})`} stroke="#8A5A1E" strokeWidth="3" strokeLinejoin="round" />
        <path d="M26 27 Q100 14 174 27" stroke="#A9641F" strokeWidth="1.6" fill="none" opacity="0.6" strokeLinecap="round" />
        <path d="M30 34.5 Q100 22 170 34.5" stroke="#A9641F" strokeWidth="1.4" fill="none" opacity="0.5" strokeLinecap="round" />
        <circle cx="20" cy="30" r="2.2" fill="#7C4A15" opacity="0.8" />
        <circle cx="180" cy="30" r="2.2" fill="#7C4A15" opacity="0.8" />
        <path id={`lsplaqueArc-${uid}`} d="M24 34 Q100 20 176 34" fill="none" />
        <text className="lsplaque-text">
          <textPath href={`#lsplaqueArc-${uid}`} startOffset="50%" textAnchor="middle">
            Infinite levels await!
          </textPath>
        </text>
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Bottom island with the wooden sign
───────────────────────────────────────────── */
const BottomIslandSign = () => {
  const uid = useId().replace(/:/g, '');
  return (
    <div className="lsbottom-sign" aria-hidden="true">
      <svg viewBox="0 0 190 68">
        <defs>
          <linearGradient id={`signRock-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A79BC8" />
            <stop offset="100%" stopColor="#635A88" />
          </linearGradient>
          <linearGradient id={`signGrass-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8CE563" />
            <stop offset="100%" stopColor="#3E9E38" />
          </linearGradient>
          <linearGradient id={`woodS-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F2A950" />
            <stop offset="55%" stopColor="#D9822B" />
            <stop offset="100%" stopColor="#B3631C" />
          </linearGradient>
        </defs>

        {/* ripples */}
        <ellipse cx="95" cy="61" rx="82" ry="8" fill="none" stroke="#FFFFFF" strokeWidth="2.2" opacity="0.4" />
        <ellipse cx="95" cy="60" rx="60" ry="5.6" fill="none" stroke="#E0FBFF" strokeWidth="1.6" opacity="0.3" />
        <ellipse cx="95" cy="59" rx="70" ry="6.5" fill="#7FE9F5" opacity="0.3" />

        {/* island rock */}
        <path d="M42 45 L52 59 C60 65 130 65 138 59 L148 45 C148 39 122 35 95 35 C68 35 42 39 42 45 Z" fill={`url(#signRock-${uid})`} />
        <path d="M64 50 L70 59 M126 50 L121 59" stroke="#4E4670" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        {/* grass top */}
        <path d="M36 43 C36 35 62 30 95 30 C128 30 154 35 154 43 C154 48 128 51.5 95 51.5 C62 51.5 36 48 36 43 Z" fill={`url(#signGrass-${uid})`} />
        <path d="M52 38 Q54.5 33 57 38 M74 35 Q76.5 30 79 35 M112 35 Q114.5 30 117 35 M134 38 Q136.5 33 139 38" stroke="#2C8530" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8" />
        {/* daisies + pebbles */}
        <g>
          <circle cx="56" cy="38.6" r="2.6" fill="#FFFFFF" />
          <circle cx="53.6" cy="41" r="2.6" fill="#FFFFFF" />
          <circle cx="58.4" cy="41" r="2.6" fill="#FFFFFF" />
          <circle cx="56" cy="40.4" r="1.5" fill="#FFD75E" />
          <circle cx="136" cy="39.6" r="2.4" fill="#FFFFFF" />
          <circle cx="133.8" cy="41.8" r="2.4" fill="#FFFFFF" />
          <circle cx="138.2" cy="41.8" r="2.4" fill="#FFFFFF" />
          <circle cx="136" cy="41.2" r="1.4" fill="#FFD75E" />
          <circle cx="76" cy="45" r="2.2" fill="#FFE3F1" />
        </g>
        <ellipse cx="112" cy="46.5" rx="6" ry="2.8" fill="#8B81AC" />
        {/* leaves poking out */}
        <path d="M38 40 C30 34 28 26 33 21 C38 26 41 34 38 40 Z" fill="#43A83C" />
        <path d="M152 40 C160 34 162 26 157 21 C152 26 149 34 152 40 Z" fill="#43A83C" />

        {/* wooden sign — slightly tilted */}
        <g transform="rotate(-5 95 20)">
          <rect x="86" y="30" width="5" height="12" rx="2.5" fill="#8A5A1E" />
          <rect x="99" y="30" width="5" height="12" rx="2.5" fill="#8A5A1E" />
          <rect x="43" y="5.5" width="104" height="38" rx="9" fill="#7C4A15" opacity="0.5" />
          <rect x="43" y="2" width="104" height="38" rx="9" fill={`url(#woodS-${uid})`} stroke="#8A5A1E" strokeWidth="2.6" />
          <path d="M52 10.5 Q95 6.5 138 10.5" stroke="#A9641F" strokeWidth="1.4" fill="none" opacity="0.6" strokeLinecap="round" />
          <path d="M54 34 Q95 37.5 136 34" stroke="#A9641F" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />
          <circle cx="49" cy="21" r="2" fill="#8A5A1E" opacity="0.8" />
          <circle cx="141" cy="21" r="2" fill="#8A5A1E" opacity="0.8" />
          <text x="95" y="16.5" textAnchor="middle" className="lssign-line1">Better</text>
          <text x="95" y="27.5" textAnchor="middle" className="lssign-line2">With Every Level</text>
          <path d="M76 33.5 L85 33.5 M105 33.5 L114 33.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
          <path d="M95 32.5 C93.6 31.2 91.7 31.5 91.7 33.1 C91.7 34.3 93.2 35.3 95 36.4 C96.8 35.3 98.3 34.3 98.3 33.1 C98.3 31.5 96.4 31.2 95 32.5 Z" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Background — sky, clouds, castle, cliffs,
   waterfalls, water, rocks, corner foliage
───────────────────────────────────────────── */
const WaterBackground = () => {
  const uid = useId().replace(/:/g, '');
  return (
    <div className="lsbg" aria-hidden="true">
      <svg className="lsbg-svg" viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3F6FF" />
            <stop offset="45%" stopColor="#B9ECFB" />
            <stop offset="100%" stopColor="#8FE2F5" />
          </linearGradient>
          <linearGradient id={`water-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A5F0F8" />
            <stop offset="12%" stopColor="#62D9F0" />
            <stop offset="35%" stopColor="#35C4EA" />
            <stop offset="65%" stopColor="#22B4E4" />
            <stop offset="100%" stopColor="#17A3DA" />
          </linearGradient>
          <linearGradient id={`cliffL-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7BD46A" />
            <stop offset="12%" stopColor="#46A854" />
            <stop offset="22%" stopColor="#379548" />
            <stop offset="30%" stopColor="#8F84B8" />
            <stop offset="100%" stopColor="#6B6190" />
          </linearGradient>
          <linearGradient id={`cliffR-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5FC25C" />
            <stop offset="14%" stopColor="#379548" />
            <stop offset="24%" stopColor="#2F8A42" />
            <stop offset="32%" stopColor="#7F74AC" />
            <stop offset="100%" stopColor="#655A94" />
          </linearGradient>
          <linearGradient id={`fall-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D9F4FE" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id={`rock-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A79BC8" />
            <stop offset="100%" stopColor="#6B6190" />
          </linearGradient>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#E8FBFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <filter id={`soft-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id={`soft2-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
          <filter id={`soft3-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* sky */}
        <rect x="0" y="0" width="1024" height="480" fill={`url(#sky-${uid})`} />
        <g filter={`url(#soft-${uid})`} opacity="0.95" fill="#FFFFFF">
          <ellipse cx="150" cy="105" rx="130" ry="36" />
          <ellipse cx="215" cy="86" rx="80" ry="24" />
          <ellipse cx="830" cy="150" rx="120" ry="32" />
          <ellipse cx="890" cy="130" rx="75" ry="22" />
          <ellipse cx="520" cy="62" rx="100" ry="26" opacity="0.7" />
          <ellipse cx="660" cy="90" rx="70" ry="20" opacity="0.6" />
        </g>
        <ellipse cx="512" cy="250" rx="560" ry="270" fill={`url(#glow-${uid})`} />

        {/* distant castle, right */}
        <g opacity="0.8" filter={`url(#soft2-${uid})`} transform="translate(181 82) scale(0.82)">
          <rect x="850" y="196" width="26" height="118" rx="4" fill="#F3E9F8" />
          <path d="M844 198 L863 146 L882 198 Z" fill="#86B9EC" />
          <rect x="890" y="214" width="36" height="100" rx="4" fill="#FBF4FC" />
          <path d="M884 216 L908 160 L932 216 Z" fill="#93C4F0" />
          <rect x="940" y="226" width="22" height="88" rx="4" fill="#F3E9F8" />
          <path d="M935 228 L951 182 L967 228 Z" fill="#86B9EC" />
          <circle cx="863" cy="222" r="3.4" fill="#B89BD8" />
          <circle cx="908" cy="240" r="4" fill="#B89BD8" />
          <circle cx="951" cy="248" r="3" fill="#B89BD8" />
        </g>

        {/* water body */}
        <rect x="0" y="430" width="1024" height="1106" fill={`url(#water-${uid})`} />
        <rect x="0" y="424" width="1024" height="22" fill="#FFFFFF" opacity="0.5" filter={`url(#soft3-${uid})`} />

        {/* broad perspective ripples */}
        <g fill="none" stroke="#FFFFFF">
          <ellipse cx="512" cy="646" rx="468" ry="44" strokeWidth="3" opacity="0.13" />
          <ellipse cx="512" cy="868" rx="500" ry="50" strokeWidth="3" opacity="0.12" />
          <ellipse cx="512" cy="1088" rx="520" ry="54" strokeWidth="3" opacity="0.11" />
          <ellipse cx="512" cy="1300" rx="540" ry="58" strokeWidth="3" opacity="0.1" />
        </g>

        {/* left cliffs + waterfall */}
        <g>
          <path d="M0 306 C58 272 122 266 172 292 C202 308 216 338 212 372 C210 420 196 470 178 520 C160 560 120 585 70 590 C40 592 15 585 0 574 Z" fill={`url(#cliffL-${uid})`} />
          <path d="M0 306 C58 272 122 266 172 292 C188 300 200 314 206 330 C150 310 68 312 0 336 Z" fill="#63CB5E" />
          <circle cx="60" cy="296" r="14" fill="#3E9E4A" opacity="0.9" />
          <circle cx="92" cy="288" r="11" fill="#3E9E4A" opacity="0.9" />
          <circle cx="140" cy="300" r="12" fill="#379548" opacity="0.9" />
          <path d="M120 400 L132 470 M60 420 L70 500 M160 380 L168 440" stroke="#544B78" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
          <path d="M58 340 C54 400 62 470 58 540 L90 540 C84 470 92 400 88 340 Z" fill={`url(#fall-${uid})`} />
          <ellipse cx="72" cy="540" rx="44" ry="11" fill="#FFFFFF" opacity="0.5" filter={`url(#soft3-${uid})`} />
          <path d="M0 560 C40 542 84 546 104 566 C84 584 40 590 0 584 Z" fill="#4EB858" opacity="0.95" />
        </g>

        {/* right cliffs + waterfall */}
        <g>
          <path d="M1024 336 C964 300 902 296 858 322 C830 340 814 372 818 406 C820 460 834 515 852 565 C870 605 910 630 960 634 C990 636 1010 630 1024 620 Z" fill={`url(#cliffR-${uid})`} />
          <path d="M1024 336 C964 300 902 296 858 322 C842 332 830 346 824 362 C880 340 958 342 1024 366 Z" fill="#58C25A" />
          <circle cx="952" cy="326" r="13" fill="#3E9E4A" opacity="0.9" />
          <circle cx="915" cy="318" r="10" fill="#379548" opacity="0.9" />
          <path d="M880 430 L892 500 M950 450 L960 530 M990 420 L998 480" stroke="#4E4670" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
          <path d="M890 370 C886 430 894 500 890 580 L922 580 C916 500 924 430 920 370 Z" fill={`url(#fall-${uid})`} opacity="0.9" />
          <ellipse cx="905" cy="580" rx="46" ry="11" fill="#FFFFFF" opacity="0.5" filter={`url(#soft3-${uid})`} />
          <path d="M1024 596 C976 578 928 584 906 606 C930 626 980 632 1024 626 Z" fill="#46B054" />
        </g>

        {/* rocks + lily pads scattered on the water */}
        <g>
          <ellipse cx="78" cy="668" rx="26" ry="9" fill="#7FE9F5" opacity="0.35" />
          <path d="M56 664 Q62 646 78 646 Q94 646 100 664 Q89 670 78 670 Q67 670 56 664 Z" fill={`url(#rock-${uid})`} />
          <path d="M64 652 Q72 648 80 651" stroke="#C4BADF" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
          <ellipse cx="36" cy="716" rx="34" ry="12" fill="#3FA84F" opacity="0.9" />
          <path d="M36 716 L66 708" stroke="#2C8530" strokeWidth="3" />
          <ellipse cx="28" cy="712" rx="10" ry="3.4" fill="#6BCB63" opacity="0.8" />
          <ellipse cx="58" cy="890" rx="20" ry="7" fill="#7FE9F5" opacity="0.3" />
          <path d="M42 886 Q47 872 58 872 Q69 872 74 886 Q66 891 58 891 Q50 891 42 886 Z" fill={`url(#rock-${uid})`} />
          <ellipse cx="952" cy="738" rx="30" ry="11" fill="#3FA84F" opacity="0.88" />
          <path d="M952 738 L926 731" stroke="#2C8530" strokeWidth="3" />
          <ellipse cx="936" cy="854" rx="24" ry="8" fill="#7FE9F5" opacity="0.3" />
          <path d="M916 850 Q922 834 936 834 Q950 834 956 850 Q947 856 936 856 Q925 856 916 850 Z" fill={`url(#rock-${uid})`} />
          <ellipse cx="958" cy="944" rx="20" ry="7" fill="#7FE9F5" opacity="0.3" />
          <path d="M942 940 Q947 926 958 926 Q969 926 974 940 Q966 945 958 945 Q950 945 942 940 Z" fill={`url(#rock-${uid})`} />
          <ellipse cx="586" cy="646" rx="16" ry="5.5" fill="#7FE9F5" opacity="0.35" />
          <path d="M573 643 Q577 632 586 632 Q595 632 599 643 Q592 647 586 647 Q580 647 573 643 Z" fill={`url(#rock-${uid})`} />
          <path d="M580 632 Q582 627 584 632 M588 632 Q590 627 592 632" stroke="#3FA84F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <ellipse cx="243" cy="1268" rx="26" ry="9.5" fill="#3FA84F" opacity="0.85" />
          <path d="M243 1268 L265 1262" stroke="#2C8530" strokeWidth="2.6" />
          <path d="M246 1258 Q250 1248 258 1248 Q266 1248 270 1258 Q264 1262 258 1262 Q252 1262 246 1258 Z" fill={`url(#rock-${uid})`} />
        </g>

        {/* shimmer streaks — static: SMIL inside this full-bleed SVG would
            re-raster the whole scene on every frame, including while scrolling */}
        <g fill="#FFFFFF">
          <rect x="90" y="560" width="340" height="5" rx="2.5" opacity="0.3" />
          <rect x="600" y="760" width="260" height="4" rx="2" opacity="0.25" />
          <rect x="240" y="980" width="300" height="4" rx="2" opacity="0.25" />
        </g>

        {/* corner tropical foliage + flowers */}
        <g>
          <path d="M-24 1560 C6 1436 68 1356 162 1326 C120 1398 100 1478 104 1560 Z" fill="#2F8F3E" />
          <path d="M-24 1560 C6 1436 68 1356 162 1326" stroke="#63C45B" strokeWidth="4" fill="none" />
          <path d="M-34 1468 C-4 1378 48 1318 112 1298 C80 1358 66 1418 68 1478 Z" fill="#43A83C" />
          <path d="M16 1560 C46 1478 98 1428 162 1408 C130 1458 116 1508 118 1560 Z" fill="#63C45B" />
          <g fill="#FF9FC0">
            <circle cx="46" cy="1282" r="8.5" />
            <circle cx="54.5" cy="1288" r="8.5" />
            <circle cx="51" cy="1298" r="8.5" />
            <circle cx="41" cy="1298" r="8.5" />
            <circle cx="37.5" cy="1288" r="8.5" />
          </g>
          <circle cx="46" cy="1290" r="4.6" fill="#FFE37A" />
          <g fill="#FF9FC0">
            <circle cx="126" cy="1416" r="6.6" />
            <circle cx="132.6" cy="1420.8" r="6.6" />
            <circle cx="130.2" cy="1428.6" r="6.6" />
            <circle cx="121.8" cy="1428.6" r="6.6" />
            <circle cx="119.4" cy="1420.8" r="6.6" />
          </g>
          <circle cx="126" cy="1422" r="3.5" fill="#FFE37A" />
        </g>
        <g transform="translate(1024 0) scale(-1 1)">
          <path d="M-24 1560 C6 1436 68 1356 162 1326 C120 1398 100 1478 104 1560 Z" fill="#2F8F3E" />
          <path d="M-24 1560 C6 1436 68 1356 162 1326" stroke="#63C45B" strokeWidth="4" fill="none" />
          <path d="M-34 1468 C-4 1378 48 1318 112 1298 C80 1358 66 1418 68 1478 Z" fill="#43A83C" />
          <path d="M16 1560 C46 1478 98 1428 162 1408 C130 1458 116 1508 118 1560 Z" fill="#63C45B" />
          <g fill="#FF9FC0">
            <circle cx="46" cy="1282" r="8.5" />
            <circle cx="54.5" cy="1288" r="8.5" />
            <circle cx="51" cy="1298" r="8.5" />
            <circle cx="41" cy="1298" r="8.5" />
            <circle cx="37.5" cy="1288" r="8.5" />
          </g>
          <circle cx="46" cy="1290" r="4.6" fill="#FFE37A" />
          <g fill="#FF9FC0">
            <circle cx="126" cy="1416" r="6.6" />
            <circle cx="132.6" cy="1420.8" r="6.6" />
            <circle cx="130.2" cy="1428.6" r="6.6" />
            <circle cx="121.8" cy="1428.6" r="6.6" />
            <circle cx="119.4" cy="1420.8" r="6.6" />
          </g>
          <circle cx="126" cy="1422" r="3.5" fill="#FFE37A" />
        </g>
      </svg>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Logo decoration — leaves fan behind title
───────────────────────────────────────────── */
const LogoLeaves = () => (
  <svg className="lslogo-leaves" viewBox="0 0 280 90" aria-hidden="true">
    <g>
      <path d="M140 86 C92 84 46 70 18 44 C66 38 116 56 140 86 Z" fill="#2F8F3E" />
      <path d="M140 86 C98 76 64 56 46 26 C88 32 126 56 140 86 Z" fill="#43A83C" />
      <path d="M140 86 C114 68 98 44 96 14 C126 28 142 56 140 86 Z" fill="#63C45B" />
      <path d="M140 86 C188 84 234 70 262 44 C214 38 164 56 140 86 Z" fill="#2F8F3E" />
      <path d="M140 86 C182 76 216 56 234 26 C192 32 154 56 140 86 Z" fill="#43A83C" />
      <path d="M140 86 C166 68 182 44 184 14 C154 28 138 56 140 86 Z" fill="#63C45B" />
      <path d="M18 44 C66 38 116 56 140 86" stroke="#8FE57F" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M262 44 C214 38 164 56 140 86" stroke="#8FE57F" strokeWidth="2" fill="none" opacity="0.6" />
      <g fill="#FFFFFF">
        <circle cx="24" cy="60" r="3.4" />
        <circle cx="19.2" cy="64.8" r="3.4" />
        <circle cx="28.8" cy="64.8" r="3.4" />
        <circle cx="24" cy="69.6" r="3.4" />
      </g>
      <circle cx="24" cy="64.8" r="2.1" fill="#FFD75E" />
      <g fill="#FFFFFF">
        <circle cx="256" cy="60" r="3.4" />
        <circle cx="251.2" cy="64.8" r="3.4" />
        <circle cx="260.8" cy="64.8" r="3.4" />
        <circle cx="256" cy="69.6" r="3.4" />
      </g>
      <circle cx="256" cy="64.8" r="2.1" fill="#FFD75E" />
    </g>
  </svg>
);

/* ─────────────────────────────────────────────
   MAIN SCREEN
───────────────────────────────────────────── */
const PAGE_SIZE = 20;
const COLUMNS = 5;

const TITLE_LETTERS = [
  { ch: 'L', r: -7, y: 3 },
  { ch: 'e', r: -4, y: 0.5 },
  { ch: 'v', r: -1.5, y: -1.5 },
  { ch: 'e', r: 1.5, y: -1.5 },
  { ch: 'l', r: 4, y: 0.5 },
  { ch: 's', r: 7, y: 3 },
];

/* Each bottle is a heavy SVG, so appending a page must never re-render the
   cells that are already on screen. */
const LevelCell = React.memo(function LevelCell({ num, unlocked, stars, current, shake, onTap }) {
  return (
    <button
      className={[
        'lslevel-cell',
        unlocked ? 'lslevel-cell--unlocked' : 'lslevel-cell--locked',
        current ? 'lslevel-cell--current' : '',
        shake ? 'lslevel-cell--shake' : '',
      ].filter(Boolean).join(' ')}
      onClick={() => onTap(num)}
      aria-label={`Level ${num}${unlocked ? '' : ' (locked)'}`}
    >
      <LevelBottle num={num} unlocked={unlocked} stars={stars} />
    </button>
  );
});

export const LevelSelectScreen = () => {
  const navigate = useNavigate();
  const {
    coins,
    currentDifficulty,
    unlockedLevels,
    levelStars,
    soundEnabled,
  } = usePlayer();

  const difficulty = currentDifficulty || 'normal';
  const unlocked = unlockedLevels[difficulty] || [1];
  const starsMap = levelStars[difficulty] || {};

  const [lockedShake, setLockedShake] = useState(null);

  // Infinite progression: the grid always shows at least two pages so there is
  // something to scroll, and grows every time the player reaches the bottom.
  const unlockedSet = useMemo(() => new Set(unlocked), [unlocked]);
  const highestUnlocked = unlocked.reduce((max, n) => Math.max(max, n), 1);
  const initialVisible = Math.max(
    PAGE_SIZE * 2,
    Math.ceil((highestUnlocked + 1) / PAGE_SIZE) * PAGE_SIZE
  );
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const gridRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => setVisibleCount(c => Math.max(c, initialVisible)), [initialVisible]);

  const levels = useMemo(() => Array.from({ length: visibleCount }, (_, i) => i + 1), [visibleCount]);

  const scrollRead = useRef(0);
  const scrollIdle = useRef(0);
  const handleGridScroll = (e) => {
    const el = e.currentTarget;
    const stage = stageRef.current;
    if (stage) stage.classList.add('is-scrolling');
    clearTimeout(scrollIdle.current);
    scrollIdle.current = setTimeout(() => stage && stage.classList.remove('is-scrolling'), 220);
    // Height reads happen once a frame instead of once per scroll event.
    if (scrollRead.current) return;
    scrollRead.current = requestAnimationFrame(() => {
      scrollRead.current = 0;
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < el.clientHeight * 0.4;
      if (nearBottom) setVisibleCount(c => c + PAGE_SIZE);
    });
  };

  const shakeTimer = useRef(0);
  useEffect(() => () => {
    clearTimeout(shakeTimer.current);
    clearTimeout(scrollIdle.current);
    if (scrollRead.current) cancelAnimationFrame(scrollRead.current);
  }, []);

  // Jump straight to the newest unlocked level when it is beyond page one.
  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el || highestUnlocked <= PAGE_SIZE) return;
    const row = Math.floor((highestUnlocked - 1) / COLUMNS);
    const rowH = el.clientHeight / 4;
    el.scrollTop = Math.max(0, row * rowH - el.clientHeight / 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLevelTap = useCallback((num) => {
    if (unlockedSet.has(num)) {
      playTapSound(soundEnabled);
      navigate(`/game/${difficulty}/${num}`);
    } else {
      setLockedShake(num);
      clearTimeout(shakeTimer.current);
      shakeTimer.current = setTimeout(() => setLockedShake(null), 480);
    }
  }, [unlockedSet, soundEnabled, navigate, difficulty]);

  return (
    <div className="lscreen" ref={stageRef}>
      <div className="lsstage">
        <WaterBackground />

        {/* ═══ TOP HUD ═══ */}
        <div className="lshud">
          <div className="lscoin-capsule">
            <CoinIcon />
            <span className="lscoin-count">{coins}</span>
            <button
              className="lscoin-plus"
              onClick={() => { playTapSound(soundEnabled); navigate('/shop/bottles'); }}
              aria-label="Get more coins"
            >
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <rect x="4.6" y="0.8" width="2.8" height="10.4" rx="1.4" fill="#FFFFFF" />
                <rect x="0.8" y="4.6" width="10.4" height="2.8" rx="1.4" fill="#FFFFFF" />
              </svg>
            </button>
          </div>

          <button
            className="lscircle-btn lssettings-btn"
            onClick={() => { playTapSound(soundEnabled); navigate('/settings'); }}
            aria-label="Settings"
          >
            <GearIcon />
          </button>
        </div>

        {/* ═══ BACK BUTTON (below coin HUD, left) ═══ */}
        <button
          className="lscircle-btn lsback-btn"
          onClick={() => { playTapSound(soundEnabled); navigate('/'); }}
          aria-label="Back to Home"
        >
          <BackArrowIcon />
        </button>

        {/* ═══ MAIN COLUMN ═══ */}
        <div className="lsmain">
          {/* ── Levels logo ── */}
          <div className="lslogo-block">
            <LogoLeaves />
            <div className="lslogo-crown"><CrownIcon /></div>
            <h1 className="lslogo-title" aria-label="Levels">
              {TITLE_LETTERS.map((t, i) => (
                <span
                  key={i}
                  className="lsletter"
                  style={{ transform: `rotate(${t.r}deg) translateY(calc(${t.y} * var(--u)))` }}
                >
                  <span className="lsletter-back" aria-hidden="true">{t.ch}</span>
                  <span className="lsletter-front" aria-hidden="true">{t.ch}</span>
                </span>
              ))}
            </h1>

            <Droplet size="calc(30 * var(--u))" rotate={-24} style={{ left: 'calc(86 * var(--u))', top: 'calc(84 * var(--u))' }} />
            <Droplet size="calc(15 * var(--u))" rotate={-12} style={{ left: 'calc(74 * var(--u))', top: 'calc(124 * var(--u))' }} />
            <Droplet size="calc(30 * var(--u))" rotate={22} style={{ right: 'calc(86 * var(--u))', top: 'calc(80 * var(--u))' }} />
            <Droplet size="calc(15 * var(--u))" rotate={10} style={{ right: 'calc(74 * var(--u))', top: 'calc(120 * var(--u))' }} />
            <Droplet size="calc(12 * var(--u))" rotate={-8} style={{ left: 'calc(150 * var(--u))', top: 'calc(50 * var(--u))' }} />
            <Droplet size="calc(11 * var(--u))" rotate={8} style={{ right: 'calc(152 * var(--u))', top: 'calc(46 * var(--u))' }} />

            <Sparkle size="calc(10 * var(--u))" style={{ left: 'calc(120 * var(--u))', top: 'calc(62 * var(--u))' }} />
            <Sparkle size="calc(9 * var(--u))" style={{ right: 'calc(122 * var(--u))', top: 'calc(58 * var(--u))' }} />
            <Sparkle size="calc(7 * var(--u))" style={{ left: 'calc(64 * var(--u))', top: 'calc(102 * var(--u))' }} />
            <Sparkle size="calc(7 * var(--u))" style={{ right: 'calc(62 * var(--u))', top: 'calc(98 * var(--u))' }} />

            <WoodenPlaque />
          </div>

          {/* ── 5 × 4 level grid ── */}
          <div className="lsgrid-wrap">
            <svg className="lsdeco lsdeco-lily-1" viewBox="0 0 44 22" aria-hidden="true">
              <ellipse cx="22" cy="13" rx="18" ry="7" fill="#3FA84F" opacity="0.9" />
              <path d="M22 13 L36 8" stroke="#2C8530" strokeWidth="2.4" />
              <ellipse cx="16" cy="10" rx="6" ry="2" fill="#6BCB63" opacity="0.85" />
            </svg>
            <svg className="lsdeco lsdeco-rock-1" viewBox="0 0 30 16" aria-hidden="true">
              <ellipse cx="15" cy="11" rx="12" ry="4.4" fill="#7FE9F5" opacity="0.4" />
              <path d="M6 10 Q9 3 15 3 Q21 3 24 10 Q19 12.5 15 12.5 Q10 12.5 6 10 Z" fill="#8A7FB5" />
              <path d="M9 5 Q13 3.5 16 5" stroke="#B3A8D6" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
            <svg className="lsdeco lsdeco-lily-2" viewBox="0 0 44 22" aria-hidden="true">
              <ellipse cx="22" cy="13" rx="18" ry="7" fill="#3FA84F" opacity="0.85" />
              <path d="M22 13 L9 8" stroke="#2C8530" strokeWidth="2.4" />
            </svg>
            <svg className="lsdeco lsdeco-rock-2" viewBox="0 0 30 16" aria-hidden="true">
              <ellipse cx="15" cy="11" rx="12" ry="4.4" fill="#7FE9F5" opacity="0.4" />
              <path d="M7 10 Q10 4 15 4 Q20 4 23 10 Q19 12 15 12 Q11 12 7 10 Z" fill="#8A7FB5" />
            </svg>
            <div className="lsdeco lsdeco-bubbles-1" aria-hidden="true">
              <span /><span /><span />
            </div>
            <div className="lsdeco lsdeco-bubbles-2" aria-hidden="true">
              <span /><span /><span />
            </div>

            <div
              ref={gridRef}
              className="lsgrid"
              onScroll={handleGridScroll}
              style={{ gridTemplateColumns: `repeat(${COLUMNS}, 1fr)` }}
            >
              {levels.map((num) => (
                <LevelCell
                  key={num}
                  num={num}
                  unlocked={unlockedSet.has(num)}
                  stars={starsMap[num] || 0}
                  current={num === highestUnlocked}
                  shake={lockedShake === num}
                  onTap={handleLevelTap}
                />
              ))}
            </div>
          </div>

          {/* ── Better With Every Level island ── */}
          <BottomIslandSign />
        </div>

        {/* ═══ BOTTOM NAVIGATION ═══ */}
        <BottomNav activeTab="levels" />
      </div>
    </div>
  );
};

export default LevelSelectScreen;
