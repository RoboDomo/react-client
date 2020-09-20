import React, { useEffect, useState, useRef } from "react";
import useConfig from "@/hooks/useConfig";
import useWeather from "@/hooks/useWeather";
import useThermostat from "@/hooks/useThermostat";
import thermostatReducer from "@/hooks/reducers/thermostatReducer";

import {
  ButtonGroup,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { FaChevronUp, FaChevronDown, FaChevronRight } from "react-icons/fa";

import Thermostat from "react-nest-thermostat";

const ThermostatTab = ({ thermostat }) => {
  const device = thermostat.device;

  const Config = useConfig(),
        metric = Config.metric;

  const thermoState = useThermostat(device);
  const weather = useWeather(thermoState ? thermoState.postal_code : null),
        { now } = weather;

  const hvacModeChange = mode => {
    try {
      dispatch({ type: "hvac_mode", value: mode });
    } catch (e) {}
  };

  const setTargetTemperature = temp => {
    try {
      dispatch({ type: "target_temp", value: temp });
    } catch (e) {}
  };

  const adjustTemperature = temp => {
    const newVal = Number(thermoState.target_temperature_f) + temp;
    try {
      dispatch({ type: "target_temp", value: newVal });
    } catch (e) {}
  };

  const adjustTemperatureButton = delta => {
    const d = metric ? parseInt((10 * delta) / 1.8) / 10 : delta;
    return (
      <Button
        onClick={() => {
          adjustTemperature(d);
        }}
      >
        {delta < 0 ? <FaChevronDown /> : <FaChevronUp />}
        {d}
      </Button>
    );
  };

  const render = () => {

    if (!thermoState || !thermoState.away) {
      return null;
    }

    const target = n => {
      let icon = <FaChevronRight />,
          disabled = false;

      if (thermoState.target_temperature_f > n) {
        icon = <FaChevronDown />;
      } else if (thermoState.target_temperature_f < n) {
        icon = <FaChevronUp />;
      } else {
        icon = <FaChevronRight />;
        disabled = true;
      }
      return (
        <Button block disabled={disabled} onClick={() => setTargetTemperature(n)}>
          {icon} Set to {n}&deg;
        </Button>
      );
    };

    const renderTargets = () => {
      switch (thermoState.hvac_mode) {
      case "Off":
      default:
        return null;
      case "heat":
        return (
          <ButtonGroup vertical style={{ width: "100%" }}>
            {target(78)}
            {target(77)}
            {target(76)}
            {target(75)}
            {target(74)}
            {target(73)}
            {target(72)}
            {target(71)}
            {target(70)}
            {target(69)}
          </ButtonGroup>
        );
      case "cool":
        return (
          <ButtonGroup vertical style={{ width: "100%" }}>
            {target(82)}
            {target(81)}
            {target(80)}
            {target(79)}
            {target(79)}
            {target(77)}
            {target(76)}
            {target(75)}
            {target(74)}
            {target(73)}
          </ButtonGroup>
        );
      }
    };

    const bwidth = window.innerWidth / 5;

    const away = Boolean(thermoState.away !== "home");
    
    return (
      <div
        style={{
          overflow: "scroll",
          height: "100vh",
          paddingBottom: 300,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        <Thermostat
          style={{ textAlign: "center " }}
          width="300px"
          height="300px"
          away={away}
          ambientTemperature={thermoState.ambient_temperature_f}
          targetTemperature={thermoState.target_temperature_f}
          hvacMode={thermoState.hvac_state}
          leaf={thermoState.has_leaf}
        />
        <ButtonGroup style={{ marginBottom: 8, marginTop: 20 }}>
          <Button onClick={() => adjustTemperature(-3)}>
            <FaChevronDown />
            &nbsp; 3 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(-2)}>
            <FaChevronDown />
            &nbsp; 2 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(-1)}>
            <FaChevronDown />
            &nbsp; 1 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(1)}>
            <FaChevronUp />
            &nbsp; 1 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(2)}>
            <FaChevronUp />
            &nbsp; 2 &deg;
          </Button>
          <Button onClick={() => adjustTemperature(3)}>
            <FaChevronUp />
            &nbsp; 3 &deg;
          </Button>
        </ButtonGroup>
        <ToggleButtonGroup
          onChange={hvacModeChange}
          type="radio"
          size="lg"
          name="hvac"
          value={thermoState.hvac_mode}
        >
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="off">
            Off
          </ToggleButton>
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="heat">
            Heat
          </ToggleButton>
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="cool">
            Cool
          </ToggleButton>
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="heat-cool">
            Both
          </ToggleButton>
          <ToggleButton style={{ width: bwidth, fontSize: 14 }} value="Eco">
            Eco
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
  };

  return render();
};

export default ThermostatTab;
