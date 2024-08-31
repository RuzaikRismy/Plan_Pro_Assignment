import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import "./App.css";
import { Provider } from "react-redux";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { theme } from "./assets/themes/infirmaTheme";
import Login from "./components/authorization/login/Login";
import NewLogin from "./components/authorization/login/NewLogin";

require("typeface-roboto");

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {/* <Route path="/" exact component={Login} /> */}
          <Route path="/" exact component={NewLogin} />
          <Route path="/exotic" component={Layout} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppWrapper;
