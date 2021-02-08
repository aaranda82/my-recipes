import firebase from "firebase";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../reducers/rootReducer";
import { colorScheme } from "../styles/colorScheme";
import { styles } from "../styles/styles";
import ModifyRecipeButtons from "./ModifyRecipeButtons";
import SaveButton from "./SaveButton";

const { accentColorOne } = colorScheme;
const { mobileMaxWidth, primaryFont } = styles;

const Container = styled.div<{ vis?: string; tran?: string }>`
  max-width: 220px;
  margin: 10px;
  height: auto;
  border: 1px solid lightgrey;
  padding-bottom: 5px;
  visibility: ${(props) => props.vis};
  transition: ${(props) => props.tran};
  @media screen and (max-width: ${mobileMaxWidth}) {
    display: flex;
    width: 90%;
    margin: 0 0 10px 0;
    max-width: unset;
    padding: 0;
  }
`;

const Image = styled.img`
  height: 220px;
  width: 220px;
  @media screen and (max-width: ${mobileMaxWidth}) {
    height: 140px;
    width: 140px;
  }
`;

const Info = styled.div`
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

const Description = styled.div`
  height: 40px;
  width: 100%;
  padding: 0 10px;
  font-size: 15px;
  text-align: center;
`;

const Name = styled.div`
  height: 40px;
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
  description: string;
}

const RecipeCard = (props: IProps): ReactElement => {
  const { name, recipeId, index, createdBy, description } = props;
  const [userName, setUserName] = useState("");
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);

  useEffect(() => {
    firebase
      .database()
      .ref(`users/${createdBy}/userName`)
      .once("value")
      .then((snapshot) => {
        setUserName(snapshot.val());
      });
  }, [createdBy, setUserName]);

  const handleDescription = () => {
    if (description.length > 40) {
      let desc = description.slice(0, 40);
      desc += "...";
      return desc;
    }
    return description;
  };

  return (
    <>
      <Container id="RecipeCard" key={index}>
        <Image src={recipes[recipeId].image} alt={name} />
        <Info>
          <Link
            to={`/recipedetail/${recipeId}`}
            style={{
              textDecoration: "none",
              width: "100%",
            }}>
            <Name>
              <strong>{name}</strong>
            </Name>
          </Link>
          <Description>{handleDescription()}</Description>
          <Link
            to={`/user/${createdBy}`}
            style={{
              textDecoration: "none",
              width: "65%",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Name>{userName}</Name>
          </Link>
          <MoreInfoDiv width="35%">
            <SaveButton recipeId={recipeId} />
          </MoreInfoDiv>
          <ModifyRecipeButtons recipeId={recipeId} />
        </Info>
      </Container>
    </>
  );
};

export const BlankRecipeCard = (index: number): ReactElement => {
  return (
    <Container vis="hidden" tran="none" key={index}>
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/my-recipes-da233.appspot.com/o/SW1T9FNUxecYoDBv7IWqGil9lAW2%2FScrammbled%20Eggs-1612210399523?alt=media&token=ba4cb282-2b6d-481d-a5c2-5587ebf705e8"
        alt="Lunch"
      />
      <Name />
    </Container>
  );
};

export default RecipeCard;
