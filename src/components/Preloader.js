import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Preloader({ onPreloaderHide, preloader, setPreloader }) {
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

  useEffect(()=>{
    if (counter >= 100) {
      onPreloaderHide();
      console.log("object"); // Call the prop function to trigger preloader hiding
      return;
    }
  },[counter])
  useEffect(() => {
    const updateCounter = () => {
      
      setCounter((prevCounter) => {
        const nextCounter = Math.min(
          prevCounter + Math.floor(Math.random() * 5) + 1,
          100
        );
        return nextCounter;
      });
    };

    const intervalId = setInterval(updateCounter, 100);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []); // Empty dependency array for one-time setup

  return (
    <div>
      <div
        className={`${
         "bg-black relative overlay overflow-hidden "
        } `}
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
    </div>
  );
}

export default Preloader;
