import { useEffect, useRef, useState } from "react";
import {BallPool} from "../subComponents/matter"
import CustomCursor from "../subComponents/projectCursor";

function Skills(){
  const conatiner = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
useEffect(() => {
  const handleResize = () => {
    const { width, height } = conatiner.current.getBoundingClientRect();
    setDimensions({ width, height });
  };

  handleResize(); // Get initial dimensions

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, [])
  return (
    <div className="h-screen w-screen bg-[#111212]  flex flex-col py-5 px-10 gap-5">
      {/* <div className="text-white border text-3xl">
        Skills and recent tool used
      </div>
      <div className="text-white">any thing</div> */}
      <div
        className="border absolute h-[90%] w-[95%] box-border flex-grow mb-6 rounded-3xl overflow-hidden z-20"
        id="ballpool"
        ref={conatiner}
      >
        <BallPool dimensions={dimensions} />
      </div>
      
    </div>
  );
}

export default Skills