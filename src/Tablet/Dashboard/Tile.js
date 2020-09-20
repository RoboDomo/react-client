import React, { useState } from "react";

const Tile = ({
  readOnly, // cannot be pressed if true
  backgroundColor, // background color of entire tile
  color, // text color of rendering on tile
  width, // width, in tiles (e.g. 1, 2)
  height, // height, in tiles (e.g. 1, 2)
  onClick, // if string, location.hash, if funciton, it is called
  children,
}) => {
  const [pressed, setPressed] = useState(false);
  let timer = null;

  const handleClick = () => {
    if (readOnly || timer) {
      return;
    }
    timer = setTimeout(() => {
      timer = null;
      setPressed(false);
      if (typeof onClick === "string") {
        window.location.hash = onClick;
      } else if (typeof onClick === "function") {
        onClick();
      }
    }, 500);
    setPressed(true);
  };

  return (
    <div
      style={{
        borderRadius: 8,
        backgroundColor: backgroundColor,
        color: color,
        width: width * 128 - 4,
        height: height * 128 - 4,
        margin: 2,
        border: pressed ? "4px inset white" : "4px outset white",
        gridColumnEnd: "span " + width,
        gridRowEnd: "span " + height,
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
export default Tile;
