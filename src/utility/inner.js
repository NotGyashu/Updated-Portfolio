import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { motion } from "framer-motion";

const anim = (variants)=>{
    return {
        initial:"initial",
        animate:"enter",
        exit:"exit",
        variants

    }
}

export default function Inner(props) {
  const [dimension, setDimension] = useState({
    height: 0,
    width: 0,
  });
  const router = useLocation();
  

  useEffect(() => {
    const resize = () => {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

 const routes = {
    "/":"Home",
    "/projects":"Projects",
    "/skills":"Skills",
    "/contact":"Contact"
 }
 const text = {
   initial: {
     opacity: 1,
   },
   enter: {
     top: -100,
     opacity: 0,
     transition: {
       duration: 1.2,
       delay: 0.3,
       ease: [0.76, 0, 0.24, 1],
     },
     transitionEnd:{
        top:"48%"
     }
   },
   exit: {
     opacity: 1,
     top: "40%",
     transition: {
       duration: .5,
       delay: 0.4,
       ease: [0.76, 0, 0.24, 1],
     },
   },
 };

  return (
    <div className="h-screen w-screen fixed flex pointer-events-none top-[-0] left-0 z-[40] ">
      <div
        style={{ opacity: dimension.width > 0 ? 0 : 1 }}
        className="bg-black h-screen w-screen fixed flex pointer-events-none top-[0] left-0 z-[40]"
      ></div>
      <motion.p
        key={router.pathname}
        {...anim(text)}
        className="absolute Panchang-font left-[50%] top-[40%] z-[50] text-white translate-x-[-50%] text-3xl"
      >
        {routes[router.pathname]}
      </motion.p>
      {dimension.width > 1 && (
        <SVG width={dimension.width} height={dimension.height} />
      )}
    </div>
  );
}

const SVG = ({ width, height }) => {
  const w = width;
  const h = height;
  const initialPath = `
    M 0 200
    Q ${w / 2} 0 ${w} 200
    L ${w} ${h + 200}
    Q ${w / 2} ${h + 400} 0 ${h + 200}
    L 0 200
  `;
  const targetPath = `
    M 0 200
    Q ${w / 2} 0 ${w} 200
    L ${w} ${h }
    Q ${w / 2} ${h } 0 ${h }
    L 0 200
  `;


  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    exit: {
      d: initialPath,
      transition: {
        duration: 1.2,

        ease: [0.76, 0, 0.24, 1],
      },
    },
  };
  const slide = {
    initial: {
      top: "-200px",
    },

    enter: {
      top: "-100vh",
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1],
      },
      transitionEnd: {
        top: "100vh",
      },
    },
    exit: {
      top: "-200px",
      transition: {
        duration: 1.2,
        
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.svg
    {...anim(slide)}
      viewBox={`0 0 ${w} ${h}`}
     preserveAspectRatio="xMidYMid meet"
      width={w}
      height={h}
      style={{ overflow: "visible",position:"fixed" }}
    >
      
        <motion.path {...anim(curve)}  />
     
    </motion.svg>
  );
};
