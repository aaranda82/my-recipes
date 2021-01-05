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

  const user_Data = [
    {
      uid: "1AOXgSwGE1eGQZgZQYo9vqVgqP12",
      userName: "Bill",
      favorites: ["1", "2", "3", "4"],
    },
    {
      uid: "SW1T9FNUxecYoDBv7IWqGil9lAW2",
      userName: "Mike",
      favorites: ["7", "8", "9", "10"],
    },
  ];

  const history = useHistory();
  const { uid } = useSelector((state: RootState) => state.userReducer);
  const { id } = useParams<{ id: string }>();
  const userToViewInfo = user_Data.find((u) => {
    return u.uid === id;
  });
  if (!userToViewInfo) {
    return null;
  }
  const { userName, favorites } = userToViewInfo;

  function handleUserCreatedRecipes() {
    console.log(recipes);
    const userCreatedRecipes: JSX.Element[] = [];
    for (let x = 0; x < recipes.length; x++) {
      if (recipes[x].createdBy === id) {
        const { name, recipeId, createdBy } = recipes[x];
        const RCProps = {
          name,
          recipeId,
          index: x,
          view: "public",
          uid,
          createdBy,
        };
        userCreatedRecipes.push(<RecipeCard key={x + 1000} {...RCProps} />);
      }
    }
    return handleRecipeArrayLength(userCreatedRecipes);
  }

  function handleFavorites() {
    let favoriteRecipes = [];
    if (recipes.length) {
      favoriteRecipes = favorites.map((f: string, index) => {
        const fav = recipes.filter((r) => r.recipeId === f);
        const { name, recipeId, createdBy } = fav[0];
        const RCProps = {
          name,
          recipeId,
          index,
          view: "public",
          uid,
          createdBy,
        };
        return <RecipeCard key={index} {...RCProps} />;
      });
    } else {
      return null;
    }

    return handleRecipeArrayLength(favoriteRecipes);
  }

  return recipes ? (
    <>
      <Return
        onClick={() => {
          history.goBack();
        }}>
        <i className={"fas fa-reply"} /> RETURN
      </Return>
      <Title>{userName}'s Favorites</Title>
      <RecipeContainer>{handleFavorites()}</RecipeContainer>
      <Title>{userName}'s Recipes</Title>
      <RecipeContainer>{handleUserCreatedRecipes()}</RecipeContainer>
    </>
  ) : (
    <SpinnerLoader />
  );
}

export default UserProfile;
