/*
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 

 _____ _                                   _        _   ___ _                  
|_   _| |__   ___ _ __ _ __ ___   ___  ___| |_ __ _| |_|_ _| |_ ___ _ __ ___   
  | | | '_ \ / _ \ '__| '_ ` _ \ / _ \/ __| __/ _` | __|| || __/ _ \ '_ ` _ \  
  | | | | | |  __/ |  | | | | | | (_) \__ \ || (_| | |_ | || ||  __/ | | | | | 
  |_| |_| |_|\___|_|  |_| |_| |_|\___/|___/\__\__,_|\__|___|\__\___|_| |_| |_| 
                                                                               
*/

import React, { useState, useReducer } from "react";

import useConfig from "@/hooks/useConfig";
import useThermostat from "@/hooks/useThermostat";
import thermostatReducer from "@/hooks/reducers/thermostatReducer";
import Locale from "@/lib/Locale";
import NumberInput from "@/common/form/NumberInput";
//import Temperature from "@/common/Temperature";

import { ListGroup } from "react-bootstrap";

const ThermostatItem = ({ device }) => {
  const Config = useConfig();
  const thermostat = useThermostat(device);
  const [, dispatch] = useReducer(thermostatReducer, { device: device });

  if (!thermostat || !thermostat.ambient_temperature_f || !thermostat.target_temperature_f) {
    return null;
  }
  const metric = Config.metric;
  const ambient_temperature = Number(thermostat.ambient_temperature_f),
    target_temperature = Number(thermostat.target_temperature_f);

  if (thermostat.hvac_state === "off") {
    return (
      <ListGroup.Item style={{ fontSize: 36, paddingTop: 20, paddingBottom: 70 }}>
        <div style={{ float: "left" }}>Ambient: {ambient_temperature}&deg;F</div>
        <div style={{ float: "right" }}>OFF</div>
      </ListGroup.Item>
    );
  }

  let variant;
  if (thermostat.hvacState === "cooling") {
    variant = "info";
  } else if (thermostat.hvac_state === "heating") {
    variant = "warning";
  }

  return (
    <ListGroup.Item variant={variant}>
      <div style={{ textAlign: "center" }}>{device}</div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 2,
            fontSize: 44,
            whiteSpace: "nowrap",
          }}
        >
          {ambient_temperature}&deg;F
        </div>
        <div style={{ flex: 2 }}>
          <NumberInput
            style={{ float: "left" }}
            key={target_temperature}
            value={target_temperature}
            onValueChange={temp => {
              dispatch({ type: "target_temperature", value: Locale.ctof(temp, metric) });
            }}
          />
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default ThermostatItem;
