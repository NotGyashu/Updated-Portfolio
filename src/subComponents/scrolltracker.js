import React, { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css"; // Ensure you have Tailwind CSS configured

const ScrollTracker = forwardRef((props, ref) => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = ref.current;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollPercent = (scrollLeft / scrollWidth) * 100;
      setScrollPercent(scrollPercent);
    };

    const container = ref.current;
    container.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return (
    <div className="flex gap-1 pl-1 md:pl-4  lg:pl-7 pr-1 items-center ">
      <div className="w-[100%]    h-[1px] rounded-full bg-black ">
        <motion.div
          className="h-full bg-[#e1dcdc]"
          style={{ width: `${scrollPercent + 50}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollPercent}%` }}
          transition={{ ease: "linear", duration: 1 }}
        />
      </div>
      <span className="md:text-5xl text-2xl cabinet-font"> {Math.ceil(scrollPercent)}%</span>
    </div>
  );
});

export default ScrollTracker;
