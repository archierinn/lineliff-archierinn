import React, { createContext, useEffect, useState } from "react";
// import { useLiff } from "react-liff";
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
  // const { liff, isLoggedIn, ready, error } = useLiff();
  // const liff = LineLiff;
  // liff.init({ liffId: process.env.REACT_APP_LINE_LIFF_ID })
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (profile.name === "") {
      // let profiles = { ...profile };
      liff.ready().then(() => {
        return liff.getProfile().then((res) => {
          Axios.post("/login", res.userId).then((resp) => {
            setProfile({
              ...profile,
              id: resp.data.data,
              name: res.displayName,
              img: res.pictureUrl,
              userId: res.userId,
            });
            return true
          })
          setIsLoggedIn(true);
          return true
        }).catch((err) => console.log(err));
      })
    }
  }, [profile]);

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
