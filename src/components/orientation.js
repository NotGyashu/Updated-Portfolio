import React, { useEffect } from 'react';

function OrientationOverlay() {
  useEffect(() => {
    function checkOrientation() {
      const overlay = document.getElementById('orientation-overlay');
      if (window.innerHeight > window.innerWidth) {
        // Portrait mode
        overlay.classList.remove('hidden');
      } else {
        // Landscape mode
        overlay.classList.add('hidden');
      }
    }

    // Initial check
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  return (
    <div id="orientation-overlay" className="orientation-overlay hidden">
      <div className="bg-black Panchang-font m-auto text-center justify-center items-center flex w-full h-full" >
        <div className="orientation-message ">
          Please rotate your device to landscape mode.
        </div>
      </div>
    </div>
  );
}

export default OrientationOverlay;
