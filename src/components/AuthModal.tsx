import React from "react";
import styled from "styled-components";
import Auth from "./Auth";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";

const { brownSugar } = ColorScheme;
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
  background-color: ${brownSugar};
  opacity: 0.4;
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
        <Auth {...authProps} />
      </>
    );
  } else {
    return false;
  }
}

export default AuthModal;