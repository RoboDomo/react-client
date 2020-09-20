import React from "react";
import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";

const ToggleField = ({ name, label, toggled, onToggle }) => {
  if (window.innerWidth < 400) {
    return (
      <>
        <div style={{ marginTop: 10, whitespace: 'nowrap',fontSize: 20}}>{label}</div>
        <div style={{ display: "flex" }}>
          <div className="float-right" style={{ whiteSpace: "nowrap" }}>
            <ButtonToolbar>
              <ButtonGroup>
                <Button
                  variant={toggled ? "dark" : undefined}
                  onClick={() => {
                    if (onToggle && !toggled) {
                      onToggle(name, true);
                    }
                  }}
                >
                  On
                </Button>
                <Button
                  variant={toggled ? undefined : "dark"}
                  onClick={() => {
                    if (onToggle && toggled) {
                      onToggle(name, false);
                    }
                  }}
                >
                  Off
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
      </>
    );
  }
  return (
    <div style={{ display: "flex", marginTop: 10 }}>
      <div style={{ marginTop: 12, flex: 1 }}>{label}</div>
      <div className="float-right" style={{ whiteSpace: "nowrap" }}>
        <ButtonToolbar>
          <ButtonGroup>
            <Button
              variant={toggled ? "dark" : undefined}
              onClick={() => {
                if (onToggle && !toggled) {
                  onToggle(name, true);
                }
              }}
            >
              On
            </Button>
            <Button
              variant={toggled ? undefined : "dark"}
              onClick={() => {
                if (onToggle && toggled) {
                  onToggle(name, false);
                }
              }}
            >
              Off
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    </div>
  );
};

//
export default ToggleField;
