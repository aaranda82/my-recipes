import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import styled from "styled-components";
import { signInAction, signOutAction } from "../actions/userActions";
import { clearAction } from "../actions/authActions";
import { RootState } from "../reducers/rootReducer";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import { withRouter } from "react-router";
const { connect } = require("react-redux");

const { mobileMaxWidth } = Styles;
const { gunmetal, redOrange, primaryColorTwo, primaryColorOne, accentColorOne } = ColorScheme;

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

export const Container = styled.div`
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

interface IProps {
  error: string;
}

export const FormGroup = styled.div<IProps>`
  margin: 10px 0;
  background-color: ${(props) => props.error ? redOrange : accentColorOne};
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
`;

export const Label = styled.label`
  width: 40%;
`;

export const Input = styled.input`
  width: 55%;
  border: none;
  background-color: transparent;
  outline: none;
`;

interface AuthProps {
  displayName: string;
  uid: string;
  isSignedIn: boolean;
  signIn: (d: string | null, e: string | null, u: string | null) => void;
  signOut: () => void;
  history: { push: any };
  clear: () => void;
}

interface IState {
  email: string;
  password: string;
}

class LogIn extends Component<AuthProps, IState> {
  constructor(props: AuthProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: e.target.value })
  }
  
  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value })
  }

  handleSubmit(e: any) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
      this.props.clear();
      this.props.history.push("/");
      console.log(user)
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid } = user
        this.props.signIn(displayName, email, uid); 
      } else {
        console.log("no user");
      }
    });
  }

  render() {
    return (
      <Container id="Auth">
        <h3>Please enter email to log in/register</h3>
        <form onSubmit={this.handleSubmit}>
          <FormGroup error="">
            <Label htmlFor="email">
              email 
            </Label>
            <Input 
              autoComplete="email"  
              type="text" 
              value={this.state.email} 
              onChange={this.handleUserNameChange}
              placeholder="Your email"
            />
          </FormGroup>
          <FormGroup error="">
            <Label htmlFor="Password">
              Password 
            </Label>
            <Input 
              autoComplete="new-password" 
              type="password" 
              value={this.state.password} 
              onChange={this.handlePasswordChange}
              placeholder="Your Password"
            />
          </FormGroup>
          <button type="submit">Submit</button>
        </form>
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
    clear: () => {
      dispatch(clearAction());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
