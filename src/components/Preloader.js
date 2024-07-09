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
   
      <div
        className={`${
         "bg-black relative box-border overlay h-screen w-screen no-scrollbar"
        } `}
      >
        <motion.div
          className="name"
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
