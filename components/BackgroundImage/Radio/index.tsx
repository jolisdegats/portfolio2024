import Shape, { ShapeType } from "@/components/BackgroundImage/Shape";
import radioTuning from '@/assets/sounds/tuning-radio.mp3';
import radioSwitch from '@/assets/sounds/radio-switch.mp3';
import radioOn from '@/assets/radio-on.webp';
import { useAppContext } from "@/lib/hooks";
import { useState, useCallback, memo, useRef, useEffect } from 'react';
import { useSoundManager } from '@/lib/hooks/useSoundManager';
import { toggleRadio } from '@/lib/context';


type TrackName = 'happyChildren' | 'shy' | 'smoothOperator' | 'dreams';
type Track = { play: () => void; stop: () => void };
type Tracks = Record<TrackName, Track>;

export const MarkerRadio = memo(() => {
    const { state: { isRadioOn }, dispatch } = useAppContext();
    const [currentMusicIndex, setCurrentMusicIndex] = useState(-1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const currentTrack = useRef<TrackName | null>(null);
    const isPlaying = useRef(false);
    
    const { play: playSwitch } = useSoundManager(radioSwitch, {
        volume: 0.25
    });
    
    const { play: playTuning, stop: stopTuning } = useSoundManager(radioTuning, {
        volume: 0.5
    });

    const tracks = useRef<Tracks>({
        happyChildren: { play: () => {}, stop: () => {} },
        shy: { play: () => {}, stop: () => {} },
        smoothOperator: { play: () => {}, stop: () => {} },
        dreams: { play: () => {}, stop: () => {} }
    });


    useEffect(() => {
        const loadSounds = async () => {
            try {
                const happyChildrenModule = await import('@/assets/sounds/radio-music-happy-children.mp3');
                const shyModule = await import('@/assets/sounds/radio-music-shy.mp3');
                const smoothOperatorModule = await import('@/assets/sounds/radio-music-smooth-operator.mp3');
                const dreamsModule = await import('@/assets/sounds/radio-music-dreams.mp3');
                
                const happyChildrenAudio = new Audio(happyChildrenModule.default);
                const shyAudio = new Audio(shyModule.default);
                const smoothOperatorAudio = new Audio(smoothOperatorModule.default);
                const dreamsAudio = new Audio(dreamsModule.default);
                
                happyChildrenAudio.volume = 0.5;
                shyAudio.volume = 0.5;
                smoothOperatorAudio.volume = 0.5;
                dreamsAudio.volume = 0.5;
                
                tracks.current = {
                    happyChildren: { 
                        play: () => happyChildrenAudio.play(), 
                        stop: () => happyChildrenAudio.pause() 
                    },
                    shy: { 
                        play: () => shyAudio.play(), 
                        stop: () => shyAudio.pause() 
                    },
                    smoothOperator: { 
                        play: () => smoothOperatorAudio.play(), 
                        stop: () => smoothOperatorAudio.pause() 
                    },
                    dreams: { 
                        play: () => dreamsAudio.play(), 
                        stop: () => dreamsAudio.pause() 
                    }
                };
            } catch (error) {
                console.error('Failed to load sound files:', error);
            }
        };
        
        loadSounds();
    }, []);

    const handleRadioClick = useCallback(() => {
        dispatch(toggleRadio());
        if (isPlaying.current) {
            if (currentTrack.current) {
                tracks.current[currentTrack.current].stop();
            }
            isPlaying.current = false;
            playSwitch()
        } else {
            playSwitch();
            setTimeout(() => {
                const trackNames = Object.keys(tracks.current) as TrackName[];
                const randomTrack = trackNames[Math.floor(Math.random() * trackNames.length)];
                currentTrack.current = randomTrack;
                tracks.current[randomTrack].play();
                isPlaying.current = true;
            }, 300);
        }
    }, [playSwitch, dispatch]);


    const stopAllMusics = useCallback(() => {
        Object.values(tracks.current).forEach(track => track.stop());
        isPlaying.current = false;
        currentTrack.current = null;
    }, []);


    const loadTrack = useCallback((trackName: TrackName) => {
        if (tracks.current[trackName]) {
            return tracks.current[trackName];
        }
        return null;
    }, []);


    const playMusicByIndex = useCallback((index: number) => {
        const trackNames = Object.keys(tracks.current) as TrackName[];
        if (index >= 0 && index < trackNames.length) {
            const trackName = trackNames[index];
            stopAllMusics();
            tracks.current[trackName].play();
            currentTrack.current = trackName;
            isPlaying.current = true;
            setCurrentMusicIndex(index);
        }
    }, [stopAllMusics]);

    const handleChangeMusic = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (isRadioOn && !isTransitioning) {
            setIsTransitioning(true);
            playTuning();
            stopAllMusics();
            
            const nextIndex = (currentMusicIndex + 1) % 4;
            setCurrentMusicIndex(nextIndex);
            
            loadTrack(`happyChildren`);
            
            playMusicByIndex(nextIndex);
            setTimeout(() => {
                stopTuning();
                setIsTransitioning(false);
            }, 500);
        }
    };

    const shape: ShapeType = {
        onClick: handleRadioClick,
        title: 'Radio',
        type: 'rectangle',
        x: 913.8689458689458,
        y: 903.6581196581196,
        width: 155.71509971509965,
        height: 119.97720797720797
    };

    const shapeChangeMusic: ShapeType = {
        onClick: (e) => handleChangeMusic(e),
        title: 'Change Music',
        type: 'rectangle',
        x: 1010.8717948717948,
        y: 970.0284900284901,
        width: 48.501424501424594,
        height: 43.39601139601132
    };

    return <>
        <Shape shape={shape} index="radio" />
        {isRadioOn && <Shape shape={shapeChangeMusic} index="changeMusic" />}
    </>;
});

export const ImageRadio = memo(() => {
    const { state: { isRadioOn } } = useAppContext();
    return <image xlinkHref={radioOn.src} className={isRadioOn ? 'opacity-100' : 'opacity-0'} />;
});

MarkerRadio.displayName = 'MarkerRadio';
ImageRadio.displayName = 'ImageRadio';