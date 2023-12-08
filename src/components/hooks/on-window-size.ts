import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

function useWindowSize(debounceTime = 300) {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = useDebouncedCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, debounceTime);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return windowSize;
}

export default useWindowSize;
