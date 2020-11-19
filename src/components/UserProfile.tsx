import React from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import userData from "../data-users.json";
import recipeInfo from "../data-recipes.json";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";
import { Styles } from "../Styles";
import { ColorScheme } from "../ColorScheme";

const Return = styled.button`
  font-family: ${Styles.primaryFont};
  border: none;
  cursor: pointer;
  &:hover{
    color: ${ColorScheme.accentColorOne}
  }
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

function handleFavorites( favs: number[], uid: string ) {
  const favoriteRecipes = favs.map((f: number)=> {
    const fav = recipeInfo.filter((r: IRecipe)=> r.recipeId === f)
    return fav[0]
  })
  const allRecipes = favoriteRecipes.map((recipeData, index) => {
    const { recipeId, name } = recipeData;
    const RCProps = {
      name,
      recipeId,
      index,
      view: "public",
      uid,
    };
    return <RecipeCard key={index} {...RCProps} />;
  });
  console.log(favoriteRecipes)
  return allRecipes;
}

interface Users {
  uid: string;
  userName: string;
  favorites: number[];
}
function UserProfile(props: RouteComponentProps<{id: string}>) {
  console.log(props)
  const { id } = props.match.params
  const userInfo = userData.filter((u: Users)=> u.uid === id )
  return (
    <>
      <Return onClick={()=> {props.history.goBack()}}><i className={"fas fa-reply"}></i> RETURN</Return>
      <div>{userInfo[0].userName}</div>
      <div>{handleFavorites(userInfo[0].favorites, id)}</div>
    </>
  )
}

export default withRouter(UserProfile);