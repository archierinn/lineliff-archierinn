import React, { createContext, useEffect, useState } from "react";
import liff from "@line/liff";
import Axios from "axios";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    img: "",
    token: "",
    userId: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (profile.name === "") {
      liff.ready.then(() => {
        return liff
          .getProfile()
          .then((res) => {
            Axios.post("/login", { token: getRandomNumber(32) }).then(
              (resp) => {
                setProfile({
                  ...profile,
                  id: resp.data.data,
                  name: res.displayName,
                  img: res.pictureUrl,
                  userId: res.userId,
                });
                return true;
              }
            );
            setIsLoggedIn(true);
            return true;
          })
          .catch((err) => console.log(err));
      });
    }
  }, [profile]);

  const getRandomNumber = (length) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random = "";
    for (let i = 0; i < length; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length + 1));
    }
    return random;
  };

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
