import React, { useReducer } from "react";

import RemoteButton from "@/common/RemoteButton";
import { Navbar, Nav, Row, ButtonGroup } from "react-bootstrap";
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

const AppleTVControl = ({ device }) => {
  const appleTV = useAppleTV(device),
    { info, elapsedTime } = appleTV;

  const [, dispatch] = useReducer(appleTVReducer, { device: device });

  const renderPlayState = () => {
    if (info.totalTime) {
      return (
        <>
          {info.playbackState.toUpperCase()} {formatTime(elapsedTime)} /{" "}
          {formatTime(info.totalTime)}
        </>
      );
    } else {
      return <>{info.playbackState.toUpperCase()}</>;
    }
  };

  const renderNowPlaying = () => {
    if (!info || !info.title) {
      return (
        <div style={{ height: 128 }}>
          <h1>Apple TV</h1>
          <h4>Not Playing</h4>
        </div>
      );
    }

    const app = appName(info.appDisplayName || info.appBundleIdentifier);
    const title = info.title !== info.album ? info.title : null;
    const renderInfo = () => {
      if (info.artist && info.album) {
        return (
          <>
            <br />
            <span style={{ fontStyle: "italic" }}>
              {info.artist} - {info.album};{" "}
            </span>
          </>
        );
      }
      return null;
    };
    return (
      <div>
        <h2>{app}</h2>
        <h4>
          {title}
          {renderInfo()}
          <br />
          <div style={{ fontWeight: "bold" }}>{renderPlayState()}</div>
        </h4>
      </div>
    );
  };

  const renderPlaybackControls = () => {
    const playButton = (
        <RemoteButton dispatch={dispatch} action="play" mini="fill">
          <FaPlay />
        </RemoteButton>
      ),
      pauseButton = (
        <RemoteButton dispatch={dispatch} action="pause" mini="fill">
          <FaPause />
        </RemoteButton>
      );

    return (
      <Navbar fixed="bottom" style={{ marginBottom: 8 }}>
        <Nav variant="pills" fill={true} style={{ width: "100%" }}>
          <Nav.Item>
            <RemoteButton mini="fill" dispatch={dispatch} action="skipbackward">
              <FaFastBackward />
            </RemoteButton>
          </Nav.Item>
          <Nav.Item>
            <RemoteButton mini="fill" dispatch={dispatch} action="beginrewind">
              <FaBackward />
            </RemoteButton>
          </Nav.Item>
          <Nav.Item>{pauseButton}</Nav.Item>
          <Nav.Item>{playButton}</Nav.Item>
          <Nav.Item>
            <RemoteButton mini="fill" dispatch={dispatch} action="beginforward">
              <FaForward />
            </RemoteButton>
          </Nav.Item>
          <Nav.Item>
            <RemoteButton mini="fill" dispatch={dispatch} action="skipforward">
              <FaFastForward />
            </RemoteButton>
          </Nav.Item>
        </Nav>
      </Navbar>
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

//
export default AppleTVControl;
