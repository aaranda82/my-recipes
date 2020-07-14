import React, { Component } from "react";
import {
  countIncrementAction,
  countDecrementAction,
} from "../actions/countActions";
import styled from "styled-components";
import firebase from "firebase";
const { connect } = require("react-redux");

const Container = styled.div`
  border: 1px solid red;
  width: 80%;
`;

interface CountProps {
  count: number;
  displayName: string;
  increment: () => void;
  decrement: () => void;
}

class Count extends Component<CountProps> {
  constructor(props: CountProps) {
    super(props);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
  }

  handleIncrement() {
    this.props.increment();
  }

  handleDecrement() {
    this.props.decrement();
    console.log(firebase.auth().currentUser?.displayName);
  }

  render() {
    return (
      <Container>
        <h1>Count it!</h1>
        <p>Hey {this.props.displayName}, are you ready to count stuff!</p>
        <div>{this.props.count}</div>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleDecrement}>decrement</button>
      </Container>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);
