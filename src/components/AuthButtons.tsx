import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  clearAction,
  showLogInAction,
  showSignUpAction,
} from "../actions/authActions";
import { RootState } from "../reducers/rootReducer";
import { colorScheme } from "../styles/colorScheme";
import { styles } from "../styles/styles";

const { accentColorOne, primaryColorTwo } = colorScheme;

const Button = styled.button`
  font-family: "Raleway", sans-serif;
  border: none;
  border-radius: 3px;
  background-color: ${accentColorOne};
  color: ${primaryColorTwo};
  padding: 10px 20px;
  &:hover {
    background-color: black;
  }
  @media screen and (max-width: ${styles.mobileMaxWidth}) {
    font-size: 10px;
    width: 100%;
  }
`;

const handleButtons = (
  showModal: boolean,
  title: string,
  action: () => { type: string },
) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() =>
        showModal ? dispatch(clearAction()) : dispatch(action())
      }>
      {showModal ? "CANCEL" : title}
    </Button>
  );
};

export const LogInButton = () => {
  const { showLogIn } = useSelector((state: RootState) => state.authReducer);
  return handleButtons(showLogIn, "LOG IN", showLogInAction);
};

export const SignUpButton = () => {
  const { showSignUp } = useSelector((state: RootState) => state.authReducer);
  return handleButtons(showSignUp, "SIGN UP", showSignUpAction);
};
