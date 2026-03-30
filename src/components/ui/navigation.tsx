import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Map, Layers, Volume2, Contrast, BrainCircuit, Users, Mic } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';

const navItems = [
  { href: '/', label: 'Home', icon: Home, description: 'Homepage' },
  { href: '/lessons', label: 'Audio Lessons', icon: Volume2, description: 'Podcast-style neuroscience modules' },
  { href: '/podcast-scripts', label: 'Podcast Scripts', icon: Mic, description: 'Verbatim text for our upcoming podcast episodes' },
  { href: '/maps', label: 'Sonified Maps', icon: Map, description: 'Interactive brain diagrams with sound' },
  { href: '/tactile', label: 'Tactile Hub', icon: Layers, description: '3D printable neuroscience models' },
  { href: '/library', label: 'Library', icon: BookOpen, description: 'Complete resource collection' },
  { href: '/about', label: 'About', icon: Users, description: 'Aims, objectives, and team' },
];

const Navigation = () => {
  const location = useLocation();
  const { triggerHapticFeedback, announceToScreenReader, toggleHighContrast, isHighContrast } = useAccessibilityContext();

  // Announce page changes to screen readers
  useEffect(() => {
    const pageName = navItems.find(item => item.href === location.pathname)?.label || 'Home';
    announceToScreenReader(`Navigated to ${pageName} page`, 'polite');
  }, [location.pathname, announceToScreenReader]);

  const handleNavClick = (label: string) => {
    triggerHapticFeedback('light');
    announceToScreenReader(`Navigating to ${label}`, 'polite');
  };

  return (
    <nav 
      id="main-navigation"
      className="bg-card border-b shadow-soft"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-3 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="text-sm md:text-base font-semibold text-foreground">NewroView</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toggleHighContrast();
                triggerHapticFeedback('medium');
              }}
              aria-pressed={isHighContrast}
              aria-keyshortcuts="Control+Alt+C"
              aria-label={`${isHighContrast ? 'Disable' : 'Enable'} high contrast mode (Control + Alt + C)`}
              title="Toggle high contrast mode"
              className="gap-2"
            >
              <Contrast className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs font-medium">High Contrast</span>
            </Button>
          </div>

          <ul className="flex flex-wrap items-center gap-2 pb-1" role="list" aria-label="Main sections">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href} className="shrink-0">
                  <Button
                    asChild
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick(item.label)}
                      onFocus={(event) => {
                        event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' });
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`${item.description}${isActive ? ' (current page)' : ''}`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;