import type { GameState } from '..';
import styles from './styles.module.scss';
import classnames from 'classnames';

interface MugProps {
  coffeeHeight: number;
  onClickOnMug?: () => void;
  mugRef?: React.RefObject<HTMLDivElement>;
  coffeeRef?: React.RefObject<HTMLDivElement>;
  gameState?: GameState;
}

const Mug = ({coffeeHeight, onClickOnMug, mugRef, coffeeRef, gameState = 'RUN' }: MugProps) => {
  return (
    <button onClick={onClickOnMug} className={classnames(styles.muggContainer, { [styles['muggContainer--active']]: gameState !== 'OFF' && coffeeHeight > 0 })}>
      <div ref={mugRef} className={styles.mugg} />
      <div 
        ref={coffeeRef}   
        style={{transform: `scaleY(${Math.min(coffeeHeight / (mugRef?.current?.clientHeight ?? 1), 1)})` }}
        className={styles.coffee}
      />
      <div className={styles.muggArm}/>
      {coffeeHeight > 0 && ['RUN', 'PAUSED'].includes(gameState) && (
        <div className={styles.bubblesContainer}>
          <div className={classnames(styles.bubble, styles.b1)}/>
          <div className={classnames(styles.bubble, styles.b2)}/>
          <div className={classnames(styles.bubble, styles.b3)}/>
        </div>
      )} 
      </button>
  )
}

export default Mug