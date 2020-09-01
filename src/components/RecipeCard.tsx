import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import Lunch from "../assets/Lunch.jpg";

const { gunmetal, timberwolf } = ColorScheme;

const RecipeContainer = styled.div`
  flex: 1 22%;
  cursor: pointer;
  text-align: center;
  margin: 10px;
  background-color: ${timberwolf};
  transition: all ease 0.2s;
  &:hover {
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
        {view === "public" ? <i className="fas fa-heart" /> : null}
      </Link>
    </RecipeContainer>
  );
}

export default RecipeCard;
