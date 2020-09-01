import React from "react";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PublicPage from "./components/PublicPage";
import RecipeDetail from "./components/RecipeDetail";
import AccountPage from "./components/AccountPage";
import UserPage from "./components/UserPage";
import { store } from "./store";
import {
  BrowserRouter as Router,
  Switch,
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
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Auth} />
          <Route path="/publicpage" component={PublicPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/recipedetail/:id" component={RecipeDetail} />
          <Route path="/userpage/:id" component={UserPage} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default withRouter(App);
