'use client'
import Background from '@/components/BackgroundImage/Background';
import { ImageRadio, MarkerRadio } from '@/components/BackgroundImage/Radio';
import { ImagePhone, MarkerPhone } from '@/components/BackgroundImage/Phone';
import { ImageLight, MarkerLight } from '@/components/BackgroundImage/Light';
import { MarkerCoffee } from '@/components/BackgroundImage/Coffee';
import styles from "./styles.module.scss";
import { ImageCat, MarkerCat } from './Cat';
import MarkerFlowers from './Flowers';
import { MarkerMe } from './Me';
import MarkerComputer from './Computer';
import MarkerFridge from './Fridge';
import MarkerPoster from './Poster';
import { useState } from 'react';

const BackgroundImage = () => {
const [isBgLoading, setIsBgLoading] = useState(true);

  return (<>
    <Background onLoad={setIsBgLoading}/>
 <svg
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
      <MarkerFridge/>
      <MarkerPoster/>
      <MarkerComputer/>
    </svg>
    </>
  );
};

export default BackgroundImage;