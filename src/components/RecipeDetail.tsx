import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const RecipeDetailDiv = styled.div`
  margin-top: 99px;
  width: 70%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

const Exit = styled.div`
  position: absolute;
  right: 3%;
  font-size: 2em;
  cursor: pointer;
  color: ${ColorScheme.blueMunsell};
`;

const Image = styled.div`
  height: auto;
  width: 40%;
  background-color: ${ColorScheme.budGreen};
`;

const RecipeHeading = styled.div`
  width: 100%;
`;

const Recipe = styled.h1`
  text-align: center;
`;

const Category = styled.div`
  text-align: center;
`;

const Servings = styled.div`
  text-align: center;
`;

const Ingredients = styled.div`
  width: 60%;
`;

const Instructions = styled.div`
  width: 100%;
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
            <div key={key}>
              {i.quantity} {i.name}
            </div>
          );
        } else {
          return (
            <div key={key}>
              {i.quantity} {i.unit} {i.name}
            </div>
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
          <div key={key}>
            {i.number}. {i.instruction}
          </div>
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
          <Recipe>{recipe}</Recipe>
          <Category>{category}</Category>
          <Servings>Servings: {servings}</Servings>
        </RecipeHeading>
        <Image></Image>
        <Ingredients>{this.handleIngredients()}</Ingredients>
        <Instructions>{this.handleInstructions()}</Instructions>
      </RecipeDetailDiv>
    );
  }
}

export default RecipeDetail;
