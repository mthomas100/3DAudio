import ReactDOM from 'react-dom'
import React, { useRef, useState, Fragment } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Box from './Box'
import Sphere from './Sphere'
import { Physics, usePlane, useBox } from 'use-cannon'
import Plane from '../components/Plane'
import Cube from '../components/Cube'
import '../styles.css'
import Tone from 'tone'
import Draggable from 'react-draggable'
import Music from './Music/Music';
import Camera from './Camera';

function App() {
  let count = 0;

  function noteConvert() {
    switch (count % 7) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      case 4:
        return 'E';
      case 5:
        return 'F';
      case 6:
        return 'G';
      default:
        break;
    }
  }

  function handleCollide(e) {

    const L = () => noteConvert(count);

    if (count < 7) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}1`,'8n');
    } else if (count < 14) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}2`,'8n');
    } else if (count < 21) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}3`,'8n');
    } else if (count < 28) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}4`,'8n');
    } else if (count < 35) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}5`,'8n');
    } else {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}6`,'8n');
    }

    count ++;
    // new Tone.AMSynth().toMaster().triggerAttackRelease('C4','8n');
  }

  // const [cam, setCam] = useState({
  //   camX : -1,
  //   camY: 2,
  //   camZ: 5
  // });

  // function getCameraObject(cameraObject) {
  //   setCam(cameraObject);
  // }

  const [cameraObject, setCameraObject] = useState({
    camX: -1,
    camY: 2,
    camZ: 5
  })

function handleChange(event, n) {
  const { value, name } = event.target
  switch (name) {
    case 'camX':
      setCameraObject((prevValue) => ({
        camX: prevValue.camX + n,
        camY: prevValue.camY,
        camZ: prevValue.camZ
      }))
      break

    case 'camY':
      setCameraObject((prevValue) => ({
        camX: prevValue.camX,
        camY: prevValue.camY + n,
        camZ: prevValue.camZ
      }))
      break

    case 'camZ':
      setCameraObject((prevValue) => ({
        camX: prevValue.camX,
        camY: prevValue.camY,
        camZ: prevValue.camZ + n
      }))
      break

    default:
      break
  }
  
  console.log(cameraObject);

  event.preventDefault();
}

  function ChangeCam() {
    useFrame(({ camera }) => camera.updateProjectionMatrix(cameraObject.camX, cameraObject.camY, cameraObject.camZ))
    return null
  }

  const CameraDolly = () =>
  useFrame(state => {
    state.camera.position.x = cameraObject.camX
    state.camera.position.y = cameraObject.camY
    state.camera.position.z = cameraObject.camZ
    state.camera.fov = 50
    // state.camera.lookAt(5, 0, 0)
    state.camera.updateProjectionMatrix()
  })
   

  return (
    <Fragment>
      <Draggable>
        <div className="musicControls">
          <Music />
        </div>
      </Draggable>

      <Draggable>
      <div className="cameraControls">
      <div className ="wrapper">
            <h1>Camera Configuration</h1>
            <form>
                <button name="camX" onClick={(e) => handleChange(e, -1)}> Decrement camX</button>
                <button name="camX" onClick={(e) => handleChange(e, 1)}> Increment camX</button>
                <button name="camY" onClick={(e) => handleChange(e, -1)}> Decrement camY</button>
                <button name="camY" onClick={(e) => handleChange(e, 1)}> Increment camY</button>
                <button name="camZ" onClick={(e) => handleChange(e, -1)}> Decrement camZ</button>
                <button name="camZ" onClick={(e) => handleChange(e, 1)}> Increment camZ</button>
                {/* <button onClick={consoleLog}> Console Log</button> */}
            </form>
        </div>
      </div>
      </Draggable>

      <Canvas 
      className="right" 
      shadowMap 
      sRGB 
      gl={{ alpha: false }}
      >
        <color attach="background" args={['lightblue']} />
        <hemisphereLight intensity={0.35} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <Physics gravity={[0, -9.8, -0.5]}>
          <Plane onCollide={handleCollide} />
          <Sphere position={[0, 10, -5]} />
        </Physics>
        <CameraDolly />
      </Canvas>
    </Fragment>
  )
}

export default App
