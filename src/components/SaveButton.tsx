import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { showLogInAction } from "../actions/authActions";
import { colorScheme } from "../colorScheme";
import userData from "../data-users.json";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles";

const { gunmetal, accentColorOne, primaryColorTwo } = colorScheme;
const { primaryFont } = styles;

const SaveButtonCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 5px 10px 5px 10px;
  border: none;
  border-radius: 20px;
  background-color: ${primaryColorTwo};
  color: ${gunmetal};
  cursor: pointer;
  font-family: ${primaryFont};
  font-weight: 400;
  outline: none;
  &:hover {
    background-color: ${accentColorOne};
    color: ${primaryColorTwo};
  }
`;

function SaveButton({ recipeId }: { recipeId: number }) {
  const dispatch = useDispatch();
  const uid = useSelector((state: RootState) => state.userReducer.uid);

  const isRecipeInFavs = () => {
    let boolIsInFavs = false;
    if (uid) {
      let user = userData.filter((u) => u.uid === uid);
      if (user.length) {
        const userFavs = user[0].favorites;
        for (let x = 0; x < userFavs.length; x++) {
          if (userFavs[x] === recipeId) {
            boolIsInFavs = true;
          }
        }
      }
    }
    return boolIsInFavs;
  };

  const isInFavs = recipeId ? isRecipeInFavs() : false;

  if (!uid || (uid && !isInFavs)) {
    return (
      <SaveButtonCont>
        <Button
          onClick={
            uid ? () => console.log("SAVED") : () => dispatch(showLogInAction())
          }>
          <svg
            fill="red"
            fillOpacity="0.7"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 168.1 168.1">
            <path d="M143.558 20.077a48.777 48.777 0 00-22.954-5.699c-14.66 0-27.832 6.438-36.526 16.515C75.325 20.815 62.197 14.378 47.5 14.378c-8.313 0-16.141 2.068-22.957 5.699C9.913 27.83 0 42.774 0 60.033c0 4.944.835 9.639 2.349 14.082 8.125 35.202 60.155 79.606 81.733 79.606 20.982 0 73.512-44.404 81.672-79.606a43.402 43.402 0 002.346-14.082c.007-17.259-9.915-32.203-24.542-39.956zm9.254 50.025a3.212 3.212 0 01-3.043 2.132c-.338 0-.679 0-1.028-.118-1.691-.571-2.567-2.377-2.003-4.074.91-2.684 1.378-5.373 1.378-8.008 0-9.565-5.444-18.378-14.153-22.949a27.712 27.712 0 00-13.358-3.379c-1.779 0-3.185-1.378-3.185-3.195a3.175 3.175 0 013.185-3.182c5.744 0 11.261 1.378 16.352 4.073 10.827 5.748 17.547 16.692 17.547 28.632a30.966 30.966 0 01-1.692 10.068z" />
          </svg>
        </Button>
      </SaveButtonCont>
    );
  } else {
    return <div />;
  }
}

export default SaveButton;
