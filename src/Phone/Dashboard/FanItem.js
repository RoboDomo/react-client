/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 

 _____           ___ _                  
|  ___|_ _ _ __ |_ _| |_ ___ _ __ ___   
| |_ / _` | '_ \ | || __/ _ \ '_ ` _ \  
|  _| (_| | | | || || ||  __/ | | | | | 
|_|  \__,_|_| |_|___|\__\___|_| |_| |_| 
                                        
*/

import React, { useReducer } from "react";
import { useFan } from "@/hooks/useThings";
import { Badge, ListGroup } from "react-bootstrap";

import MQTT from "@/lib/MQTT";
import { GiComputerFan } from "react-icons/gi";

const FanItem = ({ hub, name }) => {
  const fan = useFan(name, hub);

  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const onClick = e => {
    e.stopPropagation();

    let value = 25,
      lvl = Number(fan.level);

    if (fan.switch === "off") {
      lvl = 25;
    } else if (lvl < 34) {
      value = 50;
    } else if (lvl < 67) {
      value = 75;
    } else {
      value = 0;
    }

    if (value) {
      if (fan.switch !== "on") {
        fan.level = value;
        forceUpdate();
        // we need to delay a bit so the switch on takes
        setTimeout(() => {
          fan.switch = "on";
          forceUpdate();
        }, 100);
      } else {
        fan.level = value;
        forceUpdate();
      }
    } else {
      fan.switch = "off";
      forceUpdate();
    }
  };

  let value = "Off";
  if (fan.switch === "on") {
    const l = Number(fan.level);
    if (l < 34) {
      value = "Low";
    } else if (l < 67) {
      value = "Medium";
    } else {
      value = "High";
    }
  }
  return (
    <ListGroup.Item
      style={{
        color: fan.switch === "on" ? "yellow" : undefined,
      }}
      onClick={onClick}
    >
      <GiComputerFan size={36} style={{ paddingBottom: 12 }} />
      <span style={{ fontSize: 20, marginLeft: 2 }}>{name}</span>
      <Badge className="float-right" variant="secondary" style={{ fontSize: 20, marginLeft: 10 }}>
        {value}
      </Badge>
    </ListGroup.Item>
  );
};

//
export default FanItem;
