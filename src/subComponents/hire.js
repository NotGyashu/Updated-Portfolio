import { useState } from "react";

function Hire({ setVisible, visible }) {
   const handleTouchStart = () => {
     setVisible(!visible);
   };
  return (
    <div className="">
      <div
        className="border-black border flex items-center justify-center sentient-font lg:p-4 p-2 m-1 cursor-pointer   rounded-full "
        onMouseEnter={() => {
          setVisible(!visible);
        }}
        onTouchStart={handleTouchStart}
      >
        <img src="\paper-plane.png" className="lg:h-8 lg:w-8 lg:m-2 h-4 w-4" />
      </div>
    </div>
  );
}

export default Hire;
