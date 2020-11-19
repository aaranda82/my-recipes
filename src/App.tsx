import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import styled from "styled-components";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AllRecipesPage from "./components/AllRecipesPage";
import RecipeDetail from "./components/RecipeDetail";
import AccountPage from "./components/AccountPage";
import CreateRecipe from "./components/CreateRecipe";
import ScrollToTop from "./components/ScrollToTop";
import UserProfile from "./components/UserProfile";
import { RootState } from "./reducers/rootReducer";
const { connect } = require("react-redux");

const Main = styled.main`
  max-width: 900px;
  margin: auto;
`;
function App(props: { uid: string }) {
  return (
    <Router>
      <ScrollToTop/>
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            {props.uid ? (
              <Redirect to={`/userpage/${props.uid}`} />
            ) : (
              <AllRecipesPage />
            )}
          </Route>
          <Route path="/login" component={Auth} />
          <Route path="/publicpage" component={AllRecipesPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/recipedetail/:id" component={RecipeDetail} />
          <Route path="/userpage/:id" component={AllRecipesPage} />
          <Route path="/createrecipe" component={CreateRecipe} />
          <Route path="/user/:id" component={UserProfile} />
        </Switch>
      </Main>
      <Footer />
    </Router>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    displayName: state.userReducer.displayName,
    email: state.userReducer.email,
    uid: state.userReducer.uid,
  };
};

export default withRouter(connect(mapStateToProps)(App));
