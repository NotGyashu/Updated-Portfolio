import React, { useEffect } from "react";
import { motion } from "framer-motion";

const ContactCursor = () => {
  const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const bubble = (e) => {
    const numberOfBubbles = 1; // Ensure only one bubble is generated per event
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    let pp = "";
    let fadeOut = randInt(2500, 3000);
    for (let i = 0; i < numberOfBubbles; i++) {
      let x = 50;
      let y = 55;
      let w = randInt(15, 35);
      let h = randInt(12, 30);
      let d1 = `M ${x} ${y} q ${randInt(w / 1.1, w / 8)} ${h} ${w} 0`;
      let d2 = `M ${x} ${y + randInt(0, h)} q ${randInt(
        w / 10,
        w / 1.1
      )} -${h} ${w} 0`;
      let rot = randInt(0, 360);
      let sw = randInt(50, 100) / 200;
      let p = `<g transform="rotate(${randInt(0, 360)} 50 50)">
        <circle cx="50" cy="50" r="2" stroke="rgba(130, ${randInt(
          130,
          175
        )}, ${randInt(130, 155)}, 0.8)" stroke-width="${sw}" fill="url(#grad)">
            <animate attributeName="r" values="${randInt(
              0,
              2
            )}; ${w}" dur="${fadeOut}ms" begin="0s" repeatCount="none" fill="freeze"  keyTimes="0;1" keySplines="${
        randInt(0, 100) / 100
      } ${randInt(0, 100) / 100} ${randInt(0, 100) / 100} ${
        randInt(0, 100) / 100
      }" calcMode="spline" />
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" values="${rot} ${x} ${y}; ${rot} ${x} ${
        y + randInt(5, 15)
      }" dur="${fadeOut}ms" begin="0s" fill="freeze" repeatCount="none" />
            <animate attributeName="opacity" values="1; 1; 1; 1; 0; 0" dur="${fadeOut}ms" begin="0s" fill="freeze" repeatCount="none" />
        </circle>
    </g>`;
      pp += p;
    }
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute(
      "style",
      `width: 100%; height: 100%; position: fixed; height: 150px; width: 150px; transform: translate(-50%,-50%); left: ${mouseX}px; top: ${mouseY}px; pointer-events: none;`
    );
    svg.innerHTML = `<radialGradient id="grad">
     <stop offset="50%" stop-color="rgba(255,255,255,0)" />
     <stop offset="100%" stop-color="rgba(255,255,255,0.5)" />
  </radialGradient>${pp}`;
    svg.classList.add("c");
    svg.setAttribute("animation-duration", `${fadeOut + 1000}ms !important`);
    document.body.appendChild(svg);
    setTimeout(() => {
      svg?.remove();
    }, fadeOut);
  };

  const clearBubbles = () => {
    document.querySelectorAll(".c").forEach((element) => {
      element.remove();
    });
  };

  useEffect(() => {
    let lastMove = 0;
    const handleMouseMove = (event) => {
      const now = Date.now();
      if (now - lastMove > 70) {
        // Adjust this value to control frequency
        bubble(event);
        lastMove = now;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", (event) => {
      clearBubbles();
      
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", (event) => {
        clearBubbles();
        bubble(event);
      });
    };
  }, []);

  return (
    <motion.svg
      viewBox="0 0 100 100"
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        height: "150px",
        width: "150px",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none", // Ensure the SVG does not capture pointer events
      }}
      animate={{
        rotate: [0, 360],
        x: "50vw",
        y: "50vh",
        transition: {
          duration: 3,
          ease: "linear",
          loop: Infinity,
        },
      }}
    >
      {/* SVG content here */}
    </motion.svg>
  );
};

export default ContactCursor;
