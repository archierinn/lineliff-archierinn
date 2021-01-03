import React from "react";
import { Route, Switch } from "react-router-dom";
import NoMatch from "../components/NoMatch";
import CheckoutLayout from "../layout/CheckoutLayout";
import LoginLayout from "../layout/LoginLayout";
import OrderLayout from "../layout/OrderLayout";
import Verify from "../components/Verify";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={["/", "/login"]}>
        <LoginLayout />
      </Route>
      <Route exact path="/verify">
        <Verify />
      </Route>
      <Route exact path="/order">
        <OrderLayout />
      </Route>
      <Route exact path="/order/checkout">
        <CheckoutLayout />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Routes;
