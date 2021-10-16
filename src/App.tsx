import * as React from "react";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Switch } from "react-router-dom";
import About from "./pages/About";
import { AuthContextProvider } from "./store/auth-context";

export const App = () => {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </ChakraProvider>
    </AuthContextProvider>
  );
};
