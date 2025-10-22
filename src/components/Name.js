import React, { useEffect, useRef, useState } from "react";
import Main from "../subComponents/main";
import Canvas from "../subComponents/canvas";
import Header from "./Header";
import Inner from "../utility/inner";

function Name() {
  return (
    <div className="w-screen h-screen box-border flex flex-col overflow-hidden">
      <Canvas />
      <Header />
      <Main />
      <Inner />
    </div>
  );
}

export default Name;
