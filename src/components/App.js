import ReactDOM from 'react-dom'
import React, { useRef, useState, Fragment, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Box from './Box'
import Sphere from './Sphere'
import { Physics, usePlane, useBox } from 'use-cannon'
import Plane from '../components/Plane'
import Cube from '../components/Cube'
import '../styles.css'
import Tone from 'tone'
import Music from './Music/Music';
import Camera from './Camera';
import Shape from './Shape';
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

  /* Tone state and handler */


  const [ sound, setSound ] = useState({
    note : '', 
    octave :'',
    duration : '',
    instrument : ''
  })

  

  const handleSoundChange = (name, value) => {
    console.log({name, value});
    setSound((prevValue) => (
      {...sound, [name] : value}
    ));
    console.log(sound);
  }

  const [soundState, setSoundState] = useState({});

  const handleCollide = () => {
    setSoundState(sound);

  }


// new Tone[tone.instrument]().toMaster().triggerAttackRelease(tone.octave + tone.note , tone.duration);
  
  

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

  // function DEPhandleCollide(e) {

  //   const L = () => noteConvert(count);

  //   if (count < 7) {
  //     new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}1`,'8n');
  //   } else if (count < 14) {
  //     new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}2`,'8n');
  //   } else if (count < 21) {
  //     new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}3`,'8n');
  //   } else if (count < 28) {
  //     new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}4`,'8n');
  //   } else if (count < 35) {
  //     new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}5`,'8n');
  //   } else {
  //     new Tone.AMSynth().toMaster().triggerAttackRelease(`${L()}6`,'8n');
  //   }

  //   count ++;
  //   // new Tone.AMSynth().toMaster().triggerAttackRelease('C4','8n');
  // }


  const CameraDolly = () => {
  return(
  useFrame(state => {
    state.camera.position.x = cameraObject.camX
    state.camera.position.y = cameraObject.camY
    state.camera.position.z = cameraObject.camZ
    state.camera.fov = 100
    // state.camera.lookAt(5, 0, 0)
    state.camera.updateProjectionMatrix()
  })
  )
}


  const [closedArray, setClosedArray ] = useState(['Music', 'Shape']);

  const handleCloseWindow = (name) => {
    setClosedArray(prevValue => 
      prevValue.filter((e, i) => {
        return e !== name
      }));
  }

  const handleOpenWindow = (name) => {
    setClosedArray(prevValue => 
      [...prevValue, name]
    )
  }

  const closedIndex = (indexName) => {
    return closedArray.findIndex(e => {
      return e === indexName
    })
  }

  return (
    <Fragment>
      <button 
      style={{position : 'absolute', zIndex: "3", top: "0", right: "0"}}
      onClick={() => console.log(closedArray)}>
      CLOSEDARRAY</button>
      <button 
      style={{position : 'absolute', zIndex: "3", top: "0", right: "200px"}}
      onClick={() => console.log(closedIndex('Music'))}>
      SHAPE INDEX</button>
          {/*<Music handleSoundChange={handleSoundChange}/>*/}
          <Camera 
          handleCameraChange={(e, n) => handleCameraChange(e, n)}
          handleCloseWindow={handleCloseWindow}
          handleOpenWindow={handleOpenWindow}
          closedIndex={() => closedIndex()}
          />
          <Shape
          handleCloseWindow={handleCloseWindow}
          handleOpenWindow={handleOpenWindow}
          closedIndex={() => closedIndex()}
          />

      <div className="bottomBar"></div>
      {/* Canvas */}
      <Canvas className="right" shadowMap sRGB gl={{ alpha: false }}>
        <color attach="background" args={['lightblue']} />
        <hemisphereLight intensity={0.35} />
        <spotLight position={[10, 10, 10]} angle={0.7} penumbra={1} intensity={2} castShadow />
        <Physics gravity={[0, -9.8, -0.5]}>
          <Plane />
          <Cube 
          position={[0, 100, 0]}
          onCollide={handleCollide}
          />
        </Physics>
        <CameraDolly />
      </Canvas>
    </Fragment>
  )
}

export default App
