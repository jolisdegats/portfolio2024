import gifCat from '@/assets/gif-cat.webp';
import { useLazySound } from '@/lib/hooks/useLazySound';
import catPurring from '@/assets/sounds/cat-purring.mp3';
import Shape, { type ShapeType } from '../Shape';
import { useState, useCallback } from 'react';

const VOLUME = 0.3;

export const MarkerCat = () => {
    const { play, sound, stop, isLoaded, loadSound } = useLazySound(catPurring, { interrupt: true, volume: VOLUME });
    const [isDragging, setIsDragging] = useState(false);

    const startDragging = useCallback(() => {
        setIsDragging(true);
        if (isLoaded) {
            play();
            sound.fade(0, VOLUME, 300);
        } else {
            loadSound();
            play();
            sound.fade(0, VOLUME, 300);
        }
    }, [sound, play, isLoaded, loadSound]);

    const stopDragging = useCallback(() => {
        setIsDragging(false);
        if (isLoaded) {
            sound.fade(VOLUME, 0, 300);
            return () => stop();
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