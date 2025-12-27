import type { TraditionalCellData, TraditionalCrosswordPuzzleData } from '../../src/types/TraditionalCrossword';
import { numberCells } from '../../src/utils/traditionalCrosswordUtils';

// A simple 5x5 traditional Norwegian crossword with rotational symmetry
// Starting with mostly empty cells for testing grid editing
// Layout (X = blocked):
// _ _ _ X X
// _ _ _ X X
// _ _ _ _ _
// X X _ _ _
// X X _ _ _

const puzzleCells: TraditionalCellData[][] = [
  // Row 0
  [
    { position: { row: 0, col: 0 }, cellType: 'solution', letter: ' ' },
    { position: { row: 0, col: 1 }, cellType: 'solution', letter: ' ' },
    { position: { row: 0, col: 2 }, cellType: 'solution', letter: ' ' },
    { position: { row: 0, col: 3 }, cellType: 'blocked' },
    { position: { row: 0, col: 4 }, cellType: 'blocked' }
  ],
  // Row 1
  [
    { position: { row: 1, col: 0 }, cellType: 'solution', letter: ' ' },
    { position: { row: 1, col: 1 }, cellType: 'solution', letter: ' ' },
    { position: { row: 1, col: 2 }, cellType: 'solution', letter: ' ' },
    { position: { row: 1, col: 3 }, cellType: 'blocked' },
    { position: { row: 1, col: 4 }, cellType: 'blocked' }
  ],
  // Row 2
  [
    { position: { row: 2, col: 0 }, cellType: 'solution', letter: ' ' },
    { position: { row: 2, col: 1 }, cellType: 'solution', letter: ' ' },
    { position: { row: 2, col: 2 }, cellType: 'solution', letter: ' ' },
    { position: { row: 2, col: 3 }, cellType: 'solution', letter: ' ' },
    { position: { row: 2, col: 4 }, cellType: 'solution', letter: ' ' }
  ],
  // Row 3
  [
    { position: { row: 3, col: 0 }, cellType: 'blocked' },
    { position: { row: 3, col: 1 }, cellType: 'blocked' },
    { position: { row: 3, col: 2 }, cellType: 'solution', letter: ' ' },
    { position: { row: 3, col: 3 }, cellType: 'solution', letter: ' ' },
    { position: { row: 3, col: 4 }, cellType: 'solution', letter: ' ' }
  ],
  // Row 4
  [
    { position: { row: 4, col: 0 }, cellType: 'blocked' },
    { position: { row: 4, col: 1 }, cellType: 'blocked' },
    { position: { row: 4, col: 2 }, cellType: 'solution', letter: ' ' },
    { position: { row: 4, col: 3 }, cellType: 'solution', letter: ' ' },
    { position: { row: 4, col: 4 }, cellType: 'solution', letter: ' ' }
  ]
];

// Number the cells automatically
const numberedCells = numberCells(puzzleCells);

export const sampleEmptyPuzzle: TraditionalCrosswordPuzzleData = {
  puzzleType: 'traditional',
  id: 'sample-traditional-empty',
  title: 'Tomt krysskryss (for testing)',
  rows: 5,
  cols: 5,
  cellSize: 50,
  cells: numberedCells,
  clues: {
    across: [
      { number: 1, text: 'Fyll inn hintet her' }
    ],
    down: [
      { number: 1, text: 'Fyll inn hintet her' }
    ]
  }
};
