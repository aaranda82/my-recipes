import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import recipeData from "../data-recipes.json";

const { blueMunsell, cafeAuLait } = ColorScheme;

const RecipeDetailDiv = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
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

const Image = styled.div`
  min-height: 200px;
  width: 40%;
  background-color: ${cafeAuLait};
  @media (max-width: 400px) {
    display: none;
  }
`;

const RecipeHeading = styled.div`
  width: 95%;
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
  margin-top: 20px;
  @media (max-width: 400px) {
    margin: 20px;
  }
`;

const Instruction = styled.div`
  margin-bottom: 10px;
`;

interface IProps extends RouteComponentProps<{ id: string }> {
  c: () => void;
  recipe: {
    recipeId: number;
    recipe: string;
    category: string;
    servings: number;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: { number: number; instruction: string }[];
  };
}
interface IState {
  recipeId: number;
  recipe: string;
  category: string;
  servings: number;
  ingredients: { name: string; quantity: number; unit: string }[];
  instructions: { number: number; instruction: string }[];
}

class RecipeDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      recipeId: 0,
      recipe: "",
      category: "",
      servings: 0,
      ingredients: [],
      instructions: [],
    };
  }

  handleIngredients() {
    const ingredientsList = this.state.ingredients.map(
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
    const instructionsList = this.state.instructions.map(
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

  componentDidMount() {
    //get id from router params
    const { id } = this.props.match.params;
    const idArr = id.split(":");
    let parsedId = parseFloat(idArr[1]);
    // filter through recipes to match recipeId to params
    const recipeArr = recipeData.filter((r: IState) => {
      return r.recipeId === parsedId;
    });
    console.log(recipeArr[0]);
    const {
      recipeId,
      recipe,
      category,
      servings,
      ingredients,
      instructions,
    } = recipeArr[0];
    // save matching recipe to state
    this.setState({
      recipeId,
      recipe,
      category,
      servings,
      ingredients,
      instructions,
    });
  }

  render() {
    return (
      <RecipeDetailDiv>
        <RecipeHeading>
          <h1>{this.state.recipe}</h1>
          <div>{this.state.category}</div>
          <div>Servings: {this.state.servings}</div>
        </RecipeHeading>
        <Exit id="Exit">
          <Link
            to={"/publicpage"}
            style={{ textDecoration: "none", color: blueMunsell }}
          >
            <i className="fas fa-times"></i>
          </Link>
        </Exit>
        <Image></Image>
        <Ingredients>{this.handleIngredients()}</Ingredients>
        <Instructions>{this.handleInstructions()}</Instructions>
      </RecipeDetailDiv>
    );
  }
}

export default withRouter(RecipeDetail);
