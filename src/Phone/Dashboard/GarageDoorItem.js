/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 
                               
  ____                            _   ____                  ___ _                  
 / ___| __ _ _ __ __ _  __ _  ___| |_|  _ \  ___   ___  _ _|_ _| |_ ___ _ __ ___   
| |  _ / _` | '__/ _` |/ _` |/ _ \ __| | | |/ _ \ / _ \| '__| || __/ _ \ '_ ` _ \  
| |_| | (_| | | | (_| | (_| |  __/ |_| |_| | (_) | (_) | |  | || ||  __/ | | | | | 
 \____|\__,_|_|  \__,_|\__, |\___|\__|____/ \___/ \___/|_| |___|\__\___|_| |_| |_| 
                       |___/                                                       
*/

import React from "react";
import { useContact } from "@/hooks/useThings";
import { ListGroup } from "react-bootstrap";


const GarageDoorItem = ({ config }) => {
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
    <ListGroup.Item
      style={{
        height: 80,
        flexDirection: "column",
        padding: 5,
        textAlign: "center",
        backgroundColor: open ? "red" : undefined,
        color: open ? "white" : undefined,
      }}
    >
      {doors.map(function(door) {
        return (
          <div key={++key} style={{fontSize: 20}}>
            <span style={{ fontWeight: "bold" }}>{door.name}</span> {door.contact}
          </div>
        );
      })}
    </ListGroup.Item>
  );
};

export default GarageDoorItem;
