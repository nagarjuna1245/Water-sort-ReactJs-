/**
 * WATER SORT PUZZLE — LEVEL GENERATOR & PROGRESSION
 * Integrates 100% verified solvable curated levels (1–50) with smooth
 * tube progression (Level 1 starts with 3 tubes: 2 colors + 1 empty tube),
 * scaling upwards with progressive difficulty, and infinite deterministic
 * procedural level generation for levels > 50.
 */

import { getLevelConfig as getVerifiedLevelConfig, LEVELS } from './levels';
import { COLOR_IDS } from './colors';

/**
 * Difficulty tier names based on level progression
 */
export const DIFFICULTIES = {
  BEGINNER: { min: 1, max: 5 },
  EASY: { min: 6, max: 15 },
  NORMAL: { min: 16, max: 30 },
  MEDIUM: { min: 31, max: 50 },
  HARD: { min: 51, max: 100 },
  VERY_HARD: { min: 101, max: 200 },
  EXPERT: { min: 201, max: 500 },
  MASTER: { min: 501, max: 1000 },
  INFINITE: { min: 1001, max: Infinity }
};

/**
 * Get difficulty tier name from level number
 */
export const getDifficulty = (levelNum) => {
  for (const [name, range] of Object.entries(DIFFICULTIES)) {
    if (levelNum >= range.min && levelNum <= range.max) {
      return name;
    }
  }
  return 'INFINITE';
};

/**
 * Generate a complete playable level configuration.
 * Levels 1–50 use verified, curated solvable puzzles.
 * Level 1: 3 tubes (2 colors + 1 empty) - ideal tutorial
 * Level 2: 4 tubes (3 colors + 1 empty)
 * Level 3: 5 tubes (3 colors + 2 empty)
 * Level 4–10: 6 tubes (4 colors + 2 empty)
 * Level 11–20: 7 tubes (5 colors + 2 empty)
 * Level 21–35: 8 tubes (6 colors + 2 empty)
 * Level 36–50: 9 tubes (7 colors + 2 empty)
 * Levels 51+: 9–14 tubes (procedurally generated with reverse-pour guarantee)
 */
export const generateLevel = (levelNum = 1, difficulty = 'normal') => {
  const num = Math.max(1, parseInt(levelNum, 10) || 1);
  const verified = getVerifiedLevelConfig(difficulty, num);

  // Deep clone containers so mutations during gameplay don't alter templates
  const tubes = JSON.parse(JSON.stringify(verified.containers || []));
  const filledTubes = tubes.filter(t => t.length > 0).length;
  const emptyTubes = tubes.filter(t => t.length === 0).length;
  const totalTubes = tubes.length;
  const colorCount = verified.colorCount || filledTubes;

  return {
    id: num,
    difficulty: verified.difficulty || difficulty,
    difficultyName: getDifficulty(num),
    colorCount,
    containers: tubes,
    totalTubes,
    filledTubes,
    emptyTubes,
    parMoves: verified.parMoves || Math.max(8, colorCount * 3),
    minMoves: verified.minMoves || Math.max(5, colorCount * 2),
    capacity: 4,
  };
};

/**
 * Get level config metadata for level
 */
export const getLevelConfig = (levelNum = 1, difficulty = 'normal') => {
  const level = generateLevel(levelNum, difficulty);
  return {
    level: level.id,
    difficulty: level.difficulty,
    difficultyName: level.difficultyName,
    colorCount: level.colorCount,
    filledTubes: level.filledTubes,
    emptyTubes: level.emptyTubes,
    totalTubes: level.totalTubes,
    capacity: 4,
    parMoves: level.parMoves,
    minMoves: level.minMoves,
  };
};

/**
 * Get level data helper
 */
export const getLevel = (levelNum, difficulty = 'normal') => {
  return generateLevel(levelNum, difficulty);
};

/**
 * Calculate star rating based on moves used vs par moves
 */
export const calculateStars = (movesUsed, parMoves) => {
  if (movesUsed <= parMoves * 0.75) return 3;
  if (movesUsed <= parMoves) return 2;
  return 1;
};
