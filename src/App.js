import React, { Suspense, useReducer, useEffect, lazy } from "react";
import MqttProvider from "@/providers/mqtt";
import ConfigProvider from "@/providers/config";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/slate/bootstrap.min.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import "react-bootstrap-toggle/dist/bootstrap2-toggle.css";

// We only need to calculate platform once.
import bowser from "bowser";
const parser = bowser.getParser(window.navigator.userAgent),
  platform = parser.getResult().platform;

const Tablet = lazy(() =>
  import("./Tablet/MainScreen" /* webpackChunkName: "tablet", webpackPrefetch: true  */)
);
const Phone = lazy(() =>
  import("./Phone/MainScreen" /* webpackChunkName: "phone", webpackPrefetch: true  */)
);
const Portrait = lazy(() =>
  import("./Portrait/MainScreen" /* webpackChunkName: "portrait", webpackPrefetch: true  */)
);

const Platform = () => {
  if (platform.type === "mobile") {
    return <Phone />;
  }

  if (window.orientation === 0) {
    return <Portrait />;
  }
  return <Tablet />;
};

const App = () => {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    window.addEventListener("orientationchange", forceUpdate);
  }, []);
  return (
    <Suspense fallback={<div className="loader" />}>
      <MqttProvider>
        <ConfigProvider>
          <Platform />
        </ConfigProvider>
      </MqttProvider>
    </Suspense>
  );
};

//
export default App;
