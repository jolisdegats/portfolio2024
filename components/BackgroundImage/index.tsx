'use client'
import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Import critical components directly
import Background from '@/components/BackgroundImage/Background';

// Dynamically import non-critical components with loading priority
const ImageRadio = dynamic(() => import('@/components/BackgroundImage/Radio').then(mod => mod.ImageRadio), { 
  ssr: false,
  loading: () => null,
});
const MarkerRadio = dynamic(() => import('@/components/BackgroundImage/Radio').then(mod => mod.MarkerRadio), { 
  ssr: false,
  loading: () => null,
});
const ImagePhone = dynamic(() => import('@/components/BackgroundImage/Phone').then(mod => mod.ImagePhone), { 
  ssr: false,
  loading: () => null,
});
const MarkerPhone = dynamic(() => import('@/components/BackgroundImage/Phone').then(mod => mod.MarkerPhone), { 
  ssr: false,
  loading: () => null,
});
const ImageLight = dynamic(() => import('@/components/BackgroundImage/Light').then(mod => mod.ImageLight), { 
  ssr: false,
  loading: () => null,
});
const MarkerLight = dynamic(() => import('@/components/BackgroundImage/Light').then(mod => mod.MarkerLight), { 
  ssr: false,
  loading: () => null,
});
const MarkerCoffee = dynamic(() => import('@/components/BackgroundImage/Coffee').then(mod => mod.MarkerCoffee), { 
  ssr: false,
  loading: () => null,
});
const ImageCat = dynamic(() => import('@/components/BackgroundImage/Cat').then(mod => mod.ImageCat), { 
  ssr: false,
  loading: () => null,
});
const MarkerCat = dynamic(() => import('@/components/BackgroundImage/Cat').then(mod => mod.MarkerCat), { 
  ssr: false,
  loading: () => null,
});
const MarkerFlowers = dynamic(() => import('@/components/BackgroundImage/Flowers'), { 
  ssr: false,
  loading: () => null,
});
const MarkerMe = dynamic(() => import('@/components/BackgroundImage/Me').then(mod => mod.MarkerMe), { 
  ssr: false,
  loading: () => null,
});
const MarkerComputer = dynamic(() => import('@/components/BackgroundImage/Computer'), { 
  ssr: false,
  loading: () => null,
});

// Import assets with priority hints
import sky from '@/assets/sky.webp';
import sea from '@/assets/sea.webp';
import imageUrl from '@/assets/main-background.webp';

// Loading placeholder component with reduced motion
const LoadingPlaceholder = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-pulse bg-gray-200 h-32 w-32 rounded-full motion-reduce:animate-none"></div>
  </div>
);

const BackgroundImage = () => {
  const [isBgLoading, setIsBgLoading] = useState(true);

  return (<>
    <Head>
      {/* Preload critical images with priority */}
      {[sky.src, sea.src, imageUrl.src].map((src) => (
        <link
          key={src}
          rel="preload"
          href={src}
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      ))}
      {/* Add preconnect for external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
    <Background onLoad={setIsBgLoading}/>
    {!isBgLoading && (
      <svg
        className="flex justify-center items-center h-screen"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 2688 1792"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
      >
        <style>
          {`
            .image-mapper-shape {
              fill: rgba(0, 0, 0, 0);
            }
            @media (prefers-reduced-motion: reduce) {
              .animate-pulse {
                animation: none;
              }
            }
          `}
        </style>
      
        {/* IMAGES */}
        <Suspense fallback={<LoadingPlaceholder />}>
          <ImageCat />
          <ImageRadio />
          <ImagePhone />
          <ImageLight />
        </Suspense>

        {/* MARKERS */}
        <Suspense fallback={null}>
          <MarkerRadio />
          <MarkerPhone />
          <MarkerLight/>
          <MarkerCoffee/>
          <MarkerFlowers/>
          <MarkerMe/>
          <MarkerCat/>
          <MarkerComputer/>
        </Suspense>
      </svg>
    )}
  </>);
};

export default BackgroundImage;