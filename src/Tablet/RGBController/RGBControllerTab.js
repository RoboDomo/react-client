import React from "react";

import { CustomPicker } from "react-color";
import { EditableInput, Hue, Saturation } from "react-color/lib/components/common";
import { Button } from "react-bootstrap";
import { useRGB } from "@/hooks/useHubitat";

const Picker = CustomPicker(({ config, controller, onChange, onChangeComplete }) => {
  const styles = {
    hue: {
      height: 40,
      width: 512,
      position: "relative",
      marginBottom: 10,
    },
    saturation: {
      width: 512,
      height: 512,
      position: "relative",
      marginBottom: 10,
    },
    input: {
      height: 48,
      width: 150,
      fontSize: 24,
      border: `1px solid ${controller.hex}`,
      paddingLeft: 10,
    },
    swatch: {
      marginLeft: 40,
      width: 150,
      height: 80,
      border: "1px solid white",
      backgroundColor: controller.hex,
      marginBottom: 10,
    },
    label: {
      fontSize: 18,
      marginTop: 8,
      float: "left",
      width: 40,
      color: "white",
    },
  };

  const handleChange = (data, e) => {
    if (data["#"]) {
      controller.hex = data.hex;
    }
    if (data.r !== undefined && data.g !== undefined && data.b !== undefined) {
      controller.rgb = {
        r: data.r || controller.rgb.r,
        g: data.g || controller.rgb.g,
        b: data.b || controller.rgb.b,
        source: "rgb",
      };
    }
    if (data.h !== undefined && data.s !== undefined && data.v !== undefined) {
      controller.hsv = {
        h: data.h || controller.hsv.h,
        s: data.s || controller.hsv.s,
        v: data.v || controller.hsv.v,
        source: "hsv",
      };
    }
    if (data.h !== undefined && data.s !== undefined && data.l !== undefined) {
      controller.hsl = {
        h: data.h || controller.hsl.h,
        s: data.s || controller.hsl.s,
        l: data.l || controller.hsl.l,
        source: "hsl",
      };
    }
    onChange(data, e);
  };

  return (
    <>
      <div style={{ width: 1024, color: "rgba(0,0,0,.0)" }}>
        <div style={{ float: "left", paddingLeft: 100 }}>
          <div style={styles.hue}>
            <Hue hsv={controller.hsv} hsl={controller.hsl} onChange={handleChange} />
          </div>
          <div style={styles.saturation}>
            <Saturation hsv={controller.hsv} hsl={controller.hsl} onChange={handleChange} />
          </div>
        </div>
        <div style={{ float: "right" }}>
          <div>
            <div style={styles.swatch} />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>#</div>
            <EditableInput
              label={"#"}
              style={{ input: styles.input, disabled: true }}
              value={controller.hex.replace("#", "")}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>LVL</div>
            <EditableInput
              label={"level"}
              style={{ input: styles.input, disabled: true }}
              value={Math.round(controller.level)}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, marginTop: 10, whiteSpace: "nowrap" }}>
            <div style={styles.label}>H</div>
            <EditableInput
              label={"h"}
              style={{ input: styles.input }}
              value={Math.round(controller.hsv.h)}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>S</div>
            <EditableInput
              label={"s"}
              style={{ input: styles.input }}
              value={Math.round(controller.hsv.s) * 100}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>V</div>
            <EditableInput
              label={"v"}
              style={{ input: styles.input }}
              value={Math.round(controller.hsv.v * 100)}
              onChange={handleChange}
            />
          </div>

          <div style={{ width: 300, marginTop: 10, whiteSpace: "nowrap" }}>
            <div style={styles.label}>R</div>
            <EditableInput
              label={"r"}
              style={{ input: styles.input }}
              value={controller.rgb.r}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>G</div>
            <EditableInput
              label={"g"}
              style={{ input: styles.input }}
              value={controller.rgb.g}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>B</div>
            <EditableInput
              label={"b"}
              style={{ input: styles.input }}
              value={controller.rgb.b}
              onChange={handleChange}
            />
          </div>

          <div style={{ width: 300, marginTop: 20, whiteSpace: "nowrap" }}>
            <div style={{ fontSize: 18, marginTop: 8, float: "left", width: 40 }}> </div>
            <Button
              onClick={() => {
                if (controller.switch) {
                  controller.switch = controller.switch === "on" ? "off" : "on";
                }
              }}
              style={{ width: 150 }}
              size="lg"
            >
              {`Power ${controller.switch === "on" ? "OFF" : "ON"}`}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});

const RGBControllerTab = ({ config }) => {
  const controller = useRGB(config.name, localStorage.getItem("rgb-" + config.label) || "ff00ff");

  return (
    <div style={{ padding: 10 }}>
      <Picker
        config={config}
        controller={controller}
        onChange={v => {
          console.log("change v", v.hex);
          controller.hex = v.hex;
          localStorage.setItem("rgb-" + config.label, v.hex);
        }}
        onChangeComplete={v => {
          return;
          //          console.log("changeComplete v", v);
        }}
      />
    </div>
  );
  // <PhotoshopPicker style={{ width: "100%", height: "100%" }} />
};

//
export default RGBControllerTab;
