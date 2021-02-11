import * as firebase from "firebase/app";
import "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clearAction } from "../actions/authActions";
import { signInAction } from "../actions/userActions";
import { Button, Container, Form, Input } from "./Input";

const config = {
  apiKey: "AIzaSyCvl1CTEcEWYM1681gUWSaawnHAV-PEgWo",
  authDomain: "my-recipes-da233.firebaseapp.com",
  databaseURL: "https://my-recipes-da233.firebaseio.com",
  projectId: "my-recipes-da233",
  storageBucket: "my-recipes-da233.appspot.com",
  appId: "1:1062905305210:web:e81f2b5d293bedc736c3c3",
  measurementId: "G-BJ3YHDCKZV",
};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const isActive = !error && !!email && !!password;

  useEffect(() => {
    setError("");
    setEmailError("");
    setPasswordError("");
  }, [email, password, setError, setEmailError, setPasswordError]);

  const validate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Email Required");
    }
    if (!password) {
      setPasswordError("Password Required");
    }
    if (email && password) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user?.user?.displayName && user?.user?.email && user?.user?.uid) {
          const { displayName, email, uid } = user?.user;
          dispatch(signInAction(displayName, email, uid));
          dispatch(clearAction());
          history.push("/");
        }
      })
      .catch(() => {
        setError("Email or Password not valid");
      });
  };

  return (
    <Container id="Auth">
      <h3>LOG IN</h3>
      <Form onSubmit={validate}>
        <Input
          error={emailError}
          name="Email"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          error={passwordError}
          name="Password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ color: "red" }}>{error}</div>
        <Button type="submit" isActive={isActive}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
