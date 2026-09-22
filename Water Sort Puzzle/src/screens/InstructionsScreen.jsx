import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import EnvironmentScene from '../components/environment/EnvironmentScene';
import { playTapSound } from '../utils/audio';
import './InstructionsScreen.css';

/**
 * Simple Water Bottle SVG for Instructions
 */
const InstructionBottle = ({ colors = ['#3B82F6', '#FACC15', '#EC4899', '#8B5CF6'] }) => (
  <svg width="48" height="92" viewBox="0 0 48 92" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="bottleClip">
        <path d="M16 4H32V12C32 14 36 17 37 21V76C37 81 32 86 24 86C16 86 11 81 11 76V21C12 17 16 14 16 12V4Z" />
      </clipPath>
    </defs>
    {/* Liquid layers */}
    <g clipPath="url(#bottleClip)">
      {colors.map((color, i) => (
        <rect
          key={i}
          x="9"
          y={64 - i * 18}
          width="30"
          height="20"
          fill={color}
        />
      ))}
    </g>
    {/* Glass body */}
    <path
      d="M16 4H32V12C32 14 36 17 37 21V76C37 81 32 86 24 86C16 86 11 81 11 76V21C12 17 16 14 16 12V4Z"
      fill="rgba(200,220,255,0.12)"
      stroke="#A5B4FC"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    {/* Neck */}
    <rect x="15" y="2" width="18" height="5" rx="2.5" fill="#C7D2FE" stroke="#A5B4FC" strokeWidth="1.2" />
    {/* Shine */}
    <path d="M13 28Q12 48 12 70" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Two Bottles with Arrow for Pour Animation
 */
const PourIllustration = () => (
  <div className="instr-pour-visual">
    <InstructionBottle colors={['#3B82F6', '#FACC15', '#EC4899']} />
    <div className="instr-pour-arrow">→</div>
    <InstructionBottle colors={['#8B5CF6', '#22C55E']} />
  </div>
);

/**
 * Completed Bottle (Single Color)
 */
const CompletedBottle = () => (
  <InstructionBottle colors={['#3B82F6', '#3B82F6', '#3B82F6', '#3B82F6']} />
);

/**
 * Empty Bottle
 */
const EmptyBottle = () => (
  <InstructionBottle colors={[]} />
);

/**
 * Instructions Screen
 */
export const InstructionsScreen = () => {
  const navigate = useNavigate();
  const { soundEnabled } = usePlayer();

  const handleBack = () => {
    playTapSound(soundEnabled);
    navigate('/');
  };

  const handleGotIt = () => {
    playTapSound(soundEnabled);
    navigate('/');
  };

  return (
    <div className="instr-screen-container">
      {/* Tropical environment backdrop (same scene as gameplay/settings) */}
      <EnvironmentScene />
      <div className="instr-dim" aria-hidden="true" />

      {/* Header */}
      <header className="instr-header">
        <button
          className="instr-back-btn"
          onClick={handleBack}
          aria-label="Back to Home"
        >
          <ArrowLeft size={22} strokeWidth={2.6} />
        </button>
        <div className="instr-title-banner">
          <h1 className="instr-header-title">Instructions</h1>
        </div>
        <div className="instr-header-spacer" />
      </header>

      {/* Main Content */}
      <main className="instr-main-content">
        {/* Step 1: Select a Tube */}
        <div className="instr-card instr-card-1">
          <div className="instr-step-num">1</div>
          <div className="instr-card-visual">
            <InstructionBottle colors={['#3B82F6', '#FACC15', '#EC4899', '#8B5CF6']} />
          </div>
          <div className="instr-card-text">
            <h2 className="instr-step-title">Select a Tube</h2>
            <p className="instr-step-desc">Tap a tube to select it.</p>
          </div>
        </div>

        {/* Step 2: Pour the Water */}
        <div className="instr-card instr-card-2">
          <div className="instr-step-num">2</div>
          <div className="instr-card-visual is-wide">
            <PourIllustration />
          </div>
          <div className="instr-card-text">
            <h2 className="instr-step-title">Pour the Water</h2>
            <p className="instr-step-desc">Tap another tube to pour the top color.</p>
          </div>
        </div>

        {/* Step 3: Match Colors */}
        <div className="instr-card instr-card-3">
          <div className="instr-step-num">3</div>
          <div className="instr-card-visual">
            <InstructionBottle colors={['#EC4899', '#EC4899']} />
          </div>
          <div className="instr-card-text">
            <h2 className="instr-step-title">Match Colors</h2>
            <p className="instr-step-desc">Only the same color can be poured together.</p>
          </div>
        </div>

        {/* Step 4: Use Empty Space */}
        <div className="instr-card instr-card-4">
          <div className="instr-step-num">4</div>
          <div className="instr-card-visual">
            <EmptyBottle />
          </div>
          <div className="instr-card-text">
            <h2 className="instr-step-title">Use Empty Space</h2>
            <p className="instr-step-desc">Use empty tubes to organize the colors.</p>
          </div>
        </div>

        {/* Step 5: Complete the Level */}
        <div className="instr-card instr-card-5">
          <div className="instr-step-num">5</div>
          <div className="instr-card-visual">
            <CompletedBottle />
            <div className="instr-check-icon">
              <Check size={24} strokeWidth={3.2} color="#FFFFFF" />
            </div>
          </div>
          <div className="instr-card-text">
            <h2 className="instr-step-title">Complete the Level</h2>
            <p className="instr-step-desc">Sort every color into its own tube to complete the level.</p>
          </div>
        </div>
      </main>

      {/* Bottom Action */}
      <div className="instr-bottom-action">
        <button
          className="instr-got-it-btn"
          onClick={handleGotIt}
          aria-label="Got it"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default InstructionsScreen;
