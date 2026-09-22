import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, Music, Vibrate, Globe, Shield, Info, ChevronRight, User, X } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { playTapSound } from '../utils/audio';
import { useGoBack } from '../utils/navigation';
import EnvironmentScene from '../components/environment/EnvironmentScene';
import './SettingsScreen.css';

/* Wooden banner leaves (matches gameplay HUD banner) */
const Leaf = ({ flip = false }) => (
  <svg className={`st-banner-leaf ${flip ? 'is-flip' : ''}`} viewBox="0 0 40 26" aria-hidden="true">
    <path d="M38 4 C24 2 10 8 4 22 C18 24 32 18 38 4 Z" fill="#3E9E38" />
    <path d="M38 4 C26 8 14 14 6 21" stroke="#63C45B" strokeWidth="2" fill="none" />
  </svg>
);

const Toggle = ({ on, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    aria-label={label}
    className={`st-toggle ${on ? 'is-on' : ''}`}
    onClick={onChange}
  >
    <span className="st-toggle-knob" />
  </button>
);

/**
 * SETTINGS — tropical lagoon skin
 * Sound / Music / Vibration toggles, preferences, info modals, profile link.
 */
export const SettingsScreen = () => {
  const navigate = useNavigate();
  const {
    soundEnabled,
    musicEnabled,
    vibrationEnabled,
    toggleSound,
    toggleMusic,
    toggleVibration,
  } = usePlayer();

  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'about' | null

  const goBack = useGoBack('/');
  const tap = () => playTapSound(soundEnabled);

  const handleToggleSound = () => { toggleSound(); playTapSound(!soundEnabled); };
  const handleToggleMusic = () => { toggleMusic(); playTapSound(soundEnabled); };
  const handleToggleVibration = () => { toggleVibration(); playTapSound(soundEnabled); };

  return (
    <div className="st-root">
      <EnvironmentScene />
      <div className="st-dim" aria-hidden="true" />

      {/* ═══ HUD ══ */}
      <div className="st-hud">
        <button className="st-round-btn st-round-back" onClick={() => { tap(); goBack(); }} aria-label="Back">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.8 5 L8 12 L14.8 19 M8.6 12 L19 12" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="st-banner">
          <Leaf />
          <span className="st-banner-text">Settings</span>
          <Leaf flip />
        </div>

        <button className="st-round-btn st-round-profile" onClick={() => { tap(); navigate('/profile'); }} aria-label="Profile">
          <User size={22} strokeWidth={2.6} color="#FFFFFF" />
        </button>
      </div>

      {/* ═══ BODY ═══ */}
      <div className="st-body">

        {/* Audio & Haptics */}
        <div className="st-group" style={{ '--gd': '0.1s' }}>
          <div className="st-plaque"><span>Audio &amp; Haptics</span></div>
          <div className="st-card">
            <div className="st-row">
              <div className="st-row-left">
                <span className="st-tile st-tile-purple"><Volume2 size={19} strokeWidth={2.4} color="#FFFFFF" /></span>
                <span className="st-label">Sound Effects</span>
              </div>
              <Toggle on={soundEnabled} onChange={handleToggleSound} label="Toggle Sound Effects" />
            </div>
            <div className="st-divider" />
            <div className="st-row">
              <div className="st-row-left">
                <span className="st-tile st-tile-blue"><Music size={19} strokeWidth={2.4} color="#FFFFFF" /></span>
                <span className="st-label">Ambient Music</span>
              </div>
              <Toggle on={musicEnabled} onChange={handleToggleMusic} label="Toggle Music" />
            </div>
            <div className="st-divider" />
            <div className="st-row">
              <div className="st-row-left">
                <span className="st-tile st-tile-pink"><Vibrate size={19} strokeWidth={2.4} color="#FFFFFF" /></span>
                <span className="st-label">Haptic Vibration</span>
              </div>
              <Toggle on={vibrationEnabled} onChange={handleToggleVibration} label="Toggle Vibration" />
            </div>
          </div>
        </div>

        {/* Preferences & Info */}
        <div className="st-group" style={{ '--gd': '0.22s' }}>
          <div className="st-plaque"><span>Preferences &amp; Info</span></div>
          <div className="st-card">
            <div className="st-row">
              <div className="st-row-left">
                <span className="st-tile st-tile-green"><Globe size={19} strokeWidth={2.4} color="#FFFFFF" /></span>
                <span className="st-label">Language</span>
              </div>
              <span className="st-chip">English</span>
            </div>
            <div className="st-divider" />
            <button className="st-row st-row-btn" onClick={() => { tap(); setActiveModal('privacy'); }}>
              <div className="st-row-left">
                <span className="st-tile st-tile-indigo"><Shield size={19} strokeWidth={2.4} color="#FFFFFF" /></span>
                <span className="st-label">Privacy Policy</span>
              </div>
              <span className="st-chev"><ChevronRight size={16} strokeWidth={2.8} color="#FFFFFF" /></span>
            </button>
            <div className="st-divider" />
            <button className="st-row st-row-btn" onClick={() => { tap(); setActiveModal('about'); }}>
              <div className="st-row-left">
                <span className="st-tile st-tile-amber"><Info size={19} strokeWidth={2.4} color="#FFFFFF" /></span>
                <span className="st-label">About Water Sort</span>
              </div>
              <span className="st-chev"><ChevronRight size={16} strokeWidth={2.8} color="#FFFFFF" /></span>
            </button>
          </div>
        </div>

        {/* Profile card */}
        <button className="st-profile-card" style={{ '--gd': '0.34s' }} onClick={() => { tap(); navigate('/profile'); }}>
          <span className="st-tile st-tile-teal st-tile-lg"><User size={22} strokeWidth={2.4} color="#FFFFFF" /></span>
          <span className="st-profile-copy">
            <span className="st-profile-title">Player Profile</span>
            <span className="st-profile-sub">Stats, streaks &amp; achievements</span>
          </span>
          <span className="st-chev"><ChevronRight size={17} strokeWidth={2.8} color="#FFFFFF" /></span>
        </button>
      </div>

      {/* ═══ MODAL ═══ */}
      {activeModal && (
        <div className="st-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="st-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="st-modal-banner">
              <Leaf />
              <span className="st-banner-text">
                {activeModal === 'privacy' ? 'Privacy' : 'About'}
              </span>
              <Leaf flip />
            </div>
            <button className="st-modal-x" onClick={() => setActiveModal(null)} aria-label="Close">
              <X size={15} strokeWidth={3} color="#FFFFFF" />
            </button>
            <p className="st-modal-text">
              {activeModal === 'privacy'
                ? 'Your game progress, coins, streak, and statistics are stored locally on your device. No personal data is tracked or transmitted to any remote servers.'
                : 'Water Sort Puzzle is an elegant, calming color sorting puzzle built with React, Web Audio synthesis, and responsive 2D SVG containers.'}
            </p>
            <button className="st-modal-btn" onClick={() => { tap(); setActiveModal(null); }}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
