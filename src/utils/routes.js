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
      {/* <PrivateRoute exact path="/verify">
        <Verify />
      </PrivateRoute> */}
      <Route exact path="/verify">
        <Verify />
      </Route>
      <PrivateRoute exact path="/order">
        <OrderLayout />
      </PrivateRoute>
      <PrivateRoute exact path="/order/checkout">
        <CheckoutLayout />
      </PrivateRoute>
      {/* <Route exact path="/order">
        <OrderLayout />
      </Route>
      <Route exact path="/order/checkout">
        <CheckoutLayout />
      </Route> */}
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Routes;
