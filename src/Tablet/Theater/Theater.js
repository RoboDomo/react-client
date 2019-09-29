import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { Tab, Tabs } from "react-bootstrap";
import TheaterTab from "./TheaterTab";

const Theater = () => {
  const Config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem("theaterTabState") || "0");

  if (!Config) {
    return null;
  }
  return (
    <Tabs
      id="theater-tabs"
      onSelect={eventKey => {
        localStorage.setItem("theaterTabState", eventKey);
        setActiveTab(eventKey);
      }}
      activeKey={activeTab}
      variant="pills"
      mountOnEnter
      unmountOnExit
    >
      {Array.isArray(Config.theaters)
        ? Config.theaters.map(theater => {
            //          console.log("theater", theater);
            return (
              <Tab
                title={theater.title}
                eventKey={theater.key}
                key={theater.key}
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                <TheaterTab theater={theater} />
              </Tab>
            );
          })
        : null}
    </Tabs>
  );
};

//
export default Theater;
