import React, { useState, useEffect } from "react";

function Canvas() {
  const [radius, setRadius] = useState(50); // default radius

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const minDimension = Math.max(screenWidth, screenHeight);
      setRadius(minDimension * 0.07  ); // adjust this factor as needed
    }

    handleResize(); // call it initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bgImage no-scrollbar ">
      <svg className="blobCont" width="100%" height="100%">
        <image
          xlinkHref="https://unsplash.com/photos/brown-and-white-house-on-snowcape-mountain-r-Xo8fxc_6w"
          mask="url(#mask)"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
        <defs>
          <filter id="gooey" height="130%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="15"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>
        <mask id="mask" x="0" y="0">
          <g style={{ filter: "url(#gooey)" }}>
            <circle
              className="blob"
              cx="10%"
              cy="10%"
              r={radius}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="50%"
              cy="10%"
              r={radius * 0.5}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="17%"
              cy="15%"
              r={radius * 0.875}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="90%"
              cy="20%"
              r={radius * 1.5}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="30%"
              cy="25%"
              r={radius * 0.375}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="50%"
              cy="60%"
              r={radius}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="70%"
              cy="90%"
              r={radius * 0.125}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="90%"
              cy="60%"
              r={radius * 1.125}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="30%"
              cy="90%"
              r={radius}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="10%"
              cy="10%"
              r={radius}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="50%"
              cy="10%"
              r={radius * 0.25}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="17%"
              cy="15%"
              r={radius * 0.875}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="40%"
              cy="20%"
              r={radius * 1.5}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="30%"
              cy="25%"
              r={radius * 0.375}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="80%"
              cy="60%"
              r={radius}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="17%"
              cy="10%"
              r={radius * 1.25}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="40%"
              cy="60%"
              r={radius * 1.125}
              fill="white"
              stroke="white"
            />
            <circle
              className="blob"
              cx="10%"
              cy="50%"
              r={radius}
              fill="white"
              stroke="white"
            />
          </g>
        </mask>
      </svg>
    </div>
  );
}

export default Canvas;
