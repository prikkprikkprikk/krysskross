import type {GridPosition} from "./CellGeometry.ts";

// Traditional crossword specific types

export type TraditionalCellType = 'blocked' | 'solution';

export interface BaseTraditionalCellData {
  position: GridPosition;
  cellType: TraditionalCellType;
}

export interface BlockedCellData extends BaseTraditionalCellData {
  cellType: 'blocked';
}

export interface TraditionalSolutionCellData extends BaseTraditionalCellData {
  cellType: 'solution';
  letter: string;
  number?: number; // Cell number if it starts a word
}

export type TraditionalCellData = BlockedCellData | TraditionalSolutionCellData;

export interface TraditionalClue {
  number: number;
  text: string;
  answer?: string; // Optional, for editor/validation
}

export interface TraditionalCrosswordPuzzleData {
  puzzleType: 'traditional';
  id: string;
  title: string;
  rows: number;
  cols: number;
  cellSize: number;
  cells: TraditionalCellData[][];
  clues: {
    across: TraditionalClue[];
    down: TraditionalClue[];
  };
}
