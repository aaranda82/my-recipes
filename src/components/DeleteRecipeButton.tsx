import firebase from "firebase";
import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../reducers/rootReducer";
import { Button, ButtonContainer, SVG } from "./SaveButton";

const DeleteRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const { uid } = useSelector((state: RootState) => state.userReducer);
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const location = useLocation();

  const confirmDelete = () => {
    confirmAlert({
      title: "Delete Recipe?",
      message: `Are you sure you want to permanently delete ${recipes[recipeId].name}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteRecipe(),
        },
        {
          label: "No",
          onClick: () => null,
        },
      ],
    });
  };

  const deleteRecipe = () => {
    delete recipes[recipeId];
    firebase.database().ref("recipes/").set(recipes);
  };

  return location.pathname === `/user/${uid}` &&
    recipes[recipeId].createdBy === uid ? (
    <ButtonContainer>
      <Button onClick={() => confirmDelete()}>
        <SVG
          save={false}
          height="25px"
          viewBox="0 0 512 512"
          width="25px"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M424 64h-88V48c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16H88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283C87.788 491.919 108.848 512 134.512 512h242.976c25.665 0 46.725-20.081 47.945-45.717L439.256 176H448c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zM208 48c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zM80 104c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40H80zm313.469 360.761A15.98 15.98 0 01377.488 480H134.512a15.98 15.98 0 01-15.981-15.239L104.78 176h302.44z" />
          <path d="M256 448c8.836 0 16-7.164 16-16V224c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16zM336 448c8.836 0 16-7.164 16-16V224c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16zM176 448c8.836 0 16-7.164 16-16V224c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
        </SVG>
      </Button>
    </ButtonContainer>
  ) : null;
};

export default DeleteRecipeButton;
