import { useEffect, useCallback, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './styles.module.scss';
import { useAppContext } from '@/lib/hooks';
import Portal from '../Portal';
import { changeModal } from '@/lib/context';

type ModalProps = {
  children: ReactNode;
  handleClose?: () => void;
  name: string;
};

const Modal = ({ children, handleClose, name }: ModalProps) => {
  const { state: { modalOpen }, dispatch } = useAppContext();

  const onCloseModal = useCallback(() => {
    handleClose?.();
    dispatch(changeModal({ name: '' }));
  }, [handleClose, dispatch]);

  const handleOutsideClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  }, [onCloseModal]);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' ? onCloseModal() : null;
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onCloseModal]);

  return (
    <Portal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={modalOpen.name === name}
        timeout={300}
        classNames={{
          enter: styles['modal-enter'],
          enterActive: styles['modal-enter-active'],
          exit: styles['modal-exit'],
          exitActive: styles['modal-exit-active'],
        }}
        unmountOnExit
      >
        <div className={styles.modal} onClick={handleOutsideClick}>
          <div className={styles['modal-content']}>
            <div className={styles['modal-header']}>
              <button onClick={onCloseModal} className={styles['close-btn']}>
                X
              </button>
            </div>
            <div className={styles['modal-body']}>{children}</div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;
