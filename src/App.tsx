import firebase from "firebase";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import { recipeAction } from "./actions/recipeActions";
import { usersAction } from "./actions/usersAction";
import AuthModal from "./components/AuthModal";
import Menu from "./components/Menu";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import { RootState } from "./reducers/rootReducer";
import AccountPage from "./Routes/AccountPage";
import AllRecipesPage from "./Routes/AllRecipesPage";
import CreateRecipe from "./Routes/CreateRecipe";
import RecipeDetail from "./Routes/RecipeDetail";
import UserProfile from "./Routes/UserProfile";

const Main = styled.main`
  max-width: 900px;
  margin: auto;
`;

function App() {
  const { showLogIn, showSignUp, showMenu } = useSelector(
    (state: RootState) => state.authReducer,
  );
  const { uid } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  firebase
    .database()
    .ref("/")
    .on("value", (snapshot) => {
      dispatch(recipeAction(snapshot.val().recipes));
      dispatch(usersAction(snapshot.val().users));
    });

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
      }}>
      <Router>
        <ScrollToTop />
        <Header />
        <Main>
          <Switch>
            <Route exact path="/">
              {uid ? <Redirect to={`/userpage/${uid}`} /> : <AllRecipesPage />}
            </Route>
            <Route path="/publicpage" component={AllRecipesPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/recipedetail/:id" component={RecipeDetail} />
            <Route path="/userpage/:id" component={AllRecipesPage} />
            <Route path="/createrecipe" component={CreateRecipe} />
            <Route path="/user/:id" component={UserProfile} />
          </Switch>
          {showLogIn || showSignUp || showMenu ? <AuthModal /> : false}
          <Menu />
        </Main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
