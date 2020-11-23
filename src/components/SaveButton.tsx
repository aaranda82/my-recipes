import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import userData from "../data-users.json";


const { gunmetal, accentColorOne, primaryColorTwo } = ColorScheme;
const { primaryFont } = Styles;


const SaveButtonCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
padding: 5px 10px 5px 10px;
border: 2px solid ${gunmetal};
border-radius: 20px;
background-color: ${primaryColorTwo};
color: ${gunmetal};
cursor: pointer;
font-family: ${primaryFont};
font-weight: 400;
outline: none;
&:hover {
  border: 2px solid ${accentColorOne};
  background-color: ${accentColorOne};
  color: ${primaryColorTwo};
}
`;

const Icon = styled.i`
margin-right: 5px;
color: ${accentColorOne};
${Button}:hover > & {
  color: ${primaryColorTwo};
}
`;

function isRecipeInFavs(uid: string | undefined, recipeId: number) { 
  let isInFavs = false;
  if (uid) {
    let user = userData.filter((u) => u.uid === uid);
    const userFavs = user[0].favorites;
    for (let x = 0; x < userFavs.length; x++) {
      if (userFavs[x] === recipeId) {
        isInFavs = true;
      }
    }
  }
  return isInFavs;
}

function SaveButton(uid: string, toggleAuthView: () => void, recipeId: number) { // uid to determine if user is logged in or not
  const isInFavs = recipeId ? isRecipeInFavs(uid, recipeId) : false;
  if (!uid || (uid && !isInFavs)) {
    return (
      <SaveButtonCont>
        <Button onClick={uid ? () => console.log("SAVED") : () => toggleAuthView()}>
          <Icon className="fas fa-star" />
          Save
        </Button>
      </SaveButtonCont>
    );
  }
}

export default SaveButton;