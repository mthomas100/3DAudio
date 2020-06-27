import React, { useState } from 'react'

export default function Camera(props) {

    const [cameraObject, setCameraObject] = useState({
        camX: -1,
        camY: 2,
        camZ: 5
      })

    props.cameraObject(cameraObject);

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
      props.cameraObject(cameraObject)

      event.preventDefault();
    }

    // function consoleLog(event) {
    //     console.log(cameraObject);
    //     event.preventDefault();
    // }

    return (
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
    )
}
