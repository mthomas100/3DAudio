import React, { useEffect, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics, usePlane, useBox } from 'use-cannon';

export default function Cube(props) {

  const [ref] = useBox(() => ({ 
    mass: 1, 
    position: [0, 5, 0], 
    rotation: [0.4, 0.2, 0.5], 
    ...props
   }))
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  )
}


// const velocity = useRef([0, 0, 0]);
// useEffect(() => applicationCache.velocity.subscribe((v) => (velocity.current = v), []))