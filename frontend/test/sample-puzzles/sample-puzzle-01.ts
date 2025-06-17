import type { CellData, CrosswordPuzzleData } from '../../src/types/Crossword.ts'

export const puzzleCells: CellData[] = [
  // Row 0
  {
    position: { row: 0, col: 0 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 0, col: 1 },
        direction: 'down',
        text: ['GRUNN']
      },
      {
        startCell: { row: 1, col: 0 },
        direction: 'across',
        text: ['SPILL']
      },
    ]
  },
  {
    position: { row: 0, col: 1 },
    cellType: 'solution',
    letter: 'M'
  },
  {
    position: { row: 0, col: 2 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 1, col: 2 },
        direction: 'down',
        text: ['TOMLER','OPP']
      },
    ]
  },
  {
    position: { row: 0, col: 3 },
    cellType: 'solution',
    letter: 'R'
  },
  {
    position: { row: 0, col: 4 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 0, col: 3 },
        direction: 'down',
        text: ['GÅTE']
      },
      {
        startCell: { row: 1, col: 4 },
        direction: 'down',
        text: ['PURT']
      }
    ]
  },

  // Row 1
  {
    position: { row: 1, col: 0 },
    cellType: 'solution',
    letter: 'P'
  },
  {
    position: { row: 1, col: 1 },
    cellType: 'solution',
    letter: 'O'
  },
  {
    position: { row: 1, col: 2 },
    cellType: 'solution',
    letter: 'K'
  },
  {
    position: { row: 1, col: 3 },
    cellType: 'solution',
    letter: 'E'
  },
  {
    position: { row: 1, col: 4 },
    cellType: 'solution',
    letter: 'R'
  },

  // Row 2
  {
    position: { row: 2, col: 0 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 2, col: 1 },
        direction: 'across',
        text: ['EMBAL-','LASJE']
      },
    ]
  },
  {
    position: { row: 2, col: 1 },
    cellType: 'solution',
    letter: 'T'
  },
  {
    position: { row: 2, col: 2 },
    cellType: 'solution',
    letter: 'U'
  },
  {
    position: { row: 2, col: 3 },
    cellType: 'solution',
    letter: 'B'
  },
  {
    position: { row: 2, col: 4 },
    cellType: 'solution',
    letter: 'E'
  },

  // Row 3
  {
    position: { row: 3, col: 0 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 3, col: 1 },
        direction: 'across',
        text: ['GJÆR-','MAKER']
      },
      {
        startCell: { row: 4, col: 0 },
        direction: 'across',
        text: ['FEIDE']
      },
    ]
  },
  {
    position: { row: 3, col: 1 },
    cellType: 'solution',
    letter: 'I'
  },
  {
    position: { row: 3, col: 2 },
    cellType: 'solution',
    letter: 'D'
  },
  {
    position: { row: 3, col: 3 },
    cellType: 'solution',
    letter: 'U'
  },
  {
    position: { row: 3, col: 4 },
    cellType: 'solution',
    letter: 'N'
  },

  // Row 4
  {
    position: { row: 4, col: 0 },
    cellType: 'solution',
    letter: 'T'
  },
  {
    position: { row: 4, col: 1 },
    cellType: 'solution',
    letter: 'V'
  },
  {
    position: { row: 4, col: 2 },
    cellType: 'solution',
    letter: 'I'
  },
  {
    position: { row: 4, col: 3 },
    cellType: 'solution',
    letter: 'S'
  },
  {
    position: { row: 4, col: 4 },
    cellType: 'solution',
    letter: 'T'
  },
];

export const samplePuzzle: CrosswordPuzzleData = {
  id: 'sample-puzzle-01',
  title: 'Test-kryssord',
  rows: 5,
  cols: 5,
  cellSize: 50,
  cells: puzzleCells
};
