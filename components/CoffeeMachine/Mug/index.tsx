import styles from './styles.module.scss';
import classnames from 'classnames';

interface MugProps {
  coffeeHeight: number;
  onClickOnMug: () => void;
  mugRef: React.RefObject<HTMLDivElement>;
  coffeeRef: React.RefObject<HTMLDivElement>;
  gameState: string;
}

const Mug = ({coffeeHeight, onClickOnMug, mugRef, coffeeRef, gameState }: MugProps) => {
  return (
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
  )
}

export default Mug