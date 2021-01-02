import React, { createContext, useEffect, useState } from "react";
// import { useLiff } from "react-liff";
import LineLiff from "@line/liff";

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
  const liff = LineLiff;
  const isLoggedIn = liff.isLoggedIn();

  useEffect(() => {
    if (isLoggedIn) {
      let profiles = { ...profile };
      liff.getProfile().then((res) => {
        profiles = {
          ...profiles,
          name: res.displayName,
          img: res.pictureUrl,
          userId: res.userId,
        };
      });
      const token = liff.getIDToken();
      setProfile({
        ...profiles,
        token,
      });
    }
  }, [isLoggedIn, liff, profile]);

  return (
    <LoginContext.Provider
      value={{
        profiles: [profile, setProfile],
        liff,
        isLoggedIn,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
