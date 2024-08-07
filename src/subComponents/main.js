import { useState } from "react";
import Hire from "./hire";
import { easeInOut, motion } from "framer-motion";
import MainNavbar from "./mainNavbar";
import { social } from "../info";
import { useNavigate } from "react-router-dom";
import { about } from "../info";
function Main() {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const nav = useNavigate();

  const hireVariant = {
    hidden: {
      opacity: 0, // You can define initial hidden styles if needed
    },
    visible: {
      opacity: 1, // Target opacity when visible
      rotate: [0, 360], // Define rotation from 0 to 360 degrees
      transition: {
        rotate: {
          duration: 8, // Duration for one complete rotation
          repeat: Infinity, // Loop infinitely
          ease: "linear", // Linear easing for constant speed
        },
      },
    },
  };

  const notHireVariant = {
    hidden: {
      opacity: 0, // You can define initial hidden styles if needed
    },
    visible: {
      opacity: 1, // Target opacity when visible
      rotate: [0, -360], // Define rotation from 0 to 360 degrees
      transition: {
        rotate: {
          duration: 8, // Duration for one complete rotation
          repeat: Infinity, // Loop infinitely
          ease: "linear", // Linear easing for constant speed
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
  //direct the url to open in same tab without getting added to present url
   //window.open(url);
 window.location.href = url;

};


  return (
    <div className="w-full no-scrollbar border flex-grow relative flex flex-col justify-between items-center lg:mt-[10vh] mt-[5vh]">
      <div
        className="border-2 absolute lg:top-[20%] top-[10%] lg:left-7 md:left-[90%] py-2 px-1 rounded-full"
        id="navbar"
      >
        <MainNavbar />
      </div>
      <div className="w-[70vw] flex flex-col ">
        <div className="flex flex-col Panchang-font">
          <div className="bold lg:text-6xl text-4xl ">Hey,</div>
          <div className="flex gap-x-5 flex-col md:flex-row lg:text-[6rem] text-5xl">
            <div>I'm</div>
            <motion.div className="cursor-pointer">
            
              <motion.span whileHover={{ translateY: 100 }}>G</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>y</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>a</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>s</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>h</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>u</motion.span>
            </motion.div>
          </div>
        </div>

        <div className="text-2xl lg:text-4xl mt-7 flex justify-end cabinet-font text-right w-full">
          <div className="lg:w-[70%] w-full">
           {about.description}
          </div>
        </div>
      </div>
      <div
        className="flex gap-5 absolute lg:left-[14.7vw] left-[1vw] lg:bottom-10 bottom-3 
      "
      >
        {visible &&
          social.map((s, index) => (
            <motion.div
              key={index}
              className="lg:h-16 lg:w-16 h-12 w-12 flex items-center justify-center rounded-full border"
              variants={{
                hidden: {
                  opacity: 0,
                  // Initial rotation angle
                },
                visible: {
                  opacity: 1,
                  translateY:
                    -100 -
                    ((index + 3) % 3 === 2 || (index + 3) % 3 === 1) * 29,

                  rotate: 360, // Rotate to its original position
                  transition: {
                    type: "spring", // Use spring physics for animation
                    stiffness: 150, // Adjust stiffness for the spring effect
                    damping: 30,
                    duration: 3, // Adjust damping for the spring effect
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
              <img src={s.src} className="h-8 w-8 m-2" alt="logo" />
            </motion.div>
          ))}
      </div>
      <motion.div
        className="border-black border absolute rounded-xl lg:bottom-10 left-[120px] lg:left-[24.5vw] bottom-3"
        variants={hireVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={notHireVariant}>
          <Hire setVisible={setVisible} visible={visible} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Main;
