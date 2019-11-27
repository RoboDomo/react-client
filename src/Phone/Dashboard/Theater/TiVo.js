import React, { useState, useEffect } from "react";
import useConfig from "@/hooks/useConfig";

import { Image } from "react-bootstrap";

import useTiVo from "@/hooks/useTiVo";

const TiVo = ({ device }) => {
  const tivo = useTiVo(device);
  const tvguide = tivo.guide;

  const info = tvguide.channels[tivo.channel];
  if (!info) {
    return null;
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Image style={{ width: 32, height: "auto" }} src={info.logo.URL} />{" "}
        <div style={{ marginBottom: 4 }}>
          {channel} {info.name}
        </div>
      </div>
    </>
  );
};

//
export default TiVo;
