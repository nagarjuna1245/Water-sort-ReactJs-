import React from 'react';

/* ---------------------------------------------------------------------------
 * 40 hand-composed illustrated scenes (one per theme id), drawn in a
 * 124x100 viewBox and used as the theme shop card artwork.
 * ------------------------------------------------------------------------- */

const Stars = ({ n = 14, maxY = 60, color = '#FFFFFF' }) => (
  <g fill={color}>
    {Array.from({ length: n }, (_, i) => {
      const x = (i * 47 + 13) % 124;
      const y = (i * 29 + 7) % maxY;
      const r = 0.7 + ((i * 13) % 7) / 7;
      return <circle key={i} cx={x} cy={y} r={r} opacity={0.35 + (((i * 17) % 10) / 10) * 0.6} />;
    })}
  </g>
);

const Fish = ({ x, y, s = 1, fill = '#FB923C', flip = false }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
    <ellipse cx="0" cy="0" rx="6" ry="3.4" fill={fill} />
    <path d="M5 0 L10 -3.4 L10 3.4 Z" fill={fill} />
    <circle cx="-3" cy="-0.8" r="0.9" fill="#0A1450" />
  </g>
);

const Palm = ({ x, y, s = 1, frond = '#1E8E3E', trunk = '#8B5A2B' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 Q-3 -14 2 -26" stroke={trunk} strokeWidth="4" fill="none" strokeLinecap="round" />
    <g fill={frond}>
      <path d="M2 -26 Q-14 -32 -20 -24 Q-8 -24 2 -26 Z" />
      <path d="M2 -26 Q18 -32 24 -24 Q12 -24 2 -26 Z" />
      <path d="M2 -26 Q-6 -40 -14 -40 Q-6 -32 2 -26 Z" />
      <path d="M2 -26 Q10 -40 18 -40 Q10 -32 2 -26 Z" />
      <path d="M2 -26 Q2 -42 6 -44 Q6 -34 2 -26 Z" />
    </g>
  </g>
);

const Pine = ({ x, y, s = 1, snow = false, dark = '#14532D', mid = '#166534' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 -22 L8 -8 L-8 -8 Z" fill={dark} />
    <path d="M0 -14 L10 2 L-10 2 Z" fill={mid} />
    <rect x="-1.6" y="2" width="3.2" height="5" fill="#78350F" />
    {snow && <path d="M0 -22 L5 -13 L-5 -13 Z" fill="#E8F6FF" opacity="0.9" />}
  </g>
);

const Gem = ({ x, y, s = 1, light, mid, dark }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-16 -8 L-8 -16 L8 -16 L16 -8 L0 18 Z" fill={mid} />
    <path d="M-8 -16 L8 -16 L16 -8 L-16 -8 Z" fill={light} />
    <path d="M-16 -8 L0 -4 L0 18 Z" fill={dark} />
    <path d="M16 -8 L0 -4 L0 18 Z" fill={mid} opacity="0.8" />
    <path d="M-8 -16 L0 -4 L8 -16 Z" fill={light} opacity="0.7" />
    <path d="M-6 -14 L-2 -14 L-8 -9 L-11 -9 Z" fill="#FFFFFF" opacity="0.55" />
  </g>
);

const SCENES = {
  /* 1 — mini puzzle board with glossy colored blocks */
  Classic: () => {
    const cols = [
      ['#3B82F6', '#8B5CF6', '#F97316'],
      ['#22C55E', '#EC4899'],
      ['#EF4444', '#3B82F6', '#22C55E'],
      ['#F97316'],
      ['#8B5CF6', '#EC4899', '#3B82F6'],
    ];
    return (
      <>
        <rect width="124" height="100" fill="#0B1238" />
        <rect x="10" y="8" width="104" height="84" rx="8" fill="#151E4F" stroke="#2A3A7A" strokeWidth="2" />
        {cols.map((stack, c) =>
          stack.map((col, r) => {
            const x = 17 + c * 19, y = 66 - r * 22;
            return (
              <g key={`${c}-${r}`}>
                <rect x={x} y={y} width="15" height="20" rx="3" fill={col} />
                <rect x={x} y={y} width="15" height="7" rx="3" fill="#FFFFFF" opacity="0.3" />
              </g>
            );
          })
        )}
      </>
    );
  },

  /* 2 — lush forest, waterfall, light rays */
  Forest: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A7E39B" /><stop offset="1" stopColor="#1B5E20" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <g fill="#FFFFFF" opacity="0.22">
        <path d="M28 0 L44 0 L30 66 L22 66 Z" />
        <path d="M70 0 L80 0 L70 66 L64 66 Z" />
      </g>
      <path d="M0 74 Q30 60 62 72 T124 68 V100 H0 Z" fill="#14532D" />
      <Pine x={22} y={70} s={1.5} dark="#166534" mid="#22C55E" />
      <Pine x={100} y={74} s={1.7} />
      <Pine x={62} y={66} s={1.1} dark="#14532D" mid="#1B8A45" />
      <path d="M50 20 Q54 18 58 21 L61 70 Q54 74 47 70 Z" fill="#E8F8FF" opacity="0.9" />
      <path d="M53 24 L55 68" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.8" />
      <ellipse cx="54" cy="72" rx="12" ry="3.5" fill="#BFEFCE" opacity="0.8" />
    </>
  ),

  /* 3 — purple-teal underwater reef */
  Ocean: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7C3AED" /><stop offset="0.55" stopColor="#0E7490" /><stop offset="1" stopColor="#155E75" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <g fill="#FFFFFF" opacity="0.12">
        <path d="M18 0 L32 0 L20 62 L13 62 Z" /><path d="M78 0 L86 0 L76 62 L71 62 Z" />
      </g>
      <path d="M0 88 Q32 79 62 88 T124 85 V100 H0 Z" fill="#FDE68A" opacity="0.85" />
      <g stroke="#F472B6" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M18 90 Q16 74 22 64" /><path d="M22 90 Q28 78 36 72" />
      </g>
      <g stroke="#FB923C" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M102 92 Q104 76 98 66" /><path d="M98 92 Q92 80 86 74" />
      </g>
      <circle cx="60" cy="90" r="6" fill="#22D3EE" opacity="0.8" />
      <Fish x={44} y={40} fill="#FBBF24" />
      <Fish x={92} y={54} s={0.8} fill="#F472B6" flip />
      <g fill="#FFFFFF" opacity="0.6">
        <circle cx="70" cy="30" r="2.4" /><circle cx="76" cy="20" r="1.6" /><circle cx="66" cy="14" r="1.2" />
      </g>
    </>
  ),

  /* 4 — warm dusk amber radiance */
  Sunset: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7C2D92" /><stop offset="0.45" stopColor="#F97316" /><stop offset="0.75" stopColor="#FDBA74" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <circle cx="62" cy="62" r="17" fill="#FFE27A" />
      <circle cx="62" cy="62" r="17" fill="none" stroke="#FFF3B0" strokeWidth="3" opacity="0.6" />
      <rect x="0" y="64" width="124" height="36" fill="#0E7490" opacity="0.75" />
      <path d="M52 70 L72 70 L66 96 L58 96 Z" fill="#FFE27A" opacity="0.4" />
      <g fill="#3B0764" opacity="0.9">
        <path d="M14 64 Q18 50 16 40 L20 40 Q22 52 18 64 Z" />
        <path d="M16 40 Q6 34 2 40 Q10 40 15 44 Z M16 40 Q26 32 32 38 Q22 40 17 44 Z M16 40 Q14 28 8 26 Q12 36 15 41 Z" />
      </g>
      <path d="M84 24 Q92 20 100 24" stroke="#FFFFFF" strokeWidth="1.4" fill="none" opacity="0.7" />
    </>
  ),

  /* 5 — cosmic twilight with ringed planet */
  Space: (u) => (
    <>
      <defs>
        <radialGradient id={`${u}a`} cx="0.5" cy="0.4" r="0.9">
          <stop offset="0" stopColor="#4C1D95" /><stop offset="1" stopColor="#1E1065" />
        </radialGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <Stars n={20} maxY={100} />
      <g transform="translate(62 52)">
        <circle r="18" fill="#A855F7" />
        <circle r="18" fill="none" stroke="#E9D5FF" strokeWidth="2" opacity="0.5" />
        <path d="M-12 -6 Q0 -12 12 -6" stroke="#7E22CE" strokeWidth="3" fill="none" opacity="0.8" />
        <path d="M-14 4 Q0 -2 14 4" stroke="#7E22CE" strokeWidth="3" fill="none" opacity="0.8" />
        <ellipse rx="30" ry="8" fill="none" stroke="#FBBF24" strokeWidth="3.5" transform="rotate(-18)" opacity="0.9" />
      </g>
      <circle cx="18" cy="82" r="6" fill="#38BDF8" opacity="0.85" />
      <circle cx="108" cy="16" r="4" fill="#F472B6" opacity="0.85" />
    </>
  ),

  /* 6 — glacial frost: cottage, pines, snow */
  Winter: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BAE6FD" /><stop offset="1" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M0 76 Q40 66 80 76 T124 72 V100 H0 Z" fill="#F8FAFC" />
      <Pine x={18} y={76} s={1.4} snow />
      <Pine x={108} y={80} s={1.6} snow />
      <g>
        <rect x="48" y="58" width="30" height="22" fill="#92400E" />
        <path d="M44 60 L63 44 L82 60 Z" fill="#DC2626" />
        <path d="M44 60 L63 44 L82 60" stroke="#F8FAFC" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <rect x="58" y="66" width="10" height="14" fill="#FDE68A" />
        <rect x="58" y="66" width="10" height="14" fill="none" stroke="#78350F" strokeWidth="1.6" />
      </g>
      <g fill="#FFFFFF" opacity="0.9">
        <circle cx="20" cy="18" r="1.8" /><circle cx="52" cy="12" r="1.4" /><circle cx="86" cy="22" r="1.8" /><circle cx="106" cy="10" r="1.3" /><circle cx="36" cy="30" r="1.3" />
      </g>
    </>
  ),

  /* 7 — cherry blossoms + pagoda */
  Sakura: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE4E6" /><stop offset="1" stopColor="#FDA4AF" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M0 84 Q40 74 74 84 T124 80 V100 H0 Z" fill="#86EFAC" />
      <g fill="#9F1239">
        <rect x="54" y="56" width="18" height="26" />
        <path d="M44 58 L63 46 L82 58 Z" />
        <path d="M48 44 L63 34 L78 44 Z" />
        <rect x="58" y="28" width="10" height="8" />
        <path d="M42 60 L63 46 L84 60" stroke="#FB7185" strokeWidth="3" fill="none" />
        <path d="M46 46 L63 34 L80 46" stroke="#FB7185" strokeWidth="3" fill="none" />
      </g>
      <path d="M-2 26 Q22 18 40 28" stroke="#7C2D12" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g fill="#FB7185">
        <circle cx="8" cy="20" r="6" /><circle cx="20" cy="16" r="7" /><circle cx="30" cy="24" r="6" /><circle cx="40" cy="26" r="5" /><circle cx="16" cy="26" r="5" />
      </g>
      <g fill="#FDA4AF">
        <circle cx="12" cy="14" r="4" /><circle cx="26" cy="18" r="4" /><circle cx="36" cy="20" r="3.4" />
      </g>
      <g fill="#FB7185" opacity="0.8">
        <circle cx="60" cy="70" r="2" /><circle cx="96" cy="40" r="2.2" /><circle cx="110" cy="66" r="2" />
      </g>
    </>
  ),

  /* 8 — saguaro cactus + dunes */
  Desert: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDBA74" /><stop offset="1" stopColor="#FEF08A" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <circle cx="94" cy="22" r="12" fill="#FFED4A" />
      <circle cx="94" cy="22" r="16" fill="#FFED4A" opacity="0.35" />
      <path d="M0 70 Q34 56 70 70 T124 64 V100 H0 Z" fill="#F59E0B" />
      <path d="M0 86 Q44 74 90 88 T124 84 V100 H0 Z" fill="#B45309" opacity="0.6" />
      <g fill="#15803D">
        <rect x="30" y="38" width="10" height="42" rx="5" />
        <path d="M22 52 Q22 42 28 42 L28 48 Q26 48 26 54 L26 62 L22 62 Z" />
        <path d="M48 46 Q48 36 42 36 L42 42 Q44 42 44 48 L44 58 L48 58 Z" />
      </g>
      <g stroke="#166534" strokeWidth="1.4" opacity="0.7">
        <path d="M33 44 L33 74" /><path d="M37 44 L37 74" />
      </g>
      <circle cx="35" cy="36" r="2.4" fill="#F43F5E" />
    </>
  ),

  /* 9 — rich glowing jewel */
  Emerald: (u) => (
    <>
      <defs>
        <radialGradient id={`${u}a`} cx="0.5" cy="0.5" r="0.9">
          <stop offset="0" stopColor="#065F46" /><stop offset="1" stopColor="#022C22" />
        </radialGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <circle cx="62" cy="50" r="30" fill="#10B981" opacity="0.25" />
      <Gem x={62} y={48} s={1.5} light="#6EE7B7" mid="#10B981" dark="#047857" />
      <Stars n={8} maxY={100} color="#A7F3D0" />
      <circle cx="22" cy="78" r="3" fill="#34D399" opacity="0.7" />
      <circle cx="104" cy="24" r="3.4" fill="#6EE7B7" opacity="0.7" />
    </>
  ),

  /* 10 — regal crystalline magic */
  Amethyst: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#312E81" /><stop offset="1" stopColor="#1E1B4B" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <Stars n={10} color="#DDD6FE" />
      <path d="M0 88 Q40 78 74 88 T124 84 V100 H0 Z" fill="#4C1D95" />
      <g>
        <path d="M46 86 L46 44 L56 30 L66 44 L66 86 Z" fill="#8B5CF6" />
        <path d="M56 30 L66 44 L56 86 L46 44 Z" fill="#C4B5FD" opacity="0.8" />
        <path d="M66 86 L66 52 L76 40 L84 52 L84 86 Z" fill="#7C3AED" />
        <path d="M76 40 L84 52 L75 86 L68 52 Z" fill="#A78BFA" opacity="0.8" />
        <path d="M30 86 L30 62 L38 52 L46 62 L46 86 Z" fill="#6D28D9" />
        <path d="M38 52 L46 62 L38 86 L32 62 Z" fill="#8B5CF6" opacity="0.9" />
      </g>
      <path d="M52 40 L54 40" stroke="#F5F3FF" strokeWidth="3" strokeLinecap="round" />
    </>
  ),

  /* 11 — deep passionate crimson */
  Ruby: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9F1239" /><stop offset="1" stopColor="#4C051E" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <g fill="#BE123C" opacity="0.5">
        <path d="M0 0 Q30 12 20 40 Q8 22 0 30 Z" /><path d="M124 100 Q92 88 104 58 Q118 76 124 68 Z" />
      </g>
      <Gem x={62} y={50} s={1.6} light="#FDA4AF" mid="#F43F5E" dark="#BE123C" />
      <Stars n={7} maxY={100} color="#FFE4E6" />
    </>
  ),

  /* 12 — brilliant deep ocean blue */
  Sapphire: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E3A8A" /><stop offset="1" stopColor="#0C1445" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <Stars n={14} color="#BFDBFE" />
      <path d="M0 82 Q34 70 66 82 T124 78 V100 H0 Z" fill="#1D4ED8" opacity="0.7" />
      <Gem x={62} y={46} s={1.5} light="#93C5FD" mid="#3B82F6" dark="#1E40AF" />
      <circle cx="62" cy="42" r="4" fill="#DBEAFE" opacity="0.8" />
    </>
  ),

  /* 13 — sweet sunlit crystal drops */
  Amber: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" /><stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <circle cx="62" cy="20" r="14" fill="#FFF7CC" opacity="0.9" />
      <path d="M62 30 Q76 52 76 64 A14 14 0 1 1 48 64 Q48 52 62 30 Z" fill="#D97706" />
      <path d="M62 30 Q76 52 76 64 A14 14 0 1 1 48 64 Q48 52 62 30 Z" fill="none" stroke="#B45309" strokeWidth="2" />
      <ellipse cx="56" cy="62" rx="4" ry="7" fill="#FDE68A" opacity="0.8" />
      <circle cx="68" cy="72" r="2.6" fill="#92400E" opacity="0.7" />
      <circle cx="60" cy="78" r="1.8" fill="#92400E" opacity="0.6" />
    </>
  ),

  /* 14 — vibrant tropical underwater */
  Coral: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#22D3EE" /><stop offset="1" stopColor="#0E7490" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M0 86 Q36 76 70 86 T124 82 V100 H0 Z" fill="#FDE68A" />
      <g stroke="#FB7185" strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M24 88 Q20 68 28 56" /><path d="M28 88 Q36 72 46 66" /><path d="M22 88 Q12 78 8 68" />
      </g>
      <g stroke="#F472B6" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M98 90 Q102 72 94 62" /><path d="M104 90 Q112 78 116 70" />
      </g>
      <Fish x={56} y={40} fill="#FBBF24" />
      <Fish x={84} y={52} s={0.75} fill="#A21CAF" flip />
      <g fill="#FFFFFF" opacity="0.65">
        <circle cx="66" cy="24" r="2.6" /><circle cx="72" cy="14" r="1.6" />
      </g>
    </>
  ),

  /* 15 — gentle calming lilac */
  Lavender: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9D5FF" /><stop offset="1" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <circle cx="24" cy="20" r="10" fill="#FEFCE8" opacity="0.9" />
      <path d="M0 62 Q40 52 76 62 T124 58 V100 H0 Z" fill="#4D7C0F" opacity="0.5" />
      {[10, 30, 50, 70, 90, 110].map((x, i) => (
        <g key={x} transform={`translate(${x} ${70 + (i % 2) * 10})`}>
          <path d="M0 20 L0 0" stroke="#16A34A" strokeWidth="2.4" />
          <g fill={i % 2 ? '#9333EA' : '#C084FC'}>
            <circle cx="0" cy="-2" r="4" /><circle cx="-3" cy="4" r="3.4" /><circle cx="3" cy="4" r="3.4" /><circle cx="0" cy="9" r="3" />
          </g>
        </g>
      ))}
    </>
  ),

  /* 16 — cool revitalizing mint */
  Mint: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0FDFA" /><stop offset="1" stopColor="#99F6E4" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <g transform="translate(48 52) rotate(-18)">
        <path d="M0 0 Q-26 -8 -30 -34 Q-6 -34 6 -16 Q10 -2 0 0 Z" fill="#0D9488" />
        <path d="M-4 -4 Q-20 -14 -24 -28" stroke="#5EEAD4" strokeWidth="2.4" fill="none" />
      </g>
      <g transform="translate(78 44) rotate(24)">
        <path d="M0 0 Q22 -6 26 -30 Q4 -30 -6 -14 Q-8 -2 0 0 Z" fill="#2DD4BF" />
        <path d="M2 -4 Q16 -12 20 -24" stroke="#F0FDFA" strokeWidth="2" fill="none" opacity="0.8" />
      </g>
      <g transform="translate(62 76)">
        <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" transform="rotate(14)" />
      </g>
      <Stars n={6} maxY={100} color="#FFFFFF" />
    </>
  ),

  /* 17 — zesty energizing citrus */
  Lemon: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEF9C3" /><stop offset="1" stopColor="#FDE047" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <g transform="translate(52 56)">
        <circle r="24" fill="#FACC15" />
        <circle r="20" fill="#FEF9C3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M0 0 L17 -6 A18 18 0 0 1 17 6 Z" fill="#FDE047" transform={`rotate(${a})`} />
        ))}
        <circle r="24" fill="none" stroke="#CA8A04" strokeWidth="3" />
      </g>
      <path d="M78 34 Q96 20 108 30 Q94 40 80 38 Z" fill="#16A34A" />
      <g fill="#FFFFFF" opacity="0.8">
        <circle cx="20" cy="18" r="2.4" /><circle cx="104" cy="70" r="2" /><circle cx="16" cy="82" r="1.8" />
      </g>
    </>
  ),

  /* 18 — erupting volcano */
  Volcano: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7F1D1D" /><stop offset="1" stopColor="#450A0A" />
        </linearGradient>
        <linearGradient id={`${u}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBBF24" /><stop offset="1" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <g fill="#F97316" opacity="0.55">
        <circle cx="48" cy="18" r="9" /><circle cx="66" cy="12" r="11" /><circle cx="80" cy="22" r="8" />
      </g>
      <path d="M14 100 L48 40 L78 100 Z" fill="#3F1410" />
      <path d="M48 40 L78 100 L120 100 L82 48 Z" fill="#57201A" />
      <path d="M44 46 L52 40 L58 46 L64 100 L40 100 Z" fill={`url(#${u}b)`} opacity="0.95" />
      <path d="M56 52 Q64 70 62 100 L70 100 Q68 68 60 50 Z" fill="#FBBF24" opacity="0.8" />
      <g fill="#FDE047">
        <circle cx="40" cy="26" r="2.2" /><circle cx="72" cy="26" r="2" /><circle cx="58" cy="18" r="2.4" />
      </g>
    </>
  ),

  /* 19 — futuristic synthwave glow */
  Cyberpunk: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2E1065" /><stop offset="1" stopColor="#0F0524" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <circle cx="62" cy="34" r="16" fill="#F472B6" opacity="0.9" />
      <g stroke="#2E1065" strokeWidth="2">
        <path d="M46 30 H78" /><path d="M47 36 H77" /><path d="M50 42 H74" />
      </g>
      <g>
        {[[10, 52, 14], [28, 40, 12], [44, 60, 10], [78, 46, 14], [96, 58, 10], [110, 66, 12]].map(([x, top, w], i) => (
          <g key={i}>
            <rect x={x} y={top} width={w} height={100 - top} fill="#1E1B4B" stroke={i % 2 ? '#06B6D4' : '#F472B6'} strokeWidth="1.6" />
            <g fill={i % 2 ? '#67E8F9' : '#F9A8D4'}>
              {Array.from({ length: 4 }, (_, r) => <rect key={r} x={x + 3} y={top + 5 + r * 9} width={w - 6} height="3" opacity="0.9" />)}
            </g>
          </g>
        ))}
      </g>
      <path d="M0 96 H124" stroke="#06B6D4" strokeWidth="3" opacity="0.8" />
    </>
  ),

  /* 20 — tranquil green tea */
  Matcha: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7FEE7" /><stop offset="1" stopColor="#D9F99D" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M0 60 Q30 50 62 60 T124 56 V100 H0 Z" fill="#84CC16" opacity="0.5" />
      {[68, 80, 92].map((y, r) => (
        <g key={y}>
          {[10, 34, 58, 82, 106].map((x, i) => (
            <ellipse key={i} cx={x + (r % 2) * 8} cy={y} rx="9" ry="5.5" fill={r % 2 ? '#4D7C0F' : '#65A30D'} />
          ))}
        </g>
      ))}
      <g transform="translate(40 36)">
        <path d="M-14 0 A14 10 0 0 0 14 0 Z" fill="#F8FAFC" stroke="#4D7C0F" strokeWidth="2" />
        <ellipse cy="0" rx="13" ry="3.6" fill="#84CC16" />
        <path d="M-4 -8 Q-6 -14 -2 -18 M4 -8 Q2 -14 6 -18" stroke="#A3E635" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="24" r="9" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="2" opacity="0.9" />
    </>
  ),

  /* 21 — soft pastel summer fruit */
  Peach: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFEDD5" /><stop offset="1" stopColor="#FED7AA" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <g>
        <circle cx="48" cy="60" r="22" fill="#FB923C" />
        <circle cx="48" cy="60" r="22" fill="none" stroke="#EA580C" strokeWidth="2" />
        <path d="M48 38 Q42 52 48 62" stroke="#EA580C" strokeWidth="2" fill="none" opacity="0.6" />
        <circle cx="40" cy="52" r="6" fill="#FDBA74" opacity="0.8" />
        <path d="M50 38 Q62 26 74 32 Q64 42 52 42 Z" fill="#16A34A" />
      </g>
      <g transform="translate(84 74) scale(0.8)">
        <circle cx="0" cy="0" r="20" fill="#F97316" />
        <circle cx="-6" cy="-6" r="5" fill="#FDBA74" opacity="0.8" />
      </g>
      <Stars n={5} maxY={40} color="#FFFFFF" />
    </>
  ),

  /* 22 — shimmering celestial curtain */
  Aurora: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F172A" /><stop offset="1" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id={`${u}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6EE7B7" stopOpacity="0" /><stop offset="1" stopColor="#6EE7B7" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${u}c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#818CF8" stopOpacity="0" /><stop offset="1" stopColor="#38BDF8" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <Stars n={12} maxY={70} />
      <path d="M8 8 Q30 30 24 58 Q40 40 44 8 Z" fill={`url(#${u}b)`} opacity="0.8" />
      <path d="M48 6 Q66 28 60 56 Q78 38 82 6 Z" fill={`url(#${u}c)`} opacity="0.85" />
      <path d="M84 10 Q100 28 96 50 Q112 34 116 10 Z" fill={`url(#${u}b)`} opacity="0.7" />
      <path d="M0 82 Q40 70 78 82 T124 78 V100 H0 Z" fill="#E0F2FE" opacity="0.9" />
    </>
  ),

  /* 23 — stealthy elegant dark */
  Midnight: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E293B" /><stop offset="1" stopColor="#020617" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <Stars n={12} maxY={60} color="#CBD5E1" />
      <circle cx="88" cy="26" r="13" fill="#E2E8F0" />
      <circle cx="83" cy="23" r="3" fill="#94A3B8" opacity="0.6" />
      <circle cx="93" cy="31" r="2.2" fill="#94A3B8" opacity="0.6" />
      <path d="M0 84 Q40 74 76 84 T124 80 V100 H0 Z" fill="#0F172A" />
      <Pine x={22} y={82} s={1.5} dark="#0F172A" mid="#1E293B" />
      <Pine x={42} y={86} s={1.2} dark="#0F172A" mid="#1E293B" />
      <path d="M56 30 Q70 26 84 30" stroke="#475569" strokeWidth="3" fill="none" opacity="0.7" />
    </>
  ),

  /* 24 — dazzling royal treasure */
  Gold: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEF08A" /><stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <g fill="#B45309">
        <path d="M28 78 L62 34 L96 78 Z" />
        <rect x="34" y="78" width="56" height="14" />
      </g>
      <g fill="#F59E0B">
        <rect x="38" y="52" width="7" height="26" /><rect x="52" y="52" width="7" height="26" />
        <rect x="66" y="52" width="7" height="26" /><rect x="80" y="52" width="7" height="26" />
      </g>
      <path d="M62 34 L56 44 H68 Z" fill="#FDE68A" />
      <circle cx="62" cy="24" r="5" fill="#FFF7CC" />
      <g fill="#FDE68A" opacity="0.9">
        <circle cx="20" cy="20" r="2.4" /><circle cx="104" cy="16" r="2.8" /><circle cx="112" cy="40" r="2" />
      </g>
    </>
  ),

  /* 25 — starry intergalactic void */
  Galaxy: (u) => (
    <>
      <defs>
        <radialGradient id={`${u}a`} cx="0.5" cy="0.5" r="0.8">
          <stop offset="0" stopColor="#4C1D95" /><stop offset="1" stopColor="#0B0524" />
        </radialGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <Stars n={18} maxY={100} />
      <g transform="translate(62 50) rotate(-24)">
        <ellipse rx="40" ry="16" fill="#7E22CE" opacity="0.5" />
        <ellipse rx="28" ry="11" fill="#A855F7" opacity="0.7" />
        <ellipse rx="15" ry="6" fill="#DDD6FE" opacity="0.9" />
        <circle r="5" fill="#FFFFFF" />
      </g>
      <g fill="#E9D5FF" opacity="0.8">
        <circle cx="26" cy="24" r="1.8" /><circle cx="100" cy="76" r="2" /><circle cx="88" cy="18" r="1.5" />
      </g>
    </>
  ),

  /* 26 — hidden crystal spring */
  Oasis: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDF6E3" /><stop offset="1" stopColor="#CCFBF1" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M0 58 Q40 48 78 58 T124 54 V100 H0 Z" fill="#FDE68A" />
      <ellipse cx="62" cy="80" rx="38" ry="14" fill="#14B8A6" />
      <ellipse cx="62" cy="80" rx="38" ry="14" fill="none" stroke="#0F766E" strokeWidth="2" />
      <path d="M44 78 Q62 72 80 78" stroke="#5EEAD4" strokeWidth="2.4" fill="none" opacity="0.9" />
      <Palm x={30} y={62} s={1.1} />
      <Palm x={96} y={60} s={0.9} frond="#15803D" />
      <g fill="#0F766E" opacity="0.5"><circle cx="62" cy="90" r="1.6" /><circle cx="52" cy="88" r="1.3" /></g>
    </>
  ),

  /* 27 — serene floating river flower */
  Blossom: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDF2F8" /><stop offset="1" stopColor="#FBCFE8" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M0 66 Q40 58 80 66 T124 62 V100 H0 Z" fill="#86EFAC" opacity="0.5" />
      <ellipse cx="34" cy="80" rx="16" ry="5" fill="#22C55E" opacity="0.75" />
      <ellipse cx="94" cy="86" rx="13" ry="4.5" fill="#16A34A" opacity="0.6" />
      <g transform="translate(62 62)">
        {[-60, -30, 0, 30, 60].map((a) => (
          <path key={a} d="M0 6 Q-9 -10 0 -22 Q9 -10 0 6 Z" fill="#EC4899" transform={`rotate(${a})`} opacity="0.9" />
        ))}
        {[-45, -15, 15, 45].map((a) => (
          <path key={`i${a}`} d="M0 4 Q-7 -8 0 -16 Q7 -8 0 4 Z" fill="#FBCFE8" transform={`rotate(${a})`} />
        ))}
        <circle r="4.5" fill="#FDE047" />
      </g>
      <path d="M20 40 Q26 36 32 40" stroke="#F9A8D4" strokeWidth="2" fill="none" />
    </>
  ),

  /* 28 — pure architectural modernism */
  Monochrome: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E2E8F0" /><stop offset="1" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <circle cx="96" cy="20" r="10" fill="#F8FAFC" />
      <g>
        <rect x="12" y="44" width="20" height="56" fill="#475569" />
        <rect x="38" y="26" width="24" height="74" fill="#334155" />
        <rect x="68" y="52" width="18" height="48" fill="#64748B" />
        <rect x="92" y="36" width="22" height="64" fill="#475569" />
        <g fill="#E2E8F0" opacity="0.85">
          {[[16, 50], [16, 62], [16, 74], [43, 34], [43, 46], [43, 58], [43, 70], [72, 58], [72, 70], [97, 44], [97, 56], [97, 68]].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="4" height="6" />
          ))}
        </g>
      </g>
      <path d="M0 96 H124" stroke="#1E293B" strokeWidth="4" />
    </>
  ),

  /* 29 — turquoise water & warm sun */
  SunsetBeach: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDBA74" /><stop offset="0.5" stopColor="#F97316" /><stop offset="0.52" stopColor="#06B6D4" /><stop offset="1" stopColor="#0E7490" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <circle cx="62" cy="42" r="14" fill="#FFE27A" />
      <path d="M50 42 A12 12 0 0 1 74 42" stroke="#FDBA74" strokeWidth="3" fill="none" />
      <path d="M0 52 Q20 48 40 52 T80 52 T124 50 V56 H0 Z" fill="#F8FAFC" opacity="0.4" />
      <g stroke="#22D3EE" strokeWidth="2.4" fill="none" opacity="0.8">
        <path d="M14 68 Q24 64 34 68" /><path d="M70 76 Q80 72 90 76" /><path d="M40 88 Q52 84 64 88" />
      </g>
      <Palm x={102} y={54} s={1} frond="#15803D" trunk="#78350F" />
      <path d="M84 54 Q100 46 116 52 L116 58 H84 Z" fill="#FDE68A" />
    </>
  ),

  /* 30 — refracted spectrum rays */
  Prism: (u) => (
    <>
      <rect width="124" height="100" fill="#0F172A" />
      <path d="M0 50 L44 50" stroke="#F8FAFC" strokeWidth="4" />
      <path d="M62 20 L84 66 L40 66 Z" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
      {['#F43F5E', '#F97316', '#FACC15', '#22C55E', '#3B82F6', '#8B5CF6'].map((c, i) => (
        <path key={c} d={`M76 44 L124 ${26 + i * 9}`} stroke={c} strokeWidth="5" opacity="0.9" />
      ))}
      <path d="M56 30 L64 30 L60 38 Z" fill="#E2E8F0" opacity="0.7" />
    </>
  ),

  /* 31 — exotic tropical biodiversity */
  Rainforest: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BBF7D0" /><stop offset="1" stopColor="#14532D" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M54 24 Q58 22 62 25 L65 72 Q58 76 51 72 Z" fill="#E0F2FE" opacity="0.9" />
      <ellipse cx="58" cy="76" rx="12" ry="3.5" fill="#A5F3FC" opacity="0.7" />
      <g fill="#15803D">
        <path d="M-6 40 Q26 22 48 40 Q22 52 -6 48 Z" />
        <path d="M130 36 Q100 18 78 38 Q104 50 130 44 Z" />
      </g>
      <g fill="#16A34A">
        <path d="M-4 66 Q28 50 46 66 Q20 78 -4 74 Z" />
        <path d="M128 62 Q98 48 82 64 Q106 76 128 70 Z" />
      </g>
      <g fill="#22C55E">
        <path d="M0 96 Q30 80 62 92 Q30 104 0 100 Z" />
        <path d="M124 94 Q92 80 62 92 Q96 104 124 100 Z" />
      </g>
      <path d="M18 26 Q26 18 34 26" stroke="#86EFAC" strokeWidth="2" fill="none" />
      <circle cx="104" cy="24" r="3" fill="#FDE047" opacity="0.9" />
    </>
  ),

  /* 32 — playful confectionary pastel */
  Candy: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDF2F8" /><stop offset="1" stopColor="#FBCFE8" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M0 84 Q40 74 80 84 T124 80 V100 H0 Z" fill="#F9A8D4" />
      <g transform="translate(38 46)">
        <circle r="20" fill="#F43F5E" />
        <path d="M0 0 L0 -20 A20 20 0 0 1 14 -14 Z" fill="#FDF2F8" />
        <path d="M0 0 L14 14 A20 20 0 0 1 -6 19 Z" fill="#FDF2F8" />
        <path d="M0 0 L-20 0 A20 20 0 0 1 -14 -14 Z" fill="#FDF2F8" />
        <rect x="-1.6" y="18" width="3.2" height="26" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
      </g>
      <g transform="translate(88 58)">
        <rect x="-10" y="-10" width="20" height="20" rx="5" fill="#A855F7" />
        <path d="M-6 -4 Q0 -10 6 -4" stroke="#E9D5FF" strokeWidth="2.6" fill="none" />
      </g>
      <g fill="#38BDF8"><circle cx="70" cy="26" r="4" /><circle cx="106" cy="30" r="3.4" /></g>
      <g fill="#FDE047"><circle cx="18" cy="20" r="3" /><circle cx="52" cy="82" r="3.4" /><circle cx="96" cy="86" r="3" /></g>
    </>
  ),

  /* 33 — warm comforting espresso */
  Coffee: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEF3C7" /><stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M0 84 Q40 76 80 84 T124 80 V100 H0 Z" fill="#D97706" opacity="0.5" />
      <g transform="translate(58 58)">
        <path d="M-22 -12 H22 L18 20 Q0 26 -18 20 Z" fill="#F8FAFC" stroke="#B45309" strokeWidth="2" />
        <path d="M-20 -10 L-16 18 Q0 22 16 18 L20 -10 Z" fill="#78350F" />
        <path d="M-10 -2 Q0 -8 10 -2" stroke="#FDE68A" strokeWidth="2.6" fill="none" />
        <path d="M22 -4 Q34 -4 32 8 Q30 16 20 14" fill="none" stroke="#B45309" strokeWidth="3" />
        <path d="M-8 -20 Q-12 -28 -6 -34 M6 -20 Q2 -28 8 -34" stroke="#D97706" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.8" />
      </g>
      <g transform="translate(96 74) rotate(24)" fill="#92400E">
        <ellipse rx="7" ry="4.6" /><path d="M0 -4 Q2 0 0 4" stroke="#FDE68A" strokeWidth="1.4" fill="none" />
      </g>
      <g transform="translate(20 76) rotate(-18)" fill="#92400E">
        <ellipse rx="6" ry="4" /><path d="M0 -3.4 Q1.6 0 0 3.4" stroke="#FDE68A" strokeWidth="1.2" fill="none" />
      </g>
    </>
  ),

  /* 34 — pure sub-zero transparency */
  Iceberg: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0F2FE" /><stop offset="0.5" stopColor="#7DD3FC" /><stop offset="0.52" stopColor="#0284C7" /><stop offset="1" stopColor="#075985" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <path d="M28 50 L44 18 L58 36 L72 14 L92 50 Z" fill="#F8FAFC" />
      <path d="M44 18 L58 36 L50 50 L36 50 Z" fill="#BAE6FD" opacity="0.9" />
      <path d="M72 14 L92 50 L74 50 Z" fill="#E0F2FE" opacity="0.8" />
      <path d="M20 52 L100 52 L86 84 L60 92 L32 80 Z" fill="#38BDF8" opacity="0.5" />
      <path d="M28 52 L92 52 L82 74 L58 80 L36 70 Z" fill="#BAE6FD" opacity="0.45" />
      <g fill="#FFFFFF" opacity="0.85"><circle cx="16" cy="30" r="2" /><circle cx="110" cy="24" r="2.4" /><circle cx="102" cy="40" r="1.6" /></g>
    </>
  ),

  /* 35 — opulent aristocratic weave */
  Velvet: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7C3AED" /><stop offset="1" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <g fill="#5B21B6" opacity="0.85">
        <path d="M0 0 Q14 40 6 100 L0 100 Z" />
        <path d="M22 0 Q36 44 28 100 L14 100 Q22 46 10 0 Z" />
        <path d="M124 0 Q110 40 118 100 L124 100 Z" />
        <path d="M102 0 Q88 44 96 100 L110 100 Q102 46 114 0 Z" />
      </g>
      <path d="M0 0 Q62 26 124 0 L124 12 Q62 38 0 12 Z" fill="#8B5CF6" />
      <path d="M0 0 Q62 26 124 0" stroke="#C4B5FD" strokeWidth="2.4" fill="none" />
      <g fill="#FBBF24">
        <circle cx="62" cy="34" r="5" /><circle cx="62" cy="52" r="5" /><circle cx="62" cy="70" r="5" />
      </g>
      <path d="M57 34 Q62 30 67 34" stroke="#FDE68A" strokeWidth="1.6" fill="none" />
    </>
  ),

  /* 36 — crisp fallen golden foliage */
  Autumn: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FED7AA" /><stop offset="1" stopColor="#FDBA74" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <circle cx="94" cy="22" r="12" fill="#F59E0B" opacity="0.9" />
      <path d="M0 80 Q40 70 80 80 T124 76 V100 H0 Z" fill="#9A3412" opacity="0.7" />
      <g>
        <rect x="40" y="52" width="6" height="32" fill="#7C2D12" />
        <circle cx="43" cy="42" r="17" fill="#EA580C" />
        <circle cx="32" cy="48" r="11" fill="#DC2626" />
        <circle cx="54" cy="48" r="11" fill="#F59E0B" />
      </g>
      <g>
        <rect x="88" y="60" width="5" height="24" fill="#7C2D12" />
        <circle cx="90" cy="52" r="12" fill="#F97316" />
        <circle cx="82" cy="58" r="8" fill="#FBBF24" />
      </g>
      <g fill="#EA580C" opacity="0.9">
        <path d="M62 70 q4 -4 8 0 q-4 4 -8 0 Z" /><path d="M20 62 q4 -4 8 0 q-4 4 -8 0 Z" /><path d="M108 74 q4 -4 8 0 q-4 4 -8 0 Z" />
      </g>
    </>
  ),

  /* 37 — pristine island shoreline */
  Lagoon: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A5F3FC" /><stop offset="0.45" stopColor="#06B6D4" /><stop offset="1" stopColor="#0891B2" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <ellipse cx="62" cy="58" rx="34" ry="12" fill="#FDE68A" />
      <ellipse cx="62" cy="56" rx="22" ry="7" fill="#86EFAC" />
      <Palm x={54} y={52} s={0.95} />
      <Palm x={76} y={54} s={0.75} frond="#15803D" />
      <g stroke="#CFFAFE" strokeWidth="2.4" fill="none" opacity="0.8">
        <path d="M12 78 Q24 74 36 78" /><path d="M88 84 Q100 80 112 84" /><path d="M40 90 Q54 86 68 90" />
      </g>
      <circle cx="20" cy="16" r="8" fill="#FEF9C3" opacity="0.95" />
    </>
  ),

  /* 38 — dusky purple sky gradient */
  Twilight: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#312E81" /><stop offset="0.55" stopColor="#7E22CE" /><stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <Stars n={10} maxY={40} />
      <circle cx="26" cy="22" r="9" fill="#FEF3C7" />
      <circle cx="22" cy="20" r="8" fill="#7E22CE" opacity="0.55" />
      <path d="M0 78 Q34 64 68 78 T124 72 V100 H0 Z" fill="#1E1B4B" />
      <path d="M62 78 L62 58 M62 62 Q54 56 52 48 M62 66 Q70 60 74 52" stroke="#0F0A2E" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <g fill="#F472B6" opacity="0.7">
        <circle cx="40" cy="88" r="2" /><circle cx="90" cy="90" r="2.4" /><circle cx="108" cy="84" r="1.8" />
      </g>
    </>
  ),

  /* 39 — interstellar floral beauty */
  CosmicRose: (u) => (
    <>
      <defs>
        <radialGradient id={`${u}a`} cx="0.5" cy="0.5" r="0.9">
          <stop offset="0" stopColor="#3B0764" /><stop offset="1" stopColor="#12041F" />
        </radialGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <Stars n={14} maxY={100} color="#FBCFE8" />
      <g transform="translate(62 52)">
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d="M0 4 Q-12 -10 -2 -24 Q10 -12 0 4 Z" fill="#E11D48" transform={`rotate(${a})`} opacity="0.92" />
        ))}
        {[36, 108, 180, 252, 324].map((a) => (
          <path key={`i${a}`} d="M0 2 Q-8 -7 -1 -16 Q7 -8 0 2 Z" fill="#FB7185" transform={`rotate(${a})`} />
        ))}
        <circle r="5" fill="#7E22CE" />
        <circle r="5" fill="none" stroke="#FBCFE8" strokeWidth="1.4" />
      </g>
      <path d="M62 68 Q60 82 64 92" stroke="#7E22CE" strokeWidth="3" fill="none" opacity="0.6" />
    </>
  ),

  /* 40 — master tier eternal spectrum */
  Infinity: (u) => (
    <>
      <defs>
        <linearGradient id={`${u}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1238" /><stop offset="1" stopColor="#05071F" />
        </linearGradient>
        <linearGradient id={`${u}b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#635BFF" /><stop offset="0.5" stopColor="#06B6D4" /><stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="124" height="100" fill={`url(#${u}a)`} />
      <Stars n={16} maxY={100} />
      <g transform="translate(62 50)">
        <path d="M0 0 C-10 -16 -34 -16 -34 0 C-34 16 -10 16 0 0 C10 -16 34 -16 34 0 C34 16 10 16 0 0 Z"
          fill="none" stroke={`url(#${u}b)`} strokeWidth="7" strokeLinecap="round" />
        <path d="M0 0 C-10 -16 -34 -16 -34 0 C-34 16 -10 16 0 0 C10 -16 34 -16 34 0 C34 16 10 16 0 0 Z"
          fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
      </g>
      <g fill="#FDE047"><circle cx="22" cy="24" r="2.4" /><circle cx="104" cy="72" r="2.4" /></g>
      <g fill="#F472B6"><circle cx="98" cy="22" r="2" /><circle cx="26" cy="78" r="2" /></g>
    </>
  ),
};

export const ThemeThumb = ({ id, className }) => {
  const scene = SCENES[id] || SCENES.Classic;
  return (
    <svg
      className={className || 'theme-art-svg'}
      viewBox="0 0 124 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {scene(`th-${id}`)}
    </svg>
  );
};

export default ThemeThumb;
