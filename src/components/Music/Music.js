import React, { useState, useRef, useEffect } from 'react'
import MusicButton from './MusicButton'
// import { MySlider, MyHandle } from "./SliderComponents";
// import { Slider, Handle } from 'react-compound-slider';
import MySlider from './Slider/SliderComponents'
import SourceList from './SourceList'
import Draggable from 'react-draggable'
import { useSpring, animated } from 'react-spring'
import { ReactComponent as HandleIcon } from '../../images/grip-vertical-solid.svg'

const handleStyle = {
  position: 'relative',
  width: '30px',
  height: '30px',
  top: '0px',
  left: '0px'
}

const dragArray = [] // x , y
let dragStart = []
let dragEnd = []
let dragDifference = [0, 0]

//below to be replaced by state or some prop passing in or somethign to maintain taskbar order
const trayIndex = 2

const dragEndHandler = () => {
  dragStart = dragArray[0]
  dragEnd = dragArray[dragArray.length - 1]
  dragDifference = [dragEnd[0] - dragStart[0], dragEnd[1] - dragStart[1]]
}

const OpenBox = ({ handleSoundChange, minimize }) => {
  const [note, setNote] = useState('')
  const [octave, setOctave] = useState('')
  const [duration, setDuration] = useState('')
  const [instrument, setInstument] = useState('')
  const noteArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  const octaveArray = ['1', '2', '3', '4', '5', '6', '7', '8']
  const durationArray = ['1n', '2n', '4n', '8n', '16n', '32n']

  const openBoxStyle = useSpring({
    config: {
      //mass: 1000, tension: 0, friction: 1,axddffvnjntrxy
      // easing : easings.easeExp
    },
    to: async (next, cancel) => {
      await next({
        position: 'absolute',
        zIndex: '2',
        top: '0vh',
        left: '0px',
        backgroundColor: 'white',
        height: '400px',
        width: '400px'
      })
    },
    from: {
      position: 'absolute',
      zIndex: '2',
      top: '96vh',
      left: `calc(${trayIndex * 200}px`,
      backgroundColor: 'white',
      height: '50px',
      width: '200px'
    }
  })

  function getNoteValue(e, value) {
    switch (value) {
      case 'note':
        setNote(noteArray[e])
        handleSoundChange('note', noteArray[e])
        break
      case 'octave':
        setOctave(octaveArray[e])
        handleSoundChange('octave', octaveArray[e])
        break
      case 'duration':
        setDuration(durationArray[e])
        handleSoundChange('duration', durationArray[e])
        break
      default:
        console.log('default triggered')
        break
    }
  }

  function getInstrument(e) {
    setInstument(e)
    handleSoundChange('instrument', e)
  }

  return (
    <Draggable
      handle="myHandle"
      onDrag={(e) => dragArray.push([e.clientX, e.clientY])}
      onStop={() => dragEndHandler()}
      // ref={ref1}>
    >
      <animated.div style={openBoxStyle}>
        <myHandle>
          <HandleIcon style={handleStyle} />
        </myHandle>
        <h1>Note Configuration</h1>
        <MySlider note={(e) => getNoteValue(e, 'note')} domainMin={0} domainMax={6} tickArray={noteArray} />
        <MySlider note={(e) => getNoteValue(e, 'octave')} domainMin={0} domainMax={7} tickArray={octaveArray} />
        <MySlider note={(e) => getNoteValue(e, 'duration')} domainMin={0} domainMax={5} tickArray={durationArray} />

        <div className="bottom"></div>
        <SourceList getInstrument={getInstrument} />
        <button onClick={minimize}>Minimize</button>

        <MusicButton note={note} octave={octave} duration={duration} instrument={instrument} />
      </animated.div>
    </Draggable>
  )
}

const ClosedBox = ({ maximize, handleOpenWindow }) => {
  const minimizedX = 0

  const closedBoxStyle = useSpring({
    config: {
      //mass: 1000, tension: 0, friction: 1,axddffvnjntrxy
      // easing : easings.easeExp
    },
    to: async (next, cancel) => {
      await next({
        position: 'absolute',
        zIndex: '2',
        top: 'calc(96vh - 0px)',
        left: `calc(${trayIndex * 200}px`, //MINIMIZES TO (calc by index....)
        backgroundColor: 'white',
        height: '50px',
        width: '200px'
      })
    },
    from: {
      position: 'absolute',
      zIndex: '2',
      top: `calc(0vh + ${dragDifference[1]}px)`,
      left: `${dragDifference[0]}px`,
      backgroundColor: 'white',
      height: '400px',
      width: '400px'
    }
  })

  // useEffect(() => {
  //     handleOpenWindow();
  //   }, []);

  return (
    <animated.div style={closedBoxStyle}>
      <h2
        onClick={() => {
          maximize()
        }}>
        Music
      </h2>
    </animated.div>
  )
}

export default function Camera({ handleSoundChange, handleCloseWindow, handleOpenWindow }) {
  const [isOpen, setIsOpen] = useState(false)

  return isOpen === true ? (
    <OpenBox
      handleSoundChange={handleSoundChange}
      minimize={() => {
        setIsOpen(!isOpen)
        handleCloseWindow('Music')
      }}
    />
  ) : (
    <ClosedBox
      maximize={() => {
        setIsOpen(!isOpen)
        handleOpenWindow('Music')
      }}
    />
  )
}
