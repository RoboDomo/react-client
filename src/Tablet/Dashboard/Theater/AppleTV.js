import React, { useReducer } from "react";

import { FaPause, FaPlay } from "react-icons/fa";

import RemoteButton from "@/common/RemoteButton";
import useAppleTV from "@/hooks/useAppleTV";
import appleTVReducer from "@/hooks/reducers/appleTVReducer";

const appName = n => {
  if (n === "com.google.ios.youtube") {
    return "YouTube";
  }
  return n;
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

const AppleTV = ({ device }) => {
  const atv = useAppleTV(device),
    [, dispatch] = useReducer(appleTVReducer, { device: device }),
    elapsedTime = atv ? atv.elapsedTime : 0,
    info = atv ? atv.info : null;

  const renderControls = () => {
    return (
      <div>
        <RemoteButton dispatch={dispatch} action="pause" mini>
          <FaPause />
        </RemoteButton>
        <RemoteButton dispatch={dispatch} action="select">
          Select
        </RemoteButton>
        <RemoteButton dispatch={dispatch} action="play" mini>
          <FaPlay />
        </RemoteButton>
      </div>
    );
  };

  const renderPlaybackState = () => {
    if (!info) {
      return null;
    }

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

  if (!info) {
    return (
      <div>
        <div style={{ textAlign: "center" }}>Not Playing</div>
        {renderControls()}
      </div>
    );
  }

  const app = appName(info.appDisplayName || info.appBundleIdentifier);

  return (
    <div style={{ height: undefined, textAlign: "center", marginBottom: 4 }}>
      <div style={{ fontSize: 16 }}>{app}</div>
      <div>
        {info.title}
        <br />
        <div style={{ fontWeight: "bold" }}>{renderPlaybackState()}</div>
      </div>
      {renderControls()}
    </div>
  );
  /*
        <RemoteButton dispatch={dispatch} action="pause" mini>
          <FaArrowAltCircleUp />
        </RemoteButton>
        <RemoteButton dispatch={dispatch} action="pause" mini>
          <FaArrowAltCircleDown />
        </RemoteButton>
        <RemoteButton dispatch={dispatch} action="pause" mini>
          <FaPause />
        </RemoteButton>
        <RemoteButton dispatch={dispatch} action="play" mini>
          <FaPlay />
        </RemoteButton>
        <RemoteButton dispatch={dispatch} action="pause" mini>
          <FaArrowAltCircleLeft />
        </RemoteButton>
        <RemoteButton dispatch={dispatch} action="pause" mini>
          <FaArrowAltCircleRight />
        </RemoteButton>
  */
};

//
export default AppleTV;
