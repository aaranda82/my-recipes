import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import Lunch from "../assets/Lunch.jpg";

const { gunmetal, timberwolf } = ColorScheme;

const RecipeContainer = styled.div`
  flex: 1 1 22%;
  cursor: pointer;
  text-align: center;
  margin: 10px;
  background-color: ${timberwolf};
  height: auto;
  &:hover {
    transition: all ease 0.2s;
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${gunmetal};
  }
  @media (max-width: 500px) {
    width: 100%;
    flex: none;
    margin: 0 0 10px 0;
  }
`;

const RecipeImage = styled.img`
  height: auto;
  width: 100%;
  background-image: url(${Lunch});
  background-size: cover;
  background-position: center;
`;

const RecipeName = styled.div`
  font-weight: 600;
  margin: 5px;
`;

const SaveButton = styled.button`
  padding: 5px 10px 5px 10px;
  border-color: ${gunmetal};
  border-radius: 20px;
  background-color: ${timberwolf};
  color: ${gunmetal};
  margin: 10px;
  cursor: pointer;
  &:hover {
    border-color: none;
    background-color: ${gunmetal};
    color: ${timberwolf};
  }
`;

function RecipeCard(
  recipe: string,
  recipeId: number,
  index: number,
  view: string
) {
  return (
    <RecipeContainer id="RecipeCard" key={index}>
      <Link
        to={`/recipedetail/:${recipeId}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <RecipeImage src={Lunch} alt="Lunch" />
        <RecipeName>{recipe}</RecipeName>
        {view === "public" ? (
          <SaveButton>
            <i className="fas fa-heart" style={{ marginRight: "5px" }} />
            Save
          </SaveButton>
        ) : null}
      </Link>
    </RecipeContainer>
  );
}

export function BlankRecipeCard(index: number) {
  return (
    <RecipeContainer
      key={index}
      style={{
        visibility: "hidden",
        transition: "none",
      }}
    >
      <RecipeImage src={Lunch} alt="Lunch" />
      <RecipeName></RecipeName>
    </RecipeContainer>
  );
}

export default RecipeCard;
