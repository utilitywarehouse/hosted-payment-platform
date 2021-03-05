import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const [isPhone, setIsPhone] = useState<boolean>();
  const [isTablet, setIsTablet] = useState<boolean>();
  const [isDesktop, setIsDesktop] = useState<boolean>();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (window.innerWidth < 768) {
        setIsPhone(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setIsPhone(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else {
        setIsPhone(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { ...windowSize, isPhone, isTablet, isDesktop };
};
