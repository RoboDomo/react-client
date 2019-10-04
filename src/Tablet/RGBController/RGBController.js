import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import RGBControllerTab from "./RGBControllerTab";

import useConfig from "@/hooks/useConfig";

const RGBController = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("rgbTabState") || "0");
  const Config = useConfig();
  if (!Config) {
    return null;
  }
  const tabs = Array.isArray(Config.rgb) ? Config.rgb : [Config.rgb];
  return (
    <Tabs
      id="rgbcontroller-tabs"
      onSelect={eventKey => {
        localStorage.setItem("rgbTabState", eventKey);
        setActiveTab(eventKey);
      }}
      activeKey={activeTab}
      variant="pills"
      mountOnEnter
      unmountOnExit
    >
      {tabs.map(rgb => {
        return (
          <Tab title={rgb.label} eventKey={rgb.label} key={rgb.label}>
            <RGBControllerTab config={rgb} />
          </Tab>
        );
      })}
    </Tabs>
  );
};

//
export default RGBController;
