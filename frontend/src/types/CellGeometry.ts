export interface Dimensions {
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
  canvasSize: Dimensions;
}

export interface ClueLayout {
  y: number;
  dimensions: Dimensions;
  lineCount: number;
}
