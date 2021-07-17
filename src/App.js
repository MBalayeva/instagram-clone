import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./helpers/use-auth-listener";
import UserContext from "./context/user";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Sign-up"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/Not-Found"));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} exact>
              <Login />
            </Route>
            <Route path={ROUTES.SIGN_UP} exact>
              <Signup />
            </Route>
            <Route path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
