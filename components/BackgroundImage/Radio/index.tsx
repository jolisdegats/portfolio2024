import Shape, { ShapeType } from "../Shape";
import radioMusicHappyChildren from '@/assets/sounds/happy-children.mp3';
import radioMusicShy from '@/assets/sounds/shy.mp3';
import radioMusicSmoothOperator from '@/assets/sounds/smooth-operator.mp3';
import radioMusicDreams from '@/assets/sounds/dreams.mp3';
import radioTuning from '@/assets/sounds/tuning-radio.mp3';
import radioSwitch from '@/assets/sounds/radio-switch.mp3';
import radioOn from '@/assets/radio-on.webp';
import { toggleRadio } from "@/lib/context";
import { useAppContext } from "@/lib/hooks";
import { useState, useCallback } from 'react';
import { useLazySound } from '@/lib/hooks/useLazySound';

export const MarkerRadio = () => {
    const { state: { isRadioOn }, dispatch } = useAppContext();
    const [currentMusicIndex, setCurrentMusicIndex] = useState(-1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    const { sound: soundHappyChildren, loadSound: loadHappyChildren, isLoaded: isHappyChildrenLoaded } = useLazySound(radioMusicHappyChildren);
    const { sound: soundShy, loadSound: loadShy, isLoaded: isShyLoaded } = useLazySound(radioMusicShy);
    const { sound: soundSmoothOperator, loadSound: loadSmoothOperator, isLoaded: isSmoothOperatorLoaded } = useLazySound(radioMusicSmoothOperator);
    const { sound: soundDreams, loadSound: loadDreams, isLoaded: isDreamsLoaded } = useLazySound(radioMusicDreams);
    
    const { play: playSwitch, stop: stopSwitch } = useLazySound(radioSwitch, { volume: 0.25 });
    const { play: playTuning, stop: stopTuning } = useLazySound(radioTuning, { volume: 0.5 });

    const stopAllMusics = useCallback(() => {
        [soundHappyChildren, soundShy, soundSmoothOperator, soundDreams].forEach(sound => {
            if (sound) sound.stop();
        });
    }, [soundHappyChildren, soundShy, soundSmoothOperator, soundDreams]);

    const playMusicByIndex = useCallback((index: number) => {
        const musicArray = [soundHappyChildren, soundShy, soundSmoothOperator, soundDreams];
        const currentSound = musicArray[index];
        if (currentSound) {
            currentSound.play();
        }
    }, [soundHappyChildren, soundShy, soundSmoothOperator, soundDreams]);

    const handleRadioClick = () => {
        dispatch(toggleRadio());
        if (isRadioOn) {
            playSwitch();
            stopTuning();
            stopAllMusics();
            setCurrentMusicIndex(-1);
            setIsTransitioning(false);
            return () => stopSwitch();
        } else {
            playSwitch();
            playTuning();
            if (!isHappyChildrenLoaded) {
                loadHappyChildren();
            }
            setCurrentMusicIndex(0);
            setIsTransitioning(true);
            if (soundHappyChildren) {
                soundHappyChildren.play();
            }
            setTimeout(() => {
                stopTuning();
                setIsTransitioning(false);
            }, 2000);
            return () => stopSwitch();
        }
    };

    const handleChangeMusic = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
        if (isRadioOn && !isTransitioning) {
            setIsTransitioning(true);
            playTuning();
            stopAllMusics();
            
            const nextIndex = (currentMusicIndex + 1) % 4;
            setCurrentMusicIndex(nextIndex);
            
            switch (nextIndex) {
                case 0:
                    if (!isHappyChildrenLoaded) loadHappyChildren();
                    break;
                case 1:
                    if (!isShyLoaded) loadShy();
                    break;
                case 2:
                    if (!isSmoothOperatorLoaded) loadSmoothOperator();
                    break;
                case 3:
                    if (!isDreamsLoaded) loadDreams();
                    break;
            }
            
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
};

export const ImageRadio = () => {
    const { state: { isRadioOn } } = useAppContext();
    return <image xlinkHref={radioOn.src} className={isRadioOn ? 'opacity-100' : 'opacity-0'} />;
};
