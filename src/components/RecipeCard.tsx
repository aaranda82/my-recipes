import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Lunch from "../assets/Lunch.jpg";
import { colorScheme } from "../colorScheme";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles";
import DeleteRecipeButton from "./DeleteRecipeButton";
import SaveButton from "./SaveButton";

const { primaryColorTwo, accentColorOne } = colorScheme;
const { mobileMaxWidth, primaryFont } = styles;

const RecipeContainerDiv = styled.div`
  width: 22%;
  margin: 10px;
  background-color: ${primaryColorTwo};
  height: auto;
  border: 1px solid lightgrey;
  padding-bottom: 5px;
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

const RecipeImageImg = styled.img`
  height: auto;
  width: 100%;
  background-image: url(${Lunch});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 40%;
  }
`;

const RecipeInfoContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-family: ${primaryFont};
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 60%;
  }
`;

const RecipeNameDiv = styled.div`
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  color: black;
  &:hover {
    color: ${accentColorOne};
  }
`;

const MoreInfoDiv = styled.div<{ width?: string }>`
  width: ${(props) => (props ? props.width : null)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IProps {
  name: string;
  recipeId: string;
  index: number;
  createdBy: string;
}

const RecipeCard = (props: IProps) => {
  const { name, recipeId, index, createdBy } = props;
  const { users }: any = useSelector((state: RootState) => state.usersReducer);

  let userName = "";
  if (users) {
    userName = users[createdBy].userName;
  }

  return (
    <>
      <RecipeContainerDiv id="RecipeCard" key={index}>
        <RecipeImageImg src={Lunch} alt="Lunch" />
        <RecipeInfoContainerDiv>
          <Link
            to={`/recipedetail/${recipeId}`}
            style={{
              textDecoration: "none",
              width: "100%",
            }}>
            <RecipeNameDiv>
              <strong>{name}</strong>
            </RecipeNameDiv>
          </Link>
          <Link
            to={`/user/${createdBy}`}
            style={{
              textDecoration: "none",
              width: "65%",
              height: "45px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <RecipeNameDiv>{userName}</RecipeNameDiv>
          </Link>

          <MoreInfoDiv width="35%">
            <SaveButton recipeId={recipeId} />
          </MoreInfoDiv>
          <DeleteRecipeButton recipeId={recipeId} />
        </RecipeInfoContainerDiv>
      </RecipeContainerDiv>
    </>
  );
};

export const BlankRecipeCard = (index: number) => {
  return (
    <RecipeContainerDiv
      key={index}
      style={{
        visibility: "hidden",
        transition: "none",
      }}>
      <RecipeImageImg src={Lunch} alt="Lunch" />
      <RecipeNameDiv></RecipeNameDiv>
    </RecipeContainerDiv>
  );
};

export default RecipeCard;
