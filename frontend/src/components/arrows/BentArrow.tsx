import type {Dimensions} from "../../types";
import type {Direction, Location} from "../../types/Crossword.ts";
import type {ClueLayout} from "../../types/CellGeometry.ts";

export interface BentArrowProps {
  location: Location;
  layout: ClueLayout;
  direction: Direction;
  cellSize: Dimensions;
}

function BentArrow({ location, layout, direction, cellSize }: BentArrowProps) {
  const { width, height } = cellSize;
  const clueHeight = layout.dimensions.height;

  function getTransform() {
    if (location === 'below' && direction === 'across') {
      return `scale(-1, 1) rotate(90) translate(${-height + clueHeight}, 0)`;
    } else if (location === 'above' && direction === 'across') {
      return `rotate(-90) translate(-${width}, 0)`;
    } else if (location === 'left' && direction === 'down') {
      return `scale(-1, 1) translate(-${width}, 0)`
    }
  }

  return (
    <g className="arrow">
      <path d={`M${width},5 L${width+6},5 L${width+6},12`}
            transform={getTransform()}
            fill="none"
            stroke="black"
            strokeWidth="--var(strokeWidth)"
            markerEnd="url(#arrowhead)"
            data-direction={direction}
      />
    </g>
    )
}

export default BentArrow;
