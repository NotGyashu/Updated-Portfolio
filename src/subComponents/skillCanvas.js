import React from "react";
import { motion } from "framer-motion";

const ShootingStar = () => {
  const stars = Array.from({ length: 20 });

  const generateRandomStyles = (index) => {
    const delay = Math.random() * 3 + 3 ;
    const top = Math.random() *1800 - 100;
    const left = Math.random() *1500 -100;
    const opacity = Math.random() * 0.5 + 0.5;

    return {
      animationDelay: `${delay}s`,
      top: `calc(90% - ${top}px)`,
      left: `calc(0% - ${left}px)`,
      opacity: opacity,
    };
  };

  return (
    
      <div className="night border  ">
        {stars.map((_, index) => (
          <motion.div
            key={index}
            className="shooting_star"
            style={generateRandomStyles(index)}
          />
        ))}
      
    </div>
  );
};

export default ShootingStar;
