import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../../ColorScheme";
import { Styles } from "../../Styles";
import { Link } from "react-router-dom";
import { RootState } from "../../reducers/rootReducer";
import HeaderButtons from "./HeaderButtons";
import { useSelector } from "react-redux";

const { primaryColorOne, primaryColorTwo } = ColorScheme;
const { mobileMaxWidth, primaryFont } = Styles;

interface LIProps {
  loggedIn: string | null;
}
const HeaderContainer = styled.header<LIProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  width: 100%;
  background-color: ${(props) =>
    props.loggedIn ? primaryColorOne : "white"};
  z-index: 5;
  position: sticky;
  top: 0;
  height: auto;
`;

const LogoContainer = styled.div<LIProps>`
  width: 60%;
  display: flex;
  justify-content: ${(props) => (props.loggedIn ? "left" : "center")};
  @media (max-width: ${mobileMaxWidth}) {
    width: 60%;
  }
`;

const Logo = styled.div<LIProps>`
  margin: ${(props) => (props.loggedIn ? "10px 0" : "20px 0")};
  font-family: ${primaryFont};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 30px;
  text-align: ${(props) => (props.loggedIn ? "left" : "center")};
  color: ${(props) => (props.loggedIn ? primaryColorTwo : primaryColorOne)};
  & > a {
    color: ${(props) => (props.loggedIn ? primaryColorTwo : primaryColorOne)};
    text-decoration: none;
    margin-left: 20px;
  }
  @media (max-width: ${mobileMaxWidth}) {
    font-size: 20px;
  }
`;

const LogoSpacer = styled.div`
  width: 20%;
  @media (max-width: ${mobileMaxWidth}) {
    display: none;
  } ;
`;

function Header() {
  const displayName = useSelector((state: RootState) => state.userReducer.displayName)
  const HandleLogo = () => {
    return (
      <>
      {displayName ? null : <LogoSpacer/>}
      <LogoContainer loggedIn={displayName} id="logo cont">
        <Logo loggedIn={displayName}>
          {displayName ? (
            <Link to={"/"}>My Recipes</Link>
            ) : (
              "My Recipes"
              )}
        </Logo>
      </LogoContainer>
      </>
    );
  }

  return (
    <HeaderContainer id="Header" loggedIn={displayName ? "loggedIn" : null}>
      <HandleLogo />
      <HeaderButtons/>
      
    </HeaderContainer>
  );
}

export default Header;
