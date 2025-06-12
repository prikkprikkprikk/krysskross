import type {CellPlacement} from "../CrosswordPuzzle.tsx";

interface EmptyCellProps {
  cellPlacement: CellPlacement;
}

function EmptyCell({cellPlacement}: EmptyCellProps) {
  return (
    <g className="cell">
      <rect className="cellBorder"
        x={cellPlacement.x}
        y={cellPlacement.y}
        width={cellPlacement.size}
        height={cellPlacement.size}
      ></rect>
    </g>
  )
}

export default EmptyCell;
