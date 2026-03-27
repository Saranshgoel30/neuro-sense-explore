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
  const iogLogoSrc = `${import.meta.env.BASE_URL}iog-logo-1.jpg`;

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
      <footer id="site-footer" className="bg-muted/70 mt-auto section-compact border-t" aria-label="Site footer">
        <div className="container mx-auto px-4 md:px-6">
          <div className="rounded-2xl border bg-card px-6 py-6 text-center shadow-soft">
            <div className="mb-4 flex flex-col items-center justify-center space-y-3">
              <p className="text-sm text-muted-foreground">
                This project is funded by IndiaBioscience Outreach Grants
              </p>
              <img
                src={iogLogoSrc}
                alt="IndiaBioscience Outreach Grants Logo"
                className="h-16 w-auto object-contain rounded-md"
              />
            </div>
            <p className="text-foreground font-semibold">
              Neuro Sense Explore — Making neuroscience accessible for everyone
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              WCAG 2.1 AA Compliant · Keyboard Navigable · Screen Reader Optimized
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
