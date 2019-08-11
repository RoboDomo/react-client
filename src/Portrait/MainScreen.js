/**
 * iPad Mini MainScreen component
 *
 * Implements the top bar as tabs and renders app content below
 */

import React from "react";
//import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import Theater from "@/Portrait/Theater/Theater";

const MainScreen = () => {
  return (
    <>
      <Navbar fixed="top" bg="primary" variant="dark">
        <Navbar.Brand
          onClick={() => {
            window.location.reload();
          }}
        >
          RoboDomo
        </Navbar.Brand>
      </Navbar>
      <div style={{ marginTop: 60 }}>
        <Theater />
      </div>
    </>
  );
};

//
export default MainScreen;
