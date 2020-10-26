import React, { Component } from "react";
import Menu from "./Menu";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import Spacer from "./Spacer";
import { Link } from "react-router-dom";
import { withRouter, RouteComponentProps } from "react-router";
import AuthModal from "./AuthModal";

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
    props.loggedIn ? primaryColorOne : primaryColorTwo};
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

const Shadow = styled.div<LIProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: ${(props) => (props.loggedIn ? "55px" : "78px")};
  background-color: ${primaryColorTwo};
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
  mobileWidth: string;
}

const ButtonContainer = styled.div<BCProps>`
  width: ${(props) => props.w};
  display: flex;
  justify-content: center;
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

interface NavProps extends RouteComponentProps {
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
    this.toggleAuthView = this.toggleAuthView.bind(this);
    this.toggleMenuView = this.toggleMenuView.bind(this);
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

  toggleAuthView() {
    this.setState({ showAuth: !this.state.showAuth })
  }

  toggleMenuView() {
    this.setState({ showMenu: !this.state.showMenu })
  }

  handleMenuModal() {
    if (this.state.showMenu) {
      return (
        <>
          <Shadow
            loggedIn={this.props.displayName}
            onClick={() => this.toggleMenuView()}
          ></Shadow>
          <Menu toggleMenuView={this.toggleMenuView} />
        </>
      );
    } else {
      return false;
    }
  }
  
  render() {
    const { displayName } = this.props;
    return (
      <HeaderContainer
        id="Header"
        loggedIn={displayName ? "loggedIn" : null}
      >
        {displayName ? null : <LogoSpacer></LogoSpacer>}
        {this.handleLogo()}
        {displayName ? (
          <>
            <ButtonContainer id="add recipe button" w="20%"  mobileWidth="25%">
              {this.props.location.pathname === "/createrecipe" ? null : (
                <Link to={"/createrecipe"}>
                  <AddRecipeButton
                    onClick={() => this.setState({ showMenu: false })}
                  >
                    ADD RECIPE
                  </AddRecipeButton>
                </Link>
              )}
            </ButtonContainer>
            <ButtonContainer id="nav menu button" w="10%" mobileWidth="15%">
              <NavMenuButton
                className={this.state.showMenu ? "fas fa-times" : "fas fa-bars"}
                onClick={() => this.toggleMenuView()}
              ></NavMenuButton>
            </ButtonContainer>
          </>
        ) : (
          <>
            <ButtonContainer w="15%" mobileWidth="40%">
              <LogInButton onClick={() => this.toggleAuthView()}>
                {this.state.showAuth ? "CANCEL" : "LOG IN/ SIGN UP"}
              </LogInButton>
            </ButtonContainer>
            <Spacer />
          </>
        )}
        {this.handleMenuModal()}
        {AuthModal(this.state.showAuth, this.toggleAuthView, displayName )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
