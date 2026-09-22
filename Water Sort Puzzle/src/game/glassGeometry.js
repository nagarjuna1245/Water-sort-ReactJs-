/**
 * Shared glass geometry for every container skin and tube style.
 *
 * Paths are authored in the 64 x 144 design space (the same space the SVG
 * renderers use for the shop previews), so a canvas can scale them to any tube
 * size. `rim` is the mouth opening: its lower corner is the pivot the whole
 * tube rotates around while pouring, which keeps the lip pinned over the
 * destination.
 */

export const VIEW_W = 64;
export const VIEW_H = 144;

export const BOTTLE_GLASS = {
  ocean: {
    d: "M18 14 C18 10, 20 6, 26 6 L38 6 C44 6, 46 10, 46 14 L46 28 C46 36, 56 46, 56 60 L56 122 C56 132, 48 138, 32 138 C16 138, 8 132, 8 122 L8 60 C8 46, 18 36, 18 28 Z",
    rim: { x: 21, y: 3, w: 22, h: 5 },
    accent: '#38BDF8',
    fillTop: 42,
  },
  pastel: {
    d: "M20 16 L20 28 C20 40, 6 54, 6 82 C6 118, 16 138, 32 138 C48 138, 58 118, 58 82 C58 54, 44 40, 44 28 L44 16 Z",
    rim: { x: 18, y: 7, w: 28, h: 6 },
    accent: '#F472B6',
    fillTop: 36,
  },
  galaxy: {
    d: "M22 14 L22 26 L10 44 L10 126 L16 138 L48 138 L54 126 L54 44 L42 26 L42 14 Z",
    rim: { x: 19, y: 4, w: 26, h: 6 },
    accent: '#8B5CF6',
    fillTop: 40,
  },
  leaf: {
    d: "M22 12 L22 26 C16 38, 10 58, 10 90 C10 124, 18 138, 32 138 C46 138, 54 124, 54 90 C54 58, 48 38, 42 26 L42 12 Z",
    rim: { x: 20, y: 4, w: 24, h: 5 },
    accent: '#10B981',
    fillTop: 38,
  },
  cherry: {
    d: "M24 12 L24 28 C14 36, 6 56, 6 84 C6 118, 18 138, 32 138 C46 138, 58 118, 58 84 C58 56, 50 36, 40 28 L40 12 Z",
    rim: { x: 22, y: 4, w: 20, h: 6 },
    accent: '#EC4899',
    fillTop: 36,
  },
  hourglass: {
    d: "M16 14 L22 26 C22 42, 14 56, 20 76 C24 88, 20 98, 14 116 C10 128, 16 138, 32 138 C48 138, 54 128, 50 116 C44 98, 40 88, 44 76 C50 56, 42 42, 42 26 L48 14 Z",
    rim: { x: 14, y: 5, w: 36, h: 6 },
    accent: '#F59E0B',
    fillTop: 36,
  },
  conical: {
    d: "M24 12 L24 38 L10 126 C8 134, 16 138, 32 138 C48 138, 56 134, 54 126 L40 38 L40 12 Z",
    rim: { x: 22, y: 4, w: 20, h: 6 },
    accent: '#06B6D4',
    fillTop: 42,
  },
  square: {
    d: "M20 14 L20 24 L10 28 L10 132 C10 136, 14 138, 20 138 L44 138 C50 138, 54 136, 54 132 L54 28 L44 24 L44 14 Z",
    rim: { x: 18, y: 5, w: 28, h: 6 },
    accent: '#64748B',
    fillTop: 34,
  },
  default: {
    d: "M22 14 L22 26 C14 34, 10 44, 10 56 L10 124 C10 134, 18 138, 32 138 C46 138, 54 134, 54 124 L54 56 C54 44, 50 34, 42 26 L42 14 Z",
    rim: { x: 20, y: 5, w: 24, h: 6 },
    accent: '#94A3B8',
    fillTop: 38,
  },
};

export const TUBE_GLASS = {
  rounded: {
    d: "M10 14 C10 8, 14 6, 24 6 L40 6 C50 6, 54 8, 54 14 L54 122 C54 133, 43 140, 32 140 C21 140, 10 133, 10 122 Z",
    rim: { x: 7, y: 3, w: 50, h: 5 },
    accent: '#8B5CF6',
    fillTop: 18,
  },
  crystal: {
    d: "M10 12 L54 12 L54 124 L44 140 L20 140 L10 124 Z",
    rim: { x: 6, y: 5, w: 52, h: 6 },
    accent: '#06B6D4',
    fillTop: 16,
  },
  rainbow: {
    d: "M10 12 L54 12 L54 118 C54 130, 44 140, 32 140 C20 140, 10 130, 10 118 Z",
    rim: { x: 7, y: 4, w: 50, h: 6 },
    accent: '#EC4899',
    fillTop: 16,
  },
  bubble: {
    d: "M12 12 L52 12 L52 38 C55 42, 55 54, 52 58 C55 64, 55 78, 52 84 C55 90, 55 106, 52 112 C52 126, 43 140, 32 140 C21 140, 12 126, 12 112 C9 106, 9 90, 12 84 C9 78, 9 64, 12 58 C9 54, 9 42, 12 38 Z",
    rim: { x: 8, y: 5, w: 48, h: 5 },
    accent: '#F97316',
    fillTop: 16,
  },
  tall: {
    d: "M14 10 L50 10 L50 122 C50 132, 42 140, 32 140 C22 140, 14 132, 14 122 Z",
    rim: { x: 10, y: 4, w: 44, h: 5 },
    accent: '#635BFF',
    fillTop: 14,
  },
  beaker: {
    d: "M8 12 L56 12 L52 24 L52 120 C52 132, 43 140, 32 140 C21 140, 12 132, 12 120 L12 24 Z",
    rim: { x: 6, y: 4, w: 52, h: 6 },
    accent: '#10B981',
    fillTop: 20,
  },
  default: {
    d: "M11 12 L53 12 L53 118 C53 130, 44 140, 32 140 C20 140, 11 130, 11 118 Z",
    rim: { x: 7, y: 4, w: 50, h: 6 },
    accent: '#94A3B8',
    fillTop: 16,
  },
};

const BOTTLE_ALIAS = { square_bottle: 'square' };

const TUBE_ALIAS = { beaker_tube: 'beaker' };

const f1 = (n) => Math.round(n * 10) / 10;

/**
 * Build a symmetric glass silhouette from a profile spec:
 * profile: [[y, halfWidth], ...] top (neck/lip) to bottom (base shoulder),
 * base: 'round' | 'flat' | 'point' | 'bulb', smooth:false gives faceted edges.
 * Used once at module load to give every catalog skin its own unique shape.
 */
const profileGlass = ({ profile, base = 'round', smooth = true, fillTop, accent, rimOver, rimH = 5, rimLift = 8 }) => {
  const cx = 32;
  const L = profile.map(([y, hw]) => ({ x: cx - hw, y }));
  const R = profile.map(([y, hw]) => ({ x: cx + hw, y }));
  const walk = (pts) => {
    let s = '';
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      if (smooth) {
        const k = (b.y - a.y) * 0.55;
        s += ` C ${f1(a.x)} ${f1(a.y + k)}, ${f1(b.x)} ${f1(b.y - k)}, ${f1(b.x)} ${f1(b.y)}`;
      } else {
        s += ` L ${f1(b.x)} ${f1(b.y)}`;
      }
    }
    return s;
  };
  const bl = L[L.length - 1];
  const br = R[R.length - 1];
  const dBelow = Math.max(6, 140 - bl.y);
  let bottom = '';
  let tipY = bl.y;
  if (base === 'round') {
    bottom = ` C ${f1(bl.x)} ${f1(bl.y + dBelow)}, ${f1(br.x)} ${f1(br.y + dBelow)}, ${f1(br.x)} ${f1(br.y)}`;
    tipY = bl.y + dBelow * 0.75;
  } else if (base === 'bulb') {
    bottom = ` C ${f1(bl.x - 5)} ${f1(bl.y + dBelow)}, ${f1(br.x + 5)} ${f1(br.y + dBelow)}, ${f1(br.x)} ${f1(br.y)}`;
    tipY = bl.y + dBelow * 0.75;
  } else if (base === 'point') {
    tipY = Math.min(140, bl.y + dBelow + 6);
    bottom = ` L ${cx} ${f1(tipY)} L ${f1(br.x)} ${f1(br.y)}`;
  } else {
    bottom = ` L ${f1(br.x)} ${f1(br.y)}`;
  }
  const d = `M ${f1(L[0].x)} ${f1(L[0].y)}${walk(L)}${bottom}${walk(R.slice().reverse())} Z`;
  const hw0 = profile[0][1];
  const over = rimOver ?? (profile[0][0] <= 20 ? 2.5 : 4);
  return {
    d,
    rim: { x: f1(cx - hw0 - over), y: f1(profile[0][0] - rimLift), w: f1(2 * (hw0 + over)), h: rimH },
    accent,
    fillTop,
    fillBottom: Math.max(fillTop + 10, Math.round(tipY) - 3),
  };
};

/* One unique silhouette per remaining bottle skin (the 9 hand-authored
   BOTTLE_GLASS shapes above stay untouched). */
const BOTTLE_SHAPES = {
  crystal_bottle: { profile: [[16, 9], [26, 9], [40, 22], [80, 24], [118, 16], [130, 10]], base: 'point', smooth: false, fillTop: 40, accent: '#38BDF8' },
  vintage_bottle: { profile: [[14, 8], [30, 8], [38, 17], [126, 17]], fillTop: 38, accent: '#F59E0B' },
  fluted: { profile: [[14, 9], [28, 9], [40, 20], [60, 23], [80, 21], [100, 23], [120, 19], [130, 14]], fillTop: 40, accent: '#10B981' },
  bell_bottle: { profile: [[12, 7], [24, 7], [44, 12], [70, 20], [100, 25], [128, 26]], base: 'flat', fillTop: 44, accent: '#F43F5E' },
  hexagonal: { profile: [[16, 10], [28, 10], [44, 24], [104, 24], [122, 14]], base: 'flat', smooth: false, fillTop: 44, accent: '#635BFF' },
  droplet_bottle: { profile: [[14, 7], [26, 8], [48, 16], [80, 24], [112, 22], [132, 12]], fillTop: 48, accent: '#06B6D4' },
  alembic: { profile: [[10, 6], [22, 6], [30, 10], [40, 16], [60, 22], [90, 24], [120, 18], [134, 10]], fillTop: 40, accent: '#EA580C' },
  flagon: { profile: [[14, 9], [26, 9], [36, 20], [60, 25], [100, 25], [128, 20]], fillTop: 36, accent: '#B45309' },
  spiral_bottle: { profile: [[14, 8], [26, 8], [38, 18], [52, 22], [66, 18], [80, 22], [94, 18], [108, 22], [122, 18], [132, 12]], fillTop: 38, accent: '#2563EB' },
  heart_bottle: { profile: [[16, 9], [28, 10], [40, 20], [56, 25], [84, 24], [112, 16], [130, 6]], base: 'point', fillTop: 40, accent: '#E11D48' },
  star_bottle: { profile: [[14, 8], [26, 9], [36, 18], [48, 24], [64, 20], [80, 24], [96, 20], [112, 23], [126, 14]], fillTop: 36, accent: '#F59E0B' },
  gourd: { profile: [[12, 7], [24, 7], [36, 14], [50, 17], [64, 11], [80, 17], [100, 20], [122, 16], [134, 8]], fillTop: 36, accent: '#059669' },
  barrel_bottle: { profile: [[14, 10], [24, 10], [34, 16], [52, 21], [80, 22], [108, 21], [126, 15]], base: 'flat', fillTop: 34, accent: '#9A3412' },
  tall_neck: { profile: [[8, 6], [46, 6], [58, 14], [76, 20], [106, 20], [128, 14]], fillTop: 58, accent: '#4338CA' },
  bulb_bottle: { profile: [[12, 6], [26, 6], [36, 10], [46, 20], [64, 25], [96, 24], [120, 16], [134, 6]], fillTop: 46, accent: '#D97706' },
  amphora: { profile: [[12, 12], [22, 12], [30, 8], [40, 14], [60, 20], [92, 19], [116, 12], [132, 4]], base: 'point', fillTop: 40, accent: '#BE185D' },
  flask_slim: { profile: [[16, 10], [26, 12], [40, 16], [80, 17], [120, 15], [134, 11]], fillTop: 40, accent: '#334155' },
  volumetric: { profile: [[12, 9], [24, 9], [32, 16], [126, 16]], base: 'flat', fillTop: 32, accent: '#0891B2' },
  chalice: { profile: [[14, 16], [30, 16], [46, 9], [58, 6], [108, 6], [120, 12], [130, 16]], base: 'flat', fillTop: 46, accent: '#B45309' },
  canteen: { profile: [[14, 9], [26, 9], [36, 18], [52, 23], [84, 23], [108, 20], [128, 12]], fillTop: 36, accent: '#15803D' },
  tulip_bottle: { profile: [[12, 13], [20, 10], [30, 8], [44, 14], [66, 20], [96, 19], [122, 13], [134, 7]], base: 'point', fillTop: 44, accent: '#C026D3' },
  crystal_skull: { profile: [[14, 10], [24, 12], [38, 20], [60, 22], [84, 20], [104, 16], [122, 14], [132, 10]], base: 'flat', smooth: false, fillTop: 38, accent: '#4F46E5' },
  prism_flask: { profile: [[14, 6], [26, 6], [124, 24]], base: 'flat', smooth: false, fillTop: 40, accent: '#DC2626' },
  potion_heart: { profile: [[14, 9], [24, 12], [38, 20], [60, 24], [90, 24], [114, 18], [130, 10]], base: 'flat', fillTop: 38, accent: '#BE123C' },
  bamboo_bottle: { profile: [[12, 10], [22, 10], [24, 13], [46, 13], [48, 10], [70, 10], [72, 13], [94, 13], [96, 10], [118, 10], [120, 13], [132, 13]], smooth: false, fillTop: 24, accent: '#15803D' },
  pyramid_bottle: { profile: [[18, 6], [30, 8], [128, 25]], base: 'flat', smooth: false, fillTop: 40, accent: '#CA8A04' },
  nebula_bottle: { profile: [[12, 6], [24, 6], [34, 14], [52, 22], [80, 24], [108, 20], [128, 10]], fillTop: 34, accent: '#6B21A8' },
  ice_flask: { profile: [[14, 12], [26, 10], [40, 18], [64, 20], [92, 16], [116, 20], [130, 14]], base: 'flat', smooth: false, fillTop: 40, accent: '#0369A1' },
  phoenix_bottle: { profile: [[12, 8], [22, 8], [34, 16], [48, 24], [64, 20], [80, 24], [100, 22], [122, 14], [134, 6]], base: 'point', fillTop: 34, accent: '#B91C1C' },
  dragon_bottle: { profile: [[12, 9], [24, 9], [34, 16], [46, 20], [58, 16], [70, 20], [82, 16], [94, 20], [106, 17], [120, 14], [132, 8]], fillTop: 34, accent: '#047857' },
  infinity_bottle: { profile: [[10, 7], [20, 7], [32, 14], [44, 20], [56, 14], [70, 20], [92, 24], [116, 18], [132, 10]], fillTop: 44, accent: '#635BFF' },
};

/* One unique silhouette per remaining tube style (the 7 hand-authored
   TUBE_GLASS shapes above stay untouched). */
const TUBE_SHAPES = {
  conical_tube: { profile: [[12, 18], [100, 10]], base: 'point', fillTop: 16, accent: '#10B981', rimOver: 4 },
  spiral_tube: { profile: [[12, 16], [28, 19], [44, 15], [60, 19], [76, 15], [92, 19], [108, 16], [120, 12]], fillTop: 16, accent: '#7C3AED', rimOver: 4 },
  frosted_tube: { profile: [[12, 20], [118, 20]], fillTop: 16, accent: '#818CF8', rimOver: 4 },
  neon_tube: { profile: [[12, 12], [96, 12], [108, 18], [122, 16]], base: 'bulb', fillTop: 16, accent: '#EC4899', rimOver: 4 },
  double_tube: { profile: [[12, 12], [30, 18], [52, 20], [66, 12], [80, 20], [104, 22], [122, 14]], fillTop: 16, accent: '#F43F5E', rimOver: 4 },
  steampunk_tube: { profile: [[12, 15], [30, 15], [34, 19], [58, 19], [62, 15], [86, 15], [90, 19], [114, 19], [118, 15]], fillTop: 16, accent: '#B45309', rimOver: 4 },
  prism_tube: { profile: [[12, 14], [22, 19], [112, 19], [122, 14]], base: 'flat', smooth: false, fillTop: 16, accent: '#06B6D4', rimOver: 4 },
  quantum_tube: { profile: [[12, 10], [26, 18], [50, 21], [86, 21], [110, 16], [124, 8]], fillTop: 16, accent: '#22D3EE', rimOver: 4 },
  bamboo_tube: { profile: [[12, 14], [40, 14], [42, 17], [70, 17], [72, 14], [100, 14], [102, 17], [124, 17]], smooth: false, fillTop: 16, accent: '#16A34A', rimOver: 4 },
  vulcan_tube: { profile: [[12, 22], [28, 15], [108, 13], [124, 8]], base: 'point', fillTop: 16, accent: '#DC2626', rimOver: 4 },
  glacier_tube: { profile: [[12, 19], [90, 14]], base: 'point', fillTop: 16, accent: '#38BDF8', rimOver: 4 },
  emerald_tube: { profile: [[12, 16], [24, 20], [72, 21], [110, 18], [124, 12]], base: 'point', smooth: false, fillTop: 16, accent: '#059669', rimOver: 4 },
  gold_rim_tube: { profile: [[12, 19], [112, 19]], fillTop: 16, accent: '#EAB308', rimOver: 4 },
  plasma_tube: { profile: [[12, 12], [24, 20], [48, 21], [96, 14], [120, 8]], base: 'point', fillTop: 16, accent: '#9333EA', rimOver: 4 },
  bio_tube: { profile: [[10, 9], [20, 9], [32, 17], [108, 17], [122, 12]], fillTop: 32, accent: '#84CC16', rimOver: 4 },
  cyber_tube: { profile: [[12, 16], [124, 16]], base: 'flat', smooth: false, fillTop: 16, accent: '#06B6D4', rimOver: 4 },
  ruby_tube: { profile: [[12, 8], [24, 14], [52, 19], [92, 19], [116, 12], [128, 6]], base: 'point', fillTop: 24, accent: '#BE123C', rimOver: 4 },
  cosmic_tube: { profile: [[12, 13], [30, 13], [44, 21], [70, 23], [96, 21], [110, 13], [124, 13]], fillTop: 16, accent: '#4C1D95', rimOver: 4 },
  amber_tube: { profile: [[12, 20], [118, 13]], fillTop: 16, accent: '#92400E', rimOver: 4 },
  amethyst_tube: { profile: [[12, 18], [40, 16], [100, 12], [126, 6]], base: 'point', smooth: false, fillTop: 16, accent: '#7E22CE', rimOver: 4 },
  solar_tube: { profile: [[12, 21], [28, 14], [104, 14], [122, 20]], fillTop: 16, accent: '#C2410C', rimOver: 4 },
  aquarium_tube: { profile: [[12, 22], [100, 22], [108, 18], [120, 18]], fillTop: 16, accent: '#0E7490', rimOver: 4 },
  abyss_tube: { profile: [[12, 21], [80, 16], [118, 8]], base: 'point', fillTop: 16, accent: '#312E81', rimOver: 4 },
  alchemy_tube: { profile: [[12, 11], [36, 11], [52, 19], [84, 19], [100, 11], [124, 11]], fillTop: 16, accent: '#CA8A04', rimOver: 4 },
  storm_tube: { profile: [[12, 17], [36, 19], [60, 15], [84, 19], [108, 15], [124, 17]], fillTop: 16, accent: '#1D4ED8', rimOver: 4 },
  lotus_tube: { profile: [[12, 23], [26, 17], [70, 15], [112, 10], [126, 6]], base: 'point', fillTop: 16, accent: '#9D174D', rimOver: 4 },
  copper_tube: { profile: [[12, 16], [40, 16], [44, 19], [56, 19], [60, 16], [96, 16], [100, 19], [112, 19], [116, 16], [126, 16]], fillTop: 16, accent: '#0F766E', rimOver: 4 },
  titanium_tube: { profile: [[12, 15], [20, 19], [116, 19], [124, 15]], base: 'flat', smooth: false, fillTop: 16, accent: '#475569', rimOver: 4 },
  dark_matter_tube: { profile: [[12, 10], [112, 21]], fillTop: 16, accent: '#334155', rimOver: 4 },
  celestial_tube: { profile: [[12, 12], [84, 12], [98, 19], [118, 20], [128, 14]], fillTop: 16, accent: '#F59E0B', rimOver: 4 },
  supernova_tube: { profile: [[12, 20], [34, 13], [90, 13], [112, 21]], fillTop: 16, accent: '#DC2626', rimOver: 4 },
  time_tube: { profile: [[12, 14], [26, 18], [46, 14], [66, 18], [86, 14], [106, 18], [124, 15]], fillTop: 16, accent: '#6366F1', rimOver: 4 },
  infinity_tube: { profile: [[12, 11], [24, 11], [38, 18], [58, 20], [70, 14], [84, 20], [106, 21], [124, 14]], fillTop: 24, accent: '#635BFF', rimOver: 4 },
};

for (const [id, spec] of Object.entries(BOTTLE_SHAPES)) BOTTLE_GLASS[id] = profileGlass(spec);
for (const [id, spec] of Object.entries(TUBE_SHAPES)) TUBE_GLASS[id] = profileGlass(spec);

/**
 * Resolve the drawable glass for a container.
 * @param {'bottle'|'tube'} kind
 * @param {string} id skin (bottle) or styleType (tube) id
 */
export const getGlass = (kind, id) => {
  const key = String(id || 'default').toLowerCase();
  if (kind === 'tube') {
    return TUBE_GLASS[TUBE_ALIAS[key] || key] || TUBE_GLASS.default;
  }
  return BOTTLE_GLASS[BOTTLE_ALIAS[key] || key] || BOTTLE_GLASS.default;
};

/**
 * The mouth's lower corner on the side the tube leans toward — the point the
 * liquid exits from and the point the tube pivots around.
 * @param {number} dir +1 leaning right, -1 leaning left
 */
export const lipPoint = (glass, dir) => ({
  x: dir >= 0 ? glass.rim.x + glass.rim.w : glass.rim.x,
  y: glass.rim.y + glass.rim.h,
});
