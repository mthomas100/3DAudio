import ReactDOM from 'react-dom'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Box from './Box'
import Sphere from './Sphere'
import { Physics, usePlane, useBox } from 'use-cannon'
import Plane from '../components/Plane'
import Cube from '../components/Cube'
import '../styles.css'
import Tone from "tone";

function App() {



function handleCollide(e) {
    console.log(e);
}

  return (
    <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [-1, 2, 5], fov: 50 }}>
    <color attach="background" args={['lightblue']} />
    <hemisphereLight intensity={0.35} />
    <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
    <Physics gravity = {[0, -3, 0]}>
      <Plane
      onCollide={handleCollide}
      />
      <Cube position={[0, 5, -2]} />
    </Physics>
  </Canvas>
  )
}

export default App
