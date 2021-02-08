import firebase from "firebase";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SaveButton from "../components/SaveButton";
import SpinnerLoader from "../components/SpinnerLoader";
import { RootState } from "../reducers/rootReducer";
import { colorScheme } from "../styles/colorScheme";
import { styles } from "../styles/styles";

const { brownSugar, accentColorOne } = colorScheme;
const { primaryFont, secondaryFont } = styles;

const RecipeDetailDiv = styled.div`
  font-family: ${primaryFont};
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  line-height: 1.6;
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const Exit = styled.div`
  width: 10%
  z-index: 6;
  position: sticky;
  top: 20px;
  font-size: 2em;
  cursor: pointer;
`;

const Icon = styled.i`
  &:hover {
    color: black;
  }
`;

const Image = styled.img`
  min-height: 200px;
  width: 40%;
  background-color: ${brownSugar};
  @media (max-width: 400px) {
    display: none;
  }
`;

const RecipeHeading = styled.div`
  font-family: ${secondaryFont};
  width: 50%;
  text-align: center;
  padding-bottom: 20px;
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Author = styled.div`
  display: inline;
  &:hover {
    color: ${accentColorOne};
  }
`;

const Ingredients = styled.div`
  width: 100%;
  margin: 20px 0 0 20px;
  @media (max-width: 400px) {
    width: 100%;
    margin: 20px;
  }
`;

const Instructions = styled.div`
  width: 100%;
  margin-top: 20px;
  @media (max-width: 400px) {
    margin: 20px;
  }
`;

const Instruction = styled.div`
  margin-bottom: 20px 0 10px 20px;
`;

const OrderNumber = styled.div`
  border-bottom: 1px solid black;
  text-align: center;
  font-size: 25px;
`;

interface IRecipe {
  createdBy: string;
  name: string;
  category: string;
  description: string;
  image: string;
  servings: number;
  favoritedBy: string[];
  ingredients: string;
  instructions: string;
}

const RecipeDetail = (): ReactElement => {
  const [author, setAuthor] = useState("");
  const { uid, displayName } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const { id } = useParams<{ id: string }>();
  let foundRecipe: IRecipe | undefined;
  if (recipes) {
    foundRecipe = recipes[id];
  }

  const handleIngredients = (ing: string) => {
    const ingredientsList = ing.split("\n").map((i, index) => {
      return (
        <div key={index} style={{ marginTop: "15px" }}>
          {i}
        </div>
      );
    });
    return ingredientsList;
  };

  const handleInstructions = (inst: string) => {
    const instructionsList = inst.split("\n").map((i, index) => {
      return (
        <Instruction key={index}>
          <OrderNumber>{index + 1}</OrderNumber>
          <div style={{ marginLeft: "20px" }}>{i}</div>
        </Instruction>
      );
    });
    return instructionsList;
  };

  if (foundRecipe) {
    const {
      createdBy,
      name,
      category,
      servings,
      ingredients,
      instructions,
      description,
      image,
    } = foundRecipe;

    useEffect(() => {
      firebase
        .database()
        .ref(`users/${createdBy}/userName`)
        .once("value")
        .then((snapshot) => setAuthor(snapshot.val()));
    }, [createdBy]);
    return (
      <>
        <RecipeDetailDiv>
          <Image src={image} alt={name} />
          <RecipeHeading>
            <h1>{name}</h1>
            <div>{category}</div>
            <div>Servings: {servings}</div>
            <div>
              Author:{" "}
              <Link
                to={`/user/${createdBy}`}
                style={{ textDecoration: "none", color: "black" }}>
                <Author>{author}</Author>
              </Link>
            </div>
            <SaveButton recipeId={id} />
            <div>{description}</div>
          </RecipeHeading>
          <Exit id="Exit">
            <Link
              to={displayName ? `/userpage/${uid}` : "/publicpage"}
              style={{ color: accentColorOne }}>
              <Icon className="fas fa-times" />
            </Link>
          </Exit>
          <Ingredients>{handleIngredients(ingredients)}</Ingredients>
          <Instructions>{handleInstructions(instructions)}</Instructions>
        </RecipeDetailDiv>
      </>
    );
  }
  return <SpinnerLoader />;
};

export default RecipeDetail;
