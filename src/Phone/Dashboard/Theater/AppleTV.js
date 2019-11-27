/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 
                               
 _____ _                _             ___                _     _______     __ 
|_   _| |__   ___  __ _| |_ ___ _ __ / / \   _ __  _ __ | | __|_   _\ \   / / 
  | | | '_ \ / _ \/ _` | __/ _ \ '__/ / _ \ | '_ \| '_ \| |/ _ \| |  \ \ / /  
  | | | | | |  __/ (_| | ||  __/ | / / ___ \| |_) | |_) | |  __/| |   \ V /   
  |_| |_| |_|\___|\__,_|\__\___|_|/_/_/   \_\ .__/| .__/|_|\___||_|    \_/    
                                            |_|   |_|                         
*/

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

  const renderPlaybackState = () => {
    if (!info) {
      return null;
    }
    if (info.duration) {
      return (
        <>
          <div style={{ fontSize: 20 }}>{info.title}</div>
          {info.playbackState.toUpperCase()} {formatTime(elapsedTime)} / {formatTime(info.duration)}
        </>
      );
    } else {
      return <>{info.playbackState.toUpperCase()}</>;
    }
  };

  return <div>{renderPlaybackState()}</div>;
};

export default AppleTV;
