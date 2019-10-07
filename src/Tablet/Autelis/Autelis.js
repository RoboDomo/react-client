import React, { useState } from "react";
import useConfig from "@/hooks/useConfig";

import { Tabs, Tab } from "react-bootstrap";

import AutelisTab from "./AutelisTab";

const LOCALSTORAGE_KEY = "autelisTabletTabState";

const Autelis = () => {
  const Config = useConfig();
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "0");

  if (!Config) {
    return null;
  }

  try {
    return (
      <Tabs
        id="autelis-tabs"
        onSelect={eventKey => {
          localStorage.setItem(LOCALSTORAGE_KEY, eventKey);
          setActiveTab(eventKey);
        }}
        activeKey={activeTab}
        variant="pills"
        mountOnEnter
        unmountOnExit
      >
        <Tab title={Config.autelis.device.toUpperCase()} eventKey="autelis" key="autelis">
          <AutelisTab />
        </Tab>
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

export default Autelis;
