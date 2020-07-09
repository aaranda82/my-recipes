import React from "react";
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import auth from "../fbAuth";
import { signInAction } from "../actions/userActions";
const { connect } = require("react-redux");

interface authProps {
  displayName: string;
  signIn: (d: string, e: string, u: string) => void;
}

function Auth(props: authProps) {
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult: any, redirectUrl: string) => {
        const { displayName, email, uid } = authResult.user;
        props.signIn(displayName, email, uid);
        return true;
      },
    },
    signInSuccessUrl: "http://localhost:3000/count",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  // Initialize the FirebaseUI Widget using Firebase.
  const ui =
    firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);

  return <div id="firebaseui-auth-container"></div>;
}

interface mapState {
  countReducer: {
    count: number;
  };
  userReducer: {
    displayName: string;
    email: string;
    uid: string;
  };
}
const mapStateToProps = (state: mapState) => {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
