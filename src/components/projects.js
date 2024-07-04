import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomCursor from "../subComponents/projectCursor";
import { projects } from "../info";
import Header from "./Header";
import MainNavbar from "../subComponents/mainNavbar";
import Inner from "../utility/inner";
import ScrollTracker from "../subComponents/scrolltracker";

function Projects() {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      const container = scrollRef.current;
      if (container) {
        container.scrollLeft += event.deltaY;
      }
      // event.preventDefault();
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("wheel", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden  no-scrollbar w-full text-white box-border flex flex-col lg:gap-3 md:gap-2 sm:gap-1 relative">
      <Inner />
      <div
        className="z-30   absolute border border-white bottom-3 left-[50%] translate-x-[-50%] lg:px-2 lg:py-1 px-3 rounded-full"
        id="nav"
        onMouseEnter={() => {
          setShowCursor(false);
        }}
        onMouseLeave={() => {
          setShowCursor(true);
        }}
      >
        <MainNavbar />
      </div>
      <div className="water absolute z-[-5]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#212529"
            d="M41.4,-48.4C49.8,-42.3,50.1,-25.6,50.8,-10.6C51.4,4.3,52.4,17.6,47.2,27.9C42,38.2,30.6,45.6,19.4,47C8.1,48.4,-3.1,43.7,-19.2,42.4C-35.4,41,-56.5,42.9,-64.9,34.5C-73.2,26.1,-68.8,7.4,-64,-9.9C-59.3,-27.2,-54.4,-43,-43.6,-48.7C-32.9,-54.3,-16.5,-49.8,0,-49.8C16.5,-49.8,33,-54.4,41.4,-48.4Z"
            transform="translate(100 100)"
            rotate={360}
          />
        </svg>
      </div>
      <div className="absolute w-[200vw] h-[200vh] bg-black z-[-10]"></div>
      {setShowCursor && (
        <CustomCursor
          hover1={hover1}
          hover2={hover2}
          hover3={hover3}
          hover4={hover4}
        />
      )}
      <div className="text-xl md:text-2xl lg:text-3xl px-1 md:px-4 lg:px-7 lg:py-2 py-1  Panchang-font font-light">
        <span
          onMouseEnter={() => {
            setHover3(true);
          }}
          onMouseLeave={() => {
            setHover3(false);
          }}
        >
          Featured Works
        </span>
      </div>
      <ScrollTracker ref={scrollRef} />
      <div
        className="flex w-full   flex-grow m-1 md:m-4 lg:m-7  gap-12 lg:gap-28 md:gap-16 justify-between overflow-x-scroll  no-scrollbar"
        id="parent"
        ref={scrollRef}
        style={{
          scrollSnapType: "y mandatory", // Ensure snapping behavior
        }}
      >
        <div className="absolute text-xs md:text-sm top-[50%] translate-y-[-50%] left-[-14vh] rotate-90  Panchang-font     flex  gap-6 items-center  ">
          <div className="w-[1px] h-[6vh]  bg-white rounded-full rotate-90 "></div>
          <span className="lg:text-sm md:text-[10px]"> SCROLLDOWN</span>
          <div className="w-[1px] h-[7vh] ml-1  bg-white rounded-full rotate-90 "></div>
        </div>
        {projects.map((p, index) => (
          <div
            key={index}
            className="flex w-full border flex-grow-0 flex-shrink-0 relative md:flex-row flex-col"
            // style={{
            //   scrollSnapAlign: "start",
            //   flex: "0 0 auto", // Ensure fixed width for children
            //   width: "100%", // Full width of container
            //   height: "100%", // Full height of viewport
            //   scrollSnapStop: "always", // Optional: Ensures consistent snapping behavior
            // }}
          >
            <div className="md:w-2/5  w-full h-2/5 flex md:h-full lg:p-16 md:p-10 p-6 overflow-hidden">
              <motion.div
                className={`h-4/5 w-full  rounded-md flex-grow relative`}
                initial={{
                  rotateX: 35,
                  rotateY: 4,
                  rotateZ: -30,
                  opacity: 0.8,
                  //transition: { duration: 0.5, ease: "easeInOut" },
                }}
                animate={
                  // hover2
                  //   ? {
                  //       rotateX: 0,
                  //       rotateY: 0,
                  //       rotateZ: 0,
                  //       opacity: 1,
                  //       position: "absolute",
                  //       cursor: "pointer",
                  //       transition: {
                  //         duration: 0.5,
                  //         ease: "easeIn",
                  //       },
                  //     }
                  //   : {
                  {
                    rotateX: 35,
                    rotateY: 4,
                    rotateZ: -30,
                    opacity: 0.8,
                    // transition: { duration: 0.5, ease: "easeInOut" },
                    //</div>}
                  }
                }
                // onMouseEnter={() => {
                //   setHover2(true);
                // }}
                // onMouseLeave={() => {
                //   setHover2(false);
                // }}
              >
                <div className="overflow-hidden rounded-md aspect-w-4 aspect-h-5">
                  <img
                    src={p.src}
                    className="object-cover w-full h-full"
                    alt=""
                  />
                </div>
              </motion.div>
            </div>
            <div className="md:w-3/5  w-full  h-3/5 md:h-full md:p-4 p-1 lg:p-16 md:gap-2 gap-1 lg:gap-7 flex rounded-lg flex-col">
              <div
                className="lg:text-6xl  md:text-3xl sm:text-2xl text-xl Panchang-font"
                onMouseEnter={() => {
                  setHover1(true);
                }}
                onMouseLeave={() => {
                  setHover1(false);
                }}
              >
                {p.name}
              </div>

              <div
                className="cabinet-font font-light text-xs md:text-lg lg:text-xl"
                onMouseEnter={() => {
                  setHover1(true);
                }}
                onMouseLeave={() => {
                  setHover1(false);
                }}
              >
                {p.Timeline}
              </div>
              <div
                className="cabinet-font md:text-lg lg:text-xl text-ri"
                onMouseEnter={() => {
                  setHover1(true);
                }}
                onMouseLeave={() => {
                  setHover1(false);
                }}
              >
                {p.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
