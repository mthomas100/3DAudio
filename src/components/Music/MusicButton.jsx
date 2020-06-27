import React, { useState} from "react";
import Tone from "tone";

function MusicButton (props) {

    const sound = (inst) => {
        return new Tone[inst]().toMaster();
    }

    // const [isLoaded, setLoaded] = useState(false);

    const handleClick = (note, octave, duration, instrument) => sound(instrument).triggerAttackRelease(note + octave, duration);//C4 8n

    return (
      <button onClick={() => handleClick(props.note, props.octave, props.duration, props.instrument)}>
        Note : {props.note}
        <br/>
        Octave: {props.octave}
        <br />
        Duration: {props.duration}
      </button>
    ); 
}


export default MusicButton; 