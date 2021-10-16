import * as React from "react";
import ReactDOM from "react-dom";
import theme from "./theme";
import { App } from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />

    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
