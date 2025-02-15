import gifCat from '@/assets/gif-cat.webp';
import useSound from 'use-sound';
import catPurring from '@/assets/sounds/cat-purring.mp3';
import Shape, { type ShapeType } from '../Shape';
import { useState, useCallback } from 'react'; // Added useCallback

export const MarkerCat = () => {
    const [play, { sound, stop }] = useSound(catPurring, {interrupt: true, volume: 0.7});
    const [isDragging, setIsDragging] = useState(false);

    const startDragging = useCallback(() => {
        setIsDragging(true);
        play()
        sound.fade(0, 0.7, 1000);
    }, [sound, play]);

    const stopDragging = useCallback(() => {
        setIsDragging(false);
        sound.fade(0.7, 0, 300);
        return ()=> stop()
    }, [sound,stop]);

    const shape: ShapeType = {
        type:"rectangle",
        style: {cursor: isDragging ? "grabbing" : "grab"},
        onMouseDown: startDragging,
        onMouseUp: stopDragging,
        onMouseLeave: stopDragging,
        onMouseOver: () => {
            if (isDragging) {
                play();
            }
        },
        onMouseOut: () => {
            stop();
            setIsDragging(false);
        },
        title: 'coffee',
        x:1092.5584045584046 ,
        y:1102.7692307692307, 
        width:74.02849002849007, 
        height:148.05698005698014,
       
    }
    return (<Shape shape={shape} index="cat"/>
    )
}


export const ImageCat = () => {
return <image xlinkHref={gifCat.src}  width="100%" height="100%" />
}