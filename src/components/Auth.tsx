import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import styled from "styled-components";
import { signInAction, signOutAction } from "../actions/userActions";
import { RootState } from "../reducers/rootReducer";
import { ColorScheme } from "../ColorScheme";
const { connect } = require("react-redux");

const { gunmetal } = ColorScheme;

const config = {
  apiKey: "AIzaSyCvl1CTEcEWYM1681gUWSaawnHAV-PEgWo",
  authDomain: "my-recipes-da233.firebaseapp.com",
  databaseURL: "https://my-recipes-da233.firebaseio.com",
  projectId: "my-recipes-da233",
  appId: "1:1062905305210:web:e81f2b5d293bedc736c3c3",
  measurementId: "G-BJ3YHDCKZV",
};
firebase.initializeApp(config);

const Container = styled.div`
  margin: 50px;
  font-family: "Raleway", sans-serif;
  font-size: 2em;
  color: ${gunmetal};
`;

interface AuthProps {
  displayName: string;
  isSignedIn: boolean;
  signIn: (d: string | null, e: string | null, u: string | null) => void;
  signOut: () => void;
}

class Auth extends Component<AuthProps> {
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: () => {
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
        <p>Please enter email to log in/register</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
