import { useEffect, useRef, useState } from "react";
import { BallPool } from "../subComponents/matter";
import CustomCursor from "../subComponents/projectCursor";
import Header from "./Header";
import MainNavbar from "../subComponents/mainNavbar";
import StarCanvas from "../subComponents/skillCanvas";
import ShootingStar from "../subComponents/skillCanvas";
import Inner from "../utility/inner";

function Skills() {
  const container = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
   
  useEffect(() => {
    const handleResize = () => {
      const { width, height } = container.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    handleResize(); // Get initial dimensions

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
const radius = dimensions.width / 20;
  return (
    <div
      className="h-screen w-screen lg:p-3 p-1 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at bottom, #04050D 0%, #05010d 100%)",
      }}


    >
      <div className=" absolute border z-30 border-gray-300   bg-white left-[40%] top-[12%] px-2 py-1  rounded-full">
        <MainNavbar />
      </div>

      <Inner />

      <div className="text-white Panchang-font lg:text-4xl text-2xl px-7">
        Skills & recent tools
      </div>
      <div className="flex lg:py-5 py-2 lg:px-10 px-4 flex-col items-center w-full h-full relative">
        <div
          className="absolute inset-0 flex  justify-center top-[30%]"
          id="center"
        >
          <div className="text-white lg:text-2xl text-xl cabinet-font">
            CLICK & DRAG
          </div>
        </div>

        <div
          className="border absolute h-[85%] w-full  box-border flex-grow mb-6 rounded-3xl "
          id="ballpool"
          ref={container}
        >
          <BallPool dimensions={dimensions}  />
        </div>
      </div>
    </div>
  );
}

export default Skills;
