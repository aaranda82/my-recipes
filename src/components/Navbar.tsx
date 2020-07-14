import React, { Component } from "react";
import firebase from "firebase";
import styled from "styled-components";
import { signOutAction } from "../actions/userActions";
const { connect } = require("react-redux");

const Nav = styled.div`
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  & h1 {
    flex: 6;
    margin-left: 1rem;
  }
  & div {
    flex: 1;
  }
`;

const NavItems = styled.div`
  display: flex:
  flex-wrap: wrap;
  justify-content: center;
  & div{
    text-align: center;
  }
`;

const SignOutBtn = styled.button`
  cursor: pointer;
`;

const Span = styled.span`
  color: red;
`;

interface NavProps {
  displayName: string;
  signOut: () => void;
}

class Navbar extends Component<NavProps> {
  constructor(props: NavProps) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.signOut();
    firebase.auth().signOut();
  }

  render() {
    return (
      <Nav>
        <h1>
          {" "}
          <Span>M</Span>Y <Span>R</Span>ECIPES
        </h1>
        <NavItems>
          <div>{this.props.displayName}</div>
          <div>
            {this.props.displayName ? (
              <SignOutBtn onClick={this.handleSignOut}>SIGN OUT</SignOutBtn>
            ) : null}
          </div>
        </NavItems>
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
