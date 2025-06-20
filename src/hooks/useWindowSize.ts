import { useEffect, useState } from "react";

/**
 * useWindowSize Hook
 *
 * Tracks the current width and height of the browser window.
 *
 * @returns { width, height } - The current window dimensions
 */

function useWindowSize(): { width: number; height: number } {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
