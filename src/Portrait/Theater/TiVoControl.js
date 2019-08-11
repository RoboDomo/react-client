import React, { useReducer } from "react";

import { ListGroup, Nav, Navbar, Row, ButtonGroup, Button } from "react-bootstrap";
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaThumbsUp,
  FaThumbsDown,
  FaBackward,
  FaFastBackward,
  FaPause,
  FaPlay,
  FaStepForward,
  FaForward,
  FaFastForward,
  FaDotCircle,
} from "react-icons/fa";
import RemoteButton from "@/common/RemoteButton";

import useTiVo from "@/hooks/useTiVo";
import tivoReducer from "@/hooks/reducers/tivoReducer";
import AudioControl from "./AudioControl";

const style = {
  row: {
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const TiVoControl = ({ config, avr }) => {
  const tivo = useTiVo(config),
    [, dispatch] = useReducer(tivoReducer, { device: config.device });

  const g = tivo.guide.channels[tivo.channel];
  if (!g) {
    return null;
  }

  const renderFavorites = () => {
    const favorites = tivo.favorites;
    return (
      <>
        <h5 style={{ marginBottom: 0 }}>Favorites</h5>
        <div style={{ height: 9 * 38, overflowY: "auto" }}>
          <ListGroup style={{ textAlign: "left" }}>
            {favorites.map(favorite => {
              const channel = tivo.guide.channels[favorite.channel];
              return (
                <ListGroup.Item
                  key={"favorite-" + favorite.channel}
                  style={{ fontSize: 20, display: "flex" }}
                  action
                  onClick={() => {
                    dispatch({ type: "favorite-0" + favorite.channel });
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <img
                      style={{ maxWidth: 40 }}
                      src={channel.stationLogo[0].URL}
                      alt={channel.name}
                    />
                  </div>
                  <div style={{ flex: 1 }}>{channel.callsign}</div>
                  <div style={{ flex: 1, textAlign: "right" }}>{favorite.channel}</div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </>
    );
  };

  const renderTransport = () => {
    const playButton = (
        <RemoteButton dispatch={dispatch} action="play" mini="fill">
          <FaPlay />
        </RemoteButton>
      ),
      pauseButton = (
        <RemoteButton dispatch={dispatch} action="pause" mini="fill">
          <FaPause />
        </RemoteButton>
      );

    return (
      <>
        <Navbar fixed="bottom" style={{ marginBottom: 8 }}>
          <Nav variant="pills" fill={true} style={{ width: "100%" }}>
            <Nav.Item>
              <RemoteButton dispatch={dispatch} action="replay" mini="fill">
                <FaFastBackward />
              </RemoteButton>
            </Nav.Item>
            <Nav.Item>
              <RemoteButton dispatch={dispatch} action="reverse" mini="fill">
                <FaBackward />
              </RemoteButton>
            </Nav.Item>
            <Nav.Item>
              <RemoteButton dispatch={dispatch} action="pause" mini="fill">
                <FaPause />
              </RemoteButton>
            </Nav.Item>
            <Nav.Item>
              <RemoteButton dispatch={dispatch} action="play" mini="fill">
                <FaPlay />
              </RemoteButton>
            </Nav.Item>
            <Nav.Item>
              <RemoteButton dispatch={dispatch} action="slow" mini="fill">
                <FaStepForward />
              </RemoteButton>
            </Nav.Item>
            <Nav.Item>
              <RemoteButton dispatch={dispatch} action="forward" mini="fill">
                <FaForward />
              </RemoteButton>
            </Nav.Item>
            <Nav.Item>
              <RemoteButton dispatch={dispatch} action="advance" mini="fill">
                <FaFastForward />
              </RemoteButton>
            </Nav.Item>
            <Nav.Item>
              <RemoteButton dispatch={dispatch} action="record" mini="fill" variant="danger">
                <FaDotCircle />
              </RemoteButton>
            </Nav.Item>
          </Nav>
        </Navbar>
      </>
    );
  };

  return (
    <>
      <h4 style={{ whiteSpace: "nowrap" }}>
        Channel: {tivo.channel} {g.callsign}{" "}
        <img style={{ width: 30, height: 30 }} src={g.logo.URL} alt={g.name} />
      </h4>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="livetv">
            Live TV
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="tivo" variant="primary">
            TiVo
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="guide">
            Guide
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="info">
            Info
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="thumbsup" variant="success">
            <FaThumbsUp />
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="back">
            Back
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="thumbsdown" variant="danger">
            <FaThumbsDown />
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton variant="none" />
          <RemoteButton dispatch={dispatch} action="up">
            <FaChevronUp />
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="channelup" variant="info">
            +
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="left">
            <FaChevronLeft />
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="select" variant="primary">
            Select
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="right">
            <FaChevronRight />
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="clear">
            Clear
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="down">
            <FaChevronDown />
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="channeldown" variant="info">
            -
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="a" variant="warning">
            A
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="b" variant="primary">
            B
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="c" variant="danger">
            C
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="d" variant="success">
            D
          </RemoteButton>
        </ButtonGroup>
      </Row>
      <Row style={style.row}>
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="num1">
            1
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="num2">
            2
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="num3">
            3
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="num4">
            4
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="num5">
            5
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="num6">
            6
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="num7">
            7
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="num8">
            8
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="num9">
            9
          </RemoteButton>
        </ButtonGroup>
        <br />
        <ButtonGroup>
          <RemoteButton dispatch={dispatch} action="clear">
            .
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="num0">
            0
          </RemoteButton>
          <RemoteButton dispatch={dispatch} action="enter">
            Enter
          </RemoteButton>
        </ButtonGroup>
      </Row>
      {renderTransport()}
      <div style={{ marginTop: 10 }}>{renderFavorites()}</div>
    </>
  );
};

//
export default TiVoControl;
