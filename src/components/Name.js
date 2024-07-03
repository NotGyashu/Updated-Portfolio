import React, { useEffect, useRef, useState } from "react";

import Main from "../subComponents/main";
import Hire from "../subComponents/hire";
import Canvas from "../subComponents/canvas";
import Header from "./Header";
import Inner from "../utility/inner";

function Name() {
  return (
    <div className=" w-[100vw]  box-border min-h-screen flex flex-col ">
  
        {/* <Canvas /> */}
        <Header />
        <Main />
        {/* <Inner/> */}
     
    </div>
  );
}

export default Name;
