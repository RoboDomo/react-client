/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 
                               
 ____          _ _       _     ___ _                  
/ ___|_      _(_) |_ ___| |__ |_ _| |_ ___ _ __ ___   
\___ \ \ /\ / / | __/ __| '_ \ | || __/ _ \ '_ ` _ \  
 ___) \ V  V /| | || (__| | | || || ||  __/ | | | | | 
|____/ \_/\_/ |_|\__\___|_| |_|___|\__\___|_| |_| |_| 
                                                      
*/

import React from "react";
import { useSwitch } from "@/hooks/useThings";
import { TiLightbulb } from "react-icons/ti";
import { Badge, ListGroup } from "react-bootstrap";

const SwitchItem = ({ hub, name }) => {
  const thing = useSwitch(name, hub);

  const onClick = e => {
    e.stopPropagation();

    if (thing.switch === "on") {
      thing.switch = "off";
    } else {
      thing.switch = "on";
    }
  };

  if (thing.switch === "off") {
    return (
      <ListGroup.Item onClick={onClick}>
        <TiLightbulb size={24} style={{ marginBottom: 10 }} />
        <span style={{ fontSize: 20, fontWeight: "normal" }}>{name}</span>
        <Badge variant="secondary" className="float-right" style={{ fontSize: 20, marginLeft: 10 }}>
          Off
        </Badge>
      </ListGroup.Item>
    );
  }
  return (
    <ListGroup.Item style={{ color: "yellow" }} onClick={onClick}>
      <TiLightbulb size={24} style={{ marginBottom: 10 }} />
      <span style={{ fontSize: 20, fontWeight: "normal" }}>{name}</span>
      <Badge variant="secondary" className="float-right" style={{ fontSize: 20, marginLeft: 10 }}>
        On
      </Badge>
    </ListGroup.Item>
  );
};

export default SwitchItem;
