export interface CellSize {
  width: number;
  height: number;
}

export interface GridPosition {
  row: number;
  col: number;
}

export interface GridSpan {
  rows: number;
  cols: number;
}

export interface CanvasPosition {
  x: number;
  y: number;
}

export interface CellGeometry {
  position: GridPosition;
  span: GridSpan;
  canvasPosition: CanvasPosition;
  canvasSize: CellSize;
}
