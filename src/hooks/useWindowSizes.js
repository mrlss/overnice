import { useEffect, useState } from "react";

const useWindowSizes = () => {
  const [windowDimensions, setWindowDimensions] = useState();

  function handleResize() {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowSizes;
