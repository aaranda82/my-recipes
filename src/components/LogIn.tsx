import React, { Component } from "react";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase/app";
import "firebase/auth";
// import * as firebaseui from "firebaseui";
import styled from "styled-components";
import { signInAction, signOutAction } from "../actions/userActions";
import { RootState } from "../reducers/rootReducer";
import { ColorScheme } from "../ColorScheme";
import { Styles } from "../Styles";
import { withRouter } from "react-router";
const { connect } = require("react-redux");

const { mobileMaxWidth } = Styles;
const { gunmetal, primaryColorTwo, primaryColorOne, accentColorOne } = ColorScheme;

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

  const FormGroup = styled.div`
    margin: 10px 0;
    background-color: ${accentColorOne};
    display: flex;
    padding: 10px 0;
  `;

  const Label = styled.label`
    margin: auto;
  `;

  const Input = styled.input`
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
  toggleAuthView: () => void;
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
  // uiConfig = {
  //   callbacks: {
  //     signInSuccessWithAuthResult: (authResult: any) => {
  //       this.props.toggleAuthView();
  //       this.props.history.push("/");
  //       console.log(authResult)  // check to see if this is a new user with 'authResult.additionalUserInfo.isNewUser'
  //       if(authResult.additionalUserInfo.isNewUser) {
  //         console.log("write user name to DB")
  //       }
  //       return false;
  //     },
  //   },
  //   credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  //   signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  // };

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
    // Signed in 
      this.props.toggleAuthView();
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
        {/* <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        /> */}
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
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
          <FormGroup>
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
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
