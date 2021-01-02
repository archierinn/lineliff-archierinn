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
      const profiles = liff.getProfile();
      const token = liff.getIDToken();
      setProfile({
        ...profile,
        name: profiles.displayName,
        img: profiles.pictureUrl,
        token,
        userId: profiles.userId,
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
