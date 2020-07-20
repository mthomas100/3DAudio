import React, { useState, useContext, useEffect, useRef, useMemo } from 'react'
import Draggable from 'react-draggable'
import { useSpring, animated } from 'react-spring'
import { ReactComponent as HandleIcon } from '../images/grip-vertical-solid.svg'
import { Handle } from './Music/Slider/components'

//Context
import { StoreContext } from "../context/store/storeContext";

// Components
import Camera from './WindowComponents/Camera';
import Music from './WindowComponents/Music';

//README
//For new components, 3 things must be updated:
//1) Components imports
//2) componentObject
//3) both of the state arrays in the bottom window component with matching names 
// Future update - possible to make this all a window config import? 


// ( COMPLETE )TODO: Strip out components 
//Window Management Index useReducer/useContext
//Fix CSS on the new sound/ window component 
//Do all state updates through useReducer/useContext
//Then move the thing with the stateHandler needed import up to the top for readability <!-- make notes on what needs to be changed, where needed
//Improve Camera Functionality (d3/use-Spring/for-each) + trig / orbital component functions
//Make sound work with cube collisions (brainstorm other cool sound/visual ideas)
//Import museum or similar from 3d model site
//Implement "walking" functionality (using keyboard inputs to navigate) // possibly a side project [at this pont decide whether to start new project or whether to keep windows...]
//Make the window functionality cleaner and really refine the UI to be like photoshop or something
//Spin off and make a DAW using my new window interface 
//Clean up control panels, refine UI, standardize

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




const dragEndHandler = () => {
  dragStart = dragArray[0]
  dragEnd = dragArray[dragArray.length - 1]
  dragDifference = [dragEnd[0] - dragStart[0], dragEnd[1] - dragStart[1]]
}

//any MAIN PROPS to be passed to component go here
const OpenBox = ({ minimize, componentName, stateHandler, trayIndex }) => {
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
      left: `calc(${trayIndex * 210}px`,
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
      handle="myHandle1"
      onDrag={(e) => dragArray.push([e.clientX, e.clientY])}
      onStop={() => dragEndHandler()}   
    >
      <animated.div style={openBoxStyle}>
        <myHandle1>
          <HandleIcon style={handleStyle} />
        </myHandle1>

        {componentObject[componentName]}
        <button onClick={minimize}>Minimize</button> {/*temporary minimize button*/}
      </animated.div>

    </Draggable>
  )
}

const ClosedBoxFinal = ({ maximize, componentName, trayIndex }) => {

  const closedBoxStyle = useSpring({
    to: async (next, cancel) => {
      await next({
        position: 'absolute',
        zIndex: '2',
        top: 'calc(96vh - 0px)',
        left: `calc(${trayIndex * 210}px`, //should be unique to this component
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

const ClosedBoxInitial = ({ maximize, componentName, trayIndex }) => {
  // console.log('ClosedBoxInitial ' + componentName + ' ran');

  const closedBoxStyle = {
    position: 'absolute',
    zIndex: '2',
    top: 'calc(96vh - 0px)',
    left: `calc(${trayIndex * 210}px`, //should be unique to this component
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

const ClosedBox = ({ maximize, componentName, trayIndex, loadCount, setLoadCount, actions  }) => {

  //console.log('loadCount is ' + loadCount[componentName] + ' for ' + componentName);

  useEffect(() => {
    if (loadCount[componentName] === 0) {
      actions.generalActions.minimizeWindow(componentName)
    }
    setLoadCount(prevValue => ({...loadCount, [componentName] : prevValue[componentName] + 1}));
  }, [])

  return (loadCount[componentName] <= 1) ? //equivalent to total number of componenets
  <ClosedBoxInitial 
  maximize={maximize}
  componentName={componentName}
  trayIndex={trayIndex} /> : 
  <ClosedBoxFinal 
  maximize={maximize}
  componentName={componentName}
  trayIndex={trayIndex} />
}

const Window = ( { componentName, componentCode, stateHandler, trayIndex} ) => { 
  const { state, actions } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState({
    Camera : false,
    Music : false
  })
  const [loadCount, setLoadCount] = useState({
    Camera : 0,
    Music : 0
  });

  return isOpen[componentName] === true ? (
    <OpenBox
      componentName={componentName}
      stateHandler = {stateHandler}
      trayIndex={trayIndex}
      minimize={() => {
        setIsOpen({...isOpen, [componentName] : false}) //local
        actions.generalActions.minimizeWindow(componentName); //CONTEXT ACTION (COMPONENT NAME)
      }}
    />
  ) : (
    <ClosedBox
      componentName={componentName}
      trayIndex={trayIndex}
      maximize={() => {
        setIsOpen({...isOpen, [componentName] : true}) //local
        actions.generalActions.maximizeWindow(componentName); //CONTEXT ACTION (COMPONENT NAME)
      }}
      setLoadCount={setLoadCount}
      loadCount={loadCount}
      actions={actions}
    />
  )
}

export default Window;