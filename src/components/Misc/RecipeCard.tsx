import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ColorScheme } from "../../ColorScheme";
import { Styles } from "../../Styles";
import Lunch from "../../assets/Lunch.jpg";
import SaveButton from "./SaveButton";
import userData from "../../data-users.json";

const { primaryColorTwo, accentColorOne } = ColorScheme;
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
    display: flex;
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
  margin: ${(props) => (props.view !== "public" ? "20px 0" : "10px 0")};
  text-align: center;
  cursor: pointer;
  color: black;
  &:hover {
    color: ${accentColorOne};
  }
`;

interface IProps {
  name: string;
  recipeId: number;
  index: number;
  view: string;
  uid: string;
  createdBy: string;
}

function RecipeCard(props: IProps) {
  const { name, recipeId, index, view, createdBy } = props;
  return (
    <>
      <RContainer id="RecipeCard" key={index}>
        <RImage src={Lunch} alt="Lunch" />
        <RInfoContainer>
          <Link
            to={`/recipedetail/:${recipeId}`}
            style={{
              textDecoration: "none",
              width: "100%",
            }}
          >
            <RName view={view}>
              <strong>
                {name}
              </strong>
            </RName>
          </Link>
          <Link
            to={`/user/:${createdBy}`}
            style={{
              textDecoration: "none",
              width: "100%",
            }}
          >
            <RName view={view}>{userData.filter((u) => createdBy === u.uid)[0].userName}</RName>
          </Link>
          <SaveButton recipeId={recipeId} />
        </RInfoContainer>
      </RContainer>
    </>
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
