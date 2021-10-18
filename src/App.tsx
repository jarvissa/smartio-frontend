import * as React from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import theme from "./theme";
import { AuthContextProvider } from "./store/auth-context";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Switch } from "react-router-dom";

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
