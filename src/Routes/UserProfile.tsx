import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";
import RecipeCard from "../components/RecipeCard";
import SpinnerLoader from "../components/SpinnerLoader";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles";
import { handleRecipeArrayLength } from "./AllRecipesPage";

const { primaryFont, secondaryFont, mobileMaxWidth } = styles;
const { accentColorOne } = colorScheme;

const Return = styled.button`
  font-family: ${primaryFont};
  border: none;
  cursor: pointer;
  &:hover {
    color: ${accentColorOne};
  }
`;

const Title = styled.div`
  font-family: ${secondaryFont};
  font-size: 30px;
  text-align: center;
  border-bottom: 1px solid black;
  @media screen and (max-width: ${mobileMaxWidth}) {
    font-size: 20px;
  }
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`;

function UserProfile() {
  const recipes = useSelector(
    (state: RootState) => state.recipeReducer.recipes,
  );
  const users = useSelector((state: RootState) => state.usersReducer.users);
  const history = useHistory();
  const { uid } = useSelector((state: RootState) => state.userReducer); // user that is logged in
  const { id } = useParams<{ id: string }>(); // user whose profile is being viewed

  function handleUserCreatedRecipes() {
    const userCreatedRecipes: JSX.Element[] = [];
    let startingIndex = 0;
    for (const recipeId in recipes) {
      if (recipes[recipeId].createdBy === id) {
        const index = startingIndex++;
        const { name, createdBy } = recipes[recipeId];
        const RCProps = {
          name,
          recipeId,
          index,
          view: "public",
          uid,
          createdBy,
        };
        userCreatedRecipes.push(<RecipeCard key={index + 1000} {...RCProps} />);
      }
    }
    return handleRecipeArrayLength(userCreatedRecipes);
  }

  function handleFavorites() {
    const favoriteRecipes: JSX.Element[] = [];
    let startingIndex = 0;
    for (const recipeId in recipes) {
      const favedBy = recipes[recipeId].favoritedBy;
      if (favedBy && favedBy.includes(id)) {
        const { name, createdBy } = recipes[recipeId];
        const index = startingIndex++;
        const RCProps = {
          name,
          recipeId,
          index,
          view: "public",
          uid,
          createdBy,
        };
        favoriteRecipes.push(<RecipeCard key={index + 10000} {...RCProps} />);
      }
    }
    return handleRecipeArrayLength(favoriteRecipes);
  }

  function userName() {
    return users[id].userName;
  }

  return recipes && users ? (
    <>
      <Return
        onClick={() => {
          history.goBack();
        }}>
        <i className={"fas fa-reply"} /> RETURN
      </Return>
      <Title>{`${userName()}'s Favorites`}</Title>
      <RecipeContainer>{handleFavorites()}</RecipeContainer>
      <Title>{`${userName()}'s Recipes  `}</Title>
      <RecipeContainer>{handleUserCreatedRecipes()}</RecipeContainer>
    </>
  ) : (
    <SpinnerLoader />
  );
}

export default UserProfile;
