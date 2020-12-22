import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import userData from "../data-users.json";
import { showLogInAction } from "../actions/authActions";
import { RootState } from "../reducers/rootReducer";

const { useSelector, useDispatch } = require("react-redux");
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

function SaveButton(props: { recipeId: number }) {
  const { recipeId } = props
  const dispatch = useDispatch()
  const uid = useSelector((state: RootState) => state.userReducer.uid)

  const isRecipeInFavs = () => {
    let boolIsInFavs = false;
    if (uid) {
      let user = userData.filter((u) => u.uid === uid);
      if(user.length) {
        const userFavs = user[0].favorites;
        for (let x = 0; x < userFavs.length; x++) {
          if (userFavs[x] === recipeId) {
            boolIsInFavs = true;
          }
        }
      }
    }
    return boolIsInFavs;
  }

  const isInFavs = recipeId ? isRecipeInFavs() : false;
  
  if (!uid || (uid && !isInFavs)) {
    return (
      <SaveButtonCont>
        <Button onClick={uid ? () => console.log("SAVED") : () => dispatch(showLogInAction())}>
          <Icon className="fas fa-star" />
          Save
        </Button>
      </SaveButtonCont>
    );
  } else {
    return <div/>
  }
}

export default SaveButton;