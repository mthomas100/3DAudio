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

  const [cam, setCam] = useState({
    camX : -1,
    camY: 2,
    camZ: 5
  });

  function getCameraObject(cameraObject) {
    setCam(cameraObject);
  }
   

  return (
    <Fragment>
      <Draggable>
        <div className="musicControls">
          <Music />
        </div>
      </Draggable>

      <Draggable>
        <div className="cameraControls">
          <Camera 
          cameraObject={getCameraObject}/> {/* its called every time state updated, so stateful */}
        </div>
      </Draggable>

      <Canvas 
      className="right" 
      shadowMap 
      sRGB 
      gl={{ alpha: false }} 
      camera={{ position: [cam.camX, cam.camY, cam.camZ], 
      fov: 50 }}>
        <color attach="background" args={['lightblue']} />
        <hemisphereLight intensity={0.35} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <Physics gravity={[0, -9.8, -0.5]}>
          <Plane onCollide={handleCollide} />
          <Sphere position={[0, 10, -5]} />
        </Physics>
      </Canvas>
    </Fragment>
  )
}

export default App
