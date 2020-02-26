/*
 _____     _     _      _    
|_   _|_ _| |__ | | ___| |_  
  | |/ _` | '_ \| |/ _ \ __| 
  | | (_| | |_) | |  __/ |_  
  |_|\__,_|_.__/|_|\___|\__| 
                             
  ____                            ____                  _____ _ _       
 / ___| __ _ _ __ __ _  __ _  ___|  _ \  ___   ___  _ _|_   _(_) | ___  
| |  _ / _` | '__/ _` |/ _` |/ _ \ | | |/ _ \ / _ \| '__|| | | | |/ _ \ 
| |_| | (_| | | | (_| | (_| |  __/ |_| | (_) | (_) | |   | | | | |  __/ 
 \____|\__,_|_|  \__,_|\__, |\___|____/ \___/ \___/|_|   |_| |_|_|\___| 
                       |___/                                            
*/

import React from "react";
import { useContact } from "@/hooks/useThings";

import Tile from "./Tile";

const GarageDoorTile = ({ config }) => {
  const devs = Array.isArray(config.devices) ? config.devices : [config.devices],
    devices = {};

  for (const d of devs) {
    devices[d] = useContact(d, d.source);
  }

  const doors = [];
  let open = false;

  for (const k of Object.keys(devices)) {
    doors.push({ ...devices[k], name: k.replace(/\s+Sensor/, "") });
    if (devices[k].contact === "open") {
      open = true;
    }
  }

  let key = 0;
  return (
    <Tile width={1} height={1} readOnly>
      <div
        style={{
          flexDirection: "column",
          padding: 5,
          textAlign: "center",
          backgroundColor: open ? "red" : undefined,
          color: open ? "white" : undefined,
        }}
      >
        {doors.map(function(door) {
          return (
            <div key={++key}>
              <div style={{ fontWeight: "bold" }}>{door.name}</div>
              <div>{door.contact}</div>
            </div>
          );
        })}
      </div>
    </Tile>
  );
};

//
export default GarageDoorTile;
