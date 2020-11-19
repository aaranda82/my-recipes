import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import recipeData from "../data-recipes.json";
import userData from "../data-users.json";
import SaveButton from "./SaveButton";
import { RootState } from "../reducers/rootReducer";
import AuthModal from "./AuthModal";
const { connect } = require("react-redux");

const {
  brownSugar,
  accentColorOne,
} = ColorScheme;
const { primaryFont, secondaryFont } = Styles;

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
  &:hover{
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

const Number = styled.div`
  border-bottom: 1px solid black;
  text-align: center;
  font-size: 25px;
`;

interface IProps extends RouteComponentProps<{ id: string }> {
  c: () => void;
  recipe: {
    recipeId: number;
    name: string;
    category: string;
    servings: number;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: { number: number; instruction: string }[];
  };
  displayName: string;
  uid: string;
}
interface IState {
  recipeId: number;
  createdBy: string;
  name: string;
  category: string;
  servings: number;
  ingredients: { name: string; quantity: string; unit: string }[];
  instructions: { number: number; instruction: string }[];
  showAuth?: boolean;
}


class RecipeDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      recipeId: 0,
      createdBy: "",
      name: "",
      category: "",
      servings: 0,
      ingredients: [],
      instructions: [],
      showAuth: false,
    };
    this.handleAuthor = this.handleAuthor.bind(this);
    this.toggleAuthView = this.toggleAuthView.bind(this);
  }

  handleIngredients() {
    const ingredientsList = this.state.ingredients.map(
      (i: { name: string; quantity: string; unit: string }, index: number) => {
        return (
          <div key={index}>
            {i.quantity} {i.unit === "-" ? null : i.unit} {i.name}
          </div>
        );
      }
    );
    return ingredientsList;
  }

  handleInstructions() {
    const instructionsList = this.state.instructions.map(
      (i: { number: number; instruction: string }, key: number) => {
        return (
          <Instruction key={key}>
            {/* <strong>{i.number}.</strong> {i.instruction} */}
            <Number>{i.number}</Number>
            <div>{i.instruction}</div>
          </Instruction>
        );
      }
    );
    return instructionsList;
  }

  handleAuthor() {
    if (this.state.createdBy) {
      let user = userData.filter((u) => u.uid === this.state.createdBy);
      return user[0].userName;
    }
  }

  toggleAuthView() {
    this.setState({ showAuth: !this.state.showAuth })
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const idArr = id.split(":");
    let parsedId = parseFloat(idArr[1]);
    const recipeArr = recipeData.filter((r: IState) => {
      return r.recipeId === parsedId;
    });
    const {
      recipeId,
      createdBy,
      name,
      category,
      servings,
      ingredients,
      instructions,
    } = recipeArr[0];
    this.setState({
      recipeId,
      createdBy,
      name,
      category,
      servings,
      ingredients,
      instructions,
    });
  }

  render() {
    return (
      <>
      <RecipeDetailDiv>
      {AuthModal(this.state.showAuth, this.toggleAuthView, this.props.uid)}
        <Image></Image>
        <RecipeHeading>
          <h1>{this.state.name}</h1>
          <div>{this.state.category}</div>
          <div>Servings: {this.state.servings}</div>
          <div>Author: <Link to={`/user/${this.state.createdBy}`} style={{textDecoration: "none", color: "black"}}><Author>{this.handleAuthor()}</Author></Link></div>
          {SaveButton(this.props.uid, this.toggleAuthView, this.state.recipeId)}
        </RecipeHeading>
        <Exit id="Exit">
          <Link
            to={
              this.props.displayName
                ? `/userpage/${this.props.uid}`
                : "/publicpage"
            }
            style={{ color: accentColorOne }}
          >
            <Icon className="fas fa-times"></Icon>
          </Link>
        </Exit>
        <Ingredients>{this.handleIngredients()}</Ingredients>
        <Instructions>{this.handleInstructions()}</Instructions>
      </RecipeDetailDiv>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    displayName: state.userReducer.displayName,
    uid: state.userReducer.uid,
  };
};

export default withRouter(connect(mapStateToProps)(RecipeDetail));
