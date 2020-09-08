import React, { Component } from "react";
import Menu from "./Menu";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import Spacer from "./Spacer";
import { Link } from "react-router-dom";
import Auth from "./Auth";
const { connect } = require("react-redux");

const { blueMunsell, ivory, redOrange } = ColorScheme;
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
  background-color: ${(props) => (props.loggedIn ? blueMunsell : ivory)};
  z-index: 5;
  position: sticky;
  top: 0;
  height: auto;
`;

const LogoContainer = styled.div<LIProps>`
  width: 70%;
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
  color: ${(props) => (props.loggedIn ? ivory : blueMunsell)};
  & > a {
    color: ${(props) => (props.loggedIn ? ivory : blueMunsell)};
    text-decoration: none;
    margin-left: 20px;
  }
  @media (max-width: ${mobileMaxWidth}) {
    font-size: 20px;
  }
`;

const NavMenuButton = styled.i`
  font-size: 2em;
  color: ${ivory};
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;

const Shadow = styled.div<LIProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: ${(props) => (props.loggedIn ? "55px" : "78px")};
  background-color: ${ivory};
  opacity: 0.4;
`;

const LogoSpacer = styled.div`
  width: 15%;
  @media (max-width: ${mobileMaxWidth}) {
    display: none;
  } ;
`;

interface BCProps {
  w: string;
}

const ButtonContainer = styled.div<BCProps>`
  width: ${(props) => props.w};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${mobileMaxWidth}) {
    width: 20%;
  } ;
`;

const LogInButton = styled.button`
  font-family: "Raleway", sans-serif;
  border: none;
  background-color: ${redOrange};
  color: ${ivory};
  padding: 10px 20px;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
  &:active {
    transform: scale(1.2);
  }
`;

const AddRecipeButton = styled.button`
  font-family: "Raleway", sans-serif;
  border: 2px solid ${ivory};
  background-color: ${blueMunsell};
  padding: 10px 20px;
  outline: none;
  color: ${ivory};
  opacity: 0.6;
  &:hover {
    opacity: 1;
    border: 4px solid ${ivory};
  }
  &:active {
    transform: scale(1.2);
  }
  & > a {
    text-decoration: none;
    color: ${ivory};
  }
`;

interface NavProps {
  displayName: string;
  signOut: () => void;
}

interface NavState {
  showMenu: boolean;
  showAuth: boolean;
}

class Header extends Component<NavProps, NavState> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
      showMenu: false,
      showAuth: false,
    };
    this.toggleState = this.toggleState.bind(this);
  }

  handleLogo() {
    return (
      <LogoContainer loggedIn={this.props.displayName} id="logo cont">
        <Logo loggedIn={this.props.displayName}>
          {this.props.displayName ? (
            <Link to={"/"}>My Recipes</Link>
          ) : (
            "My Recipes"
          )}
        </Logo>
      </LogoContainer>
    );
  }

  toggleState(s: string) {
    if (s === "showMenu") {
      this.setState({ showMenu: !this.state.showMenu });
    } else if (s === "showAuth") {
      this.setState({ showAuth: !this.state.showAuth });
    }
  }

  handleMenuModal() {
    if (this.state.showMenu) {
      return (
        <>
          <Shadow
            loggedIn={this.props.displayName}
            onClick={() => this.toggleState("showMenu")}
          ></Shadow>
          <Menu toggleState={this.toggleState} />
        </>
      );
    } else {
      return false;
    }
  }

  handleAuthModal() {
    if (this.state.showAuth) {
      const authProps = {
        toggleState: this.toggleState,
      };
      return (
        <>
          <Shadow
            loggedIn={this.props.displayName}
            onClick={() => this.toggleState("showAuth")}
          ></Shadow>
          <Auth {...authProps} />
        </>
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <HeaderContainer
        id="Header"
        loggedIn={this.props.displayName ? "loggedIn" : null}
      >
        {this.props.displayName ? null : <LogoSpacer></LogoSpacer>}
        {this.handleLogo()}
        {this.props.displayName ? (
          <>
            <ButtonContainer id="add recipe button" w="20%">
              <AddRecipeButton>
                <Link to={"/createrecipe"}>ADD RECIPE</Link>
              </AddRecipeButton>
            </ButtonContainer>
            <ButtonContainer id="nav menu button" w="10%">
              <NavMenuButton
                className={this.state.showMenu ? "fas fa-times" : "fas fa-bars"}
                onClick={() => this.toggleState("showMenu")}
              ></NavMenuButton>
            </ButtonContainer>
          </>
        ) : (
          <>
            <ButtonContainer w="15%">
              <LogInButton onClick={() => this.toggleState("showAuth")}>
                {this.state.showAuth ? "CANCEL" : "LOG IN"}
              </LogInButton>
            </ButtonContainer>
            <Spacer />
          </>
        )}
        {this.handleMenuModal()}
        {this.handleAuthModal()}
      </HeaderContainer>
    );
  }
}

interface mapState {
  userReducer: {
    displayName: string;
  };
}

const mapStateToProps = (state: mapState) => {
  return {
    displayName: state.userReducer.displayName,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => {
      dispatch(signOutAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
