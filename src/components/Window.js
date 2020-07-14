import React, { useState, useContext, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import { useSpring, animated } from 'react-spring'
import { ReactComponent as HandleIcon } from '../images/grip-vertical-solid.svg'
import { Handle } from './Music/Slider/components'

//Context
import { StoreContext } from "../context/store/storeContext";

// Components
import Camera from './WindowComponents/Camera';
import Music from './WindowComponents/Music';

// //Alternative to Components (single config file with linking there)
// import Camera from './WindowComponents/windowConfig';

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


const trayIndex = 3 // will be replaced from context index
                    // findIndex based on the provided prop name for component

const dragEndHandler = () => {
  dragStart = dragArray[0]
  dragEnd = dragArray[dragArray.length - 1]
  dragDifference = [dragEnd[0] - dragStart[0], dragEnd[1] - dragStart[1]]
}

//any MAIN PROPS to be passed to component go here
const OpenBox = ({ minimize, componentName, stateHandler }) => {
  // const [isToggled, setIsToggled ] = useState(true);

  const openBoxStyle = useSpring({
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

  const componentObject = {
    Camera : <Camera stateHandler={stateHandler} />, 
    Music : <Music stateHandler={stateHandler} />
  }

  return (
    <Draggable
      handle="myHandle"
      onDrag={(e) => dragArray.push([e.clientX, e.clientY])}
      onStop={() => dragEndHandler()}
    >
      <animated.div style={openBoxStyle}>
        <myHandle>
          <HandleIcon style={handleStyle} />
        </myHandle>

        {componentObject[componentName]}
        <button onClick={minimize}>Minimize</button> {/*temporary minimize button*/}
      </animated.div>

    </Draggable>
  )
}

const ClosedBoxFinal = ({ maximize, componentName }) => {

  const closedBoxStyle = useSpring({
    to: async (next, cancel) => {
      await next({
        position: 'absolute',
        zIndex: '2',
        top: 'calc(96vh - 0px)',
        left: `calc(${trayIndex * 200}px`, //should be unique to this component
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

  return (
    <animated.div 
    style={closedBoxStyle}
    >
      <h2
        onClick={() => {
          maximize();
        }}>
        {componentName}
      </h2>
    </animated.div>
  )
}

const ClosedBoxInitial = ({ maximize, componentName }) => {
  const closedBoxStyle = {
    position: 'absolute',
    zIndex: '2',
    top: 'calc(96vh - 0px)',
    left: `calc(${trayIndex * 200}px`, //should be unique to this component
    backgroundColor: 'white',
    height: '50px',
    width: '200px'
  }

  return (
    <animated.div style={closedBoxStyle}>
      <h2
        onClick={() => {
          maximize()
        }}>
        {componentName}
      </h2>
    </animated.div>
  )
}

let loadInstance = 0;

const ClosedBox = ({ maximize, componentName }) => {
  loadInstance++;

  return (loadInstance <= 1) ? 
  <ClosedBoxInitial 
  maximize={maximize}
  componentName={componentName} /> : 
  <ClosedBoxFinal 
  maximize={maximize}
  componentName={componentName}/>
}

export default function Window( { componentName, componentCode, stateHandler } ) { 
  const { state, actions } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false)

  return isOpen === true ? (
    <OpenBox
      componentName={componentName}
      stateHandler = {stateHandler}
      minimize={() => {
        setIsOpen(!isOpen) //local
        actions.generalActions.minimizeWindow('Camera'); //CONTEXT ACTION (COMPONENT NAME)
      }}
    />
  ) : (
    <ClosedBox
      componentName={componentName}
      maximize={() => {
        setIsOpen(!isOpen) //local
        actions.generalActions.maximizeWindow('Camera'); //CONTEXT ACTION (COMPONENT NAME)
      }}
    />
  )
}
