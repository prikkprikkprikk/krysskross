import type {Direction, CrosswordPuzzleData, CellType} from "../types/Crossword.ts";
import Cell from "./Cell"
import { useCallback, useEffect, useState } from "react";
import type {CSSProperties} from "react";
import type {CellGeometry} from "../types";

interface CrosswordPuzzleProps {
  puzzleData: CrosswordPuzzleData;
}

interface CustomCSSProperties extends CSSProperties {
  '--strokeWidth': number | string;
}

function CrosswordPuzzle(puzzleProps: CrosswordPuzzleProps) {

  const [puzzleData, setPuzzleData] = useState<CrosswordPuzzleData>(puzzleProps.puzzleData);
  const strokeWidth = 1.5;
  const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);
  const [cursorDirection, setCursorDirection] = useState<Direction>('across');

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ";

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

      // After updating the cell, we'll move to the next cell
      // This is handled separately to avoid circular dependencies
    }
  }, [puzzleData, selectedCell]);

  // Function to move to the next cell based on cursor direction
  const moveToNextCell = useCallback(() => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const { rows, cols } = puzzleData;

    if (cursorDirection === 'across') {
      if (col + 1 < cols) {
        setSelectedCell({ row, col: col + 1 });
      }
    } else { // down
      if (row + 1 < rows) {
        setSelectedCell({ row: row + 1, col });
      }
    }
  }, [selectedCell, puzzleData, cursorDirection]);

  // Function to move to the previous cell based on cursor direction
  const moveToPrevCell = useCallback(() => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;

    if (cursorDirection === 'across') {
      if (col - 1 >= 0) {
        setSelectedCell({ row, col: col - 1 });
      }
    } else { // down
      if (row - 1 >= 0) {
        setSelectedCell({ row: row - 1, col });
      }
    }
  }, [selectedCell, cursorDirection]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
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
      if (col + 1 < puzzleData.cols) {
        setSelectedCell({ row, col: col + 1 });
      }
    } else if (key === 'ArrowLeft') {
      if (cursorDirection === 'down') {
        setCursorDirection('across');
      }
      if (col - 1 >= 0) {
        setSelectedCell({ row, col: col - 1 });
      }
    } else if (key === 'ArrowDown') {
      if (cursorDirection === 'across') {
        setCursorDirection('down');
      }
      if (row + 1 < puzzleData.rows) {
        setSelectedCell({ row: row + 1, col });
      }
    } else if (key === 'ArrowUp') {
      if (cursorDirection === 'across') {
        setCursorDirection('down');
      }
      if (row - 1 >= 0) {
        setSelectedCell({ row: row - 1, col });
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
  }, [puzzleData, selectedCell, cursorDirection, updateCellLetter, moveToPrevCell, moveToNextCell])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown])

  const handleCellClick = useCallback((row: number, col: number) => {
    const newSelectedCell = { row: row, col: col }
    setSelectedCell(newSelectedCell)
  }, [])

  function cellGeometryFactory(col: number, row: number) : CellGeometry {
    return {
      position: { row, col },
      span: { rows: 1, cols: 1 },
      canvasPosition: {x: col * puzzleData.cellSize, y: row * puzzleData.cellSize },
      canvasSize: { width: puzzleData.cellSize, height: puzzleData.cellSize },
    }
  }

  const getCellClasses = (cellType: CellType, row: number, col: number) => {
    const classes = ['cell'];
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      classes.push('selected');
    } else if (
      (cursorDirection === 'across' && row === selectedCell?.row) ||
      (cursorDirection === 'down' && col === selectedCell?.col)
    ) {
      classes.push('highlighted');
    }
    classes.push(cellType + "Cell");
    return classes.join(' ');
  }

  return (
    <svg style={{"--strokeWidth": strokeWidth} as CustomCSSProperties}
      width={puzzleData.cols * puzzleData.cellSize + strokeWidth}
      height={puzzleData.rows * puzzleData.cellSize + strokeWidth}
    >
      <defs>
        {/* Clip path for cells, used by the selected cell's highlight stroke */}
        <clipPath id="cellClipPath">
          <rect x="0" y="0" width={puzzleData.cellSize} height={puzzleData.cellSize}></rect>
        </clipPath>
        {/* Empty cell */}
        <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M0,10 L10,0 M-1,1 L1,-1 M9,11 L11,9"
              style={{ stroke: 'black', strokeWidth: strokeWidth }} />
        </pattern>
        {/* Arrowhead */}
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse">
          <path d="M 0 0 L 7 5 L 0 10 z" />
        </marker>
      </defs>

      <g transform={`translate(${strokeWidth/2}, ${strokeWidth/2})`}>
        {puzzleData.cells.map((row, rowIndex) =>
          row.map((cellData, colIndex) => (
            <Cell
              key={`R${rowIndex}C${colIndex}`}
              cellData={cellData}
              cellGeometry={cellGeometryFactory(colIndex, rowIndex)}
              className={getCellClasses(cellData.cellType, rowIndex, colIndex)}
              onCellClick={handleCellClick}
            />
          ))
        )}
      </g>
    </svg>
  );

}

export default CrosswordPuzzle;
