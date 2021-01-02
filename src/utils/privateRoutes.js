import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginContext } from "../provider/LoginProvider";

const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useContext(LoginContext);
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
