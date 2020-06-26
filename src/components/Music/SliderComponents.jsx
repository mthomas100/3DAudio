import React from "react";
import { Slider, Handles, Ticks } from "react-compound-slider";

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: "absolute",
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: "#2C4870",
        color: "#333",
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: "Roboto", fontSize: 11, marginTop: -35 }}>
        {value}
      </div>
    </div>
  );
}

export function MySlider() {
  const sliderStyle = {
    margin: "0 auto",
    // Give the slider some width
    position: "relative",
    width: "300px",
    height: 80,
    border: "1px solid steelblue",
  };

  const railStyle = {
    position: "absolute",
    width: "300px",
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: "#8B9CB6",
  };

  return (
    <div>
      <Slider
        rootStyle={sliderStyle}
        domain={[0, 2]}
        step={1}
        mode={2}
        values={[4]}
      >
        <div style={railStyle} />
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        {/* <Ticks values={[0, 25, 50]}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick) => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks> */}
      </Slider>
    </div>
  );
}
