/*
 _____     _     _      _    
|_   _|_ _| |__ | | ___| |_  
  | |/ _` | '_ \| |/ _ \ __| 
  | | (_| | |_) | |  __/ |_  
  |_|\__,_|_.__/|_|\___|\__| 

 _____ _                _                 __  _____ ___     __     
|_   _| |__   ___  __ _| |_ ___ _ __     / / |_   _(_) \   / /__   
  | | | '_ \ / _ \/ _` | __/ _ \ '__|   / /    | | | |\ \ / / _ \  
  | | | | | |  __/ (_| | ||  __/ |     / /     | | | | \ V / (_) | 
  |_| |_| |_|\___|\__,_|\__\___|_|    /_/      |_| |_|  \_/ \___/  
                                                                   
*/

import React from "react";
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
      <Image style={{ width: 64, height: "auto" }} src={info.logo.URL} />
      <div style={{ marginBottom: 8 }}>
        {tivo.channel} {info.name}
      </div>
    </>
  );
};

//
export default TiVo;
