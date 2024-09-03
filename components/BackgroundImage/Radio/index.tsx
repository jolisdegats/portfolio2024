import {  useEffect } from "react";
import Shape, { ShapeType } from "../Shape"
import useSound from "use-sound";
import radioMusicHappyChildren from '@/assets/happy-children.mp3'
import radioTuning from '@/assets/tuning-radio.mp3'
import radioSwitch from '@/assets/radio-switch.mp3'
import radioOn from '@/assets/radio-on.png'
import {  toggleRadio } from "@/lib/context";
import { useAppContext } from "@/lib/hooks";


export const MarkerRadio = () => {
    const { state : {isRadioOn}, dispatch } = useAppContext(); 
   
    const [playRadio, {stop : stopRadio}] = useSound(radioMusicHappyChildren);
    const [playSwitch] = useSound(radioSwitch, {volume : 0.25});
    const [playTuning, {stop : stopTuning}] = useSound(radioTuning, {volume : 0.5});

    useEffect(()=> {
const turnRadioOn = () => {
    playSwitch()
    playTuning()
    playRadio()
    setTimeout(() => {
        stopTuning()
    }, 2000)
}
const turnRadioOff = () =>{
    playSwitch()
    stopTuning()
    stopRadio()
}
    isRadioOn ? turnRadioOn() : turnRadioOff()
    }, [isRadioOn, playRadio, stopRadio, playTuning, stopTuning, playSwitch])
    const shape : ShapeType= {
    onClick:() => dispatch(toggleRadio()),
    title: 'Radio',
    type: 'rectangle',
    x:913.8689458689458 ,
    y:903.6581196581196,
    width:155.71509971509965,
    height:119.97720797720797 
 }
return <>
<Shape shape={shape} index="radio"/>
{/* TODO : Add change music shape */}
</>
}

export const ImageRadio = () => {
    const { state : {isRadioOn} } = useAppContext(); 
return isRadioOn && <image xlinkHref={radioOn.src} />
}
