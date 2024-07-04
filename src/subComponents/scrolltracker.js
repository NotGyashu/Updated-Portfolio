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
    <div className="">
      <div className="w-[96%] lg:mx-7 md:mx-4 mx-1 h-[1px] rounded-full bg-black ">
        <motion.div
          className="h-full bg-[#e1dcdc]"
          style={{ width: `${scrollPercent}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollPercent}%` }}
          transition={{ ease: "linear", duration: 1 }}
        />
        
      </div>
    </div>
  );
});

export default ScrollTracker;
