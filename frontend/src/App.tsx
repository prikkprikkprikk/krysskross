import './App.css'
import CrosswordPuzzle from './components/CrosswordPuzzle';

function App() {

  const samplePuzzle = {
    id: 'puzzle-1',
    title: 'Test-kryssord',
    rows: 5,
    cols: 5,
    cellSize: 50,
    cells: [

    ]
  }

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
