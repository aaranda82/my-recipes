import React, { Component } from "react";
import NavMenu from "./NavMenu";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import { ColorScheme } from "../ColorScheme";
import Spacer from "./Spacer";
const { connect } = require("react-redux");

const { blueMunsell, gunmetal, ivory } = ColorScheme;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  position: fixed;
  width: 100%;
  background-color: ${ivory};
`;

const LogoWithDN = styled.div`
  font-family: "Raleway", sans-serif;
  font-weight: 100;
  font-size: 3em;
  color: ${blueMunsell};
  flex: 6;
  margin: 20px 0px 20px 20px;
  text-align: left;
`;

const Logo = styled.div`
  font-family: "Raleway", sans-serif;
  font-weight: 100;
  font-size: 3em;
  color: ${blueMunsell};
  width: 100%;
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

interface NavProps {
  displayName: string;
  signOut: () => void;
}

interface NavState {
  isMenuOpen: boolean;
}

class Navbar extends Component<NavProps, NavState> {
  constructor(props: NavProps) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleLogo() {
    return this.props.displayName ? (
      <LogoWithDN>My Recipes</LogoWithDN>
    ) : (
      <Logo>My Recipes</Logo>
    );
  }

  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    return (
      <Nav id="NavBar">
        {this.handleLogo()}
        {this.props.displayName ? (
          <NavMenuButton
            className={this.state.isMenuOpen ? "fas fa-times" : "fas fa-bars"}
            onClick={this.toggleMenu}
          ></NavMenuButton>
        ) : null}
        <Spacer />
        {this.state.isMenuOpen ? (
          <NavMenu toggleMenu={this.toggleMenu} />
        ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
