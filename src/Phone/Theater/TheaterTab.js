/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 
                               
 _____ _                _           _____     _      
|_   _| |__   ___  __ _| |_ ___ _ _|_   _|_ _| |__   
  | | | '_ \ / _ \/ _` | __/ _ \ '__|| |/ _` | '_ \  
  | | | | | |  __/ (_| | ||  __/ |   | | (_| | |_) | 
  |_| |_| |_|\___|\__,_|\__\___|_|   |_|\__,_|_.__/  
*/

import React, { useState, useEffect, useReducer } from "react";

import ActivitiesMenu from "./ActivitiesMenu";
import DevicesMenu from "./DevicesMenu";
import Audio from "./Devices/Audio";
import TiVo from "./Devices/TiVo";
import AppleTV from "./Devices/AppleTV";
import LGTVControl from "./Devices/LGTV";
import Harmony from "./Devices/Harmony";

import macrosReducer from "@/hooks/reducers/macrosReducer";

import useLGTV from "@/hooks/useLGTV";
import useBravia from "@/hooks/useBravia";
import useDenon from "@/hooks/useDenon";

const TheaterTab = ({ theater }) => {
  const [currentDevice, setCurrentDevice] = useState("None");
  const [currentActivity, setCurrentActivity] = useState("All Off");
  const [, dispatchActivity] = useReducer(macrosReducer);

  // devices
  const devices = theater.devices || [],
    deviceMap = {};

  for (const device of devices) {
    deviceMap[device.type] = device;
  }
  const avr = useDenon(deviceMap.denon);
  const lgtv = useLGTV(deviceMap.lgtv);
  const bravia = useBravia(deviceMap.bravia);
  const tv = lgtv.device ? lgtv : bravia;

  // activities
  const activities = theater.activities || [],
    activitiesMap = {};

  for (const activity of activities) {
    activitiesMap[activity.name] = activities;
  }

  useEffect(() => {
    //    let found = false;
    if (!tv.power) {
      //      console.log("TV OFF");
      setCurrentActivity("All Off");
      setCurrentDevice(null);
      tv.input = "Off";
      //      found = true;
    } else {
      for (const activity of activities) {
        const inputs = activity.inputs || {};
        if (inputs.tv === tv.input && inputs.avr === avr.input) {
          //          found = true;
          if (currentActivity !== activity.name) {
            setCurrentDevice(prev => activity.defaultDevice);
            setCurrentActivity(prev => activity.name);
            break;
          }
        }
      }
      //      if (!found) {
      //        setCurrentDevice(tv.name);
      //      }
    }
  }, [activities, avr.input, currentActivity, tv.input, tv.power]);

  const handleDeviceClick = device => {
    setCurrentDevice(device);
  };

  const handleActivityClick = activity => {
    setCurrentActivity(activity.name);
    setCurrentDevice(activity.defaultDevice);
    dispatchActivity({ macro: activity.macro });
  };

  const renderDevice = () => {
    switch (currentDevice) {
      case "TiVo":
        return <TiVo device={deviceMap.tivo.device} />;
      case "Harmony Hub":
        return <Harmony hub={deviceMap.harmony} />;
      case "LG TV":
        console.log("deviceMap", deviceMap);
        if (!deviceMap.lgtv) {
          return null;
        }
        return <LGTVControl config={deviceMap.lgtv} />;
      case "Apple TV":
        return <AppleTV device={deviceMap.appletv.device} />;
      default:
        //        console.log("renderDevice unknown", currentDevice);
        return null;
    }
  };

  return (
    <div style={{ overflow: "scroll", height: "100vh", paddingBottom: 300 }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, fontSize: 18, textAlign: "center" }}>
          Activity
          <br />
          <ActivitiesMenu
            onSelect={handleActivityClick}
            activities={activities}
            currentActivity={currentActivity}
          />
        </div>
        <div style={{ flex: 1, fontSize: 18, textAlign: "center" }}>
          Device
          <br />
          <DevicesMenu
            onSelect={handleDeviceClick}
            devices={devices}
            currentDevice={currentDevice}
          />
        </div>
      </div>
      {renderDevice()}

      <div style={{ height: 10 }} />
      <Audio avr={avr} />
    </div>
  );
};

//
export default TheaterTab;
