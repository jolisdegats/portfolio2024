import { useState, useCallback } from 'react';
import useSound from 'use-sound';

export function useSoundManager(soundPath: string, options = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [play, { sound, stop }] = useSound(soundPath, {
    ...options,
    onload: () => setIsLoaded(true),
  });

  const loadSound = useCallback(() => {
    if (!isLoaded) {
      const audio = new Audio(soundPath);
      audio.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
        audio.remove();
      });
      audio.load();
    }
  }, [isLoaded, soundPath]);

  return {
    play,
    stop,
    sound,
    isLoaded,
    loadSound
  };
} 