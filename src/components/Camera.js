import React, { useState } from 'react'

export default function Camera({ handleCameraChange }) {
      
    return (
        <div className ="wrapper">
            <h1>Camera Configuration</h1>
            <form>
                <button name="camX" onClick={(e) => handleCameraChange(e, -1)}> Decrement camX</button>
                <button name="camX" onClick={(e) => handleCameraChange(e, 1)}> Increment camX</button>
                <button name="camY" onClick={(e) => handleCameraChange(e, -1)}> Decrement camY</button>
                <button name="camY" onClick={(e) => handleCameraChange(e, 1)}> Increment camY</button>
                <button name="camZ" onClick={(e) => handleCameraChange(e, -1)}> Decrement camZ</button>
                <button name="camZ" onClick={(e) => handleCameraChange(e, 1)}> Increment camZ</button>
                {/* <button onClick={consoleLog}> Console Log</button> */}
            </form>
        </div>
    )
}
