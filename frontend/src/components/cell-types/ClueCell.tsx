import type {Dimensions, GridPosition} from "../../types";
import type {Location, ClueData} from "../../types/Crossword.ts";
import {BentArrow} from "../arrows";

export interface ClueCellProps {
  gridPosition: GridPosition;
  clues: ClueData[];
  cellSize: Dimensions;
}

function ClueCell({gridPosition, clues, cellSize}: ClueCellProps) {
  const clueCount = clues.length;
  const { row, col } = gridPosition;
  const lineHeight = 12;
  const clueLayouts = calculateClueLayouts(clues, cellSize);

  function calculateClueLayouts(clues: ClueData[], cellSize: Dimensions) {
    const totalNumberOfLines = clues.reduce((total, clue) => {
      return total + clue.text.length;
    }, 0);

    let currentY = 0;
    return clues.map((clue) => {
      const clueHeight = cellSize.height * (clue.text.length / totalNumberOfLines);
      const layout = {
        y: currentY,
        dimensions: {
          width: cellSize.width,
          height: clueHeight
        },
        lineCount: clue.text.length
      };

      currentY += clueHeight;
      return layout;
    })
  }


  function getStartCellLocation(clue: ClueData): Location {
    const rowOffset = clue.startCell.row - row;
    const colOffset = clue.startCell.col - col;

    if (rowOffset === 0) {
      if (colOffset === -1) {
        return 'left';
      } else if (colOffset === 1) {
        return 'right';
      }
    } else if (colOffset === 0) {
      if (rowOffset === -1) {
        return 'above';
      } else if (rowOffset === 1) {
        return 'below';
      }
    }
    return undefined;
  }

  function clueNeedsArrow(clue: ClueData) {
    // Clue needs an arrow ...
    return (
      // ... if start cell is below and direction is across
      (clue.direction === 'across' && clue.startCell.col == col) ||
      // ... or if start cell is to the right and direction is down
      (clue.direction === 'down' && clue.startCell.row == row) ||
      // ... or if start cell is above and direction is across
      (clue.direction === 'across' && clue.startCell.row < row) ||
      // ... or if start cell is to the left and direction is down
      (clue.direction === 'down' && clue.startCell.col < col)
    );
  }

  return (
    <>
      {clues.map((clue, clueIndex) => (
        <g className="clue" key={clueIndex} transform={`translate(0, ${clueLayouts[clueIndex].y})`}>
          {clue.text.map((clueTextLine, textLineIndex) => {
            return(
              <text key={textLineIndex}
                  className="clueText"
                  x={cellSize.width / 2}
                  y={clueLayouts[clueIndex].dimensions.height / 2}
                  dy={textLineIndex * lineHeight - ((clueLayouts[clueIndex].lineCount -1) / 2) * lineHeight}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontWeight="bold"
              >
                {clueTextLine}
              </text>
            )}
          )}
          {(clueCount > 1 && clueIndex < clueCount - 1) && (
              <line
                className="clueSeparator"
                x1="0"
                y1={clueLayouts[clueIndex].y + clueLayouts[clueIndex].dimensions.height}
                x2={cellSize.width}
                y2={clueLayouts[clueIndex].y + clueLayouts[clueIndex].dimensions.height}
                stroke={"black"}
                strokeWidth="var(--strokeWidth)"
              />
          )}
          {clueNeedsArrow(clue) && (
            <BentArrow location={getStartCellLocation(clue)} layout={clueLayouts[clueIndex]} direction={clue.direction} cellSize={cellSize} />
          )}
        </g>
      ))}
    </>
  )
}

export default ClueCell;
