import Shape, { ShapeType } from "../Shape";
import { useAppContext } from "@/lib/hooks";
import { changeModal } from "@/lib/context/ actions";
import useSound from "use-sound";
import mug from '@/assets/sounds/mug.mp3';
import Modal from "@/components/Modal";
import CoffeeMachine, { type CoffeeMachineRef, type HandleStateChange } from "@/components/CoffeeMachine";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import Mug from "@/components/CoffeeMachine/Mug";

export const MarkerCoffee = () => {
    const { dispatch } = useAppContext(); 
    const [play] = useSound(mug);
    const coffeMachineRef = useRef<CoffeeMachineRef>(null);
    const [gameState, setGameState] = useState<HandleStateChange>({ gameState: 'OFF', objective: 0, message: '', result: '', coffeeHeight: 0 });

    const onClickOnMug = () => {
        play();
        dispatch(changeModal({name : "coffee"}));
    }

    const handleStateChange = (newState: Partial<HandleStateChange>) => {
        setGameState(prevState => ({ ...prevState, ...newState }));
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
    <Modal handleClose={() => coffeMachineRef.current?.resetGame({gameState: 'OFF'})}>
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
               
                {gameState.gameState === 'END' && (
                    <div className={styles.endGameContainer}>
                         <div className={styles.mugContainerRelative}>
                        <div className={styles.mugContainer}>
                            <Mug onClickOnMug={() => coffeMachineRef.current?.resetGame({gameState: 'RUN',shouldGetNewObjective:true})} coffeeHeight={gameState.coffeeHeight/100} />
                        </div>
                        </div>
                        
                    </div>
                )}
                {gameState.message && (
                    <p className={styles.messageUnderMug}>{gameState.message}</p>
                )}
            </div>
            <div className={styles.game}>
            <CoffeeMachine ref={coffeMachineRef} handleStateChange={handleStateChange} hideControls/>
            </div>
        </div>
    </Modal>
    <Shape shape={shape} index="phone"/>
    </>
}