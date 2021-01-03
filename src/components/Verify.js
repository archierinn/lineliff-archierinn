import React, { useContext, useEffect } from "react";
import { FormContext } from "../provider/FormProvider";
import { LoginContext } from "../provider/LoginProvider";

const Verify = () => {
  const { history } = useContext(FormContext);
  const { login } = useContext(LoginContext);
  const [, setIsLoggedIn] = login;

  useEffect(() => {
    setIsLoggedIn(true);
    setTimeout(() => history.replace("/order"), 100);
  }, []);
  return <></>;
};

export default Verify;
