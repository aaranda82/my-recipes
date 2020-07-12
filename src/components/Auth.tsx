import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { signInAction, signOutAction } from "../actions/userActions";
import { RootState } from "../reducers/rootReducer";
const { connect } = require("react-redux");

const config = {
  apiKey: "AIzaSyCvl1CTEcEWYM1681gUWSaawnHAV-PEgWo",
  authDomain: "my-recipes-da233.firebaseapp.com",
  databaseURL: "https://my-recipes-da233.firebaseio.com",
  projectId: "my-recipes-da233",
  appId: "1:1062905305210:web:e81f2b5d293bedc736c3c3",
  measurementId: "G-BJ3YHDCKZV",
};
firebase.initializeApp(config);

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
      <div>
        <h1>My Recipes</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
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
