import React, { useReducer } from "react";

import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";

import RemoteButton from "@/common/RemoteButton";

import denonReducer from "@/hooks/reducers/denonReducer";

const format = n => {
  if (n === null) {
    return 0;
  }
  if (typeof n === "number") {
    if (n > 99) {
      return n / 10;
    }
    return n;
  }
  if (n.length === 3) {
    return Number(n) / 10;
  }
  return Number(n);
};

const AudioControl = ({ avr }) => {
  const [, dispatch] = useReducer(denonReducer, { device: avr ? avr.device : null });
  if (!avr) {
    return null;
  }

  const button = (action, children, variant, mini) => {
    if (action === "mute") {
      action = avr.mute ? "unmute" : "mute";
    }

    return (
      <RemoteButton variant={variant} dispatch={dispatch} action={action} mini={!mini}>
        {children}
      </RemoteButton>
    );
  };

  return (
    <div>
      <div style={{ width: "100%", textAlign: "center", marginTop: 8, whiteSpace: "nowrap" }}>
        <h5>Master Volume </h5>
        {button("mute", <FaVolumeMute />, avr.mute ? "danger" : "primary")}
        {button("masterdown", <FaVolumeDown />)}
        {button("masterup", <FaVolumeUp />)} {format(avr.masterVolume)}
      </div>

      <div style={{ width: "100%", textAlign: "center", marginTop: 8 }}>
        <h5 style={{ marginTop: 2 }}>Center Channel</h5>
        {button("centerup", <FaVolumeUp />)}
        {button("centerdown", <FaVolumeDown />)} {format(avr.centerVolume)}
      </div>

      <div style={{ width: "100%", textAlign: "center", marginTop: 18 }}>
        <h5 style={{ textAlign: "center", width: "100%", marginTop: 2 }}>{avr.surroundMode}</h5>
        <ButtonGroup vertical>
          {button("auto", "Auto", undefined, true)}
          {button("movie", "Movie", undefined, true)}
          {button("music", "Music", undefined, true)}
        </ButtonGroup>
      </div>
    </div>
  );
};

//
export default AudioControl;
