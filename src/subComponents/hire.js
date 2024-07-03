import { useState } from "react";

function Hire({ setVisible, visible }) {
  return (
    <div className="">
      <div
        className="border-black border flex items-center justify-center sentient-font md:p-4 p-2 m-1 cursor-pointer   rounded-full "
        onMouseEnter={() => {
          setVisible(!visible);
        }}
       >
        <img src="\paper-plane.png" className="h-6  w-6 " />
      </div>
    </div>
  );
}

export default Hire;
