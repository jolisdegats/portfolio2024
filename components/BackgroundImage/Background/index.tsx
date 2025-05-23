import Image from 'next/image';
import { motion } from "motion/react";

import imageUrl from '@/assets/main-background.webp';
import gifCode from '@/assets/gif-code.webp';
import cloud1 from '@/assets/cloud1.webp';
import cloud2 from '@/assets/cloud2.webp';
import cloud3 from '@/assets/cloud3.webp';
import cloud4 from '@/assets/cloud4.webp';
import cloud5 from '@/assets/cloud5.webp';
import sea from '@/assets/sea.webp';
import seaclouds from '@/assets/seaclouds.webp';
import sky from '@/assets/sky.webp';

const Background = ({onLoad}: {onLoad: (isLoading: boolean) => void}) => {
  const getRandomDuration = () => {
    return Math.random() * 240 + 120;
  };

  const cloudImages = [cloud1, cloud2, cloud3, cloud4, cloud5];

  return (
    <div className='z-[-10] absolute top-0 left-0 w-full h-full'>
      <Image priority src={sky} alt="sky" fill className='object-cover'/>
      <Image priority src={sea} alt="sea" fill className='object-cover'/>
      <Image priority src={seaclouds} alt="seaclouds" fill className='object-cover'/>
      <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* <motion.image
          href={seaclouds.src}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          animate={{
            x: ['0%', '100%']
          }}
          transition={{
            duration: 500,
            ease: 'linear',
            repeat: Infinity,
          }}
        /> */}
        <motion.image
          href={seaclouds.src}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          initial={{ x: '-100%' }}
          animate={{
            x: ['0%', '100%']
          }}
          transition={{
            duration: 500,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
        {cloudImages.map((cloud, index) => (
          <motion.image
            key={cloud.src}
            href={cloud.src}
            id={`cloud${index + 1}`}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            animate={{
              x: ['0%', '100%']
            }}
            transition={{
              duration: getRandomDuration() * 2,
              ease: 'linear',
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
      <Image 
        placeholder='blur' 
        priority 
        src={imageUrl} 
        alt="imageUrl" 
        fill 
        className='object-cover' 
        onLoad={() => onLoad(false)}
        sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 100vw"
        quality={90}
      />
      <Image unoptimized priority src={gifCode} alt="gifCode" fill className='object-cover'/>
    </div>
  );
}

export default Background;