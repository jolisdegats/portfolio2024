

import cloud1 from '../../../assets/cloud1.png'
import cloud2 from '../../../assets/cloud2.png'
import cloud3 from '../../../assets/cloud3.png'
import cloud4 from '../../../assets/cloud4.png'
import cloud5 from '../../../assets/cloud5.png'
import sea from '../../../assets/sea.png'
import seaclouds from '../../../assets/seaclouds.png'
import sky from '../../../assets/sky.png'
import { useSpring, useSprings, animated } from 'react-spring';

const Background = () =>{


const getRandomDuration = () => {
    return Math.random() * 240 + 120; // Generates a random number between 120 and 360
  };

const AnimatedImage = animated.image;

const cloudImages = [cloud1, cloud2, cloud3, cloud4, cloud5];

const cloudSprings = useSprings(
  cloudImages.length,
  cloudImages.map(() => ({
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(100%)' },
    config: { duration: getRandomDuration() * 2000, easing: (t) => t },
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
return  <>
<image xlinkHref={sky.src}/>
<image xlinkHref={sea.src}/>
<AnimatedImage xlinkHref={seaclouds.src} style={seaCloudsProps} />
<AnimatedImage xlinkHref={seaclouds.src} style={seaCloudsPropsDelayed} />
{cloudSprings.map((props, index) => (
  <AnimatedImage
    key={cloudImages[index].src}
    xlinkHref={cloudImages[index].src}
    id={`cloud${index + 1}`}
    style={props}
  />
))}
</>

}

export default Background;