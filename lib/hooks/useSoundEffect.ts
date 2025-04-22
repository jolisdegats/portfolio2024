import { useState, useEffect, useRef } from 'react';

interface SoundEffect {
  play: () => void;
  stop: () => void;
  load: () => void;
  isLoaded: boolean;
}

export const useSoundEffect = (soundPath: string, options: { volume?: number; preload?: boolean } = {}): SoundEffect => {
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    };
  }, [soundPath, options.volume, options.preload]);

  const load = () => {
    if (audioRef.current && !isLoaded) {
      audioRef.current.src = soundPath;
      audioRef.current.load();
    }
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
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return {
    play,
    stop,
    load,
    isLoaded,
  };
}; 