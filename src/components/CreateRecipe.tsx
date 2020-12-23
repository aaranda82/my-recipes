import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { RootState } from "../reducers/rootReducer";
import { Styles } from "../Styles";

const { accentColorOne, primaryColorTwo, primaryColorOne } = ColorScheme;
const { mobileMaxWidth, primaryFont, secondaryFont } = Styles;

const CRCont = styled.div`
  font-family: ${primaryFont};
  display: flex;
  flex-wrap: wrap;
`;

const AddRInfoCont = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 10px;
`;

const InfoInput = styled.div`
  height: 100%;
  width: 30%;
  @media (max-width: ${mobileMaxWidth}) {
    width: 80%;
    height: unset;
  }
`;

const Input = styled.input`
  width: 90%;
  outline: none;
  border: 1px solid lightgrey;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 90%;
  outline: none;
  border: 1px solid lightgrey;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-family: ${secondaryFont};
  margin-top: 10px;
  display: block;
  font-size: 15px;
`;

const Error = styled.div`
  font-family: ${primaryFont};
  margin-bottom: 10px;
  color: red;
  width: 100%;
`;

const AddIngredientCont = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface IIProps {
  name?: string;
}

const IngredientInput = styled.div<IIProps>`
  width: ${(props) =>
    props.name === "NAME"
      ? "40%"
      : props.name === "INSTRUCTION"
      ? "77%"
      : "15%"};
  height: 100%;
  @media (max-width: ${mobileMaxWidth}) {
    width: ${(props) =>
      props.name === "NAME"
        ? "80%"
        : props.name === "INSTRUCTION"
        ? "80%"
        : "35%"};
    height: unset;
  }
`;

const ButtonCont = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  margin-bottom: 20px;
`;

const AddIngButton = styled.button`
  font-family: ${primaryFont};
  border: none;
  border-radius: 3px;
  min-width: 150px;
  cursor: pointer;
  background-color: orange;
  color: ${primaryColorTwo};
  padding: 5px;
  &:hover {
    background-color: black;
  }
`;

const StateIngCont = styled.div`
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
`;

interface ILProps {
  lineWidth: boolean;
}

const InputLine = styled.div<ILProps>`
  width: ${(props) => (props.lineWidth ? "90%" : "0")};
  height: 2px;
  background-color: ${primaryColorOne};
  transition: width ease 0.5s;
`;

const Icon = styled.i`
  cursor: pointer;
  color: ${accentColorOne};
  width: 5%;
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 10%;
  }
`;

const Ing = styled.div`
  width: 95%;
  margin: 10px 0;
  word-wrap: break-word;
  text-align: left;
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 90%;
  }
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
  type: string,
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
      <InputLine lineWidth={onFocus === name ? true : false} />
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
  onFocus: string | null,
) {
  return (
    <IngredientInput name={name}>
      <Label>{name}</Label>

      {name === "INSTRUCTION" ? (
        <TextArea
          onChange={onChange}
          value={value}
          onBlur={() => {
            onBlur();
            onInputFocusOut();
          }}
          onFocus={() => onInputFocusIn(name)}
        />
      ) : (
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
      )}
      <InputLine lineWidth={onFocus === name ? true : false} />
      <Error>{error}</Error>
    </IngredientInput>
  );
}

function handleButton(cb: () => void, title: string) {
  return (
    <ButtonCont>
      <AddIngButton onClick={cb}>{title}</AddIngButton>
    </ButtonCont>
  );
}

interface IState {
  recipe: {
    recipeId: number;
    createdBy: string;
    name: string;
    category: string;
    servings: number;
    ingredients: { ingName: string; quantity: string; unit: string }[];
    instructions: { instruction: string; number: number }[];
  };
  ingredientToAdd: {
    ingName: string;
    quantity: string;
    unit: string;
  };
  instructionToAdd: { number: number; instruction: string };
  onFocus: string | null;
  ingNameToAddError: string;
  quantityToAddError: string;
  unitToAddError: string;
  nameError: string;
  servingsError: string;
  categoryError: string;
  instToAddError: string;
  instructionsError: string;
  ingredientsError: string;
}

class CreateRecipe extends Component<{ displayName: string }, IState> {
  constructor(props: { displayName: string }) {
    super(props);
    this.state = {
      recipe: {
        recipeId: 0,
        createdBy: this.props.displayName,
        name: "",
        category: "",
        servings: 0,
        ingredients: [],
        instructions: [],
      },
      ingredientToAdd: {
        ingName: "",
        quantity: "",
        unit: "",
      },
      instructionToAdd: { number: 1, instruction: "" },
      onFocus: null,
      ingNameToAddError: "",
      quantityToAddError: "",
      unitToAddError: "",
      nameError: "",
      servingsError: "",
      categoryError: "",
      instToAddError: "",
      instructionsError: "",
      ingredientsError: "",
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
    this.handleInstChange = this.handleInstChange.bind(this);
    this.validateInstToAdd = this.validateInstToAdd.bind(this);
    this.addInstruction = this.addInstruction.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  onInputFocusIn(onFocus: any) {
    this.setState({ onFocus });
  }

  onInputFocusOut() {
    this.setState({ onFocus: null });
  }

  handleStateIngredients() {
    if (this.state.recipe.ingredients.length > 0) {
      const ingredients = this.state.recipe.ingredients.map((r, index) => {
        const { ingName, quantity, unit } = r;
        return (
          <React.Fragment key={index}>
            <Icon
              className="fas fa-times"
              onClick={() => this.deleteIng(index)}
            />
            <Ing>
              {quantity} {unit === "-" ? null : unit} {ingName}{" "}
            </Ing>
          </React.Fragment>
        );
      });
      return ingredients;
    } else {
      return this.state.ingredientsError ? (
        <Error>{this.state.ingredientsError}</Error>
      ) : (
        <div style={{ margin: "10px auto" }}>
          Add an ingredient{" "}
          <i style={{ color: primaryColorOne }} className="fas fa-arrow-down" />
        </div>
      );
    }
  }

  handleStateInstructions() {
    const { instructions } = this.state.recipe;
    if (instructions.length > 0) {
      const instList = instructions.map((i) => {
        return (
          <React.Fragment key={i.number}>
            <Icon
              className="fas fa-times"
              onClick={() => this.deleteInst(i.number - 1)}
            />
            <Ing>
              <strong>{i.number}.</strong> {i.instruction}
            </Ing>
          </React.Fragment>
        );
      });
      return instList;
    } else {
      return this.state.instructionsError ? (
        <Error>{this.state.instructionsError}</Error>
      ) : (
        <div style={{ margin: "10px auto" }}>
          Add an Instruction
          <i
            style={{ color: primaryColorOne, marginLeft: "10px" }}
            className="fas fa-arrow-down"
          />
        </div>
      );
    }
  }

  handleNameChange(e: any) {
    e.preventDefault();
    const recipe = { ...this.state.recipe };
    recipe.name = e.target.value;
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
    ingredientToAdd.ingName = e.target.value;
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

  handleInstChange(e: any) {
    e.preventDefault();
    const { instructionToAdd } = this.state;
    instructionToAdd.instruction = e.target.value;
    this.setState({ instructionToAdd }, () => this.validateInstToAdd());
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
    if (this.state.ingredientToAdd.ingName.length < 2) {
      this.setState({ ingNameToAddError: "Name is too short" });
    } else {
      this.setState({ ingNameToAddError: "" });
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

  validateInstToAdd() {
    if (this.state.instructionToAdd.instruction.length < 3) {
      this.setState({ instToAddError: "Instruction is too short" });
    } else {
      this.setState({ instToAddError: "" });
    }
  }

  validateInstructions() {
    let instructionsError = "";
    if (this.state.recipe.instructions.length < 1) {
      instructionsError = "Please add an instruction";
    }
    this.setState({ instructionsError });
  }

  validateIngredients() {
    let ingredientsError = "";
    if (this.state.recipe.ingredients.length < 1) {
      ingredientsError = "Please add an ingredient";
    }
    this.setState({ ingredientsError });
  }

  addIngredient() {
    const { ingName, quantity, unit } = this.state.ingredientToAdd;
    if (ingName || quantity || unit) {
      const { recipe } = { ...this.state };
      recipe.ingredients.push(this.state.ingredientToAdd);
      this.setState({
        recipe,
        ingredientToAdd: {
          ingName: "",
          quantity: "",
          unit: "",
        },
      });
    }
    this.validateIngToAdd();
    this.validateQuantityToAdd();
    this.validateUnitToAdd();
    this.validateIngredients();
  }

  addInstruction() {
    const { instruction } = this.state.instructionToAdd;
    if (instruction) {
      const { recipe } = { ...this.state };
      recipe.instructions.push(this.state.instructionToAdd);
      const orderNumber = recipe.instructions.length + 1;
      this.setState({
        recipe,
        instructionToAdd: {
          instruction: "",
          number: orderNumber,
        },
      });
    }
    this.validateInstToAdd();
    this.validateInstructions();
  }

  deleteIng(index: number) {
    const { recipe } = { ...this.state };
    recipe.ingredients.splice(index, 1);
    this.setState({ recipe });
  }

  deleteInst(index: number) {
    const { recipe } = { ...this.state };
    recipe.instructions.splice(index, 1);
    for (let x = index; x < recipe.instructions.length; x++) {
      recipe.instructions[x].number = x + 1;
    }
    this.setState({
      recipe,
      instructionToAdd: {
        instruction: "",
        number: recipe.instructions.length + 1,
      },
    });
  }

  addRecipe() {
    this.validateName();
    this.validateServings();
    this.validateCategory();
    this.validateInstructions();
    this.validateIngredients();
    const {
      name,
      servings,
      category,
      ingredients,
      instructions,
    } = this.state.recipe;
    if (
      name &&
      servings &&
      category &&
      ingredients.length > 0 &&
      instructions.length > 0
    ) {
      console.log("RECIPE ADDED", this.state.recipe);
    }
    // this.setState({
    //   recipe: {
    //     recipeId: 0,
    //     createdBy: this.props.displayName,
    //     name: "",
    //     category: "",
    //     servings: 0,
    //     ingredients: [],
    //     instructions: [],
    //   },
    // });
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
            "text",
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
            "number",
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
            "text",
          )}
        </AddRInfoCont>
        <StateIngCont>{this.handleStateIngredients()}</StateIngCont>
        <AddIngredientCont>
          {handleIngredientsInputs(
            "NAME",
            this.handelIngredientChange,
            this.state.ingredientToAdd.ingName,
            this.state.ingNameToAddError,
            this.validateIngToAdd,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus,
          )}
          {handleIngredientsInputs(
            "QUANTITY",
            this.handelQuantityChange,
            this.state.ingredientToAdd.quantity,
            this.state.quantityToAddError,
            this.validateQuantityToAdd,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus,
          )}
          {handleIngredientsInputs(
            "UNIT",
            this.handelUnitChange,
            this.state.ingredientToAdd.unit,
            this.state.unitToAddError,
            this.validateUnitToAdd,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus,
          )}
        </AddIngredientCont>
        {handleButton(this.addIngredient, "ADD INGREDIENT")}
        <StateIngCont>{this.handleStateInstructions()}</StateIngCont>
        <AddIngredientCont>
          {handleIngredientsInputs(
            "INSTRUCTION",
            this.handleInstChange,
            this.state.instructionToAdd.instruction,
            this.state.instToAddError,
            this.validateInstToAdd,
            this.onInputFocusIn,
            this.onInputFocusOut,
            this.state.onFocus,
          )}
        </AddIngredientCont>
        {handleButton(this.addInstruction, "ADD INSTRUCTION")}
        {handleButton(this.addRecipe, "ADD RECIPE")}
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
