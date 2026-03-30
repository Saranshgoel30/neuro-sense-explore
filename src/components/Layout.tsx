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
          <div className="mb-6 flex flex-col items-center justify-center space-y-4">
            <p className="text-lg font-medium text-foreground">
              This project is funded by IndiaBioscience Outreach Grants
            </p>
            <img 
              src="/iog-logo-1.jpg" 
              alt="IndiaBioscience Outreach Grants Logo" 
              className="h-16 w-auto object-contain rounded-md"
            />
          </div>
          <p className="text-muted-foreground">
            NewroView - Making neuroscience accessible for everyone
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