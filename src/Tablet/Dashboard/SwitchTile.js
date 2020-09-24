/*
 _____     _     _      _    
|_   _|_ _| |__ | | ___| |_  
  | |/ _` | '_ \| |/ _ \ __| 
  | | (_| | |_) | |  __/ |_  
  |_|\__,_|_.__/|_|\___|\__| 
                             
 ____          _ _       _   _____ _ _       
/ ___|_      _(_) |_ ___| |_|_   _(_) | ___  
\___ \ \ /\ / / | __/ __| '_ \| | | | |/ _ \ 
 ___) \ V  V /| | || (__| | | | | | | |  __/ 
|____/ \_/\_/ |_|\__\___|_| |_|_| |_|_|\___| 
*/

import React from "react";

import { useSwitch } from "@/hooks/useThings";

import Tile from "./Tile";
import { TiLightbulb } from "react-icons/ti";

const SwitchTile = ({ hub, name }) => {
  const thing = useSwitch(name, hub);
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
