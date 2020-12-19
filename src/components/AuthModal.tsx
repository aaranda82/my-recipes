import React from "react";
import styled from "styled-components";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { Styles } from "../Styles";
import { clearAction } from "../actions/authActions";
import { RootState } from "../reducers/rootReducer";

const { connect } = require("react-redux");

const { mobileMaxWidth } = Styles;

interface LIProps {
  loggedIn: string | null;
}

const Shadow = styled.div<LIProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: ${(props) => (props.loggedIn ? "55px" : "78px")};
  left: 0;
  background-color: black;
  opacity: 0.12;
  @media screen and (max-width: ${mobileMaxWidth}) {
    top: ${(props) => (props.loggedIn ? "55px" : "67px")};
  }
`;

interface IProps {
  uid: string;
  showLogIn: boolean;
  showSignUp: boolean;
  showMenu: boolean;
  clear: () => void;
}

function AuthModal(props: IProps) {
  const { showLogIn, showSignUp, showMenu, uid, clear } = props;
  let auth;
  if(showLogIn) {
    auth = <LogIn />
  } else if(showSignUp) {
    auth = <SignUp />
  } else if(showMenu) {
    auth = ''
  }
  if(showLogIn || showSignUp || showMenu) {
    return (
      <>
      <Shadow
        loggedIn={uid}
        onClick={() => clear()}
        ></Shadow>
      {auth}
      </>
    );   
  } else {
    return false;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    uid: state.userReducer.uid,
    showLogIn: state.authReducer.showLogIn,
    showSignUp: state.authReducer.showSignUp,
    showMenu: state.authReducer.showMenu,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clear: () => {
      dispatch(clearAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
