import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Sign-up"));
const NotFound = lazy(() => import("./pages/Not-Found"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} exact>
            <Login />
          </Route>
          <Route path={ROUTES.SIGN_UP} exact>
            <Signup />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
