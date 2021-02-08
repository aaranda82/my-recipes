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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isActive = !error && !!email && !!password;

  useEffect(() => {
    setError("");
  }, [email, password, setError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <Form onSubmit={handleSubmit}>
        <Input
          error=""
          name="Email"
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          error=""
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
