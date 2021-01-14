import firebase from "firebase";
import React, { Component } from "react";
import { clearAction } from "../actions/authActions";
import { signInAction } from "../actions/userActions";
import { Button, Container, Form, FormGroup, Input, Label } from "./LogIn";
import { connect } from "react-redux";

interface IState {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
  userNameError: string;
  passwordError: string;
  confirmPasswordError: string;
  emailError: string;
}

interface IProps {
  clear: () => void;
  signIn: (displayName: string, email: string, uid: string) => void;
}

class SignUp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      userNameError: "",
      passwordError: "",
      confirmPasswordError: "",
      emailError: "",
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this,
    );
    this.validateUserName = this.validateUserName.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserNameChange(e: any) {
    e.preventDefault();
    this.setState({ userName: e.target.value }, () => this.validateUserName());
  }

  validateUserName() {
    let userNameError = "";
    if (this.state.userName.length < 3) {
      userNameError = "Must be at least 3 letters";
    }
    this.setState({ userNameError });
  }

  handleEmailChange(e: any) {
    e.preventDefault();
    this.setState({ email: e.target.value }, () => this.validateEmail());
  }

  validateEmail() {
    let emailError = "";
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(this.state.email)) {
      emailError = "Invalid Email";
    }
    this.setState({ emailError });
  }

  handlePasswordChange(e: any) {
    e.preventDefault();
    this.setState({ password: e.target.value }, () => this.validatePassword());
  }

  validatePassword() {
    let passwordError = "";
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!regex.test(this.state.password)) {
      passwordError = "Invlaid Password";
    }
    this.setState({ passwordError });
  }

  handleConfirmPasswordChange(e: any) {
    e.preventDefault();
    this.setState({ confirmPassword: e.target.value }, () =>
      this.validateConfirmPassword(),
    );
  }

  validateConfirmPassword() {
    let confirmPasswordError = "";
    if (this.state.password !== this.state.confirmPassword) {
      confirmPasswordError = "Passwords do not match";
    }
    this.setState({ confirmPasswordError });
  }

  clearUserState() {
    this.setState({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  addFirebaseUser(userName: string, email: string, uid: string) {
    firebase
      .database()
      .ref("users/" + uid)
      .set({
        email,
        userName,
      });
  }

  submitNewUser() {
    const {
      userName,
      password,
      email,
      userNameError,
      passwordError,
      confirmPasswordError,
      emailError,
    } = this.state;
    if (
      !userNameError &&
      !passwordError &&
      !emailError &&
      !confirmPasswordError
    ) {
      console.log(`New user: ${email}`);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          if (user) {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                user.updateProfile({
                  displayName: userName,
                });
              }
            });
            if (user.user && typeof user.user.email === "string") {
              const { email, uid } = user.user;
              this.props.signIn(userName, email, uid);
              this.clearUserState();
              this.addFirebaseUser(userName, email, uid);
              this.props.clear();
            }
          }
        })
        .catch((error) => console.log("Error creating user: ", error));
    }
  }

  async handleSubmit(e: any) {
    e.preventDefault();
    await this.validateUserName();
    await this.validatePassword();
    await this.validateConfirmPassword();
    await this.validateEmail();
    this.submitNewUser();
  }

  renderInput(
    name: string,
    type: string,
    value: string,
    error: string,
    onChange: (e: any) => void,
    onBlur: () => void,
  ) {
    return (
      <FormGroup error={error}>
        <Label htmlFor={name}>{name}</Label>
        <Input
          type={type}
          placeholder={
            name === "Confirm Password" ? "Confirm Password" : `Enter ${name}`
          }
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div style={{ width: "100%" }}>{error}</div>
      </FormGroup>
    );
  }

  render() {
    const {
      userName,
      password,
      confirmPassword,
      email,
      userNameError,
      passwordError,
      confirmPasswordError,
      emailError,
    } = this.state;
    return (
      <Container>
        <h3>CREATE ACCOUNT</h3>
        <Form onSubmit={this.handleSubmit}>
          {this.renderInput(
            "User Name",
            "text",
            userName,
            userNameError,
            this.handleUserNameChange,
            this.validateUserName,
          )}
          {this.renderInput(
            "Email",
            "text",
            email,
            emailError,
            this.handleEmailChange,
            this.validateEmail,
          )}
          {this.renderInput(
            "Password",
            "password",
            password,
            passwordError,
            this.handlePasswordChange,
            this.validatePassword,
          )}
          {this.renderInput(
            "Confirm Password",
            "password",
            confirmPassword,
            confirmPasswordError,
            this.handleConfirmPasswordChange,
            this.validateConfirmPassword,
          )}
          <Button type="submit">SUBMIT</Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: (displayName: string, email: string, uid: string) => {
      dispatch(signInAction(displayName, email, uid));
    },
    clear: () => {
      dispatch(clearAction());
    },
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
