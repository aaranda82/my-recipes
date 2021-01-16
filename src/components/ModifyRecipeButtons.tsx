import firebase from "firebase";
import React, { ReactElement } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { RootState } from "../reducers/rootReducer";
import { Button, ButtonContainer, SVG } from "./SaveButton";

const ModifyRecipeButtons = ({
  recipeId,
}: {
  recipeId: string;
}): ReactElement | null => {
  const { uid } = useSelector((state: RootState) => state.userReducer);
  const { recipes } = useSelector((state: RootState) => state.recipeReducer);
  const location = useLocation();
  const history = useHistory();

  const confirmDelete = () => {
    if (recipes) {
      console.log(recipes);
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
    }
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
      <Button onClick={() => history.push(`/editrecipe/${recipeId}`)}>
        <SVG
          save={false}
          height="25px"
          viewBox="-15 -15 484 484"
          width="25px"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M401.648 18.234c-24.394-24.351-63.898-24.351-88.293 0l-22.101 22.223-235.27 235.145-.5.503c-.12.122-.12.25-.25.25-.25.375-.625.747-.87 1.122 0 .125-.13.125-.13.25-.25.375-.37.625-.625 1-.12.125-.12.246-.246.375-.125.375-.25.625-.379 1 0 .12-.12.12-.12.25L.663 437.32a12.288 12.288 0 002.996 12.735 12.564 12.564 0 008.867 3.625c1.356-.024 2.7-.235 3.996-.625l156.848-52.325c.121 0 .121 0 .25-.12a4.523 4.523 0 001.121-.505.443.443 0 00.254-.12c.371-.25.871-.505 1.246-.755.371-.246.75-.62 1.125-.87.125-.13.246-.13.246-.25.13-.126.38-.247.504-.5l257.371-257.372c24.352-24.394 24.352-63.898 0-88.289zM169.375 371.383l-86.914-86.91L299.996 66.938l86.914 86.91zm-99.156-63.809l75.93 75.926-114.016 37.96zm347.664-184.82l-13.238 13.363L317.727 49.2l13.367-13.36c14.62-14.609 38.32-14.609 52.945 0l33.965 33.966c14.512 14.687 14.457 38.332-.121 52.949zm0 0" />
        </SVG>
      </Button>
    </ButtonContainer>
  ) : null;
};

export default ModifyRecipeButtons;
