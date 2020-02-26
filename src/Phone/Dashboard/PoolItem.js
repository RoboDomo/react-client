/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 

 ____             _ ___ _                  
|  _ \ ___   ___ | |_ _| |_ ___ _ __ ___   
| |_) / _ \ / _ \| || || __/ _ \ '_ ` _ \  
|  __/ (_) | (_) | || || ||  __/ | | | | | 
|_|   \___/ \___/|_|___|\__\___|_| |_| |_| 
                                           
*/

import React from "react";
import useAutelis from "@/hooks/useAutelis";
import { ListGroup, Badge } from "react-bootstrap";

const PoolItem = ({ device }) => {
  const autelis = useAutelis();

  const renderControl = (ndx, text, big) => {
    const thingState = autelis[ndx] || "off";

    if (!thingState || thingState === "off" || !autelis.pump) {
      return null;
    }
    if (big) {
      return <div style={{ fontSize: 30 }}>{text}</div>;
    }

    return (
      <div>
        <Badge style={{ marginBottom: 4 }} variant="secondary" className="float-right">
          {text}
        </Badge>
      </div>
    );
  };

  const on = autelis.pump,
    variant = on ? (autelis.poolHeat === "enabled" ? "danger" : "success") : undefined;

  if (on) {
    return (
      <ListGroup.Item variant={variant} style={{ display: "flex" }}>
        <div style={{ flex: 1, fontSize: 40 }}>Pool {autelis.poolTemp}&deg;F</div>
        <div>
          {renderControl("pump", "Filter")}
          {renderControl("cleaner", "Cleaner")}
          {renderControl("waterfall", "Waterfall")}
          {renderControl("poolHeat", "Pool Heat " + autelis.poolSetpoint)}
          {renderControl(
            "solarHeat",
            "Solar " +
              (autelis.solarHeat === "enabled" || autelis.solarHeat === "on"
                ? autelis.solarTemp + "°F"
                : "off")
          )}
        </div>
      </ListGroup.Item>
    );
  } else {
    return (
      <ListGroup.Item>
        <div style={{ fontSize: 60 }}>{"Pool Off"}</div>
      </ListGroup.Item>
    );
  }
};

export default PoolItem;
