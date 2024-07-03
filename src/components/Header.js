import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [nav, setNav] = useState(false);
  const [isXClicked, setIsXClicked] = useState(false);
  const [param, setParam] = useState(null);
  const [dark, setDark] = useState(null);

  useEffect(() => {
    // Extract the parameter from the URL path
    const path = window.location.pathname;
    const pathParts = path.split("/");
    const paramFromPath = pathParts[pathParts.length - 1]; // Assuming the param is the last part of the path
    setParam(paramFromPath);
  }, []);
  useEffect(() => {
    const isProjects = param === "projects";
    const isSkills = param === "skills";
    const isContact = param === "contact";
    const isHome = param === "";

    console.log(isProjects, isContact, isHome, isSkills);

    if (isProjects || isSkills) {
      setDark(true);
    } else {
      setDark(false);
    }
  }, [param]);
  
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
const isProjects = param === "projects";
const isSkills = param === "skills";
const isContact = param === "contact";
const isHome = param === "";
  return (
    <div className="flex border  no-scrollbar w-screen  justify-between items-center gap-5 py-4 px-8 z-20 box-border relative">
      {/* <div>logo</div> */}
      <div className="flex-grow flex h-[1vh]  gap-1">
      
        <div className="w-[25%] h-[100%]  rounded-full"></div>
        <div className="w-[25%] h-[100%]  rounded-full"></div>
        <div className="w-[25%] h-[100%]  rounded-full"></div>
      </div>
      <div className="flex gap-x-7 items-center">
        {/* <div className="h-10 w-10">
          <img src="/half-moon.png" alt="moon icon" />
        </div> */}
        <div className="h-10 w-10">
          <img src="/hamburger.png" alt="menu icon" onClick={toggleNav} />
        </div>
      </div>
      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            className="z-10 h-screen flex flex-col rounded-tl-[20%] rounded-bl-[20%] p-10 w-[35%] text-5xl Panchang-font border-2 absolute top-0 right-0 gap-10 bg-white"
          >
            <motion.img
              src="/letter-x.png"
              alt="close icon"
              onClick={handleXClick}
              className="h-10 w-10 cursor-pointer p-2 rounded-full"
              animate={{
                backgroundColor: isXClicked ? "#ffffed" : "#ffffff",
              }}
              transition={{ duration: 0.5 }}
            />
            <ul className="border flex flex-col gap-5 h-full justify-center">
              <li>
                <Link to="/" onClick={toggleNav}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" onClick={toggleNav}>
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/skills" onClick={toggleNav}>
                  Skills
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleNav}>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
