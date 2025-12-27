import type {Dimensions} from "../../types";

interface BlockedCellProps {
  cellSize: Dimensions;
}

function BlockedCell({cellSize}: BlockedCellProps) {
  return (
    <rect className="blockedCell"
      x="0"
      y="0"
      width={cellSize.width}
      height={cellSize.height}
      fill="black"
      pointerEvents="none"
    ></rect>
  )
}

export default BlockedCell;
