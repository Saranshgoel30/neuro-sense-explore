import { useEffect, useCallback, useState } from 'react';

interface UseAccessibilityOptions {
  enableHapticFeedback?: boolean;
  enableAudioFeedback?: boolean;
  enableKeyboardShortcuts?: boolean;
}

export const useAccessibility = (options: UseAccessibilityOptions = {}) => {
  const {
    enableHapticFeedback = true,
    enableAudioFeedback = true,
    enableKeyboardShortcuts = true
  } = options;

  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const announceWithLiveRegion = useCallback((message: string, priority: 'polite' | 'assertive') => {
    const regionId = priority === 'assertive' ? 'live-region-assertive' : 'live-region-polite';
    const liveRegion = document.getElementById(regionId);

    if (liveRegion) {
      liveRegion.textContent = '';
      window.requestAnimationFrame(() => {
        liveRegion.textContent = message;
      });
      return;
    }

    const fallbackRegion = document.createElement('div');
    fallbackRegion.setAttribute('aria-live', priority);
    fallbackRegion.setAttribute('aria-atomic', 'true');
    fallbackRegion.className = 'sr-only';
    fallbackRegion.textContent = message;
    document.body.appendChild(fallbackRegion);

    setTimeout(() => {
      if (document.body.contains(fallbackRegion)) {
        document.body.removeChild(fallbackRegion);
      }
    }, 1200);
  }, []);

  // Haptic feedback function
  const triggerHapticFeedback = useCallback((pattern: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (!enableHapticFeedback) return;
    
    if ('vibrate' in navigator) {
      const patterns = {
        light: [50],
        medium: [100],
        heavy: [200]
      };
      navigator.vibrate(patterns[pattern]);
    }
  }, [enableHapticFeedback]);

  // Audio feedback function
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (!enableAudioFeedback) return;

    announceWithLiveRegion(message, priority);
  }, [enableAudioFeedback, announceWithLiveRegion]);

  // High contrast toggle
  const toggleHighContrast = useCallback(() => {
    const newState = !isHighContrast;
    setIsHighContrast(newState);
    document.body.classList.toggle('high-contrast', newState);
    
    announceToScreenReader(
      newState ? 'High contrast mode enabled' : 'High contrast mode disabled',
      'assertive'
    );
    triggerHapticFeedback('medium');
  }, [isHighContrast, announceToScreenReader, triggerHapticFeedback]);

  // Focus management
  const trapFocus = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, []);

  // Skip link functionality
  const createSkipLink = useCallback((targetId: string, label: string) => {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.textContent = label;
    skipLink.className = 'skip-link';
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.focus();
        announceToScreenReader(`Skipped to ${label.toLowerCase()}`);
      }
    });
    return skipLink;
  }, [announceToScreenReader]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyboard = (e: KeyboardEvent) => {
      // High contrast toggle: Ctrl+Alt+C
      if (e.ctrlKey && e.altKey && e.key === 'c') {
        e.preventDefault();
        toggleHighContrast();
      }
      
      // Skip to main content: Alt+1
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        const mainContent = document.getElementById('main-content') as HTMLElement | null;
        if (mainContent) {
          mainContent.focus();
          announceToScreenReader('Skipped to main content');
        }
      }
      
      // Skip to navigation: Alt+2
      if (e.altKey && e.key === '2') {
        e.preventDefault();
        const navigation = document.getElementById('main-navigation') as HTMLElement | null;
        if (navigation) {
          const firstLink = navigation.querySelector('a, button') as HTMLElement | null;
          if (firstLink) {
            firstLink.focus();
            announceToScreenReader('Skipped to navigation');
          }
        }
      }
      
      // Escape key to close modals/dialogs
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"]:not([hidden])') as HTMLElement;
        if (activeModal) {
          const closeButton = activeModal.querySelector('[aria-label*="close"], [aria-label*="Close"]') as HTMLElement;
          if (closeButton) {
            closeButton.click();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [enableKeyboardShortcuts, toggleHighContrast, announceToScreenReader]);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initialize high contrast state
  useEffect(() => {
    const hasHighContrast = document.body.classList.contains('high-contrast');
    setIsHighContrast(hasHighContrast);
  }, []);

  return {
    isHighContrast,
    isReducedMotion,
    triggerHapticFeedback,
    announceToScreenReader,
    toggleHighContrast,
    trapFocus,
    createSkipLink
  };
};