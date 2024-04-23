import { useState } from "react";
import Hire from "./hire";
import { easeInOut, motion } from "framer-motion";
function Main() {
  const [visible, setVisible] = useState(false);
  const social = [
    {
      src: "/mail.png",
      link: "",
    },
    {
      src: "/linkedin.png",
      link: "",
    },
    {
      src: "/social-media.png",
      link: "",
    },
    {
      src: "/logo.png",
      link: "",
    },
  ];

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

  return (
    <div className="w-full no-scrollbar border flex-grow relative flex flex-col  justify-between items-center mt-[10vh]">
      <div className="absolute top-[40%] left-[-5%] rotate-90  Panchang-font flex  gap-6 items-center  ">
        <div className="w-[1px] h-[6vh]  bg-black rounded-full rotate-90 "></div>
        <span> SCROLLDOWN</span>
        <div className="w-[1px] h-[7vh] ml-1  bg-black rounded-full rotate-90 "></div>
      </div>
      <div className="w-[70vw]  flex flex-col ">
        <div className="flex flex-col  Panchang-font">
          <div className=" bold text-6xl ">Hey,</div>
          <div className="flex gap-x-5  text-[6rem]">
            <div>I'm</div>
            <div className="">
              <motion.span whileHover={{ translateY: 100 }} className="">
                G
              </motion.span>
              <motion.span whileHover={{ translateY: 100 }}>y</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>a</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>s</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>h</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>u</motion.span>
            </div>
          </div>
        </div>
        <div className="  text-4xl flex justify-end cabinet-font text-right w-full">
          <div className=" w-[70%]">
            —Full-Stack Developer & Web Designer with experience crafting
            user-friendly web experiences and tackling challenging algorithms.
          </div>
        </div>
      </div>
      <div
        className="flex gap-5  absolute left-[14.7vw] bottom-10
      "
      >
        {visible &&
          social.map((s, index) => (
            <motion.div
              key={index}
              className="h-16 w-16 flex items-center justify-center rounded-full  border "
              variants={{
                hidden: {
                  opacity: 0,
                  // Initial rotation angle
                },
                visible: {
                  opacity: 1,
                  translateY:
                    -100 - ((index + 3) % 3 == 2 || (index + 3) % 3 == 1) * 29,

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
            >
              {" "}
              {console.log((index + 3) % 3 == 2 || (index + 3) % 3 == 2)}
              <img src={s.src} className="h-8 w-8 m-2 " />
            </motion.div>
          ))}
      </div>
      <motion.div
        className="border  rounded-xl  absolute left-[24.5vw] bottom-10 "
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
