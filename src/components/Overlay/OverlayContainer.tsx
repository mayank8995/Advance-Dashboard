import { createPortal } from 'react-dom';
import type { MODAL_COMPONENTS, ModalType } from '../../utils/modalRegistry';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
type OverlayContainerProps<T extends ModalType> = {
  Component: (typeof MODAL_COMPONENTS)[T];
  props: Record<any, any>;
  onClose: () => void;
};

const OverlayContainer = <T extends ModalType>({
  Component,
  props,
  onClose,
}: OverlayContainerProps<T>) => {
  useLockBodyScroll(true);
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    return null;
  }
  const ModalComponent = Component as React.ComponentType<any>;
  return (
    <>
      {createPortal(
        <div className="h-full max-h-full overflow-auto w-screen md:w-fit  bg-white dark:bg-slate-950  border border-slate-200 dark:border-white/10  fixed z-300 right-0 top-0">
          <ModalComponent {...props} onClose={onClose} />
        </div>,
        modalRoot
      )}
      <button
        aria-label="overlay"
        className="fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ease-linear"
        onClick={onClose}
      />
    </>
  );
};

export default OverlayContainer;
