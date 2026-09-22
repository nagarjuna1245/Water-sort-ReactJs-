import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { updateAmbientMusic, triggerHaptic } from '../utils/audio';

const STORAGE_KEY = 'water_sort_player_data_v2';

const getLocalDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DEFAULT_STATE = {
  coins: 250,
  unlockedLevels: {
    normal: [1, 2, 3, 4, 5, 6],
    hard: [1],
  },
  completedLevels: {
    normal: [],
    hard: [],
  },
  levelStars: {
    normal: {},
    hard: {},
  },
  bestMoves: {
    normal: {},
    hard: {},
  },
  currentDifficulty: 'normal',
  currentTheme: 'Classic',
  ownedThemes: ['Classic'],
  currentBottle: 'default',
  ownedBottles: ['default'],
  currentTube: 'default',
  ownedTubes: ['default'],
  containerType: 'tube', // 'tube' | 'bottle'
  soundEnabled: true,
  musicEnabled: true,
  vibrationEnabled: false,
  hintCount: 5,
  statistics: {
    levelsStarted: { normal: [], hard: [] },
    totalMoves: 0,
    totalHintsUsed: 0,
    totalUndos: 0,
  },
  dailyChallenges: {
    lastDate: '',
    levelsCompletedToday: 0,
    movesUnder15Achieved: false,
    completedLevel5Today: false,
    adWatchedToday: false,
    claimed: {},
  },
  dailyRewards: {
    claimedDays: [],
    lastClaimDate: '',
  },
  boosters: 0,
  undos: 0,
  chests: 0,
  streak: {
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: '',
  },
  achievements: {
    firstWin: false,
    tenLevels: false,
    fiftyLevels: false,
    hundredLevels: false,
    perfectSort: false,
    twentyStreak: false,
  },
};

const DIFFS = ['normal', 'hard'];

const uniqueIds = (ids) =>
  [...new Set((ids || []).map(Number).filter((n) => Number.isFinite(n) && n > 0))];

/**
 * Older saves kept raw "levels played / total wins" counters that ticked on every
 * remount, so the profile could never agree with the per-level records. The played
 * set replaces them: a level counts once, ever.
 */
const migrateStatistics = (saved, completedLevels) => ({
  totalMoves: saved.totalMoves || 0,
  totalHintsUsed: saved.totalHintsUsed || 0,
  totalUndos: saved.totalUndos || 0,
  levelsStarted: Object.fromEntries(
    DIFFS.map((key) => [key, uniqueIds(saved.levelsStarted?.[key] ?? completedLevels?.[key])])
  ),
});

const loadSavedData = () => {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    const completedLevels = { ...DEFAULT_STATE.completedLevels, ...(parsed.completedLevels || {}) };
    return {
      ...DEFAULT_STATE,
      ...parsed,
      unlockedLevels: { ...DEFAULT_STATE.unlockedLevels, ...(parsed.unlockedLevels || {}) },
      completedLevels,
      levelStars: { ...DEFAULT_STATE.levelStars, ...(parsed.levelStars || {}) },
      bestMoves: { ...DEFAULT_STATE.bestMoves, ...(parsed.bestMoves || {}) },
      statistics: migrateStatistics(parsed.statistics || {}, completedLevels),
      dailyChallenges: { ...DEFAULT_STATE.dailyChallenges, ...(parsed.dailyChallenges || {}) },
      dailyRewards: { ...DEFAULT_STATE.dailyRewards, ...(parsed.dailyRewards || {}) },
      streak: { ...DEFAULT_STATE.streak, ...(parsed.streak || {}) },
      achievements: { ...DEFAULT_STATE.achievements, ...(parsed.achievements || {}) },
      containerType: (parsed.currentBottle && parsed.currentBottle !== 'default') ? (parsed.containerType || 'tube') : 'tube',
    };
  } catch (err) {
    console.warn('Failed to parse localStorage data, safely restoring default state:', err);
    return DEFAULT_STATE;
  }
};

const PlayerContext = createContext(null);

export const PlayerProvider = ({ children }) => {
  const [data, setData] = useState(loadSavedData);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [data]);

  // Ambient music controller
  useEffect(() => {
    updateAmbientMusic(data.musicEnabled);
  }, [data.musicEnabled]);

  // Check and process daily challenge reset and streak
  useEffect(() => {
    const today = getLocalDateString();
    setData(prev => {
      let next = { ...prev };
      let updated = false;

      if (prev.dailyChallenges.lastDate !== today) {
        // Date changed! Reset daily challenges
        next.dailyChallenges = {
          lastDate: today,
          levelsCompletedToday: 0,
          movesUnder15Achieved: false,
          completedLevel5Today: false,
          adWatchedToday: false,
          claimed: {},
        };
        updated = true;
      }

      // Check streak status
      if (prev.streak.lastActiveDate !== today) {
        // Check if yesterday was last active date
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yYear = yesterdayDate.getFullYear();
        const yMonth = String(yesterdayDate.getMonth() + 1).padStart(2, '0');
        const yDay = String(yesterdayDate.getDate()).padStart(2, '0');
        const yesterdayStr = `${yYear}-${yMonth}-${yDay}`;

        let currentStreak = prev.streak.currentStreak;
        if (prev.streak.lastActiveDate && prev.streak.lastActiveDate !== yesterdayStr) {
          // Missed more than 1 day: reset streak to 0
          currentStreak = 0;
          next.streak = {
            ...prev.streak,
            currentStreak: 0,
          };
          updated = true;
        }
      }

      return updated ? next : prev;
    });
  }, []);

  const addCoins = useCallback((amount) => {
    setData(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
  }, []);

  const spendCoins = useCallback((amount) => {
    setData(prev => ({
      ...prev,
      coins: Math.max(0, prev.coins - amount)
    }));
  }, []);

  const recordLevelStart = useCallback((difficulty, levelId) => {
    const diffKey = difficulty === 'hard' ? 'hard' : 'normal';
    const numId = parseInt(levelId, 10);
    if (!Number.isFinite(numId)) return;
    setData(prev => {
      const cur = prev.statistics.levelsStarted?.[diffKey] || [];
      if (cur.includes(numId)) return prev;
      return {
        ...prev,
        statistics: {
          ...prev.statistics,
          levelsStarted: { ...prev.statistics.levelsStarted, [diffKey]: [...cur, numId] },
        },
      };
    });
  }, []);

  const recordMove = useCallback(() => {
    setData(prev => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        totalMoves: prev.statistics.totalMoves + 1
      }
    }));
  }, []);

  const recordUndo = useCallback(() => {
    setData(prev => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        totalUndos: prev.statistics.totalUndos + 1
      }
    }));
  }, []);

  const useHint = useCallback(() => {
    let success = false;
    setData(prev => {
      if (prev.hintCount <= 0) return prev;
      success = true;
      return {
        ...prev,
        hintCount: prev.hintCount - 1,
        statistics: {
          ...prev.statistics,
          totalHintsUsed: prev.statistics.totalHintsUsed + 1
        }
      };
    });
    return success;
  }, []);

  const completeLevel = useCallback(({ difficulty = 'normal', levelId, moves, stars }) => {
    const numId = parseInt(levelId, 10);
    const nextId = numId + 1;
    const today = getLocalDateString();

    setData(prev => {
      const diffKey = difficulty === 'hard' ? 'hard' : 'normal';

      // 1. Unlocked levels
      const curUnlocked = prev.unlockedLevels[diffKey] || [1];
      const nextUnlocked = curUnlocked.includes(nextId) ? curUnlocked : [...curUnlocked, nextId];

      // 2. Completed levels
      const curCompleted = prev.completedLevels[diffKey] || [];
      const nextCompleted = curCompleted.includes(numId) ? curCompleted : [...curCompleted, numId];

      // 3. Stars (store best)
      const prevStars = prev.levelStars[diffKey]?.[numId] || 0;
      const bestStars = Math.max(prevStars, stars);
      const nextStarsObj = {
        ...prev.levelStars[diffKey],
        [numId]: bestStars
      };

      // 4. Best moves
      const prevBestMoves = prev.bestMoves[diffKey]?.[numId];
      const nextBestMoves = prevBestMoves ? Math.min(prevBestMoves, moves) : moves;
      const nextBestMovesObj = {
        ...prev.bestMoves[diffKey],
        [numId]: nextBestMoves
      };

      // 5. Total completed count across difficulties
      const totalCompletedCount = (nextCompleted.length) + (prev.completedLevels[diffKey === 'normal' ? 'hard' : 'normal']?.length || 0);

      // 6. Streak update
      let curStreak = prev.streak.currentStreak;
      let bestStr = prev.streak.bestStreak;
      if (prev.streak.lastActiveDate !== today) {
        curStreak += 1;
        bestStr = Math.max(bestStr, curStreak);
      }

      // 7. Achievements check
      const nextAchievements = {
        ...prev.achievements,
        firstWin: true,
        tenLevels: prev.achievements.tenLevels || totalCompletedCount >= 10,
        fiftyLevels: prev.achievements.fiftyLevels || totalCompletedCount >= 50,
        hundredLevels: prev.achievements.hundredLevels || totalCompletedCount >= 100,
        perfectSort: prev.achievements.perfectSort || stars === 3,
        twentyStreak: prev.achievements.twentyStreak || bestStr >= 20,
      };

      // 8. Daily challenge progress
      const dailyLevels = prev.dailyChallenges.lastDate === today 
        ? prev.dailyChallenges.levelsCompletedToday + 1 
        : 1;
      const movesUnder15 = prev.dailyChallenges.movesUnder15Achieved || (moves < 15);
      const completedLvl5 = prev.dailyChallenges.completedLevel5Today || (numId === 5);

      const nextDaily = {
        ...prev.dailyChallenges,
        lastDate: today,
        levelsCompletedToday: dailyLevels,
        movesUnder15Achieved: movesUnder15,
        completedLevel5Today: completedLvl5,
      };

      // 9. A won level has by definition been played.
      const curStarted = prev.statistics.levelsStarted?.[diffKey] || [];
      const nextStarted = curStarted.includes(numId) ? curStarted : [...curStarted, numId];

      return {
        ...prev,
        coins: prev.coins + 50,
        unlockedLevels: {
          ...prev.unlockedLevels,
          [diffKey]: nextUnlocked
        },
        completedLevels: {
          ...prev.completedLevels,
          [diffKey]: nextCompleted
        },
        levelStars: {
          ...prev.levelStars,
          [diffKey]: nextStarsObj
        },
        bestMoves: {
          ...prev.bestMoves,
          [diffKey]: nextBestMovesObj
        },
        statistics: {
          ...prev.statistics,
          levelsStarted: {
            ...prev.statistics.levelsStarted,
            [diffKey]: nextStarted,
          },
        },
        dailyChallenges: nextDaily,
        streak: {
          currentStreak: curStreak,
          bestStreak: bestStr,
          lastActiveDate: today,
        },
        achievements: nextAchievements,
      };
    });
  }, []);

  const buyTheme = useCallback((themeId, price) => {
    setData(prev => {
      if (prev.coins < price) return prev;
      return {
        ...prev,
        coins: prev.coins - price,
        ownedThemes: prev.ownedThemes.includes(themeId) ? prev.ownedThemes : [...prev.ownedThemes, themeId],
        currentTheme: themeId,
      };
    });
  }, []);

  const equipTheme = useCallback((themeId) => {
    setData(prev => ({
      ...prev,
      currentTheme: themeId
    }));
  }, []);

  const buyBottle = useCallback((bottleSkin, price) => {
    setData(prev => {
      if (prev.coins < price) return prev;
      const skinKey = bottleSkin.toLowerCase();
      const nextOwned = prev.ownedBottles.some(b => b.toLowerCase() === skinKey)
        ? prev.ownedBottles
        : [...prev.ownedBottles, skinKey];
      return {
        ...prev,
        coins: prev.coins - price,
        ownedBottles: nextOwned,
        currentBottle: skinKey,
        containerType: 'bottle',
      };
    });
  }, []);

  const equipBottle = useCallback((bottleSkin) => {
    setData(prev => ({
      ...prev,
      currentBottle: bottleSkin.toLowerCase(),
      containerType: 'bottle',
    }));
  }, []);

  const buyTube = useCallback((tubeStyle, price) => {
    setData(prev => {
      if (prev.coins < price) return prev;
      const styleKey = tubeStyle.toLowerCase();
      const nextOwned = prev.ownedTubes.some(t => t.toLowerCase() === styleKey)
        ? prev.ownedTubes
        : [...prev.ownedTubes, styleKey];
      return {
        ...prev,
        coins: prev.coins - price,
        ownedTubes: nextOwned,
        currentTube: styleKey,
        containerType: 'tube',
      };
    });
  }, []);

  const equipTube = useCallback((tubeStyle) => {
    setData(prev => ({
      ...prev,
      currentTube: tubeStyle.toLowerCase(),
      containerType: 'tube',
    }));
  }, []);

  const setContainerType = useCallback((type) => {
    setData(prev => ({
      ...prev,
      containerType: type === 'bottle' ? 'bottle' : 'tube',
    }));
  }, []);

  const claimDailyReward = useCallback((challengeId, rewardAmount) => {
    setData(prev => {
      if (prev.dailyChallenges.claimed?.[challengeId]) return prev;
      return {
        ...prev,
        coins: prev.coins + rewardAmount,
        dailyChallenges: {
          ...prev.dailyChallenges,
          claimed: {
            ...prev.dailyChallenges.claimed,
            [challengeId]: true,
          }
        }
      };
    });
  }, []);

  const claimDailyLoginReward = useCallback(() => {
    const today = getLocalDateString();
    setData(prev => {
      if (prev.dailyRewards.lastClaimDate === today) return prev;
      const stored = prev.dailyRewards.claimedDays || [];
      const claimedDays = stored.length === 7 ? [] : stored;
      const day = claimedDays.length + 1;

      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayStr = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth() + 1).padStart(2, '0')}-${String(yesterdayDate.getDate()).padStart(2, '0')}`;
      const curStreak = prev.streak.lastActiveDate === today
        ? prev.streak.currentStreak
        : (prev.streak.lastActiveDate === yesterdayStr ? prev.streak.currentStreak + 1 : 1);

      const next = {
        ...prev,
        dailyRewards: {
          claimedDays: [...claimedDays, day],
          lastClaimDate: today,
        },
        streak: {
          currentStreak: curStreak,
          bestStreak: Math.max(prev.streak.bestStreak, curStreak),
          lastActiveDate: today,
        },
      };
      if (day === 1) next.coins = prev.coins + 50;
      if (day === 2) next.boosters = (prev.boosters || 0) + 1;
      if (day === 3) next.hintCount = prev.hintCount + 1;
      if (day === 4) next.coins = prev.coins + 75;
      if (day === 5) next.undos = (prev.undos || 0) + 1;
      if (day === 6) next.coins = prev.coins + 100;
      if (day === 7) next.chests = (prev.chests || 0) + 1;
      return next;
    });
  }, []);

  const watchAdDaily = useCallback(() => {
    setData(prev => ({
      ...prev,
      coins: prev.coins + 50,
      dailyChallenges: {
        ...prev.dailyChallenges,
        adWatchedToday: true,
      }
    }));
  }, []);

  const setDifficulty = useCallback((diff) => {
    setData(prev => ({
      ...prev,
      currentDifficulty: diff === 'hard' ? 'hard' : 'normal'
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setData(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  }, []);

  const toggleMusic = useCallback(() => {
    setData(prev => ({
      ...prev,
      musicEnabled: !prev.musicEnabled
    }));
  }, []);

  const toggleVibration = useCallback(() => {
    setData(prev => {
      const nextVal = !prev.vibrationEnabled;
      if (nextVal) triggerHaptic(true, 40);
      return {
        ...prev,
        vibrationEnabled: nextVal
      };
    });
  }, []);

  /**
   * Every profile number derives from the per-level records, so the screen cannot
   * disagree with itself the way the old additive counters did.
   */
  const stats = useMemo(() => {
    const completed = {
      normal: new Set(uniqueIds(data.completedLevels.normal)),
      hard: new Set(uniqueIds(data.completedLevels.hard)),
    };
    const played = {
      normal: new Set(uniqueIds(data.statistics.levelsStarted?.normal)),
      hard: new Set(uniqueIds(data.statistics.levelsStarted?.hard)),
    };
    completed.normal.forEach((id) => played.normal.add(id));
    completed.hard.forEach((id) => played.hard.add(id));

    const levelsCompleted = completed.normal.size + completed.hard.size;
    const levelsPlayed = played.normal.size + played.hard.size;
    const unlockedIds = uniqueIds([
      ...(data.unlockedLevels.normal || []),
      ...(data.unlockedLevels.hard || []),
    ]);
    const starTotals = DIFFS.flatMap((key) => Object.values(data.levelStars[key] || {}).map((n) => Number(n) || 0));

    return {
      levelsCompleted,
      levelsPlayed,
      highestLevel: unlockedIds.length ? Math.max(...unlockedIds) : 1,
      starsEarned: starTotals.reduce((sum, n) => sum + n, 0),
      perfectLevels: starTotals.filter((n) => n === 3).length,
      winRate: levelsPlayed > 0 ? Math.round((levelsCompleted / levelsPlayed) * 100) : 0,
      totalMoves: data.statistics.totalMoves || 0,
      totalHintsUsed: data.statistics.totalHintsUsed || 0,
      totalUndos: data.statistics.totalUndos || 0,
    };
  }, [data.completedLevels, data.levelStars, data.statistics, data.unlockedLevels]);

  return (
    <PlayerContext.Provider
      value={{
        ...data,
        stats,
        addCoins,
        spendCoins,
        recordLevelStart,
        recordMove,
        recordUndo,
        useHint,
        completeLevel,
        buyTheme,
        equipTheme,
        buyBottle,
        equipBottle,
        buyTube,
        equipTube,
        setContainerType,
        claimDailyReward,
        claimDailyLoginReward,
        watchAdDaily,
        setDifficulty,
        toggleSound,
        toggleMusic,
        toggleVibration,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
