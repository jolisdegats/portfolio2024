import { useState, useEffect, useRef } from 'react';

interface SoundEffect {
  play: () => void;
  stop: () => void;
  load: () => void;
  fade: (targetVolume: number, duration?: number) => void;
  isLoaded: boolean;
}

export const useSoundEffect = (soundPath: string, options: { volume?: number; preload?: boolean } = {}): SoundEffect => {
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = options.volume || 1;
    
    audio.addEventListener('canplaythrough', () => {
      setIsLoaded(true);
    });
    
    audioRef.current = audio;
    
    if (options.preload) {
      audio.src = soundPath;
      audio.load();
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, [soundPath, options.volume, options.preload]);

  const load = () => {
    if (audioRef.current && !isLoaded) {
      audioRef.current.src = soundPath;
      audioRef.current.load();
    }
  };

  const fade = (targetVolume: number, duration: number = 1000) => {
    if (!audioRef.current) return;
    
    // Clear any existing fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    const startVolume = audioRef.current.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 20; // Number of steps in the fade
    const stepDuration = duration / steps;
    const volumeStep = volumeDiff / steps;
    
    let currentStep = 0;
    
    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(fadeIntervalRef.current!);
        return;
      }
      
      currentStep++;
      
      if (currentStep >= steps) {
        audioRef.current.volume = targetVolume;
        clearInterval(fadeIntervalRef.current!);
        fadeIntervalRef.current = null;
      } else {
        audioRef.current.volume = startVolume + (volumeStep * currentStep);
      }
    }, stepDuration);
  };

  const play = () => {
    if (audioRef.current) {
      if (!isLoaded) {
        load();
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    }
  };

  const stop = () => {
    if (audioRef.current) {
      // Clear any ongoing fade
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return {
    play,
    stop,
    load,
    fade,
    isLoaded,
  };
}; 