import type {Dimensions} from "../../types";

interface EmptyCellProps {
  cellSize: Dimensions;
}

function EmptyCell({cellSize}: EmptyCellProps) {
  return (
    <rect className="emptyCell"
      x="0"
      y="0"
      width={cellSize.width}
      height={cellSize.height}
      fill={"url(#diagonalHatch)"}
    ></rect>
  )
}

export default EmptyCell;
