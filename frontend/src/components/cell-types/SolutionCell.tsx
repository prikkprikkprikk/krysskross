import type {Dimensions} from "../../types";

export interface SolutionCellProps {
  cellSize: Dimensions;
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
