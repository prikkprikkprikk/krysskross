import './App.css'
import CrosswordPuzzle from './components/CrosswordPuzzle';
import { samplePuzzle } from "../test/sample-puzzles/sample-puzzle-01.ts";

function App() {

  return (
    <>
      <h1>{samplePuzzle.title}</h1>
      <div className="card">
        <CrosswordPuzzle puzzleData={samplePuzzle}></CrosswordPuzzle>
      </div>
    </>
  )
}

export default App
