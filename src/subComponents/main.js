import { useState } from "react";
import Hire from "./hire";
import { easeInOut, motion } from "framer-motion";
import MainNavbar from "./mainNavbar";
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
    <div className="w-full no-scrollbar border flex-grow relative flex flex-col  justify-between items-center lg:mt-[10vh] mt-[5vh]">
      {/* <div className="border-2 absolute top-[20%] left-7 py-2 px-1  rounded-full" id="navbar">
        <MainNavbar />
      </div> */}
      <div className="w-[70vw]   flex flex-col ">
        <div className="flex flex-col  Panchang-font">
          <div className=" bold md:text-6xl text-4xl ">Hey,</div>
          <div className="flex gap-x-5 flex-col md:flex-row  lg:text-[6rem] text-5xl">
            <div>I'm</div>
            <motion.div className="cursor-pointer">
              <motion.span whileHover={{ translateY: -100 }} className="">
                G
              </motion.span>
              <motion.span whileHover={{ translateY: 100 }}>y</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>a</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>s</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>h</motion.span>
              <motion.span whileHover={{ translateY: 100 }}>u</motion.span>
            </motion.div>
          </div>
        </div>
        
        <div className=" text-2xl lg:text-4xl flex justify-end cabinet-font text-right w-full">
          <div className=" lg:w-[70%] w-full">
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
              className="lg:h-16 lg:w-16 md:h-12 md:w-12 h-10 w-10 flex items-center justify-center rounded-full  border "
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
              <img src={s.src} className="lg:h-8 h-6 w-6 lg:w-8 lg:m-2 m-1 " />
            </motion.div>
          ))}
      </div>
      <motion.div
        className="border-black border  rounded-xl  absolute left-[24.5vw] bottom-10 "
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
