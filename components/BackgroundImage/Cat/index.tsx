import gifCat from '@/assets/gif-cat.webp';
import { useSoundManager } from '@/lib/hooks/useSoundManager';
import catPurring from '@/assets/sounds/cat-purring.mp3';
import Shape, { type ShapeType } from '@/components/BackgroundImage/Shape';
import { useState, useCallback } from 'react';

const VOLUME = 0.2;

export const MarkerCat = () => {
    const { play, stop, sound, isLoaded, loadSound } = useSoundManager(catPurring, { interrupt: true, loop: true, volume: VOLUME });
    const [isDragging, setIsDragging] = useState(false);

    const startDragging = useCallback(() => {
        setIsDragging(true);
        if (isLoaded) {
            play();
            if (sound) {
                sound.fade(0, VOLUME, 300);
            }
        } else {
            loadSound();
            play();
            if (sound) {
                sound.fade(0, VOLUME, 300);
            }
        }
    }, [sound, play, isLoaded, loadSound]);

    const stopDragging = useCallback(() => {
        setIsDragging(false);
        if (isLoaded && sound) {
            sound.fade(VOLUME, 0, 300);
            setTimeout(() => stop(), 300);
        }
    }, [sound, stop, isLoaded]);

    const shape: ShapeType = {
        type: "rectangle",
        style: { cursor: isDragging ? "grabbing" : "grab" },
        onTouchStart: startDragging,
        onTouchEnd: stopDragging,
        onMouseDown: startDragging,
        onMouseUp: stopDragging,
        onMouseLeave: stopDragging,
        onMouseOver: () => {
            if (isDragging && isLoaded) {
                play();
            }
        },
        onMouseOut: () => {
            if (isLoaded) {
                stop();
            }
            setIsDragging(false);
        },
        title: 'cat',
        x: 1092.5584045584046,
        y: 1102.7692307692307,
        width: 74.02849002849007,
        height: 148.05698005698014,
    };
    
    return (<Shape shape={shape} index="cat" />);
};

export const ImageCat = () => {
    return <image xlinkHref={gifCat.src} width="100%" height="100%" />;
};