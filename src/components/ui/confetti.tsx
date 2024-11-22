"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initialize with current window size
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Confetti width={windowSize.width} height={windowSize.height} />
    </div>
  );
};

export default ConfettiComponent;