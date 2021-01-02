import React, { createContext, useEffect, useState } from "react";
import { useLiff } from "react-liff";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    img: "",
    token: "",
    userId: ""
  });
  const { liff, isLoggedIn, ready } = useLiff();

  useEffect(() => {
    if (isLoggedIn) {
        const profiles = liff.getProfile()
        const token = liff.getIDToken()
        setProfile({...profile, name: profiles.displayName, img: profiles.pictureUrl, token, userId: profiles.userId})
    }
  }, [ready, isLoggedIn, liff, profile])

  return (
    <LoginContext.Provider
      value={{
        profiles: [profile, setProfile]
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
