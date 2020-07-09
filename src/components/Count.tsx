import React, { Component } from "react";
import { incrementAction, decrementAction } from "../actions/actions";
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
        <div>{this.props.count}</div>
        <div>{this.props.displayName}</div>
        <div>{this.props.email}</div>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleDecrement}>decrement</button>
      </>
    );
  }
}

interface mapState {
  countReducer: {
    count: number;
  };
  userReducer: {
    displayName: string;
    email: string;
    uid: string;
  };
}
const mapStateToProps = (state: mapState) => {
  return {
    count: state.countReducer.count,
    displayName: state.userReducer.displayName,
    email: state.userReducer.email,
    uid: state.userReducer.uid,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: () => {
      dispatch(incrementAction());
    },
    decrement: () => {
      dispatch(decrementAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);
