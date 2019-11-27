import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { ListGroup } from "react-bootstrap";

import Clock from "@/common/Clock";
import useWeather from "@/hooks/useWeather";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ClockItem = () => {
  const Config = useConfig();
  const [date, setDate] = useState(new Date());
  const weather = useWeather(Config.weather.locations[0].device);
  if (!weather || !weather.astronomy) {
    return null;
  }
  const sunrise = new Date(weather.astronomy.sunrise * 1000)
      .toLocaleTimeString()
      .replace(":00 ", " "),
    sunset = new Date(weather.astronomy.sunset * 1000).toLocaleTimeString().replace(":00 ", " ");
  return (
    <ListGroup.Item style={{ fontSize: 50, whiteSpace: "nowrap", textAlign: "center" }}>
      <div style={{ fontSize: 20 }}>
        {dayNames[date.getDay()]} {date.toLocaleDateString()}
      </div>
      <Clock />
      <div style={{ fontSize: 14 }}>Sunrise: {sunrise}</div>
      <div style={{ fontSize: 14 }}>Sunset: {sunset}</div>
    </ListGroup.Item>
  );
};

export default ClockItem;
