import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useAccessibilityContext } from '@/components/AccessibilityProvider';

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

  useEffect(() => {
    // Check if speech synthesis is supported
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
  }, [autoPlay]);

  const handlePlay = () => {
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
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`audio-description ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handlePlay}
        aria-label={isPlaying ? 'Stop audio description' : 'Play audio description'}
        title={isPlaying ? 'Stop audio description' : 'Play audio description'}
        className="flex items-center space-x-2"
      >
        {isPlaying ? (
          <>
            <Pause className="h-4 w-4" aria-hidden="true" />
            <VolumeX className="h-4 w-4" aria-hidden="true" />
          </>
        ) : (
          <>
            <Play className="h-4 w-4" aria-hidden="true" />
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          </>
        )}
        <span className="text-sm">
          {isPlaying ? 'Stop' : 'Play'} Audio
        </span>
      </Button>
      <span className="sr-only">{text}</span>
    </div>
  );
};