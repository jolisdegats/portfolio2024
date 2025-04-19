import { useState, useCallback } from 'react';
import useSound from 'use-sound';

export function useLazySound(soundPath: string, options = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [play, { sound, stop }] = useSound(soundPath, {
    ...options,
    onload: () => setIsLoaded(true),
  });

  const loadSound = useCallback(() => {
    if (!isLoaded) {
      play();
      stop();
    }
  }, [isLoaded, play, stop]);

  return {
    play,
    stop,
    sound,
    isLoaded,
    loadSound
  };
} 