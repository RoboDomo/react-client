import React, { useRef } from "react";

import { CustomPicker } from "react-color";
import { EditableInput, Hue, Saturation } from "react-color/lib/components/common";
import { Button } from "react-bootstrap";
import { useRGB } from "@/hooks/useHubitat";
import ReactBootstrapSlider from "react-bootstrap-slider";

const Picker = CustomPicker(({ config, form, power, onChange, onChangeComplete, update }) => {
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
      border: `1px solid ${form.hex}`,
      paddingLeft: 10,
    },
    swatch: {
      marginLeft: 40,
      width: 150,
      height: 80,
      border: "1px solid white",
      backgroundColor: form.hex,
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
//    console.log("handleChange", data);
    //    if (!data) {
    //      return;
    //    }

        form.changed = true;
        if (data.level) {
          form.level = data.level;
        }
    //    if (data.h) {
    //      form.hsv.h = data.h;
    //    }
    //    if (data.s) {
    //      form.hsv.s = data.s;
    //    }
    //    if (data.v) {
    //      form.hsv.v = data.v;
    //    }
    //    if (data.r) {
    //      form.rgb.r = data.r;
    //    }
    //    if (data.g) {
    //      form.rgb.g = data.g;
    //    }
    //    if (data.b) {
    //      form.rgb.b = data.b;
    //    }
    //    if (data["#"]) {
    //      form.hex = data.hex;
    //    }
    //    if (data.r !== undefined && data.g !== undefined && data.b !== undefined) {
    //      form.rgb = {
    //        r: data.r,
    //        g: data.g,
    //        b: data.b,
    //        source: "rgb",
    //      };
    //    }
    //    if (data.h !== undefined && data.s !== undefined && data.v !== undefined) {
    //      form.hsv = {
    //        h: data.h,
    //        s: data.s,
    //        v: data.v,
    //        source: "hsv",
    //      };
    //    }
    //    if (data.h !== undefined && data.s !== undefined && data.l !== undefined) {
    //      form.hsl = {
    //        h: data.h,
    //        s: data.s,
    //        l: data.l,
    //        source: "hsl",
    //      };
    //    }
    onChange(data, e);
  };

  power = power === "on" ? "OFF" : "ON";
  return (
    <>
      <div style={{ width: 1024, color: "rgba(0,0,0,.0)" }}>
        <div style={{ float: "left", paddingLeft: 100 }}>
          <div style={styles.hue}>
            <Hue hsv={form.hsv} hsl={form.hsl} onChange={handleChange} />
          </div>
          <div style={styles.saturation}>
            <Saturation hex={form.hex} hsv={form.hsv} hsl={form.hsl} onChange={handleChange} />
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
              value={form.hex.replace("#", "")}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>LVL</div>
            <EditableInput
              label={"level"}
              style={{ input: styles.input, disabled: true }}
              value={Math.round(form.level)}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, marginTop: 10, whiteSpace: "nowrap" }}>
            <div style={styles.label}>H</div>
            <EditableInput
              label={"h"}
              style={{ input: styles.input }}
              value={Math.round(form.hsv.h)}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>S</div>
            <EditableInput
              label={"s"}
              style={{ input: styles.input }}
              value={Math.round(form.hsv.s) * 100}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>V</div>
            <EditableInput
              label={"v"}
              style={{ input: styles.input }}
              value={Math.round(form.hsv.v * 100)}
              onChange={handleChange}
            />
          </div>

          <div style={{ width: 300, marginTop: 10, whiteSpace: "nowrap" }}>
            <div style={styles.label}>R</div>
            <EditableInput
              label={"r"}
              style={{ input: styles.input }}
              value={form.rgb.r}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>G</div>
            <EditableInput
              label={"g"}
              style={{ input: styles.input }}
              value={form.rgb.g}
              onChange={handleChange}
            />
          </div>
          <div style={{ width: 300, whiteSpace: "nowrap" }}>
            <div style={styles.label}>B</div>
            <EditableInput
              label={"b"}
              style={{ input: styles.input }}
              value={form.rgb.b}
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
              Power {power}
            </Button>
          </div>
          <div style={{ width: 300, marginTop: 4, whiteSpace: "nowrap" }}>
            <div style={{ fontSize: 18, marginTop: 8, float: "left", width: 40 }}> </div>
            <Button
              onClick={() => {
                update();
                //                console.log("UPDATE ", form.current);
              }}
              style={{ width: 150 }}
              size="lg"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});

const RGBControllerTab = ({ config }) => {
  let stored = localStorage.getItem("rgb-" + config.label);
  if (!stored) {
    stored = {
      level: 99,
      hex: "ff00ff",
    };
  }

  const controller = useRGB(config.name, stored.level, stored.hex);
  const formRef = useRef(null);

  let f = formRef.current;
  if (f === null || f.changed === false) {
    if (f === null) {
      f = {};
    }
    f.changed = false;
    f.hsv = controller.hsv || {};
    f.hsl = controller.hsl || {};
    f.rgb = controller.rgb || {};
    f.level = controller.level;
    f.hex = controller.hex || "ff00ff";
  }

  return (
    <div style={{ padding: 10 }}>
      <Picker
        power={controller.switch}
        config={config}
        controller={controller}
        form={f}
        update={() => {
          console.log("update", f);
          controller.level = f.level;
          controller.hex = f.hex;
          controller.r = f.rgb.r;
          controller.g = f.rgb.g;
          controller.b = f.rgb.b;
        }}
        onChange={v => {
          //          this.hex = v;
          console.log("change v", v);
          if (v.hex) {
            f.hex = v.hex;
            f.changed = true;
          }
          if (v.rgb) {
            f.rgb = v.rgb;
            f.changed = true;
          }
          if (v.hsl) {
            f.hsl = v.hsl;
            f.changed = true;
          }
          if (v.hsv) {
            f.hsv = v.hsv;
            f.changed = true;
          }
          //          controller.hex = v.hex;
          localStorage.setItem("rgb-" + config.label, JSON.stringify(formRef.current));
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
