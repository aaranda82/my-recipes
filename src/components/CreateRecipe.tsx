import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const { bittersweet, ivory, gunmetal, timberwolf } = ColorScheme;

const CRContainer = styled.div`
  width: 80%;
  margin: auto;
  background-color: ${bittersweet};
`;

const RInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap:
  justify-content: center;
  align-items: center;
  `;

const InfoSection = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${timberwolf};
`;

const Label = styled.label`
  margin-top: 10px;
  width: 80%;
`;

const Input = styled.input`
  width: 80%;
  border: none;
  background-color: ${ivory};
  color: ${gunmetal};
`;

const Error = styled.div`
  margin-bottom: 10px;
  background-color: ${gunmetal};
  width: 80%;
`;

interface IState {
  recipe: {
    recipeId: number;
    createdBy: string;
    recipe: string;
    category: string;
    servings: number;
    ingredients: { name: string; quantity: number; unit: string }[];
    instructions: { number: number; instruction: string }[];
  };
  nameError: string;
  servingsError: string;
  categoryError: string;
}

class CreateRecipe extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      recipe: {
        recipeId: 0,
        createdBy: "",
        recipe: "",
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
  }

  handleNameChange(e: any) {
    e.preventDefault();
    console.log(e.target.value);
  }
  render() {
    return (
      <CRContainer>
        CREATE RECIPE PAGE
        <RInfoContainer>
          <InfoSection>
            <Label>Recipe Name</Label>
            <Input
              placeholder={"Recipe Name"}
              onChange={this.handleNameChange}
            ></Input>
            <Error>{this.state.nameError}</Error>
            <Label>Servings</Label>
            <Input></Input>
            <Error>{this.state.servingsError}</Error>
          </InfoSection>
          <InfoSection>
            <Label style={{ visibility: "hidden" }}>Recipe Name</Label>
            <Input style={{ visibility: "hidden" }}></Input>
            <Error style={{ visibility: "hidden" }}>Error</Error>
            <Label>Category</Label>
            <Input></Input>
            <Error>{this.state.categoryError}</Error>
          </InfoSection>
        </RInfoContainer>
      </CRContainer>
    );
  }
}

export default CreateRecipe;
