import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const { blueMunsell, budGreen, bittersweet } = ColorScheme;

const RecipeDetailDiv = styled.div`
  margin-top: 99px;
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const Exit = styled.div`
  position: absolute;
  right: 3%;
  font-size: 2em;
  cursor: pointer;
  color: ${blueMunsell};
`;

const Image = styled.div`
  height: auto;
  width: 40%;
  background-color: ${budGreen};
  @media (max-width: 400px) {
    display: none;
  }
`;

const RecipeHeading = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
`;

const Ingredients = styled.div`
  width: 60%;
  @media (max-width: 400px) {
    width: 100%;
    margin: 20px;
  }
`;

const Ingredient = styled.div`
  margin-left: 10px;
  @media (max-width: 400px) {
    margin: 0;
  }
`;

const Instructions = styled.div`
  width: 100%;
  @media (max-width: 400px) {
    margin: 20px;
  }
`;

const Instruction = styled.div`
  margin-bottom: 10px;
`;

interface RecipeDetailProps {
  c: () => void;
  recipe: {
    recipe: string;
    category: string;
    servings: number;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: { number: number; instruction: string }[];
  };
}

class RecipeDetail extends Component<RecipeDetailProps> {
  handleIngredients() {
    const ingredientsList = this.props.recipe.ingredients.map(
      (i: { name: string; quantity: number; unit: string }, key: number) => {
        if (i.unit === "-") {
          return (
            <Ingredient key={key}>
              {i.quantity} {i.name}
            </Ingredient>
          );
        } else {
          return (
            <Ingredient key={key}>
              {i.quantity} {i.unit} {i.name}
            </Ingredient>
          );
        }
      }
    );
    return ingredientsList;
  }

  handleInstructions() {
    const instructionsList = this.props.recipe.instructions.map(
      (i: { number: number; instruction: string }, key: number) => {
        return (
          <Instruction key={key}>
            <strong>{i.number}.</strong> {i.instruction}
          </Instruction>
        );
      }
    );
    return instructionsList;
  }

  render() {
    const { recipe, category, servings } = this.props.recipe;
    return (
      <RecipeDetailDiv>
        <Exit
          id="Exit"
          className="fas fa-times"
          onClick={() => this.props.c()}
        />
        <RecipeHeading>
          <h1>{recipe}</h1>
          <div>{category}</div>
          <div>Servings: {servings}</div>
        </RecipeHeading>
        <Image></Image>
        <Ingredients>{this.handleIngredients()}</Ingredients>
        <Instructions>{this.handleInstructions()}</Instructions>
      </RecipeDetailDiv>
    );
  }
}

export default RecipeDetail;
