// import { useState } from 'react'
import type { CrosswordPuzzleData } from "../types/crossword";
import { EmptyCell } from "./cell-types"

interface CrosswordPuzzleProps {
  puzzleData: CrosswordPuzzleData;
}

export interface CellPlacement {
  x: number;
  y: number;
  size: number;
}

function CrosswordPuzzle(puzzleProps: CrosswordPuzzleProps) {

  const puzzleData = puzzleProps.puzzleData;
  const strokeWidth = 1.5;

  function calculateCellPlacement( x: number, y: number) : CellPlacement {
    return {
      x: x * puzzleData.cellSize,
      y: y * puzzleData.cellSize,
      size: puzzleData.cellSize,
    }
  }

  return (
    <svg style={{"--strokeWidth": strokeWidth} as React.CSSProperties}
      width={puzzleData.cols * puzzleData.cellSize + strokeWidth}
      height={puzzleData.rows * puzzleData.cellSize + strokeWidth}
    >
      <g transform={`translate(${strokeWidth/2}, ${strokeWidth/2})`}>
        {Array.from({ length: puzzleData.rows }).map((_, rowIndex) => (
          Array.from({ length: puzzleData.cols }).map((_, colIndex) => (
            <EmptyCell key={`R${rowIndex}C${colIndex}`} cellPlacement={calculateCellPlacement(colIndex, rowIndex)} />
          ))
        ))}
      </g>
    </svg>
  );

}

export default CrosswordPuzzle;
