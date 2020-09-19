/*
 _____     _     _      _    
|_   _|_ _| |__ | | ___| |_  
  | |/ _` | '_ \| |/ _ \ __| 
  | | (_| | |_) | |  __/ |_  
  |_|\__,_|_.__/|_|\___|\__| 
                             
 _____ _                _           _____     _      
|_   _| |__   ___  __ _| |_ ___ _ _|_   _|_ _| |__   
  | | | '_ \ / _ \/ _` | __/ _ \ '__|| |/ _` | '_ \  
  | | | | | |  __/ (_| | ||  __/ |   | | (_| | |_) | 
  |_| |_| |_|\___|\__,_|\__\___|_|   |_|\__,_|_.__/  
*/

import React, { useState, useEffect, useReducer } from "react";

import { Row, Col } from "react-bootstrap";

import AudioControl from "./AudioControl";
import ActivitiesListGroup from "./ActivitiesListGroup";
import DevicesListGroup from "./DevicesListGroup";
import TheaterDevice from "./TheaterDevice";
import ButtonList from "./ButtonList";

import macrosReducer from "@/hooks/reducers/macrosReducer";

import useLGTV from "@/hooks/useLGTV";
import useBravia from "@/hooks/useBravia";
import useDenon from "@/hooks/useDenon";

const TheaterTab = ({ style, theater }) => {
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

  const handleDeviceClick = device => {
    setCurrentDevice(device.name);
  };

  // activities
  const activities = theater.activities || [],
    activitiesMap = {};

  for (const activity of activities) {
    activitiesMap[activity.name] = activities;
  }

  const handleActivityClick = activity => {
    setCurrentActivity(activity.name);
    setCurrentDevice(activity.defaultDevice);
    dispatchActivity({ macro: activity.macro });
  };

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
  }, [
    tv.power,
    avr.power,
    currentActivity,
    currentDevice,
    tv.input,
    avr.input,
    activities,
    tv,
    avr,
  ]);

  const renderDevice = () => {
    return <TheaterDevice currentDevice={currentDevice} avr={avr} tv={tv} deviceMap={deviceMap} />;
  };

  return (
    <Row style={{ marginTop: 4 }}>
      <Col sm={2}>
        <ActivitiesListGroup
          activities={activities}
          currentActivity={currentActivity}
          onClick={handleActivityClick}
        />
        <div style={{ height: 4 }} />
        <DevicesListGroup
          devices={devices}
          currentDevice={currentDevice}
          tvInput={tv.input}
          avrInput={avr.input}
          onClick={handleDeviceClick}
        />
      </Col>
      <Col sm={10}>
        <Row style={{ width: "100%", textAlign: "center" }}>
          <Col sm={2} style={{ textAlign: "center" }}>
            <AudioControl avr={avr} />
          </Col>
          <Col sm={7} style={{ textAlign: "center" }}>
            {renderDevice()}
          </Col>
          <Col sm={3} style={{ textAlign: "center" }}>
            <ButtonList theater={theater} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

//
export default TheaterTab;
