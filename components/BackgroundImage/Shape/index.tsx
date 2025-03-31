import { useAppContext } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'; // We'll create this CSS module

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

const markerColor = '#75BABD';

const Shape = ({ shape, index }: ShapeLinkProps) => {
  const { state: { showHelpMarkers } } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);

  useEffect(() => {
    setIsVisible(showHelpMarkers);
  }, [showHelpMarkers]);

  const markerX = shape.type === 'rectangle' 
    ? shape.x + shape.width / 2 
    : getPolygonCenter(shape.points).x;
  const markerY = shape.type === 'rectangle' 
    ? shape.y + shape.height / 2 
    : getPolygonCenter(shape.points).y;
    

    useEffect(() => {
        if (!isVisible && isDisplayed) {
            setTimeout(() => setIsDisplayed(false), 500);
        }
        if(isVisible && !isDisplayed) {
          setIsDisplayed(true)
        }
    }, [isVisible, isDisplayed]);


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
        <g 
          transform={`translate(${markerX}, ${markerY})`} 
          className={`pointer-events-none ${isVisible ? styles.visible : styles.hidden} ${isDisplayed ?  '' : 'hidden'}`}
        >
          <circle r="20" fill={markerColor} className={styles.pulse} />
          <circle r="10" fill={markerColor} />
        </g>
      </g>
    </a>
  );
};

function getPolygonCenter(points: string) {
  const coordinates = points.split(' ').map(Number);
  let sumX = 0, sumY = 0;
  for (let i = 0; i < coordinates.length; i += 2) {
    sumX += coordinates[i];
    sumY += coordinates[i + 1];
  }
  return {
    x: sumX / (coordinates.length / 2),
    y: sumY / (coordinates.length / 2)
  };
}

export default Shape;
