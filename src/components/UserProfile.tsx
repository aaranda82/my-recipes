import React from 'react';
import { useParams, useHistory } from "react-router";
import userData from "../data-users.json";
import recipeData from "../data-recipes.json";
import RecipeCard from "./Misc/RecipeCard";
import styled from "styled-components";
import { Styles } from "../Styles";
import { ColorScheme } from "../ColorScheme";
import { RootState } from "../reducers/rootReducer";
import { handleRecipeArrayLength } from "./AllRecipesPage/AllRecipesPage";

const { useSelector } = require("react-redux");

const Return = styled.button`
  font-family: ${Styles.primaryFont};
  border: none;
  cursor: pointer;
  &:hover{
    color: ${ColorScheme.accentColorOne}
  }
`;

const Title = styled.div`
  font-family: ${Styles.secondaryFont};
  font-size: 30px;
  text-align: center;
  border-bottom: 1px solid black;
  @media screen and (max-width: ${Styles.mobileMaxWidth}) {
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

function handleFavorites( favs: number[], uid: string ) { //uid of user logged in or ""
  const favoriteRecipes = favs.map((f: number, index)=> {
    const fav = recipeData.filter((r: IRecipe)=> r.recipeId === f)
    const { name, recipeId, createdBy } = fav[0]
    const RCProps = {
      name,
      recipeId,
      index,
      view: "public",
      uid,
      createdBy
    };
    return <RecipeCard key={index} {...RCProps} />
  })
  return handleRecipeArrayLength(favoriteRecipes);
}

function handleUserCreatedRecipes(userToViewId: string, uid: string) {
  let userCreatedRecipes: JSX.Element[] = []
  for(let x = 0; x < recipeData.length; x++) {
    if(recipeData[x].createdBy === userToViewId) {
      const { name, recipeId, createdBy } = recipeData[x]
      const RCProps = {
        name,
        recipeId,
        index: x,
        view: "public",
        uid,
        createdBy,
      };
    userCreatedRecipes.push(<RecipeCard key={x + 1000} {...RCProps} />)
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
  const history = useHistory()
  const { uid } = useSelector((state: RootState) => state.userReducer.uid)
  const { id } = useParams<{id: string}>();
  const parsedId = id.split(":")[1]
  const userToViewInfo = userData.filter((u: Users)=> {
    return u.uid === parsedId
  })[0];
  const { userName, favorites } = userToViewInfo
  return (
    <>
      <Return onClick={()=> {history.goBack()}}><i className={"fas fa-reply"}></i> RETURN</Return>
      <Title>{userName}'s Favorites</Title>
      <RecipeContainer>{handleFavorites(favorites, uid)}</RecipeContainer>
      <Title>{userName}'s Recipes</Title>
      <RecipeContainer>{handleUserCreatedRecipes(parsedId, uid)}</RecipeContainer>
    </>
  )
}

export default UserProfile;