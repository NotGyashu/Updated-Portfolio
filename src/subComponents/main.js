import { useState } from "react";
import Hire from "./hire";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { social } from "../info";
import { about } from "../info";
import MainNavbar from "./mainNavbar";

function Main() {
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const hireVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      rotate: [0, 360],
      transition: {
        rotate: {
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        },
      },
    },
  };

  const notHireVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      rotate: [0, -360],
      transition: {
        rotate: {
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        },
      },
    },
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <div className="flex-grow  gap-5 flex flex-col  lg:p-5 p-2 max-h-[calc(100vh-80px)] overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col">
        <div className="flex flex-col Panchang-font">
          {/* "Hey," - Fluid from 2rem to 4rem */}
          <div className=" flex justify-between items-center  text-[clamp(1.3rem,4vw,4rem)]">
           <div>
             Hey,
           </div>

            <div
        className="border-2 px-1 rounded-full"
        id="navbar"
      >
        <MainNavbar />
      </div>
          </div>
          
          {/* "I'm Gyashu" - Fluid from 3rem to 6rem */}
          <div className="flex  gap-x-5  text-[clamp(2rem,6vw,6rem)]">
            <div>I'm</div>
            <motion.div className="cursor-pointer flex">
              {"Gyashu".split("").map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{
                    y: -20,
                    color: "#f6f6f6ff",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex  border md:flex-row-reverse  flex-col justify-between md:gap-10 gap-5 lg:gap-16 lg:p-8 p-4">
        {/* Description Text - Fluid from 1.5rem to 2.5rem */}
        <div className="lg:w-[70vw] border text-[clamp(1rem,2.5vw,2.5rem)] flex cabinet-font text-right w-full">
          {about.description}
        </div>

        {/* Container */}
        <div className="flex lg:w-[30vw] border flex-col justify-end items-center">
          {/* Social Icons with AnimatePresence */}
          <AnimatePresence>
            {visible && (
              <motion.div
                className="flex gap-5 "
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 100,
                  transition: {
                    duration: 0.5,
                    ease: "easeInOut",
                  },
                }}
              >
                {social.map((s, index) => (
                  <motion.div
                    key={index}
                     className="flex items-center justify-center rounded-full border 
             h-[clamp(2rem,5vw,4rem)] w-[clamp(2rem,5vw,4rem)]"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                       translateY: `calc(clamp(-60px, -20vh, -120px) - ${((index + 3) % 3 === 2 || (index + 3) % 3 === 1 ? 33 : 0)}px)`,
                        rotate: 360,
                        transition: {
                          type: "spring",
                          stiffness: 150,
                          damping: 30,
                          duration: 3,
                        },
                        ease: easeInOut,
                      },
                    }}
                    whileHover={{ scale: 1.2 }}
                    initial="hidden"
                    animate="visible"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => handleClick(s.link)}
                  >
                    <img src={s.src} className="h-[clamp(1rem,3vw,4rem)] w-[clamp(1rem,3vw,4rem)]" alt="logo" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hire Button with Rotation */}
          <motion.div
            className="border-black border rounded-xl self-center"
            variants={hireVariant}
            initial="hidden"
            animate="visible"
            layout
          >
            <motion.div variants={notHireVariant} inherit={false}>
              <Hire setVisible={setVisible} visible={visible} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Main;
