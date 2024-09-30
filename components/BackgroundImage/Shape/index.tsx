import React from 'react';

interface CommonShapeProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  title?: string;
}

interface RectangleShapeType extends CommonShapeProps {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PolygonShapeType extends CommonShapeProps {
  type: 'polygon';
  points: string;
}

export type ShapeType = RectangleShapeType | PolygonShapeType;

export type ShapeLinkProps = {
  shape: ShapeType;
  index: number | string;
};

const Shape = ({ shape, index }: ShapeLinkProps) => {
  return (
    <a className="cursor-pointer" key={index} target="_self" {...shape} style={{zIndex : 10, ...shape.style}}>
      <g>
        {shape.type === 'rectangle' && (
          <rect
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            className="image-mapper-shape"
            data-index={index}
          />
        )}
        {shape.type === 'polygon' && (
          <polygon
            className="image-mapper-shape"
            data-index={index}
            points={shape.points}
          />
        )}
      </g>
    </a>
  );
};

export default Shape;
