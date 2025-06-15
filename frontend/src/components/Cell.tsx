import type {CellGeometry} from "../types";
import type {MouseEvent} from "react";
import type {CellData, ClueCellData, SolutionCellData} from "../types/crossword";
import EmptyCell from "./cell-types/EmptyCell";
import SolutionCell from "./cell-types/SolutionCell";
import ClueCell from "./cell-types/ClueCell";

interface CellProps {
  cellData: CellData;
  cellGeometry: CellGeometry;
  className?: string;
  onCellClick: (row: number, col: number) => void;
}

function Cell({cellData, cellGeometry, className, onCellClick}: CellProps) {
  const { row, col } = cellGeometry.position;
  const { x, y } = cellGeometry.canvasPosition;
  const { width, height } = cellGeometry.canvasSize;

  function handleClick(event: MouseEvent<SVGRectElement>) {
    event.stopPropagation();
    if (onCellClick) {
      onCellClick( row, col );
    }
  }

  function getCellContent() {
    if (cellData.cellType === 'empty') {
      return <EmptyCell cellSize={{width, height}} />;
    } else if (cellData.cellType === 'solution') {
      const solutionCellData = cellData as SolutionCellData;
      return <SolutionCell cellSize={{width, height}} solutionLetter={solutionCellData.letter}></SolutionCell>;
    } else if (cellData.cellType === 'clue') {
      const clueCellData = cellData as ClueCellData;
      return <ClueCell clues={clueCellData.clues} cellSize={{width, height}}></ClueCell>;
    }
  }

  return (
    <g className={className}
       transform={`translate(${x}, ${y})`}
    >
      <rect className="cellBackground"
            onClick={handleClick}
            x="0"
            y="0"
            width={width}
            height={height}
      ></rect>
      <rect className="highlight"
            x="0"
            y="0"
            width={width}
            height={height}
            clipPath={`url(#cellClipPath)`}
      ></rect>
      {getCellContent()}
    </g>
  )
}

export default Cell;
