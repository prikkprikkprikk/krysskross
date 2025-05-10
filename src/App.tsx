import { useState, useEffect, useCallback } from 'react';
import './App.css'; // We'll create this for basic styles

// Interface for our cell data
interface CellData {
  letter?: string;
}

// Interface for cell coordinates
interface CellCoords {
  row: number;
  col: number;
}

const CELL_SIZE = 40; // Size of each cell in pixels

function App() {
  const [numRows, setNumRows] = useState(7); // Default rows
  const [numCols, setNumCols] = useState(10); // Default columns
  const [gridContent, setGridContent] = useState<Record<string, CellData>>({});
  const [selectedCell, setSelectedCell] = useState<CellCoords | null>(null);

  // Initialize or reset grid content when dimensions change
  useEffect(() => {
    const newGridContent: Record<string, CellData> = {};
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        newGridContent[`${r}-${c}`] = {};
      }
    }
    setGridContent(newGridContent);
    setSelectedCell(null); // Reset selection
  }, [numRows, numCols]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  // Handle keyboard input for letters and navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;

    // Letter input (A-Z and Norwegian Æ, Ø, Å)
    if (event.key.length === 1 && event.key.match(/[a-zA-ZæøåÆØÅ]/i)) {
      setGridContent(prev => ({
        ...prev,
        [`${row}-${col}`]: { letter: event.key.toUpperCase() },
      }));
      // Optional: Move to next cell (right, then down to next row)
      // if (col + 1 < numCols) {
      //   setSelectedCell({ row, col: col + 1 });
      // } else if (row + 1 < numRows) {
      //   setSelectedCell({ row: row + 1, col: 0 });
      // }
      event.preventDefault();
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      setGridContent(prev => ({
        ...prev,
        [`${row}-${col}`]: { letter: undefined },
      }));
      event.preventDefault();
    } else if (event.key.startsWith('Arrow')) {
      event.preventDefault();
      let newRow = row;
      let newCol = col;
      if (event.key === 'ArrowUp' && row > 0) newRow--;
      if (event.key === 'ArrowDown' && row < numRows - 1) newRow++;
      if (event.key === 'ArrowLeft' && col > 0) newCol--;
      if (event.key === 'ArrowRight' && col < numCols - 1) newCol++;
      setSelectedCell({ row: newRow, col: newCol });
    }
  }, [selectedCell, numRows, numCols]);

  // Add and remove global event listener for keyboard input
  useEffect(() => {
    if (selectedCell) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCell, handleKeyDown]);


  return (
    <div className="App">
      <header>
        <h1>KryssKross</h1>
        <div className="controls">
          <label>
            Rows:
            <input
              type="number"
              value={numRows}
              onChange={(e) => setNumRows(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
            />
          </label>
          <label>
            Cols:
            <input
              type="number"
              value={numCols}
              onChange={(e) => setNumCols(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
            />
          </label>
        </div>
      </header>

      <div className="grid-container">
        <svg
          width={numCols * CELL_SIZE}
          height={numRows * CELL_SIZE}
          style={{ border: '1px solid #ccc' }}
        >
          {Array.from({ length: numRows }).map((_, r) =>
            Array.from({ length: numCols }).map((_, c) => {
              const cellKey = `${r}-${c}`;
              const isSelected = selectedCell?.row === r && selectedCell?.col === c;
              return (
                <g key={cellKey} onClick={() => handleCellClick(r, c)}>
                  <rect
                    x={c * CELL_SIZE}
                    y={r * CELL_SIZE}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    fill={isSelected ? '#e0e0ff' : '#fff'}
                    stroke="#333"
                    strokeWidth="1"
                  />
                  <text
                    x={c * CELL_SIZE + CELL_SIZE / 2}
                    y={r * CELL_SIZE + CELL_SIZE / 2 + 4} // +4 for better vertical centering
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="20"
                    fill="#000"
                    pointerEvents="none" // So text doesn't block rect click
                  >
                    {gridContent[cellKey]?.letter || ''}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
}

export default App;