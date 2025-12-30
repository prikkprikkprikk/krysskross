import type { TraditionalCellData, TraditionalSolutionCellData } from '../types/TraditionalCrossword';
import type { Direction } from '../types/Crossword';

/**
 * Get the rotationally symmetric position for a cell (180-degree rotation)
 */
export function getSymmetricPosition(
  row: number,
  col: number,
  rows: number,
  cols: number
): { row: number; col: number } {
  return {
    row: rows - 1 - row,
    col: cols - 1 - col
  };
}

/**
 * Check if a cell has a letter filled in
 */
function cellHasLetter(cell: TraditionalCellData): boolean {
  if (cell.cellType !== 'solution') return false;
  const solutionCell = cell as TraditionalSolutionCellData;
  return solutionCell.letter.trim().length > 0;
}

/**
 * Get all cells in a word starting from a position
 */
// function getWordCells(
//   cells: TraditionalCellData[][],
//   row: number,
//   col: number,
//   direction: Direction
// ): { row: number; col: number }[] {
//   const wordCells: { row: number; col: number }[] = [];
//
//   // First, go backwards to find the start of the word
//   let startRow = row;
//   let startCol = col;
//
//   if (direction === 'across') {
//     while (startCol > 0 && cells[startRow][startCol - 1].cellType === 'solution') {
//       startCol--;
//     }
//   } else { // down
//     while (startRow > 0 && cells[startRow - 1][startCol].cellType === 'solution') {
//       startRow--;
//     }
//   }
//
//   // Now collect all cells in the word
//   if (direction === 'across') {
//     let c = startCol;
//     while (c < cells[startRow].length && cells[startRow][c].cellType === 'solution') {
//       wordCells.push({ row: startRow, col: c });
//       c++;
//     }
//   } else { // down
//     let r = startRow;
//     while (r < cells.length && cells[r][startCol].cellType === 'solution') {
//       wordCells.push({ row: r, col: startCol });
//       r++;
//     }
//   }
//
//   return wordCells;
// }

/**
 * Check if any letters are filled in for a word, excluding a specific cell
 */
// function wordHasLetters(
//   cells: TraditionalCellData[][],
//   wordCells: { row: number; col: number }[],
//   excludeRow?: number,
//   excludeCol?: number
// ): boolean {
//   return wordCells.some(pos => {
//     // Skip the excluded cell
//     if (excludeRow !== undefined && excludeCol !== undefined &&
//         pos.row === excludeRow && pos.col === excludeCol) {
//       return false;
//     }
//     return cellHasLetter(cells[pos.row][pos.col]);
//   });
// }

/**
 * Check if toggling a cell to blocked would break an existing word with letters
 * This checks if there are letters on BOTH sides of the cell being blocked
 */
function wouldBreakWord(
  cells: TraditionalCellData[][],
  row: number,
  col: number,
  direction: Direction
): boolean {
  if (direction === 'across') {
    // Check cells to the left
    let hasLettersOnLeft = false;
    for (let c = col - 1; c >= 0; c--) {
      if (cells[row][c].cellType === 'blocked') break;
      if (cellHasLetter(cells[row][c])) {
        hasLettersOnLeft = true;
        break;
      }
    }

    // Check cells to the right
    let hasLettersOnRight = false;
    for (let c = col + 1; c < cells[row].length; c++) {
      if (cells[row][c].cellType === 'blocked') break;
      if (cellHasLetter(cells[row][c])) {
        hasLettersOnRight = true;
        break;
      }
    }

    // Only "breaks" if there are letters on BOTH sides
    return hasLettersOnLeft && hasLettersOnRight;
  } else { // down
    // Check cells above
    let hasLettersAbove = false;
    for (let r = row - 1; r >= 0; r--) {
      if (cells[r][col].cellType === 'blocked') break;
      if (cellHasLetter(cells[r][col])) {
        hasLettersAbove = true;
        break;
      }
    }

    // Check cells below
    let hasLettersBelow = false;
    for (let r = row + 1; r < cells.length; r++) {
      if (cells[r][col].cellType === 'blocked') break;
      if (cellHasLetter(cells[r][col])) {
        hasLettersBelow = true;
        break;
      }
    }

    // Only "breaks" if there are letters on BOTH sides
    return hasLettersAbove && hasLettersBelow;
  }
}

/**
 * Validation result for cell toggle
 */
export interface ToggleValidation {
  canToggle: boolean;
  reason?: string;
}

/**
 * Validate if a cell can be toggled between solution and blocked
 */
export function validateCellToggle(
  cells: TraditionalCellData[][],
  row: number,
  col: number
): ToggleValidation {
  const rows = cells.length;
  const cols = cells[0]?.length || 0;
  const cell = cells[row][col];
  const symmetricPos = getSymmetricPosition(row, col, rows, cols);
  const symmetricCell = cells[symmetricPos.row][symmetricPos.col];

  // Check if this cell is its own symmetric partner (center cell in odd-sized grids)
  const isCenterCell = (row === symmetricPos.row && col === symmetricPos.col);

  // Case 1: Trying to toggle a solution cell to blocked
  if (cell.cellType === 'solution') {
    // Check if this cell has a letter
    if (cellHasLetter(cell)) {
      return {
        canToggle: false,
        reason: 'Kan ikke blokkere en celle med en bokstav'
      };
    }

    // Check if symmetric cell has a letter (only if it's not the same cell)
    if (!isCenterCell && symmetricCell.cellType === 'solution' && cellHasLetter(symmetricCell)) {
      return {
        canToggle: false,
        reason: 'Kan ikke blokkere: symmetrisk celle har en bokstav'
      };
    }

    // Check if this would break an across word
    const breaksAcross = wouldBreakWord(cells, row, col, 'across');
    console.log(`Cell (${row},${col}) breaks across:`, breaksAcross);
    if (breaksAcross) {
      return {
        canToggle: false,
        reason: 'Kan ikke blokkere: vil bryte et vannrett ord med bokstaver'
      };
    }

    // Check if this would break a down word
    const breaksDown = wouldBreakWord(cells, row, col, 'down');
    console.log(`Cell (${row},${col}) breaks down:`, breaksDown);
    if (breaksDown) {
      return {
        canToggle: false,
        reason: 'Kan ikke blokkere: vil bryte et loddrett ord med bokstaver'
      };
    }

    // Check if symmetric cell would break words (only if it's a different cell)
    // Important: We need to check the symmetric cell in the context where
    // the original cell is already blocked (simulated state)
    if (!isCenterCell && symmetricCell.cellType === 'solution') {
      // Create a simulated grid with the original cell blocked
      const simulatedCells = cells.map(r => [...r]);
      simulatedCells[row][col] = {
        position: { row, col },
        cellType: 'blocked'
      };

      const symBreaksAcross = wouldBreakWord(simulatedCells, symmetricPos.row, symmetricPos.col, 'across');
      console.log(`Symmetric cell (${symmetricPos.row},${symmetricPos.col}) breaks across:`, symBreaksAcross);
      if (symBreaksAcross) {
        return {
          canToggle: false,
          reason: 'Kan ikke blokkere: symmetrisk celle vil bryte et vannrett ord'
        };
      }
      const symBreaksDown = wouldBreakWord(simulatedCells, symmetricPos.row, symmetricPos.col, 'down');
      console.log(`Symmetric cell (${symmetricPos.row},${symmetricPos.col}) breaks down:`, symBreaksDown);
      if (symBreaksDown) {
        return {
          canToggle: false,
          reason: 'Kan ikke blokkere: symmetrisk celle vil bryte et loddrett ord'
        };
      }
    }
  }

  // Case 2: Trying to toggle a blocked cell to solution
  // This is generally safe - we're adding cells, not removing them
  // No validation needed for this case

  return { canToggle: true };
}

/**
 * Toggle a cell and its symmetric partner between solution and blocked
 * Returns the new grid, or null if the toggle is invalid
 */
export function toggleCellWithSymmetry(
  cells: TraditionalCellData[][],
  row: number,
  col: number
): TraditionalCellData[][] | null {
  const validation = validateCellToggle(cells, row, col);

  if (!validation.canToggle) {
    console.warn('Cannot toggle cell:', validation.reason);
    return null;
  }

  const rows = cells.length;
  const cols = cells[0]?.length || 0;
  const cell = cells[row][col];
  const symmetricPos = getSymmetricPosition(row, col, rows, cols);

  // Create new grid
  const newCells = cells.map(r => [...r]);

  // Toggle the cell
  if (cell.cellType === 'solution') {
    // Change to blocked
    newCells[row][col] = {
      position: { row, col },
      cellType: 'blocked'
    };
    // Also toggle symmetric cell
    newCells[symmetricPos.row][symmetricPos.col] = {
      position: symmetricPos,
      cellType: 'blocked'
    };
  } else {
    // Change to solution
    newCells[row][col] = {
      position: { row, col },
      cellType: 'solution',
      letter: ' '
    };
    // Also toggle symmetric cell
    newCells[symmetricPos.row][symmetricPos.col] = {
      position: symmetricPos,
      cellType: 'solution',
      letter: ' '
    };
  }

  return newCells;
}
