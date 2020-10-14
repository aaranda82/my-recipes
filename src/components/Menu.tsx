import React, { Component } from "react";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
import firebase from "firebase";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import Spacer from "./Spacer";
import { Link } from "react-router-dom";
const { connect } = require("react-redux");

const {
  primaryColorTwo,
  primaryColorOne,
  accentColorOne,
  gunmetal,
} = ColorScheme;

const MContainer = styled.div`
  font-size: 2em;
  font-family: ${Styles.secondaryFont};
  font-weight: 600;
  color: ${primaryColorOne};
  position: absolute;
  top: 55px;
  right: 0;
  padding: 20px 70px 20px 70px;
  background: ${primaryColorTwo};
  border: 1px solid ${gunmetal};
  & > div {
    margin: 40px;
    cursor: pointer;
    transition: all 1s ease;
  }
  & > div:hover {
    color: ${accentColorOne};
  }
`;

interface NavProps {
  displayName: string;
  uid: string;
  signOut: () => void;
  toggleState: (s: string) => void;
  history: { push: any };
}

class Menu extends Component<NavProps> {
  constructor(props: NavProps) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.toggleState("showMenu");
    this.props.signOut();
    firebase.auth().signOut();
  }

  render() {
    return (
      <>
        <MContainer>
          <Link
            to={"/publicpage"}
            style={{ textDecoration: "none", color: primaryColorOne }}
          >
            <div onClick={() => this.props.toggleState("showMenu")}>
              Public Page
            </div>
          </Link>
          <Spacer />

          <Link
            to={`/userpage/${this.props.uid}`}
            style={{ textDecoration: "none", color: primaryColorOne }}
          >
            <div onClick={() => this.props.toggleState("showMenu")}>
              {this.props.displayName}'s Favorites
            </div>
          </Link>

          <Spacer />
          <Link
            to={"/account"}
            style={{ textDecoration: "none", color: primaryColorOne }}
          >
            <div onClick={() => this.props.toggleState("showMenu")}>
              Account
            </div>
          </Link>
          <Spacer />
          <Link
            to={"/"}
            style={{ textDecoration: "none", color: primaryColorOne }}
          >
            <div onClick={this.handleSignOut}>Sign Out</div>
          </Link>
        </MContainer>
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
