import { useState, useEffect, useRef } from 'react';

interface SoundEffect {
  play: () => void;
  stop: () => void;
  stopWithDelay: (delay?: number) => void;
  load: () => void;
  fade: (targetVolume: number, duration?: number) => void;
  isLoaded: boolean;
}

export const useSoundEffect = (soundPath: string, options: { volume?: number; preload?: boolean; interrupt?: boolean } = {}): SoundEffect => {
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      try {
        // Create audio element
        audioRef.current = new Audio();
        audioRef.current.volume = options.volume || 1;
        
        // Set up event listeners
        audioRef.current.addEventListener('canplaythrough', () => {
          setIsLoaded(true);
        });
        
        audioRef.current.addEventListener('ended', () => {
          isPlayingRef.current = false;
        });
        
        audioRef.current.addEventListener('error', () => {
          console.error('Error loading audio:', soundPath);
          isPlayingRef.current = false;
        });
        
        // Load audio if preload is enabled
        if (options.preload) {
          audioRef.current.src = soundPath;
          audioRef.current.load();
        }
        
        return () => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
            audioRef.current.load();
          }
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
          }
          if (playTimeoutRef.current) {
            clearTimeout(playTimeoutRef.current);
          }
          if (stopTimeoutRef.current) {
            clearTimeout(stopTimeoutRef.current);
          }
        };
      } catch (e) {
        console.error('Audio API not supported:', e);
      }
    }
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
      // Clear any pending play timeout
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
      
      // Clear any pending stop timeout
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }
      
      // Load audio if not already loaded
      if (!isLoaded) {
        load();
      }
      
      // If interrupt is enabled, stop any currently playing sound
      if (options.interrupt && isPlayingRef.current) {
        stop();
      }
      
      // Reset the audio to the beginning
      audioRef.current.currentTime = 0;
      
      // Play the sound
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlayingRef.current = true;
          })
          .catch(error => {
            // Ignore AbortError as it's expected when rapidly clicking
            if (error.name !== 'AbortError') {
              console.error('Error playing sound:', error);
            }
            isPlayingRef.current = false;
          });
      }
    }
  };

  const stop = () => {
    if (audioRef.current) {
      // Clear any ongoing fade
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      
      // Clear any pending play timeout
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
        playTimeoutRef.current = null;
      }
      
      // Clear any pending stop timeout
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }
      
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      isPlayingRef.current = false;
    }
  };

  // This function is specifically for use in component cleanup functions
  const stopWithDelay = (delay: number = 300) => {
    // Clear any existing stop timeout
    if (stopTimeoutRef.current) {
      clearTimeout(stopTimeoutRef.current);
    }
    
    // Set a new stop timeout
    stopTimeoutRef.current = setTimeout(() => {
      stop();
      stopTimeoutRef.current = null;
    }, delay);
  };

  return {
    play,
    stop,
    stopWithDelay,
    load,
    fade,
    isLoaded,
  };
}; 