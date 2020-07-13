import React, { useState, Fragment, useContext} from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

/*Camera State & Handler */
const [cameraObject, setCameraObject] = useState({
  camX: -1,
  camY: 2,
  camZ: 5
})

const handleCameraChange = (event, n) => {
  const { value, name } = event.target

  let nFrac = n / 1000

  const myLoop = (nFrac) => {
    setTimeout(() => {
      setCameraObject((prevValue) => ({ ...cameraObject, [name]: prevValue[name] + 0.01 * Math.sign(nFrac) }))

      if (nFrac < 0) {
        nFrac = nFrac - 0.01
      } else {
        nFrac = nFrac + 0.01
      }

      console.log('nFrac is' + nFrac)
      if (nFrac < 1 && nFrac > -1) {
        console.log(nFrac)
        myLoop(nFrac)
      }
    }, 1)
  }

  if (nFrac < 1) {
    myLoop(nFrac)
  }

  console.log(cameraObject)

  event.preventDefault()
}

const CameraDolly = () => {
  return useFrame((state) => {
    state.camera.position.x = cameraObject.camX
    state.camera.position.y = cameraObject.camY
    state.camera.position.z = cameraObject.camZ
    state.camera.fov = 100
    // state.camera.lookAt(5, 0, 0)
    state.camera.updateProjectionMatrix()
  })
}

export { handleCameraChange, CameraDolly }