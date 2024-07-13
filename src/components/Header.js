import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [nav, setNav] = useState(false);
  const [isXClicked, setIsXClicked] = useState(false);
 // const [param, setParam] = useState(null);
  //const [dark, setDark] = useState(null);

  // useEffect(() => {
  //   // Extract the parameter from the URL path
  //   const path = window.location.pathname;
  //   const pathParts = path.split("/");
  //   const paramFromPath = pathParts[pathParts.length - 1]; // Assuming the param is the last part of the path
  //   setParam(paramFromPath);
  // }, []);
  // useEffect(() => {
  //   const isProjects = param === "projects";
  //   const isSkills = param === "skills";
  //   // const isContact = param === "contact";
  //   // const isHome = param === "";

  //   //console.log(isProjects, isContact, isHome, isSkills);

  //   if (isProjects || isSkills) {
  //     setDark(true);
  //   } else {
  //     setDark(false);
  //   }
  // }, [param]);
  
  const toggleNav = () => {
    setNav(!nav);
  };

  const handleXClick = () => {
    setIsXClicked(true);
    setTimeout(() => {
      setIsXClicked(false);
      setNav(false);
    }, 1000);
  };
// const isProjects = param === "projects";
// const isSkills = param === "skills";
// const isContact = param === "contact";
// const isHome = param === "";
  return (
    <div className="flex border max-h-[99vh] no-scrollbar justify-between items-center  no-scrollbar   py-1 px-2 md:py-2 md:px-4 lg:py-4 lg:px-8 z-20 box-border relative">
      <div className="text-[#040404] dancing-font text-3xl font-semibold">
        <span> &lt;</span>
        <span className=" "> gyashurahman </span>
        <span>/&gt;</span>
      </div>

      <div className="md:h-10 md:w-10 h-7 w-7  cursor-pointer">
        <img src="/hamburger.png" alt="menu icon" onClick={toggleNav} />
      </div>

      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6 }}
            className="z-10 h-[99vh] overflow-hidden box-border flex flex-col rounded-tl-[15%] rounded-bl-[15%] lg:rounded-tl-[20%] lg:rounded-bl-[20%] p-10 lg:w-[35%] md:w-[60%] w-[90%] lg:text-5xl md:text-3xl text-xl Panchang-font border-2 absolute top-0 right-0 gap-10 bg-white"
          >
            <motion.img
              src="/letter-x.png"
              alt="close icon"
              onClick={handleXClick}
              className="h-10 w-10 cursor-pointer p-2 rounded-full"
              animate={{
                backgroundColor: isXClicked ? "#ffffed" : "#ffffff",
              }}
              transition={{ duration: 0.6 }}
            />
            <motion.ul className="border flex flex-col gap-5 h-full justify-center">
              <motion.li
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 1 }}
              >
                <Link to="/" onClick={toggleNav}>
                  Home
                </Link>
              </motion.li>
              <motion.li
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 1.2 }}
              >
                <Link to="/projects" onClick={toggleNav}>
                  Projects
                </Link>
              </motion.li>
              <motion.li
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 1.4 }}
              >
                <Link to="/skills" onClick={toggleNav}>
                  Skills
                </Link>
              </motion.li>
              <motion.li
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 1.6 }}
              >
                <Link to="/contact" onClick={toggleNav}>
                  Contact
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
