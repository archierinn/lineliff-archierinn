import React, { createContext, useEffect, useState } from "react";

export const ResponsiveContext = createContext();

export const ResponsiveProvider = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={{ width, height }}>
      {props.children}
    </ResponsiveContext.Provider>
  );
};
