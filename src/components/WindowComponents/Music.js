import React, { useState, useRef, useEffect, Fragment } from 'react';
import MusicButton from '../Music/MusicButton';
import MySlider from '../Music/Slider/SliderComponents';
import SourceList from '../Music/SourceList';

export default function Music({ stateHandler }) {
    const [note, setNote] = useState('')
    const [octave, setOctave] = useState('')
    const [duration, setDuration] = useState('')
    const [instrument, setInstument] = useState('')
    const noteArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    const octaveArray = ['1', '2', '3', '4', '5', '6', '7', '8']
    const durationArray = ['1n', '2n', '4n', '8n', '16n', '32n']

  function getNoteValue(e, value) {
    switch (value) {
      case 'note':
        setNote(noteArray[e])
        stateHandler('note', noteArray[e])
        break
      case 'octave':
        setOctave(octaveArray[e])
        stateHandler('octave', octaveArray[e])
        break
      case 'duration':
        setDuration(durationArray[e])
        stateHandler('duration', durationArray[e])
        break
      default:
        console.log('default triggered')
        break
    }
  }

  function getInstrument(e) {
    setInstument(e)
    stateHandler('instrument', e)
  }

  return (
    <Fragment>
      <h1>Note Configuration</h1>
      <MySlider note={(e) => getNoteValue(e, 'note')} domainMin={0} domainMax={6} tickArray={noteArray} />
      <MySlider note={(e) => getNoteValue(e, 'octave')} domainMin={0} domainMax={7} tickArray={octaveArray} />
      <MySlider note={(e) => getNoteValue(e, 'duration')} domainMin={0} domainMax={5} tickArray={durationArray} />

      <div className="bottom"></div>
      <SourceList getInstrument={getInstrument} />

      <MusicButton note={note} octave={octave} duration={duration} instrument={instrument} />
    </Fragment>
  )
}
