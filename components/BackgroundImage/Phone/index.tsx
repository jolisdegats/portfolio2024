import Shape, {  ShapeType } from "../Shape"
import phoneOn from '../../../assets/phone.png'
import {  togglePhone } from "@/lib/context";
import { useAppContext } from "@/lib/hooks";


export const MarkerPhone = () => {
    const { dispatch } = useAppContext(); 
    const shape : ShapeType= {
        type:"rectangle",
        onClick:() => dispatch(togglePhone()),
        title: '',
        x:1531.6239316239316 ,
        y:1003.2136752136752, 
        width:86.79202279202286,
        height:12.763532763533021 
    }
    return <Shape shape={shape} index="phone"/>
}

export const ImagePhone = ()=>{
    const { state : {isPhoneOn} } = useAppContext(); 
   return  isPhoneOn && <image xlinkHref={phoneOn.src}  />}
