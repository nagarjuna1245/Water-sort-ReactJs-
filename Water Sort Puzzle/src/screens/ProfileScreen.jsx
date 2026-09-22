import React, { useEffect, useRef, useState } from 'react';
import {
  Trophy, Flame, Play, Lock, Check, Medal, Crown, Star, Palette,
  Droplets, FlaskConical, Coins, Compass, RotateCcw, Lightbulb, Zap,
} from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { playTapSound } from '../utils/audio';
import { useGoBack } from '../utils/navigation';
import EnvironmentScene from '../components/environment/EnvironmentScene';
import { DropletLogo } from '../components/common/DropletLogo';
import './ProfileScreen.css';

/* Wooden banner leaves (matches gameplay HUD banner) */
const Leaf = ({ flip = false }) => (
  <svg className={`pf-banner-leaf ${flip ? 'is-flip' : ''}`} viewBox="0 0 40 26" aria-hidden="true">
    <path d="M38 4 C24 2 10 8 4 22 C18 24 32 18 38 4 Z" fill="#3E9E38" />
    <path d="M38 4 C26 8 14 14 6 21" stroke="#63C45B" strokeWidth="2" fill="none" />
  </svg>
);

const CoinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#F5B82E" stroke="#B45309" strokeWidth="2" />
    <circle cx="12" cy="12" r="6.5" fill="#FFD98A" stroke="#E89A44" strokeWidth="1.4" />
    <path d="M12 8.2 v7.6 M9.6 10 q0 -1.8 2.4 -1.8 q2.4 0 2.4 1.7 q0 1.6 -2.4 1.6 q-2.4 0 -2.4 1.7 q0 1.8 2.4 1.8 q2.4 0 2.4 -1.8" fill="none" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* Animates from the previous value to the live value whenever data changes */
const useCountUp = (target, { duration = 800, delay = 0 } = {}) => {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const from = fromRef.current;
    fromRef.current = target;
    if (from === target) { setDisplay(target); return; }

    let raf;
    let start;
    const step = (t) => {
      if (start === undefined) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(step); }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);

  return display;
};

const StatValue = ({ value, delay, className }) => {
  const shown = useCountUp(value, { delay });
  return <span className={className}>{shown.toLocaleString()}</span>;
};

const RANKS = [
  { at: 0, label: 'Sprout' },
  { at: 5, label: 'Tide Caller' },
  { at: 15, label: 'Lagoon Scout' },
  { at: 30, label: 'Reef Explorer' },
  { at: 60, label: 'Wave Rider' },
  { at: 100, label: 'Storm Sorter' },
  { at: 200, label: 'Lagoon Legend' },
];

const rankFor = (levels) => RANKS.reduce((r, x) => (levels >= x.at ? x : r), RANKS[0]).label;

/**
 * PROFILE — tropical lagoon skin
 * Every number is wired to PlayerContext and animates in realtime as the
 * player completes levels, makes moves, earns coins and unlocks achievements.
 */
export const ProfileScreen = () => {
  const goBack = useGoBack('/settings');
  const {
    stats,
    streak,
    coins,
    achievements,
    soundEnabled,
    ownedThemes,
    ownedBottles,
    ownedTubes,
  } = usePlayer();

  const tap = () => playTapSound(soundEnabled);

  const winRate = stats.winRate;
  const rank = rankFor(stats.levelsCompleted);

  const primaryStats = [
    { id: 'levels', label: 'Levels Completed', value: stats.levelsCompleted, icon: Trophy, tile: 'pf-tile-purple', delay: 250 },
    { id: 'streak', label: 'Best Streak', value: streak.bestStreak || 0, suffix: 'd', icon: Flame, tile: 'pf-tile-amber', delay: 380 },
    { id: 'moves', label: 'Total Moves', value: stats.totalMoves, icon: Play, tile: 'pf-tile-blue', delay: 510 },
    { id: 'coins', label: 'Coins', value: coins, coin: true, tile: 'pf-tile-green', delay: 640 },
  ];

  const detailedMetrics = [
    { label: 'Levels Played', value: stats.levelsPlayed, icon: Compass, tile: 'pf-tile-blue' },
    { label: 'Stars Earned', value: stats.starsEarned, icon: Star, tile: 'pf-tile-purple' },
    { label: 'Perfect Sorts', value: stats.perfectLevels, icon: Zap, tile: 'pf-tile-amber' },
    { label: 'Hints Used', value: stats.totalHintsUsed, icon: Lightbulb, tile: 'pf-tile-amber' },
    { label: 'Undos Used', value: stats.totalUndos, icon: RotateCcw, tile: 'pf-tile-teal' },
    { label: 'Highest Level', value: stats.highestLevel, icon: Medal, tile: 'pf-tile-indigo' },
    { label: 'Themes Owned', value: ownedThemes.length, icon: Palette, tile: 'pf-tile-pink' },
    { label: 'Bottles Owned', value: ownedBottles.length, icon: Droplets, tile: 'pf-tile-green' },
    { label: 'Tubes Owned', value: ownedTubes.length, icon: FlaskConical, tile: 'pf-tile-teal' },
  ];

  /* Badges unlock the instant the record shows it, and a badge already stored on
     the save can never be revoked by a later stat recalculation. */
  const earned = (stored, live) => !!stored || live;

  const achievementList = [
    { id: 1, title: 'First Win', desc: 'Win your first level', icon: Star, tile: 'pf-tile-amber', isUnlocked: earned(achievements.firstWin, stats.levelsCompleted >= 1) },
    { id: 2, title: '10 Levels', desc: 'Complete 10 levels', icon: Trophy, tile: 'pf-tile-purple', isUnlocked: earned(achievements.tenLevels, stats.levelsCompleted >= 10) },
    { id: 3, title: '50 Levels', desc: 'Complete 50 levels', icon: Crown, tile: 'pf-tile-blue', isUnlocked: earned(achievements.fiftyLevels, stats.levelsCompleted >= 50) },
    { id: 4, title: '100 Levels', desc: 'Complete 100 levels', icon: Medal, tile: 'pf-tile-indigo', isUnlocked: earned(achievements.hundredLevels, stats.levelsCompleted >= 100) },
    { id: 5, title: 'Perfect Sort', desc: 'Earn 3 stars on a level', icon: Zap, tile: 'pf-tile-pink', isUnlocked: earned(achievements.perfectSort, stats.perfectLevels >= 1) },
    { id: 6, title: '20 Streak', desc: 'Keep a 20-day streak', icon: Flame, tile: 'pf-tile-amber', isUnlocked: earned(achievements.twentyStreak, (streak.bestStreak || 0) >= 20) },
    { id: 7, title: 'Collector', desc: 'Own 5+ themes', icon: Palette, tile: 'pf-tile-green', isUnlocked: ownedThemes.length >= 5 },
    { id: 8, title: 'Hoarder', desc: 'Own 10+ bottles', icon: Droplets, tile: 'pf-tile-blue', isUnlocked: ownedBottles.length >= 10 },
    { id: 9, title: 'Alchemist', desc: 'Own 10+ tubes', icon: FlaskConical, tile: 'pf-tile-teal', isUnlocked: ownedTubes.length >= 10 },
    { id: 10, title: 'High Roller', desc: 'Earn 1000 coins', icon: Coins, tile: 'pf-tile-purple', isUnlocked: coins >= 1000 },
  ];
  const unlockedCount = achievementList.filter(a => a.isUnlocked).length;

  return (
    <div className="pf-root">
      <EnvironmentScene />
      <div className="pf-dim" aria-hidden="true" />

      {/* ═══ HUD ═══ */}
      <div className="pf-hud">
        <button className="pf-round-btn pf-round-back" onClick={() => { tap(); goBack(); }} aria-label="Back">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.8 5 L8 12 L14.8 19 M8.6 12 L19 12" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="pf-banner">
          <Leaf />
          <span className="pf-banner-text">Profile</span>
          <Leaf flip />
        </div>

        <div className="pf-coin-pill">
          <CoinIcon size={18} />
          <StatValue value={coins} delay={400} />
        </div>
      </div>

      {/* ═══ BODY ═══ */}
      <div className="pf-body">

        {/* Avatar */}
        <div className="pf-avatar-block">
          <div className="pf-avatar-ring">
            <div className="pf-avatar-badge">
              <DropletLogo size={54} />
            </div>
          </div>
          <h2 className="pf-player-name">Water Sort Master</h2>
          <span className="pf-rank-chip"><Crown size={13} strokeWidth={2.6} color="#FFF3D9" />{rank}</span>

          <div className="pf-live-chips">
            <span className="pf-chip pf-chip-purple">
              <Trophy size={13} strokeWidth={2.6} color="#FFFFFF" />
              <StatValue value={winRate} delay={700} />% Win
            </span>
            <span className={`pf-chip pf-chip-orange ${streak.currentStreak > 0 ? 'is-live' : ''}`}>
              <Flame size={13} strokeWidth={2.6} color="#FFFFFF" />
              <StatValue value={streak.currentStreak || 0} delay={850} />d streak
            </span>
          </div>

          {/* win-rate progress bar */}
          <div className="pf-winbar-wrap">
            <div className="pf-winbar">
              <div className="pf-winbar-fill" style={{ '--wr': `${winRate}%` }} />
            </div>
            <span className="pf-winbar-label">Win rate</span>
          </div>
        </div>

        {/* Primary stats 2x2 */}
        <div className="pf-stats-grid">
          {primaryStats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="pf-stat-card" style={{ '--gd': `${item.delay - 100}ms` }}>
                <span className={`pf-tile ${item.tile}`}>
                  {item.coin ? <CoinIcon size={20} /> : <Icon size={19} strokeWidth={2.4} color="#FFFFFF" />}
                </span>
                <span className="pf-stat-value">
                  <StatValue value={item.value} delay={item.delay} />
                  {item.suffix || ''}
                </span>
                <span className="pf-stat-label">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Gameplay history */}
        <div className="pf-group" style={{ '--gd': '0.5s' }}>
          <div className="pf-plaque"><span>Gameplay History</span></div>
          <div className="pf-card">
            {detailedMetrics.map((metric, idx) => {
              const MetricIcon = metric.icon;
              return (
                <React.Fragment key={metric.label}>
                  {idx > 0 && <div className="pf-divider" />}
                  <div className="pf-row">
                    <div className="pf-row-left">
                      <span className={`pf-tile pf-tile-sm ${metric.tile}`}>
                        <MetricIcon size={14} strokeWidth={2.5} color="#FFFFFF" />
                      </span>
                      <span className="pf-label">{metric.label}</span>
                    </div>
                    <StatValue className="pf-row-value" value={metric.value} delay={700 + idx * 90} />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="pf-group" style={{ '--gd': '0.62s' }}>
          <div className="pf-plaque">
            <span>Achievements</span>
            <em><StatValue value={unlockedCount} delay={1200} />/{achievementList.length}</em>
          </div>
          <div className="pf-ach-grid">
            {achievementList.map((ach, idx) => {
              const AchIcon = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`pf-ach-card ${ach.isUnlocked ? 'is-done' : 'is-locked'}`}
                  style={{ '--gd': `${0.7 + idx * 0.06}s` }}
                >
                  <span className={`pf-tile pf-tile-sm ${ach.isUnlocked ? ach.tile : 'pf-tile-lock'}`}>
                    <AchIcon size={14} strokeWidth={2.5} color="#FFFFFF" />
                  </span>
                  <span className="pf-ach-copy">
                    <span className="pf-ach-title">{ach.title}</span>
                    <span className="pf-ach-desc">{ach.desc}</span>
                  </span>
                  <span className={`pf-ach-mark ${ach.isUnlocked ? 'pf-ach-mark-ok' : ''}`}>
                    {ach.isUnlocked
                      ? <Check size={11} strokeWidth={3.4} color="#FFFFFF" />
                      : <Lock size={10} strokeWidth={2.6} color="#8AA6BC" />}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
