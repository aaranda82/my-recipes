import React, { Component } from "react";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import firebase from "firebase";
import { ColorScheme } from "../ColorScheme";
import Spacer from "./Spacer";
import { withRouter } from "react-router";
const { connect } = require("react-redux");

const { ivory, blueMunsell, budGreen, gunmetal } = ColorScheme;

const MenuDiv = styled.div`
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

interface NavProps {
  displayName: string;
  signOut: () => void;
  toggleMenu: any;
  history: { push: any };
}

class Menu extends Component<NavProps> {
  constructor(props: NavProps) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleAccountRoute = this.handleAccountRoute.bind(this);
    this.handlePublicPageRoute = this.handlePublicPageRoute.bind(this);
  }

  handleSignOut() {
    this.props.history.push("/login");
    this.props.signOut();
    firebase.auth().signOut();
  }

  handleAccountRoute() {
    this.props.history.push("/account");
  }

  handlePublicPageRoute() {
    this.props.history.push("/publicpage");
  }

  render() {
    return (
      <>
        <MenuDiv>
          <div onClick={this.handlePublicPageRoute}>Public Page</div>
          <Spacer />
          <div>{this.props.displayName}'s Favorites</div>
          <Spacer />
          <div onClick={this.handleAccountRoute}>Account</div>
          <Spacer />
          <div onClick={this.handleSignOut}>Sign Out</div>
        </MenuDiv>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
