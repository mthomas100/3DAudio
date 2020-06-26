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

function App() {
  const [camX, setCamX] = useState('-1')
  const [camY, setCamY] = useState('-1')
  const [camZ, setCamZ] = useState('-1')

  let count = 0;

  function noteConvert() {
    switch (count % 7) {
      case 0:
        console.log('A');
        break;
      case 1:
        console.log('B');
        break;
      case 2:
        console.log('C');
        break;
      case 3:
        console.log('D');
        break;
      case 4:
        console.log('E');
        break;
      case 5:
        console.log('F');
        break;
      case 6:
        console.log('G');
        break;
      default:
        break;
    }
  }

  function handleCollide(e) {
    noteConvert(count);

    if (count < 7) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`C1`,'8n');
    } else if (count < 14) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`C2`,'8n');
    } else if (count < 21) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`C3`,'8n');
    } else if (count < 28) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`C4`,'8n');
    } else if (count < 35) {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`C5`,'8n');
    } else {
      new Tone.AMSynth().toMaster().triggerAttackRelease(`C6`,'8n');
    }

    count ++;
    // new Tone.AMSynth().toMaster().triggerAttackRelease('C4','8n');
  }
  
  function makeSound() {
    
  }
  

  return (
    <Fragment>
    <Draggable>
    <div className="left">
        <Music
        />
    </div>
    </Draggable>
      <Canvas className="right" shadowMap sRGB gl={{ alpha: false }} camera={{ position: [-1, 2, 5], fov: 50 }}>
        <color attach="background" args={['lightblue']} />
        <hemisphereLight intensity={0.35} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <Physics gravity={[0, -3, 0]}>
          <Plane onCollide={handleCollide} />
          <Cube position={[0, 40, -2]} />
        </Physics>
      </Canvas>
    </Fragment>
  )
}

export default App
