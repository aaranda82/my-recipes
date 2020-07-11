import React from "react";
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import auth from "../fbAuth";
import { signInAction } from "../actions/userActions";
import { loggedInViewAction } from "../actions/viewActions";
const { connect } = require("react-redux");

interface authProps {
  displayName: string;
  signIn: (d: string, e: string, u: string) => void;
  setView: () => void;
}

function Auth(props: authProps) {
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult: any, redirectUrl: string) => {
        const { displayName, email, uid } = authResult.user;
        props.signIn(displayName, email, uid);
        if (uid) {
          props.setView();
          console.log("Successfuly signed in");
        } else {
          console.log("Please log in");
        }
        return false;
      },
    },
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
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
  viewReducer: {
    view: string;
  };
}
const mapStateToProps = (state: mapState) => {
  return {
    displayName: state.userReducer.displayName,
    email: state.userReducer.email,
    uid: state.userReducer.uid,
    view: state.viewReducer.view,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: (displayName: string, email: string, uid: string) => {
      dispatch(signInAction(displayName, email, uid));
    },
    setView: () => {
      dispatch(loggedInViewAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
