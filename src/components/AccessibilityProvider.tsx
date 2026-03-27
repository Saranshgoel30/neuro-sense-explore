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
    const skipLinksContainer = document.createElement('nav');
    skipLinksContainer.setAttribute('aria-label', 'Skip links');
    skipLinksContainer.id = 'skip-links';
    skipLinksContainer.className = 'skip-links';
    
    const skipToMain = accessibility.createSkipLink('main-content', 'Skip to main content');
    const skipToNav = accessibility.createSkipLink('main-navigation', 'Skip to navigation');
    const skipToFooter = accessibility.createSkipLink('site-footer', 'Skip to footer');
    
    skipLinksContainer.appendChild(skipToMain);
    skipLinksContainer.appendChild(skipToNav);
    skipLinksContainer.appendChild(skipToFooter);
    
    if (!document.getElementById('skip-links')) {
      document.body.insertBefore(skipLinksContainer, document.body.firstChild);
    }
    
    return () => {
      if (document.body.contains(skipLinksContainer)) {
        document.body.removeChild(skipLinksContainer);
      }
    };
  }, [accessibility]);

  // Add live region for announcements
  useEffect(() => {
    const politeRegion = document.createElement('div');
    politeRegion.id = 'live-region-polite';
    politeRegion.setAttribute('aria-live', 'polite');
    politeRegion.setAttribute('aria-atomic', 'true');
    politeRegion.className = 'sr-only';

    const assertiveRegion = document.createElement('div');
    assertiveRegion.id = 'live-region-assertive';
    assertiveRegion.setAttribute('aria-live', 'assertive');
    assertiveRegion.setAttribute('aria-atomic', 'true');
    assertiveRegion.className = 'sr-only';

    if (!document.getElementById('live-region-polite')) {
      document.body.appendChild(politeRegion);
    }
    if (!document.getElementById('live-region-assertive')) {
      document.body.appendChild(assertiveRegion);
    }
    
    return () => {
      if (document.body.contains(politeRegion)) {
        document.body.removeChild(politeRegion);
      }
      if (document.body.contains(assertiveRegion)) {
        document.body.removeChild(assertiveRegion);
      }
    };
  }, []);

  return (
    <AccessibilityContext.Provider value={accessibility}>
      {children}
    </AccessibilityContext.Provider>
  );
};