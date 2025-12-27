import type { TraditionalCellData, TraditionalSolutionCellData } from '../types/TraditionalCrossword';
import type { Direction } from '../types/Crossword';

/**
 * Determines if a cell is the start of a word in the given direction
 */
function isWordStart(
  cells: TraditionalCellData[][],
  row: number,
  col: number,
  direction: Direction
): boolean {
  const cell = cells[row][col];

  // Only solution cells can start words
  if (cell.cellType !== 'solution') {
    return false;
  }

  if (direction === 'across') {
    // It's a word start if:
    // 1. It's at the left edge OR the cell to the left is blocked
    const isAtEdge = col === 0;
    const prevIsBlocked = !isAtEdge && cells[row][col - 1].cellType === 'blocked';

    // 2. AND there's at least one more solution cell to the right
    const hasNextCell = col + 1 < cells[row].length && cells[row][col + 1].cellType === 'solution';

    return (isAtEdge || prevIsBlocked) && hasNextCell;
  } else { // down
    // It's a word start if:
    // 1. It's at the top edge OR the cell above is blocked
    const isAtEdge = row === 0;
    const prevIsBlocked = !isAtEdge && cells[row - 1][col].cellType === 'blocked';

    // 2. AND there's at least one more solution cell below
    const hasNextCell = row + 1 < cells.length && cells[row + 1][col].cellType === 'solution';

    return (isAtEdge || prevIsBlocked) && hasNextCell;
  }
}

/**
 * Numbers all cells in a traditional crossword puzzle grid.
 * Returns a new grid with numbers assigned to cells that start words.
 */
export function numberCells(cells: TraditionalCellData[][]): TraditionalCellData[][] {
  let currentNumber = 1;
  const numberedCells: TraditionalCellData[][] = [];

  for (let row = 0; row < cells.length; row++) {
    numberedCells[row] = [];
    for (let col = 0; col < cells[row].length; col++) {
      const cell = cells[row][col];

      if (cell.cellType === 'blocked') {
        numberedCells[row][col] = cell;
        continue;
      }

      // Check if this cell starts any words
      const startsAcross = isWordStart(cells, row, col, 'across');
      const startsDown = isWordStart(cells, row, col, 'down');

      if (startsAcross || startsDown) {
        // Assign number to this cell
        numberedCells[row][col] = {
          ...cell,
          number: currentNumber
        } as TraditionalSolutionCellData;
        currentNumber++;
      } else {
        // Cell doesn't start a word - ensure it has no number
        const solutionCell = cell as TraditionalSolutionCellData;
        numberedCells[row][col] = {
          ...solutionCell,
          number: undefined
        };
      }
    }
  }

  return numberedCells;
}

/**
 * Gets the word starting at a specific cell in a given direction
 */
export function getWordFromCell(
  cells: TraditionalCellData[][],
  row: number,
  col: number,
  direction: Direction
): { row: number; col: number }[] {
  const word: { row: number; col: number }[] = [];

  if (direction === 'across') {
    let c = col;
    while (c < cells[row].length && cells[row][c].cellType === 'solution') {
      word.push({ row, col: c });
      c++;
    }
  } else { // down
    let r = row;
    while (r < cells.length && cells[r][col].cellType === 'solution') {
      word.push({ row: r, col });
      r++;
    }
  }

  return word;
}

/**
 * Finds the next solution cell in the given direction, skipping blocked cells
 */
export function findNextSolutionCell(
  cells: TraditionalCellData[][],
  currentRow: number,
  currentCol: number,
  direction: Direction
): { row: number; col: number } | null {
  const rows = cells.length;
  const cols = cells[0]?.length || 0;

  if (direction === 'across') {
    // Move right
    for (let c = currentCol + 1; c < cols; c++) {
      if (cells[currentRow][c].cellType === 'solution') {
        return { row: currentRow, col: c };
      }
    }
  } else { // down
    // Move down
    for (let r = currentRow + 1; r < rows; r++) {
      if (cells[r][currentCol].cellType === 'solution') {
        return { row: r, col: currentCol };
      }
    }
  }

  return null;
}

/**
 * Finds the previous solution cell in the given direction, skipping blocked cells
 */
export function findPrevSolutionCell(
  cells: TraditionalCellData[][],
  currentRow: number,
  currentCol: number,
  direction: Direction
): { row: number; col: number } | null {
  if (direction === 'across') {
    // Move left
    for (let c = currentCol - 1; c >= 0; c--) {
      if (cells[currentRow][c].cellType === 'solution') {
        return { row: currentRow, col: c };
      }
    }
  } else { // down
    // Move up
    for (let r = currentRow - 1; r >= 0; r--) {
      if (cells[r][currentCol].cellType === 'solution') {
        return { row: r, col: currentCol };
      }
    }
  }

  return null;
}
