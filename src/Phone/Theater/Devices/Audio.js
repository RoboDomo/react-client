/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 
                               
 _____ _                _                 __     _             _ _        
|_   _| |__   ___  __ _| |_ ___ _ __     / /    / \  _   _  __| (_) ___   
  | | | '_ \ / _ \/ _` | __/ _ \ '__|   / /    / _ \| | | |/ _` | |/ _ \  
  | | | | | |  __/ (_| | ||  __/ |     / /    / ___ \ |_| | (_| | | (_) | 
  |_| |_| |_|\___|\__,_|\__\___|_|    /_/    /_/   \_\__,_|\__,_|_|\___/  
*/

import React, { useReducer } from "react";
import useConfig from "@/hooks/useConfig";

import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";
import ActionButton from "@/common/ActionButton";

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

  const button = (action, children, variant) => {
    if (action === "mute") {
      action = avr.mute ? "unmute" : "mute";
    }

    return (
      <ActionButton variant={variant} dispatch={dispatch} action={action}>
        {children}
      </ActionButton>
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1.5 }}>
          Master Volume {format(avr.masterVolume)}
          <ButtonGroup>
            {button("mute", <FaVolumeMute />, avr.mute ? "danger" : "primary")}
            {button("masterup", <FaVolumeUp />)}
            {button("masterdown", <FaVolumeDown />)}
          </ButtonGroup>
        </div>

        <div style={{ flex: 1 }}>
          Center {format(avr.centerVolume)}
          <ButtonGroup>
            {button("centerup", <FaVolumeUp />)}
            {button("centerdown", <FaVolumeDown />)}
          </ButtonGroup>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ textAlign: "center", width: "100%", marginTop: 16 }}>
            {avr.surroundMode}
          </div>
          <ButtonGroup>
            {button("auto", "Auto")}
            {button("movie", "Movie")}
            {button("music", "Music")}
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

//
export default AudioControl;
