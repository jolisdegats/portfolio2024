'use client'

import BackgroundImage from "@/components/BackgroundImage";
import Credits from "@/components/Credits";
import { toggleHelpMarkers, changeModal, initializeSounds } from "@/lib/context";
import { useAppContext } from "@/lib/hooks";
import { FaQuestionCircle, FaRegCopyright } from "react-icons/fa";
import { useEffect } from 'react';

const ClientPage = () => {
    const { dispatch } = useAppContext(); 
    
    useEffect(() => {
        const handleFirstInteraction = () => {
            dispatch(initializeSounds());
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, [dispatch]);

    return <div className="relative">
      <BackgroundImage />
      <div className="absolute bottom-5 right-5 flex space-x-1">
      <button 
      onTouchStart={() => dispatch(toggleHelpMarkers())}
      onTouchEnd={() => setTimeout(() => dispatch(toggleHelpMarkers()), 300)}
      onMouseDown={() => dispatch(toggleHelpMarkers())}
      onMouseUp={() => setTimeout(() => dispatch(toggleHelpMarkers()), 300)}
      className="bg-white hover:bg-opacity-30 bg-opacity-0 rounded-md p-1.5 cursor-pointer text-white text-opacity-30 hover:text-opacity-100">
          <FaQuestionCircle className="text-xl " title="Help" />
        </button>
        <button onClick={() => dispatch(changeModal({name : "credits"}))} className="bg-white hover:bg-opacity-30 bg-opacity-0 rounded-md p-1.5 cursor-pointer text-white text-opacity-30 hover:text-opacity-100">
          <FaRegCopyright className="text-xl " title="Credits" />
        </button>
       <Credits />
      </div>
    </div>
}

export default ClientPage;