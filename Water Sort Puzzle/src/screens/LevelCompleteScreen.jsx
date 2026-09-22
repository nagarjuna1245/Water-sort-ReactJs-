import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { playTapSound, playWinSound } from '../utils/audio';
import EnvironmentScene from '../components/environment/EnvironmentScene';
import treasureChestImg from '../assets/treasure_chest.png';
import './LevelCompleteScreen.css';

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */

/** Deterministic RNG so confetti layout is stable between renders. */
const rng = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const CONFETTI_COLORS = ['#FACC15', '#EC4899', '#38BDF8', '#22C55E', '#F97316', '#A78BFA', '#FFE566', '#FF6B9D'];
const CONFETTI = (() => {
  const rand = rng(20260921);
  return Array.from({ length: 26 }, (_, i) => ({
    left: 2 + rand() * 96,
    delay: rand() * 3.2,
    fall: 3.6 + rand() * 2.4,
    size: 7 + Math.round(rand() * 6),
    color: CONFETTI_COLORS[Math.floor(rand() * CONFETTI_COLORS.length)],
    shape: rand() > 0.55 ? 'rect' : rand() > 0.3 ? 'circ' : 'star',
    spin: rand() > 0.5 ? 1 : -1,
    sway: rand() > 0.5 ? 'a' : 'b',
  }));
})();

/** Smoothly counts 0 → target once, after a delay. */
const useCountUp = (target, duration = 850, delay = 1550) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = setTimeout(() => {
      let t0;
      const step = (t) => {
        if (t0 === undefined) t0 = t;
        const p = Math.min(1, (t - t0) / duration);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(start); if (raf) cancelAnimationFrame(raf); };
  }, [target, duration, delay]);
  return value;
};

/* ═══════════════════════════════════════════════
   INLINE SVG ATOMS
═══════════════════════════════════════════════ */

/** Illustrated casual-game star — rounded points, specular highlight. */
const GameStar = ({ size = 72, lit = true }) => {
  const C = size / 2;
  const pts = [];
  for (let i = 0; i < 5; i++) {
    const oa = ((i * 72) - 90) * (Math.PI / 180);
    const ia = oa + 36 * (Math.PI / 180);
    pts.push({ x: C + C * 0.9 * Math.cos(oa), y: C + C * 0.9 * Math.sin(oa) });
    pts.push({ x: C + C * 0.38 * Math.cos(ia), y: C + C * 0.38 * Math.sin(ia) });
  }
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + ' Z';
  const uid = `lcs${size}`;

  if (!lit) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
        <path d={d} fill="rgba(70,55,30,0.28)" stroke="rgba(255,240,200,0.35)" strokeWidth={size * 0.03} strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={`sg-${uid}`} cx="50%" cy="32%" r="68%" fx="50%" fy="26%">
          <stop offset="0%" stopColor="#FFF6B8" />
          <stop offset="42%" stopColor="#FFD53D" />
          <stop offset="100%" stopColor="#E8890C" />
        </radialGradient>
      </defs>
      <path d={d} fill={`url(#sg-${uid})`} />
      <path d={d} fill="rgba(160,70,0,0.14)" />
      <path d={d} fill="none" stroke="#B45309" strokeWidth={size * 0.045} strokeLinejoin="round" />
      <ellipse
        cx={C * 0.78} cy={C * 0.56}
        rx={C * 0.2} ry={C * 0.1}
        fill="rgba(255,255,240,0.8)"
        transform={`rotate(-28,${C * 0.78},${C * 0.56})`}
      />
    </svg>
  );
};

/** Sunburst spokes that flash behind a star when it lands. */
const StarRays = ({ size = 150 }) => {
  const spokes = [];
  for (let i = 0; i < 12; i++) {
    spokes.push(
      <rect
        key={i}
        x={size / 2 - 2.6}
        y={4}
        width="5.2"
        height={size * 0.30}
        rx="2.6"
        fill="#FFF3B0"
        opacity={i % 2 ? 0.55 : 0.9}
        transform={`rotate(${i * 30} ${size / 2} ${size / 2})`}
      />
    );
  }
  return (
    <svg className="lcx-rays" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {spokes}
    </svg>
  );
};

/** Gold coin with embossed star. */
const CoinIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <defs>
      <radialGradient id={`lccoin-${size}`} cx="38%" cy="32%" r="75%">
        <stop offset="0%" stopColor="#FFE9A8" />
        <stop offset="45%" stopColor="#FFC93C" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
    </defs>
    <circle cx="20" cy="21" r="17" fill="#B45309" opacity="0.35" />
    <circle cx="20" cy="20" r="17.5" fill="#F9A825" />
    <circle cx="20" cy="20" r="13.5" fill={`url(#lccoin-${size})`} />
    <path d="M20 11.5 L22.6 17 L28.6 17.8 L24.2 22 L25.3 28 L20 25.1 L14.7 28 L15.8 22 L11.4 17.8 L17.4 17.8 L17.4 17 Z" fill="#E8940A" opacity="0.8" />
    <path d="M20 12.6 L22.3 17.5 L27.6 18.2 L23.7 21.9 L24.7 27.1 L20 24.6 L15.3 27.1 L16.3 21.9 L12.4 18.2 L17.7 17.5 Z" fill="#FFD75E" />
    <ellipse cx="14.5" cy="12.5" rx="5" ry="3" fill="#FFFFFF" opacity="0.55" transform="rotate(-28 14.5 12.5)" />
  </svg>
);

/* ═══════════════════════════════════════════════
   MAIN SCREEN COMPONENT
═══════════════════════════════════════════════ */
export const LevelCompleteScreen = ({
  level:     propLevel,
  movesUsed: propMoves,
  bestMoves: propBestMoves,
  stars:     propStars,
  reward:    propReward,
  onNextLevel,
  onRetry,
  onHome,
  onClose,
}) => {
  const { difficulty = 'normal', levelId = '1' } = useParams();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { levelStars, bestMoves, soundEnabled, addCoins } = usePlayer();

  const numLevel    = propLevel ?? (parseInt(levelId, 10) || 1);
  const nextLevel   = numLevel + 1;
  const movesUsed   = propMoves ?? location.state?.moves ?? 5;
  const starsEarned = propStars ?? location.state?.stars ?? (levelStars?.[difficulty]?.[numLevel] ?? 3);
  const savedBest   = bestMoves?.[difficulty]?.[numLevel];
  const best        = propBestMoves ?? savedBest ?? movesUsed;

  const reward = useMemo(() => {
    if (propReward !== undefined) return propReward;
    if (location.state?.reward !== undefined) return location.state.reward;
    const base = 50;
    const bonus = starsEarned >= 3 ? 25 : starsEarned === 2 ? 10 : 0;
    return base + bonus;
  }, [propReward, location.state, starsEarned]);

  const rewardCount = useCountUp(reward);

  useEffect(() => {
    if (reward > 0 && addCoins) addCoins(reward);
    playWinSound?.(soundEnabled);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const go = useCallback((fn, fallback) => () => {
    playTapSound?.(soundEnabled);
    fn ? fn() : fallback();
  }, [soundEnabled]);

  const handleNext    = go(onNextLevel, () => navigate(`/game/${difficulty}/${nextLevel}`));
  const handleRetry   = go(onRetry,     () => navigate(`/game/${difficulty}/${numLevel}`));
  const handleHome    = go(onHome,      () => navigate('/'));
  const handleClose   = go(onClose,     () => navigate('/levels'));

  return (
    <div className="lcx-root">
      <EnvironmentScene />
      <div className="lcx-dim" aria-hidden="true" />

      {/* ── confetti ── */}
      <div className="lcx-confetti" aria-hidden="true">
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className={`lcx-cf lcx-cf-${c.shape} lcx-cf-sway-${c.sway}`}
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.shape === 'rect' ? c.size * 0.45 : c.size,
              backgroundColor: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.fall}s`,
              '--spin': `${c.spin * 720}deg`,
            }}
          />
        ))}
      </div>

      {/* ── close ─ */}
      <button className="lcx-close" onClick={handleClose} aria-label="Close">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <path d="M6 6 L18 18 M18 6 L6 18" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
        </svg>
      </button>

      {/* ══ MAIN CARD ══ */}
      <div className="lcx-card">

        {/* wooden banner */}
        <div className="lcx-banner">
          <svg className="lcx-banner-leaf lcx-banner-leaf-l" viewBox="0 0 40 26" aria-hidden="true">
            <path d="M38 4 C24 2 10 8 4 22 C18 24 32 18 38 4 Z" fill="#3E9E38" />
            <path d="M38 4 C26 8 14 14 6 21" stroke="#63C45B" strokeWidth="2" fill="none" />
          </svg>
          <svg className="lcx-banner-leaf lcx-banner-leaf-r" viewBox="0 0 40 26" aria-hidden="true">
            <path d="M2 4 C16 2 30 8 36 22 C22 24 8 18 2 4 Z" fill="#3E9E38" />
            <path d="M2 4 C14 8 26 14 34 21" stroke="#63C45B" strokeWidth="2" fill="none" />
          </svg>
          <span className="lcx-banner-text">Level {numLevel}</span>
        </div>

        {/* title */}
        <h1 className="lcx-title">Complete!</h1>

        {/* ── stars ─ */}
        <div className="lcx-stars" aria-label={`${starsEarned} of 3 stars`}>
          {[1, 2, 3].map((n) => {
            const lit = starsEarned >= n;
            const big = n === 2;
            return (
              <div
                key={n}
                className={`lcx-star-slot ${lit ? 'is-lit' : 'is-dim'} ${big ? 'is-big' : ''}`}
                style={{ '--sd': `${0.55 + (n - 1) * 0.3}s` }}
              >
                {lit && <StarRays size={big ? 150 : 120} />}
                {lit && <span className="lcx-star-ring" />}
                <GameStar size={big ? 84 : 64} lit={lit} />
              </div>
            );
          })}
        </div>

        {/* ── stats plank ── */}
        <div className="lcx-stats">
          <div className="lcx-stat" style={{ '--std': '1.5s' }}>
            <span className="lcx-stat-label">Moves</span>
            <span className="lcx-stat-val">{movesUsed}</span>
          </div>
          <div className="lcx-stat-sep" />
          <div className="lcx-stat" style={{ '--std': '1.62s' }}>
            <span className="lcx-stat-label">Best</span>
            <span className="lcx-stat-val">{best}</span>
          </div>
          <div className="lcx-stat-sep" />
          <div className="lcx-stat" style={{ '--std': '1.74s' }}>
            <span className="lcx-stat-label">Reward</span>
            <span className="lcx-stat-val lcx-reward">
              <CoinIcon size={20} />
              <span className="lcx-reward-num">+{rewardCount}</span>
            </span>
          </div>
        </div>

        {/* ── treasure chest ── */}
        <div className="lcx-chest" aria-hidden="true">
          <div className="lcx-chest-rays" />
          <img src={treasureChestImg} alt="" className="lcx-chest-img" draggable={false} />
          <div className="lcx-coin-burst">
            {[-52, -30, -10, 10, 30, 52].map((x, i) => (
              <span key={i} className="lcx-burst-coin" style={{ '--bx': `${x * 1.6}px`, '--bd': `${1.95 + i * 0.06}s` }}>
                <CoinIcon size={18} />
              </span>
            ))}
          </div>
        </div>

        {/* ── buttons ── */}
        <button className="lcx-btn lcx-btn-next" onClick={handleNext} aria-label="Next Level">
          <span className="lcx-btn-shine" />
          <span>Next Level</span>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
            <path d="M8 5 L16 12 L8 19" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="lcx-sub-row">
          <button className="lcx-btn lcx-btn-retry" onClick={handleRetry} aria-label="Retry level">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path d="M20 4.5 A9 9 0 1 0 21.5 12" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M20 4.5 L20 10 L14.5 10" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Retry</span>
          </button>
          <button className="lcx-btn lcx-btn-home" onClick={handleHome} aria-label="Home">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path d="M3.5 10.5 L12 3.5 L20.5 10.5 V20 C20.5 20.8 19.8 21.5 19 21.5 H15 V15.5 H9 V21.5 H5 C4.2 21.5 3.5 20.8 3.5 20 Z" fill="#FFFFFF" />
            </svg>
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelCompleteScreen;
