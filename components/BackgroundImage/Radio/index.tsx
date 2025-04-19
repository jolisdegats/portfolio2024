import Shape, { ShapeType } from "../Shape";
import useSound from "use-sound";
import radioMusicHappyChildren from '@/assets/sounds/happy-children.mp3';
import radioMusicShy from '@/assets/sounds/shy.mp3';
import radioMusicSmoothOperator from '@/assets/sounds/smooth-operator.mp3';
import radioMusicDreams from '@/assets/sounds/dreams.mp3';
import radioTuning from '@/assets/sounds/tuning-radio.mp3';
import radioSwitch from '@/assets/sounds/radio-switch.mp3';
import radioOn from '@/assets/radio-on.webp';
import { toggleRadio } from "@/lib/context";
import { useAppContext } from "@/lib/hooks";


export const MarkerRadio = () => {
    const { state : {isRadioOn}, dispatch } = useAppContext(); 
    const [, {sound : soundHappyChildren}] = useSound(radioMusicHappyChildren);
    const [, {sound : soundShy}] = useSound(radioMusicShy);
    const [, {sound : soundSmoothOperator}] = useSound(radioMusicSmoothOperator);
    const [, {sound : soundDreams}] = useSound(radioMusicDreams);
    const [playSwitch, {stop : stopSwitch}] = useSound(radioSwitch, {volume : 0.25});
    const [playTuning, {stop : stopTuning}] = useSound(radioTuning, {volume : 0.5});

    const musics = [soundHappyChildren, soundShy, soundSmoothOperator, soundDreams]

    const handleRadioClick = () => {
        dispatch(toggleRadio())
        musics.forEach(music => music.stop());
        if (isRadioOn) {
            playSwitch();
            stopTuning();
            musics.forEach(music => music.stop());
            return () => stopSwitch()
          } else {
            playSwitch();
            playTuning();
            musics[0].play();
            setTimeout(() => {
                stopTuning()
            }, 2000)
            return () => stopSwitch()
          }
        }


    const handleChangeMusic = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (isRadioOn) {
        playTuning();
        const currentPlayingIndex = musics.findIndex(music => music.playing());
        musics.forEach(music => music.stop());
        const nextIndex = currentPlayingIndex === -1 
          ? 0 
          : (currentPlayingIndex + 1) % musics.length; 
        
        setTimeout(() => {
          stopTuning();
          musics[nextIndex].play();
        }, 500);
      }
    }

    const shape : ShapeType= {
    onClick:handleRadioClick,
    title: 'Radio',
    type: 'rectangle',
    x:913.8689458689458 ,
    y:903.6581196581196,
    width:155.71509971509965,
    height:119.97720797720797 
 }

const shapeChangeMusic : ShapeType= {
    onClick:(e)=>handleChangeMusic(e),
    title: 'Change Music',
    type: 'rectangle',
    x:1010.8717948717948 ,
    y:970.0284900284901,
    width:48.501424501424594,
    height:43.39601139601132
}

return <>
<Shape shape={shape} index="radio"/>
{isRadioOn && <Shape shape={shapeChangeMusic} index="changeMusic"/>}
</>
}

export const ImageRadio = () => {
    const { state : {isRadioOn} } = useAppContext(); 
return <image xlinkHref={radioOn.src} className={isRadioOn ? 'opacity-100' : 'opacity-0'} />
}
