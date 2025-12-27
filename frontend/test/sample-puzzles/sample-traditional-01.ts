import type { TraditionalCellData, TraditionalCrosswordPuzzleData } from '../../src/types/TraditionalCrossword';
import { numberCells } from '../../src/utils/traditionalCrosswordUtils';

// A simple 7x7 traditional Norwegian crossword with rotational symmetry
// Layout (X = blocked):
// M A T E _ X X
// O _ _ _ R X X
// T _ _ _ I X X
// E _ _ _ S _ _
// X X L A K E N
// X X _ _ _ _ E
// X X _ _ _ D E

const puzzleCells: TraditionalCellData[][] = [
  // Row 0
  [
    { position: { row: 0, col: 0 }, cellType: 'solution', letter: 'M' },
    { position: { row: 0, col: 1 }, cellType: 'solution', letter: 'A' },
    { position: { row: 0, col: 2 }, cellType: 'solution', letter: 'T' },
    { position: { row: 0, col: 3 }, cellType: 'solution', letter: 'E' },
    { position: { row: 0, col: 4 }, cellType: 'solution', letter: 'R' },
    { position: { row: 0, col: 5 }, cellType: 'blocked' },
    { position: { row: 0, col: 6 }, cellType: 'blocked' }
  ],
  // Row 1
  [
    { position: { row: 1, col: 0 }, cellType: 'solution', letter: 'O' },
    { position: { row: 1, col: 1 }, cellType: 'solution', letter: 'D' },
    { position: { row: 1, col: 2 }, cellType: 'solution', letter: 'D' },
    { position: { row: 1, col: 3 }, cellType: 'solution', letter: 'E' },
    { position: { row: 1, col: 4 }, cellType: 'solution', letter: 'R' },
    { position: { row: 1, col: 5 }, cellType: 'blocked' },
    { position: { row: 1, col: 6 }, cellType: 'blocked' }
  ],
  // Row 2
  [
    { position: { row: 2, col: 0 }, cellType: 'solution', letter: 'T' },
    { position: { row: 2, col: 1 }, cellType: 'solution', letter: 'E' },
    { position: { row: 2, col: 2 }, cellType: 'solution', letter: 'G' },
    { position: { row: 2, col: 3 }, cellType: 'solution', letter: 'N' },
    { position: { row: 2, col: 4 }, cellType: 'solution', letter: 'I' },
    { position: { row: 2, col: 5 }, cellType: 'blocked' },
    { position: { row: 2, col: 6 }, cellType: 'blocked' }
  ],
  // Row 3
  [
    { position: { row: 3, col: 0 }, cellType: 'solution', letter: 'E' },
    { position: { row: 3, col: 1 }, cellType: 'solution', letter: 'R' },
    { position: { row: 3, col: 2 }, cellType: 'solution', letter: 'T' },
    { position: { row: 3, col: 3 }, cellType: 'solution', letter: 'E' },
    { position: { row: 3, col: 4 }, cellType: 'solution', letter: 'S' },
    { position: { row: 3, col: 5 }, cellType: 'solution', letter: 'K' },
    { position: { row: 3, col: 6 }, cellType: 'solution', letter: 'E' }
  ],
  // Row 4
  [
    { position: { row: 4, col: 0 }, cellType: 'blocked' },
    { position: { row: 4, col: 1 }, cellType: 'blocked' },
    { position: { row: 4, col: 2 }, cellType: 'solution', letter: 'L' },
    { position: { row: 4, col: 3 }, cellType: 'solution', letter: 'A' },
    { position: { row: 4, col: 4 }, cellType: 'solution', letter: 'K' },
    { position: { row: 4, col: 5 }, cellType: 'solution', letter: 'E' },
    { position: { row: 4, col: 6 }, cellType: 'solution', letter: 'N' }
  ],
  // Row 5
  [
    { position: { row: 5, col: 0 }, cellType: 'blocked' },
    { position: { row: 5, col: 1 }, cellType: 'blocked' },
    { position: { row: 5, col: 2 }, cellType: 'solution', letter: 'E' },
    { position: { row: 5, col: 3 }, cellType: 'solution', letter: 'T' },
    { position: { row: 5, col: 4 }, cellType: 'solution', letter: 'T' },
    { position: { row: 5, col: 5 }, cellType: 'solution', letter: 'E' },
    { position: { row: 5, col: 6 }, cellType: 'solution', letter: 'R' }
  ],
  // Row 6
  [
    { position: { row: 6, col: 0 }, cellType: 'blocked' },
    { position: { row: 6, col: 1 }, cellType: 'blocked' },
    { position: { row: 6, col: 2 }, cellType: 'solution', letter: 'S' },
    { position: { row: 6, col: 3 }, cellType: 'solution', letter: 'E' },
    { position: { row: 6, col: 4 }, cellType: 'solution', letter: 'G' },
    { position: { row: 6, col: 5 }, cellType: 'solution', letter: 'N' },
    { position: { row: 6, col: 6 }, cellType: 'solution', letter: 'E' }
  ]
];

// Number the cells automatically
const numberedCells = numberCells(puzzleCells);

export const sampleTraditionalPuzzle: TraditionalCrosswordPuzzleData = {
  puzzleType: 'traditional',
  id: 'sample-traditional-01',
  title: 'Norsk krysskryss',
  rows: 7,
  cols: 7,
  cellSize: 50,
  cells: numberedCells,
  clues: {
    across: [
      { number: 1, text: 'Brukt til mat', answer: 'MATER' },
      { number: 6, text: 'Partall', answer: 'ODDER' },
      { number: 8, text: 'Illustrasjon', answer: 'TEGNI' },
      { number: 9, text: 'Humoristisk', answer: 'ERTESKE' },
      { number: 11, text: 'Stoff til seng', answer: 'LAKEN' },
      { number: 12, text: 'Tall', answer: 'ETTER' },
      { number: 13, text: 'Treg', answer: 'SEGNE' }
    ],
    down: [
      { number: 1, text: 'Dyrisk', answer: 'MOTE' },
      { number: 2, text: 'Plage', answer: 'ADDER' },
      { number: 3, text: 'Frukt', answer: 'TERTE' },
      { number: 4, text: 'Grønnsak', answer: 'ERTER' },
      { number: 5, text: 'Skriv', answer: 'RISKE' },
      { number: 7, text: 'Tynt stoff', answer: 'SKEER' },
      { number: 10, text: 'Adverb', answer: 'ENNE' }
    ]
  }
};
