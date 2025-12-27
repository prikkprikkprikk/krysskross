import type { Direction, TraditionalCrosswordPuzzleData, TraditionalCellData, TraditionalSolutionCellData } from "../types";
import { useCallback, useEffect, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import type { CellGeometry } from "../types";
import { findNextSolutionCell, findPrevSolutionCell, numberCells } from "../utils/traditionalCrosswordUtils";
import { toggleCellWithSymmetry, validateCellToggle, getSymmetricPosition } from "../utils/gridEditingUtils";
import TraditionalSolutionCell from "./cell-types/TraditionalSolutionCell";
import BlockedCell from "./cell-types/BlockedCell";

type EditMode = 'structure' | 'letters';

interface TraditionalCrosswordPuzzleProps {
  puzzleData: TraditionalCrosswordPuzzleData;
}

interface CustomCSSProperties extends CSSProperties {
  '--strokeWidth': number | string;
}

function TraditionalCrosswordPuzzle(puzzleProps: TraditionalCrosswordPuzzleProps) {
  const [puzzleData, setPuzzleData] = useState<TraditionalCrosswordPuzzleData>(puzzleProps.puzzleData);
  const strokeWidth = 1.5;
  const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);
  const [cursorDirection, setCursorDirection] = useState<Direction>('across');
  const [editMode, setEditMode] = useState<EditMode>('letters');
  const [toggleError, setToggleError] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ row: number, col: number } | null>(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";

  // Clear selection when switching to structure mode
  useEffect(() => {
    if (editMode === 'structure') {
      setSelectedCell(null);
    }
  }, [editMode]);

  // Function to update a cell with a letter
  const updateCellLetter = useCallback((row: number, col: number, letter: string) => {
    if (!selectedCell) return;

    const cell = puzzleData.cells[row][col];
    if (cell.cellType === 'solution') {
      // Create a new 2D array with the updated cell
      const newCells = [...puzzleData.cells];
      newCells[row] = [...newCells[row]];
      newCells[row][col] = {
        ...cell,
        letter: letter.toUpperCase()
      };

      // Update the puzzle data with the new cells
      setPuzzleData({
        ...puzzleData,
        cells: newCells
      });
    }
  }, [puzzleData, selectedCell]);

  // Function to move to the next solution cell based on cursor direction
  const moveToNextCell = useCallback(() => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const nextCell = findNextSolutionCell(puzzleData.cells, row, col, cursorDirection);

    if (nextCell) {
      setSelectedCell(nextCell);
    }
  }, [selectedCell, puzzleData.cells, cursorDirection]);

  // Function to move to the previous solution cell based on cursor direction
  const moveToPrevCell = useCallback(() => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const prevCell = findPrevSolutionCell(puzzleData.cells, row, col, cursorDirection);

    if (prevCell) {
      setSelectedCell(prevCell);
    }
  }, [selectedCell, puzzleData.cells, cursorDirection]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Disable keyboard input in structure edit mode
    if (editMode === 'structure') return;

    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const key = event.key;

    if (key === ' ') {
      // Toggle cursor direction
      const newCursorDirection = cursorDirection === 'across' ? 'down' : 'across';
      setCursorDirection(newCursorDirection);
    } else if (key === 'ArrowRight') {
      if (cursorDirection === 'down') {
        setCursorDirection('across');
      }
      const nextCell = findNextSolutionCell(puzzleData.cells, row, col, 'across');
      if (nextCell) {
        setSelectedCell(nextCell);
      }
    } else if (key === 'ArrowLeft') {
      if (cursorDirection === 'down') {
        setCursorDirection('across');
      }
      const prevCell = findPrevSolutionCell(puzzleData.cells, row, col, 'across');
      if (prevCell) {
        setSelectedCell(prevCell);
      }
    } else if (key === 'ArrowDown') {
      if (cursorDirection === 'across') {
        setCursorDirection('down');
      }
      const nextCell = findNextSolutionCell(puzzleData.cells, row, col, 'down');
      if (nextCell) {
        setSelectedCell(nextCell);
      }
    } else if (key === 'ArrowUp') {
      if (cursorDirection === 'across') {
        setCursorDirection('down');
      }
      const prevCell = findPrevSolutionCell(puzzleData.cells, row, col, 'down');
      if (prevCell) {
        setSelectedCell(prevCell);
      }
    } else if (key.length === 1 && alphabet.includes(key.toUpperCase())) {
      // Handle letter input
      const cell = puzzleData.cells[row][col];
      if (cell.cellType === 'solution') {
        updateCellLetter(row, col, key);
        moveToNextCell();
      }
    } else if (key === 'Backspace' || key === 'Delete') {
      // Clear the current cell and move to the previous cell
      const cell = puzzleData.cells[row][col];
      if (cell.cellType === 'solution') {
        updateCellLetter(row, col, ' ');
        moveToPrevCell();
      }
    }
  }, [puzzleData, selectedCell, cursorDirection, updateCellLetter, moveToPrevCell, moveToNextCell, editMode]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  const handleCellClick = useCallback((row: number, col: number) => {
    const cell = puzzleData.cells[row][col];

    if (editMode === 'structure') {
      // In structure mode, toggle between solution and blocked
      const newCells = toggleCellWithSymmetry(puzzleData.cells, row, col);
      if (newCells) {
        // Re-number the cells after structure change
        const numberedCells = numberCells(newCells);
        setPuzzleData({
          ...puzzleData,
          cells: numberedCells
        });
        setToggleError(null);
      } else {
        // Show error
        const validation = validateCellToggle(puzzleData.cells, row, col);
        setToggleError(validation.reason || 'Kan ikke endre celle');
        // Clear error after 3 seconds
        setTimeout(() => setToggleError(null), 3000);
      }
    } else {
      // In letters mode, select solution cells only
      if (cell.cellType === 'solution') {
        setSelectedCell({ row, col });
      }
    }
  }, [puzzleData, editMode]);

  function cellGeometryFactory(col: number, row: number): CellGeometry {
    return {
      position: { row, col },
      span: { rows: 1, cols: 1 },
      canvasPosition: { x: col * puzzleData.cellSize, y: row * puzzleData.cellSize },
      canvasSize: { width: puzzleData.cellSize, height: puzzleData.cellSize },
    }
  }

  const getCellClasses = (cell: TraditionalCellData, row: number, col: number) => {
    const classes = ['cell'];

    // In structure edit mode, highlight hovered cell and its symmetric partner
    if (editMode === 'structure' && hoveredCell) {
      const symmetricPos = getSymmetricPosition(hoveredCell.row, hoveredCell.col, puzzleData.rows, puzzleData.cols);
      if ((row === hoveredCell.row && col === hoveredCell.col) ||
          (row === symmetricPos.row && col === symmetricPos.col)) {
        classes.push('symmetric-highlight');
      }
    }

    // In letters mode, use normal selection/highlighting
    if (editMode === 'letters') {
      if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
        classes.push('selected');
      } else if (
        cell.cellType === 'solution' &&
        selectedCell &&
        ((cursorDirection === 'across' && row === selectedCell.row) ||
          (cursorDirection === 'down' && col === selectedCell.col))
      ) {
        classes.push('highlighted');
      }
    }

    classes.push(cell.cellType + 'Cell');
    return classes.join(' ');
  };

  function renderCell(cellData: TraditionalCellData, cellGeometry: CellGeometry) {
    const { width, height } = cellGeometry.canvasSize;

    if (cellData.cellType === 'blocked') {
      return <BlockedCell cellSize={{ width, height }} />;
    } else {
      const solutionCell = cellData as TraditionalSolutionCellData;
      return (
        <TraditionalSolutionCell
          cellSize={{ width, height }}
          solutionLetter={solutionCell.letter}
          cellNumber={solutionCell.number}
        />
      );
    }
  }

  return (
    <div className="traditionalCrosswordContainer">
      <svg style={{ "--strokeWidth": strokeWidth } as CustomCSSProperties}
        width={puzzleData.cols * puzzleData.cellSize + strokeWidth}
        height={puzzleData.rows * puzzleData.cellSize + strokeWidth}
      >
        <defs>
          {/* Clip path for cells, used by the selected cell's highlight stroke */}
          <clipPath id="cellClipPath">
            <rect x="0" y="0" width={puzzleData.cellSize} height={puzzleData.cellSize}></rect>
          </clipPath>
        </defs>

        <g transform={`translate(${strokeWidth / 2}, ${strokeWidth / 2})`}>
          {puzzleData.cells.map((row, rowIndex) =>
            row.map((cellData, colIndex) => {
              const cellGeometry = cellGeometryFactory(colIndex, rowIndex);
              const { x, y } = cellGeometry.canvasPosition;
              const { width, height } = cellGeometry.canvasSize;

              return (
                <g
                  key={`R${rowIndex}C${colIndex}`}
                  className={getCellClasses(cellData, rowIndex, colIndex)}
                  transform={`translate(${x}, ${y})`}
                >
                  <rect
                    className="cellBackground"
                    onClick={(e: MouseEvent<SVGRectElement>) => {
                      e.stopPropagation();
                      handleCellClick(rowIndex, colIndex);
                    }}
                    onMouseEnter={() => {
                      if (editMode === 'structure') {
                        setHoveredCell({ row: rowIndex, col: colIndex });
                      }
                    }}
                    onMouseLeave={() => {
                      if (editMode === 'structure') {
                        setHoveredCell(null);
                      }
                    }}
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                  ></rect>
                  <rect
                    className="highlight"
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    clipPath={`url(#cellClipPath)`}
                  ></rect>
                  {renderCell(cellData, cellGeometry)}
                </g>
              );
            })
          )}
        </g>
      </svg>

      {/* Mode switcher */}
      <div className="modeControls" style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={() => setEditMode('letters')}
          style={{
            padding: '10px 20px',
            fontWeight: editMode === 'letters' ? 'bold' : 'normal',
            backgroundColor: editMode === 'letters' ? '#4a90e2' : '#f0f0f0',
            color: editMode === 'letters' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Fyll inn bokstaver
        </button>
        <button
          onClick={() => setEditMode('structure')}
          style={{
            padding: '10px 20px',
            fontWeight: editMode === 'structure' ? 'bold' : 'normal',
            backgroundColor: editMode === 'structure' ? '#4a90e2' : '#f0f0f0',
            color: editMode === 'structure' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Rediger rutenett
        </button>
      </div>

      {/* Toast notification for errors */}
      {toggleError && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          maxWidth: '400px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {toggleError}
        </div>
      )}

      {/* Clue lists */}
      <div className="clueLists">
        <div className="clueList acrossClues">
          <h3>Vannrett</h3>
          <ul>
            {puzzleData.clues.across.map(clue => (
              <li key={clue.number}>
                <strong>{clue.number}.</strong> {clue.text}
              </li>
            ))}
          </ul>
        </div>
        <div className="clueList downClues">
          <h3>Loddrett</h3>
          <ul>
            {puzzleData.clues.down.map(clue => (
              <li key={clue.number}>
                <strong>{clue.number}.</strong> {clue.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TraditionalCrosswordPuzzle;
