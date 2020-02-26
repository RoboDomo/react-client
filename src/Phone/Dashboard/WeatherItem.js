import React from "react";
import useConfig from "@/hooks/useConfig";
import useWeather from "@/hooks/useWeather";
import Temperature from "@/common/Temperature";
import Speed from "@/common/Speed";
import { FaFlag } from "react-icons/fa";

import { ListGroup } from "react-bootstrap";

const WeatherItem = () => {
  const Config = useConfig();
  const metric = Config.metric;
  const location = (() => {
    for (const location of Config.weather.locations) {
      if (location.default) {
        return location;
      }
    }
    return Config.weather.locations[0];
  })();

  const weather = useWeather(location.device),
    { now } = weather;

  if (!now.icon) {
    return <ListGroup.Item>{"Weather"}</ListGroup.Item>;
  }

  return (
    <ListGroup.Item>
      <div style={{ textAlign: "center" }}>{now.city}</div>
      <div style={{ fontSize: 18, whiteSpace: "nowrap" }}>
        <img
          alt={now.iconName}
          style={{
            verticalAlign: "middle",
            width: 32,
            height: 32,
          }}
          src={now.iconLink}
        />
        {now.conditions} {now.temperature}&deg;F{" "}
        <span className="float-right" style={{ whiteSpace: "nowrap" }}>
          {now.current_wind} MPH {now.windDescShort} <Speed value={now.windSpeed} />
        </span>
      </div>
    </ListGroup.Item>
  );
};

//
if (false) {
  const WeatherItem = tile => {
    const Config = useConfig();
    const [displayCity, setDisplayCity] = useState("");
    const [now, setNow] = useState({});

    useEffect(() => {
      const onStateChange = (topic, newValue) => {
        if (~topic.indexOf("now")) {
          setNow(newValue);
        } else if (~topic.indexOf("display_city")) {
          setDisplayCity(newValue);
        } else {
          console.log("invalid topic/value", topic, newValue);
        }
      };
      const status_topic = Config.mqtt.weather + "/" + tile.location + "/status/";
      MQTT.subscribe(status_topic + "now", onStateChange);
      MQTT.subscribe(status_topic + "display_city", onStateChange);
      return () => {
        MQTT.unsubscribe(status_topic + "now", onStateChange);
        MQTT.unsubscribe(status_topic + "display_city", onStateChange);
      };
    }, [Config.mqtt.weather, tile.location]);
    return (
      <ListGroup.Item>
        <div style={{ textAlign: "center" }}>{displayCity}</div>
        <div style={{ fontSize: 18, whiteSpace: "nowrap" }}>
          <img
            alt={now.icon}
            style={{
              verticalAlign: "middle",
              width: 32,
              height: 32,
            }}
            src={"/img/Weather/icons/black/" + now.icon + ".svg"}
          />
          {now.conditions} {now.current_temperature}&deg;F{" "}
          <span className="float-right" style={{ whiteSpace: "nowrap" }}>
            {now.current_wind} MPH {now.wind_direction}
          </span>
        </div>
      </ListGroup.Item>
    );
  };
}

export default WeatherItem;
