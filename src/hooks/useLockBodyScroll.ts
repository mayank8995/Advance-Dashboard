import { useEffect } from 'react';

export const useLockBodyScroll = (modal: boolean) => {
  useEffect(() => {
    if (!modal) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [modal]);
};

export default useLockBodyScroll;
