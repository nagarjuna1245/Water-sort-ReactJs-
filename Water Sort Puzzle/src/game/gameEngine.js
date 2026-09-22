/**
 * Water Sort Puzzle — Core Game Engine
 * Pure functional game mechanics: move validation, liquid transfer, win checking, and hint generation.
 */

export const MAX_CAPACITY = 4;

/**
 * Checks if a move from source to target is valid according to Water Sort rules:
 * 1. Source is not empty.
 * 2. Destination is not full (< 4).
 * 3. Destination is empty OR top color of destination matches top color of source.
 */
export const canPour = (source, target) => {
  if (!source || source.length === 0) return false;
  if (!target || target.length >= MAX_CAPACITY) return false;
  if (target.length === 0) return true;
  return target[target.length - 1] === source[source.length - 1];
};

/**
 * Calculates how many consecutive units of the same top color can be poured from source to target.
 */
export const calcUnitsToPour = (source, target) => {
  if (!canPour(source, target)) return 0;

  const topColor = source[source.length - 1];
  let consecutive = 0;
  for (let i = source.length - 1; i >= 0; i--) {
    if (source[i] === topColor) consecutive++;
    else break;
  }

  const availableSpace = MAX_CAPACITY - target.length;
  return Math.min(consecutive, availableSpace);
};

/**
 * Immutably performs a pour move from fromIdx to toIdx on containers array.
 * Returns { nextContainers, transferUnits, color } or null if invalid.
 */
export const executePour = (containers, fromIdx, toIdx) => {
  if (fromIdx === toIdx) return null;
  const source = containers[fromIdx];
  const target = containers[toIdx];

  const units = calcUnitsToPour(source, target);
  if (units <= 0) return null;

  const color = source[source.length - 1];
  const nextContainers = containers.map(c => [...c]);

  for (let i = 0; i < units; i++) {
    const unit = nextContainers[fromIdx].pop();
    nextContainers[toIdx].push(unit);
  }

  return {
    nextContainers,
    transferUnits: units,
    color,
    fromIdx,
    toIdx,
  };
};

/**
 * Checks if a tube is completed: either completely empty,
 * OR has exactly MAX_CAPACITY units of the identical color.
 */
export const isTubeComplete = (tube) => {
  if (!tube || tube.length === 0) return true;
  if (tube.length !== MAX_CAPACITY) return false;
  const color = tube[0];
  return tube.every(c => c === color);
};

/**
 * Checks if the entire level is solved:
 * Every non-empty container contains only one color and is full (capacity 4). Empty containers are valid.
 */
export const checkPuzzleSolved = (containers) => {
  if (!containers || containers.length === 0) return false;
  for (const tube of containers) {
    if (!isTubeComplete(tube)) return false;
  }
  return true;
};

/**
 * Finds a recommended valid move from current state (Hint Engine).
 * Prioritizes:
 * 1. Completing a tube of single color.
 * 2. Combining matching colors into non-empty tubes.
 * 3. Pouring into an empty tube only if source is mixed.
 */
export const findHint = (containers) => {
  if (!containers || checkPuzzleSolved(containers)) return null;

  const validMoves = [];

  for (let i = 0; i < containers.length; i++) {
    const src = containers[i];
    if (src.length === 0) continue;
    // If tube is already fully sorted, don't move from it
    if (isTubeComplete(src)) continue;

    for (let j = 0; j < containers.length; j++) {
      if (i === j) continue;
      const tgt = containers[j];

      if (canPour(src, tgt)) {
        const units = calcUnitsToPour(src, tgt);
        const color = src[src.length - 1];
        
        // Quality heuristic:
        let score = 0;

        // Completes the target tube
        if (tgt.length + units === MAX_CAPACITY && (tgt.length === 0 || tgt.every(c => c === color))) {
          score += 50;
        }
        // Moving to already matching colors is preferred over pouring into empty
        if (tgt.length > 0) {
          score += 30;
        }
        // Pouring a mono-colored tube into an empty tube is pointless
        const isSrcMono = src.every(c => c === color);
        if (tgt.length === 0 && isSrcMono) {
          score -= 100; // useless move
        }

        // Emptying a tube so it becomes a free buffer
        if (src.length === units) {
          score += 20;
        }

        if (score > -50) {
          validMoves.push({ fromIdx: i, toIdx: j, score });
        }
      }
    }
  }

  if (validMoves.length === 0) {
    // If no scored moves, check if literally any valid move exists
    for (let i = 0; i < containers.length; i++) {
      if (containers[i].length === 0) continue;
      if (isTubeComplete(containers[i])) continue;
      for (let j = 0; j < containers.length; j++) {
        if (i !== j && canPour(containers[i], containers[j])) {
          return { fromIdx: i, toIdx: j };
        }
      }
    }
    return null;
  }

  validMoves.sort((a, b) => b.score - a.score);
  return { fromIdx: validMoves[0].fromIdx, toIdx: validMoves[0].toIdx };
};
