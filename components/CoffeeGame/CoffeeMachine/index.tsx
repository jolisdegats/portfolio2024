import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './styles.module.scss';
import classnames from "classnames";
interface CoffeeMachineProps {
  onStateChange: (state: { objective: number; message: string; result: string }) => void;
  hideControls?: boolean;
}

const CoffeeMachine: React.FC<CoffeeMachineProps> = ({ onStateChange, hideControls = false }) => {
  const [gameState, setGameState] = useState<'END' | 'RUN' | 'PAUSED' | 'OFF'>('OFF')
  const [objective, setObjective] = useState(0)
  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')
  const [coffeeHeight, setCoffeeHeight] = useState(0)
  const SPEED_IN_MS = 50

  const coffeeRef = useRef<HTMLDivElement>(null)
  const mugRef = useRef<HTMLDivElement>(null)

  const calculatePercentage = useCallback((): number => {
    if (mugRef.current) {
      return Math.round((coffeeHeight / mugRef.current.clientHeight) * 100)
    }
    return 0
  }, [coffeeHeight])

  const resetGame = useCallback(() => {
    setCoffeeHeight(0)
    setResult('')
    setMessage('')
    setObjective(0)
  }, [])


const onClickBtnOff = () => {
    resetGame()
    setGameState('OFF')
}

const onClickBtnOn = () => {
    setGameState('PAUSED')
    if ( ['OFF', 'END'].includes(gameState) ) {
        resetGame()
        setObjective(Math.floor(Math.random() * 100))
    } else {
        setCoffeeHeight(0)
    }
}

const onClickBtnCoffee = () => {
    if ( gameState === 'RUN' ) {
        setGameState('PAUSED')
    } else{
    if (gameState !== 'OFF'){
      if(gameState === 'END'){
        resetGame()
        setObjective(Math.floor(Math.random() * 100))
      }
    setGameState('RUN') 
  }
}
}


  const calculateResult = useCallback(() => {
    const percentage = calculatePercentage()
    if(gameState === 'RUN'){
    setResult(`Percent Filled: ${percentage}%`)

    if (percentage === objective) {
      setMessage('Nailed it! Good job!')
    } else if (Math.abs(objective - percentage) < 5) {
      setMessage('Eh. Close enough.')
    } else if (Math.abs(objective - percentage) < 10) {
      setMessage('You can do better!')
    } else {
      setMessage("Meh... Not yet a barista!")
    }
  }
  }, [calculatePercentage, objective])


  const onClickOnMug = useCallback(() => {
    if(coffeeHeight > 0){    
      setGameState('END')
      calculateResult()
    }
  }, [calculateResult])

  useEffect(() => {
    if (gameState === 'RUN') {
      const interval = setInterval(() => {
        setCoffeeHeight(prevHeight => {
          const maxHeight = mugRef.current?.clientHeight || 0
          if (prevHeight >= maxHeight) {
            setGameState('PAUSED')
            return maxHeight
          }
          return prevHeight + 1
        })
      }, SPEED_IN_MS)

      return () => clearInterval(interval)
    }
  }, [gameState])

  useEffect(() => {
    onStateChange({ objective, message, result });
  }, [objective, message, result, onStateChange]);


  return (
    <div className={styles.container}>
      <div className={styles.coffeeMachine}>
        <div className={styles.head}>
          <button 
            onClick={onClickBtnCoffee}
            className={classnames(styles.circle, { [styles['circle--active']]: gameState === 'RUN' })}
          />
          <button 
            onClick={onClickBtnOff} 
            className={classnames(styles.choice, styles.choice1, { [styles['choice1--active']]: gameState === 'OFF' })}
          />
          <button 
            onClick={onClickBtnOn} 
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
            <div className={styles.muggContainerRelative} onClick={onClickOnMug}>
              <div ref={mugRef} className={styles.mugg} />
              <div 
                ref={coffeeRef}   
                style={{ transform: `scaleY(${Math.min(coffeeHeight / (mugRef.current?.clientHeight || 1), 1)})` }}
                className={styles.coffee}
              />
              <div className={styles.muggArm}/>
              {gameState === 'RUN' && (
                <>
                  <div className={classnames(styles.bubble, styles.b1)}/>
                  <div className={classnames(styles.bubble, styles.b2)}/>
                  <div className={classnames(styles.bubble, styles.b3)}/>
                </>
              )}
            </div>
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
            {<small>{[result, message].filter(Boolean).join(' - ')}</small>}
            </p>
            </div>
            )}
          </div>
        </div>
        </div>        
      </div>
  )
}

export default CoffeeMachine
