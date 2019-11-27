/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 
                               
 ____             _                    __  _     ____ _______     __ 
|  _ \  _____   _(_) ___ ___  ___     / / | |   / ___|_   _\ \   / / 
| | | |/ _ \ \ / / |/ __/ _ \/ __|   / /  | |  | |  _  | |  \ \ / /  
| |_| |  __/\ V /| | (_|  __/\__ \  / /   | |__| |_| | | |   \ V /   
|____/ \___| \_/ |_|\___\___||___/ /_/    |_____\____| |_|    \_/    
*/

import React, { useReducer } from "react";

import { ButtonGroup, Tooltip, OverlayTrigger } from "react-bootstrap";

import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBackward,
  FaFastBackward,
  FaPause,
  FaPlay,
  FaStepForward,
  FaForward,
  FaFastForward,
  FaDotCircle,
} from "react-icons/fa";

import ActionButton from "@/common/ActionButton";

import useLGTV from "@/hooks/useLGTV";
import lgtvReducer from "@/hooks/reducers/lgtvReducer";

// TODO: move these to config.js in config-microservice
const ignoredLaunchPoints = [
  "HDMI1",
  "HDMI2",
  "HDMI3",
  "HDMI4",
  "HDMI 1",
  "HDMI 2",
  "HDMI 3",
  "HDMI 4",
  "Web Browser",
  "User Guide",
  "Device Connector",
  "Music",
  "Photo & Video",
  "GALLERY",
  "TV Scheduler",
  "Screen Share",
  "Multi-view",
  "Accessibility",
  "Notifications",
  "Set Up TV for Google Assistant",
  "Set Up TV for Amazon Alexa",
  "LG Remote Service",
];

// If props.lgtv.tuner is set to true, then additional controls are rendered.
// Number pad, for example, is not needed for smart TV apps, but are needed
// for watching TV.
const LGTVControl = ({ config }) => {
  const lgtv = useLGTV(config),
    tvInput = lgtv.input,
    [, dispatch] = useReducer(lgtvReducer, { device: config.device });

  if (!lgtv.launchPoints || !lgtv.foregroundApp) {
    return null;
  }
  console.log("launchPoints", lgtv.launchPoints);

  const foregroundApp = lgtv.foregroundApp,
    launchPoints = lgtv.launchPoints,
    apps = {};

  try {
    for (const index of Object.keys(launchPoints)) {
      const info = launchPoints[index];
      apps[info.title.replace(/\s+/g, "")] = info;
    }
  } catch (e) {}

  const renderLaunchPoints = () => {
    if (!launchPoints) {
      return null;
    }
    if (lgtv.tuner) {
      return (
        <div style={{ marginTop: 4 }}>
          <ButtonGroup>
            <ActionButton dispatch={dispatch}>Netflix</ActionButton>
            <ActionButton dispatch={dispatch}>Prime</ActionButton>
            <ActionButton dispatch={dispatch}>YouTube</ActionButton>
            <ActionButton dispatch={dispatch}>CBS</ActionButton>
          </ButtonGroup>
        </div>
      );
    }

    const handleLaunchPointClicked = info => {
      console.log("info", info, info.id);
      lgtvReducer({ device: lgtv.device }, { type: "LAUNCH-" + info.id });
    };

    return (
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(lgtv.launchPoints).map(key => {
          const info = lgtv.launchPoints[key];
          if (~ignoredLaunchPoints.indexOf(info.title)) {
            //            console.log("LGTV", info);
            return null;
          }
          const ttkey = `tt-${info.id}`,
            okey = `o-${ttkey}`,
            overlay = (
              <Tooltip id={info.title} key={ttkey}>
                {info.title}
              </Tooltip>
            );
          return (
            <div
              style={{
                margin: 4,
                maxWidth: 48,
                flex: 1,
              }}
              key={info.id}
              onClick={() => handleLaunchPointClicked(info) }
            >
              <OverlayTrigger key={okey} overlay={overlay}>
                <img alt={info.title} style={{ maxWidth: 48, minHeight: 48 }} src={info.icon} />
              </OverlayTrigger>
            </div>
          );
        })}
      </div>
    );
  };

  const renderNowPlaying = () => {
    if (!foregroundApp) {
      return null;
    }
    const appId = foregroundApp.appId,
      app = launchPoints[appId];

    if (!app || true) {
      return null;
    }
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginLeft: "auto", marginRight: "auto", width: 100 }}>
          <img alt={app.icon} src={app.icon}>
            {app.title}
          </img>
        </div>
      </div>
    );
  };

  const renderHDMI = () => {
    return (
      <ButtonGroup>
        <ActionButton
          dispatch={dispatch}
          action="hdmi1"
          variant={tvInput === "hdmi1" ? "success" : undefined}
        >
          HDMI1
        </ActionButton>
        <ActionButton
          dispatch={dispatch}
          action="hdmi2"
          variant={tvInput === "hdmi2" ? "success" : undefined}
        >
          HDMI2
        </ActionButton>
        <ActionButton
          dispatch={dispatch}
          action="hdmi3"
          variant={tvInput === "hdmi3" ? "success" : undefined}
        >
          HDMI3
        </ActionButton>
        <ActionButton
          dispatch={dispatch}
          action="hdmi4"
          variant={tvInput === "hdmi4" ? "success" : undefined}
        >
          HDMI4
        </ActionButton>
      </ButtonGroup>
    );
  };

  const renderKeypad = () => {
    if (!lgtv.tuner) {
      return null;
    }
    return (
      <>
        <div style={{ marginTop: 4 }}>
          <ActionButton dispatch={dispatch} aciton="Back">
            Back
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="Guide">
            Home
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="Guide">
            Guide
          </ActionButton>
        </div>
        <div style={{ marginTop: 4 }}>
          <ButtonGroup>
            <ActionButton dispatch={dispatch} aciton="NUM1">
              1
            </ActionButton>
            <ActionButton dispatch={dispatch} aciton="NUM2">
              2
            </ActionButton>
            <ActionButton dispatch={dispatch} aciton="NUM3">
              3
            </ActionButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <ActionButton dispatch={dispatch} aciton="NUM4">
              4
            </ActionButton>
            <ActionButton dispatch={dispatch} aciton="NUM5">
              5
            </ActionButton>
            <ActionButton dispatch={dispatch} aciton="NUM6">
              6
            </ActionButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <ActionButton dispatch={dispatch} aciton="NUM7">
              7
            </ActionButton>
            <ActionButton dispatch={dispatch} aciton="NUM8">
              8
            </ActionButton>
            <ActionButton dispatch={dispatch} aciton="NUM9">
              9
            </ActionButton>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <ActionButton dispatch={dispatch} aciton="CLEAR">
              .
            </ActionButton>
            <ActionButton dispatch={dispatch} aciton="NUM0">
              0
            </ActionButton>
            <ActionButton dispatch={dispatch} aciton="ENTER">
              Enter
            </ActionButton>
          </ButtonGroup>
        </div>
      </>
    );
  };

  /*********************************************************/

  return (
    <>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 14,
          marginBottom: 10,
        }}
      >
        {renderLaunchPoints()}
      </div>

      <div>{renderNowPlaying()}</div>
      <div style={{ marginTop: 4, textAlign: "center" }}>{renderHDMI()}</div>
      <div style={{ margin: 10, textAlign: "center" }}>
        <ButtonGroup>
          <ActionButton variant="none" />
          <ActionButton dispatch={dispatch} aciton="UP">
            <FaChevronUp />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="CHANNELUP" variant="info">
            +
          </ActionButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton dispatch={dispatch} aciton="LEFT">
            <FaChevronLeft />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="SELECT" variant="primary">
            Select
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="RIGHT">
            <FaChevronRight />
          </ActionButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <ActionButton variant="none" />
          <ActionButton dispatch={dispatch} aciton="DOWN">
            <FaChevronDown />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="CHANNELDOWN" variant="info">
            -
          </ActionButton>
        </ButtonGroup>
      </div>
      <div style={{ textAlign: "center" }}>{renderKeypad()}</div>
      <div style={{ textAlign: "center", marginTop: 4 }}>
        <ButtonGroup>
          <ActionButton dispatch={dispatch} aciton="REPLAY" mini>
            <FaFastBackward />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="REVERSE" mini>
            <FaBackward />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="PAUSE" mini>
            <FaPause />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="PLAY" mini>
            <FaPlay />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="SLOW" mini>
            <FaStepForward />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="FORWARD" mini>
            <FaForward />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="ADVANCE" mini>
            <FaFastForward />
          </ActionButton>
          <ActionButton dispatch={dispatch} aciton="RECORD" mini variant="danger">
            <FaDotCircle />
          </ActionButton>
        </ButtonGroup>
      </div>
    </>
  );
};

//
export default LGTVControl;
