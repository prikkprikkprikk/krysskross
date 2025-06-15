import type {CellSize} from "../../types";
import type {ClueData} from "../../types/crossword.ts";

export interface ClueCellProps {
  clues: ClueData[];
  cellSize: CellSize;
}

function ClueCell({clues, cellSize}: ClueCellProps) {
  const clueCount = clues.length;
  const clueHeight = cellSize.height / clueCount;

  return (
    <>
      {clues.map((clue, index) => (
        <>
          <text className="clues"
                x={cellSize.width / 2}
                y={clueHeight * index + clueHeight / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fontWeight="bold"
          >
            {clue.text}
          </text>
          {(clueCount > 1 && index < clueCount - 1) && (
              <line
                className="clueSeparator"
                x1="0"
                y1={clueHeight * (index + 1)}
                x2={cellSize.width}
                y2={clueHeight * (index + 1)}
                stroke={"black"}
                strokeWidth="var(--strokeWidth)"
              />
          )}
        </>
      ))}
    </>
  )
}

export default ClueCell;
