import React, { Component } from "react";
import {
  countIncrementAction,
  countDecrementAction,
} from "../actions/countActions";
const { connect } = require("react-redux");

interface CountProps {
  count: number;
  increment: () => void;
  decrement: () => void;
  displayName: string;
  email: string;
  uid: string;
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
  }

  render() {
    return (
      <>
        <h2>Count it!</h2>
        <div>{this.props.count}</div>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleDecrement}>decrement</button>
      </>
    );
  }
}

interface mapState {
  userReducer: {
    displayName: string;
    email: string;
    uid: string;
  };
  countReducer: {
    count: number;
  };
}
const mapStateToProps = (state: mapState) => {
  return {
    displayName: state.userReducer.displayName,
    email: state.userReducer.email,
    uid: state.userReducer.uid,
    count: state.countReducer.count,
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
