import React from 'react';
import Navigation from '@/components/ui/navigation';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { announceToScreenReader } = useAccessibilityContext();

  React.useEffect(() => {
    // Announce page load completion
    const timer = setTimeout(() => {
      announceToScreenReader('Page loaded successfully', 'polite');
    }, 500);
    
    return () => clearTimeout(timer);
  }, [announceToScreenReader]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main 
        id="main-content"
        role="main" 
        className="flex-1"
        tabIndex={-1}
        aria-label="Main content"
      >
        {children}
      </main>
      <footer className="bg-muted mt-auto py-8">
        <div className="container mx-auto px-4 text-center">
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