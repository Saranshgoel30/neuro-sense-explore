import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';
import { Play, Square } from 'lucide-react';

interface AudioDescriptionProps {
  text: string;
  autoPlay?: boolean;
  className?: string;
}

export const AudioDescription: React.FC<AudioDescriptionProps> = ({
  text,
  autoPlay = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const { announceToScreenReader, triggerHapticFeedback } = useAccessibilityContext();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handlePlay = useCallback(() => {
    if (!isSupported) {
      announceToScreenReader('Audio description not supported on this device', 'assertive');
      return;
    }

    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      triggerHapticFeedback('light');
      announceToScreenReader('Audio description stopped', 'polite');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.cancel();
    utteranceRef.current = utterance;
    
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => {
      setIsPlaying(true);
      triggerHapticFeedback('medium');
      announceToScreenReader('Audio description started', 'polite');
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      triggerHapticFeedback('light');
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      announceToScreenReader('Audio description failed to play', 'assertive');
    };

    speechSynthesis.speak(utterance);
  }, [
    isSupported,
    isPlaying,
    text,
    announceToScreenReader,
    triggerHapticFeedback,
  ]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);

      if (autoPlay) {
        handlePlay();
      }
    }

    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, [autoPlay, handlePlay]);

  if (!isSupported) {
    return (
      <div className={`audio-description ${className}`}>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Audio playback is not supported on this device.
        </p>
      </div>
    );
  }

  return (
    <div className={`audio-description ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePlay}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? 'Stop audio description' : 'Play audio description'}
        title={isPlaying ? 'Stop audio description' : 'Play audio description'}
        className="flex items-center space-x-2"
      >
        {isPlaying ? <Square className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
        <span className="text-sm">
          {isPlaying ? 'Stop' : 'Play'} Audio
        </span>
      </Button>
      <span className="sr-only">{text}</span>
    </div>
  );
};