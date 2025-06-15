import type {CellSize} from "../../types";

export interface SolutionCellProps {
  cellSize: CellSize;
  solutionLetter: string;
}

function SolutionCell({cellSize, solutionLetter}: SolutionCellProps) {
  return (
    <text className="solutionLetter"
          x={cellSize.width / 2}
          y={cellSize.height / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontWeight="bold"
          fontSize={cellSize.height * .667}
    >
      {solutionLetter}
    </text>
  )
}

export default SolutionCell;
