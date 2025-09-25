import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Map, Layers, Volume2, Accessibility } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';

const Navigation = () => {
  const location = useLocation();
  const { triggerHapticFeedback, announceToScreenReader, toggleHighContrast } = useAccessibilityContext();

  // Announce page changes to screen readers
  useEffect(() => {
    const pageName = navItems.find(item => item.href === location.pathname)?.label || 'Home';
    announceToScreenReader(`Navigated to ${pageName} page`, 'polite');
  }, [location.pathname, announceToScreenReader]);

  const navItems = [
    { href: '/', label: 'Home', icon: Home, description: 'NewroView homepage' },
    { href: '/lessons', label: 'Audio Lessons', icon: Volume2, description: 'Podcast-style neuroscience modules' },
    { href: '/maps', label: 'Sonified Maps', icon: Map, description: 'Interactive brain diagrams with sound' },
    { href: '/tactile', label: 'Tactile Hub', icon: Layers, description: '3D printable neuroscience models' },
    { href: '/library', label: 'Library', icon: BookOpen, description: 'Complete resource collection' },
  ];

  const handleNavClick = (label: string) => {
    triggerHapticFeedback('light');
    announceToScreenReader(`Navigating to ${label}`, 'polite');
  };

  return (
    <nav 
      id="main-navigation"
      className="bg-card border-b shadow-soft"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  to={item.href}
                  onClick={() => handleNavClick(item.label)}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`${item.description}${isActive ? ' (current page)' : ''}`}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Accessibility Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toggleHighContrast();
                triggerHapticFeedback('medium');
              }}
              aria-label="Toggle high contrast mode (Ctrl+Alt+C)"
              title="Toggle high contrast mode"
              className="relative"
            >
              <span className="text-xs font-medium">HC</span>
              <span className="sr-only">High contrast toggle</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;