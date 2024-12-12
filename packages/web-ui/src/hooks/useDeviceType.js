import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);

  const checkDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUserAgent =
      /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    const isTabScreen = window.innerWidth > 768 && window.innerWidth <= 998;
    setIsMobile(isMobileUserAgent || isSmallScreen);
    setIsTab(isTabScreen);
  };

  useEffect(() => {
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return { isMobile, isTab };
};

export default useDeviceType;
