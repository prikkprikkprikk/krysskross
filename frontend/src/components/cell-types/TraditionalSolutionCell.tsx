import type {Dimensions} from "../../types";

export interface TraditionalSolutionCellProps {
  cellSize: Dimensions;
  solutionLetter: string;
  cellNumber?: number;
}

function TraditionalSolutionCell({cellSize, solutionLetter, cellNumber}: TraditionalSolutionCellProps) {
  return (
    <>
      {/* Cell number in top-left corner */}
      {cellNumber && (
        <text className="cellNumber"
              x={2}
              y={2}
              textAnchor="start"
              dominantBaseline="hanging"
              fontSize={cellSize.height * 0.25}
        >
          {cellNumber}
        </text>
      )}
      {/* Solution letter in center */}
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
    </>
  )
}

export default TraditionalSolutionCell;
