import MQTT from "@/lib/MQTT";
import useConfig from "@/hooks/useConfig";

import { useSwitch as useSmartThingsSwitch } from "@/hooks/useSmartThings";
import { useSwitch as useHubitatSwitch } from "@/hooks/useHubitat";
import { useDimmer as useSmartThingsDimmer } from "@/hooks/useSmartThings";
import { useDimmer as useHubitatDimmer } from "@/hooks/useHubitat";
import { useFan as useSmartThingsFan } from "@/hooks/useSmartThings";
import { useFan as useHubitatFan } from "@/hooks/useHubitat";
import { useMotion as useSmartThingsMotion } from "@/hooks/useSmartThings";
import { useMotion as useHubitatMotion } from "@/hooks/useHubitat";
import { usePresence as useSmartThingsPresence } from "@/hooks/useSmartThings";
import { usePresence as useHubitatPresence } from "@/hooks/useHubitat";
import { useButton as useSmartThingsButton } from "@/hooks/useSmartThings";
import { useButton as useHubitatButton } from "@/hooks/useHubitat";
import { useTemperature as useSmartThingsTemperature } from "@/hooks/useSmartThings";
import { useTemperature as useHubitatTemperature } from "@/hooks/useHubitat";
import { useContact as useSmartThingsContact } from "@/hooks/useSmartThings";
import { useContact as useHubitatContact } from "@/hooks/useHubitat";
import { useBattery as useSmartThingsBattery } from "@/hooks/useSmartThings";
import { useBattery as useHubitatBattery } from "@/hooks/useHubitat";
import { useHumidity as useSmartThingsHumidity } from "@/hooks/useSmartThings";
import { useHumidity as useHubitatHumidity } from "@/hooks/useHubitat";
import { useIlluminance as useSmartThingsIlliuminance } from "@/hooks/useSmartThings";
import { useIlluminance as useHubitatIlliuminance } from "@/hooks/useHubitat";

const useSwitch = (device, hub, sw = "switch") => {
  return hub === "hubitat" ? useHubitatSwitch(device, sw) : useSmartThingsSwitch(device, sw);
};

const useDimmer = (device, hub, sw = "switch", lvl = "level") => {
  return hub === "hubitat"
    ? useHubitatDimmer(device, sw, lvl)
    : useSmartThingsDimmer(device, sw, lvl);
};

const useFan = (device, hub, sw = "switch", lvl = "level") => {
  return hub === "hubitat" ? useHubitatFan(device, sw, lvl) : useSmartThingsFan(device, sw, lvl);
};

const useMotion = (device, hub, key = "motion") => {
  return hub === "hubitat" ? useHubitatMotion(device, key) : useSmartThingsMotion(device, key);
};

const usePresence = (device, hub, key = "presence") => {
  return hub === "hubitat" ? useHubitatPresence(device, key) : useSmartThingsPresence(device, key);
};

const useButton = (device, hub, key = "button") => {
  return hub === "hubitat" ? useHubitatButton(device, key) : useSmartThingsButton(device, key);
};

const useTemperature = (device, hub, key = "temperature") => {
  return hub === "hubitat"
    ? useHubitatTemperature(device, key)
    : useSmartThingsTemperature(device, key);
};

const useContact = (device, hub, key = "contact") => {
  return hub === "hubitat" ? useHubitatContact(device, key) : useSmartThingsContact(device, key);
};

const useBattery = (device, hub, key = "battery") => {
  return hub === "hubitat" ? useHubitatBattery(device, key) : useSmartThingsBattery(device, key);
};

const useHumidity = (device, hub, key = "humidity") => {
  return hub === "hubitat" ? useHubitatHumidity(device, key) : useSmartThingsHumidity(device, key);
};

const useIlluminance = (device, hub, key = "illuminance") => {
  return hub === "hubitat"
    ? useHubitatIlliuminance(device, key)
    : useSmartThingsIlliuminance(device, key);
};

//
export {
  useSwitch,
  useDimmer,
  useFan,
  useMotion,
  usePresence,
  useButton,
  useTemperature,
  useContact,
  useBattery,
  useHumidity,
  useIlluminance,
};
