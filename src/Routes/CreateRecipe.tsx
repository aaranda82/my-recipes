import firebase from "firebase";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
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
  const [image, setImage] = useState<Blob | Uint8Array | ArrayBuffer | null>(
    null,
  );
  const [imagePreview, setImagePreview] = useState(
    "https://firebasestorage.googleapis.com/v0/b/my-recipes-da233.appspot.com/o/fr9urcWIV8V2IXoWgBTwMLIgVW02%2FToast-1612819853305?alt=media&token=8346302d-aeb6-4ca8-a3df-163d262657d5",
  );
  const [imageToUpdate, setImageToUpdate] = useState("");
  const { uid } = useSelector((state: RootState) => state.userReducer);
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const db = firebase.database();
  const storageRef = firebase
    .storage()
    .ref()
    .child(`${uid}/${recipeName}-${Date.now()}`);

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
    if (
      imagePreview ===
      "https://firebasestorage.googleapis.com/v0/b/my-recipes-da233.appspot.com/o/fr9urcWIV8V2IXoWgBTwMLIgVW02%2FToast-1612819853305?alt=media&token=8346302d-aeb6-4ca8-a3df-163d262657d5"
    ) {
      const key = db.ref().child("recipes").push().key;
      const recipe = {
        createdBy: uid,
        name: recipeName,
        description,
        category,
        servings,
        ingredients,
        instructions,
        image: imagePreview,
      };
      db.ref(`recipes/${key}`).set(recipe);
      history.push(`/user/${uid}`);
    } else if (image) {
      const task = storageRef.put(image);
      task.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            const key = db.ref().child("recipes").push().key;
            const recipe = {
              createdBy: uid,
              name: recipeName,
              description,
              category,
              servings,
              ingredients,
              instructions,
              image: downloadURL,
            };
            db.ref(`recipes/${key}`).set(recipe);
            history.push(`/user/${uid}`);
          });
        },
      );
    }
  };

  const editRecipe = () => {
    if (image) {
      const task = storageRef.put(image);
      task.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            const recipe = {
              createdBy: uid,
              name: recipeName,
              description,
              category,
              servings,
              ingredients,
              instructions,
              image: downloadURL,
            };
            db.ref(`recipes/${id}`).set(recipe);
            history.push(`/recipedetail/${id}`);
          });
        },
      );
      return null;
    }
    const recipe = {
      createdBy: uid,
      name: recipeName,
      description,
      category,
      servings,
      ingredients,
      instructions,
    };
    db.ref("recipes/").child(id).update(recipe);
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
        image,
      } = recipes[id];
      setRecipeName(name);
      setDescription(description);
      setIngredients(ingredients);
      setInstructions(instructions);
      setServings(servings);
      setCategory(category);
      setImageToUpdate(image);
    }
  }, [id, location.pathname, recipes]);

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    if (files && files.length) {
      setImagePreview(URL.createObjectURL(files[0]));
      setImage(files[0]);
      setImageToUpdate("");
    }
  };

  const renderImage = () => {
    return (
      <img
        style={{ height: "175px", width: "175px" }}
        src={imageToUpdate ? imageToUpdate : imagePreview}
      />
    );
  };

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
          <FileDiv>
            <FileLabel>
              {renderImage()}
              <input type="file" onChange={changeImage} />
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
