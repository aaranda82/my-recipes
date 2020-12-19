import React from "react";
import Menu from "./Menu";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import { showMenuAction, showLogInAction, showSignUpAction, clearAction } from "../actions/authActions";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import {Spacer} from "./Spacer";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import AuthModal from "./AuthModal";
import { RootState } from "../reducers/rootReducer";

const { connect } = require("react-redux");

const { primaryColorOne, primaryColorTwo, accentColorOne } = ColorScheme;
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

const NavMenuButton = styled.i`
  font-size: 2em;
  color: ${primaryColorTwo};
  &:hover {
    opacity: 0.6;
  }
`;

const LogoSpacer = styled.div`
  width: 20%;
  @media (max-width: ${mobileMaxWidth}) {
    display: none;
  } ;
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
  
function handleLogo(displayName: string) {
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

function handleButtons(props: StateProps & DispatchProps) {
  const { displayName, clear, showMenu, showSignUp, showLogIn, showMenuA, showSignUpA, showLogInA, location } = props;
  return displayName ? (
        <>
          <ButtonContainer id="add recipe button" w="20%"  mobileWidth="25%">
            {location.pathname === "/createrecipe" ? null : (
              <Link to={"/createrecipe"}>
                <AddRecipeButton
                  onClick={clear}
                >
                  ADD RECIPE
                </AddRecipeButton>
              </Link>
            )}
          </ButtonContainer>
          <ButtonContainer id="nav menu button" w="10%" mobileWidth="15%">
            <NavMenuButton
              className={showMenu ? "fas fa-times" : "fas fa-bars"}
              onClick={showMenu ? clear : showMenuA}
            ></NavMenuButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          <ButtonContainer w="20%" mobileWidth="40%">
            <LogInButton onClick={showSignUp ? clear : showSignUpA}>
              {showSignUp ? "CANCEL" : "SIGN UP"}
            </LogInButton>
            <LogInButton onClick={showLogIn ? clear : showLogInA}>
              {showLogIn ? "CANCEL" : "LOG IN"}
            </LogInButton>
          </ButtonContainer>
          <Spacer />
        </>
      )
}

interface StateProps extends RouteComponentProps {
  displayName: string;
  showMenu: boolean;
  showLogIn: boolean;
  showSignUp: boolean;
}

interface DispatchProps {
  signOut: () => void;
  showMenuA: () => void;
  showLogInA: () => void;
  showSignUpA: () => void;
  clear: () => void;

}

function Header(props: StateProps & DispatchProps) {
  const { displayName } = props;
  return (
    <HeaderContainer id="Header" loggedIn={displayName ? "loggedIn" : null}>
      {handleLogo(displayName)}
      {handleButtons(props)}
      <AuthModal />
      <Menu />
    </HeaderContainer>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    displayName: state.userReducer.displayName,
    showMenu: state.authReducer.showMenu,
    showLogIn: state.authReducer.showLogIn,
    showSignUp: state.authReducer.showSignUp,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => dispatch(signOutAction()),
    showMenuA: () => dispatch(showMenuAction()),
    showLogInA: () => dispatch(showLogInAction()),
    showSignUpA: () => dispatch(showSignUpAction()),
    clear: () => dispatch(clearAction()),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
