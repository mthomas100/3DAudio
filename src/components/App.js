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
import { useSpring, a }  from "react-spring/three";

function App() {
  /*Hooks*/

  // const props = useSpring({
  //   scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1]
  // })

  /*Camera State & Handler */
  const [cameraObject, setCameraObject] = useState({
    camX: -1,
    camY: 2,
    camZ: 5
  })
 
  const handleCameraChange = (event, n) => {
    console.log(n);
    const { value, name } = event.target;

    let nFrac = n / 1000;

    const myLoop = (nFrac) => {
      setTimeout( () => {
        setCameraObject((prevValue) => (
          {...cameraObject, [name] : prevValue[name] + (0.01 * Math.sign(nFrac))}
        ));

        if (nFrac < 0) {
          nFrac = nFrac - 0.01;
        } else {
          nFrac = nFrac + 0.01;
        }

        console.log('nFrac is' + nFrac);
        if (nFrac < 1 && nFrac > -1) {
          console.log(nFrac);
          myLoop(nFrac);
        }
      }, 1)
    }

    if (nFrac < 1) {
      myLoop(nFrac);
    }

    console.log(cameraObject);

    event.preventDefault();
}



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
      new Tone.MembraneSynth().toMaster().triggerAttackRelease(`${L()}1`,'8n');
    } else if (count < 14) {
      new Tone.MembraneSynth().toMaster().triggerAttackRelease(`${L()}2`,'8n');
    } else if (count < 21) {
      new Tone.MembraneSynth().toMaster().triggerAttackRelease(`${L()}3`,'8n');
    } else if (count < 28) {
      new Tone.MembraneSynth().toMaster().triggerAttackRelease(`${L()}4`,'8n');
    } else if (count < 35) {
      new Tone.MembraneSynth().toMaster().triggerAttackRelease(`${L()}5`,'8n');
    } else {
      new Tone.MembraneSynth().toMaster().triggerAttackRelease(`${L()}6`,'8n');
    }

    count ++;
    // new Tone.AMSynth().toMaster().triggerAttackRelease('C4','8n');
  }


  const CameraDolly = () => {
  return(
  useFrame(state => {
    state.camera.position.x = cameraObject.camX
    state.camera.position.y = cameraObject.camY
    state.camera.position.z = cameraObject.camZ
    state.camera.fov = 50
    // state.camera.lookAt(5, 0, 0)
    state.camera.updateProjectionMatrix()
  })
  )
}


   

  return (
    <Fragment>
      <Draggable>
        <div className="controlPanel TL">
          <Music />
        </div>
      </Draggable>

      <Draggable>
        <div className="controlPanel BL">
          <Camera handleCameraChange={(e, n) => handleCameraChange(e, n)}/>
        </div>
      </Draggable>

      {/*To be component */}
      <Draggable>
        <div className="controlPanel TR">
          <div className="wrapper">
            <h1>Reset Button</h1>
          </div>
        </div>
      </Draggable>

      <Canvas className="right" shadowMap sRGB gl={{ alpha: false }}>
        <color attach="background" args={['lightblue']} />
        <hemisphereLight intensity={0.35} />
        <spotLight position={[10, 10, 10]} angle={0.7} penumbra={1} intensity={2} castShadow />
        <Physics gravity={[0, -9.8, -0.5]}>
          <Plane onCollide={handleCollide} />
          <Cube position={[0, 10, -5]} />
        </Physics>
        <CameraDolly />
      </Canvas>
    </Fragment>
  )
}

export default App
