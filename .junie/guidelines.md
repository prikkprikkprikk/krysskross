# Project Guidelines

KryssKross is a web app for creating, sharing and solving arrow-words crossword puzzles.

## Project Structure

The app is divided into a frontend and a backend part. For now, the focus is primarily on the frontend development.

### Frontend

The frontend is built with modern React 19 and TypeScript, using Vite as the build tool. The codebase follows modern React practices and patterns:

- Functional components with hooks
- TypeScript for type safety
- React StrictMode enabled
- ESLint for code linting

#### Key Technologies and Versions
- React: 19.1.0
- TypeScript: 5.8.3
- Vite: 6.3.5
- ESLint: 9.25.0

#### Directory Structure
- `/frontend/src/`: Main source code
  - `/components/`: React components
    - `/cell-types/`: Different cell type components for the crossword
  - `/types/`: TypeScript type definitions
  - `/assets/`: Static assets

#### Component Architecture
The crossword puzzle is built using SVG components:
- `CrosswordPuzzle`: Main component that renders the grid
- Cell components (like `EmptyCell`): Render individual cells in the grid

#### Data Structures
The crossword puzzle data is structured with TypeScript interfaces:
- `CrosswordPuzzleData`: Main interface for puzzle data
- `CrosswordCell`: Union type for different cell types
- `SolutionCell`: Cell that can contain a letter
- `ClueCell`: Cell that can contain clues
- `Clue`: Interface for crossword clues

#### Build and Development
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

### Backend

The backend is implemented as a Laravel API, responsible for user management and crossword puzzle storage.

#### Key Technologies
- Laravel: Latest version
- PHP: 8.x
- MySQL/PostgreSQL for database

#### Directory Structure
Standard Laravel structure:
- `/app/`: Core application code
- `/config/`: Configuration files
- `/database/`: Migrations and seeders
- `/routes/`: API and web routes
- `/tests/`: PHPUnit tests

## Development Guidelines

### Code Style
- Use functional components with hooks for React
- Follow TypeScript best practices with proper type definitions
- Use ESLint to maintain code quality
- Follow Laravel conventions for backend code

### Git Workflow
- Create feature branches for new features
- Submit pull requests for code review
- Keep commits focused and with descriptive messages

### Testing
- Frontend: (Testing framework to be added)
- Backend: PHPUnit for Laravel tests
