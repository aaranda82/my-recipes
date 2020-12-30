import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";
import RecipeCard from "../components/RecipeCard";
import recipeData from "../data-recipes.json";
import userData from "../data-users.json";
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

interface IRecipe {
  recipeId: number;
  createdBy: string;
  name: string;
  category: string;
  servings: number;
  ingredients: { name: string; quantity: string; unit: string }[];
  instructions: { number: number; instruction: string }[];
  showAuth?: boolean;
}

function handleFavorites(favs: number[], uid: string) {
  // uid of user logged in or ""
  const favoriteRecipes = favs.map((f: number, index) => {
    const fav = recipeData.filter((r: IRecipe) => r.recipeId === f);
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
  return handleRecipeArrayLength(favoriteRecipes);
}

function handleUserCreatedRecipes(userToViewId: string, uid: string) {
  const userCreatedRecipes: JSX.Element[] = [];
  for (let x = 0; x < recipeData.length; x++) {
    if (recipeData[x].createdBy === userToViewId) {
      const { name, recipeId, createdBy } = recipeData[x];
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

interface Users {
  uid: string;
  userName: string;
  favorites: number[];
}

function UserProfile() {
  const history = useHistory();
  const { uid } = useSelector((state: RootState) => state.userReducer);
  const { id } = useParams<{ id: string }>();
  const userToViewInfo = userData.find((u: Users) => {
    return u.uid === id;
  });
  if (!userToViewInfo) {
    return null;
  }
  const { userName, favorites } = userToViewInfo;
  return (
    <>
      <Return
        onClick={() => {
          history.goBack();
        }}>
        <i className={"fas fa-reply"} /> RETURN
      </Return>
      <Title>{userName}'s Favorites</Title>
      <RecipeContainer>{handleFavorites(favorites, uid)}</RecipeContainer>
      <Title>{userName}'s Recipes</Title>
      <RecipeContainer>{handleUserCreatedRecipes(id, uid)}</RecipeContainer>
    </>
  );
}

export default UserProfile;
