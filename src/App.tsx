import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import AccountPage from "./components/AccountPage";
import AllRecipesPage from "./components/AllRecipesPage/AllRecipesPage";
import CreateRecipe from "./components/CreateRecipe";
import Footer from "./components/Misc/Footer";
import Header from "./components/Misc/Header";
import RecipeDetail from "./components/RecipeDetail";
import ScrollToTop from "./components/Misc/ScrollToTop";
import UserProfile from "./components/UserProfile";
import AuthModal from "./components/Misc/AuthModal";
import Menu from "./components/Misc/Menu";
import { RootState } from "./reducers/rootReducer";
const { useSelector } = require("react-redux");

const Main = styled.main`
  max-width: 900px;
  margin: auto;
`;
function App() {
  const props = useSelector((state: RootState) => state)
  const { uid } = props.userReducer;
  const { showLogIn, showSignUp, showMenu } = props.authReducer;
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            {uid ? (
              <Redirect to={`/userpage/${uid}`} />
            ) : (
              <AllRecipesPage />
            )}
          </Route>
          <Route path="/publicpage" component={AllRecipesPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/recipedetail/:id" component={RecipeDetail} />
          <Route path="/userpage/:id" component={AllRecipesPage} />
          <Route path="/createrecipe" component={CreateRecipe} />
          <Route path="/user/:id" component={UserProfile} />
        </Switch>
        { showLogIn || showSignUp || showMenu ? <AuthModal /> : false }
        <Menu />
      </Main>
      <Footer />
    </Router>
  );
}


export default App;
