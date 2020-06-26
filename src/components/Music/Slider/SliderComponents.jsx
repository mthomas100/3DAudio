import React, { Component, useState } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Handle, Track, Tick } from "./components"; // example render components - source below

const sliderStyle = {
  position: "relative",
  width: "100%",
  marginTop: 0,
};

const railStyle = {
  position: "absolute",
  width: "100%",
  height: 8,
  borderRadius: 4,
  cursor: "pointer",
  backgroundColor: "rgb(100,100,100)",
};

export default function MySlider(props) {
  const onChange = (e) => {
    props.note(e);
  };

  const domain = [props.domainMin, props.domainMax];
  const defaultValues = [3];

  const formatTicks = (e) => {
    const array = props.tickArray;
    return array[array.findIndex((element, i) => i == e)];
  }

  return (
    <div style={{ margin: "10%", height: 30, width: "80%" }}>
      <Slider
        mode={2}
        step={1}
        domain={domain}
        rootStyle={sliderStyle}
        //onUpdate={onUpdate}
        onChange={onChange}
        values={defaultValues}
      >
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={domain}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks count={5}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick) => (
                <Tick
                  key={tick.id}
                  tick={tick}
                  count={ticks.length}
                  format={formatTicks}
                />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  );
}
