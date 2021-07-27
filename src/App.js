import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./helpers/use-auth-listener";
import UserContext from "./context/user";
import ProtectedRoutes from "./helpers/protectedRoutes";
import IsUserLoggedIn from "./helpers/isUserLoggedIn";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Sign-up"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/Not-Found"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>loading...</p>}>
          <Switch>
            <IsUserLoggedIn
              user={user}
              isUserLogged={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN}
              exact
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              isUserLogged={ROUTES.DASHBOARD}
              path={ROUTES.SIGN_UP}
              exact
            >
              <Signup />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE}>
              <Profile />
            </Route>
            <ProtectedRoutes user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoutes>
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
