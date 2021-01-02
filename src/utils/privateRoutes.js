import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useLiff } from "react-liff";

const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useLiff();
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
