import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import styled from "styled-components";
import { signInAction, signOutAction } from "../actions/userActions";
import { RootState } from "../reducers/rootReducer";
import { ColorScheme } from "../ColorScheme";
import { withRouter } from "react-router";
const { connect } = require("react-redux");

const { gunmetal, snow } = ColorScheme;

const config = {
  apiKey: "AIzaSyCvl1CTEcEWYM1681gUWSaawnHAV-PEgWo",
  authDomain: "my-recipes-da233.firebaseapp.com",
  databaseURL: "https://my-recipes-da233.firebaseio.com",
  projectId: "my-recipes-da233",
  appId: "1:1062905305210:web:e81f2b5d293bedc736c3c3",
  measurementId: "G-BJ3YHDCKZV",
};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

const Container = styled.div`
  position: absolute;
  top: 25vh;
  background-color: ${snow};
  color: ${gunmetal};
  text-align: center;
  font-family: "Raleway", sans-serif;
  padding: 50px;
  & h3 {
    padding-top: 0;
  }
`;
interface AuthProps {
  displayName: string;
  uid: string;
  isSignedIn: boolean;
  signIn: (d: string | null, e: string | null, u: string | null) => void;
  signOut: () => void;
  history: { push: any };
  toggleState: (s: string) => void;
}

class Auth extends Component<AuthProps> {
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: () => {
        this.props.toggleState("showAuth");
        this.props.history.push("/");
        return false;
      },
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.signIn(user.displayName, user.email, user.uid);
      } else {
        console.log("no user");
      }
    });
  }

  render() {
    return (
      <Container id="Auth">
        <h3>Please enter email to log in/register</h3>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    displayName: state.userReducer.displayName,
    email: state.userReducer.email,
    uid: state.userReducer.uid,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: (displayName: string, email: string, uid: string) => {
      dispatch(signInAction(displayName, email, uid));
    },
    signOut: () => {
      dispatch(signOutAction());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
