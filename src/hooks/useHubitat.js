import React, { useState, useEffect } from "react";

import MQTT from "@/lib/MQTT";

import Temperature from "@/common/Temperature";
import tinycolor from "tinycolor2";

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useSwitch = (device, sw = "switch") => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleSwitch = (topic, message) => {
      setToggle(message);
    };
    MQTT.subscribe(`hubitat/${device}/status/${sw}`, handleSwitch);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${sw}`, handleSwitch);
    };
  }, [device, sw]);

  return {
    type: "switch",
    name: device,
    get switch() {
      return toggle;
    },
    set switch(val) {
      //      const value = val; // === "off" || val === false ? "off" : "on";
      MQTT.publish(`hubitat/${device}/set/${sw}`, val);
      setToggle(val);
    },
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useDimmer = (device, sw = "switch", lvl = "level") => {
  const [toggle, setToggle] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const handleToggle = (topic, message) => {
      setToggle(message);
    };
    const handleLevel = (topic, message) => {
      setLevel(Number(message));
    };
    MQTT.subscribe(`hubitat/${device}/status/${sw}`, handleToggle);
    MQTT.subscribe(`hubitat/${device}/status/${lvl}`, handleLevel);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${sw}`, handleToggle);
      MQTT.unsubscribe(`hubitat/${device}/status/${lvl}`, handleLevel);
    };
  }, [device, lvl, sw]);

  return {
    type: "dimmer",
    name: device,
    get switch() {
      return toggle;
    },
    set switch(value) {
      MQTT.publish(`hubitat/${device}/set/${sw}`, value);
      setToggle(value);
    },
    get level() {
      return level;
    },
    set level(l) {
      MQTT.publish(`hubitat/${device}/set/${lvl}`, l);
      setLevel(Number(l));
    },
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useFan = (device, sw = "switch", lvl = "level") => {
  const [toggle, setToggle] = useState(false);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const handleToggle = (topic, message) => {
      setToggle(message);
    };
    const handleLevel = (topic, message) => {
      setLevel(Number(message));
    };
    MQTT.subscribe(`hubitat/${device}/status/${sw}`, handleToggle);
    MQTT.subscribe(`hubitat/${device}/status/${lvl}`, handleLevel);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${sw}`, handleToggle);
      MQTT.unsubscribe(`hubitat/${device}/status/${lvl}`, handleLevel);
    };
  }, [device, lvl, sw]);

  return {
    type: "fan",
    name: device,
    get switch() {
      return toggle;
    },
    set switch(value) {
      MQTT.publish(`hubitat/${device}/set/${sw}`, value);
      setToggle(value);
    },
    get level() {
      return level;
    },
    set level(l) {
      l = Number(l);
      if (l === 0) {
        MQTT.publish(`hubitat/${device}/set/${lvl}`, "off");
      }
      MQTT.publish(`hubitat/${device}/set/${lvl}`, l);
      setLevel(l);
    },
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useMotion = (device, key = "motion") => {
  const [motion, setMotion] = useState("");

  useEffect(() => {
    const handleMotion = (topic, message) => {
      setMotion(message);
    };
    MQTT.subscribe(`hubitat/${device}/status/${key}`, handleMotion);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${key}`, handleMotion);
    };
  }, [device, key]);

  return { type: "motion", name: device, motion: motion, formatted: motion.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const usePresence = (device, key = "presence") => {
  const [presence, setPresence] = useState("");

  useEffect(() => {
    const handlePresence = (topic, message) => {
      setPresence(message);
    };
    MQTT.subscribe(`hubitat/${device}/status/${key}`, handlePresence);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${key}`, handlePresence);
    };
  }, [device, key]);

  return { type: "presence", name: device, presence: presence, formatted: presence.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useButton = (device, key = "button") => {
  const [button, setButton] = useState("");

  useEffect(() => {
    const handleButton = (topic, message) => {
      setButton(message);
    };
    MQTT.subscribe(`hubitat/${device}/status/${key}`, handleButton);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${key}`, handleButton);
    };
  }, [device, key]);

  return { type: "button", name: device, button: button, formatted: button.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useTemperature = (device, key = "temperature") => {
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    const handleTemperature = (topic, message) => {
      setTemperature(Number(message));
    };
    MQTT.subscribe(`hubitat/${device}/status/${key}`, handleTemperature);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${key}`, handleTemperature);
    };
  }, [device, key]);

  return {
    type: "temperature",
    name: device,
    temperature: temperature,
    formatted: temperature ? <span>{temperature}&deg;F</span> : "",
    metric: temperature ? <Temperature value={temperature} metric={true} /> : "",
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useContact = (device, key = "contact") => {
  const [contact, setContact] = useState("closed");

  useEffect(() => {
    const handleContact = (topic, message) => {
      setContact(message);
    };
    MQTT.subscribe(`hubitat/${device}/status/${key}`, handleContact);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${key}`, handleContact);
    };
  }, [device, key]);

  return { type: "contact", name: device, contact: contact, formatted: contact.toUpperCase() };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useBattery = (device, key = "battery") => {
  const [battery, setBattery] = useState("");

  useEffect(() => {
    const handleBattery = (topic, message) => {
      setBattery(Number(message));
    };
    MQTT.subscribe(`hubitat/${device}/status/${key}`, handleBattery);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${key}`, handleBattery);
    };
  }, [device, key]);

  return {
    type: "battery",
    name: device,
    battery: battery,
    formatted: battery ? battery + "%" : "",
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useHumidity = (device, key = "humidity") => {
  const [humidity, setHumidity] = useState("");

  useEffect(() => {
    const handleHumidity = (topic, message) => {
      setHumidity(Number(message));
    };
    MQTT.subscribe(`hubitat/${device}/status/${key}`, handleHumidity);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${key}`, handleHumidity);
    };
  }, [device, key]);

  return {
    type: "humidity",
    name: device,
    humidity: humidity,
    formatted: humidity ? humidity + "%" : "",
  };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useIlluminance = (device, key = "illuminance") => {
  const [illuminance, setIlluminance] = useState("");

  useEffect(() => {
    const handleIlluminance = (topic, message) => {
      setIlluminance(Number(message));
    };
    MQTT.subscribe(`hubitat/${device}/status/${key}`, handleIlluminance);
    return () => {
      MQTT.unsubscribe(`hubitat/${device}/status/${key}`, handleIlluminance);
    };
  }, [device, key]);

  return { type: "illuminance", name: device, illuminance: illuminance, formatted: illuminance };
};

/*****************************************************************************************************
 *****************************************************************************************************
 *****************************************************************************************************/

const useRGB = (device, color = "ff00ff") => {
  const defaultColor = tinycolor(color),
    colorRGB = defaultColor.toRgb(),
    colorHsl = defaultColor.toHsl();

  const [level, setLevel] = useState(colorHsl.l);
  const [sw, setSwitch] = useState(false);
  const [hex, setHex] = useState(defaultColor.toHex());
  const [red, setRed] = useState(colorRGB.r);
  const [green, setGreen] = useState(colorRGB.g);
  const [blue, setBlue] = useState(colorRGB.b);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const keys = ["level", "switch", "hue", "red", "green", "blue", "saturation"];
    const status_topic = `hubitat/${device}/status/`;

    const handleRGB = (topic, message) => {
      const key = topic.substr(status_topic.length);
      switch (key) {
        case "level":
          setLevel(message);
          forceUpdate(v => !v);
          break;
        case "switch":
          setSwitch(message);
          forceUpdate(v => !v);
          break;
        case "hue":
          forceUpdate(v => !v);
          break;
        case "saturation":
          forceUpdate(v => !v);
          break;
        case "red":
          setRed(message);
          forceUpdate(v => !v);
          break;
        case "green":
          setGreen(message);
          forceUpdate(v => !v);
          break;
        case "blue":
          setBlue(message);
          forceUpdate(v => !v);
          break;
        default:
          console.warn("handleRGB: Unhandled key", key);
          break;
      }
    };

    for (const key of keys) {
      MQTT.subscribe(`${status_topic}${key}`, handleRGB);
    }
    return () => {
      for (const key of keys) {
        MQTT.unsubscribe(`${status_topic}${key}`, handleRGB);
      }
    };
  }, []); // eslint-disable-line
  //  }, [device, hsl.h, hsl.v, hsv.h, hsv.v, rgb.blue, rgb.green, rgb.red]);

  const ret = {
    type: "rgb",
    name: device,
    formatted: hex,

    get power() {
      return sw;
    },
    set power(val) {
      setSwitch(val);
      MQTT.publish(`hubitat/${device}/set/switch`, val);
    },
    get switch() {
      return sw;
    },
    set switch(val) {
      setSwitch(val);
      MQTT.publish(`hubitat/${device}/set/switch`, val);
    },

    get hex() {
      return hex;
    },
    set hex(val) {
      const st = tinycolor(val);
      setHex(val);
      this.rgb = st.toRgb();
    },

    get level() {
      return level;
    },
    set level(val) {
      MQTT.publish(`hubitat/${device}/set/level`, val);
      setLevel(val);
    },

    get rgb() {
      return { r: red, g: green, b: blue };
    },
    set rgb(val) {
      setRed((this.red = val.r));
      setGreen((this.green = val.g));
      setBlue((this.blue = val.b));
      MQTT.publish(`hubitat/${device}/set/level`, level);
      MQTT.publish(`hubitat/${device}/set/red`, red);
      MQTT.publish(`hubitat/${device}/set/green`, green);
      MQTT.publish(`hubitat/${device}/set/blue`, blue);
      const st = tinycolor(val);
    },

    get hue() {
      const st = tinycolor(this.rgb).toHsv();
      return st.h;
    },
    set hue(val) {
      //      setHue(val);
    },

    get saturation() {
      const st = tinycolor(this.rgb).toHsv();
      return st.s;
      //      return saturation;
    },
    set saturation(val) {
      //      setSaturation(val);
    },

    get hsl() {
      const st = tinycolor(this.rgb).toHsl();
      return st;
    },
    set hsl(val) {
      const color = `hsl(${val.h},${val.s * 100}, ${val.l * 100})`;
      const st = tinycolor(color);
      const rgb = st.toRgb();
      this.rgb = rgb;
    },

    get hsv() {
      return tinycolor(this.rgb).toHsv();
    },
    set hsv(val) {
      const st = tinycolor(val);
      this.rgb = st.toRgb();
    },

    get red() {
      return red;
    },
    set red(val) {
      setRed(val);
    },
    get green() {
      return green;
    },
    set green(val) {
      setGreen(val);
    },
    get blue() {
      return red;
    },
    set blue(val) {
      setBlue(val);
    },
  };
  return ret;
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
  useRGB,
};
