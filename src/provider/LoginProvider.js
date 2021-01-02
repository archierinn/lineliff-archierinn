import React, { createContext, useEffect, useState } from "react";
import { useLiff } from "react-liff";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    img: "",
    token: "",
    userId: "",
  });
  const { liff, isLoggedIn, ready, error } = useLiff();

  useEffect(() => {
    console.log(ready)
    console.log(error)
    if (ready) {
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
    }
  }, [ready, isLoggedIn, liff, profile, error]);

  return (
    <LoginContext.Provider
      value={{
        profiles: [profile, setProfile],
        liff,
        isLoggedIn
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
