import React, { Component } from "react";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import firebase from "firebase";
import { ColorScheme } from "../ColorScheme";
import Spacer from "./Spacer";
const { connect } = require("react-redux");

const { ivory, blueMunsell, budGreen, gunmetal } = ColorScheme;

const Menu = styled.div`
  font-size: 2em;
  font-family: "Quattrocento", serif;
  font-weight: 600;
  color: ${blueMunsell};
  position: absolute;
  top: 99px;
  right: 0;
  padding: 20px 70px 20px 70px;
  background: ${ivory};
  border: 1px solid ${gunmetal};
  & > div {
    margin: 40px;
    cursor: pointer;
    transition: all 1s ease;
  }
  & > div:hover {
    color: ${budGreen};
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

interface NavProps {
  displayName: string;
  signOut: () => void;
  toggleMenu: () => void;
}

class NavMenu extends Component<NavProps> {
  constructor(props: NavProps) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.signOut();
    firebase.auth().signOut();
    this.props.toggleMenu();
  }

  render() {
    return (
      <>
        <Shadow onClick={this.props.toggleMenu}></Shadow>
        <Menu>
          <div>{this.props.displayName}</div>
          <Spacer />
          <div>Favorites</div>
          <Spacer />
          <div>Account</div>
          <Spacer />
          <div onClick={this.handleSignOut}>Sign Out</div>
        </Menu>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
