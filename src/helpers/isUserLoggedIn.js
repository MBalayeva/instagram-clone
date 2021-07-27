import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const IsUserLoggedIn = ({ user, isUserLogged, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{ pathname: isUserLogged, state: { from: location } }}
            />
          );
        }

        return null;
      }}
    ></Route>
  );
};

export default IsUserLoggedIn;
