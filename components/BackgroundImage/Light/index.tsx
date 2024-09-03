import Shape, {  ShapeType } from "../Shape"
import lightOn from '../../../assets/light.png'
import {  toggleLight } from "@/lib/context";
import { useAppContext } from "@/lib/hooks";
import turnonlamp from "@/assets/turnonlamp.mp3"
import useSound from "use-sound";

export const MarkerLight = () => {
  const { dispatch } = useAppContext(); 
  const [play] = useSound(turnonlamp, {volume : 0.75});

const onClickLamp = () => {
  play();
  dispatch(toggleLight());
}

  const shape :ShapeType=  {
        onClick: onClickLamp,
        title: '',
        type: 'polygon',
        points: "1666.92 1003.21 1669.47 878.131 1631.18 860.262 1620.97 885.789 1585.23 865.367 1613.31 839.84 1641.39 850.051 1679.68 865.367 1674.58 1000.66 1695 1005.77 1700.1 1018.53 1631.18 1015.98 1631.18 1000.66",
      }
    
    return <Shape  shape={shape} index="light"/>
}

export const ImageLight = () => {
  const { state : {isLightOn} } = useAppContext(); 
  return isLightOn && <image xlinkHref={lightOn.src}  />}
