import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { RootState } from "../reducers/rootReducer";

const { connect } = require("react-redux");

const { redOrange, honeyYellow } = ColorScheme;
const MAX_WIDTH = process.env.REACT_APP_MOBILE_MAX_WIDTH;

const CRCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
  margin: auto;
  background-color: ${honeyYellow};
  @media (max-width: ${MAX_WIDTH}px) {
    width: 95%;
  }
`;

const RInfoCont = styled.div`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const InfoInput = styled.div`
  width: 30%;
  margin: auto;
  @media (max-width: ${MAX_WIDTH}px) {
    width: 80%;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
`;

const Label = styled.label`
  margin-top: 10px;
  width: 100%;
  font-size: 15px;
`;

const Error = styled.div`
  margin-bottom: 10px;
  color: ${redOrange};
  width: 100%;
`;
const IngredientsCont = styled.div`
  width: 100%;
  display: flex;
`;

// interface IIProps {
//   name?: string;
// }

// const IngredientInput = styled.div<IIProps>`
//   width: ${(props) => (props.name === "name" ? "50%" : "20%")};
//   display: flex;
//   flex-wrap: wrap;
//   margin: auto;
// `;

function HandleInputs(
  name: string,
  onChange: (e?: any) => void,
  value: string | number,
  validateName: () => void,
  error: string,
  type: string
) {
  return (
    <InfoInput>
      <Label>{name}</Label>
      <Input
        type={type}
        onChange={onChange}
        onBlur={validateName}
        value={value}
      />
      <Error>{error}</Error>
    </InfoInput>
  );
}

interface HIIProps {
  nameChange: (e: any) => void;
}

// function handleIngredientsInputs(
//   name: string,
//   onChange: (e: any) => void,
//   value: string
// ) {
//   return (
//     <IngredientInput name={name}>
//       <Label>{name}</Label>
//       <Input type="text" onChange={onChange} value={value} />
//       <Error>Error</Error>
//     </IngredientInput>
//   );
// }

interface IState {
  recipe: {
    recipeId: number;
    createdBy: string;
    name: string;
    category: string;
    servings: number;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: { number: number; instruction: string }[];
  };
  nameError: string;
  servingsError: string;
  categoryError: string;
}

class CreateRecipe extends Component<{ displayName: string }, IState> {
  constructor(props: { displayName: string }) {
    super(props);
    this.state = {
      recipe: {
        recipeId: 0,
        createdBy: "",
        name: "",
        category: "",
        servings: 0,
        ingredients: [],
        instructions: [],
      },
      nameError: "",
      servingsError: "",
      categoryError: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleServingsChange = this.handleServingsChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateServings = this.validateServings.bind(this);
    this.validateCategory = this.validateCategory.bind(this);
  }

  handleStateIngredients() {
    if (this.state.recipe.ingredients.length > 0) {
      const ingredients = this.state.recipe.ingredients.map((r) => {
        const { name, quantity, unit } = r;
        return (
          <div>
            {quantity} {unit === "-" ? null : unit} {name}
          </div>
        );
      });
      return ingredients;
    }
  }

  handleNameChange(e: any) {
    e.preventDefault();
    const recipe = { ...this.state.recipe };
    recipe.name = e.target.value;
    recipe.createdBy = this.props.displayName;
    this.setState({ recipe });
  }

  handleServingsChange(e: any) {
    e.preventDefault();
    const recipe = { ...this.state.recipe };
    recipe.servings = e.target.value;
    this.setState({ recipe });
  }

  handleCategoryChange(e: any) {
    e.preventDefault();
    const recipe = { ...this.state.recipe };
    recipe.category = e.target.value;
    this.setState({ recipe });
  }

  validateName() {
    if (this.state.recipe.name.length < 2) {
      this.setState({
        nameError: "Not enough letters!",
      });
    } else {
      this.setState({ nameError: "" });
    }
  }

  validateServings() {
    if (this.state.recipe.servings <= 0) {
      this.setState({ servingsError: "Too low!" });
    } else {
      this.setState({ servingsError: "" });
    }
  }

  validateCategory() {
    if (this.state.recipe.category.length < 3) {
      this.setState({
        categoryError: "Not enough letters!",
      });
    } else {
      this.setState({ categoryError: "" });
    }
  }
  render() {
    return (
      <CRCont id="create recipe cont">
        <RInfoCont id="recipe info cont">
          {HandleInputs(
            "RECIPE NAME",
            this.handleNameChange,
            this.state.recipe.name,
            this.validateName,
            this.state.nameError,
            "text"
          )}
          {HandleInputs(
            "SERVINGS",
            this.handleServingsChange,
            this.state.recipe.servings,
            this.validateServings,
            this.state.servingsError,
            "number"
          )}
          {HandleInputs(
            "CATEGORY",
            this.handleCategoryChange,
            this.state.recipe.category,
            this.validateCategory,
            this.state.categoryError,
            "text"
          )}
        </RInfoCont>
        {this.handleStateIngredients()}
        <IngredientsCont>
          <button>ADD INGREDIENT</button>
        </IngredientsCont>
      </CRCont>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    displayName: state.userReducer.displayName,
  };
};

export default connect(mapStateToProps)(CreateRecipe);
