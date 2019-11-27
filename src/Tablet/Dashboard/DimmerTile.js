/*
 _____     _     _      _    
|_   _|_ _| |__ | | ___| |_  
  | |/ _` | '_ \| |/ _ \ __| 
  | | (_| | |_) | |  __/ |_  
  |_|\__,_|_.__/|_|\___|\__| 
                             
 ____  _                              _____ _ _       
|  _ \(_)_ __ ___  _ __ ___   ___ _ _|_   _(_) | ___  
| | | | | '_ ` _ \| '_ ` _ \ / _ \ '__|| | | | |/ _ \ 
| |_| | | | | | | | | | | | |  __/ |   | | | | |  __/ 
|____/|_|_| |_| |_|_| |_| |_|\___|_|   |_| |_|_|\___| 
*/

import React from "react";

import { useDimmer } from "@/hooks/useThings";

import Tile from "./Tile";

import { TiAdjustBrightness } from "react-icons/ti";

const DimmerTile = ({ hub, name }) => {
  const dimmer = useDimmer(name, hub);

  const onClick = e => {
    e.stopPropagation();

    if (dimmer.switch === "on") {
      dimmer.switch = "off";
    } else {
      dimmer.switch = "on";
    }
  };

  const style =
    dimmer.switch === "off"
      ? {
          color: undefined,
          value: "Off",
        }
      : {
          color: "yellow",
          value: `${dimmer.level}%`,
        };

  return (
    <Tile width={1} height={1}>
      <div style={{ textAlign: "center", color: style.color }} onClick={onClick}>
        <TiAdjustBrightness size={24} style={{ marginBottom: 10 }} />
        <div style={{ fontWeight: "normal" }}>{name}</div>
        <div style={{ fontSize: 30 }}>{style.value}</div>
      </div>
    </Tile>
  );
};

//
export default DimmerTile;
