import React from "react";
import styled from "styled-components";
import LogIn from "./LogIn";
import { Styles } from "../Styles";

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
  opacity: 0.8;
  @media screen and (max-width: ${mobileMaxWidth}) {
    top: ${(props) => (props.loggedIn ? "55px" : "67px")};
  }
`;

function AuthModal(showAuth: boolean | undefined, toggleAuthView: () => void, uid: string) {
  if (showAuth) {
    const authProps = {
      toggleAuthView: toggleAuthView,
    };
    return (
      <>
        <Shadow
          loggedIn={uid}
          onClick={() => toggleAuthView()}
        ></Shadow>
        <LogIn {...authProps} />
      </>
    );
  } else {
    return false;
  }
}

export default AuthModal;