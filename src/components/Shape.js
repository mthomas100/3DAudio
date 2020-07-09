import React, { useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable';
import {useSpring, animated} from 'react-spring'
import { ReactComponent as HandleIcon } from '../images/grip-vertical-solid.svg';
import { Handle } from './Music/Slider/components';
import extractCSS from "component-css-extractor";

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

const OpenBox = ({ minimize, closedIndex }) => {
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
            left: `calc(${closedIndex('Shape') * 200}px`,
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
      <h1>Shape Controls</h1>
      <p>lorem</p>
      <p>ipsum</p>
      <p>pipsum</p>
      <button onClick={minimize}>Minimize</button>
    </animated.div>
    </Draggable>
    )
}

const ClosedBox = ({maximize, handleOpenWindow, closedIndex}) => {

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
            left: `calc(${closedIndex('Shape') * 200}px`, //MINIMIZES TO (calc by index....)
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
        <h2 onClick={() => {maximize()}}>Shape</h2>
    </animated.div>)
}

export default function Shape({ handleCloseWindow, handleOpenWindow, closedIndex }) {
    
    const [isOpen, setIsOpen] = useState(false);

  return (isOpen === true) ? 
  <OpenBox
  minimize={
      () => {
          setIsOpen(!isOpen);
          handleCloseWindow('Shape');
          }}
  closedIndex={() => closedIndex()}
  /> : 
  <ClosedBox
  maximize={() => {
      setIsOpen(!isOpen);
      handleOpenWindow('Shape');
      }}
  closedIndex={() => closedIndex()}
  />
}
