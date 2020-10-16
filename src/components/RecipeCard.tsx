import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import Lunch from "../assets/Lunch.jpg";
import isRecipeInFavs from "./isRecipeInFavs";

const { primaryColorTwo, gunmetal, accentColorOne } = ColorScheme;
const { mobileMaxWidth, primaryFont } = Styles;

const RContainer = styled.div`
  flex: 1 1 22%;
  margin: 10px;
  background-color: ${primaryColorTwo};
  height: auto;
  border: 1px solid lightgrey;

  @media screen and (max-width: 875px) {
    flex: 1 1 20%;
  }
  @media screen and (max-width: ${mobileMaxWidth}) {
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
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 40%;
  }
`;

const RInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-family: ${primaryFont};
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 60%;
  }
`;

interface RNProps {
  view: string;
}

const RName = styled.div<RNProps>`
  width: 100%;
  margin: ${(props) => (props.view !== "public" ? "20px 0" : "10px 0")};
  text-align: center;
  cursor: pointer;
`;

const SaveButtonCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const SaveButton = styled.button`
  padding: 5px 10px 5px 10px;
  border: 2px solid ${gunmetal};
  border-radius: 20px;
  background-color: ${primaryColorTwo};
  color: ${gunmetal};
  cursor: pointer;
  font-family: ${primaryFont};
  font-weight: 400;
  outline: none;
  &:hover {
    border: 2px solid ${accentColorOne};
    background-color: ${accentColorOne};
    color: ${primaryColorTwo};
  }
`;

const Icon = styled.i`
  margin-right: 5px;
  color: ${accentColorOne};
  ${SaveButton}:hover > & {
    color: ${primaryColorTwo};
  }
`;

function handleSaveButton(
  view: string,
  userLoggedIn: boolean,
  isInFavs: boolean
) {
  // && userLoggedIn && !isInFavs
  if (view === "public") {
    if (!userLoggedIn || (userLoggedIn && !isInFavs)) {
      return (
        <SaveButtonCont onClick={() => console.log("SAVED")}>
          <SaveButton>
            <Icon className="fas fa-star" />
            Save
          </SaveButton>
        </SaveButtonCont>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}

function RecipeCard(
  recipe: string,
  recipeId: number,
  createdBy: string,
  index: number,
  view: string,
  isLoggedIn: string
) {
  return (
    <RContainer id="RecipeCard" key={index}>
      <RImage src={Lunch} alt="Lunch" />
      <RInfoContainer>
        <RName view={view}>
          <Link
            to={`/recipedetail/:${recipeId}`}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            {recipe}
          </Link>
        </RName>
        {handleSaveButton(
          view,
          !!isLoggedIn,
          isRecipeInFavs(isLoggedIn, recipeId)
        )}
      </RInfoContainer>
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
      <RName view="blank"></RName>
    </RContainer>
  );
}

export default RecipeCard;
