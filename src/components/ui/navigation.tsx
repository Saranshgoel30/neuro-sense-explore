import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Map, Layers, Volume2, Accessibility } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Home', icon: Home, description: 'NewroView homepage' },
    { href: '/lessons', label: 'Audio Lessons', icon: Volume2, description: 'Podcast-style neuroscience modules' },
    { href: '/maps', label: 'Sonified Maps', icon: Map, description: 'Interactive brain diagrams with sound' },
    { href: '/tactile', label: 'Tactile Hub', icon: Layers, description: '3D printable neuroscience models' },
    { href: '/library', label: 'Library', icon: BookOpen, description: 'Complete resource collection' },
  ];

  return (
    <nav 
      className="bg-card border-b shadow-soft"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md p-2"
            aria-label="NewroView - Home"
          >
            <Accessibility className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              NewroView
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center space-x-2"
                    aria-current={isActive ? "page" : undefined}
                    aria-label={item.description}
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
              onClick={() => document.body.classList.toggle('high-contrast')}
              aria-label="Toggle high contrast mode (Ctrl+Alt+C)"
              title="Toggle high contrast mode"
            >
              <span className="text-xs font-medium">HC</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;