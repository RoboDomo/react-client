import React, { useState } from "react";

import { Navbar, Nav, TabContainer, TabContent, TabPane } from "react-bootstrap";

import { FaSwimmingPool } from "react-icons/fa";
import { MdDashboard, MdMenu } from "react-icons/md";
import { IoIosTv, IoIosAnalytics } from "react-icons/io";
import { TiWeatherCloudy, TiThermometer } from "react-icons/ti";

import Dashboard from "Phone/Dashboard/Dashboard";
import Theater from "Phone/Theater/Theater";
import Weather from "Phone/Weather/Weather";
import Nest from "Phone/Nest/Nest";
import Sensors from "Phone/Sensors/Sensors";
import Autelis from "Phone/Autelis/Autelis";

const LOCALSTORAGE_KEY = "phoneTabState";

const style = {
  nav: {
    width: window.innerWidth / 7 - 8,
  },
};
/**
 * Phone Top Level App (Main) Screen
 */
const MainScreen = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem(LOCALSTORAGE_KEY) || "1");
  console.log("height", window.outerHeight);
  return (
    <div style={{ marginTop: 50 }}>
      <TabContainer
        activeKey={parseInt(activeTab, 10)}
        id="mainTabs"
        variant="pills"
        mountOnEnter
        unmountOnExit
        onSelect={() => {}}
      >
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>RoboDomo</Navbar.Brand>
        </Navbar>
        <Navbar
          className="justify-content-between"
          bg="dark"
          variant="dark"
          fixed="bottom"
          onSelect={tab => {
            localStorage.setItem(LOCALSTORAGE_KEY, tab);
            setActiveTab(tab);
            console.log("eventKey");
          }}
        >
          <Nav justify fill variant="tabs" defaultActiveKey={activeTab}>
            <Nav.Item style={style.nav}>
              <Nav.Link eventKey={1} style={{ margin: 0 }}>
                <MdDashboard />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={style.nav}>
              <Nav.Link eventKey={2} style={{ margin: 0 }}>
                <IoIosTv />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={style.nav}>
              <Nav.Link eventKey={3} style={{ margin: 0 }}>
                <TiWeatherCloudy />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={style.nav}>
              <Nav.Link eventKey={4} style={{ margin: 0 }}>
                <TiThermometer />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={style.nav}>
              <Nav.Link eventKey={5} style={{ margin: 0 }}>
                <IoIosAnalytics />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={style.nav}>
              <Nav.Link eventKey={6} style={{ margin: 0 }}>
                <FaSwimmingPool />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={style.nav}>
              <Nav.Link eventKey={7} style={{ margin: 0 }}>
                <MdMenu />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        <TabContent>
          <TabPane eventKey={1}>
            <Dashboard />
          </TabPane>
          <TabPane eventKey={2}>
            <Theater />
          </TabPane>
          <TabPane eventKey={3}>
            <Weather />
          </TabPane>
          <TabPane eventKey={4}>
            <Nest />
          </TabPane>
          <TabPane eventKey={5}>
            <Sensors />
          </TabPane>
          <TabPane eventKey={6}>
            <Autelis />
          </TabPane>
          <TabPane eventKey={7}>SmartThings</TabPane>
        </TabContent>
      </TabContainer>
    </div>
  );
};

export default MainScreen;
