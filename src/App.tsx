import firebase from "firebase";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import { recipeAction } from "./actions/recipeActions";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import { RootState } from "./reducers/rootReducer";
import AccountPage from "./Routes/AccountPage";
import AllRecipesPage from "./Routes/AllRecipesPage";
import CreateRecipe from "./Routes/CreateRecipe";
import RecipeDetail from "./Routes/RecipeDetail";
import SearchResults from "./Routes/SearchResults";
import UserProfile from "./Routes/UserProfile";
import { styles } from "./styles/styles";

const Main = styled.main<{ loggedIn: boolean }>`
  position: relative;
  top: ${(props) => (props.loggedIn ? "57px" : "75px")};
  max-width: 1000px;
  margin: auto;
  background: white;
  padding-bottom: 20px;
  @media screen and (max-width: ${styles.mobileMaxWidth}) {
    top: ${(props) => (props.loggedIn ? "44px" : "65px")};
  }
`;

const Container = styled.div`
  overflow: hidden;
  position: relative;
`;

function App(): ReactElement {
  const { uid } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const ref = firebase.database().ref("recipes/");
    ref.on("value", (snapshot) => {
      dispatch(recipeAction(snapshot.val()));
    });
    return () => ref.off();
  }, [dispatch]);

  return (
    <Container>
      <Router>
        <ScrollToTop />
        <Header />
        <Main loggedIn={!!uid}>
          <Switch>
            <Route exact path="/">
              {uid ? <Redirect to={`/userpage/${uid}`} /> : <AllRecipesPage />}
            </Route>
            <Route path="/publicpage" component={AllRecipesPage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/recipedetail/:id" component={RecipeDetail} />
            <Route path="/userpage/:id" component={AllRecipesPage} />
            <Route path="/createrecipe" component={CreateRecipe} />
            <Route path="/editrecipe/:id" component={CreateRecipe} />
            <Route path="/user/:id" component={UserProfile} />
            <Route path="/search/:search" component={SearchResults} />
          </Switch>
        </Main>
        <Footer />
      </Router>
    </Container>
  );
}

export default App;
