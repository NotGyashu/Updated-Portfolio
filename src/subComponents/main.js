import { useState, useEffect } from "react";
import Hire from "./hire";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { social } from "../info";
import { about } from "../info";
import MainNavbar from "./mainNavbar";

function Main() {
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Fix for mobile viewport height
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

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
    <div className="h-[100dvh] flex flex-col gap-2 md:gap-4 lg:gap-5 p-2 lg:p-5 overflow-hidden" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      {/* Header Section */}
      <div className="flex flex-col flex-shrink-0">
        <div className="flex flex-col Panchang-font">
          <div className="flex justify-between items-center text-[clamp(1.3rem,4vw,3.5rem)]">
            <div>Hey,</div>
            <div className="border-2 px-1 rounded-full" id="navbar">
              <MainNavbar />
            </div>
          </div>
          
          <div className="flex md:flex-row flex-col gap-x-3 md:gap-x-5 text-[clamp(2rem,5.5vw,6rem)]">
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

      {/* Content Section */}
      <div className="flex-grow flex flex-col md:flex-row-reverse 
         gap-40 md:gap-6 lg:gap-12 p-1 md:p-3 lg:p-6 min-h-0 pb-[env(safe-area-inset-bottom)]">
        
        {/* Description Text */}
        <div className="w-full md:w-[65%] lg:w-[60%] flex items-center cabinet-font text-left md:text-right text-[clamp(0.9rem,2.2vw,2.3rem)] leading-tight">
          {about.description}
        </div>

        {/* Social Icons + Hire Button Container */}
        <div className="flex w-full md:w-[35%] lg:w-[40%] flex-col justify-end items-center gap-4 md:gap-6 lg:gap-10 min-h-0">
          
          {/* Social Icons */}
          <AnimatePresence>
            {visible && (
              <motion.div
                className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap justify-center"
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
                    className="flex items-center justify-center rounded-full border h-[clamp(2rem,4.5vw,3.5rem)] w-[clamp(2rem,4.5vw,3.5rem)]"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        translateY: `calc(clamp(-10px, -10vh, -35px) - ${
                          ((index + 3) % 3 === 2 || (index + 3) % 3 === 1) ? 25 : 0
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
                    whileHover={{ scale: 1.15 }}
                    initial="hidden"
                    animate="visible"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => handleClick(s.link)}
                    layout="position"
                  >
                    <img
                      src={s.src}
                      className="h-[clamp(1rem,2.5vw,2rem)] w-[clamp(1rem,2.5vw,2rem)]"
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
