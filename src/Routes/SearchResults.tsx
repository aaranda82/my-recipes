import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import RecipeCard from "../components/RecipeCard";
import { RootState } from "../reducers/rootReducer";

const Container = styled.div`
  padding: 20px;
  min-height: 80vh;
`;

const RecipesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 0;
  font-family: poppins;
  text-align: center;
`;

const SearchResults = () => {
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const { search } = useParams<{ search: string }>();
  const recipesFound: JSX.Element[] = [];
  let startingIndex = 0;
  for (const recipeId in recipes) {
    if (recipes[recipeId].name.toLowerCase().includes(search)) {
      const { description, name, createdBy } = recipes[recipeId];
      const index = startingIndex++;
      const RCProps = {
        description,
        name,
        recipeId,
        index,
        createdBy,
      };
      recipesFound.push(<RecipeCard key={index} {...RCProps} />);
    }
  }
  console.log(recipesFound);
  return (
    <Container>
      <Title>Search results for &quot;{search}&quot;</Title>
      <RecipesBox>{recipesFound}</RecipesBox>
    </Container>
  );
};

export default SearchResults;
