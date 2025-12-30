import * as React from "react";
import './App.css'
import CrosswordPuzzle from './components/CrosswordPuzzle';
import TraditionalCrosswordPuzzle from './components/TraditionalCrosswordPuzzle';
import { samplePuzzle } from "../test/sample-puzzles/sample-puzzle-01.ts";
import { sampleEmptyPuzzle } from "../test/sample-puzzles/sample-traditional-empty.ts";

function App() {
  // Change this to switch between puzzle types
  const puzzleType: 'arrowword' | 'traditional' = 'traditional';

  return (
    <React.StrictMode>
      {puzzleType === 'traditional' ? (
        <>
          <h1>{sampleEmptyPuzzle.title}</h1>
          <div className="card">
            <TraditionalCrosswordPuzzle puzzleData={sampleEmptyPuzzle}></TraditionalCrosswordPuzzle>
          </div>
        </>
      ) : (
        <>
          <h1>{samplePuzzle.title}</h1>
          <div className="card">
            <CrosswordPuzzle puzzleData={samplePuzzle}></CrosswordPuzzle>
          </div>
        </>
      )}
    </React.StrictMode>
  )
}

export default App
