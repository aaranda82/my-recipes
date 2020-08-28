import React from "react";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PublicPage from "./components/PublicPage";
import { store } from "./store";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

const { Provider } = require("react-redux");

function App(props: any) {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Auth} />
        <Route path="/publicpage" component={PublicPage} />
        <Footer />
      </Router>
    </Provider>
  );
}

export default withRouter(App);
