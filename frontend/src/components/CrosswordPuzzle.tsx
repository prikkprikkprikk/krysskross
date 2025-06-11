// import { useState } from 'react'
import type {CrosswordPuzzleData } from "../types/crossword.ts";
// import type {CrosswordCell } from "../types/crossword.ts";

interface CrosswordPuzzleProps {
  puzzleData: CrosswordPuzzleData;
}

function CrosswordPuzzle(puzzleData: CrosswordPuzzleProps) {

  console.log(puzzleData);

  return (
    <svg>
      <rect height={50} width={50}></rect>
    </svg>
  );

}

export default CrosswordPuzzle;
