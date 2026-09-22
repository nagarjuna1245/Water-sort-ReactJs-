/**
 * SINGLE SOURCE OF TRUTH FOR ALL WATER SORT COLORS
 * All game logic, rendering, and animations use this map.
 */

export const COLOR_MAP = {
  red: '#EF4444',
  blue: '#3B82F6',
  yellow: '#FACC15',
  green: '#22C55E',
  purple: '#8B5CF6',
  orange: '#F97316',
  pink: '#EC4899',
  cyan: '#06B6D4',
  emerald: '#10B981',
  amber: '#F59E0B',
  indigo: '#6366F1',
  rose: '#F43F5E',
  teal: '#14B8A6',
  lime: '#84CC16',
  violet: '#A855F7',
  sky: '#0EA5E9',
};

/**
 * Array of color IDs for level generation
 */
export const COLOR_IDS = Object.keys(COLOR_MAP);

/**
 * Get CSS color from color ID or hex code
 */
export const getColor = (colorId) => {
  if (!colorId) return '#94A3B8';
  if (typeof colorId === 'string') {
    // Direct CSS color (hex, rgb, hsl)
    if (colorId.startsWith('#') || colorId.startsWith('rgb') || colorId.startsWith('hsl')) {
      return colorId;
    }
    const lower = colorId.toLowerCase();
    if (COLOR_MAP[lower]) return COLOR_MAP[lower];
    if (COLOR_MAP[colorId]) return COLOR_MAP[colorId];
  }
  return '#94A3B8'; // fallback gray
};

/**
 * Validate color ID or hex color
 */
export const isValidColor = (colorId) => {
  if (!colorId || typeof colorId !== 'string') return false;
  if (colorId.startsWith('#') || colorId.startsWith('rgb') || colorId.startsWith('hsl')) return true;
  return COLOR_IDS.includes(colorId.toLowerCase()) || COLOR_IDS.includes(colorId);
};

/**
 * Validate bottle array
 */
export const validateBottle = (bottle) => {
  if (!Array.isArray(bottle)) return false;
  if (bottle.length > 4) return false;
  return bottle.every(colorId => isValidColor(colorId));
};
