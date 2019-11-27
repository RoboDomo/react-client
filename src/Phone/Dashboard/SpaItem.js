/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 
                               
 ____              ___ _                  
/ ___| _ __   __ _|_ _| |_ ___ _ __ ___   
\___ \| '_ \ / _` || || __/ _ \ '_ ` _ \  
 ___) | |_) | (_| || || ||  __/ | | | | | 
|____/| .__/ \__,_|___|\__\___|_| |_| |_| 
      |_|                                 
*/

import React from "react";

import useAutelis from "@/hooks/useAutelis";

import { ListGroup, Badge } from "react-bootstrap";

const SpaItem = ({ device }) => {
  const autelis = useAutelis();

  const isOn = thing => {
    const control = autelis[thing];

    if (!control) {
      return false;
    }
    if (control === true) {
      return control;
    }
    return control.toLowerCase() === "on";
  };

  const on = isOn("spa") || isOn("spaHeat") || isOn("jet") || isOn("blower") || isOn("spaLight"),
    variant = on ? (autelis.spaHeat === "enabled" ? "danger" : "success") : undefined;

  const renderControl = (ndx, text, big) => {
    const thing = autelis[ndx];
    //        if (thing && autelis.spa !== 'on' ||  thing.toLowerCase() === 'off' ) {
    if (!thing || thing.toLowerCase() === "off") {
      return null;
    }
    if (big) {
      return (
        <Badge variant="secondary" className="float-right" style={{ fontSize: 30 }}>
          {text}
        </Badge>
      );
    }

    return <div>{text}</div>;
  };

  if (on) {
    return (
      <ListGroup.Item variant={variant}>
        {renderControl("spa", `Spa ${autelis.spaTemp}°F`, true)}
        {renderControl("spaHeat", "Heat On")}
        {renderControl("jet", "Jets On")}
        {renderControl("blower", "Blower On")}
        {renderControl("spaLight", "Light On")}
      </ListGroup.Item>
    );
  } else {
    return (
      <ListGroup.Item>
        <div style={{ fontSize: 40 }}>{"Spa Off"}</div>
      </ListGroup.Item>
    );
  }
};

export default SpaItem;
