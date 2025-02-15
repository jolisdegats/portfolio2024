import Image from 'next/image';

import imageUrl from '@/assets/main-background.png';
import gifCode from '@/assets/gif-code.gif';
import cloud1 from '../../../assets/cloud1.png';
import cloud2 from '../../../assets/cloud2.png';
import cloud3 from '../../../assets/cloud3.png';
import cloud4 from '../../../assets/cloud4.png';
import cloud5 from '../../../assets/cloud5.png';
import sea from '../../../assets/sea.png';
import seaclouds from '../../../assets/seaclouds.png';
import sky from '../../../assets/sky.png';
import { useSpring, useSprings, animated } from 'react-spring';

const Background = () =>{


const getRandomDuration = () => {
    return Math.random() * 240 + 120; // Generates a random number between 120 and 360
  };

const AnimatedSVGImage = animated('image');

const cloudImages = [cloud1, cloud2, cloud3, cloud4, cloud5];

const cloudSprings = useSprings(
  cloudImages.length,
  cloudImages.map(() => ({
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(100%)' },
    config: { duration: getRandomDuration() * 2000, easing: (t:number) => t },
    loop: true,
    reverse: false
  }))
)

const seaCloudsProps = useSpring({
  from: { transform: `translateX(0%)` },
  to: { transform: `translateX(100%)` },
  config: { duration: 500000, easing: (t) => t },
  loop: true,
});

const seaCloudsPropsDelayed = useSpring({
  from: { transform: `translateX(-100%)` },
  to: { transform: `translateX(0%)` },
  config: { duration: 500000, easing: (t) => t },
  loop: true,
});
return  <div className='z-[-10] absolute top-0 left-0 w-full h-full'>
<Image rel="preload" src={sky} alt="sky" fill className='object-cover'/>
<Image rel="preload" src={sea} alt="sea" fill className='object-cover'/>
<svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
  <AnimatedSVGImage
    href={seaclouds.src}
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
    // style={seaCloudsProps}
  />
  <AnimatedSVGImage
    href={seaclouds.src}
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid slice"
    // style={seaCloudsPropsDelayed}
  />
  {cloudSprings.map((props, index) => (
    <AnimatedSVGImage
      key={cloudImages[index].src}
      href={cloudImages[index].src}
      id={`cloud${index + 1}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={props}
    />
  ))}
</svg>
      <Image rel="preload" src={imageUrl} alt="imageUrl" fill className='object-cover'/>
      <Image rel="preload" src={gifCode} alt="gifCode" fill className='object-cover'/>
</div>

}

export default Background;