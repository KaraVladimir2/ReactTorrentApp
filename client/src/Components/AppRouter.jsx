import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { TokenContext } from "../Context";
import { privateRoutes, publicRoutes } from "../Router/index";

const AppRouter = () => {
  const { isAdmin, isAuth } = useContext(TokenContext);

  return isAdmin ? (
    <Switch>
      {privateRoutes.map((route) => {
        while (
          isAuth &&
          (route.path === "/login" || route.path === "/register")
        )
          return;
        return (
          <Route
            component={route.component}
            path={route.path}
            exact={route.exact}
            key={route.path}
          />
        );
      })}
      <Redirect to="/posts" />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map((route) => {
        while (
          isAuth &&
          (route.path === "/login" || route.path === "/register")
        )
          return;
        return (
          <Route
            component={route.component}
            path={route.path}
            exact={route.exact}
            key={route.path}
          />
        );
      })}
      <Redirect to="/posts" />
    </Switch>
  );
};

export default AppRouter;
