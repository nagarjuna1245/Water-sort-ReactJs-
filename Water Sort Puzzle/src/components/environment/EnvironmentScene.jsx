import React from 'react';

/**
 * Full-bleed tropical lagoon environment painted as layered SVG so it stays
 * crisp at any screen size: sunny sky, vegetated cliffs with waterfalls,
 * turquoise water with ripples and reflections, lily pads, rocks, flowers and
 * lush corner foliage.
 */
export const EnvironmentScene = () => (
  <svg
    className="env-scene"
    viewBox="0 0 390 844"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="env-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7CCFF5" />
        <stop offset="0.55" stopColor="#B6E9FA" />
        <stop offset="1" stopColor="#E4F8FF" />
      </linearGradient>
      <linearGradient id="env-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#62D6F2" />
        <stop offset="0.3" stopColor="#2FC0E8" />
        <stop offset="1" stopColor="#0C9AD6" />
      </linearGradient>
      <linearGradient id="env-rockL" x1="0" y1="0" x2="1" y2="0.6">
        <stop offset="0" stopColor="#C9A98C" />
        <stop offset="0.5" stopColor="#A9805F" />
        <stop offset="1" stopColor="#7E5A40" />
      </linearGradient>
      <linearGradient id="env-rockR" x1="1" y1="0" x2="0" y2="0.6">
        <stop offset="0" stopColor="#D3B394" />
        <stop offset="0.5" stopColor="#B0875F" />
        <stop offset="1" stopColor="#84603F" />
      </linearGradient>
      <linearGradient id="env-grass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7CC95B" />
        <stop offset="1" stopColor="#2E8B3D" />
      </linearGradient>
      <linearGradient id="env-far" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#AFC6D8" />
        <stop offset="1" stopColor="#8FB3A8" />
      </linearGradient>
      <linearGradient id="env-fall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.97" />
        <stop offset="0.7" stopColor="#E2F6FF" stopOpacity="0.8" />
        <stop offset="1" stopColor="#BEEBFA" stopOpacity="0.45" />
      </linearGradient>
      <radialGradient id="env-sun" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#FFF9D9" stopOpacity="0.95" />
        <stop offset="1" stopColor="#FFF9D9" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="env-pad" cx="0.4" cy="0.35" r="0.85">
        <stop offset="0" stopColor="#7BD45A" />
        <stop offset="1" stopColor="#2C8A2E" />
      </radialGradient>
      <filter id="env-soft" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <filter id="env-mist" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
    </defs>

    {/* ===== SKY ===== */}
    <rect x="0" y="0" width="390" height="382" fill="url(#env-sky)" />
    <circle cx="310" cy="52" r="95" fill="url(#env-sun)" />

    {/* Fluffy clouds */}
    <g fill="#FFFFFF">
      <g opacity="0.95">
        <ellipse cx="72" cy="34" rx="30" ry="12" />
        <ellipse cx="94" cy="27" rx="22" ry="11" />
        <ellipse cx="52" cy="29" rx="17" ry="9" />
      </g>
      <g opacity="0.85">
        <ellipse cx="262" cy="58" rx="32" ry="11" />
        <ellipse cx="288" cy="51" rx="20" ry="9" />
        <ellipse cx="240" cy="53" rx="17" ry="8" />
      </g>
      <g opacity="0.75">
        <ellipse cx="165" cy="18" rx="26" ry="9" />
        <ellipse cx="186" cy="13" rx="17" ry="7" />
      </g>
    </g>

    {/* Hazy far mountains */}
    <path d="M-10 330 L45 215 L105 285 L170 200 L240 292 L300 222 L400 330 L400 382 L-10 382 Z"
      fill="url(#env-far)" opacity="0.55" />
    <path d="M-10 352 L70 260 L140 322 L215 252 L290 330 L360 270 L400 320 L400 382 L-10 382 Z"
      fill="#8FBBAE" opacity="0.5" />

    {/* ===== LEFT CLIFF ===== */}
    <g>
      <path d="M-10 382 L-10 168 Q22 128 58 150 L84 178 Q104 214 98 262 L104 382 Z" fill="url(#env-rockL)" />
      <path d="M-10 382 L-10 200 Q18 168 46 186 L66 210 Q80 244 76 286 L80 382 Z" fill="#9A7354" opacity="0.6" />
      {/* rock striations */}
      <g stroke="#6E4A31" strokeWidth="2.5" opacity="0.35" fill="none">
        <path d="M-6 230 Q24 220 52 232" />
        <path d="M-6 268 Q30 258 66 272" />
        <path d="M-6 310 Q34 300 80 314" />
      </g>
      {/* vegetation cap */}
      <path d="M-10 176 Q18 128 62 150 Q88 164 86 190 Q56 172 28 180 Q4 186 -10 196 Z" fill="url(#env-grass)" />
      <g fill="#3F9C4A">
        <ellipse cx="8" cy="164" rx="20" ry="12" />
        <ellipse cx="40" cy="156" rx="18" ry="11" />
        <ellipse cx="66" cy="170" rx="15" ry="9" />
      </g>
      <g fill="#63BC5C" opacity="0.9">
        <ellipse cx="16" cy="158" rx="13" ry="8" />
        <ellipse cx="48" cy="151" rx="12" ry="7" />
      </g>
      {/* small trees */}
      <g fill="#2E7D32">
        <circle cx="26" cy="146" r="9" />
        <circle cx="58" cy="148" r="7" />
      </g>
      <g fill="#4CAF50">
        <circle cx="23" cy="142" r="6" />
        <circle cx="56" cy="145" r="4.5" />
      </g>
      {/* waterfall */}
      <path d="M14 196 Q32 188 50 197 L60 368 Q34 380 8 368 Z" fill="url(#env-fall)" />
      <g stroke="#FFFFFF" strokeWidth="3" opacity="0.6" fill="none">
        <path d="M24 202 L28 364" />
        <path d="M42 200 L48 362" />
      </g>
      <g stroke="#DFF6FF" strokeWidth="2" opacity="0.5" fill="none">
        <path d="M33 204 L37 366" />
      </g>
    </g>

    {/* ===== RIGHT CLIFF ===== */}
    <g>
      <path d="M400 382 L400 140 Q362 108 322 138 L292 176 Q272 220 280 276 L272 382 Z" fill="url(#env-rockR)" />
      <path d="M400 382 L400 178 Q368 150 340 176 L318 210 Q306 252 310 300 L306 382 Z" fill="#A07B58" opacity="0.55" />
      <g stroke="#75513A" strokeWidth="2.5" opacity="0.35" fill="none">
        <path d="M330 232 Q362 222 396 234" />
        <path d="M316 276 Q352 266 396 280" />
        <path d="M306 322 Q348 312 396 326" />
      </g>
      {/* vegetation cap */}
      <path d="M400 148 Q366 106 320 138 Q292 156 296 184 Q330 162 358 170 Q382 176 400 188 Z" fill="url(#env-grass)" />
      <g fill="#3F9C4A">
        <ellipse cx="382" cy="152" rx="20" ry="12" />
        <ellipse cx="348" cy="144" rx="18" ry="11" />
        <ellipse cx="318" cy="158" rx="15" ry="9" />
      </g>
      <g fill="#63BC5C" opacity="0.9">
        <ellipse cx="370" cy="146" rx="13" ry="8" />
        <ellipse cx="338" cy="140" rx="12" ry="7" />
      </g>
      <g fill="#2E7D32">
        <circle cx="360" cy="132" r="9" />
        <circle cx="326" cy="136" r="7" />
      </g>
      <g fill="#4CAF50">
        <circle cx="363" cy="128" r="6" />
        <circle cx="328" cy="133" r="4.5" />
      </g>
      {/* twin waterfalls */}
      <path d="M332 186 Q352 178 370 188 L378 366 Q350 378 326 366 Z" fill="url(#env-fall)" />
      <g stroke="#FFFFFF" strokeWidth="3" opacity="0.6" fill="none">
        <path d="M344 192 L348 362" />
        <path d="M362 190 L366 360" />
      </g>
      <path d="M296 236 Q308 230 318 238 L322 364 Q306 372 292 362 Z" fill="url(#env-fall)" opacity="0.9" />
    </g>

    {/* Distant center waterfall on far mountain */}
    <path d="M186 268 Q193 264 200 269 L203 330 Q193 336 184 330 Z" fill="url(#env-fall)" opacity="0.7" />

    {/* Mist at cliff feet */}
    <g filter="url(#env-mist)" opacity="0.65">
      <ellipse cx="34" cy="376" rx="58" ry="13" fill="#FFFFFF" />
      <ellipse cx="352" cy="372" rx="62" ry="13" fill="#FFFFFF" />
      <ellipse cx="194" cy="336" rx="30" ry="8" fill="#FFFFFF" />
    </g>

    {/* Green headlands at waterline */}
    <path d="M-10 388 Q44 352 100 372 Q152 390 196 376 L196 402 L-10 402 Z" fill="#3E8F5F" />
    <path d="M400 388 Q342 352 284 374 Q232 392 198 378 L198 402 L400 402 Z" fill="#48996A" />
    <path d="M-10 388 Q44 352 100 372 Q152 390 196 376 L196 386 Q146 400 96 384 Q44 368 -10 398 Z"
      fill="#6FC08B" opacity="0.85" />
    <path d="M400 388 Q342 352 284 374 Q232 392 198 378 L198 388 Q246 400 292 386 Q342 370 400 398 Z"
      fill="#7CC796" opacity="0.85" />

    {/* ===== WATER ===== */}
    <rect x="0" y="380" width="390" height="464" fill="url(#env-water)" />

    {/* Waterfall plunge foam */}
    <g>
      <ellipse cx="34" cy="388" rx="30" ry="8" fill="#FFFFFF" opacity="0.6" filter="url(#env-soft)" />
      <ellipse cx="352" cy="386" rx="32" ry="8" fill="#FFFFFF" opacity="0.6" filter="url(#env-soft)" />
    </g>

    {/* Sky reflection band */}
    <rect x="0" y="380" width="390" height="26" fill="#9FE9FF" opacity="0.35" />

    {/* Light reflections */}
    <g opacity="0.22" fill="#FFFFFF" filter="url(#env-soft)">
      <ellipse cx="195" cy="420" rx="160" ry="14" />
      <ellipse cx="90" cy="760" rx="95" ry="10" />
      <ellipse cx="305" cy="810" rx="105" ry="10" />
    </g>

    {/* Ripples */}
    <g fill="none" strokeLinecap="round">
      <path className="env-ripple r1" d="M42 470 Q74 463 106 470" stroke="#C6F3FF" strokeWidth="3.5" opacity="0.55" />
      <path className="env-ripple r2" d="M258 440 Q294 432 330 440" stroke="#C6F3FF" strokeWidth="3.5" opacity="0.5" />
      <path className="env-ripple r3" d="M120 730 Q162 721 204 730" stroke="#A6ECFF" strokeWidth="4.5" opacity="0.55" />
      <path className="env-ripple r1" d="M236 786 Q278 777 320 786" stroke="#A6ECFF" strokeWidth="4.5" opacity="0.5" />
      <path className="env-ripple r2" d="M28 640 Q60 633 92 640" stroke="#C6F3FF" strokeWidth="3.5" opacity="0.45" />
      <path className="env-ripple r3" d="M306 690 Q338 683 370 690" stroke="#C6F3FF" strokeWidth="3.5" opacity="0.45" />
      <path className="env-ripple r1" d="M150 806 Q190 797 230 806" stroke="#8FE4FF" strokeWidth="4" opacity="0.4" />
    </g>

    {/* Rocks in water */}
    <g>
      <path d="M22 700 Q36 676 58 686 Q78 678 88 702 Q96 720 74 724 L38 724 Q14 720 22 700 Z" fill="#7E93A1" />
      <path d="M22 700 Q36 676 58 686 Q78 678 88 702 Q96 720 74 724 L38 724 Q14 720 22 700 Z"
        fill="#5F7683" opacity="0.5" transform="translate(3 4) scale(0.94)" />
      <path d="M30 692 Q42 682 56 688" stroke="#B9C9D3" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M318 640 Q330 622 348 629 Q364 624 371 643 Q376 657 359 660 L332 660 Q313 656 318 640 Z" fill="#71879A" />
      <path d="M326 634 Q336 625 347 631" stroke="#AFC0CC" strokeWidth="4" fill="none" strokeLinecap="round" />
    </g>

    {/* Lily pads */}
    <g>
      <g transform="translate(70 786)">
        <ellipse rx="36" ry="14" fill="url(#env-pad)" />
        <path d="M0 0 L32 -8 A36 14 0 0 0 32 6 Z" fill="#0C9AD6" opacity="0.9" />
        <ellipse rx="25" ry="8.5" fill="none" stroke="#93E273" strokeWidth="1.6" opacity="0.55" />
      </g>
      <g transform="translate(322 744)">
        <ellipse rx="29" ry="11.5" fill="url(#env-pad)" />
        <path d="M0 0 L-26 -7 A29 11.5 0 0 1 -26 5 Z" fill="#0C9AD6" opacity="0.9" />
      </g>
      <g transform="translate(268 822)">
        <ellipse rx="40" ry="15" fill="url(#env-pad)" />
        <path d="M0 0 L35 -9 A40 15 0 0 0 35 7 Z" fill="#0C9AD6" opacity="0.9" />
        <ellipse rx="28" ry="9.5" fill="none" stroke="#93E273" strokeWidth="1.6" opacity="0.55" />
      </g>
      {/* Purple flower */}
      <g transform="translate(62 776)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-6.5" rx="3.6" ry="6.8" fill="#C77DFF" transform={`rotate(${a})`} />
        ))}
        <circle r="3.2" fill="#FFE066" />
      </g>
      {/* White flower */}
      <g transform="translate(276 812)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse key={a} cx="0" cy="-6.5" rx="3.2" ry="6.5" fill="#FFFFFF" transform={`rotate(${a})`} />
        ))}
        <circle r="3" fill="#FFD95A" />
      </g>
    </g>

    {/* ===== CORNER FOLIAGE ===== */}
    {/* Top-left */}
    <g>
      <path d="M-8 -8 Q66 8 86 72 Q44 88 10 58 Q-10 34 -8 -8 Z" fill="#1E6B28" />
      <path d="M-8 -8 Q52 4 72 52 Q38 64 10 42 Q-8 24 -8 -8 Z" fill="#35913E" />
      <path d="M-8 -8 Q34 -2 46 32 Q22 42 3 25 Q-8 12 -8 -8 Z" fill="#57B65C" />
      <path d="M-8 40 Q22 52 30 88 Q4 92 -8 74 Z" fill="#2E7D32" />
      <g transform="translate(56 56)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-7.5" rx="4.4" ry="8" fill="#FFFFFF" transform={`rotate(${a})`} />
        ))}
        <circle r="3.8" fill="#FDD835" />
      </g>
    </g>
    {/* Top-right */}
    <g>
      <path d="M398 -8 Q324 8 304 72 Q346 88 380 58 Q398 34 398 -8 Z" fill="#1E6B28" />
      <path d="M398 -8 Q338 4 318 52 Q352 64 380 42 Q398 24 398 -8 Z" fill="#35913E" />
      <path d="M398 -8 Q356 -2 344 32 Q368 42 387 25 Q398 12 398 -8 Z" fill="#57B65C" />
      <path d="M398 40 Q368 52 360 88 Q386 92 398 74 Z" fill="#2E7D32" />
      <g transform="translate(336 56)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-7.5" rx="4.4" ry="8" fill="#FFFFFF" transform={`rotate(${a})`} />
        ))}
        <circle r="3.8" fill="#FDD835" />
      </g>
    </g>
    {/* Mid-left plant beside the board */}
    <g>
      <path d="M-6 470 Q30 452 44 486 Q20 502 -6 496 Z" fill="#2E7D32" />
      <path d="M-6 486 Q26 480 34 508 Q14 520 -6 512 Z" fill="#43A047" />
      <path d="M-6 452 Q22 430 40 452 Q24 470 -6 466 Z" fill="#57B65C" />
      <g transform="translate(30 470)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-5.5" rx="3.2" ry="6" fill="#FFFFFF" transform={`rotate(${a})`} />
        ))}
        <circle r="2.8" fill="#FDD835" />
      </g>
    </g>
    {/* Mid-right plant */}
    <g>
      <path d="M396 440 Q360 424 348 456 Q370 472 396 466 Z" fill="#2E7D32" />
      <path d="M396 456 Q366 450 358 478 Q378 490 396 482 Z" fill="#43A047" />
      <g transform="translate(362 442)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-5.5" rx="3.2" ry="6" fill="#FFFFFF" transform={`rotate(${a})`} />
        ))}
        <circle r="2.8" fill="#FDD835" />
      </g>
    </g>
    {/* Bottom-left fronds */}
    <g>
      <path d="M-10 854 Q34 778 108 762 Q104 796 62 826 Q28 850 -10 854 Z" fill="#1B5E20" />
      <path d="M-10 854 Q26 794 84 782 Q80 808 48 832 Q22 850 -10 854 Z" fill="#2E7D32" />
      <path d="M-10 854 Q16 810 58 800 Q56 822 32 840 Q12 852 -10 854 Z" fill="#4CAF50" />
    </g>
    {/* Bottom-right fronds */}
    <g>
      <path d="M400 854 Q356 778 282 762 Q286 796 324 826 Q358 850 400 854 Z" fill="#1B5E20" />
      <path d="M400 854 Q364 794 306 782 Q310 808 340 832 Q364 850 400 854 Z" fill="#2E7D32" />
      <path d="M400 854 Q374 810 332 800 Q334 822 356 840 Q376 852 400 854 Z" fill="#4CAF50" />
    </g>

    {/* Floating leaves */}
    <g fill="#57B65C" opacity="0.9">
      <path d="M150 430 Q161 421 174 428 Q165 438 150 430 Z" />
      <path d="M236 400 Q247 391 260 398 Q251 408 236 400 Z" fill="#6FC474" />
    </g>
  </svg>
);

export default EnvironmentScene;
