import firebase from "firebase";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles";

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

const Item = styled.div<{ height?: string; width?: string }>`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-bottom: 20px;
  & > textarea {
    font-size: 1rem;
    line-height: 1.5rem;
    height: ${(props) => props.height};
    width: 100%;
    font-family: ${primaryFont};
    font-weight: 600;
    outline: none;
  }
  & > input {
    font-size: 1rem;
    line-height: 1.5rem;
    height: 2.5rem;
    width: ${(props) => props.width};
    outline: none;
  }
  & > label {
    margin: 5px 0;
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
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [servings, setServings] = useState(0);
  const { uid } = useSelector((state: RootState) => state.userReducer);
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const changeRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeName(e.currentTarget.value);
  };

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const changeIngredients = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredients(e.currentTarget.value);
  };

  const changeInstructions = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInstructions(e.currentTarget.value);
  };

  const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.currentTarget.value);
  };

  const changeServings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.currentTarget.value);
    setServings(num);
  };

  const submitNewRecipe = () => {
    const key = firebase.database().ref().child("recipes").push().key;
    const recipe = {
      createdBy: uid,
      name: recipeName,
      description,
      category,
      servings,
      ingredients,
      instructions,
    };
    firebase
      .database()
      .ref("recipes/" + key)
      .set(recipe);
    history.push(`/user/${uid}`);
  };

  const editRecipe = () => {
    const recipe = {
      createdBy: uid,
      name: recipeName,
      description,
      category,
      servings,
      ingredients,
      instructions,
    };
    firebase.database().ref("recipes/").child(id).update(recipe);
    history.push(`/recipedetail/${id}`);
  };

  const handleSubmitOrEditButtons = () => {
    return recipes && location.pathname === `/editrecipe/${id}` ? (
      <button onClick={() => editRecipe()}>Edit Recipe</button>
    ) : (
      <button onClick={() => submitNewRecipe()}>Save Recipe</button>
    );
  };

  const handleInputItem = (
    name: string,
    value: string | number,
    cb: (e: React.ChangeEvent<HTMLInputElement>) => void,
    width: string,
    type?: string,
  ) => {
    return (
      <Item width={width}>
        <label htmlFor={name}>{name}</label>
        <input type={type} value={value} onChange={cb} />
      </Item>
    );
  };

  const handleTextItem = (
    name: string,
    value: string,
    cb: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    placeholder: string,
    height: string,
  ) => {
    return (
      <Item height={height}>
        <label htmlFor={name}>{name}</label>
        <textarea value={value} onChange={cb} placeholder={placeholder} />
      </Item>
    );
  };

  useEffect(() => {
    if (recipes && location.pathname === `/editrecipe/${id}`) {
      const {
        name,
        description,
        ingredients,
        instructions,
        servings,
        category,
      } = recipes[id];
      setRecipeName(name);
      setDescription(description);
      setIngredients(ingredients);
      setInstructions(instructions);
      setServings(servings);
      setCategory(category);
    }
  }, [id, location.pathname, recipes]);

  return (
    <>
      <ContainerDiv>
        <SubContainer width="60%" float="right">
          {handleInputItem(
            "Recipe Title",
            recipeName,
            changeRecipeName,
            "100%",
          )}
          {handleTextItem(
            "Description",
            description,
            changeDescription,
            "",
            "6rem",
          )}
          {handleTextItem(
            "Ingredients",
            ingredients,
            changeIngredients,
            "Write each ingredient on its own line",
            "9rem",
          )}
          {handleTextItem(
            "Instructions",
            instructions,
            changeInstructions,
            "Write each instruction on its own line",
            "9rem",
          )}
        </SubContainer>
        <SubContainer width="40%" float="left">
          <FileDiv
            onClick={() => console.log("File upload feature coming soon")}>
            <FileLabel>
              <svg
                height="125px"
                viewBox="0 0 512 512"
                width="125px"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M457 101H356.812l-9.743-29.23A44.946 44.946 0 00304.377 41h-96.754a44.943 44.943 0 00-42.691 30.77L155.188 101H131V76c0-19.299-15.701-35-35-35H76c-19.299 0-35 15.701-35 35v26.812C17.432 109.02 0 130.51 0 156v260c0 30.327 24.673 55 55 55h402c30.327 0 55-24.673 55-55V156c0-30.327-24.673-55-55-55zM71 76c0-2.757 2.243-5 5-5h20c2.757 0 5 2.243 5 5v25H71zm411 340c0 13.785-11.215 25-25 25H55c-13.785 0-25-11.215-25-25V156c0-13.785 11.215-25 25-25h111a15 15 0 0014.23-10.257l13.162-39.486A14.983 14.983 0 01207.623 71h96.754a14.98 14.98 0 0114.23 10.256l13.162 39.487A15.002 15.002 0 00346 131h111c13.785 0 25 11.215 25 25z" />
                <circle cx={436} cy={176} r={15} />
                <path d="M106 161H76c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c8.284 0 15-6.716 15-15s-6.716-15-15-15zM256 411c-74.439 0-135-60.561-135-135s60.561-135 135-135 135 60.561 135 135-60.561 135-135 135zm0-240c-57.897 0-105 47.103-105 105s47.103 105 105 105 105-47.103 105-105-47.103-105-105-105z" />
                <path d="M256 351c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm0-120c-24.813 0-45 20.187-45 45s20.187 45 45 45 45-20.187 45-45-20.187-45-45-45z" />
              </svg>
              <input />
              Add Image Feature Coming Soon
            </FileLabel>
          </FileDiv>
          {handleInputItem("Category", category, changeCategory, "100%")}
          {handleInputItem(
            "Servings",
            servings,
            changeServings,
            "50%",
            "number",
          )}
        </SubContainer>
        <ButtonContainer>{handleSubmitOrEditButtons()}</ButtonContainer>
      </ContainerDiv>
    </>
  );
};

export default CreateRecipe;
