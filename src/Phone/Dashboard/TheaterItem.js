import React, { useState, useEffect, useRef } from "react";
import useConfig from "@/hooks/useConfig";
import useLGTV from "@/hooks/useLGTV";
import useDenon from "@/hooks/useDenon";
import useBravia from "@/hooks/useBravia";
import useAppleTV from "@/hooks/useAppleTV";


import TiVo from "../Dashboard/Theater/TiVo";
import AppleTV from "../Dashboard/Theater/AppleTV";

import { ListGroup } from "react-bootstrap";

const TheaterItem = ({ title }) => {
  const Config = useConfig();

  // first we need to find the theater in Config
  const findTheater = () => {
    for (const t of Config.theaters) {
      if (t.title === title) {
        return t;
      }
    }
    return null;
  };
  const def = findTheater();
  if (!def) {
    throw new Error(`TheaterTile: theater ${title} not found in Config`);
  }

  // create a hash map of device type => device config
  const devices = def.devices || [],
    deviceMap = {};

  for (const device of devices) {
    deviceMap[device.type] = device;
  }

  // get instances of the devices
  const lgtv = useLGTV(deviceMap.lgtv),
    bravia = deviceMap.bravia ? useBravia(deviceMap.bravia) : {},
    avr = deviceMap.denon ? useDenon(deviceMap.denon) : {},
    appleTV = deviceMap.appletv ? useAppleTV(deviceMap.appletv.device) : {};

  const tv = lgtv.name ? lgtv : bravia;

  const currentDevice = useRef("None");

  const [currentActivity, setCurrentActivity] = useState("All Off");
  const [active, setActive] = useState(null);

  // loop through activities and create a hashmap of name => activity definition
  // while we're looping, we can compare the TV and AVR input with the inputs in the
  // definition, to get the current activity
  const activities = def.activities || [],
    activitiesMap = {};

  if (tv.power === false || avr.power === false) {
    if (currentActivity !== "All Off") {
      setCurrentActivity("All Off");
      currentDevice.current = "None";
      setActive(null);
    }
  } else {
    for (const activity of activities) {
      activitiesMap[activity.name] = activities;
      const inputs = activity.inputs || {};
      if (inputs.tv === tv.input && inputs.avr === avr.input) {
        if (currentDevice.current === "None") {
          currentDevice.current = activity.defaultDevice;
        }
        if (currentActivity !== activity.name) {
          if (tv.power && avr.power) {
            setCurrentActivity(activity.name);
            setActive(activity);
            currentDevice.current = activity.defaultDevice;
          } else if (currentActivity !== "All Off") {
            setCurrentActivity("All Off");
            currentDevice.current = "None";
            setActive(null);
          }
        }
        break;
      }
    }
  }

  const renderCurrentDevice = () => {
    if (currentDevice.current === "TiVo") {
      return <TiVo device={deviceMap.tivo} />;
    } else if (currentDevice.current === "Apple TV") {
      return <AppleTV device={appleTV.device} />;
    }
    return <div>Current Device: {currentDevice.current}</div>;
  };
  return active ? (
    <ListGroup.Item style={{ display: "flex", textAlign: "center" }}>
      <div style={{ flex: 2 }}>
        {currentActivity}
        <br />
        {renderCurrentDevice()}
      </div>
    </ListGroup.Item>
  ) : (
    <ListGroup.Item style={{ display: "flex", textAlign: "center" }}>
      <div>Current Activity: {currentActivity}</div>
    </ListGroup.Item>
  );
};

//
export default TheaterItem;
