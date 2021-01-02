import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginContext } from "../provider/LoginProvider";

const PrivateRoute = ({ children, ...rest }) => {
  const { login } = useContext(LoginContext);
  const [isLoggedIn] = login;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
