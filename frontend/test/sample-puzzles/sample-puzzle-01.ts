import type { CellData, CrosswordPuzzleData } from '../../src/types/crossword'

export const puzzleCells: CellData[] = [
  // Row 0
  {
    position: { row: 0, col: 0 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 0, col: 1 },
        direction: 'across',
        text: 'FJELL'
      },
    ]
  },
  {
    position: { row: 0, col: 1 },
    cellType: 'solution',
    letter: 'A'
  },
  {
    position: { row: 0, col: 2 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 1, col: 2 },
        direction: 'down',
        text: 'BY'
      },
      {
        startCell: { row: 1, col: 2 },
        direction: 'down',
        text: 'TROLL'
      },
    ]
  },
  {
    position: { row: 0, col: 3 },
    cellType: 'solution',
    letter: 'B'
  },
  {
    position: { row: 0, col: 4 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 1, col: 4 },
        direction: 'down',
        text: 'SKIP'
      }
    ]
  },

  // Row 1
  {
    position: { row: 1, col: 0 },
    cellType: 'solution',
    letter: 'O'
  },
  {
    position: { row: 1, col: 1 },
    cellType: 'solution',
    letter: 'C'
  },
  {
    position: { row: 1, col: 2 },
    cellType: 'solution',
    letter: 'D'
  },
  {
    position: { row: 1, col: 3 },
    cellType: 'solution',
    letter: 'E'
  },
  {
    position: { row: 1, col: 4 },
    cellType: 'solution',
    letter: 'F'
  },

  // Row 2
  {
    position: { row: 2, col: 0 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 2, col: 1 },
        direction: 'across',
        text: 'KONGE'
      },
      {
        startCell: { row: 2, col: 1 },
        direction: 'across',
        text: 'PÅLEGG'
      },
      {
        startCell: { row: 2, col: 1 },
        direction: 'across',
        text: 'FRISK'
      },
    ]
  },
  {
    position: { row: 2, col: 1 },
    cellType: 'solution',
    letter: 'G'
  },
  {
    position: { row: 2, col: 2 },
    cellType: 'solution',
    letter: 'H'
  },
  {
    position: { row: 2, col: 3 },
    cellType: 'solution',
    letter: 'I'
  },
  {
    position: { row: 2, col: 4 },
    cellType: 'solution',
    letter: 'J'
  },

  // Row 3
  {
    position: { row: 3, col: 0 },
    cellType: 'solution',
    letter: "P"
  },
  {
    position: { row: 3, col: 1 },
    cellType: 'solution',
    letter: 'K'
  },
  {
    position: { row: 3, col: 2 },
    cellType: 'solution',
    letter: 'L'
  },
  {
    position: { row: 3, col: 3 },
    cellType: 'solution',
    letter: 'M'
  },
  {
    position: { row: 3, col: 4 },
    cellType: 'solution',
    letter: 'N'
  },

  // Row 4
  {
    position: { row: 4, col: 0 },
    cellType: 'clue',
    clues: [
      {
        startCell: { row: 4, col: 1 },
        direction: 'across',
        text: 'BRØD'
      }
    ]
  },
  {
    position: { row: 4, col: 1 },
    cellType: 'solution',
    letter: 'Æ'
  },
  {
    position: { row: 4, col: 2 },
    cellType: 'solution',
    letter: 'Ø'
  },
  {
    position: { row: 4, col: 3 },
    cellType: 'solution',
    letter: 'Å'
  },
  {
    position: { row: 4, col: 4 },
    cellType: 'empty',
  }
];

export const samplePuzzle: CrosswordPuzzleData = {
  id: 'sample-puzzle-01',
  title: 'Test-kryssord',
  rows: 5,
  cols: 5,
  cellSize: 50,
  cells: puzzleCells
};
