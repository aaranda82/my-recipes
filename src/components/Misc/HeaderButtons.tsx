import React from "react";
import styled from "styled-components";
import { showMenuAction, showLogInAction, showSignUpAction, clearAction } from "../../actions/authActions";
import { ColorScheme } from "../../ColorScheme";
import { Styles } from "../../Styles";
import {Spacer} from "./Spacer";
import { Link } from "react-router-dom";
import { RootState } from "../../reducers/rootReducer";
import { useHistory } from "react-router"

const { useSelector, useDispatch } = require("react-redux");

const { primaryColorOne, primaryColorTwo, accentColorOne } = ColorScheme;
const { mobileMaxWidth } = Styles;

const NavMenuButton = styled.i`
  font-size: 2em;
  color: ${primaryColorTwo};
  &:hover {
    opacity: 0.6;
  }
`;


interface BCProps {
  w: string;
  mobileWidth: string;
}

const ButtonContainer = styled.div<BCProps>`
  width: ${(props) => props.w};
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: ${mobileMaxWidth}) {
    width: ${(props) => props.mobileWidth};
  } ;
`;

const LogInButton = styled.button`
  font-family: "Raleway", sans-serif;
  border: none;
  border-radius: 3px;
  background-color: ${accentColorOne};
  color: ${primaryColorTwo};
  padding: 10px 20px;
  &:hover {
    background-color: black;
  }
  @media screen and (max-width: ${mobileMaxWidth}) {
    font-size: 10px;
  }
`;

const AddRecipeButton = styled.button`
  font-family: "Raleway", sans-serif;
  background-color: ${primaryColorTwo};
  padding: 10px 20px;
  outline: none;
  color: ${primaryColorOne};
  border: none;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    transform: scale(1.2);
  }
  & > a {
    text-decoration: none;
    color: ${primaryColorOne};
  }
  @media screen and (max-width: ${mobileMaxWidth}) {
    font-size: 10px;
  }
`;

function HeaderButtons() {
  const history = useHistory();
  const dispatch = useDispatch();
  const props = useSelector((state: RootState) => state);
  const { showMenu, showLogIn, showSignUp } = props.authReducer;
  const { displayName } = props.userReducer;
  return displayName ? (
        <>
          <ButtonContainer id="add recipe button" w="20%"  mobileWidth="25%">
            {history.location.pathname === "/createrecipe" ? null : (
              <Link to={"/createrecipe"}>
                <AddRecipeButton
                  onClick={() => dispatch(clearAction())}
                >
                  ADD RECIPE
                </AddRecipeButton>
              </Link>
            )}
          </ButtonContainer>
          <ButtonContainer id="nav menu button" w="10%" mobileWidth="15%">
            <NavMenuButton
              className={showMenu ? "fas fa-times" : "fas fa-bars"}
              onClick={() => showMenu ? dispatch(clearAction()) : dispatch(showMenuAction())}
            ></NavMenuButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <ButtonContainer w="20%" mobileWidth="40%">
            <LogInButton onClick={() => showSignUp ? dispatch(clearAction()) : dispatch(showSignUpAction())}>
              {showSignUp ? "CANCEL" : "SIGN UP"}
            </LogInButton>
            <LogInButton onClick={() => showLogIn ? dispatch(clearAction()) : dispatch(showLogInAction())}>
              {showLogIn ? "CANCEL" : "LOG IN"}
            </LogInButton>
          </ButtonContainer>
          <Spacer />
        </>
      )
}

export default HeaderButtons;