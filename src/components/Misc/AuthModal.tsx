import React from "react";
import styled from "styled-components";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { Styles } from "../../Styles";
import { clearAction } from "../../actions/authActions";
import { RootState } from "../../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";

const { mobileMaxWidth } = Styles;

interface LIProps {
  loggedIn: string | null;
}

export const Shadow = styled.div<LIProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: ${(props) => (props.loggedIn ? "55px" : "78px")};
  left: 0;
  background-color: black;
  opacity: 0.6;
  @media screen and (max-width: ${mobileMaxWidth}) {
    top: ${(props) => (props.loggedIn ? "55px" : "67px")};
  }
`;

function AuthModal() {
  const dispatch = useDispatch();
  const { showLogIn, showSignUp } = useSelector((state: RootState) => state.authReducer)
  const { uid } = useSelector((state: RootState) => state.userReducer)
  let auth;
  if(showLogIn) {
    auth = <LogIn />
  } else if(showSignUp) {
    auth = <SignUp />
  } 
  return (
    <>
    <Shadow
      loggedIn={uid}
      onClick={() => dispatch(clearAction())}
      ></Shadow>
    {auth}
    </>
  );   
}

export default AuthModal;
