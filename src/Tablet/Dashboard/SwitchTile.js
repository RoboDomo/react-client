import React, { useState, useEffect } from "react";

import { useSwitch as useSmartThingsSwitch } from "@/hooks/useSmartThings";
import { useSwitch as useHubitatSwitch } from "@/hooks/useHubitat";

import Tile from "./Tile";
import { TiLightbulb } from "react-icons/ti";

const SwitchTile = ({ hub, name }) => {
  const thing = hub === "hubitat" ? useHubitatSwitch(name) : useSmartThingsSwitch(name);
  //  const thing = useSwitch(name);

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
      <Tile width={1} height={1}>
        <div style={{ textAlign: "center" }} onClick={onClick}>
          <TiLightbulb size={24} style={{ marginBottom: 10 }} />
          <div style={{ fontWeight: "normal" }}>{name}</div>
          <div style={{ fontSize: 30 }}>Off</div>
        </div>
      </Tile>
    );
  }
  return (
    <Tile width={1} height={1}>
      <div style={{ textAlign: "center", color: "yellow" }} onClick={onClick}>
        <TiLightbulb size={24} style={{ marginBottom: 10 }} />
        <div style={{ fontWeight: "normal" }}>{name}</div>
        <div style={{ fontSize: 30 }}>On</div>
      </div>
    </Tile>
  );
};

//
export default SwitchTile;
