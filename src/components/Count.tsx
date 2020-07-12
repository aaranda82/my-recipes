import React, { Component } from "react";
import {
  countIncrementAction,
  countDecrementAction,
} from "../actions/countActions";
import firebase from "firebase";
import { signOutAction } from "../actions/userActions";
const { connect } = require("react-redux");

interface CountProps {
  count: number;
  displayName: string;
  increment: () => void;
  decrement: () => void;
  signOut: () => void;
}

class Count extends Component<CountProps> {
  constructor(props: CountProps) {
    super(props);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleIncrement() {
    this.props.increment();
  }

  handleDecrement() {
    this.props.decrement();
  }

  handleSignOut() {
    this.props.signOut();
    firebase.auth().signOut();
  }

  render() {
    return (
      <>
        <h1>Count it!</h1>
        <p>Hey {this.props.displayName}, are you ready to count stuff!</p>
        <div>{this.props.count}</div>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleDecrement}>decrement</button>
        <button onClick={this.handleSignOut}>SIGN OUT</button>
      </>
    );
  }
}

interface mapState {
  userReducer: {
    displayName: string;
  };
  countReducer: {
    count: number;
  };
}
const mapStateToProps = (state: mapState) => {
  return {
    count: state.countReducer.count,
    displayName: state.userReducer.displayName,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: () => {
      dispatch(countIncrementAction());
    },
    decrement: () => {
      dispatch(countDecrementAction());
    },
    signOut: () => {
      dispatch(signOutAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);
