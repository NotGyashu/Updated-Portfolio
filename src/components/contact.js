import { motion } from "framer-motion";
import ContactCursor from "../subComponents/contactCursor";
import { useState, useEffect, useRef } from "react";
import MainNavbar from "../subComponents/mainNavbar";
import ShootingStar from "../subComponents/skillCanvas";
import Inner from "../utility/inner";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const year = new Date().getFullYear();
  const nav = useNavigate();
  const social = [
    {
      src: "/linkedin.png",
      link: "https://www.linkedin.com/in/gyashu-rahman-299627224/",
    },
    {
      src: "/social-media.png",
      link: "https://github.com/NotGyashu/",
    },
    {
      src: "/logo.png",
      link: "https://www.instagram.com/gyashu_rahman/",
    },
  ];

  const contactRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (contactRef.current && contactRef.current.contains(event.target)) {
        setCursorVisible(true);
      } else {
        setCursorVisible(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const disableCursor = () => setCursorVisible(false);
  const enableCursor = () => setCursorVisible(true);

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  const handleClick = (url) => {
  
    window.location.href = url;
    
  };

  return (
    <div
      ref={contactRef}
      className="lg:p-3 p-1 relative overflow-hidden flex flex-col min-h-screen"
    >
      {cursorVisible && <ContactCursor />}

      <div className="w-0 h-0 z-[60]">
        <ShootingStar />
      </div>
      <div className="flex flex-col gap-5 flex-grow">
        <div className="lg:text-6xl md:text-4xl Panchang-font">Contact</div>
        <div className="border h-[75%] flex flex-col gap-3 gradient-border justify-around bg-white flex-grow">
          <div className="flex flex-col gap-3 items-center justify-center">
            <div
              className="Panchang-font hover:underline lg:text-xl text-xs"
              onMouseEnter={disableCursor}
              onMouseLeave={enableCursor}
            >
              have an idea?
            </div>
            <Inner />

            <motion.div
              className="lg:text-4xl text-2l Panchang-font border py-1 lg:py-2 px-4 rounded-full"
              whileHover={{ backgroundColor: "#111212", color: "#fff" }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              onMouseEnter={disableCursor}
              onMouseLeave={enableCursor}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{
                transform: isHovered ? "scale(1.2)" : "scale(1)",
                backgroundColor: isHovered ? "#111212" : "",
                color: isHovered ? "#fff" : "",
              }}
            >
              Lets Talk
            </motion.div>
            <div
              className="flex justify-center mt-6 md:gap-3 gap-1 items-center cursor-pointer"
              onMouseEnter={disableCursor}
              onMouseLeave={enableCursor}
            >
              <motion.div
                className="border p-1 border-black rounded-full px-2 cabinet-font text-xs lg:text-lg"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#111212",
                  color: "#fff",
                }}
                onClick={() => handleClick("mailto:rahmangyashu178@gmail.com")}
              >
                rahmangyashu178@gmail.com
              </motion.div>
              {social.map((s, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#111212",
                    color: "#fff",
                  }}
                  initial="hidden"
                  animate="visible"
                  className="border border-black rounded-full"
                  onClick={() => handleClick(s.link)}
                >
                  <img src={s.src} className="md:h-6 md:w-6 lg:m-4 m-2 h-4 w-4" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex   justify-between items-center px-6">
            <motion.div
              className="lg:h-20  lg:w-20 h-10 w-10 absolute bottom-2  cursor-pointer border border-black rounded-full flex justify-center items-center"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              initial="hidden"
              animate="visible"
              whileHover={{
                x: [0, -5, 5, -5, 0],
                y: [0, -5, 5, -5, 0],
                transition: { duration: 1 },
              }}
              onMouseEnter={disableCursor}
              onMouseLeave={enableCursor}
              onClick={() => {
                nav("/");
              }}
            >
              <img
                src="\icons8-up-arrow-100.png"
                className="lg:h-12 h-6 w-6 lg:w-12"
              />
            </motion.div>
            <div className="Panchang-font clamp absolute bottom-2 right-2 text-[clamp(.4rem,1.5vw,2rem)]">
              &copy; {year} made with &#x2764;&#xFE0F;;
            </div>
          </div>
         {/* Navbar - centered and self-sized */}
                 <div className="flex justify-center items-center flex-shrink-0">
                   <div
                     className="border-2 lg:px-2 lg:py-1 px-1 rounded-full "
                     id="nav" 
                   >
                     <MainNavbar />
                   </div>
                 </div>
        </div>
        
      </div>
      
    </div>
  );
};
