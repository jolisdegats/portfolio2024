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
      // {
      //   onClick: () => setIsLightOn(!isLightOn),
      //   title: '',
      //   type: 'polygon',
      //   points: "1666.92 1003.21 1669.47 878.131 1631.18 860.262 1620.97 885.789 1585.23 865.367 1613.31 839.84 1641.39 850.051 1679.68 865.367 1674.58 1000.66 1695 1005.77 1700.1 1018.53 1631.18 1015.98 1631.18 1000.66",
      // },
      // {
      //   onClick:() => setIsPhoneOn(!isPhoneOn),
      //   title: '',
      //   type: 'rect',
      //   x:1531.6239316239316 ,
      //   y:1003.2136752136752, width:86.79202279202286, height:12.763532763533021 
      // },
      // {
      //   onClick:() => setIsRadioOn(!isRadioOn),
      //   href: '#3',
      //   title: '',
      //   type: 'rect',
      //   x:913.8689458689458 ,
      //   y:903.6581196581196, width:155.71509971509965, height:119.97720797720797 
      // },
      {
        href: '#4',
        title: '',
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

        href: '#5',
        title: '',
        type: 'polygon',
        points: "1284.01 964.923 1268.7 998.108 1243.17 1021.08 1222.75 1003.21 1284.01 852.604 1296.77 732.627 1340.17 704.547 1391.23 717.311 1416.75 793.892 1455.04 890.895 1480.57 993.003 1480.57 1164.03 1439.73 1215.09 1406.54 1240.62 1335.07 1250.83 1337.62 1317.2 1465.25 1301.88 1447.38 1414.2 1337.62 1358.04 1271.25 1426.96 1266.14 1350.38 1235.51 1337.62 1179.35 1360.59 1187.01 1317.2 1209.98 1263.59 1171.69 1100.22 1255.93 1092.56",
      },
      {
        href: '#6',
        title: '',
        type: 'polygon',
        points: "1723.08 781.128 1832.84 763.259 2151.93 765.812 2139.17 1243.17 2037.06 1217.64 2037.06 1460.15 1835.4 1452.49 1720.52 1368.25",
      },
      {
        href: '#7',
        title: '',
        type: 'polygon',
        points:  "732.627 1324.85 901.105 1327.41 903.658 1067.03 888.342 1031.29 903.658 931.738 916.422 867.92 964.923 829.63 941.949 778.576 783.681 804.103 765.812 635.624 770.917 556.49 650.94 668.809 597.333 939.396 681.573 1018.53 684.125 1207.43",
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
        <a className="cursor-pointer" key={index} onClick={shape.onClick} href={shape.href}  target="_self" title={shape.title}>
         {shapeContent}
        </a>
      )})}
    </svg>
  );
};

export default BackgroundImage;