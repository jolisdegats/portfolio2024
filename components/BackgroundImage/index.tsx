'use client'

import imageUrl from '@/assets/main-background.png';
import gifCode from '@/assets/gif-code.gif';

import Background from '@/components/BackgroundImage/Background';
import { ImageRadio, MarkerRadio } from '@/components/BackgroundImage/Radio';
import { ImagePhone, MarkerPhone } from '@/components/BackgroundImage/Phone';
import { ImageLight, MarkerLight } from '@/components/BackgroundImage/Light';
import { MarkerCoffee } from '@/components/BackgroundImage/Coffee';
import styles from "./styles.module.scss";
import { ImageCat, MarkerCat } from './Cat';
import MarkerFlowers from './Flowers';
import { MarkerMe } from './Me';

interface Shape {
  href?: string;
  title: string;
  type: 'rect' | 'polygon' | 'img';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: string;
  onClick? : () => void
  bgImgSrc?: string;
}

 interface SvgData {
  shapes: Shape[];
}


const BackgroundImage = () => {
  const svgData : SvgData = {
    shapes: [
      {
        href: 'https://github.com/jolisdegats',
        title: 'Github - Jolisdegats',
        type: 'polygon',
        points: "1243.17 1018.53 1263.59 1005.77 1278.91 987.897 1281.46 1021.08 1141.06 1018.53 1125.74 993.003 1128.3 860.262 1289.12 857.709 1263.59 875.578 1243.17 985.345 1220.19 1000.66",
      },
      {
        href: '#1',
        title: '',
        type: 'rect',
        x:781.1282051282051 ,
        y:513.0940170940171, width:160.82051282051282, height:257.8233618233618 
      }, 
      {
        href: '#6',
        title: '',
        type: 'polygon',
        points: "1723.08 781.128 1832.84 763.259 2151.93 765.812 2139.17 1243.17 2037.06 1217.64 2037.06 1460.15 1835.4 1452.49 1720.52 1368.25",
      },
     
    ],
  };

  return (<svg
    className={styles['centered-svg']}
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 2688 1792"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
         <style>
        {`
          .image-mapper-shape {
            fill: rgba(0, 0, 0, 0);
          }
        `}
      </style>
    
        {/* IMAGES */}
      <Background/>
      <image xlinkHref={imageUrl.src}  />
      <image xlinkHref={gifCode.src}  width="100%" height="100%" />
      <ImageCat />
      <ImageRadio />
      <ImagePhone />
      <ImageLight />
    

    {/* MARKERS */}
      <MarkerRadio />
      <MarkerPhone />
      <MarkerLight/>
      <MarkerCoffee/>
      <MarkerFlowers/>
      <MarkerMe/>
      <MarkerCat/>
      {svgData.shapes.map((shape, index) => {
        const shapeContent = <g>
        {shape.type === 'rect' && (
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
        
       return (
        <a className="cursor-pointer" key={index} onClick={shape.onClick} href={shape.href}  target="_blank" title={shape.title}>
         {shapeContent}
        </a>
      )})}
    </svg>
  );
};

export default BackgroundImage;