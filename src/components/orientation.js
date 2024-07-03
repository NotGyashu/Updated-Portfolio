import React, { useEffect, useState } from "react";

function OrientationOverlay() {
  const [landscape, setLandscape] = useState(true); // Assume landscape by default

  useEffect(() => {
    function checkOrientation() {
      if (window.innerHeight > window.innerWidth) {
        // Portrait mode
        setLandscape(false);
      } else {
        // Landscape mode
        setLandscape(true);
      }
    }

    // Initial check
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  return landscape;
}

export default OrientationOverlay;
