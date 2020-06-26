import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics, usePlane, useBox } from 'use-cannon';

export default function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], rotation: [0.4, 0.2, 0.5], ...props }))
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <dodecahedronBufferGeometry attach="geometry" />
      <meshNormalMaterial attach="material" color="hotpink" />
    </mesh>
  )
}