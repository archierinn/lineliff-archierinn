import React, { createContext, useEffect, useState } from "react";
// import { useLiff } from "react-liff";
// import liff from "@line/liff";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    img: "",
    token: "",
    userId: "",
  });
  // const { liff, isLoggedIn, ready, error } = useLiff();
  // const liff = LineLiff;
  // liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID })
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* useEffect(() => {
    if (liff.isLoggedIn()) {
      setIsLoggedIn(true);
      // let profiles = { ...profile };
      liff.getProfile().then((res) => {
        setProfile({
          ...profile,
          name: res.displayName,
          img: res.pictureUrl,
          userId: res.userId,
        });
      });
    }
  }, [profile]); */

  return (
    <LoginContext.Provider
      value={{
        profiles: [profile, setProfile],
        login: [isLoggedIn, setIsLoggedIn],
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
