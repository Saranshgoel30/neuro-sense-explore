import React from 'react';
import Navigation from '@/components/ui/navigation';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { announceToScreenReader } = useAccessibilityContext();
  const location = useLocation();

  React.useEffect(() => {
    const mainElement = document.getElementById('main-content');
    if (mainElement && document.body.classList.contains('keyboard-user')) {
      mainElement.focus({ preventScroll: true });
    }

    const timer = window.setTimeout(() => {
      announceToScreenReader('Main content loaded', 'polite');
    }, 250);

    return () => window.clearTimeout(timer);
  }, [location.pathname, announceToScreenReader]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main 
        id="main-content"
        className="flex-1 focus-visible:outline-none"
        tabIndex={-1}
        aria-label="Main content"
      >
        {children}
      </main>
      <footer id="site-footer" className="bg-muted mt-auto py-8" aria-label="Site footer">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            Neuro Sense Explore - Making neuroscience accessible for everyone
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            WCAG 2.1 AA Compliant | Keyboard navigable | Screen reader optimized
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;