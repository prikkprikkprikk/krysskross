import type {GridPosition} from "./CellGeometry.ts";

export type Direction = 'across' | 'down';

export type CellType = 'empty' | 'solution' | 'clue';

export interface BaseCellData {
  position: GridPosition;
  cellType: CellType;
}

export interface EmptyCellData extends BaseCellData {
  cellType: 'empty';
}

export interface SolutionCellData extends BaseCellData {
  cellType: 'solution';
  letter: string;
}

export interface ClueData {
  startCell: GridPosition;
  direction: Direction;
  text: string;
}

export interface ClueCellData extends BaseCellData {
  cellType: 'clue';
  clues: ClueData[];
}

export type CellData = EmptyCellData | SolutionCellData | ClueCellData;

export interface CrosswordPuzzleData {
  id: string;
  title: string;
  rows: number;
  cols: number;
  cellSize: number;
  cells: CellData[];
}
