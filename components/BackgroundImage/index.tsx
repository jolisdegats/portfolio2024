'use client'
import Background from '@/components/BackgroundImage/Background';
import { ImageRadio, MarkerRadio } from '@/components/BackgroundImage/Radio';
import { ImagePhone, MarkerPhone } from '@/components/BackgroundImage/Phone';
import { ImageLight, MarkerLight } from '@/components/BackgroundImage/Light';
import { MarkerCoffee } from '@/components/BackgroundImage/Coffee';
import { ImageCat, MarkerCat } from './Cat';
import MarkerFlowers from './Flowers';
import { MarkerMe } from './Me';
import MarkerComputer from './Computer';
import { useState } from 'react';
import Head from 'next/head';
import sky from '@/assets/sky.webp';
import sea from '@/assets/sea.webp';
import imageUrl from '@/assets/main-background.webp';
import gifCat from '@/assets/gif-cat.webp';
import gifCode from '@/assets/gif-code.webp';
import cloud1 from '@/assets/cloud1.webp';
import cloud2 from '@/assets/cloud2.webp';
import cloud3 from '@/assets/cloud3.webp';
import cloud4 from '@/assets/cloud4.webp';
import cloud5 from '@/assets/cloud5.webp';
import seaclouds from '@/assets/seaclouds.webp';
import phone from '@/assets/phone.webp';
import light from '@/assets/light.webp';
import radio from '@/assets/radio-on.webp';

const BackgroundImage = () => {
const [isBgLoading, setIsBgLoading] = useState(true);

  return (<>
  <Head>
  {/* Preload critical images */}
  {[sky.src, sea.src, imageUrl.src, gifCat.src, gifCode.src, cloud1.src, cloud2.src, cloud3.src, cloud4.src, cloud5.src, seaclouds.src, phone.src, light.src, radio.src].map((src) => (
    <link
      key={src}
      rel="preload"
      href={src}
      as="image"
      type="image/webp"
    />
  ))}
</Head>
    <Background onLoad={setIsBgLoading}/>
    {!isBgLoading && <svg
    className="flex justify-center items-center h-screen"
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
      {/* <MarkerFridge/> */}
      {/* <MarkerPoster/> */}
      <MarkerComputer/>
    </svg>}
    </>
  );
};

export default BackgroundImage;