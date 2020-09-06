import React, { Component } from "react";
import Menu from "./Menu";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import { ColorScheme } from "../ColorScheme";
import Spacer from "./Spacer";
import { Link } from "react-router-dom";
import Auth from "./Auth";
const { connect } = require("react-redux");

const { blueMunsell, ivory } = ColorScheme;
const MAX_WIDTH = process.env.REACT_APP_MOBILE_MAX_WIDTH;

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

const NewLogo = styled.div<LIProps>`
  width: 70%;
  margin: ${(props) => (props.loggedIn ? "20px 0" : "20px 0px 20px 0px")};
  font-family: "Raleway", sans-serif;
  text-align: ${(props) => (props.loggedIn ? "left" : "center")};
  font-size: ${(props) => (props.loggedIn ? "20px" : "30px")};
  color: ${(props) => (props.loggedIn ? ivory : blueMunsell)};
  & > a {
    color: ${(props) => (props.loggedIn ? ivory : blueMunsell)};
    text-decoration: none;
    margin-left: 20px;
  }
  @media (max-width: ${MAX_WIDTH}) {
    font-size: 20px;
  }
`;

const NavMenuButton = styled.i`
  font-size: 2em;
  color: ${ivory};
  opacity: 0.6;
  width: 15%;
  &:hover {
    opacity: 1;
  }
`;

const Shadow = styled.div<LIProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: ${(props) => (props.loggedIn ? "63px" : "77px")};
  background-color: ${ivory};
  opacity: 0.4;
`;

const LogoSpacer = styled.div`
  width: 15%;
  @media (max-width: ${MAX_WIDTH}px) {
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
  @media (max-width: ${MAX_WIDTH}px) {
    width: 30%;
  } ;
`;

const LogInButton = styled.button`
  border: none;
  background-color: ${blueMunsell};
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
  border: 5px solid ${ivory};
  background-color: ${blueMunsell};
  padding: 10px 20px;
  outline: none;
  color: ${ivory};
  opacity: 0.6;
  &:hover {
    opacity: 1;
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
    return this.props.displayName ? (
      <NewLogo loggedIn={this.props.displayName}>
        <Link to={"/"}>My Recipes</Link>
      </NewLogo>
    ) : (
      <NewLogo loggedIn={this.props.displayName}>My Recipes</NewLogo>
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
            <ButtonContainer w="20%">
              <AddRecipeButton>
                <Link to={"/createrecipe"}>ADD RECIPE</Link>
              </AddRecipeButton>
            </ButtonContainer>
            <ButtonContainer w="10%">
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
