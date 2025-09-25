import React, { createContext, useContext, useEffect } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface AccessibilityContextType {
  isHighContrast: boolean;
  isReducedMotion: boolean;
  triggerHapticFeedback: (pattern?: 'light' | 'medium' | 'heavy') => void;
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  toggleHighContrast: () => void;
  trapFocus: (container: HTMLElement) => (() => void);
  createSkipLink: (targetId: string, label: string) => HTMLElement;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibilityContext = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibilityContext must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const accessibility = useAccessibility();
  useKeyboardNavigation();

  // Add skip links on mount
  useEffect(() => {
    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.className = 'skip-links';
    
    const skipToMain = accessibility.createSkipLink('main-content', 'Skip to main content');
    const skipToNav = accessibility.createSkipLink('main-navigation', 'Skip to navigation');
    
    skipLinksContainer.appendChild(skipToMain);
    skipLinksContainer.appendChild(skipToNav);
    
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);
    
    return () => {
      if (document.body.contains(skipLinksContainer)) {
        document.body.removeChild(skipLinksContainer);
      }
    };
  }, [accessibility]);

  // Add live region for announcements
  useEffect(() => {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    return () => {
      if (document.body.contains(liveRegion)) {
        document.body.removeChild(liveRegion);
      }
    };
  }, []);

  return (
    <AccessibilityContext.Provider value={accessibility}>
      {children}
    </AccessibilityContext.Provider>
  );
};