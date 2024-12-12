import { useState, useRef, useEffect, useCallback } from "react";

const useAspectRatioByHeight = (aspectRatioWidth, aspectRatioHeight) => {
  const [container, setContainer] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useCallback((node) => {
    if (node !== null) {
      setContainer(node);
    } else {
      setContainer(null);
    }
  }, []);

  const updateDimensions = () => {
    const node = container;
    if (node) {
      const height = node.offsetHeight;
      const width = (height * aspectRatioWidth) / aspectRatioHeight;
      setDimensions({ width, height });
    } else {
      setDimensions({ width: 0, height: 0 });
    }
  };

  useEffect(() => {
    if (container) {
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, [container, aspectRatioWidth, aspectRatioHeight]);

  return { containerRef, ...dimensions };
};


const useAspectRatioByWidth = (aspectRatioWidth, aspectRatioHeight) => {
  const [container, setContainer] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useCallback(node => {
    if (node !== null) {
      setContainer(node);  
    } else {
      setContainer(null);  
    }
  }, []);

  const updateDimensions = () => {
    if (container) {
      const width = container.offsetWidth;
      const height = (width * aspectRatioHeight) / aspectRatioWidth;
      setDimensions({ width, height });
    } else {
      setDimensions({ width: 0, height: 0 }); 
    }
  };

  useEffect(() => {
    if (container) {
      updateDimensions();  
      window.addEventListener("resize", updateDimensions);  
      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, [container, aspectRatioWidth, aspectRatioHeight]);

  return { containerRef, ...dimensions };
};

export { useAspectRatioByHeight, useAspectRatioByWidth };
