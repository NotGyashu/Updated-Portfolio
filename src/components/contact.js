import { easeInOut, motion } from "framer-motion";
import ContactCursor from "../subComponents/contactCursor";
import { useState, useEffect, useRef } from "react";

export const Contact = () => {
  const [cursor, setCursor] = useState(true);
  const year = new Date().getFullYear();
  const social = [
    {
      src: "/linkedin.png",
      link: "",
    },
    {
      src: "/social-media.png",
      link: "",
    },
    {
      src: "/logo.png",
      link: "",
    },
  ];

  const contactRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (contactRef.current && contactRef.current.contains(event.target)) {
        setCursor(true);
      } else {
        setCursor(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={contactRef} className="p-3 flex flex-col gap-5 min-h-screen">
      {cursor && <ContactCursor />}
      <div className="text-4xl Panchang-font">Contact</div>
      <div className="flex flex-col gap-3 gradient-border items-center justify-center bg-white flex-grow">
        <div
          className="Panchang-font hover:underline"
          onMouseEnter={() => setCursor(true)}
          onMouseLeave={() => setCursor(false)}
        >
          have an idea?
        </div>

        <motion.div
          className="text-4xl Panchang-font border py-2 px-4 rounded-full"
          whileHover={{ backgroundColor: "#111212", color: "#fff" }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setCursor(true)}
          onMouseLeave={() => setCursor(false)}
        >
          Lets Talk
        </motion.div>
        <div
          className="flex justify-center items-center"
          onMouseEnter={() => setCursor(true)}
          onMouseLeave={() => setCursor(false)}
        >
          <div className="border p-1 rounded-full px-2 cabinet-font">
            rahmangyashu178@gmail.com
          </div>
          {social.map((s, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              initial="hidden"
              animate="visible"
            >
              <img src={s.src} className="h-6 w-6 m-6" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center px-6">
        <motion.div
          className="h-20 w-20 cursor-pointer border rounded-full flex justify-center items-center"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate="visible"
          whileHover={{
            x: [0, -5, 5, -5, 0], // Define an array of x values for the animation
            y: [0, -5, 5, -5, 0], // Define an array of y values for the animation
            transition: { duration: 1 }, // Set the duration of each step
          }}
          onMouseEnter={() => setCursor(true)}
          onMouseLeave={() => setCursor(false)}
        >
          <img src="\icons8-up-arrow-100.png" className="h-12 w-12" />
        </motion.div>
        <div>&copy; {year}</div>
      </div>
    </div>
  );
};
