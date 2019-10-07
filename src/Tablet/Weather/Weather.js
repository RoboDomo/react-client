import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import WeatherTab from "./WeatherTab";

const Weather = () => {
  const Config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem("weatherTabState") || "0");
  const changeTab = eventKey => {
    localStorage.setItem("weatherTabState", eventKey);
    setActiveTab(eventKey);
  };
  if (!Config) {
    return null;
  }
  try {
    return (
      <Tabs
        id="weather-tabs"
        onSelect={changeTab}
        activeKey={activeTab}
        variant="pills"
        mountOnEnter
        unmountOnExit
      >
        {Config.weather.locations.map(location => {
          return (
            <Tab
              title={location.name}
              eventKey={location.name}
              key={location.name}
              style={{ paddingLeft: 10, paddingRight: 10 }}
            >
              <WeatherTab location={location} />
            </Tab>
          );
        })}
      </Tabs>
    );
  } catch (e) {
    return (
      <div style={{ whiteSpace: "pre" }}>
        Exception: {e.message}
        {e.stack}
      </div>
    );
  }
};

//
export default Weather;
