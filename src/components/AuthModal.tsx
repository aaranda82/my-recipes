import React from "react";
import styled from "styled-components";
import Auth from "./Auth";
import { ColorScheme } from "../ColorScheme";

const { primaryColorTwo } = ColorScheme  

interface LIProps {
  loggedIn: string | null;
}

const Shadow = styled.div<LIProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: ${(props) => (props.loggedIn ? "55px" : "78px")};
  background-color: ${primaryColorTwo};
  opacity: 0.4;
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
        <Auth {...authProps} />
      </>
    );
  } else {
    return false;
  }
}

export default AuthModal;