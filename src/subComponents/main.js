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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      rotate: [0, 360],
      transition: {
        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
      },
    },
  };

  const notHireVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      rotate: [0, -360],
      transition: {
        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
      },
    },
  };

  const handleTouchStart = () => setIsHovered(true);
  const handleTouchEnd = () => setIsHovered(false);
  const handleClick = (url) => window.location.href = url;

  return (
    <div className="h-full flex flex-col gap-3 md:gap-5 p-2 lg:p-5 overflow-hidden">
      {/* Header Section - Fixed height, no flex-grow */}
      <div className="flex flex-col flex-shrink-0">
        <div className="flex flex-col Panchang-font">
          {/* "Hey," with Navbar */}
          <div className="flex justify-between items-center text-[clamp(1.3rem,4vw,4rem)]">
            <div>Hey,</div>
            <div className="border-2 px-1 rounded-full" id="navbar">
              <MainNavbar />
            </div>
          </div>
          
          {/* "I'm Gyashu" */}
          <div className="flex gap-x-3 md:gap-x-5 text-[clamp(2rem,6vw,6rem)]">
            <div>I'm</div>
            <motion.div className="cursor-pointer flex">
              {"Gyashu".split("").map((char, i) => (
                <motion.span
                  key={i}
                  whileHover={{ y: -20, color: "#f6f6f6ff" }}
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

      {/* Content Section - Grows to fill remaining space */}
      <div className="flex-grow flex md:flex-row-reverse flex-col justify-between gap-3 md:gap-8 lg:gap-16 p-2 md:p-4 lg:p-8 min-h-0">
        
        {/* Description Text */}
        <div className="w-full md:w-[70%] lg:w-[65%] flex items-center cabinet-font text-left md:text-right text-[clamp(1rem,2.5vw,2.5rem)]">
          {about.description}
        </div>

        {/* Social Icons + Hire Button Container - FIXED GAP */}
        <div className="flex w-full md:w-[30%] lg:w-[35%] flex-col justify-end items-center gap-8 md:gap-12 lg:gap-16 min-h-0">
          
          {/* Social Icons */}
          <AnimatePresence>
            {visible && (
              <motion.div
                className="flex gap-3 md:gap-4 lg:gap-5 flex-wrap justify-center"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 100,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
                layout="position"
              >
                {social.map((s, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center rounded-full border h-[clamp(2.5rem,5vw,4rem)] w-[clamp(2.5rem,5vw,4rem)]"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        translateY: `calc(clamp(-5px, -15vh, -30px) - ${
                          ((index + 3) % 3 === 2 || (index + 3) % 3 === 1) ? 33 : 0
                        }px)`,
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
                    layout="position"
                  >
                    <img
                      src={s.src}
                      className="h-[clamp(1.2rem,3vw,2.5rem)] w-[clamp(1.2rem,3vw,2.5rem)]"
                      alt="logo"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hire Button */}
          <motion.div
            className="border-black border rounded-xl self-center flex-shrink-0"
            variants={hireVariant}
            initial="hidden"
            animate="visible"
            layout="position"
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
