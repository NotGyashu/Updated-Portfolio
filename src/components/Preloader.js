import { useEffect, useState } from "react";
import { motion } from "framer-motion";
function Preloader() {
  const [counter, setCounter] = useState(0);

  const nameVariant = {
    hidden: {
      scale: 1,
    },
    visible: {
      scale: [1, 0.995, 1],
      transition: {
        repeat: Infinity,
        duration: 1,
      },
    },
  };
  useEffect(() => {
    const updateCounter = () => {
      if (counter >= 100) {
        clearInterval(intervalId);
        return;
      }

      setCounter((prevCounter) => {
        const nextCounter = prevCounter + Math.floor(Math.random() * 5) + 1;
        return nextCounter > 100 ? 100 : nextCounter;
      });
    };

    const intervalId = setInterval(updateCounter, 100); // Call updateCounter every 100 milliseconds

    return () => {
      clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div
      className={`${
        counter === 100 ? "hidden z-[-100]" : "bg-black relative overlay"
      } bg-black`}
    >
      <motion.div
        className="name relative"
        variants={nameVariant}
        initial="hidden"
        animate="visible"
      >
        Gyashu Rahman
      </motion.div>
      <div className="counter">{counter} % </div>
    </div>
  );
}

export default Preloader;
