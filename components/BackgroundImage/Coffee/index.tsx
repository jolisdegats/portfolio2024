
import Shape, { ShapeType } from "../Shape";
import { useAppContext } from "@/lib/hooks";
import { changeModal } from "@/lib/context/ actions";
import useSound from "use-sound";
import mug from '@/assets/mug.mp3';
import Modal from "@/components/Modal";
import CoffeeMachine from "@/components/CoffeeGame/CoffeeMachine";
import styles from "./styles.module.scss";
import { useState } from "react";

export const MarkerCoffee = () => {
    const { dispatch } = useAppContext(); 
    const [play] = useSound(mug);
    const [gameState, setGameState] = useState({ objective: 0, message: '', result: '' });

    const onClickOnMug = () => {
        play();
        dispatch(changeModal({name : "coffee"}));
    }

    const handleGameStateChange = (newState: { objective: number; message: string; result: string }) => {
        setGameState(newState);
    };

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
    <Modal>
        <div className={styles.gameModal}>
            <div className={styles.gameInfo}>
                <h2>Want some coffee?</h2>
                <p>Let&apos;s play a little game. Start the coffee machine to start.</p>
                <p>You must fill the mug with coffee.</p>
                {gameState.objective > 0 && (
                    <p>Fill the coffee cup to {gameState.objective}%</p>
                )}
                {gameState.result && (
                    <p>{gameState.result}</p>
                )}
                {gameState.message && (
                    <p>{gameState.message}</p>
                )}
            </div>
            <div className={styles.game}>
            <CoffeeMachine onStateChange={handleGameStateChange} hideControls/>
            </div>
        </div>
    </Modal>
    <Shape shape={shape} index="phone"/>
    </>
}