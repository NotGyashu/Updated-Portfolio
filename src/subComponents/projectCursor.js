import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = ({hover1,hover2,hover3,hover4}) => {
  const cursorRef = useRef(null);
  const cursorX = useMotionValue(-50); // Adjust for inner cursor width
  const cursorY = useMotionValue(-50); // Adjust for inner cursor height

  useEffect(() => {
    const moveCursor = (e) => {
      const offsetX = 10; // Adjust this value as needed
      const offsetY = 10; // Adjust this value as needed
      cursorX.set(e.clientX - offsetX );
      cursorY.set(e.clientY - offsetY );
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="absolute">
      <motion.div
        ref={cursorRef}
        className={`custom-cursor flex items-center justify-center ${
          hover1 ? "bg-[#212529] border-none noshodowcursor" : ""
        }${hover2 ? "class2 " : ""}${hover3 ? "bg-[#212529] border-none" : ""}${
          hover4 ? "class4 " : "border-2 border-white shodowcursor1 "
        }`}
        animate={hover1 || hover3 ? { scale: 3 } : { scale: 1 }}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      ></motion.div>
      <motion.div
        className="h-1 w-1 rounded-full fixed bg-white"
        animate={{ x: cursorX, y: cursorY }}
        transition={{ duration: 0.3, type: "tween" }}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </div>
  );
};

export default CustomCursor;
