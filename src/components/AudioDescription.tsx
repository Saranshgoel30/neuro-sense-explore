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
  const [voicesReady, setVoicesReady] = useState(false);
  const { announceToScreenReader, triggerHapticFeedback } = useAccessibilityContext();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getPreferredVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    return (
      voices.find((voice) => voice.lang.toLowerCase().startsWith('en')) ||
      voices[0]
    );
  }, []);

  const stopPlayback = useCallback((announce = true) => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setIsPlaying(false);
    triggerHapticFeedback('light');
    if (announce) {
      announceToScreenReader('Audio description stopped', 'polite');
    }
  }, [announceToScreenReader, triggerHapticFeedback]);

  const handlePlay = useCallback(() => {
    if (!isSupported || !voicesReady) {
      announceToScreenReader('Audio description not supported on this device', 'assertive');
      return;
    }

    if (!text.trim()) {
      announceToScreenReader('Audio description text is empty', 'assertive');
      return;
    }

    if (isPlaying) {
      stopPlayback();
      return;
    }

    const synth = window.speechSynthesis;

    if (synth.paused) {
      synth.resume();
    }

    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    const preferredVoice = getPreferredVoice();
    if (preferredVoice) {
      utterance.voice = preferredVoice;
      utterance.lang = preferredVoice.lang;
    }
    
    utterance.onstart = () => {
      setIsPlaying(true);
      triggerHapticFeedback('medium');
      announceToScreenReader('Audio description started', 'polite');
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      utteranceRef.current = null;
      triggerHapticFeedback('light');
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      utteranceRef.current = null;
      announceToScreenReader('Audio description failed to play', 'assertive');
    };

    synth.speak(utterance);
  }, [
    isSupported,
    voicesReady,
    isPlaying,
    text,
    getPreferredVoice,
    stopPlayback,
    announceToScreenReader,
    triggerHapticFeedback,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const isSpeechAvailable = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    setIsSupported(isSpeechAvailable);

    if (!isSpeechAvailable) {
      return;
    }

    const synth = window.speechSynthesis;

    const updateVoicesReady = () => {
      setVoicesReady(synth.getVoices().length > 0);
    };

    updateVoicesReady();
    synth.addEventListener('voiceschanged', updateVoicesReady);

    if (autoPlay) {
      const timer = window.setTimeout(() => {
        handlePlay();
      }, 150);

      return () => {
        window.clearTimeout(timer);
        synth.removeEventListener('voiceschanged', updateVoicesReady);
        if (utteranceRef.current) {
          stopPlayback(false);
        }
      };
    }

    return () => {
      synth.removeEventListener('voiceschanged', updateVoicesReady);
      if (utteranceRef.current) {
        stopPlayback(false);
      }
    };
  }, [autoPlay, handlePlay, stopPlayback]);

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
        className="flex items-center space-x-2 text-foreground"
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