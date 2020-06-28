import React, { useState, useRef, useEffect } from "react";
import MusicButton from "./MusicButton";
// import { MySlider, MyHandle } from "./SliderComponents";
// import { Slider, Handle } from 'react-compound-slider';
import MySlider from "./Slider/SliderComponents";
import SourceList from "./SourceList";

const Music = () => {
    const [note, setNote ] = useState('');
    const [octave, setOctave ] = useState('');
    const [duration, setDuration ] = useState('');
    const [instrument, setInstument ] = useState('');
    const noteArray = ['A','B','C','D','E','F','G'];
    const octaveArray = ['1','2','3','4','5','6','7','8'];
    const durationArray = ['1n','2n','4n','8n','16n','32n'];

    function getNoteValue(e, value) {
      switch (value) {
        case 'noteVal':
          setNote(noteArray[e]);
          break;
        case 'octaveVal':
          setOctave(octaveArray[e]);
          break;
        case 'durationVal':
          setDuration(durationArray[e]);
          break;
        default:
          break;
      }
    }

    function getInstrument(e) {
      setInstument(e);      
    }
  
    return (
      <div className ="wrapper">
        <h1>Note Configuration</h1>
            <MySlider
            note ={(e) => getNoteValue(e, 'noteVal')}
            domainMin={0}
            domainMax={6}
            tickArray={noteArray}
            />
            <MySlider
            note ={(e) => getNoteValue(e, 'octaveVal')}
            domainMin = {0}
            domainMax = {7}
            tickArray={octaveArray}
            />
            <MySlider
            note ={(e) => getNoteValue(e, 'durationVal')}
            domainMin = {0}
            domainMax = {5}
            tickArray={durationArray}
            />

            <div className="bottom"></div>
            <SourceList 
            getInstrument={getInstrument}
            />
            
            
            <MusicButton 
            note = {note}
            octave = {octave}
            duration = {duration}
            instrument = {instrument}
            /> 

        <h1></h1>

      </div>
    );
  };

export default Music;