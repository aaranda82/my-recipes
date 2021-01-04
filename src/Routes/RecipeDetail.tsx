import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";
import SaveButton from "../components/SaveButton";
import SpinnerLoader from "../components/SpinnerLoader";
import userData from "../data-users.json";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles";

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

const Image = styled.div`
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
  margin-bottom: 10px;
`;

const OrderNumber = styled.div`
  border-bottom: 1px solid black;
  text-align: center;
  font-size: 25px;
`;

interface IRecipe {
  recipeId: string;
  createdBy: string;
  name: string;
  category: string;
  servings: number;
  favoritedBy: string[];
  ingredients: { name: string; quantity: string; unit: string }[];
  instructions: { number: number; instruction: string }[];
}

const RecipeDetail = () => {
  const { uid, displayName } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const { id } = useParams<{ id: string }>();
  const idArr = id.split(":");
  let foundRecipe: IRecipe | undefined;
  if (recipes) {
    foundRecipe = recipes.find((r) => {
      return r.recipeId === idArr[1];
    });
  }

  const handleAuthor = (author: string) => {
    if (author) {
      const user = userData.filter((u) => u.uid === author);
      return user[0].userName;
    }
  };

  const handleIngredients = (
    ing: { name: string; quantity: string; unit: string }[],
  ) => {
    const ingredientsList = ing.map(
      (i: { name: string; quantity: string; unit: string }, index: number) => {
        return (
          <div key={index}>
            {i.quantity} {i.unit === "-" ? null : i.unit} {i.name}
          </div>
        );
      },
    );
    return ingredientsList;
  };

  const handleInstructions = (
    inst: { number: number; instruction: string }[],
  ) => {
    const instructionsList = inst.map(
      (i: { number: number; instruction: string }, key: number) => {
        return (
          <Instruction key={key}>
            <OrderNumber>{i.number}</OrderNumber>
            <div>{i.instruction}</div>
          </Instruction>
        );
      },
    );
    return instructionsList;
  };

  if (foundRecipe) {
    const {
      recipeId,
      createdBy,
      name,
      category,
      servings,
      ingredients,
      instructions,
    } = foundRecipe;

    return (
      <>
        <RecipeDetailDiv>
          <Image />
          <RecipeHeading>
            <h1>{name}</h1>
            <div>{category}</div>
            <div>Servings: {servings}</div>
            <div>
              Author:{" "}
              <Link
                to={`/user/${createdBy}`}
                style={{ textDecoration: "none", color: "black" }}>
                <Author>{handleAuthor(createdBy)}</Author>
              </Link>
            </div>
            <SaveButton recipeId={recipeId} />
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
  } else {
    return <SpinnerLoader />;
  }
};

export default RecipeDetail;
