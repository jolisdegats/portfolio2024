'use client'
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import Head from 'next/head';
import backgroundImage from '@/assets/main-background.webp';
import sky from '@/assets/sky.webp';
import sea from '@/assets/sea.webp';
import seaclouds from '@/assets/seaclouds.webp';


const preloadImages = [
  backgroundImage,
  sky,
  sea,
  seaclouds
];

// Dynamically import components
const Background = dynamic(() => import('@/components/BackgroundImage/Background'), {
  loading: () => <div className="w-full h-screen bg-gray-100" />,
  ssr: false
});

const ImageComponents = {
  Cat: dynamic(() => import('@/components/BackgroundImage/Cat').then(mod => ({ default: mod.ImageCat }))),
  Radio: dynamic(() => import('@/components/BackgroundImage/Radio').then(mod => ({ default: mod.ImageRadio }))),
  Phone: dynamic(() => import('@/components/BackgroundImage/Phone').then(mod => ({ default: mod.ImagePhone }))),
  Light: dynamic(() => import('@/components/BackgroundImage/Light').then(mod => ({ default: mod.ImageLight })))
};

const MarkerComponents = {
  Radio: dynamic(() => import('@/components/BackgroundImage/Radio').then(mod => ({ default: mod.MarkerRadio }))),
  Phone: dynamic(() => import('@/components/BackgroundImage/Phone').then(mod => ({ default: mod.MarkerPhone }))),
  Light: dynamic(() => import('@/components/BackgroundImage/Light').then(mod => ({ default: mod.MarkerLight }))),
  Coffee: dynamic(() => import('@/components/BackgroundImage/Coffee').then(mod => ({ default: mod.MarkerCoffee }))),
  Flowers: dynamic(() => import('@/components/BackgroundImage/Flowers')),
  Me: dynamic(() => import('@/components/BackgroundImage/Me').then(mod => ({ default: mod.MarkerMe }))),
  Cat: dynamic(() => import('@/components/BackgroundImage/Cat').then(mod => ({ default: mod.MarkerCat }))),
  Computer: dynamic(() => import('@/components/BackgroundImage/Computer'))
};

const BackgroundImage = () => {
  const [isBgLoading, setIsBgLoading] = useState(true);

  return (
    <>
      <Head>
        {/* Preload only critical images */}
        {preloadImages.map((image, index) => (
          <link
            key={index}
            rel="preload"
            href={image.src}
            as="image"
            type="image/webp"
          />
        ))}
      </Head>
      <Background onLoad={setIsBgLoading} />
      {!isBgLoading && (
        <svg
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

          {/* Images */}
          <Suspense fallback={null}>
            {Object.entries(ImageComponents).map(([key, Component]) => (
              <Component key={key} />
            ))}
          </Suspense>

          {/* Markers */}
          <Suspense fallback={null}>
            {Object.entries(MarkerComponents).map(([key, Component]) => (
              <Component key={key} />
            ))}
          </Suspense>
        </svg>
      )}
    </>
  );
};

export default BackgroundImage;