import React, { useRef } from 'react';
import './audio-card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, } from '@fortawesome/free-solid-svg-icons';
import samplefile from '../../assets/samplefile.mp3'

const AudioCard = () => {
  const audioRef = useRef(null);

  
  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

   
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  return (
    <div className="cardAudio" >
      
      <div className='innercard' >
        
        <button onClick={skipBackward} className="control-button">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        
        <button onClick={skipForward} className="control-button">
          <FontAwesomeIcon icon={faForward} />
        </button>
         
       
       <audio controls ref={audioRef} style={{ width: "100%" }}>
        <source src={samplefile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
     
      </div>
      
    </div>
  );
}

export default AudioCard;
