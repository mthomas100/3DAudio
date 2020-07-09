import React, { Fragment, useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable';
import {useSpring, animated} from 'react-spring'
import { ReactComponent as HandleIcon } from '../images/grip-vertical-solid.svg';
import { Handle } from './Music/Slider/components';
import extractCSS from "component-css-extractor";

//redux imported
import { connect } from 'react-redux';
//import { Link, Redirect } from 'react-router-dom';
import { toggleMinimized } from '../../actions/alert';
//import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

//Camera Controls
//Window minimize/maximize system which puts minimized window at a task tray
//Task tray location (trayIndex) management


const handleStyle = {
    position: 'relative',
    width: '30px',
    height: '30px',
    top: '0px',
    left: '0px'
}

const dragArray = []; // x , y
let dragStart = [];
let dragEnd = [];
let dragDifference = [0, 0];

//below to be replaced by state or some prop passing in or somethign to maintain taskbar order
const trayIndex = 1; 

const dragEndHandler = () => {
    dragStart = dragArray[0];
    dragEnd = dragArray[dragArray.length -1];
    dragDifference = [dragEnd[0] - dragStart[0], dragEnd[1] - dragStart[1]];
}

const OpenBox = ({ handleCameraChange, minimize }) => {
    // const [isToggled, setIsToggled ] = useState(true);
    

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
        },
    });



    return (
    <Draggable 
    handle="myHandle"
    onDrag={(e) => dragArray.push([e.clientX, e.clientY])}
    onStop={() => dragEndHandler()}
    // ref={ref1}>
    >
    <animated.div style={openBoxStyle}>
      <myHandle><HandleIcon style={handleStyle}/></myHandle>
      <h1>Camera Configuration</h1>
      <form>
        <button name="camX" onClick={(e) => handleCameraChange(e, -1)}>
          {' '}
          Decrement camX
        </button>
        <button name="camX" onClick={(e) => handleCameraChange(e, 1)}>
          {' '}
          Increment camX
        </button>
        <button name="camY" onClick={(e) => handleCameraChange(e, -1)}>
          {' '}
          Decrement camY
        </button>
        <button name="camY" onClick={(e) =>  handleCameraChange(e, 1)}>
          {' '}
          Increment camY
        </button>
        <button name="camZ" onClick={(e) => handleCameraChange(e, -1)}>
          {' '}
          Decrement camZ
        </button>
        <button name="camZ" onClick={(e) => handleCameraChange(e, 1)}>
          {' '}
          Increment camZ
        </button>
        {/* <button onClick={consoleLog}> Console Log</button> */}
      </form>
        <button onClick={minimize}>Minimize</button>
        <button onClick={() => console.log(dragArray)}>Drag Array</button>
        <button onClick={() => console.log(dragEnd)}>Last Index</button>
        <button onClick={() => console.log(dragStart)}>First Index</button>
        <button onClick={() => console.log(dragDifference)}>Drag Difference</button>
      {/* <button onClick={() => setIsToggled(!isToggled)}>Toggle Spring</button> */}
    </animated.div>
    </Draggable>
    )
}

const ClosedBox = ({maximize, handleOpenWindow}) => {

    const minimizedX = 0;

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
        },
    });

    // useEffect(() => {
    //     handleOpenWindow();
    //   }, []);

    return (<animated.div style={closedBoxStyle}>
        <h2 onClick={() => {maximize()}}>Camera</h2>
    </animated.div>)
}

export default function Camera({ handleCameraChange, handleCloseWindow, handleOpenWindow }) {
    
    const [isOpen, setIsOpen] = useState(false);

  return (isOpen === true) ? 
  <OpenBox 
  handleCameraChange={handleCameraChange}
  minimize={
      () => {
          setIsOpen(!isOpen);
          handleCloseWindow('Camera');
          }}/> : 
  <ClosedBox
  maximize={() => {
      setIsOpen(!isOpen);
      handleOpenWindow('Camera');
      }} />
};

Register.propTypes = {
  //setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  //isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { /*register*/ }
)(Camera);
