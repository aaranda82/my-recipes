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

function AuthModal({
  showAuth,
  toggleAuthView,
  uid,
}: {
  showAuth?: boolean;
  toggleAuthView: () => void;
  uid: string;
}) {
  return showAuth ? (
    <>
      <Shadow loggedIn={uid} onClick={() => toggleAuthView()}></Shadow>
      <Auth toggleAuthView={toggleAuthView} />
    </>
  ) : null;
}

export default AuthModal;
