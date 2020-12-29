import * as firebase from "firebase/app";
import "firebase/auth";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styled from "styled-components";
import { clearAction } from "../../actions/authActions";
import { signInAction, signOutAction } from "../../actions/userActions";
import { ColorScheme } from "../../ColorScheme";
import { RootState } from "../../reducers/rootReducer";
import { Styles } from "../../Styles";

const { mobileMaxWidth, primaryFont } = Styles;
const {
  gunmetal,
  redOrange,
  primaryColorTwo,
  primaryColorOne,
  accentColorOne,
} = ColorScheme;

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

export const Form = styled.form`
  width: 300px;
`;

export const FormGroup = styled.div<IProps>`
  margin: 10px 0;
  background-color: ${(props) => (props.error ? redOrange : accentColorOne)};
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

export const Button = styled.button`
  cursor: pointer;
  background-color: orange;
  border: none;
  padding: 5px;
  border-raius: 3px;
  font-family: ${primaryFont};
  min-width: 150px;
  color: ${primaryColorTwo};
  &:hover {
    background-color: black;
  }
`;

interface AuthProps {
  displayName: string;
  uid: string;
  history: { push: any };
  signIn: (d: string, e: string, u: string) => void;
  signOut: () => void;
  clear: () => void;
}

interface IState {
  email: string;
  password: string;
  error: string;
}

class LogIn extends Component<AuthProps, IState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e: any) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        if (user?.user?.displayName && user?.user?.email && user?.user?.uid) {
          const { displayName, email, uid } = user?.user;
          this.props.signIn(displayName, email, uid);
          this.props.clear();
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  handleFormGroups(
    // name: string,
    // value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type: string,
  ) {
    return (
      <FormGroup error="">
        <Label htmlFor="name">{name}</Label>
        <Input
          autoComplete="name"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`Your ${name}`}
        />
      </FormGroup>
    );
  }

  render() {
    return (
      <Container id="Auth">
        <h3>LOG IN</h3>
        <Form onSubmit={this.handleSubmit}>
          {this.handleFormGroups(
            "Email",
            this.state.email,
            this.handleUserNameChange,
            "text",
          )}
          {this.handleFormGroups(
            "Password",
            this.state.password,
            this.handlePasswordChange,
            "password",
          )}
          <div style={{ color: "red" }}>{this.state.error}</div>
          <Button type="submit">Submit</Button>
        </Form>
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
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LogIn));
