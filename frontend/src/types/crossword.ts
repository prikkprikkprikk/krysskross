export interface BaseCrosswordCell {
  id: string;
}

export interface SolutionCell extends BaseCrosswordCell {
  letter?: string;
}

export interface Clue {
  startCell: BaseCrosswordCell;
  direction: 'across' | 'down';
  text: string;
}

export interface ClueCell extends BaseCrosswordCell {
  clues?: Clue[];
}

export type CrosswordCell = SolutionCell | ClueCell;

export interface CrosswordPuzzleData {
  id: string;
  title: string;
  rows: number;
  cols: number;
  cellSize: number;
  cells: CrosswordCell[];
}
