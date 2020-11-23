import React from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import userData from "../data-users.json";
import recipeData from "../data-recipes.json";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";
import { Styles } from "../Styles";
import { ColorScheme } from "../ColorScheme";
import { RootState } from "../reducers/rootReducer";
import { handleRecipeArrayLength } from "./AllRecipesPage";

const { connect } = require("react-redux");

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
  console.log(favoriteRecipes)
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
    userCreatedRecipes.push(<RecipeCard key={x} {...RCProps} />)
    }
  } 
  return handleRecipeArrayLength(userCreatedRecipes);
}

interface Users {
  uid: string;
  userName: string;
  favorites: number[];
}

interface IProps extends RouteComponentProps<{id: string}> {
  uid: string;
}

function UserProfile(props: IProps) {
  let userIdToParse = props.match.params.id.split(":")
  const userToViewId = userIdToParse[1]
  const userToViewInfo = userData.filter((u: Users)=> u.uid === userToViewId)[0];
  const { userName, favorites } = userToViewInfo
  return (
    <>
      <Return onClick={()=> {props.history.goBack()}}><i className={"fas fa-reply"}></i> RETURN</Return>
      <Title>{userName}'s Favorites</Title>
      <RecipeContainer>{handleFavorites(favorites, props.uid)}</RecipeContainer>
      <Title>{userName}'s Recipes</Title>
      <RecipeContainer>{handleUserCreatedRecipes(userToViewId, props.uid)}</RecipeContainer>
    </>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    uid: state.userReducer.uid,
  }
}

export default withRouter(connect(mapStateToProps)(UserProfile));