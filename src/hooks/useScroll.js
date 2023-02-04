import { useEffect } from "react";

export default function useScroll(callback) {
  useEffect(() => {
    function onScroll() {
      const scrollPosition = window.scrollY;
      callback(scrollPosition);
    }

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return null;
}
