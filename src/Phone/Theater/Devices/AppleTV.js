/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 
                               
 ____             _                    __     _                _     _______     __ 
|  _ \  _____   _(_) ___ ___  ___     / /    / \   _ __  _ __ | | __|_   _\ \   / / 
| | | |/ _ \ \ / / |/ __/ _ \/ __|   / /    / _ \ | '_ \| '_ \| |/ _ \| |  \ \ / /  
| |_| |  __/\ V /| | (_|  __/\__ \  / /    / ___ \| |_) | |_) | |  __/| |   \ V /   
|____/ \___| \_/ |_|\___\___||___/ /_/    /_/   \_\ .__/| .__/|_|\___||_|    \_/    
*/

import React, { useReducer } from "react";

import RemoteButton from "@/common/RemoteButton";
import { Row, ButtonGroup } from "react-bootstrap";
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaFastBackward,
  FaBackward,
  FaPause,
  FaPlay,
  FaForward,
  FaFastForward,
} from "react-icons/fa";

import useAppleTV from "@/hooks/useAppleTV";
import appleTVReducer from "@/hooks/reducers/appleTVReducer";

const rowStyle = {
  marginTop: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const formatTime = (seconds, trim = true) => {
  const d = new Date(null);
  d.setSeconds(seconds);
  const formatted = d.toISOString().substr(11, 8);
  if (trim && formatted.substr(0, 3) === "00:") {
    return formatted.substr(3);
  } else {
    return formatted;
  }
};

const appName = n => {
  if (n === "com.google.ios.youtube") {
    return "YouTube";
  }
  return n;
};

// appletv/device/set/command Pause

const AppleTV = ({ device }) => {
  const appleTV = useAppleTV(device),
    { info, elapsedTime } = appleTV;

  const [, dispatch] = useReducer(appleTVReducer, { device: device });

  const renderPlaybackState = () => {
    if (info.duration) {
      return (
        <>
          {info.playbackState.toUpperCase()} {formatTime(elapsedTime)} / {formatTime(info.duration)}
        </>
      );
    } else {
      return <>{info.playbackState.toUpperCase()}</>;
    }
  };

  const renderNowPlaying = () => {
    if (!info || !info.playbackState || elapsedTime == null) {
      return (
        <div style={{ height: 170 }}>
          <h1>Apple TV</h1>
          <h4>Not Playing</h4>
        </div>
      );
    }

    const app = appName(info.appDisplayName || info.appBundleIdentifier);

    const renderArtist = () => {
      if (info.artist === "" && info.album === "") {
        return null;
      }
      return (
        <>
          {info.artist} {info.album} <br />
        </>
      );
    };

    const title = info.title.length > 10 ? info.title.substr(0, 10) + "..." : info.title;
    return (
      <div style={{ textAlign: "center" }}>
        <h3>{app}</h3>
        <h4>
          {renderArtist()}
          <span style={{ fontSize: 36 }}>{title}</span>
          <br />
          <div style={{ fontWeight: "bold" }}>{renderPlaybackState()}</div>
        </h4>
      </div>
    );
  };

  const renderPlaybackControls = () => {
    const playButton = (
        <RemoteButton dispatch={dispatch} action="play" mini>
          <FaPlay />
        </RemoteButton>
      ),
      pauseButton = (
        <RemoteButton dispatch={dispatch} action="pause" mini>
          <FaPause />
        </RemoteButton>
      );

    return (
      <ButtonGroup>
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="skipbackward" mini>
            <FaFastBackward />
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="beginrewind" mini>
            <FaBackward />
          </RemoteButton>
          {pauseButton}
          {playButton}
          <RemoteButton dispatch={dispatch} action="beginforward" mini>
            <FaForward />
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="skipforward" mini>
            <FaFastForward />
          </RemoteButton>
        </ButtonGroup>
      </ButtonGroup>
    );
  };

  return (
    <>
      <Row style={{ ...rowStyle, marginTop: 4 }}> {renderNowPlaying()}</Row>
      <Row style={{ ...rowStyle, marginTop: 4 }}>
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="stop">
            Stop
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="menu">
            Menu
          </RemoteButton>
          <RemoteButton variant="primary" dispatch={dispatch} action="home">
            Home
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="power" variant="danger">
            Power
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={{ ...rowStyle, marginTop: 4 }}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton dispatch={dispatch} action="up">
            <FaChevronUp />
          </RemoteButton>
          <RemoteButton variant="none" />
        </ButtonGroup>
      </Row>
      <Row style={rowStyle}>
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="left">
            <FaChevronLeft />
          </RemoteButton>
          <RemoteButton variant="primary" dispatch={dispatch} action="select">
            Select
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="right">
            <FaChevronRight />
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={rowStyle}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton dispatch={dispatch} action="down">
            <FaChevronDown />
          </RemoteButton>
          <RemoteButton variant="none" />
        </ButtonGroup>
      </Row>
      <Row style={{ ...rowStyle, marginTop: 20 }}>{renderPlaybackControls()}</Row>
    </>
  );
};

export default AppleTV;
