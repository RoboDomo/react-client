import React /* useState*/ from "react";

// TODO: remember tab state

import { Tab, Tabs } from "react-bootstrap";
import SensorsTab from "./SensorsTab";

const Sensors = () => {
  try {
    return (
      <Tabs id="sensors-tabs" variant="pills" mountOnEnter unmountOnExit>
        <Tab title="Sensors" eventKey={1} key={1}>
          <SensorsTab />
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

//
export default Sensors;
