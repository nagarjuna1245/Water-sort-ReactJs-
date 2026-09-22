import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { playTapSound } from '../utils/audio';
import { WaterSortHero } from '../components/home/WaterSortHero';
import { BottomNav } from '../components/common/BottomNav';
import './HomeScreen.css';

/**
 * Glossy translucent blue water droplet (decorative).
 */
const GlossyDroplet = ({ size = 24, className = '', style = {} }) => (
  <svg
    width={size}
    height={size * 1.28}
    viewBox="0 0 32 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id={`gdrop-${size}`} cx="38%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#BFEFFF" stopOpacity="0.95" />
        <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
      </radialGradient>
    </defs>
    <path
      d="M16 1.5 C16 1.5 2.5 17.5 2.5 26 C2.5 33.9 8.6 40 16 40 C23.4 40 29.5 33.9 29.5 26 C29.5 17.5 16 1.5 16 1.5 Z"
      fill={`url(#gdrop-${size})`}
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="1.2"
    />
    <ellipse cx="11" cy="24" rx="3.4" ry="6.4" transform="rotate(-26 11 24)" fill="#FFFFFF" opacity="0.65" />
    <circle cx="20.5" cy="32" r="2" fill="#FFFFFF" opacity="0.35" />
  </svg>
);

/**
 * 3D golden coin with embossed star.
 */
const GoldCoin = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="coinFace" cx="38%" cy="32%" r="75%">
        <stop offset="0%" stopColor="#FFE9A8" />
        <stop offset="55%" stopColor="#FFC62E" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
      <linearGradient id="coinRim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD75E" />
        <stop offset="55%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#C2740A" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="25.5" r="21" fill="#B45309" opacity="0.35" />
    <circle cx="24" cy="24" r="21" fill="url(#coinRim)" />
    <circle cx="24" cy="24" r="16.5" fill="url(#coinFace)" stroke="#E08A0C" strokeWidth="1.4" />
    <path
      d="M24 13.5 L26.9 20.1 L34 20.8 L28.7 25.6 L30.2 32.6 L24 29 L17.8 32.6 L19.3 25.6 L14 20.8 L21.1 20.1 Z"
      fill="#E08A0C"
      opacity="0.55"
    />
    <path
      d="M24 12.5 L26.9 19.1 L34 19.8 L28.7 24.6 L30.2 31.6 L24 28 L17.8 31.6 L19.3 24.6 L14 19.8 L21.1 19.1 Z"
      fill="#FFF3C4"
      stroke="#D97706"
      strokeWidth="0.8"
    />
    <ellipse cx="16.5" cy="14" rx="6.5" ry="3.6" transform="rotate(-38 16.5 14)" fill="#FFFFFF" opacity="0.5" />
  </svg>
);

/**
 * Chunky 3D two-line game logo: "Water" (cyan/blue) over "Sort" (yellow/orange).
 */
const WaterSortLogo = () => (
  <svg
    className="home-logo-svg"
    viewBox="0 0 390 208"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Water Sort"
  >
    <defs>
      <linearGradient id="waterFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A5F3FC" />
        <stop offset="38%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="waterGloss" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
        <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.12" />
        <stop offset="43%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="sortFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE066" />
        <stop offset="45%" stopColor="#FFC62E" />
        <stop offset="100%" stopColor="#F97316" />
      </linearGradient>
      <linearGradient id="sortGloss" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.14" />
        <stop offset="43%" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <filter id="logoSoftShadow" x="-30%" y="-30%" width="160%" height="180%">
        <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#3730A3" floodOpacity="0.28" />
      </filter>
    </defs>

    <g filter="url(#logoSoftShadow)">
      {/* ── WATER ── */}
      {/* deep extrusion */}
      <text x="195" y="96" textAnchor="middle" className="logo-text logo-extrude">Water</text>
      {/* dark navy outline */}
      <text x="195" y="90" textAnchor="middle" className="logo-text logo-outline">Water</text>
      {/* gradient fill */}
      <text x="195" y="90" textAnchor="middle" className="logo-text" fill="url(#waterFill)">Water</text>
      {/* glossy highlight */}
      <text x="195" y="90" textAnchor="middle" className="logo-text" fill="url(#waterGloss)">Water</text>

      {/* ── SORT ── */}
      <text x="195" y="192" textAnchor="middle" className="logo-text logo-extrude">Sort</text>
      <text x="195" y="186" textAnchor="middle" className="logo-text logo-outline">Sort</text>
      <text x="195" y="186" textAnchor="middle" className="logo-text" fill="url(#sortFill)">Sort</text>
      <text x="195" y="186" textAnchor="middle" className="logo-text" fill="url(#sortGloss)">Sort</text>
    </g>
  </svg>
);

/**
 * SCREEN 1 — HOME PAGE
 * Premium casual mobile puzzle game home screen.
 * Bright dreamy aquatic fantasy presentation.
 */
export const HomeScreen = () => {
  const navigate = useNavigate();
  const { coins = 250, soundEnabled, currentDifficulty, unlockedLevels, dailyRewards } = usePlayer();

  const todayStr = (() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  })();
  const rewardReady = dailyRewards?.lastClaimDate !== todayStr;

  const handleNav = (path) => {
    playTapSound(soundEnabled);
    navigate(path);
  };

  const handlePlayClick = () => {
    playTapSound(soundEnabled);
    const difficulty = currentDifficulty || 'normal';
    const unlocked = unlockedLevels?.[difficulty] || [1];
    const maxUnlocked = Math.max(...unlocked, 1);
    navigate(`/game/${difficulty}/${maxUnlocked}`);
  };

  const handleInstructionsClick = () => {
    playTapSound(soundEnabled);
    navigate('/instructions');
  };

  return (
    <div className="home-page-container">
      {/* ── 1. Aquatic fantasy background ── */}
      <div className="home-bg-decorations" aria-hidden="true">
        {/* soft cloud-like translucent shapes */}
        <div className="home-cloud home-cloud-1" />
        <div className="home-cloud home-cloud-2" />
        <div className="home-cloud home-cloud-3" />

        {/* large blurred pale-blue curved shapes */}
        <div className="home-blob home-blob-1" />
        <div className="home-blob home-blob-2" />
        <div className="home-blob home-blob-3" />

        {/* bottom water reflections */}
        <div className="home-water-sheen" />

        {/* floating water droplets */}
        <GlossyDroplet size={14} className="home-float-drop home-float-drop-1" />
        <GlossyDroplet size={9} className="home-float-drop home-float-drop-2" />
        <GlossyDroplet size={11} className="home-float-drop home-float-drop-3" />
        <GlossyDroplet size={8} className="home-float-drop home-float-drop-4" />
        <GlossyDroplet size={12} className="home-float-drop home-float-drop-5" />

        {/* decorative green leaves — lower left & lower right edges */}
        <svg className="home-leaf-decor-bl" viewBox="0 0 160 150" fill="none">
          <path d="M8 148 C10 96 40 54 96 26 C78 62 60 108 30 142 Z" fill="#34D399" opacity="0.85" />
          <path d="M14 148 C30 104 66 72 118 58 C88 88 56 120 34 146 Z" fill="#10B981" opacity="0.8" />
          <path d="M0 138 C2 100 18 68 52 42 C38 78 22 112 10 140 Z" fill="#6EE7B7" opacity="0.75" />
          <path d="M8 148 C22 106 48 70 96 26" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
        <svg className="home-leaf-decor-br" viewBox="0 0 160 150" fill="none">
          <path d="M152 148 C150 96 120 54 64 26 C82 62 100 108 130 142 Z" fill="#34D399" opacity="0.85" />
          <path d="M146 148 C130 104 94 72 42 58 C72 88 104 120 126 146 Z" fill="#10B981" opacity="0.8" />
          <path d="M160 138 C158 100 142 68 108 42 C122 78 138 112 150 140 Z" fill="#6EE7B7" opacity="0.75" />
          <path d="M152 148 C138 106 112 70 64 26" stroke="#059669" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      </div>

      {/* ── 2. Top Header: Coin HUD pill + Settings button ── */}
      <header className="home-top-header">
        <div
          className="home-coin-pill"
          onClick={() => handleNav('/shop/bottles')}
          role="button"
          tabIndex={0}
          aria-label={`Coins: ${coins}`}
        >
          <span className="home-coin-icon-gold"><GoldCoin size={38} /></span>
          <span className="home-coin-amount">{coins}</span>
          <span className="home-coin-plus-btn" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5V12.5M1.5 7H12.5" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        <div className="home-header-actions">
          <button
            className="home-rewards-btn"
            onClick={() => handleNav('/rewards')}
            aria-label="Daily Rewards"
          >
            <svg width="26" height="26" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <rect x="10" y="26" width="44" height="30" rx="6" fill="#7A3A10" />
              <rect x="7" y="18" width="50" height="12" rx="5" fill="#7A3A10" />
              <rect x="27" y="18" width="10" height="38" rx="3" fill="#FFE066" />
              <path d="M32 16 C24 4 12 6 14 13 C15.5 18 26 18 32 16 Z" fill="#7A3A10" />
              <path d="M32 16 C40 4 52 6 50 13 C48.5 18 38 18 32 16 Z" fill="#7A3A10" />
              <circle cx="32" cy="16" r="4.5" fill="#FFE066" />
            </svg>
            {rewardReady && <span className="home-rewards-dot" aria-hidden="true" />}
          </button>
          <button
            className="home-settings-btn"
            onClick={() => handleNav('/settings')}
            aria-label="Open Settings"
          >
            <Settings size={24} strokeWidth={2.4} />
          </button>
        </div>
      </header>

      {/* ── 3. Main Central Content ── */}
      <main className="home-main-content">
        {/* Logo + decorative droplets + tagline */}
        <div className="home-title-hero-group">
          <div className="home-logo-wrap">
            <WaterSortLogo />
            <GlossyDroplet size={30} className="logo-drop logo-drop-left" />
            <GlossyDroplet size={18} className="logo-drop logo-drop-left-sm" />
            <GlossyDroplet size={28} className="logo-drop logo-drop-right" />
            <GlossyDroplet size={15} className="logo-drop logo-drop-right-sm" />
            <GlossyDroplet size={11} className="logo-drop logo-drop-top" />
          </div>
          <p className="home-hero-subtitle">Sort the colors, fill the bottles!</p>
        </div>

        <div className="home-gap-after-title" />

        {/* Bottle display on stone platform */}
        <WaterSortHero />

        <div className="home-gap-after-bottles" />

        {/* Primary Play button */}
        <div className="home-play-action-wrap">
          <GlossyDroplet size={13} className="play-side-drop play-side-drop-l1" />
          <GlossyDroplet size={8} className="play-side-drop play-side-drop-l2" />
          <GlossyDroplet size={12} className="play-side-drop play-side-drop-r1" />
          <GlossyDroplet size={8} className="play-side-drop play-side-drop-r2" />
          <button
            className="home-primary-play-btn"
            onClick={handlePlayClick}
            aria-label="Play Water Sort"
          >
            <Play size={22} fill="#FFFFFF" strokeWidth={0} />
            <span>Play</span>
          </button>
        </div>

        <div className="home-gap-play-instructions" />

        {/* Secondary Instructions button */}
        <div className="home-instructions-wrap">
          <button
            className="home-instructions-btn"
            onClick={handleInstructionsClick}
            aria-label="View Instructions"
          >
            <span className="home-info-icon-circle">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="4.2" r="1.5" fill="#FFFFFF" />
                <rect x="6.6" y="6.8" width="2.8" height="6" rx="1.4" fill="#FFFFFF" />
              </svg>
            </span>
            <span>Instructions</span>
          </button>
        </div>
      </main>

      {/* ── 4. Bottom Navigation Bar ── */}
      <BottomNav activeTab="home" />
    </div>
  );
};

export default HomeScreen;
