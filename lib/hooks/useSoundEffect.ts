import { useState, useEffect, useRef } from 'react';

interface SoundEffect {
  play: () => void;
  stop: () => void;
  load: () => void;
  fade: (startVolume: number, endVolume: number, duration?: number) => void;
  isLoaded: boolean;
}

export const useSoundEffect = (soundPath: string, options: { volume?: number; preload?: boolean; interrupt?: boolean } = {}): SoundEffect => {
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeDurationRef = useRef<number>(0);
  const shouldFadeRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        audioRef.current = new Audio();
        audioRef.current.volume = options.volume || 1;
        
        audioRef.current?.addEventListener('canplaythrough', () => {
          setIsLoaded(true);
        });
        
        audioRef.current?.addEventListener('ended', () => {
          isPlayingRef.current = false;
        });
        
        audioRef.current?.addEventListener('error', () => {
          console.error('Error loading audio:', soundPath);
          isPlayingRef.current = false;
        });
        
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

  const fade = (startVolume: number, endVolume: number, duration: number = 1000) => {
    if (!audioRef.current) return;
    
    fadeDurationRef.current = duration;
    shouldFadeRef.current = true;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }
    
    // Set the initial volume
    audioRef.current.volume = startVolume;
    
    const volumeDiff = endVolume - startVolume;
    const steps = 20;
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
        audioRef.current.volume = endVolume;
        clearInterval(fadeIntervalRef.current!);
        fadeIntervalRef.current = null;
      } else {
        audioRef.current.volume = startVolume + (volumeStep * currentStep);
      }
    }, stepDuration);
  };

  const play = () => {
    if (audioRef.current) {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
      }
      
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }
      
      if (!isLoaded) {
        load();
      }
      
      if (options.interrupt && isPlayingRef.current) {
        stop();
      }
      
      audioRef.current.currentTime = 0;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isPlayingRef.current = true;
          })
          .catch(error => {
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
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current);
        playTimeoutRef.current = null;
      }
      
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }
      
      if (options.interrupt || !shouldFadeRef.current) {
        // Stop immediately if interrupt is enabled or if fade was never called
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        isPlayingRef.current = false;
      } else if (shouldFadeRef.current && audioRef.current.volume > 0) {
        // Only fade if fade was explicitly called and volume is not already 0
        const startVolume = audioRef.current.volume;
        const steps = 20;
        const stepDuration = fadeDurationRef.current / steps;
        const volumeStep = startVolume / steps;
        
        let currentStep = 0;
        
        fadeIntervalRef.current = setInterval(() => {
          if (!audioRef.current) {
            clearInterval(fadeIntervalRef.current!);
            return;
          }
          
          currentStep++;
          
          if (currentStep >= steps) {
            audioRef.current.volume = 0;
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            isPlayingRef.current = false;
            clearInterval(fadeIntervalRef.current!);
            fadeIntervalRef.current = null;
          } else {
            audioRef.current.volume = startVolume - (volumeStep * currentStep);
          }
        }, stepDuration);
      } else {
        // If no fade needed, just stop immediately
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        isPlayingRef.current = false;
      }
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