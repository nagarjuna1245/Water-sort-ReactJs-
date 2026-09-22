import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pause, RotateCcw, RotateCw, Settings, Plus, Droplet, FastForward, X, Play, LayoutGrid, Home, Volume2, Music } from 'lucide-react';
import { GameTube } from '../components/containers/GameTube';
import EnvironmentScene from '../components/environment/EnvironmentScene';
import { generateLevel } from '../game/levelGenerator';
import { MAX_CAPACITY, canPour, calcUnitsToPour, executePour, checkPuzzleSolved, findHint } from '../game/gameEngine';
import { createPourAnimator } from '../game/pourAnimator';
import {
  playDropSound,
  playPourSound,
  playWinSound,
  playTapSound,
  playErrorSound,
  triggerHaptic
} from '../utils/audio';
import { usePlayer } from '../context/PlayerContext';

/** Per-row overhead: ground shadow plus the wrapper paddings around the glass. */
const SHADOW_H = 24;

/** Vertical breathing room between stacked board rows. */
const ROW_GAP = 18;

/** Per-row platform padding (the wooden slab extends past the bottles). */
const PLATFORM_PAD_Y = 32;
const PLATFORM_PAD_X = 56;

/**
 * Bottle count drives the row structure: a few bottles get one centered row,
 * more bottles split into two, three or four balanced rows (largest first).
 */
const layoutRows = (count) => {
  if (count <= 4) return [count];
  if (count <= 10) {
    const top = Math.ceil(count / 2);
    return [top, count - top];
  }
  const rows = count <= 15 ? 3 : 4;
  const base = Math.floor(count / rows);
  const rem = count % rows;
  return Array.from({ length: rows }, (_, i) => base + (i < rem ? 1 : 0));
};

/**
 * Largest containers that fit the board's inner box (measured without the
 * HUD/control-panel padding): containers keep their 64:144 SVG aspect, so the
 * binding edge (width or height) sets the uniform scale.
 */
const computeLayout = (count, boardW, boardH) => {
  const rows = layoutRows(count);
  const maxCols = Math.max(...rows, 1);

  const gapW = maxCols >= 7 ? 4 : maxCols >= 6 ? 6 : maxCols >= 5 ? 9 : 14;
  const gapH = rows.length > 1 ? ROW_GAP : 0;

  const usableW = Math.max(120, boardW - PLATFORM_PAD_X);
  const usableH = Math.max(150, boardH - rows.length * PLATFORM_PAD_Y);

  const colW = (usableW - (maxCols - 1) * gapW) / maxCols;
  const rowH = (usableH - gapH * (rows.length - 1)) / rows.length - SHADOW_H;

  const scale = Math.min(Math.max(Math.min(colW / 64, rowH / 144), 0.42), 1.05);

  return { rows, gapW, width: 64 * scale, height: 144 * scale, scale };
};

/** Leaf-and-flower sprig decorating the corners of each wooden platform. */
const LeafSprig = ({ className }) => (
  <svg className={`gp-platform-sprig ${className}`} viewBox="0 0 46 34" aria-hidden="true">
    <path d="M44 6 Q24 2 10 14 Q2 22 8 28 Q24 24 34 14 Q44 10 44 6 Z" fill="#2E7D32" />
    <path d="M42 8 Q26 8 14 17 Q9 23 13 26 Q26 21 33 14 Q41 11 42 8 Z" fill="#4CAF50" />
    <path d="M40 26 Q26 30 16 26 Q22 34 34 32 Q40 30 40 26 Z" fill="#35913E" />
    <g transform="translate(12 12)">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-4.6" rx="2.7" ry="5" fill="#FFFFFF" transform={`rotate(${a})`} />
      ))}
      <circle r="2.4" fill="#FDD835" />
    </g>
  </svg>
);

/** Golden coin with a star, matching the reference HUD. */
const CoinIcon = () => (
  <svg viewBox="0 0 40 40" className="gp-coin-icon" aria-hidden="true">
    <defs>
      <radialGradient id="coin-face" cx="0.38" cy="0.32" r="0.9">
        <stop offset="0" stopColor="#FFE9A3" />
        <stop offset="0.55" stopColor="#FFC531" />
        <stop offset="1" stopColor="#E8940A" />
      </radialGradient>
    </defs>
    <circle cx="20" cy="21" r="17" fill="#B4700A" />
    <circle cx="20" cy="19.5" r="17" fill="url(#coin-face)" stroke="#D98E12" strokeWidth="1.5" />
    <circle cx="20" cy="19.5" r="12.5" fill="none" stroke="#F5B82E" strokeWidth="2.5" opacity="0.8" />
    <path d="M20 11 L22.4 15.6 L27.5 16.3 L23.8 19.9 L24.7 25 L20 22.4 L15.3 25 L16.2 19.9 L12.5 16.3 L17.6 15.6 Z"
      fill="#E8940A" />
    <path d="M20 11 L22.4 15.6 L27.5 16.3 L23.8 19.9 L24.7 25 L20 22.4 L15.3 25 L16.2 19.9 L12.5 16.3 L17.6 15.6 Z"
      fill="none" stroke="#FFE9A3" strokeWidth="0.8" transform="translate(0 -0.8)" opacity="0.7" />
    <ellipse cx="14" cy="9.5" rx="6" ry="3" fill="#FFF3C4" opacity="0.55" transform="rotate(-30 14 9.5)" />
  </svg>
);

/** Glowing lightbulb for the hints capsule. */
const BulbIcon = () => (
  <svg viewBox="0 0 32 32" className="gp-bulb-icon" aria-hidden="true">
    <defs>
      <radialGradient id="bulb-glow" cx="0.5" cy="0.45" r="0.55">
        <stop offset="0" stopColor="#FFF59B" stopOpacity="0.95" />
        <stop offset="1" stopColor="#FFF59B" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="bulb-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFEC8B" />
        <stop offset="1" stopColor="#FFC531" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="13" r="13" fill="url(#bulb-glow)" />
    <path d="M16 3 C10.5 3 6.5 7 6.5 12.2 C6.5 15.6 8.3 17.7 9.9 19.4 C10.9 20.5 11.4 21.3 11.6 22.5 L20.4 22.5 C20.6 21.3 21.1 20.5 22.1 19.4 C23.7 17.7 25.5 15.6 25.5 12.2 C25.5 7 21.5 3 16 3 Z"
      fill="url(#bulb-glass)" stroke="#E8940A" strokeWidth="1.3" />
    <path d="M12.2 25 H19.8 M12.8 27.6 H19.2 M13.6 30.2 H18.4" stroke="#9AA3AE" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 8.5 Q11 10.5 11 13.5" stroke="#FFF9D9" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    <path d="M13.5 16 L16 11.5 L18.5 16" stroke="#E8940A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
);

/**
 * SCREEN 3 — GAMEPLAY (premium tropical reference skin)
 * 100% dynamic board: the level configuration decides bottle count, colors and
 * layout; the wooden platform and bottle scale re-flow around it.
 * Features:
 * - Tilt + gravity-fed stream pour driven by the real bottle state
 * - Undo / Restart / Add Tube / Skip control panel with resource badges
 * - Pause menu overlay with live audio settings
 * - Intelligent hint finder with persistent hint counter
 * - Real-time par-moves star rating shown on the wooden banner
 * - Instant win detection with navigation to Level Complete
 */
export const GameplayScreen = () => {
  const { difficulty = 'normal', levelId = '1' } = useParams();
  const navigate = useNavigate();

  const {
    coins,
    currentBottle,
    soundEnabled,
    musicEnabled,
    vibrationEnabled,
    hintCount,
    recordLevelStart,
    recordMove,
    recordUndo,
    useHint,
    completeLevel,
    toggleSound,
    toggleMusic,
    watchAdDaily,
  } = usePlayer();

  const numLevelId = parseInt(levelId, 10) || 1;
  const levelConfig = useMemo(() => generateLevel(numLevelId, difficulty), [numLevelId, difficulty]);

  // Gameplay State
  const [containers, setContainers] = useState(() => JSON.parse(JSON.stringify(levelConfig.containers)));
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [moves, setMoves] = useState(0);
  const [undoStack, setUndoStack] = useState([]);
  const [hintPair, setHintPair] = useState(null);
  const [pending, setPending] = useState(null); // move armed for animation
  const [isPouring, setIsPouring] = useState(false);
  const [shakeIdx, setShakeIdx] = useState(null);
  const [isWon, setIsWon] = useState(false);

  // Control-panel resources (badges)
  const [undoLeft, setUndoLeft] = useState(5);
  const [skipsLeft, setSkipsLeft] = useState(1);

  // Modals & Overlays
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Board metrics drive container sizing; the tube registry and the overlay
  // canvas are the only things the animator touches to draw.
  const boardRef = useRef(null);
  const overlayRef = useRef(null);
  const tubesRef = useRef(new Map());
  const containersRef = useRef(containers);
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    containersRef.current = containers;
  }, [containers]);

  useEffect(() => {
    const measure = () => {
      const el = boardRef.current;
      if (el) {
        // The board's own padding reserves room for the HUD and control panel;
        // only the inner box is available to bottles.
        const cs = getComputedStyle(el);
        const innerW = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const innerH = el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        setBoardSize({ w: innerW, h: innerH });
      }
      const cv = overlayRef.current;
      if (cv) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        const w = Math.max(1, Math.round(cv.clientWidth * dpr));
        const h = Math.max(1, Math.round(cv.clientHeight * dpr));
        if (cv.width !== w || cv.height !== h) {
          cv.width = w;
          cv.height = h;
        }
      }
    };
    measure();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(onResize);
      if (boardRef.current) observer.observe(boardRef.current);
      if (overlayRef.current) observer.observe(overlayRef.current);
    }
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  /**
   * The single animation entry point: `animatePour(src, dst, amount, color)`
   * resolves once the tube is physically back in its slot. It never writes
   * `containers` — the caller commits the move afterwards.
   */
  const soundRef = useRef({ soundEnabled, musicEnabled, vibrationEnabled });
  soundRef.current = { soundEnabled, musicEnabled, vibrationEnabled };
  const animator = useMemo(
    () =>
      createPourAnimator({
        getTube: (i) => tubesRef.current.get(i),
        listTubes: () =>
          [...tubesRef.current.values()].map((t) => ({ index: t.index, rect: t.slot.getBoundingClientRect() })),
        getOverlay: () => overlayRef.current,
        getCeiling: () => {
          const el = boardRef.current;
          if (!el) return 0;
          const cs = getComputedStyle(el);
          return el.getBoundingClientRect().top + parseFloat(cs.paddingTop);
        },
        readContainers: () => containersRef.current,
        hooks: {
          onFlowStart: () => {
            playPourSound(soundRef.current.soundEnabled);
            triggerHaptic(soundRef.current.vibrationEnabled, 18);
          },
          onSplash: () => playDropSound(soundRef.current.soundEnabled),
        },
      }),
    []
  );

  const layout = useMemo(
    () => computeLayout(containers.length, boardSize.w || 300, boardSize.h || 330),
    [containers.length, boardSize]
  );

  const rowSlices = useMemo(() => {
    const slices = [];
    let cursor = 0;
    for (const n of layout.rows) {
      slices.push({ start: cursor, items: containers.slice(cursor, cursor + n) });
      cursor += n;
    }
    return slices;
  }, [layout.rows, containers]);

  // Initialize level session
  useEffect(() => {
    setContainers(JSON.parse(JSON.stringify(levelConfig.containers)));
    setSelectedIdx(null);
    setMoves(0);
    setUndoStack([]);
    setHintPair(null);
    setPending(null);
    setIsPouring(false);
    setShakeIdx(null);
    setIsWon(false);
    setUndoLeft(5);
    setSkipsLeft(1);
    setShowPauseModal(false);
    setShowRestartModal(false);
    recordLevelStart(difficulty, numLevelId);
  }, [difficulty, numLevelId, levelConfig, recordLevelStart]);

  // Auto-clear toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Auto-clear invalid-move shake
  useEffect(() => {
    if (shakeIdx === null) return undefined;
    const timer = setTimeout(() => setShakeIdx(null), 420);
    return () => clearTimeout(timer);
  }, [shakeIdx]);

  const parMoves = levelConfig.parMoves || 10;

  /**
   * Commit the move the animator just played out. This is the only place a pour
   * writes game state, and it runs after the tube is physically back in its slot.
   */
  const commitMove = (mv) => {
    setUndoStack((prev) => [...prev, mv.before]);
    setContainers(mv.nextContainers);
    setMoves(mv.newMoveCount);
    recordMove();
    setSelectedIdx(null);
    setHintPair(null);
    setIsPouring(false);
    setPending(null);

    if (mv.solved) {
      setIsWon(true);
      playWinSound(soundEnabled);
      triggerHaptic(vibrationEnabled, [40, 60, 100]);
      completeLevel({
        difficulty,
        levelId: numLevelId,
        moves: mv.newMoveCount,
        stars: mv.stars,
      });
      setTimeout(() => {
        navigate(`/complete/${difficulty}/${numLevelId}`, {
          state: { moves: mv.newMoveCount, stars: mv.stars, parMoves },
        });
      }, 650);
    }
  };

  /**
   * Pour runner: `animatePour` drives every frame and resolves when the tube has
   * returned home, so the state commit below can never race the visuals.
   */
  useEffect(() => {
    if (!pending) return undefined;
    let aborted = false;
    // One frame of slack: the board has just switched to overflow:visible, and
    // the slot rectangles are measured from that settled layout.
    const raf = requestAnimationFrame(() => {
      animator.animatePour(pending.fromIdx, pending.toIdx, pending.units, pending.color).then(() => {
        if (!aborted) commitMove(pending);
      });
    });
    return () => {
      aborted = true;
      cancelAnimationFrame(raf);
      animator.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending]);

  /** Arm a legal move: snapshots the result, then hands control to the animator. */
  const armPour = (fromIdx, toIdx) => {
    const result = executePour(containers, fromIdx, toIdx);
    if (!result) return;
    const newMoveCount = moves + 1;
    setShakeIdx(null);
    setIsPouring(true);
    setPending({
      fromIdx,
      toIdx,
      units: result.transferUnits,
      color: result.color,
      before: containers.map((c) => [...c]),
      nextContainers: result.nextContainers,
      newMoveCount,
      solved: checkPuzzleSolved(result.nextContainers),
      stars: newMoveCount <= parMoves ? 3 : newMoveCount <= parMoves + 3 ? 2 : 1,
    });
  };

  // Real-time Container Tap Interaction
  const handleTubeClick = (index) => {
    if (isPouring || isWon || showPauseModal || showRestartModal) return;

    // Case 1: Nothing selected yet
    if (selectedIdx === null) {
      if (containers[index].length > 0) {
        setSelectedIdx(index);
        setHintPair(null);
        playDropSound(soundEnabled);
        triggerHaptic(vibrationEnabled, 15);
      }
      return;
    }

    // Case 2: User tapped the already selected container -> Deselect
    if (selectedIdx === index) {
      setSelectedIdx(null);
      playTapSound(soundEnabled);
      return;
    }

    // Case 3: User selected source and tapped destination
    const source = containers[selectedIdx];
    const target = containers[index];

    if (canPour(source, target) && calcUnitsToPour(source, target) > 0) {
      armPour(selectedIdx, index);
      return;
    }

    // Invalid tap: no liquid, no state change — shake + selection feedback only
    setShakeIdx(index);
    playErrorSound(soundEnabled);
    triggerHaptic(vibrationEnabled, 25);
    if (target.length > 0 && target.length < MAX_CAPACITY) {
      setSelectedIdx(index);
      setHintPair(null);
    }
  };

  // Undo last move (limited by badge count)
  const handleUndo = () => {
    if (undoStack.length === 0 || undoLeft <= 0 || isPouring || isWon) return;
    const lastState = undoStack[undoStack.length - 1];
    setContainers(lastState);
    setUndoStack(prev => prev.slice(0, -1));
    setUndoLeft(prev => prev - 1);
    setMoves(m => Math.max(0, m - 1));
    setSelectedIdx(null);
    setHintPair(null);
    recordUndo();
    playTapSound(soundEnabled);
    triggerHaptic(vibrationEnabled, 15);
  };

  // Add an extra empty bottle to the board; the layout re-flows automatically
  const handleAddTube = () => {
    if (isPouring || isWon) return;
    setContainers(prev => [...prev, []]);
    setSelectedIdx(null);
    setHintPair(null);
    playDropSound(soundEnabled);
    triggerHaptic(vibrationEnabled, 20);
  };

  // Skip the current puzzle and advance to the next level
  const handleSkip = () => {
    if (skipsLeft <= 0 || isPouring || isWon) return;
    setSkipsLeft(prev => prev - 1);
    playTapSound(soundEnabled);
    navigate(`/game/${difficulty}/${numLevelId + 1}`);
  };

  // Confirm Restart
  const handleConfirmRestart = () => {
    animator.cancel();
    setContainers(JSON.parse(JSON.stringify(levelConfig.containers)));
    setSelectedIdx(null);
    setMoves(0);
    setUndoStack([]);
    setHintPair(null);
    setPending(null);
    setIsPouring(false);
    setShakeIdx(null);
    setShowRestartModal(false);
    playTapSound(soundEnabled);
  };

  // Hint Engine trigger
  const handleHint = () => {
    if (isPouring || isWon) return;

    if (hintCount <= 0) {
      setToastMessage('No hints remaining');
      playErrorSound(soundEnabled);
      return;
    }

    const hint = findHint(containers);
    if (!hint) {
      setToastMessage('No available move.');
      playErrorSound(soundEnabled);
      return;
    }

    const success = useHint();
    if (success) {
      setHintPair([hint.fromIdx, hint.toIdx]);
      setSelectedIdx(hint.fromIdx);
      playDropSound(soundEnabled);
      triggerHaptic(vibrationEnabled, 30);
    }
  };

  const renderContainer = (layers, idx) => {
    const isSelected = selectedIdx === idx;
    const isHintSource = hintPair?.[0] === idx;
    const isHintTarget = hintPair?.[1] === idx;
    const isFlying = isPouring && pending?.fromIdx === idx;

    return (
      <div
        key={idx}
        className={`gameplay-tube-wrapper ${isHintSource || isHintTarget ? 'hint-pulsing' : ''}`}
        onClick={() => handleTubeClick(idx)}
        style={{
          outline: isHintTarget ? '2.5px dashed #22C55E' : isHintSource ? '2.5px solid #FFE17A' : 'none',
          borderRadius: 24,
          padding: 2,
        }}
      >
        <GameTube
          index={idx}
          kind="bottle"
          skin={currentBottle === 'default' ? 'ocean' : currentBottle}
          layers={layers}
          cssW={layout.width}
          cssH={layout.height}
          selected={isSelected}
          shaking={shakeIdx === idx && !isFlying}
          registry={tubesRef}
        />
        <div
          className={`container-touch-shadow ${isSelected ? 'active' : ''} ${isFlying ? 'is-airborne' : ''}`}
        />
      </div>
    );
  };

  return (
    <div className="gameplay-screen-layout gp-screen">
      {/* Tropical lagoon environment */}
      <EnvironmentScene />

      {/* ===== HUD ===== */}
      <div className="gp-hud">
        <div className="gp-hud-row1">
          {/* Left: coin wallet */}
          <div className="gp-coin-hud">
            <CoinIcon />
            <span className="gp-coin-amount">{coins}</span>
            <button
              className="gp-coin-plus"
              aria-label="Get coins"
              onClick={() => {
                playTapSound(soundEnabled);
                watchAdDaily();
              }}
            >
              <Plus size={15} strokeWidth={3.2} />
            </button>
          </div>

          {/* Center: wooden level banner */}
          <div className="gp-banner">
            <svg className="gp-banner-leaves left" viewBox="0 0 40 30" aria-hidden="true">
              <path d="M36 4 Q20 0 8 12 Q2 20 8 26 Q22 22 30 12 Q36 8 36 4 Z" fill="#2E7D32" />
              <path d="M34 6 Q22 6 12 15 Q8 21 12 24 Q23 19 29 12 Q34 9 34 6 Z" fill="#4CAF50" />
            </svg>
            <svg className="gp-banner-leaves right" viewBox="0 0 40 30" aria-hidden="true">
              <path d="M4 4 Q20 0 32 12 Q38 20 32 26 Q18 22 10 12 Q4 8 4 4 Z" fill="#2E7D32" />
              <path d="M6 6 Q18 6 28 15 Q32 21 28 24 Q17 19 11 12 Q6 9 6 6 Z" fill="#4CAF50" />
            </svg>
            <div className="gp-banner-plank">
              <span className="gp-banner-title">Level {numLevelId}</span>
            </div>
          </div>

          {/* Right: settings */}
          <button
            className="gp-round-btn gp-settings"
            aria-label="Settings"
            onClick={() => {
              playTapSound(soundEnabled);
              navigate('/settings');
            }}
          >
            <Settings size={24} strokeWidth={2.2} />
          </button>
        </div>

        <div className="gp-hud-row2">
          {/* Left: pause */}
          <button
            className="gp-round-btn gp-pause"
            aria-label="Pause"
            onClick={() => {
              playTapSound(soundEnabled);
              setShowPauseModal(true);
            }}
          >
            <Pause size={20} strokeWidth={2.6} fill="currentColor" />
          </button>

          {/* Right: hints capsule */}
          <button className="gp-hints-capsule" aria-label="Use hint" onClick={handleHint}>
            <BulbIcon />
            <span className="gp-hints-text">
              <span className="gp-hints-label">Hints</span>
              <span className="gp-hints-num">{hintCount}</span>
            </span>
          </button>
        </div>
      </div>

      {/* ===== GAME BOARD ===== */}
      <div ref={boardRef} className={`gameplay-board-center gp-board ${isPouring ? 'is-pouring' : ''}`}>
        {rowSlices.map((slice, rowIdx) => (
          <div key={rowIdx} className="gp-row-platform">
            <div className="gp-platform" />
            <LeafSprig className="tl" />
            <LeafSprig className="bl" />
            <LeafSprig className="tr" />
            <LeafSprig className="br" />
            <div className="gp-row" style={{ gap: layout.gapW }}>
              {slice.items.map((layers, localIdx) =>
                renderContainer(layers, slice.start + localIdx)
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stream, droplets and splash for the pour in flight */}
      <canvas ref={overlayRef} className="pour-overlay-canvas" aria-hidden="true" />

      {/* ===== BOTTOM CONTROL PANEL ===== */}
      <div className="gp-bottom-panel">
        <div className="gp-ctrl-item">
          <button
            className="gp-ctrl-btn blue"
            onClick={handleUndo}
            disabled={undoStack.length === 0 || undoLeft <= 0}
            aria-label="Undo"
          >
            <RotateCcw size={26} strokeWidth={2.4} />
            <span className="gp-ctrl-badge">{undoLeft}</span>
          </button>
          <span className="gp-ctrl-label">Undo</span>
        </div>

        <div className="gp-ctrl-item">
          <button
            className="gp-ctrl-btn purple"
            onClick={() => {
              playTapSound(soundEnabled);
              setShowRestartModal(true);
            }}
            aria-label="Restart"
          >
            <RotateCw size={26} strokeWidth={2.4} />
          </button>
          <span className="gp-ctrl-label">Restart</span>
        </div>

        <div className="gp-ctrl-item">
          <button className="gp-ctrl-btn pink" onClick={handleAddTube} aria-label="Add Tube">
            <Droplet size={24} strokeWidth={2.2} fill="rgba(255,255,255,0.28)" />
            <span className="gp-ctrl-drop-plus">+</span>
          </button>
          <span className="gp-ctrl-label">Add Tube</span>
        </div>

        <div className="gp-ctrl-item">
          <button
            className="gp-ctrl-btn green"
            onClick={handleSkip}
            disabled={skipsLeft <= 0}
            aria-label="Skip level"
          >
            <FastForward size={26} strokeWidth={2.2} fill="rgba(255,255,255,0.9)" />
            <span className="gp-ctrl-badge">{skipsLeft}</span>
          </button>
          <span className="gp-ctrl-label">Skip</span>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="gp-toast">{toastMessage}</div>
      )}

      {/* Restart Confirmation Modal */}
      {showRestartModal && (
        <div className="gp-modal-veil" onClick={() => setShowRestartModal(false)}>
          <div className="gp-modal" style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div className="gp-modal-glow" />
            <h3 className="gp-modal-title center">Restart Level?</h3>
            <p className="gp-modal-desc">All progress on this level will be reset.</p>
            <div className="gp-modal-actions">
              <button
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => {
                  playTapSound(soundEnabled);
                  setShowRestartModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={handleConfirmRestart}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pause Menu Modal */}
      {showPauseModal && (
        <div className="gp-modal-veil" onClick={() => setShowPauseModal(false)}>
          <div className="gp-modal" onClick={e => e.stopPropagation()}>
            <div className="gp-modal-glow" />
            <div className="gp-modal-head">
              <h3 className="gp-modal-title">Paused</h3>
              <button
                className="gp-modal-close"
                onClick={() => setShowPauseModal(false)}
                aria-label="Close Pause Menu"
              >
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>

            {/* Quick Sound/Music Toggles */}
            <div className="gp-audio-panel">
              <button
                className={`gp-audio-toggle ${soundEnabled ? '' : 'off'}`}
                onClick={toggleSound}
              >
                <Volume2 size={18} strokeWidth={2.2} />
                <span>Sound: {soundEnabled ? 'ON' : 'OFF'}</span>
              </button>
              <div className="gp-audio-divider" />
              <button
                className={`gp-audio-toggle ${musicEnabled ? '' : 'off'}`}
                onClick={toggleMusic}
              >
                <Music size={18} strokeWidth={2.2} />
                <span>Music: {musicEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14, position: 'relative' }}>
              <button
                className="gp-menu-btn resume"
                onClick={() => {
                  playTapSound(soundEnabled);
                  setShowPauseModal(false);
                }}
              >
                <Play size={18} fill="#fff" strokeWidth={0} />
                <span>Resume Game</span>
              </button>

              <button
                className="gp-menu-btn restart"
                onClick={() => {
                  setShowPauseModal(false);
                  handleConfirmRestart();
                }}
              >
                <RotateCcw size={18} strokeWidth={2.2} />
                <span>Restart Level</span>
              </button>

              <button
                className="gp-menu-btn levels"
                onClick={() => {
                  playTapSound(soundEnabled);
                  navigate('/levels');
                }}
              >
                <LayoutGrid size={18} strokeWidth={2.2} />
                <span>Level Selection</span>
              </button>

              <button
                className="gp-menu-btn menu-home"
                onClick={() => {
                  playTapSound(soundEnabled);
                  navigate('/');
                }}
              >
                <Home size={18} strokeWidth={2.2} />
                <span>Main Menu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameplayScreen;
