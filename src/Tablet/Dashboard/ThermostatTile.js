/* _____     _     _      _    
|_   _|_ _| |__ | | ___| |_  
  | |/ _` | '_ \| |/ _ \ __| 
  | | (_| | |_) | |  __/ |_  
  |_|\__,_|_.__/|_|\___|\__| 

 _____ _                                   _        _  _____ _ _       
|_   _| |__   ___ _ __ _ __ ___   ___  ___| |_ __ _| ||_   _(_) | ___  
  | | | '_ \ / _ \ '__| '_ ` _ \ / _ \/ __| __/ _` | __|| | | | |/ _ \ 
  | | | | | |  __/ |  | | | | | | (_) \__ \ || (_| | |_ | | | | |  __/ 
  |_| |_| |_|\___|_|  |_| |_| |_|\___/|___/\__\__,_|\__||_| |_|_|\___| 
                                                                       
*/

import React, { useState, useReducer } from "react";

import useConfig from "@/hooks/useConfig";
import useThermostat from "@/hooks/useThermostat";
import thermostatReducer from "@/hooks/reducers/thermostatReducer";
import Locale from "@/lib/Locale";
import Temperature from "@/common/Temperature";

import Tile from "./Tile";
import NumberInput from "@/common/form/NumberInput";
import Thermostat from "react-nest-thermostat";
import { Form } from "react-bootstrap";

const ThermostatTile = ({ device }) => {
  const Config = useConfig();
  const thermostat = useThermostat(device);
  const [, dispatch] = useReducer(thermostatReducer, { device: device });

  if (!thermostat || !thermostat.ambient_temperature_f || !thermostat.target_temperature_f) {
    return null;
  }
  const metric = Config.metric;

  const ambient = Number(thermostat.ambient_temperature_f),
    target = Number(thermostat.target_temperature_f);

  if (thermostat.hvac_state === "offx") {
    return (
      <Tile width={2} height={2} onClick="nest">
        <div
          style={{
            textAlign: "center",
            marginTop: 0,
          }}
        >
          <div style={{ marginBottom: 8, fontSize: 18, fontWeight: "bold" }}>
            Inside: <Temperature value={thermostat.ambient_temperature_f} />
          </div>
          <div>
            <div>Thermostat</div>
            <div style={{ marginBottom: 8, fontSize: 48, fontWeight: "bold" }}>{"OFF"}</div>
          </div>
        </div>
      </Tile>
    );
  }
  return (
    <Tile width={2} height={2} onClick="nest">
      <div
        style={{
          textAlign: "center",
          marginTop: 0,
        }}
      >
        <div style={{ marginBottom: 8, fontSize: 18, fontWeight: "bold" }}>
          Inside: <Temperature value={thermostat.ambient_temperature_f} />
        </div>
        <Thermostat
          style={{ textAlign: "center " }}
          width="150px"
          height="150px"
          away={Boolean(thermostat.away !== "home")}
          ambientTemperature={Locale.ftoc(ambient, metric)}
          targetTemperature={Locale.ftoc(target, metric)}
          hvacMode={thermostat.hvac_state}
          leaf={thermostat.has_leaf}
        />
        <Form style={{ margin: 0 }}>
          <NumberInput
            key={thermostat.target_temperature_f}
            value={Locale.ftoc(target, metric)}
            step={metric ? 0.1 : 1}
            onValueChange={temp => {
              dispatch({ type: "target_temperature", value: Locale.ctof(temp, metric) });
            }}
          />
        </Form>
      </div>
    </Tile>
  );
};

//
export default ThermostatTile;
