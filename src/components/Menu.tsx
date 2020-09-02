import React, { Component } from "react";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import firebase from "firebase";
import { ColorScheme } from "../ColorScheme";
import Spacer from "./Spacer";
import { Link } from "react-router-dom";
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
  uid: string;
  signOut: () => void;
  toggleMenu: () => void;
  history: { push: any };
}

class Menu extends Component<NavProps> {
  constructor(props: NavProps) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.toggleMenu();
    this.props.signOut();
    firebase.auth().signOut();
  }

  render() {
    return (
      <>
        <MenuDiv>
          <Link
            to={"/publicpage"}
            style={{ textDecoration: "none", color: blueMunsell }}
          >
            <div onClick={this.props.toggleMenu}>Public Page</div>
          </Link>
          <Spacer />

          <Link
            to={`/userpage/${this.props.uid}`}
            style={{ textDecoration: "none", color: blueMunsell }}
          >
            <div onClick={this.props.toggleMenu}>
              {this.props.displayName}'s Favorites
            </div>
          </Link>

          <Spacer />
          <Link
            to={"/account"}
            style={{ textDecoration: "none", color: blueMunsell }}
          >
            <div onClick={this.props.toggleMenu}>Account</div>
          </Link>
          <Spacer />
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: blueMunsell }}
          >
            <div onClick={this.handleSignOut}>Sign Out</div>
          </Link>
        </MenuDiv>
      </>
    );
  }
}

interface mapState {
  userReducer: {
    displayName: string;
    uid: string;
  };
}

const mapStateToProps = (state: mapState) => {
  return {
    displayName: state.userReducer.displayName,
    uid: state.userReducer.uid,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => {
      dispatch(signOutAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);