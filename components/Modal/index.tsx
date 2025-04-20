import { useEffect, useCallback, ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppContext } from '@/lib/hooks';
import Portal from '@/components/Portal';
import { changeModal } from '@/lib/context';

type ModalProps = {
  children: ReactNode;
  handleClose?: () => void;
  name: string;
};

const Modal = ({ children, handleClose, name }: ModalProps) => {
  const { state: { modalOpen }, dispatch } = useAppContext();
  const modalRef = useRef<HTMLDivElement>(null);

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
        nodeRef={modalRef}
        in={modalOpen.name === name}
        timeout={300}
        classNames={{
          enter: 'opacity-0 [&_.modal-content]:mt-10',
          enterActive: 'opacity-100 transition-opacity duration-300 [&_.modal-content]:-translate-y-5 [&_.modal-content]:transition-transform [&_.modal-content]:duration-300',
          exitActive: 'opacity-0 transition-opacity duration-300 [&_.modal-content]:translate-y-5 [&_.modal-content]:transition-transform [&_.modal-content]:duration-300',
        }}
        unmountOnExit
      >
        <div ref={modalRef} className="fixed inset-0 bg-black/60 flex flex-col items-center justify-center z-[999] p-5" onClick={handleOutsideClick}>
          <div className="modal-content w-[90%] max-w-[1000px] max-h-[600px] bg-[#1b1d23] text-white flex flex-col items-center justify-start rounded-[10px] overflow-hidden md:w-[90%] md:h-auto h-full">
            <div className="flex justify-end w-full p-[10px]">
              <button onClick={onCloseModal} className="text-white cursor-pointer text-base py-2 px-4 bg-transparent border-none">
                X
              </button>
            </div>
            <div className="w-full px-5 lg:px-10 pb-10 pt-0 overflow-hidden flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

export default Modal;