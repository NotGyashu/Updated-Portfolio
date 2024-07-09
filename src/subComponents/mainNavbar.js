import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MainNavbar() {
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
    // const isSkills = param === "skills";
    // const isContact = param === "contact";
    // const isHome = param === "";

    

    if (isProjects) {
      setDark(true);
    } else {
      setDark(false);
    }
  }, [param]); // Add param as a dependency

  const imgLight = [
    {
      src1: "/home.png",
      src2: "/home (1).png",
      name: "",
      link: "/",
    },
    {
      src1: "/briefing.png",
      src2: "/briefing (1).png",
      name: "projects",
      link: "/projects",
    },
    {
      src1: "/skills.png",
      src2: "/skills (1).png",
      name: "skills",
      link: "/skills",
    },
    {
      src1: "/email.png",
      src2: "/email (1).png",
      name: "contact",
      link: "/contact",
    },
  ];

  const isProjects = param === "projects";
  const isSkills = param === "skills";
  const isContact = param === "contact";
  // const isHome = param === "";


  return (
    <div>
      <div
        className={`h-auto py-1 ${
          isContact || isProjects ||isSkills
            ? "flex flex-row lg:gap-4 gap-2"
            : "flex flex-col lg:gap-4 gap-2"
        } 
          
        }`}
      >
        {imgLight.map((img, index) => (
          <motion.div
          key={index}
            className={`border  ${
              param === img.name
                ? "gradient-border-2 border"
                : "border border-black"
            } bg-transparent rounded-full p-1 w-7 lg:p-2 lg:w-10 `}
            whileHover={{ scale: 1.1 }}
          >
            <Link to={img.link}>
              <img src={dark ? img.src2 : img.src1} alt="Home" />
            </Link>
          </motion.div>

        ))}

      </div>

    </div>

  );
}

export default MainNavbar;
