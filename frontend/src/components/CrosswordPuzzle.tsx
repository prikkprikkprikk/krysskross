// import { useState } from 'react'
import type {Direction, CrosswordPuzzleData, CellType} from "../types/Crossword.ts";
import Cell from "./Cell"
import { useCallback, useEffect, useState } from "react";
import type {CellGeometry} from "../types";

interface CrosswordPuzzleProps {
  puzzleData: CrosswordPuzzleData;
}

function CrosswordPuzzle(puzzleProps: CrosswordPuzzleProps) {

  const puzzleData = puzzleProps.puzzleData;
  const strokeWidth = 1.5;
  const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);
  const [cursorDirection, setCursorDirection] = useState<Direction>('across');

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case ' ':
        {
          const newCursorDirection = cursorDirection === 'across' ? 'down' : 'across';
          setCursorDirection(newCursorDirection);
          break;
        }
    }
  }, [puzzleData, cursorDirection])

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
    <svg style={{"--strokeWidth": strokeWidth} as React.CSSProperties}
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
        {puzzleData.cells.map(cellData=> {
          const { row: rowIndex, col: colIndex } = cellData.position;
            return (<Cell
              key={`R${rowIndex}C${colIndex}`}
              cellData={cellData}
              cellGeometry={cellGeometryFactory(colIndex, rowIndex)}
              className={getCellClasses(cellData.cellType, rowIndex, colIndex)}
              onCellClick={handleCellClick}
            />)
        })}
      </g>
    </svg>
  );

}

export default CrosswordPuzzle;
