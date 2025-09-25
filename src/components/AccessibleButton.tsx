import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';

interface AccessibleButtonProps extends ButtonProps {
  hapticFeedback?: 'light' | 'medium' | 'heavy';
  announcement?: string;
  announcementPriority?: 'polite' | 'assertive';
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  hapticFeedback = 'light',
  announcement,
  announcementPriority = 'polite',
  ...props
}) => {
  const { triggerHapticFeedback, announceToScreenReader } = useAccessibilityContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger haptic feedback
    triggerHapticFeedback(hapticFeedback);
    
    // Make announcement if provided
    if (announcement) {
      announceToScreenReader(announcement, announcementPriority);
    }
    
    // Call the original onClick handler
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};