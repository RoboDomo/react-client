/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 
                               
 ____  _                              ___ _                  
|  _ \(_)_ __ ___  _ __ ___   ___ _ _|_ _| |_ ___ _ __ ___   
| | | | | '_ ` _ \| '_ ` _ \ / _ \ '__| || __/ _ \ '_ ` _ \  
| |_| | | | | | | | | | | | |  __/ |  | || ||  __/ | | | | | 
|____/|_|_| |_| |_|_| |_| |_|\___|_| |___|\__\___|_| |_| |_| 
                                                             
*/

import React from "react";
import { Badge, ListGroup } from "react-bootstrap";
import { useDimmer } from "@/hooks/useThings";
import { TiAdjustBrightness } from "react-icons/ti";

const DimmerItem = ({ hub, name }) => {
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
    <ListGroup.Item style={{ whiteSpace: "nowrap", color: style.color }} onClick={onClick}>
      <TiAdjustBrightness size={24} style={{ paddingBottom: 10 }} />
      <span style={{ fontSize: 20, fontWeight: "normal" }}>{name}</span>
      <Badge className="float-right" variant="secondary" style={{ fontSize: 20, marginLeft: 10 }}>
        {style.value}
      </Badge>
    </ListGroup.Item>
  );
};

export default DimmerItem;
