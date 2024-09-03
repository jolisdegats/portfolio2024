
import Shape, {  ShapeType } from "../Shape"
import { useAppContext } from "@/lib/hooks";
import { changeModal } from "@/lib/context/ actions";
import useSound from "use-sound";
import mug from '@/assets/mug.mp3'
import Modal from "@/components/Modal";


export const MarkerCoffee = () => {
    const { dispatch } = useAppContext(); 
    const [play] = useSound(mug);

    const onClickOnMug = () => {
        play();
        dispatch(changeModal({name : "coffee"}));
    }

    const shape : ShapeType= {
        type:"rectangle",
        onClick:onClickOnMug,
        title: 'coffee',
        x:1493.3333333333333,
        y:957.2649572649573,
        width:40.84330484330485,
        height:43.39601139601143 
          
    }
    return <>
    <Modal>MODAL COFFEE</Modal>
    <Shape shape={shape} index="phone"/>
    </>
}