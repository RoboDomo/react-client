import React, { useReducer } from "react";
import useConfig from "@/hooks/useConfig";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";

import NumberField from "@/common/form/NumberField";
import Clock from "@/common/Clock";
import useAutelis from "@/hooks/useAutelis";
import autelisReducer from "@/hooks/reducers/autelisReducer";
import useWeather from "@/hooks/useWeather";
import Temperature from "@/common/Temperature";
import Locale from "@/lib/Locale";

const AutelisTab = () => {
  const Config = useConfig();
  const controller = Config.autelis,
        metric = Config.metric,
        location = controller.location;

  const [, dispatch] = useReducer(autelisReducer, { autelis: controller });
  const autelis = useAutelis(),
        {
          pump,
          cleaner,
          solarHeat,
          solarTemp,
          waterfall,
          poolLight,
          poolTemp,
          poolHeat,
          poolSetpoint,
          spaLight,
          spa,
          spaTemp,
          spaHeat,
          spaSetpoint,
          jets,
          blower,
        } = autelis;

  const weather = useWeather(location),
        { now, display_city } = weather;

  //
  // RENDER
  //
  const poolOn = !spa && pump,
        spaOn = spa && pump,
        solarOn = solarHeat && pump;

  const sunrise = new Date(now.sunrise * 1000).toLocaleTimeString().replace(":00 ", " "),
        sunset = new Date(now.sunset * 1000).toLocaleTimeString().replace(":00 ", " "),
        img = now.iconLink ? (
          <img
            alt={now.iconName}
            style={{
              paddingBottom: 0,
              width: 64,
              height: 64,
            }}
            src={now.iconLink}
          />
        ) : null;

  const renderWeather = () => {
    return (
      <div style={{ width: '100%', border: '6px outset darkgrey', padding: 8, fontSize: 16, display: "flex", justifyContent: "end" }}>
        <div style={{ flex: 0.5 }}>
          <div style={{fontSize: 24}}>
            <Clock />
          </div>
          <div style={{fontSize: 12}}>Sunrise: {sunrise}</div>
          <div style={{fontSize: 12}}>Sunset: {sunset}</div>
        </div>
        <div style={{ fontSize: 24, flex: .5 }}>
          {display_city} {img}
          <span style={{FontSize: 24}}>
            <Temperature value={now.temperature} />
          </span>
        </div>
      </div>
    );
  };

  const renderMainSwitch = () => {
    const renderOffButton = () => {
      return (
        <Button
          variant={!poolOn && !spaOn ? "dark" : undefined}
          onClick={() => {
            if (poolOn) {
              dispatch({ type: "pump", value: false });
            } else if (spaOn) {
              dispatch({ type: "spa", value: false });
            }
            if (cleaner) {
              dispatch({ type: "cleaner", value: false });
            }
            if (solarOn) {
              dispatch({ type: "solarHeat", value: false });
            }
          }}
        >
          OFF
        </Button>
      );
    };

    const renderPoolButton = () => {
      return (
        <Button
          variant={poolOn ? "success" : undefined}
          onClick={() => {
            if (!poolOn) {
              if (!pump) {
                dispatch({ type: "pump", value: true });
              }
              dispatch({ type: "spa", value: false });
            }
          }}
        >
          POOL
        </Button>
      );
    };

    const renderSpaButton = () => {
      return (
        <Button
          variant={spaOn ? "danger" : undefined}
          onClick={() => {
            if (!spaOn) {
              if (!pump) {
                dispatch({ type: "pump", value: true });
              }
              dispatch({ type: "spa", value: true });
            }
          }}
        >
          SPA
        </Button>
      );
    };

    const renderTemp = () => {
      if (poolOn) {
        return (
          <>
            Pool <Temperature value={poolTemp} />
          </>
        );
      } else if (spaOn) {
        return (
          <>
            Spa <Temperature value={spaTemp} />
          </>
        );
      } else {
        return <>All Off</>;
      }
    };

    return (
      <div
        style={{
          display: "flex",
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          {renderOffButton()}
          {renderPoolButton()}
          {renderSpaButton()}
        </ButtonGroup>
        <div
          style={{
            textAlign: "center",
            flex: 0.6,
            fontSize: 14,
          }}
        >
          <div style={{
            margin: 'auto',
            textAlign: "center",
            flex: 0.6,
            fontSize: 18,
          }}>
            {renderTemp()}
          </div>
        </div>
      </div>
    );
  };

  const renderSolar = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={solarOn ? "success" : undefined}
            onClick={() => {
              if (!solarOn) {
                dispatch({ type: "solarHeat", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!solarOn ? "dark" : undefined}
            onClick={() => {
              if (solarOn) {
                dispatch({ type: "solarHeat", value: false });
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div style={{
          margin: 'auto',
          textAlign: "center",
          flex: 0.6,
          fontSize: 18,
        }}>
          Solar <Temperature value={solarTemp} />
        </div>
      </div>
    );
  };

  const renderCleaner = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={cleaner ? "success" : undefined}
            onClick={() => {
              if (!cleaner) {
                dispatch({ type: "cleaner", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!cleaner ? "dark" : undefined}
            onClick={() => {
              if (cleaner) {
                dispatch({ type: "cleaner", value: false });
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div style={{
          margin: 'auto',
          textAlign: "center",
          flex: 0.6,
          fontSize: 18,
        }}>
          Cleaner
        </div>
      </div>
    );
  };

  const renderWaterfall = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={waterfall ? "success" : undefined}
            onClick={() => {
              if (!waterfall) {
                dispatch({ type: "waterfall", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!waterfall ? "dark" : undefined}
            onClick={() => {
              if (waterfall) {
                dispatch({ type: "waterfall", value: false });
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div style={{
          margin: 'auto',
          textAlign: "center",
          flex: 0.6,
          fontSize: 18,
        }}>
          Waterfall
        </div>
      </div>
    );
  };

  const renderPoolLight = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={poolLight ? "success" : undefined}
            onClick={() => {
              if (!poolLight) {
                dispatch({ type: "poolLight", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!poolLight ? "dark" : undefined}
            onClick={() => {
              if (poolLight) {
                dispatch({ type: "poolLight", value: false });
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div style={{
          margin: 'auto',
          textAlign: "center",
          flex: 0.6,
          fontSize: 18,
        }}>
          Pool Light
        </div>
      </div>
    );
  };

  const renderPoolHeater = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
        }}
      >
        <div style={{ flex: 0.6, display: "flex" }}>
          <ButtonGroup style={{ flex: 1 }}>
            <Button
              variant={poolHeat ? "danger" : undefined}
              onClick={() => {
                if (!poolHeat) {
                  if (spaHeat) {
                    dispatch({ type: "spaHeat", value: false });
                  }
                  dispatch({ type: "poolHeat", value: true });
                }
              }}
            >
              On
            </Button>
            <Button
              variant={!poolHeat ? "dark" : undefined}
              onClick={() => {
                if (poolHeat) {
                  dispatch({ type: "poolHeat", value: false });
                }
              }}
            >
              Off
            </Button>
          </ButtonGroup>
        </div>
        <div syle={{ flex: 0.2 }}>
          <NumberField
            name="poolSetpoint"
            value={Locale.ftoc(poolSetpoint, metric)}
            step={metric ? 0.1 : 1}
            onValueChange={newValue => {
              dispatch({
                type: "poolSetpoint",
                value: Locale.ctof(newValue, metric),
              });
            }}
          />
        </div>
        <div style={{
          margin: 'auto',
          textAlign: "center",
          flex: 0.6,
          fontSize: 18,
        }}>
          Pool Heat
        </div>
      </div>
    );
  };

  const renderSpaHeater = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
        }}
      >
        <div style={{ flex: 0.6, display: "flex" }}>
          <ButtonGroup style={{ flex: 1 }}>
            <Button
              variant={spaHeat ? "danger" : undefined}
              onClick={() => {
                if (!spaHeat) {
                  if (!spa) {
                    dispatch({ type: "spa", value: true });
                  }
                  dispatch({ type: "spaHeat", value: true });
                }
              }}
            >
              On
            </Button>
            <Button
              variant={!spaHeat ? "dark" : undefined}
              onClick={() => {
                if (spaHeat) {
                  dispatch({ type: "spaHeat", value: false });
                }
              }}
            >
              Off
            </Button>
          </ButtonGroup>
        </div>
        <div syle={{ flex: 0.2 }}>
          <NumberField
            name="spaSetpoint"
            value={Locale.ftoc(spaSetpoint, metric)}
            step={metric ? 0.1 : 1}
            onValueChange={newValue => {
              dispatch({
                type: "spaSetpoint",
                value: Locale.ctof(newValue, metric),
              });
            }}
          />
        </div>
        <div
          style={{
            margin: 'auto',
            textAlign: "center",
            flex: 0.6,
            fontSize: 18,
          }}
        >
          Spa Heat
        </div>
      </div>
    );
  };

  const renderSpaLight = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={spaLight ? "success" : undefined}
            onClick={() => {
              if (!spaLight) {
                dispatch({ type: "spaLight", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!spaLight ? "dark" : undefined}
            onClick={() => {
              if (spaLight) {
                dispatch({ type: "spaLight", value: false });
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div style={{
          margin: 'auto',
          textAlign: "center",
          flex: 0.6,
          fontSize: 18,
        }}>
          Spa Light
        </div>
      </div>
    );
  };

  const renderJets = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={jets ? "success" : undefined}
            onClick={() => {
              if (!jets) {
                dispatch({ type: "jet", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!jets ? "dark" : undefined}
            onClick={() => {
              if (jets) {
                dispatch({ type: "jet", value: false });
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div style={{
          margin: 'auto',
          textAlign: "center",
          flex: 0.6,
          fontSize: 18,
        }}>
          Jets
        </div>
      </div>
    );
  };

  const renderBlower = () => {
    return (
      <div
        style={{
          display: "flex",
          marginTop: 8,
        }}
      >
        <ButtonGroup style={{ flex: 1 }}>
          <Button
            variant={blower ? "success" : undefined}
            onClick={() => {
              if (!blower) {
                dispatch({ type: "blower", value: true });
              }
            }}
          >
            On
          </Button>
          <Button
            variant={!blower ? "dark" : undefined}
            onClick={() => {
              if (blower) {
                dispatch({ type: "blower", value: false });
              }
            }}
          >
            Off
          </Button>
        </ButtonGroup>
        <div style={{
          margin: 'auto',
          textAlign: "center",
          flex: 0.6,
          fontSize: 18,
        }}>
          Blower
        </div>
      </div>
    );
  };

  const render = () => {
    return (
      <>
        <div style={{ margin: 8 }}>
          {renderWeather()}
          <div style={{ marginLeft: 60, marginTop: 10 }}>
            {renderMainSwitch()}
            {renderSolar()}
            {renderCleaner()}
          </div>
          <Row style={{ marginTop: 10 }}>
            <Col sm={6}>
              {renderSpaHeater()}
              {renderJets()}
              {renderBlower()}
              {renderWaterfall()}
              {renderSpaLight()}
              {renderPoolLight()}
            </Col>
            <Col sm={6}>
              {renderPoolHeater()}
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return render();
};

export default AutelisTab;
