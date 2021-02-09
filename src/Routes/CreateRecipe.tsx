import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { AddRecipeInput, AddRecipeTextArea } from "../components/Input";
import { useCreateRecipe } from "../hooks/useCreateRecipe";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles/styles";

const { primaryFont, mobileMaxWidth } = styles;

const ContainerDiv = styled.div`
  font-family: ${primaryFont};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  background: lightblue;
  @media screen and (max-width: ${mobileMaxWidth}) {
    flex-direction: unset;
  }
`;

interface IProps {
  width: string;
  float: string;
}
const SubContainer = styled.div<IProps>`
  padding: 20px 0;
  width: ${(props) => props.width};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  float: ${(props) => props.float};
  height: fit-content;
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 100%;
  }
`;

const FileDiv = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;
  margin: 10px 0;
`;

const FileLabel = styled.label`
  cursor: pointer;
  text-align: center;
  width: 200px;
  height: 200px;
  & > input {
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
`;

const CreateRecipe = (): ReactElement => {
  const { inputs, setInputs, submit, edit } = useCreateRecipe();
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const handleSubmitOrEditButtons = () => {
    return recipes && location.pathname === `/editrecipe/${id}` ? (
      <button onClick={() => edit()}>Edit Recipe</button>
    ) : (
      <button onClick={() => submit()}>Save Recipe</button>
    );
  };

  const renderImage = () => {
    return (
      <img
        style={{ height: "175px", width: "175px" }}
        src={inputs.imageToUpdate ? inputs.imageToUpdate : inputs.imagePreview}
      />
    );
  };

  return (
    <>
      <ContainerDiv>
        <SubContainer width="60%" float="right">
          <AddRecipeInput
            error=""
            name="Recipe Title"
            type="text"
            placeholder="Enter Recipe Title"
            value={inputs.recipeName}
            onChange={(e) => setInputs.setRecipeName(e.target.value)}
            width="100%"
          />
          <AddRecipeTextArea
            error=""
            name="Description"
            placeholder="Enter Description"
            value={inputs.description}
            onChange={(e) => setInputs.setDescription(e.target.value)}
            height="6rem"
          />
          <AddRecipeTextArea
            error=""
            name="Ingredients"
            placeholder="Write each ingredient on its own line"
            value={inputs.ingredients}
            onChange={(e) => setInputs.setIngredients(e.target.value)}
            height="9rem"
          />
          <AddRecipeTextArea
            error=""
            name="Instructions"
            placeholder="Write each instruction on its own line"
            value={inputs.instructions}
            onChange={(e) => setInputs.setInstructions(e.target.value)}
            height="9rem"
          />
        </SubContainer>
        <SubContainer width="40%" float="left">
          <FileDiv>
            <FileLabel>
              {renderImage()}
              <input type="file" onChange={setInputs.setImage} />
            </FileLabel>
          </FileDiv>
          <AddRecipeInput
            error=""
            name="Category"
            type="text"
            placeholder="Enter Category"
            value={inputs.category}
            onChange={(e) => setInputs.setCategory(e.target.value)}
            width="100%"
          />
          <AddRecipeInput
            error=""
            name="Servings"
            type="number"
            placeholder=""
            value={inputs.servings}
            onChange={(e) =>
              setInputs.setServings(parseInt(e.currentTarget.value))
            }
            width="50%"
          />
        </SubContainer>
        <ButtonContainer>{handleSubmitOrEditButtons()}</ButtonContainer>
      </ContainerDiv>
    </>
  );
};

export default CreateRecipe;
