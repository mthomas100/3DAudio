import React from 'react'
import Draggable from 'react-draggable'

const boxStyle = {
  position: 'absolute',
  zIndex: '2',
  top: '0',
  right: '0',
  backgroundColor: 'white',
  height: '400px',
  width: '400px'
}

export default function Shape() {
  return (
    <Draggable>
      <div style={boxStyle}>
        <h1>Shape Controls</h1>
      </div>
    </Draggable>
  )
}
