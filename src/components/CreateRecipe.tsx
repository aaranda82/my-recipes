import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import { RootState } from "../reducers/rootReducer";

const { connect } = require("react-redux");

const { redOrange, honeyYellow, blueMunsell } = ColorScheme;
const { mobileMaxWidth, primaryFont, secondaryFont } = Styles;

const CRCont = styled.div`
  font-family: ${primaryFont};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80%;
  margin: auto;
  border: 1px solid ${honeyYellow};
  @media (max-width: ${mobileMaxWidth}) {
    width: 95%;
  }
`;

const AddRInfoCont = styled.div`
  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 10px;
`;

const InfoInput = styled.div`
  height: 100%;
  width: 30%;
  margin: auto;
  @media (max-width: ${mobileMaxWidth}) {
    width: 80%;
    height: unset;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  outline: none;
`;

const Label = styled.label`
  font-family: ${secondaryFont};
  margin-top: 10px;
  width: 100%;
  font-size: 15px;
`;

const Error = styled.div`
  font-family: ${primaryFont};
  margin-bottom: 10px;
  color: ${redOrange};
  width: 100%;
`;
const AddIngredientCont = styled.div`
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

interface IIProps {
  name?: string;
}

const IngredientInput = styled.div<IIProps>`
  width: ${(props) => (props.name === "NAME" ? "40%" : "15%")};
  height: 100%;
  margin: auto;
  @media (max-width: ${mobileMaxWidth}) {
    width: ${(props) => (props.name === "NAME" ? "80%" : "35%")};
    height: unset;
  }
`;

const ButtonCont = styled.div`
  width: 30;
  display: flex;
  justify-content: center;
  align-items: start;
  @media (max-width: ${mobileMaxWidth}) {
    width: 80%;
  }
`;

const AddIngButton = styled.button`
  font-family: ${primaryFont};
  border: none;
  width: 80%;
  cursor: pointer;
  background-color: ${redOrange};
  padding: 5px;
`;

const StateIngCont = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

interface ILProps {
  lineWidth: boolean;
}

const InputLine = styled.div<ILProps>`
  width: ${(props) => (props.lineWidth ? "100%" : "0")};
  height: 5px;
  background-color: ${blueMunsell};
  transition: width ease 0.5s;
`;

function HandleInputs(
  name: string,
  onChange: (e?: any) => void,
  value: string | number,
  validateName: () => void,
  error: string,
  onInputFocusIn: (e?: any) => void,
  onInputFocusOut: () => void,
  onFocus: string | null,
  type: string
) {
  return (
    <InfoInput>
      <Label>{name}</Label>
      <Input
        type={type}
        onChange={onChange}
        onBlur={() => {
          validateName();
          onInputFocusOut();
        }}
        value={value}
        onFocus={() => onInputFocusIn(name)}
      />
      <InputLine lineWidth={onFocus === name ? true : false}></InputLine>
      <Error>{error}</Error>
    </InfoInput>
  );
}

function handleIngredientsInputs(
  name: string,
  onChange: (e: any) => void,
  value: string,
  error: string,
  onBlur: () => void,
  onInputFocusIn: (e?: any) => void,
  onInputFocusOut: () => void,
  onFocus: string | null
) {
  return (
    <IngredientInput name={name}>
      <Label>{name}</Label>

      <Input
        type="text"
        onChange={onChange}
        value={value}
        onBlur={() => {
          onBlur();
          onInputFocusOut();
        }}
        onFocus={() => onInputFocusIn(name)}
      />
      <InputLine lineWidth={onFocus === name ? true : false}></InputLine>
      <Error>{error}</Error>
    </IngredientInput>
  );
}

interface IState {
  recipe: {
    recipeId: number;
    createdBy: string;
    name: string;
    category: string;
    servings: number;
    ingredients: { name: string; quantity: string; unit: string }[];
    instructions: { number: number; instruction: string }[];
  };
  ingredientToAdd: {
    name: string;
    quantity: string;
    unit: string;
  };
  onFocus: string | null;
  nameToAddError: string;
  quantityToAddError: string;
  unitToAddError: string;
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
      ingredientToAdd: {
        name: "",
        quantity: "",
        unit: "",
      },
      onFocus: null,
      nameToAddError: "",
      quantityToAddError: "",
      unitToAddError: "",
      nameError: "",
      servingsError: "",
      categoryError: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleServingsChange = this.handleServingsChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handelIngredientChange = this.handelIngredientChange.bind(this);
    this.handelQuantityChange = this.handelQuantityChange.bind(this);
    this.handelUnitChange = this.handelUnitChange.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateServings = this.validateServings.bind(this);
    this.validateCategory = this.validateCategory.bind(this);
    this.validateIngToAdd = this.validateIngToAdd.bind(this);
    this.validateQuantityToAdd = this.validateQuantityToAdd.bind(this);
    this.validateUnitToAdd = this.validateUnitToAdd.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.onInputFocusIn = this.onInputFocusIn.bind(this);
    this.onInputFocusOut = this.onInputFocusOut.bind(this);
  }

  onInputFocusIn(onFocus: any) {
    this.setState({ onFocus });
  }

  onInputFocusOut() {
    this.setState({ onFocus: null });
  }

  deleteIng(index: number) {
    const { recipe } = { ...this.state };
    recipe.ingredients.splice(index, 1);
    this.setState({ recipe });
  }

  handleStateIngredients() {
    if (this.state.recipe.ingredients.length > 0) {
      const ingredients = this.state.recipe.ingredients.map((r, index) => {
        const { name, quantity, unit } = r;
        return (
          <>
            <i
              className="fas fa-times"
              style={{
                cursor: "pointer",
                color: redOrange,
                marginRight: "10px",
              }}
              onClick={() => this.deleteIng(index)}
            />
            <div
              key={index}
              style={{
                width: "50%",
                margin: "10px 0",
              }}
            >
              {quantity} {unit === "-" ? null : unit} {name}{" "}
            </div>
          </>
        );
      });
      return ingredients;
    } else {
      return (
        <div style={{ margin: "10px 0" }}>
          Add an ingredient <i className="fas fa-arrow-down" />
        </div>
      );
    }
  }

  handleNameChange(e: any) {
    e.preventDefault();
    const recipe = { ...this.state.recipe };
    recipe.name = e.target.value;
    recipe.createdBy = this.props.displayName;
    this.setState({ recipe }, () => this.validateName());
  }

  handleServingsChange(e: any) {
    e.preventDefault();
    const recipe = { ...this.state.recipe };
    recipe.servings = e.target.value;
    this.setState({ recipe }, () => this.validateServings());
  }

  handleCategoryChange(e: any) {
    e.preventDefault();
    const recipe = { ...this.state.recipe };
    recipe.category = e.target.value;
    this.setState({ recipe }, () => this.validateCategory());
  }

  handelIngredientChange(e: any) {
    e.preventDefault();
    const { ingredientToAdd } = { ...this.state };
    ingredientToAdd.name = e.target.value;
    this.setState({ ingredientToAdd }, () => this.validateIngToAdd());
  }

  handelQuantityChange(e: any) {
    e.preventDefault();
    const { ingredientToAdd } = { ...this.state };
    ingredientToAdd.quantity = e.target.value;
    this.setState({ ingredientToAdd }, () => this.validateQuantityToAdd());
  }

  handelUnitChange(e: any) {
    e.preventDefault();
    const { ingredientToAdd } = { ...this.state };
    ingredientToAdd.unit = e.target.value;
    this.setState({ ingredientToAdd }, () => this.validateUnitToAdd());
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

  validateIngToAdd() {
    if (this.state.ingredientToAdd.name.length < 2) {
      this.setState({ nameToAddError: "Name is too short" });
    } else {
      this.setState({ nameToAddError: "" });
    }
  }

  validateQuantityToAdd() {
    if (this.state.ingredientToAdd.quantity.length < 1) {
      this.setState({ quantityToAddError: "Quantity requred" });
    } else {
      this.setState({ quantityToAddError: "" });
    }
  }

  validateUnitToAdd() {
    if (this.state.ingredientToAdd.unit.length < 1) {
      this.setState({ unitToAddError: `Unit required, if none use "-"` });
    } else {
      this.setState({ unitToAddError: "" });
    }
  }

  addIngredient() {
    const { nameToAddError, quantityToAddError, unitToAddError } = this.state;
    if (!nameToAddError || !quantityToAddError || !unitToAddError) {
      const { recipe } = { ...this.state };
      recipe.ingredients.push(this.state.ingredientToAdd);
      this.setState({
        recipe,
        ingredientToAdd: {
          name: "",
          quantity: "",
          unit: "",
        },
      });
    }
  }

  render() {
    return (
      <CRCont id="create recipe cont">
        <AddRInfoCont id="recipe info cont">
          {HandleInputs(
            "RECIPE NAME",
            this.handleNameChange,
            this.state.recipe.name,
            this.validateName,
            this.state.nameError,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus,
            "text"
          )}
          {HandleInputs(
            "SERVINGS",
            this.handleServingsChange,
            this.state.recipe.servings,
            this.validateServings,
            this.state.servingsError,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus,
            "number"
          )}
          {HandleInputs(
            "CATEGORY",
            this.handleCategoryChange,
            this.state.recipe.category,
            this.validateCategory,
            this.state.categoryError,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus,
            "text"
          )}
        </AddRInfoCont>
        <StateIngCont>{this.handleStateIngredients()}</StateIngCont>
        <AddIngredientCont>
          {handleIngredientsInputs(
            "NAME",
            this.handelIngredientChange,
            this.state.ingredientToAdd.name,
            this.state.nameToAddError,
            this.validateIngToAdd,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus
          )}
          {handleIngredientsInputs(
            "QUANTITY",
            this.handelQuantityChange,
            this.state.ingredientToAdd.quantity,
            this.state.quantityToAddError,
            this.validateQuantityToAdd,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus
          )}
          {handleIngredientsInputs(
            "UNIT",
            this.handelUnitChange,
            this.state.ingredientToAdd.unit,
            this.state.unitToAddError,
            this.validateUnitToAdd,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus
          )}
          <ButtonCont>
            <AddIngButton onClick={this.addIngredient}>
              ADD INGREDIENT
            </AddIngButton>
          </ButtonCont>
        </AddIngredientCont>
        <StateIngCont>Instructions</StateIngCont>
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
