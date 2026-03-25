import { useEffect } from 'react';

export const useKeyboardNavigation = () => {
  useEffect(() => {
    let isKeyboardUser = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key.startsWith('Arrow')) {
        isKeyboardUser = true;
        document.body.classList.add('keyboard-user');
      }
    };

    const handlePointerInput = () => {
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
    document.addEventListener('mousedown', handlePointerInput);
    document.addEventListener('touchstart', handlePointerInput, { passive: true });
    document.addEventListener('pointerdown', handlePointerInput);
    document.addEventListener('focusin', handleFocusVisible);
    document.addEventListener('focusout', handleBlur);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerInput);
      document.removeEventListener('touchstart', handlePointerInput);
      document.removeEventListener('pointerdown', handlePointerInput);
      document.removeEventListener('focusin', handleFocusVisible);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);
};