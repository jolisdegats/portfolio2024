import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import styles from './styles.module.scss';
import classnames from "classnames";
import useSound from 'use-sound';
import coffeeMachineOnOff from '../../assets/sounds/coffee-machine-on-off.mp3';
import coffeePouring from '../../assets/sounds/coffee-pouring.mp3';
import coffeePouringEnd from '../../assets/sounds/coffee-pouring-end3.mp3';
import mugServed from '../../assets/sounds/mug-served.mp3';
import Mug from './Mug';

export interface HandleStateChange {
  gameState: GameState;
  objective: number;
  message: string;
  result: string;
  coffeeHeight: number;
}

interface CoffeeMachineProps {
  handleStateChange?: (state: Partial<HandleStateChange>) => void;
  hideControls?: boolean;
}

export type GameState = 'END' | 'RUN' | 'PAUSED' | 'OFF';

export interface CoffeeMachineRef {
  resetGame: (params: ResetGameParams) => void;
}

interface ResetGameParams {
  gameState?: GameState;
  shouldGetNewObjective?: boolean;
}

const CoffeeMachine = forwardRef<CoffeeMachineRef, CoffeeMachineProps>(({ handleStateChange, hideControls = false }, ref) => {
  const coffeeRef = useRef<HTMLDivElement>(null);
  const mugRef = useRef<HTMLDivElement>(null);
  const [playCoffeeMachineOnOff] = useSound(coffeeMachineOnOff);
  const [playCoffeePouring, { stop: stopCoffeePouringSound }] = useSound(coffeePouring);
  const [playCoffeePouringEnd] = useSound(coffeePouringEnd);
  const [playMugServed] = useSound(mugServed);

  const [gameState, setGameState] = useState<GameState>('OFF');
  const [objective, setObjective] = useState(0);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [coffeeHeight, setCoffeeHeight] = useState(0);

  const SPEED_IN_MS = 50;

  const stopCoffeePouring = useCallback(() => {
    if (coffeeHeight > 0 && gameState === 'RUN') {
      playCoffeePouringEnd();
      stopCoffeePouringSound();
    }
  }, [stopCoffeePouringSound, playCoffeePouringEnd, coffeeHeight, gameState]);

  const calculatePercentage = useCallback((): number => {
    return mugRef.current ? Math.round((coffeeHeight / mugRef.current.clientHeight) * 100) : 0;
  }, [coffeeHeight]);

  const resetGame = useCallback(({gameState = 'PAUSED', shouldGetNewObjective = false} : ResetGameParams) => {
    const newObjective = shouldGetNewObjective ? Math.floor(Math.random() * 100) : 0;
    stopCoffeePouring()
    setCoffeeHeight(0);
    setResult('');
    setMessage('');
    setObjective(newObjective);
    setGameState(gameState);
    handleStateChange?.({gameState, coffeeHeight: 0, objective: newObjective, result: '', message: '' });
  }, [handleStateChange, stopCoffeePouring]);

  useImperativeHandle(ref, () => ({
    resetGame
  }));

  const setNewObjective = useCallback(() => {
    const newObjective = Math.floor(Math.random() * 100);
    setObjective(newObjective);
    handleStateChange?.({ objective: newObjective });
  }, [handleStateChange]);

  const handleBtnOff = useCallback(() => {
    if (gameState !== 'END') {
      playCoffeeMachineOnOff();
    }
    resetGame({gameState: 'OFF'});
    setGameState('OFF');
  }, [gameState, playCoffeeMachineOnOff, resetGame]);

  const handleBtnOn = useCallback(() => {
    stopCoffeePouring();
    if (gameState === 'OFF') {
      playCoffeeMachineOnOff();
    }
    setGameState('PAUSED');
    if (['OFF', 'END'].includes(gameState)) {
      resetGame({});
      setNewObjective();
    } else {
      setCoffeeHeight(0);
    }
  }, [gameState, playCoffeeMachineOnOff, resetGame, setNewObjective, stopCoffeePouring]);

  const handleBtnCoffee = useCallback(() => {
    stopCoffeePouring();
    if (gameState === 'RUN') {
      setGameState('PAUSED');
    } else if (gameState !== 'OFF') {
      if (gameState === 'END') {
        resetGame({});
        setNewObjective();
        setGameState('PAUSED');
      }
        if(gameState === 'PAUSED') {
          playCoffeePouring()
        }
      setGameState('RUN');
    }
  }, [gameState, playCoffeePouring, resetGame, setNewObjective, stopCoffeePouring]);

  const calculateResult = useCallback(() => {
    const percentage = calculatePercentage();
    if (['RUN', 'PAUSED'].includes(gameState)) {
      setResult(`Percent Filled: ${percentage}%`);

      let newMessage = '';
      if (percentage === objective) {
        newMessage = 'Nailed it! Good job!';
      } else if (Math.abs(objective - percentage) < 5) {
        newMessage = 'Eh. Close enough.';
      } else if (Math.abs(objective - percentage) < 10) {
        newMessage = 'You can do better!';
      } else {
        newMessage = "Meh... Not yet a barista!";
      }

      setMessage(newMessage);
      handleStateChange?.({ result: `Percent Filled: ${percentage}%`, message: newMessage, coffeeHeight: percentage, gameState: 'END' });
    }
  }, [calculatePercentage, objective, gameState, handleStateChange]);

  const handleMugClick = useCallback(() => {
    stopCoffeePouring();
    if (coffeeHeight > 0) {
      playMugServed();
      setGameState('END');
      calculateResult();
    }
  }, [calculateResult, coffeeHeight, playMugServed, stopCoffeePouring]);

  useEffect(() => {
    if (gameState === 'RUN') {
      const interval = setInterval(() => {
        setCoffeeHeight(prevHeight => {
          const maxHeight = mugRef.current?.clientHeight ?? 0;
          if (prevHeight >= maxHeight) {
            setGameState('PAUSED');
            stopCoffeePouring()
            return maxHeight;
          }
          return prevHeight + 1;
        });
      }, SPEED_IN_MS);

      return () => clearInterval(interval);
    }
  }, [gameState, stopCoffeePouring]);

  return (
    <div className={styles.container}>
      <div className={styles.coffeeMachine}>
        <div className={styles.head}>
          <button 
            onClick={handleBtnCoffee}
            className={classnames(styles.circle, { [styles['circle--active']]: gameState === 'RUN' })}
          />
          <button 
            onClick={handleBtnOff} 
            className={classnames(styles.choice, styles.choice1, { [styles['choice1--active']]: gameState === 'OFF' })}
          />
          <button 
            onClick={handleBtnOn} 
            className={classnames(styles.choice, styles.choice2, { [styles['choice2--active']]: gameState !== 'OFF' })}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.back}/>
          <div className={styles.press}>
            <div className={styles.one}/>
            <div className={styles.two}/>
            <div className={styles.three}/>
            <div className={classnames(styles.armContainer, { [styles["armContainer--active"]]: gameState === 'RUN' })}>
              <div className={styles.five}/>
              <div className={styles.six}/>
            </div>
          </div>

          <div className={classnames(styles.coffeePouring, {
            [styles['coffeePouring--inactive']]: gameState !== 'RUN',
            [styles["coffeePouring--active"]]: gameState === 'RUN'
          })}/>

          <div className={styles.muggContainer}>
            {!['END'].includes(gameState) && (
              <Mug 
                coffeeHeight={coffeeHeight} 
                onClickOnMug={handleMugClick} 
                mugRef={mugRef} 
                coffeeRef={coffeeRef} 
                gameState={gameState}
              />
            )}
            <div className={styles.muggBase}/>
          </div>
        </div>

        <div className={styles.aboveBase}/>
        <div className={styles.base}>
          <div/>
          <div className={styles.spans}>
            {!hideControls && (
              <div>
                <p>
                  Fill the coffee cup {!!objective && `to ${objective}%`} <br/>
                  <small>{[result, message].filter(Boolean).join(' - ')}</small>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>        
    </div>
  );
})

CoffeeMachine.displayName = 'CoffeeMachine';

export default CoffeeMachine;