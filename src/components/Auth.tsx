import * as firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import React, { useCallback, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { signInAction } from "../actions/userActions";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";

const { mobileMaxWidth } = Styles;
const { gunmetal, primaryColorTwo, primaryColorOne } = ColorScheme;

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
  border-radius: 20px;
  box-shadow: 5px 5px ${primaryColorOne};
  position: fixed;
  top: 25vh;
  left: 50%;
  transform: translatex(-50%);
  background-color: ${primaryColorTwo};
  color: ${gunmetal};
  text-align: center;
  font-family: "Raleway", sans-serif;
  padding: 50px;
  & h3 {
    padding-top: 0;
  }
  @media screen and (max-width: ${mobileMaxWidth}) {
    width: 80%;
    padding: 20px;
  }
`;

interface Props {
  toggleAuthView: () => void;
}

const Auth = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult: any) => {
        history.push("/");
        console.log(authResult); // check to see if this is a new user with 'authResult.additionalUserInfo.isNewUser'
        if (authResult.additionalUserInfo.isNewUser) {
          console.log("write user name to DB");
        }
        props.toggleAuthView();
        return false;
      },
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  };

  const handleAuthStateChange = useCallback(
    (user: firebase.User | null) => {
      if (user?.email && user?.uid) {
        const stringName = user.displayName || "";
        dispatch(signInAction(stringName, user.email, user.uid));
      } else {
        console.log("Missing email and/or uid");
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(handleAuthStateChange);

    return () => unsubscribe();
  }, [handleAuthStateChange, props]);

  return (
    <Container id="Auth">
      <h3>Please enter email to log in/register</h3>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Container>
  );
};

export default Auth;
