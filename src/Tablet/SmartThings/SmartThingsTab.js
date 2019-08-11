import React, { useRef, useEffect } from "react";
import {
  useSwitch as useSmartThingsSwitch,
  useDimmer as useSmartThingsDimmer,
  useFan as useSmartThingsFan,
  useMotion as useSmartThingsMotion,
  usePresence as useSmartThingsPresence,
  useTemperature as useSmartThingsTemperature,
  useButton as useSmartThingsButton,
  useContact as useSmartThingsContact,
} from "@/hooks/useSmartThings";

import {
  useSwitch as useHubitatSwitch,
  useDimmer as useHubitatDimmer,
  useFan as useHubitatFan,
  useMotion as useHubitatMotion,
  usePresence as useHubitatPresence,
  useTemperature as useHubitatTemperature,
  useButton as useHubitatButton,
  useContact as useHubitatContact,
} from "@/hooks/useHubitat";

import ToggleField from "@/common/form/ToggleField";
import DimmerField from "@/common/form/DimmerField";
import FanField from "@/common/form/FanField";
import DisplayField from "@/common/form/DisplayField";

const SmartThingsTab = ({ room }) => {
  const things = useRef({
    dimmer: {},
    fan: {},
    switch: {},
    motion: {},
    presence: {},
    button: {},
    contact: {},
    temperature: {},
  });

  const toggleSwitch = (name, state) => {
    const thing = things.current.switch[name];
    thing.switch = thing.switch === "on" ? "off" : "on";
  };

  const toggleDimmer = (name, state) => {
    const thing = things.current.dimmer[name];
    thing.switch = thing.switch === "on" ? "off" : "on";
  };

  const useDimmer = (name, hub) => {
    return hub === "hubitat" ? useHubitatDimmer(name) : useSmartThingsDimmer(name);
  };
  const useFan = (name, hub) => {
    return hub === "hubitat" ? useHubitatFan(name) : useSmartThingsFan(name);
  };
  const useSwitch = (name, hub) => {
    return hub === "hubitat" ? useHubitatSwitch(name) : useSmartThingsSwitch(name);
  };
  const useMotion = (name, hub) => {
    return hub === "hubitat" ? useHubitatMotion(name) : useSmartThingsMotion(name);
  };
  const usePresence = (name, hub) => {
    return hub === "hubitat" ? useHubitatPresence(name) : useSmartThingsPresence(name);
  };
  const useButton = (name, hub) => {
    return hub === "hubitat" ? useHubitatButton(name) : useSmartThingsButton(name);
  };
  const useContact = (name, hub) => {
    return hub === "hubitat" ? useHubitatContact(name) : useSmartThingsContact(name);
  };
  const useTemperature = (name, hub) => {
    return hub === "hubitat" ? useHubitatTemperature(name) : useSmartThingsTemperature(name);
  };

  useEffect(() => {
    const clearThings = () => {
      for (const thing of room.things) {
        delete things[thing.name];
      }
    };
    return () => {
      clearThings();
    };
  }, [room.things]);

  for (const thing of room.things) {
    switch (thing.type) {
      case "dimmer":
        things.current.dimmer[thing.name] = useDimmer(thing.name, thing.hub);
        break;
      case "fan":
        things.current.fan[thing.name] = useFan(thing.name, thing.hub);
        break;
      case "switch":
        things.current.switch[thing.name] = useSwitch(thing.name, thing.hub);
        break;
      case "motion":
        things.current.motion[thing.name] = useMotion(thing.name, thing.hub);
        break;
      case "presence":
        things.current.presence[thing.name] = usePresence(thing.name, thing.hub);
        break;
      case "button":
        things.current.button[thing.name] = useButton(thing.name, thing.hub);
        break;
      case "contact":
        things.current.contact[thing.name] = useContact(thing.name, thing.hub);
        break;
      case "temperature":
        things.current.temperature[thing.name] = useTemperature(thing.name, thing.hub);
        break;
      case "acceleration":
        break;
      case "threeAxis":
        break;
      default:
        console.warn("SmartThingsTab invalid thing: ", thing);
        break;
    }
  }

  const handleFanChange = (name, state) => {
    const levels = {
      low: 25,
      medium: 50,
      high: 75,
    };

    const thing = things.current.fan[name];
    if (state === "off") {
      thing.switch = "off";
    } else {
      if (levels[state]) {
        if (thing.switch !== "on") {
          thing.switch = "on";
        }
        thing.level = levels[state];
      }
    }
  };

  return (
    <div style={{ overflow: "scroll", height: "100vh", paddingBottom: 300 }}>
      <div
        style={{
          width: "50%",
          margin: "auto",
        }}
      >
        {room.things.map((thing, ndx) => {
          const key = `${room.name}-${thing.name}-${ndx}`;
          let t;
          switch (thing.type) {
            case "switch":
              t = things.current.switch[thing.name];
              if (!t) {
                return null;
              }
              const toggled = t.switch === "on";
              return (
                <ToggleField
                  key={key}
                  name={thing.name}
                  label={thing.name}
                  toggled={toggled}
                  onToggle={toggleSwitch}
                />
              );
            case "dimmer":
              t = things.current.dimmer[thing.name];
              if (!t) {
                return null;
              }
              return (
                <DimmerField
                  key={key}
                  name={thing.name}
                  label={thing.name}
                  value={t.level}
                  toggled={t.switch === "on"}
                  onToggle={toggleDimmer}
                  onValueChange={(name, level) => {
                    t.level = level;
                  }}
                />
              );
            case "fan":
              t = things.current.fan[thing.name];
              if (!t) {
                return null;
              }
              return (
                <FanField
                  key={key}
                  name={thing.name}
                  label={thing.name}
                  toggled={t.switch === "on"}
                  value={t.level}
                  onChange={handleFanChange}
                />
              );
            case "motion":
              t = things.current.motion[thing.name];
              if (!t) {
                return null;
              }
              return <DisplayField key={key} label={thing.name} value={"motion " + t.motion} />;
            case "presence":
              t = things.current.presence[thing.name];
              if (!t) {
                return null;
              }
              return <DisplayField key={key} label={thing.name} value={t.presence} />;
            case "contact":
              t = things.current.contact[thing.name];
              if (!t) {
                return null;
              }
              return <DisplayField key={key} label={thing.name} value={"contact " + t.contact} />;
            case "temperature":
              t = things.current.temperature[thing.name];
              if (!t) {
                return null;
              }
              return <DisplayField key={key} label={thing.name} value={t.temperature} />;
            case "acceleration":
            case "threeAxis":
              return null;
            default:
              return (
                <div key={key}>
                  {thing.name} {thing.type}
                </div>
              );
          }
        })}
      </div>
    </div>
  );
};

//
export default SmartThingsTab;
