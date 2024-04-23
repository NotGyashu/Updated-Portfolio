import React, { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import CustomCursor from "../subComponents/projectCursor";
import { projects } from "../info";

function Projects() {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const [hover4, setHover4] = useState(false);
  const [show,setShow] = useState(false);
  return (
    <div className="min-h-screen cursor-none   overflow-hidden  no-scrollbar w-full  text-white  box-border flex flex-col gap-3 relative ">
      <div className=" water  absolute z-[-5]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#212529"
            d="M41.4,-48.4C49.8,-42.3,50.1,-25.6,50.8,-10.6C51.4,4.3,52.4,17.6,47.2,27.9C42,38.2,30.6,45.6,19.4,47C8.1,48.4,-3.1,43.7,-19.2,42.4C-35.4,41,-56.5,42.9,-64.9,34.5C-73.2,26.1,-68.8,7.4,-64,-9.9C-59.3,-27.2,-54.4,-43,-43.6,-48.7C-32.9,-54.3,-16.5,-49.8,0,-49.8C16.5,-49.8,33,-54.4,41.4,-48.4Z"
            transform="translate(100 100)"
            rotate={360}
          />
        </svg>
      </div>
      <div className=" absolute w-[200vw] h-[200vh] bg-black z-[-10]"></div>
      <CustomCursor
        hover1={hover1}
        hover2={hover2}
        hover3={hover3}
        hover4={hover4}
      />
      <div className="text-3xl  p-7   Panchang-font font-light">
        <span
          className=""
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
      <div className="border  mx-7"></div>
      <div
        className="flex  w-full flex-grow   m-7 py-7 gap-28 justify-between overflow-x-scroll no-scrollbar"
        id="parent"
      >
        {projects.map((p, index) => (
          <div
            key={index}
            className={`flex-none  flex w-full flex-grow-0 flex-shrink-0 relative  gap-7`}
          >
            <div className=" w-2/5 flex   h-full p-16  ">
              <motion.button
                className="bg-black text-white shodowcursor1 text-sm  rounded-full border border-white h-16 w-16  absolute bottom-8 left-32 z-10  "
                initial={{ y: 500 }}
                animate={
                  show && {
                    y: 0,
                    rotate: 360,
                    transition: { duration: 2, ease: "easeInOut" },
                  }
                }
              >
                Site
              </motion.button>
              <motion.button
                className="text-black bg-white shodowcursor1 text-sm  rounded-full border border-black h-16 w-16  absolute bottom-8 left-80 z-20"
                initial={{ y: 500 }}
                animate={
                  show && {
                    y: 0,
                    rotate: 360,
                    transition: { duration: 2, ease: "easeInOut" },
                  }
                }
              >
                Code
              </motion.button>
              <motion.div
                className={` ${
                  hover2 ? " abs " : ""
                }h-4/5 rounded-md flex-grow  overflow-hidden`}
                initial={{
                  perspective: "1000px",
                  rotateX: 35,
                  rotateY: 4,
                  rotateZ: -30,
                  opacity: 0.8,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
                animate={
                  hover2
                    ? {
                        perspective: "1000px",
                        opacity: 1,
                        rotateX: 0,
                        rotateY: 0,
                        rotateZ: 0,
                        position: "absolute",
                        cursor: "pointer",
                        transition: {
                          duration: 0.5,
                          ease: "easeIn",
                          fps: 10000,
                        },
                      }
                    : {
                        perspective: "1000px",
                        rotateX: 35,
                        rotateY: 4,
                        rotateZ: -30,
                        opacity: 0.8,
                        transition: { duration: 0.5, ease: "easeInOut" },
                      }
                }
                onMouseEnter={() => {
                  setHover2(true);
                  setShow(true);
                }}
                onMouseLeave={() => {
                  setHover2(false);
                }}
              >
                <img
                  src={p.src}
                  className="w-full h-full object-cover rounded-md"
                  alt=""
                />
              </motion.div>
            </div>
            <div className=" w-3/5 p-16 gap-7 flex rounded-lg   flex-col">
              <div
                className="text-6xl Panchang-font "
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
                className="cabinet-font font-light"
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
                className=" cabinet-font text-xl text-ri"
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
