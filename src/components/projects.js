import React, { useRef, useEffect, useState } from "react";
import CustomCursor from "../subComponents/projectCursor";
import { projects } from "../info";
import MainNavbar from "../subComponents/mainNavbar";
import Inner from "../utility/inner";
import ScrollTracker from "../subComponents/scrolltracker";
import ProjectImg from "../subComponents/projectimg";

function Projects() {
  const [hover1, setHover1] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      const container = scrollRef.current;
      if (container) {
        container.scrollLeft += event.deltaY;
      }
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
    <div className="h-screen overflow-hidden cursor-none no-scrollbar text-white flex flex-col relative" style={{ height: '100dvh', height: '100vh' }}>
      <Inner />
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
      {showCursor && (
        <CustomCursor
          hover1={hover1}
          hover3={hover3}
        />
      )}
      
      {/* Header - Fixed height */}
      <div className="text-base md:text-xl lg:text-3xl px-2 py-1 md:px-4 lg:px-7 Panchang-font font-light flex-shrink-0 h-[40px] md:h-[50px] lg:h-[60px] flex items-center">
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

      {/* ScrollTracker - Fixed height */}
      <div className="flex-shrink-0  h-[20px] md:h-[30px]">
        <ScrollTracker ref={scrollRef} />
      </div>
      {/* Main content area - Takes remaining space */}
      <div className="flex md:gap-5 h-full gap-26 flex-col  p-2">
      <div
        className="flex  lg:mx-7   gap-12 lg:gap-28 md:gap-16 justify-between overflow-x-scroll no-scrollbar"
        id="parent"
        ref={scrollRef}
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {projects.map((p, index) => (
          <div
            key={index}
            className="flex border  w-full min-w-full gap-2 flex-shrink-0 relative lg:flex-row flex-col h-full"
          >
            {/* Image section */}
            <div className="lg:w-2/5 w-full lg:h-full overflow-hidden h-[45%] flex lg:p-12 md:p-8 p-3">
              <ProjectImg project={p} />
            </div>

            {/* Text section */}
            <div className="lg:w-3/5 w-full lg:h-full h-[55%] p-3 md:p-6 lg:p-12 gap-2 md:gap-3 lg:gap-6 flex rounded-lg flex-col overflow-hidden">
              <div
                className="text-[clamp(1.3rem,3.5vw,3.5rem)] Panchang-font flex-shrink-0 leading-tight"
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
                className="cabinet-font font-light text-[clamp(0.8rem,1.8vw,1.8rem)] flex-shrink-0 leading-tight"
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
                className="cabinet-font text-[clamp(0.7rem,1.2vw,1.2rem)] overflow-y-auto flex-1 min-h-0 no-scrollbar leading-snug"
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
      
        {/* Navbar - centered and self-sized */}
        <div className="flex justify-center items-center flex-shrink-0 pb-2">
          <div
            className="border border-white lg:px-2 lg:py-1 px-3 py-1 rounded-full w-fit"
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
        </div>
      </div>
    </div>
  );
}

export default Projects;
