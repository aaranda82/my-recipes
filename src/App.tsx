import React from "react";
import Auth from "./components/Auth";
import Count from "./components/Count";
import { store } from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const { Provider } = require("react-redux");

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Auth />
          </Route>
          <Route patch="/count">
            <Count />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
