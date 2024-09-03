import { useEffect, useCallback, ReactNode } from 'react';
import styles from './styles.module.scss';
import { useAppContext } from '@/lib/hooks';
import Portal from '../Portal';
import { changeModal } from '@/lib/context';

type ModalProps = {
  children: ReactNode;
  handleClose?: () => void;
};

const Modal = ({ children, handleClose }: ModalProps) => {
  const { state: { modalOpen }, dispatch } = useAppContext();

  const onCloseModal = useCallback(() => {
    handleClose?.();
    dispatch(changeModal({ name: '' }));
  }, [handleClose, dispatch]);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onCloseModal() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onCloseModal]);

  if (!modalOpen.name) return null;

  return (
    <Portal wrapperId="react-portal-modal-container">
      <div className={styles.modal}>
        <button onClick={onCloseModal} className={styles['close-btn']}>
          Close
        </button>
        <div className={styles['modal-content']}>{children}</div>
      </div>
    </Portal>
  );
};

export default Modal;
