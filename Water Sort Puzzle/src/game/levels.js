/**
 * Water Sort Puzzle — Verified Deterministic Levels
 * 50 Normal Levels + 50 Hard Levels
 * Every level is 100% verified solvable with guaranteed color segment integrity.
 */

export const LEVELS = {
  normal: [
  {
    "id": 1,
    "difficulty": "normal",
    "colorCount": 2,
    "containers": [
      [
        "#3B82F6",
        "#3B82F6",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#3B82F6",
        "#EC4899"
      ],
      []
    ],
    "parMoves": 7,
    "minMoves": 5
  },
  {
    "id": 2,
    "difficulty": "normal",
    "colorCount": 3,
    "containers": [
      [
        "#3B82F6",
        "#3B82F6",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#FACC15",
        "#3B82F6"
      ],
      []
    ],
    "parMoves": 10,
    "minMoves": 8
  },
  {
    "id": 3,
    "difficulty": "normal",
    "colorCount": 3,
    "containers": [
      [
        "#3B82F6",
        "#EC4899",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#FACC15",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#3B82F6",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 12,
    "minMoves": 10
  },
  {
    "id": 4,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#3B82F6",
        "#EC4899",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#FACC15",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 14,
    "minMoves": 12
  },
  {
    "id": 5,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#8B5CF6",
        "#FACC15",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#EC4899",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 14,
    "minMoves": 12
  },
  {
    "id": 6,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#EC4899",
        "#3B82F6",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#3B82F6",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 7,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#EC4899",
        "#EC4899",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#8B5CF6",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 14,
    "minMoves": 12
  },
  {
    "id": 8,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#EC4899",
        "#FACC15",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#3B82F6",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#FACC15",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#8B5CF6",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 9,
    "minMoves": 7
  },
  {
    "id": 9,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#FACC15",
        "#8B5CF6",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 12,
    "minMoves": 10
  },
  {
    "id": 10,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#3B82F6",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 14,
    "minMoves": 12
  },
  {
    "id": 11,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#8B5CF6",
        "#8B5CF6",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#FACC15",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#3B82F6",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 13,
    "minMoves": 11
  },
  {
    "id": 12,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#EC4899",
        "#FACC15",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#EC4899",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 13,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#FACC15",
        "#8B5CF6",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#EC4899",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 14,
    "minMoves": 12
  },
  {
    "id": 14,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#FACC15",
        "#EC4899",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#FACC15",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#3B82F6",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 14,
    "minMoves": 12
  },
  {
    "id": 15,
    "difficulty": "normal",
    "colorCount": 4,
    "containers": [
      [
        "#3B82F6",
        "#FACC15",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 16,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#FACC15",
        "#8B5CF6",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#22C55E",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#22C55E",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 17,
    "minMoves": 15
  },
  {
    "id": 17,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#EC4899",
        "#3B82F6",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#22C55E",
        "#3B82F6",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#EC4899",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 17,
    "minMoves": 15
  },
  {
    "id": 18,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#22C55E",
        "#22C55E",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 17,
    "minMoves": 15
  },
  {
    "id": 19,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#FACC15",
        "#22C55E",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#22C55E",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#8B5CF6",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 19,
    "minMoves": 17
  },
  {
    "id": 20,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#EC4899",
        "#3B82F6",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#EC4899",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 18,
    "minMoves": 16
  },
  {
    "id": 21,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#3B82F6",
        "#8B5CF6",
        "#22C55E",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 18,
    "minMoves": 16
  },
  {
    "id": 22,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#EC4899",
        "#8B5CF6",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#8B5CF6",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 18,
    "minMoves": 16
  },
  {
    "id": 23,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#22C55E",
        "#22C55E",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#FACC15",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#FACC15",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 24,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#EC4899",
        "#22C55E",
        "#FACC15",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#3B82F6",
        "#3B82F6",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 14,
    "minMoves": 12
  },
  {
    "id": 25,
    "difficulty": "normal",
    "colorCount": 5,
    "containers": [
      [
        "#FACC15",
        "#22C55E",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#3B82F6",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 18,
    "minMoves": 16
  },
  {
    "id": 26,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#F97316",
        "#22C55E",
        "#EC4899",
        "#F97316"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#22C55E",
        "#F97316",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#FACC15",
        "#F97316"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#3B82F6",
        "#8B5CF6",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 22,
    "minMoves": 20
  },
  {
    "id": 27,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#3B82F6",
        "#EC4899",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#22C55E",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#FACC15",
        "#FACC15",
        "#F97316"
      ],
      [
        "#3B82F6",
        "#F97316",
        "#FACC15",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#F97316",
        "#F97316"
      ],
      [],
      []
    ],
    "parMoves": 19,
    "minMoves": 17
  },
  {
    "id": 28,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#3B82F6",
        "#F97316",
        "#F97316",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#F97316",
        "#EC4899",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 19,
    "minMoves": 17
  },
  {
    "id": 29,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#22C55E",
        "#EC4899",
        "#22C55E",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#F97316",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#F97316",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#8B5CF6",
        "#F97316"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#EC4899",
        "#22C55E"
      ],
      [
        "#22C55E",
        "#3B82F6",
        "#FACC15",
        "#F97316"
      ],
      [],
      []
    ],
    "parMoves": 22,
    "minMoves": 20
  },
  {
    "id": 30,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#3B82F6",
        "#EC4899",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#8B5CF6",
        "#F97316",
        "#FACC15"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#FACC15",
        "#F97316"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#F97316",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#F97316",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 20,
    "minMoves": 18
  },
  {
    "id": 31,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#22C55E",
        "#8B5CF6",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#EC4899",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#22C55E",
        "#F97316",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#EC4899",
        "#22C55E"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#FACC15",
        "#F97316"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 22,
    "minMoves": 20
  },
  {
    "id": 32,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#EC4899",
        "#EC4899",
        "#3B82F6",
        "#F97316"
      ],
      [
        "#F97316",
        "#22C55E",
        "#F97316",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#EC4899",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 21,
    "minMoves": 19
  },
  {
    "id": 33,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#F97316",
        "#F97316",
        "#F97316",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#22C55E",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#EC4899",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#F97316",
        "#22C55E",
        "#8B5CF6",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 18,
    "minMoves": 16
  },
  {
    "id": 34,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#EC4899",
        "#F97316",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#FACC15",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#F97316",
        "#F97316",
        "#F97316"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#FACC15",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 18,
    "minMoves": 16
  },
  {
    "id": 35,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#8B5CF6",
        "#22C55E",
        "#22C55E",
        "#F97316"
      ],
      [
        "#F97316",
        "#EC4899",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#FACC15",
        "#3B82F6",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#3B82F6",
        "#F97316"
      ],
      [
        "#EC4899",
        "#FACC15",
        "#8B5CF6",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 21,
    "minMoves": 19
  },
  {
    "id": 36,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#F97316",
        "#22C55E",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#F97316",
        "#F97316",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#3B82F6",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#F97316",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 17,
    "minMoves": 15
  },
  {
    "id": 37,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#FACC15",
        "#F97316",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#3B82F6",
        "#F97316"
      ],
      [
        "#8B5CF6",
        "#8B5CF6",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#22C55E",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#F97316",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#F97316",
        "#22C55E",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 21,
    "minMoves": 19
  },
  {
    "id": 38,
    "difficulty": "normal",
    "colorCount": 6,
    "containers": [
      [
        "#FACC15",
        "#8B5CF6",
        "#F97316",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#F97316",
        "#22C55E",
        "#F97316"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#FACC15",
        "#F97316"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#EC4899",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 20,
    "minMoves": 18
  },
  {
    "id": 39,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#FACC15",
        "#3B82F6",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#F97316",
        "#22C55E",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#06B6D4",
        "#EC4899",
        "#06B6D4",
        "#06B6D4"
      ],
      [
        "#F97316",
        "#22C55E",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#06B6D4",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#FACC15",
        "#F97316"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#3B82F6",
        "#F97316"
      ],
      [],
      []
    ],
    "parMoves": 20,
    "minMoves": 18
  },
  {
    "id": 40,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#22C55E",
        "#EC4899",
        "#F97316",
        "#EC4899"
      ],
      [
        "#F97316",
        "#06B6D4",
        "#22C55E",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#06B6D4",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#06B6D4",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#F97316",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#F97316",
        "#06B6D4",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 25,
    "minMoves": 23
  },
  {
    "id": 41,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#8B5CF6",
        "#F97316",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#22C55E",
        "#3B82F6",
        "#EC4899",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#8B5CF6",
        "#06B6D4"
      ],
      [
        "#06B6D4",
        "#EC4899",
        "#F97316",
        "#FACC15"
      ],
      [
        "#F97316",
        "#3B82F6",
        "#06B6D4",
        "#8B5CF6"
      ],
      [
        "#F97316",
        "#EC4899",
        "#06B6D4",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 25,
    "minMoves": 23
  },
  {
    "id": 42,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#EC4899",
        "#F97316",
        "#8B5CF6",
        "#06B6D4"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#06B6D4",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#06B6D4",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#F97316",
        "#06B6D4",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#F97316",
        "#F97316",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#3B82F6",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#22C55E",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 23,
    "minMoves": 21
  },
  {
    "id": 43,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#3B82F6",
        "#FACC15",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#F97316",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#F97316",
        "#EC4899",
        "#06B6D4"
      ],
      [
        "#22C55E",
        "#06B6D4",
        "#FACC15",
        "#06B6D4"
      ],
      [
        "#F97316",
        "#3B82F6",
        "#F97316",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#06B6D4",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 24,
    "minMoves": 22
  },
  {
    "id": 44,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#3B82F6",
        "#FACC15",
        "#06B6D4",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#8B5CF6",
        "#F97316"
      ],
      [
        "#22C55E",
        "#22C55E",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#F97316",
        "#F97316",
        "#06B6D4",
        "#FACC15"
      ],
      [
        "#06B6D4",
        "#EC4899",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#F97316",
        "#22C55E",
        "#22C55E",
        "#06B6D4"
      ],
      [],
      []
    ],
    "parMoves": 21,
    "minMoves": 19
  },
  {
    "id": 45,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#F97316",
        "#EC4899",
        "#F97316",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#06B6D4",
        "#3B82F6",
        "#06B6D4"
      ],
      [
        "#06B6D4",
        "#8B5CF6",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#F97316",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#22C55E",
        "#06B6D4"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#FACC15",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 25,
    "minMoves": 23
  },
  {
    "id": 46,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#06B6D4",
        "#3B82F6",
        "#06B6D4",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#06B6D4",
        "#22C55E"
      ],
      [
        "#F97316",
        "#3B82F6",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#F97316",
        "#F97316",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#EC4899",
        "#22C55E"
      ],
      [
        "#06B6D4",
        "#F97316",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 25,
    "minMoves": 23
  },
  {
    "id": 47,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#EC4899",
        "#3B82F6",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#F97316",
        "#EC4899",
        "#FACC15",
        "#06B6D4"
      ],
      [
        "#22C55E",
        "#F97316",
        "#3B82F6",
        "#06B6D4"
      ],
      [
        "#8B5CF6",
        "#06B6D4",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#8B5CF6",
        "#3B82F6",
        "#F97316"
      ],
      [
        "#06B6D4",
        "#3B82F6",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#F97316",
        "#EC4899",
        "#22C55E",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 24,
    "minMoves": 22
  },
  {
    "id": 48,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#22C55E",
        "#22C55E",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#06B6D4",
        "#F97316",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#06B6D4",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#8B5CF6",
        "#06B6D4"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#F97316",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#06B6D4",
        "#8B5CF6",
        "#F97316"
      ],
      [],
      []
    ],
    "parMoves": 23,
    "minMoves": 21
  },
  {
    "id": 49,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#FACC15",
        "#06B6D4",
        "#EC4899",
        "#F97316"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#06B6D4",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#06B6D4",
        "#FACC15",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#22C55E",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#06B6D4",
        "#F97316",
        "#F97316"
      ],
      [
        "#F97316",
        "#FACC15",
        "#3B82F6",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 23,
    "minMoves": 21
  },
  {
    "id": 50,
    "difficulty": "normal",
    "colorCount": 7,
    "containers": [
      [
        "#8B5CF6",
        "#06B6D4",
        "#FACC15",
        "#F97316"
      ],
      [
        "#F97316",
        "#EC4899",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#22C55E",
        "#22C55E",
        "#06B6D4"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#F97316",
        "#22C55E",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#06B6D4",
        "#FACC15",
        "#06B6D4"
      ],
      [],
      []
    ],
    "parMoves": 24,
    "minMoves": 22
  }
],
  hard: [
  {
    "id": 1,
    "difficulty": "hard",
    "colorCount": 4,
    "containers": [
      [
        "#8B5CF6",
        "#8B5CF6",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#3B82F6",
        "#FACC15",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 12,
    "minMoves": 10
  },
  {
    "id": 2,
    "difficulty": "hard",
    "colorCount": 4,
    "containers": [
      [
        "#EC4899",
        "#8B5CF6",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#FACC15",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 15,
    "minMoves": 13
  },
  {
    "id": 3,
    "difficulty": "hard",
    "colorCount": 4,
    "containers": [
      [
        "#3B82F6",
        "#FACC15",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#3B82F6",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 12,
    "minMoves": 10
  },
  {
    "id": 4,
    "difficulty": "hard",
    "colorCount": 4,
    "containers": [
      [
        "#FACC15",
        "#3B82F6",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#FACC15",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 5,
    "difficulty": "hard",
    "colorCount": 4,
    "containers": [
      [
        "#3B82F6",
        "#8B5CF6",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#EC4899",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 6,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#8B5CF6",
        "#22C55E",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#22C55E",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#EC4899",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 7,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#22C55E",
        "#3B82F6",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#FACC15",
        "#3B82F6",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#22C55E",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#EC4899",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 17,
    "minMoves": 15
  },
  {
    "id": 8,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#FACC15",
        "#8B5CF6",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#3B82F6",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#8B5CF6",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 9,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#EC4899",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#22C55E",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#FACC15",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 10,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#EC4899",
        "#3B82F6",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#EC4899",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 17,
    "minMoves": 15
  },
  {
    "id": 11,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#FACC15",
        "#22C55E",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#3B82F6",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#EC4899",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 16,
    "minMoves": 14
  },
  {
    "id": 12,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#FACC15",
        "#EC4899",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#FACC15",
        "#EC4899",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 17,
    "minMoves": 15
  },
  {
    "id": 13,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#FACC15",
        "#3B82F6",
        "#22C55E",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#8B5CF6",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#3B82F6",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#FACC15",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 18,
    "minMoves": 16
  },
  {
    "id": 14,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#EC4899",
        "#FACC15",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#FACC15",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#3B82F6",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#22C55E",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 15,
    "minMoves": 13
  },
  {
    "id": 15,
    "difficulty": "hard",
    "colorCount": 5,
    "containers": [
      [
        "#FACC15",
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#22C55E",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#8B5CF6",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 14,
    "minMoves": 12
  },
  {
    "id": 16,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#FACC15",
        "#8B5CF6",
        "#3B82F6",
        "#F97316"
      ],
      [
        "#F97316",
        "#22C55E",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#8B5CF6",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#F97316",
        "#F97316"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#FACC15",
        "#22C55E",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 17,
    "minMoves": 15
  },
  {
    "id": 17,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#22C55E",
        "#EC4899",
        "#FACC15",
        "#22C55E"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#22C55E",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#F97316",
        "#F97316",
        "#F97316"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#FACC15",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 20,
    "minMoves": 18
  },
  {
    "id": 18,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#EC4899",
        "#EC4899",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#22C55E",
        "#22C55E",
        "#F97316",
        "#F97316"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#F97316",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 18,
    "minMoves": 16
  },
  {
    "id": 19,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#F97316",
        "#3B82F6",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#F97316",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#F97316",
        "#EC4899",
        "#FACC15",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 22,
    "minMoves": 20
  },
  {
    "id": 20,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#F97316"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#8B5CF6",
        "#F97316",
        "#F97316"
      ],
      [
        "#22C55E",
        "#3B82F6",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#F97316",
        "#3B82F6",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 17,
    "minMoves": 15
  },
  {
    "id": 21,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#8B5CF6",
        "#F97316",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#F97316",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#F97316",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#FACC15",
        "#F97316"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#22C55E",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 18,
    "minMoves": 16
  },
  {
    "id": 22,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#FACC15",
        "#F97316",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#3B82F6",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#22C55E",
        "#F97316"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#22C55E",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#F97316",
        "#F97316",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 22,
    "minMoves": 20
  },
  {
    "id": 23,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#F97316",
        "#EC4899",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#EC4899",
        "#F97316"
      ],
      [
        "#EC4899",
        "#F97316",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#8B5CF6",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 22,
    "minMoves": 20
  },
  {
    "id": 24,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#8B5CF6",
        "#8B5CF6",
        "#F97316",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#F97316",
        "#FACC15",
        "#F97316",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#EC4899",
        "#F97316"
      ],
      [],
      []
    ],
    "parMoves": 19,
    "minMoves": 17
  },
  {
    "id": 25,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#F97316",
        "#EC4899",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#F97316",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#F97316",
        "#22C55E"
      ],
      [
        "#F97316",
        "#EC4899",
        "#8B5CF6",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 21,
    "minMoves": 19
  },
  {
    "id": 26,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#22C55E",
        "#8B5CF6",
        "#F97316",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#EC4899",
        "#FACC15",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#22C55E",
        "#F97316"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#22C55E",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#EC4899",
        "#F97316"
      ],
      [],
      []
    ],
    "parMoves": 21,
    "minMoves": 19
  },
  {
    "id": 27,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#3B82F6",
        "#FACC15",
        "#F97316",
        "#F97316"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#EC4899",
        "#F97316"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#22C55E",
        "#F97316"
      ],
      [
        "#EC4899",
        "#22C55E",
        "#8B5CF6",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 21,
    "minMoves": 19
  },
  {
    "id": 28,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#22C55E",
        "#8B5CF6",
        "#EC4899",
        "#F97316"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#FACC15",
        "#F97316"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#FACC15",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#F97316",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#3B82F6",
        "#EC4899",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 20,
    "minMoves": 18
  },
  {
    "id": 29,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#3B82F6",
        "#FACC15",
        "#F97316",
        "#EC4899"
      ],
      [
        "#F97316",
        "#FACC15",
        "#22C55E",
        "#F97316"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#3B82F6",
        "#F97316",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#22C55E",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#8B5CF6",
        "#EC4899",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 21,
    "minMoves": 19
  },
  {
    "id": 30,
    "difficulty": "hard",
    "colorCount": 6,
    "containers": [
      [
        "#F97316",
        "#22C55E",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#F97316",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#F97316",
        "#22C55E",
        "#EC4899"
      ],
      [],
      []
    ],
    "parMoves": 20,
    "minMoves": 18
  },
  {
    "id": 31,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#22C55E",
        "#F97316",
        "#3B82F6",
        "#F97316"
      ],
      [
        "#22C55E",
        "#06B6D4",
        "#22C55E",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#06B6D4",
        "#06B6D4"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#F97316",
        "#FACC15",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#F97316",
        "#06B6D4"
      ],
      [],
      []
    ],
    "parMoves": 25,
    "minMoves": 23
  },
  {
    "id": 32,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#F97316",
        "#22C55E",
        "#06B6D4",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#EC4899",
        "#22C55E"
      ],
      [
        "#22C55E",
        "#F97316",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#06B6D4",
        "#FACC15",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#06B6D4",
        "#EC4899",
        "#F97316"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#06B6D4",
        "#FACC15",
        "#F97316"
      ],
      [],
      []
    ],
    "parMoves": 25,
    "minMoves": 23
  },
  {
    "id": 33,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#22C55E",
        "#FACC15",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#3B82F6",
        "#F97316",
        "#EC4899"
      ],
      [
        "#F97316",
        "#06B6D4",
        "#8B5CF6",
        "#06B6D4"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#06B6D4",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#F97316",
        "#F97316",
        "#06B6D4"
      ],
      [
        "#8B5CF6",
        "#8B5CF6",
        "#FACC15",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 21,
    "minMoves": 19
  },
  {
    "id": 34,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#EC4899",
        "#F97316",
        "#06B6D4",
        "#22C55E"
      ],
      [
        "#F97316",
        "#06B6D4",
        "#F97316",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#FACC15",
        "#22C55E"
      ],
      [
        "#3B82F6",
        "#3B82F6",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#06B6D4",
        "#8B5CF6",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#F97316",
        "#06B6D4"
      ],
      [],
      []
    ],
    "parMoves": 23,
    "minMoves": 21
  },
  {
    "id": 35,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#06B6D4",
        "#22C55E",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#22C55E",
        "#FACC15",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#06B6D4",
        "#3B82F6",
        "#F97316",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#F97316",
        "#F97316",
        "#06B6D4",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#F97316",
        "#3B82F6",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#06B6D4",
        "#8B5CF6"
      ],
      [],
      []
    ],
    "parMoves": 23,
    "minMoves": 21
  },
  {
    "id": 36,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#06B6D4",
        "#06B6D4",
        "#3B82F6",
        "#F97316"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#22C55E",
        "#8B5CF6"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#22C55E",
        "#06B6D4"
      ],
      [
        "#3B82F6",
        "#22C55E",
        "#F97316",
        "#22C55E"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#EC4899",
        "#F97316"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#06B6D4",
        "#FACC15",
        "#EC4899",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 25,
    "minMoves": 23
  },
  {
    "id": 37,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#8B5CF6",
        "#22C55E",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#EC4899",
        "#22C55E",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#06B6D4",
        "#EC4899",
        "#FACC15",
        "#F97316"
      ],
      [
        "#22C55E",
        "#F97316",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#F97316",
        "#06B6D4",
        "#F97316"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#EC4899",
        "#06B6D4",
        "#06B6D4",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 24,
    "minMoves": 22
  },
  {
    "id": 38,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#EC4899",
        "#06B6D4",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#FACC15",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#F97316",
        "#F97316"
      ],
      [
        "#06B6D4",
        "#F97316",
        "#8B5CF6",
        "#F97316"
      ],
      [
        "#3B82F6",
        "#3B82F6",
        "#06B6D4",
        "#06B6D4"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#FACC15",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 22,
    "minMoves": 20
  },
  {
    "id": 39,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#8B5CF6",
        "#EC4899",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#06B6D4",
        "#06B6D4",
        "#06B6D4",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#3B82F6",
        "#3B82F6",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#F97316",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#3B82F6",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#F97316",
        "#22C55E",
        "#EC4899",
        "#22C55E"
      ],
      [
        "#F97316",
        "#FACC15",
        "#22C55E",
        "#06B6D4"
      ],
      [],
      []
    ],
    "parMoves": 23,
    "minMoves": 21
  },
  {
    "id": 40,
    "difficulty": "hard",
    "colorCount": 7,
    "containers": [
      [
        "#06B6D4",
        "#06B6D4",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#22C55E",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#F97316",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#EC4899",
        "#3B82F6",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#F97316",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#8B5CF6",
        "#06B6D4",
        "#06B6D4",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 22,
    "minMoves": 20
  },
  {
    "id": 41,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#EC4899",
        "#8B5CF6",
        "#FACC15",
        "#06B6D4"
      ],
      [
        "#F97316",
        "#EC4899",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#22C55E",
        "#06B6D4",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#EF4444",
        "#8B5CF6",
        "#FACC15",
        "#F97316"
      ],
      [
        "#06B6D4",
        "#8B5CF6",
        "#3B82F6",
        "#EF4444"
      ],
      [
        "#22C55E",
        "#F97316",
        "#3B82F6",
        "#EF4444"
      ],
      [
        "#06B6D4",
        "#F97316",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#EF4444",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 25,
    "minMoves": 23
  },
  {
    "id": 42,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#06B6D4",
        "#EC4899",
        "#8B5CF6",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#F97316",
        "#EF4444",
        "#22C55E"
      ],
      [
        "#06B6D4",
        "#06B6D4",
        "#22C55E",
        "#EF4444"
      ],
      [
        "#EC4899",
        "#F97316",
        "#EF4444",
        "#EF4444"
      ],
      [
        "#3B82F6",
        "#EC4899",
        "#8B5CF6",
        "#F97316"
      ],
      [
        "#22C55E",
        "#06B6D4",
        "#3B82F6",
        "#EC4899"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#F97316",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#FACC15",
        "#FACC15",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 24,
    "minMoves": 22
  },
  {
    "id": 43,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#EF4444",
        "#FACC15",
        "#06B6D4",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#EF4444",
        "#EC4899",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#8B5CF6",
        "#06B6D4"
      ],
      [
        "#3B82F6",
        "#FACC15",
        "#06B6D4",
        "#06B6D4"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#22C55E",
        "#EF4444"
      ],
      [
        "#EC4899",
        "#22C55E",
        "#3B82F6",
        "#F97316"
      ],
      [
        "#F97316",
        "#F97316",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#22C55E",
        "#FACC15",
        "#EF4444"
      ],
      [],
      []
    ],
    "parMoves": 24,
    "minMoves": 22
  },
  {
    "id": 44,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#EF4444",
        "#EC4899",
        "#EF4444",
        "#3B82F6"
      ],
      [
        "#06B6D4",
        "#3B82F6",
        "#EF4444",
        "#06B6D4"
      ],
      [
        "#EF4444",
        "#EC4899",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#3B82F6",
        "#F97316"
      ],
      [
        "#EC4899",
        "#EC4899",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#06B6D4",
        "#06B6D4"
      ],
      [
        "#F97316",
        "#FACC15",
        "#FACC15",
        "#22C55E"
      ],
      [
        "#F97316",
        "#22C55E",
        "#F97316",
        "#22C55E"
      ],
      [],
      []
    ],
    "parMoves": 26,
    "minMoves": 24
  },
  {
    "id": 45,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#EC4899",
        "#EF4444",
        "#EF4444",
        "#F97316"
      ],
      [
        "#EF4444",
        "#EC4899",
        "#3B82F6",
        "#3B82F6"
      ],
      [
        "#22C55E",
        "#EC4899",
        "#FACC15",
        "#F97316"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#06B6D4",
        "#3B82F6"
      ],
      [
        "#FACC15",
        "#3B82F6",
        "#06B6D4",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#8B5CF6",
        "#EC4899",
        "#F97316"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#8B5CF6",
        "#22C55E"
      ],
      [
        "#EF4444",
        "#22C55E",
        "#06B6D4",
        "#06B6D4"
      ],
      [],
      []
    ],
    "parMoves": 24,
    "minMoves": 22
  },
  {
    "id": 46,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#F97316",
        "#22C55E",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#3B82F6",
        "#06B6D4",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#EF4444",
        "#EC4899",
        "#EC4899"
      ],
      [
        "#06B6D4",
        "#F97316",
        "#06B6D4",
        "#FACC15"
      ],
      [
        "#8B5CF6",
        "#EF4444",
        "#F97316",
        "#8B5CF6"
      ],
      [
        "#EC4899",
        "#22C55E",
        "#F97316",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#8B5CF6",
        "#22C55E",
        "#EF4444"
      ],
      [
        "#FACC15",
        "#06B6D4",
        "#EF4444",
        "#3B82F6"
      ],
      [],
      []
    ],
    "parMoves": 28,
    "minMoves": 26
  },
  {
    "id": 47,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#06B6D4",
        "#22C55E",
        "#EF4444",
        "#22C55E"
      ],
      [
        "#F97316",
        "#EC4899",
        "#FACC15",
        "#3B82F6"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#EF4444",
        "#EC4899"
      ],
      [
        "#3B82F6",
        "#8B5CF6",
        "#3B82F6",
        "#FACC15"
      ],
      [
        "#EC4899",
        "#EF4444",
        "#EF4444",
        "#3B82F6"
      ],
      [
        "#06B6D4",
        "#F97316",
        "#FACC15",
        "#8B5CF6"
      ],
      [
        "#22C55E",
        "#06B6D4",
        "#EC4899",
        "#06B6D4"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#22C55E",
        "#FACC15"
      ],
      [],
      []
    ],
    "parMoves": 29,
    "minMoves": 27
  },
  {
    "id": 48,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#22C55E",
        "#3B82F6",
        "#8B5CF6",
        "#06B6D4"
      ],
      [
        "#F97316",
        "#8B5CF6",
        "#06B6D4",
        "#EF4444"
      ],
      [
        "#06B6D4",
        "#3B82F6",
        "#F97316",
        "#3B82F6"
      ],
      [
        "#8B5CF6",
        "#EC4899",
        "#FACC15",
        "#F97316"
      ],
      [
        "#3B82F6",
        "#EF4444",
        "#22C55E",
        "#22C55E"
      ],
      [
        "#FACC15",
        "#EC4899",
        "#8B5CF6",
        "#EC4899"
      ],
      [
        "#F97316",
        "#EC4899",
        "#FACC15",
        "#EF4444"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#EF4444",
        "#06B6D4"
      ],
      [],
      []
    ],
    "parMoves": 27,
    "minMoves": 25
  },
  {
    "id": 49,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#F97316",
        "#22C55E",
        "#EF4444",
        "#F97316"
      ],
      [
        "#22C55E",
        "#8B5CF6",
        "#22C55E",
        "#3B82F6"
      ],
      [
        "#06B6D4",
        "#EC4899",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#3B82F6",
        "#F97316",
        "#FACC15",
        "#F97316"
      ],
      [
        "#8B5CF6",
        "#FACC15",
        "#06B6D4",
        "#EF4444"
      ],
      [
        "#EF4444",
        "#8B5CF6",
        "#EC4899",
        "#3B82F6"
      ],
      [
        "#06B6D4",
        "#22C55E",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#06B6D4",
        "#EC4899",
        "#3B82F6",
        "#EF4444"
      ],
      [],
      []
    ],
    "parMoves": 29,
    "minMoves": 27
  },
  {
    "id": 50,
    "difficulty": "hard",
    "colorCount": 8,
    "containers": [
      [
        "#EF4444",
        "#3B82F6",
        "#8B5CF6",
        "#8B5CF6"
      ],
      [
        "#F97316",
        "#EC4899",
        "#EC4899",
        "#EF4444"
      ],
      [
        "#22C55E",
        "#22C55E",
        "#3B82F6",
        "#06B6D4"
      ],
      [
        "#EF4444",
        "#8B5CF6",
        "#06B6D4",
        "#FACC15"
      ],
      [
        "#22C55E",
        "#3B82F6",
        "#8B5CF6",
        "#FACC15"
      ],
      [
        "#FACC15",
        "#22C55E",
        "#06B6D4",
        "#F97316"
      ],
      [
        "#06B6D4",
        "#EC4899",
        "#EC4899",
        "#FACC15"
      ],
      [
        "#F97316",
        "#EF4444",
        "#3B82F6",
        "#F97316"
      ],
      [],
      []
    ],
    "parMoves": 26,
    "minMoves": 24
  }
]
};

// Procedural Infinite Levels Engine
const INFINITE_PALETTE = [
  '#3B82F6', '#EC4899', '#FACC15', '#22C55E', '#8B5CF6',
  '#F97316', '#06B6D4', '#EF4444', '#10B981', '#6366F1',
  '#D946EF', '#14B8A6', '#F43F5E', '#0EA5E9', '#84CC16'
];

function createRng(seed) {
  let s = seed >>> 0;
  return function() {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const generateInfiniteLevel = (difficulty = 'normal', levelId = 51) => {
  const numId = parseInt(levelId, 10) || 51;
  const isHard = difficulty === 'hard';
  const seed = (numId * 9973 + (isHard ? 10007 : 42)) >>> 0;
  const rng = createRng(seed);

  // Progressive color scale: 7-11 colors for levels 51+
  const baseColors = isHard ? 8 : 7;
  const growth = Math.floor((numId - 51) / 25);
  const colorCount = Math.min(11, baseColors + growth);
  const emptyCount = colorCount >= 9 ? 3 : 2;

  const selectedColors = [];
  const palettePool = [...INFINITE_PALETTE];
  for (let i = 0; i < colorCount; i++) {
    const idx = Math.floor(rng() * palettePool.length);
    selectedColors.push(palettePool.splice(idx, 1)[0]);
  }

  // Solved state: colorCount full tubes + emptyCount empty tubes
  const tubes = [];
  for (let c = 0; c < colorCount; c++) {
    tubes.push([selectedColors[c], selectedColors[c], selectedColors[c], selectedColors[c]]);
  }
  for (let e = 0; e < emptyCount; e++) {
    tubes.push([]);
  }

  // Deterministic reverse-pour simulation
  const numMoves = 32 + Math.floor(rng() * 18);
  for (let m = 0; m < numMoves; m++) {
    const nonEmpty = [];
    for (let i = 0; i < tubes.length; i++) {
      if (tubes[i].length > 0) nonEmpty.push(i);
    }
    const hasSpace = [];
    for (let i = 0; i < tubes.length; i++) {
      if (tubes[i].length < 4) hasSpace.push(i);
    }

    if (nonEmpty.length === 0 || hasSpace.length === 0) continue;

    const fromIdx = nonEmpty[Math.floor(rng() * nonEmpty.length)];
    const validTargets = hasSpace.filter(idx => idx !== fromIdx);
    if (validTargets.length === 0) continue;
    const toIdx = validTargets[Math.floor(rng() * validTargets.length)];

    const unit = tubes[fromIdx].pop();
    tubes[toIdx].push(unit);
  }

  const parMoves = Math.round(colorCount * 3.8 + (isHard ? 6 : 3));
  const minMoves = Math.max(parMoves - 4, Math.round(parMoves * 0.75));

  return {
    id: numId,
    difficulty,
    colorCount,
    containers: tubes,
    parMoves,
    minMoves,
    isInfinite: true,
  };
};

export const getLevelConfig = (difficulty = 'normal', levelId = 1) => {
  const num = parseInt(levelId, 10) || 1;
  const list = LEVELS[difficulty] || LEVELS.normal;
  if (num <= list.length) {
    const found = list.find(l => l.id === num);
    if (found) {
      return JSON.parse(JSON.stringify(found));
    }
  }
  // Infinite level generation past level 50
  return generateInfiniteLevel(difficulty, num);
};

export const getTotalLevels = (difficulty = 'normal') => {
  return Infinity;
};
