import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ProjectImg = ({ project }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMouseEnter = () => {
    if (window.innerWidth > 768) {
      setIsDialogOpen(true);
    }
  };

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      setIsDialogOpen(true);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleBoxClick = (url) => {
    window.location.href = url;
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const buttonVariants = {
    hidden: { y: 550, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 720,
      transition: { duration: 2, ease: "easeInOut" },
    },
    exit: {
      y: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="">
      {!isDialogOpen && (
        <motion.div
          className="h-4/5 w-full rounded-md flex-grow relative "
          initial={{ rotateX: 35, rotateY: 4, rotateZ: -30, opacity: 0.8 }}
          animate={{ rotateX: 35, rotateY: 4, rotateZ: -30, opacity: 0.8 }}
          onClick={handleClick}
        >
          <div className="overflow-hidden relative  rounded-md aspect-w-4 aspect-h-5">
            <img
              src="/preview.png"
              alt="preview"
              className="h-7 w-7 absolute right-2 top-2 bg-white p-1 rounded-md"
              onClick={handleMouseEnter }
            />
            <img
              src={project.src}
              className="object-cover  w-full h-full"
              alt={project.alt}
            />
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            className="fixed cursor-default inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dialogVariants}
          >
            <motion.div
              className="relative bg-white rounded-lg w-full h-full md:w-4/5 md:h-4/5"
              initial={{ rotateX: 35, rotateY: 4, rotateZ: -30, opacity: 0.8 }}
              animate={{
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                opacity: 1,
                transition: { duration: 1, ease: "easeInOut" },
              }}
              exit={{
                scale: 0.8,
                rotateX: 35,
                rotateY: 4,
                rotateZ: -30,
                opacity: 0.8,
                transition: { duration: 1, ease: "easeInOut" },
              }}
            >
              <img
                src={project.src}
                className="object-cover w-full h-full rounded-md"
                alt={project.alt}
              />

              <motion.div
                className="bg-black z-10 cursor-pointer h-12 w-12 p-3 rounded-full absolute bottom-2 left-[2vh]"
                variants={buttonVariants}
                onClick={() => handleBoxClick(project.link)}
                whileHover={{
                  scale: 1.3,
                  x: [0, -1, 1, -1, 0, 1, 0],
                  y: [0, -1, 1, -1, 0, 1],
                  transition: 1,
                }}
                exit={{ transition: 1 }}
              >
                <img
                  src="rocket.png"
                  className="object-cover h-6 w-6"
                  alt="rocket"
                />
              </motion.div>
              <motion.div
                className="bg-black cursor-pointer h-12 w-12 p-3 rounded-full absolute bottom-2 left-[40vw]"
                variants={buttonVariants}
                onClick={handleClose}
                whileHover={{
                  scale: 1.3,
                  x: [0, -1, 1, -1, 0, 1, 0],
                  y: [0, -1, 1, -1, 0, 1],
                  transition: 1,
                }}
                exit={{ transition: 1 }}
              >
                <img
                  src="cancel.png"
                  className="object-cover h-6 w-6"
                  alt="cancel"
                />
              </motion.div>
              <motion.div
                className="bg-black cursor-pointer h-12 w-12 p-3 rounded-full absolute bottom-2 right-[2vh]"
                variants={buttonVariants}
                onClick={() => handleBoxClick(project.code)}
                whileHover={{
                  scale: 1.3,
                  x: [0, -1, 1, -1, 0, 1, 0],
                  y: [0, -1, 1, -1, 0, 1],
                  transition: 1,
                }}
                exit={{ transition: 1 }}
              >
                <img
                  src="code.png"
                  className="object-cover h-6 w-6"
                  alt="code"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectImg;
