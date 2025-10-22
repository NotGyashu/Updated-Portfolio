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
    <div className="h-screen overflow-hidden cursor-none no-scrollbar w-full text-white box-border flex flex-col relative">
      <Inner />
      <div
        className="z-30 absolute border border-white bottom-3 left-[50%] translate-x-[-50%] lg:px-2 lg:py-1 px-3 rounded-full"
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
      {showCursor && (
        <CustomCursor
          hover1={hover1}
          hover3={hover3}
        />
      )}
      <div className="text-lg md:text-xl lg:text-3xl px-2 py-1 md:px-4 lg:px-7 lg:py-1 Panchang-font font-light flex-shrink-0">
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
      <div className="hidden md:block flex-shrink-0">
        <ScrollTracker ref={scrollRef} />
      </div>
      <div
        className="flex flex-grow overflow-y-hidden md:mb-2 md:mx-4 lg:mx-7 lg:mb-7 gap-12 lg:gap-28 md:gap-16 justify-between overflow-x-scroll no-scrollbar min-h-0"
        id="parent"
        ref={scrollRef}
        style={{
          scrollSnapType: "x mandatory",
        }}
      >
        {projects.map((p, index) => (
          <div
            key={index}
            className="flex w-full min-w-full border gap-2 flex-shrink-0 relative lg:flex-row flex-col h-full"
          >
            <div className="lg:w-2/5 w-full lg:h-full h-[48%] flex lg:p-16 md:p-10 p-4">
              <ProjectImg project={p} />
            </div>
            <div className="lg:w-3/5 w-full lg:h-full h-[52%] p-3 md:p-6 lg:p-16 gap-2 md:gap-4 lg:gap-7 flex rounded-lg flex-col overflow-hidden">
              <div
                className="text-[clamp(1.5rem,4vw,3.5rem)] Panchang-font flex-shrink-0"
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
                className="cabinet-font font-light text-[clamp(0.9rem,2vw,2rem)] flex-shrink-0"
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
                className="cabinet-font text-[clamp(0.75rem,1.5vw,1.25rem)] overflow-y-auto flex-1 min-h-0 no-scrollbar"
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
