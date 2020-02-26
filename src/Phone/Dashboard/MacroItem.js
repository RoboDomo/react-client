/**
 ____  _                       
|  _ \| |__   ___  _ __   ___  
| |_) | '_ \ / _ \| '_ \ / _ \ 
|  __/| | | | (_) | | | |  __/ 
|_|   |_| |_|\___/|_| |_|\___| 

 __  __                     ___ _                  
|  \/  | __ _  ___ _ __ ___|_ _| |_ ___ _ __ ___   
| |\/| |/ _` |/ __| '__/ _ \| || __/ _ \ '_ ` _ \  
| |  | | (_| | (__| | | (_) | || ||  __/ | | | | | 
|_|  |_|\__,_|\___|_|  \___/___|\__\___|_| |_| |_| 
                                                   
A dashboard item that runs a macro when pressed.
 */

import React, { useReducer } from "react";
import macrosReducer from "@/hooks/reducers/macrosReducer";

import { FaRunning } from "react-icons/fa";
import { ListGroup } from "react-bootstrap";

const MacroItem = ({ label, name }) => {
  const [, dispatch] = useReducer(macrosReducer, { macro: name });
  const onClick = () => {
    if (!name) {
      console.warn("MacroTile needs name prop");
    } else {
      dispatch({ action: name });
    }
  };

  return (
    <ListGroup.Item style={{ flexDirection: "column" }} onClick={onClick}>
      <span style={{ fontSize: 24, textAlign: "center", marginBottom: 10 }}>
        <FaRunning size={24} />
      </span>
      <span style={{ marginLeft: 10, fontSize: 20 }}>{label}</span>
      <span className="float-right" style={{ fontSize: 20 }}>
        {"Macro"}
      </span>
    </ListGroup.Item>
  );
};

export default MacroItem;
