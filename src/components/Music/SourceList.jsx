import React, { useState } from 'react'

export default function SourceList(props) {

    const handleChange = (event) => {
        props.getInstrument(event.target.value);
    }

    return (
    <div className="btn-group">
      <div className="form-control">
        <label for="instrumentSelect">Choose Instrument</label>
        <select className="form-control" id="instrumentSelect" onChange={handleChange}>
          <option value="AMSynth">AMSynth</option>
          <option value="DuoSynth">DuoSynth</option>
          <option value="FMSynth">FMSynth</option>
          <option value="MembraneSynth">MembraneSynth</option>
          <option value="MetalSynth">MetalSynth</option>
          <option value="MonoSynth">MonoSynth</option>
          <option value="Monophonic">Monophonic</option>
          <option value="NoiseSynth">NoiseSynth</option>
          <option value="PluckSynth">PluckSynth</option>
          <option value="PolySynth">PolySynth</option>
          <option value="Sampler">Sampler</option>
          <option value="Synth">Synth</option>
        </select>
      </div>
    </div>
    );
}