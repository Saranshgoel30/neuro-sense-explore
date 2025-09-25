import { useEffect } from 'react';

export const useKeyboardNavigation = () => {
  useEffect(() => {
    let isKeyboardUser = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        isKeyboardUser = true;
        document.body.classList.add('keyboard-user');
      }
    };

    const handleMouseDown = () => {
      isKeyboardUser = false;
      document.body.classList.remove('keyboard-user');
    };

    const handleFocusVisible = (e: FocusEvent) => {
      if (isKeyboardUser && e.target instanceof HTMLElement) {
        e.target.setAttribute('data-keyboard-focus', 'true');
      }
    };

    const handleBlur = (e: FocusEvent) => {
      if (e.target instanceof HTMLElement) {
        e.target.removeAttribute('data-keyboard-focus');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focusin', handleFocusVisible);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focusin', handleFocusVisible);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);
};