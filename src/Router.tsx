import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import { authService } from "./firebase";

const Router = () => {
  const [user, loading, error] = useAuthState(authService);
  return (
    <HashRouter>
      <Switch>
        {loading ? (
          <div>
            <span>Loading...</span>
          </div>
        ) : user && !error ? (
          <>
            <Route exact path={["/", "/:roomId"]}>
              <Home />
            </Route>
          </>
        ) : (
          <>
            <Route>
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </HashRouter>
  );
};

export default Router;
