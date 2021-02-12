import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthModal from "../components/AuthModal";
import HeaderButtons from "../components/HeaderButtons";
import Menu from "../components/Menu";
import { RootState } from "../reducers/rootReducer";
import { colorScheme } from "../styles/colorScheme";
import { styles } from "../styles/styles";

const { primaryColorOne, primaryColorTwo } = colorScheme;
const { mobileMaxWidth, primaryFont } = styles;

const HeaderContainer = styled.header<{ loggedIn: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  width: 100%;
  background-color: ${(props) => (props.loggedIn ? primaryColorOne : "white")};
  z-index: 5;
`;

const LogoContainer = styled.div<{ loggedIn: boolean }>`
  width: 35%;
  display: flex;
  justify-content: ${(props) => (props.loggedIn ? "left" : "center")};
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 75%;
  }
`;

const Logo = styled.div<{ loggedIn: boolean }>`
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

const Header = (): ReactElement => {
  const { showLogIn, showSignUp, showMenu } = useSelector(
    (state: RootState) => state.authReducer,
  );
  const displayName = useSelector(
    (state: RootState) => state.userReducer.displayName,
  );
  const HandleLogo = () => {
    return (
      <>
        {displayName ? null : <LogoSpacer />}
        <LogoContainer loggedIn={!!displayName} id="logo cont">
          <Logo loggedIn={!!displayName}>
            <Link to={"/"}>My Recipes</Link>
          </Logo>
        </LogoContainer>
      </>
    );
  };

  return (
    <HeaderContainer id="Header" loggedIn={!!displayName}>
      <HandleLogo />
      <HeaderButtons />
      {showLogIn || showSignUp || showMenu ? <AuthModal /> : false}
      <Menu />
    </HeaderContainer>
  );
};

export default Header;
