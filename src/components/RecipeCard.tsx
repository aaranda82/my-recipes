import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import Lunch from "../assets/Lunch.jpg";

const { gunmetal, ivory } = ColorScheme;

const RecipeContainer = styled.div`
  flex: 1 1 22%;
  cursor: pointer;
  text-align: center;
  margin: 10px;
  background-color: ${ivory};
  height: auto;
  &:hover {
    transition: all ease 0.2s;
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${gunmetal};
  }
  @media (max-width: ${process.env.REACT_APP_MOBILE_MAX_WIDTH}px) {
    width: 90%;
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
  @media (max-width: ${process.env.REACT_APP_MOBILE_MAX_WIDTH}px) {
    width: 40%;
  }
`;

const RecipeInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${process.env.REACT_APP_MOBILE_MAX_WIDTH}px) {
    width: 60%;
  }
`;

const RecipeName = styled.div`
  width: 100%;
  font-weight: 600;
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 5px 10px 5px 10px;
  border: 2px solid ${gunmetal};
  border-radius: 20px;
  background-color: ${ivory};
  color: ${gunmetal};
  cursor: pointer;
  &:hover {
    background-color: ${gunmetal};
    color: ${ivory};
  }
`;

function RecipeCard(
  recipe: string,
  recipeId: number,
  createdBy: string,
  index: number,
  view: string
) {
  return (
    <RecipeContainer id="RecipeCard" key={index}>
      <Link
        to={`/recipedetail/:${recipeId}`}
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <RecipeImage src={Lunch} alt="Lunch" />
        <RecipeInfoContainer>
          <RecipeName>{recipe}</RecipeName>
          {view === "public" ? (
            <SaveButton>
              <i className="fas fa-star" style={{ marginRight: "5px" }} />
              Save
            </SaveButton>
          ) : null}
        </RecipeInfoContainer>
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
