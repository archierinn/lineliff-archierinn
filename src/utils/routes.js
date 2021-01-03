import React from "react";
import { Route, Switch } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import CheckoutLayout from "../layout/CheckoutLayout";
import LoginLayout from "../layout/LoginLayout";
import OrderLayout from "../layout/OrderLayout";
import Verify from "../components/Verify";
import PrivateRoute from "./privateRoutes";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={["/", "/login"]}>
        <LoginLayout />
      </Route>
      <Route exact path="/verify">
        <Verify />
      </Route>
      <PrivateRoute exact path="/order">
        <OrderLayout />
      </PrivateRoute>
      <PrivateRoute exact path="/order/checkout">
        <CheckoutLayout />
      </PrivateRoute>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Routes;
