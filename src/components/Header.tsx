import React, { Component } from "react";
import Menu from "./Menu";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import { ColorScheme } from "../ColorScheme";
import Spacer from "./Spacer";
import { Link } from "react-router-dom";
import Auth from "./Auth";
const { connect } = require("react-redux");

const { blueMunsell, gunmetal, ivory } = ColorScheme;

const Nav = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  position: sticky;
  width: 100%;
  background-color: ${ivory};
  z-index: 5;
`;

const LoggedInLogo = styled.div`
  font-family: "Raleway", sans-serif;
  font-weight: 100;
  font-size: 3em;
  flex: 6;
  margin: 20px 0px 20px 20px;
  text-align: left;
`;

const Logo = styled.div`
  font-family: "Raleway", sans-serif;
  font-weight: 100;
  font-size: 3em;
  width: 90%;
  margin: 20px 0px 20px 0px;
`;

const NavMenuButton = styled.div`
  font-size: 2em;
  color: ${blueMunsell};
  display: flex:
  flex-wrap: wrap;
  justify-content: center;
  margin-right: 20px;
  transition: all 0.5s ease;
  &:hover {
    color: ${gunmetal};
  }
`;

const Shadow = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: ${gunmetal};
  opacity: 0.6;
  top: 99px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const LogInButton = styled.button`
  border: none;
  background-color: ${blueMunsell};
  opacity: 0.6;
  color: ${ivory};
  padding: 10px 20px;
  &:hover {
    opacity: 1;
  }
  &:active {
    transform: scale(1.2);
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
      <LoggedInLogo>
        <Link to={"/"} style={{ textDecoration: "none", color: blueMunsell }}>
          My Recipes
        </Link>
      </LoggedInLogo>
    ) : (
      <Logo>
        <Link to={"/"} style={{ textDecoration: "none", color: blueMunsell }}>
          My Recipes
        </Link>
      </Logo>
    );
  }

  toggleState(s: string) {
    if (s === "showMenu") {
      this.setState({ showMenu: !this.state.showMenu });
    } else if (s === "showAuth") {
      this.setState({ showAuth: !this.state.showAuth });
    }
  }

  renderMenu() {
    if (this.props.displayName && this.state.showMenu) {
      return (
        <>
          <Shadow onClick={() => this.toggleState("showMenu")}></Shadow>
          <Menu toggleState={this.toggleState} />
        </>
      );
    } else {
      return false;
    }
  }

  renderAuth() {
    if (this.state.showAuth) {
      const authProps = {
        toggleState: this.toggleState,
      };
      return (
        <>
          <Shadow onClick={() => this.toggleState("showAuth")}></Shadow>
          <Auth {...authProps} />
        </>
      );
    } else {
      return false;
    }
  }

  render() {
    return (
      <Nav id="Header">
        {this.handleLogo()}
        {this.props.displayName ? (
          <NavMenuButton
            className={this.state.showMenu ? "fas fa-times" : "fas fa-bars"}
            onClick={() => this.toggleState("showMenu")}
          ></NavMenuButton>
        ) : (
          <ButtonContainer>
            <LogInButton onClick={() => this.toggleState("showAuth")}>
              {this.state.showAuth ? "CANCEL" : "LOG IN"}
            </LogInButton>
          </ButtonContainer>
        )}
        <Spacer />
        {this.renderMenu()}
        {this.renderAuth()}
      </Nav>
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
