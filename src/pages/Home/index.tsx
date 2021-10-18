import * as React from "react";
import Dashboard from "./Dashboard";
import Layout from "../../components/Home/Layout";
import Notifications from "./Notifications";
import { Route, Switch, useRouteMatch } from "react-router";

const Home = () => {
  const { path } = useRouteMatch();

  return (
    <Layout>
      <Switch>
        <Route exact path={path}>
          <Dashboard />
        </Route>

        <Route exact path={`${path}/notifications`}>
          <Notifications />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Home;
