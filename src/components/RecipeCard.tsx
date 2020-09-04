import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import Lunch from "../assets/Lunch.jpg";

const { gunmetal, ivory } = ColorScheme;

const RContainer = styled.div`
  flex: 1 1 22%;
  cursor: pointer;
  margin: 10px;
  background-color: ${ivory};
  height: auto;
  border-radius: 10px;
  &:hover {
    transition: all ease 0.2s;
    transform: scale(1.1);
    box-shadow: 15px 10px 10px ${gunmetal};
  }
  @media (max-width: 875px) {
    flex: 1 1 20%;
  }
  @media (max-width: ${process.env.REACT_APP_MOBILE_MAX_WIDTH}px) {
    width: 90%;
    flex: none;
    margin: 0 0 10px 0;
  }
`;

const RImage = styled.img`
  height: auto;
  width: 100%;
  background-image: url(${Lunch});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  @media (max-width: ${process.env.REACT_APP_MOBILE_MAX_WIDTH}px) {
    width: 40%;
  }
`;

const RInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${process.env.REACT_APP_MOBILE_MAX_WIDTH}px) {
    width: 60%;
  }
`;

const RName = styled.div`
  width: 100%;
  font-weight: 600;
  margin: 10px 0 10px 10px;
`;

const RButtonContainer = styled.div`
  width: 100%;
  margin: 0 0 10px 10px;
`;

const SaveButton = styled.button`
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
    <RContainer id="RecipeCard" key={index}>
      <Link
        to={`/recipedetail/:${recipeId}`}
        style={{
          textDecoration: "none",
          color: "black",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <RImage src={Lunch} alt="Lunch" />
        <RInfoContainer>
          <RName>{recipe}</RName>
          {view === "public" ? (
            <RButtonContainer>
              <SaveButton>
                <i className="fas fa-star" style={{ marginRight: "5px" }} />
                Save
              </SaveButton>
            </RButtonContainer>
          ) : null}
        </RInfoContainer>
      </Link>
    </RContainer>
  );
}

export function BlankRecipeCard(index: number) {
  return (
    <RContainer
      key={index}
      style={{
        visibility: "hidden",
        transition: "none",
      }}
    >
      <RImage src={Lunch} alt="Lunch" />
      <RName></RName>
    </RContainer>
  );
}

export default RecipeCard;
