import React, { Component } from "react";
import { incrementAction, decrementAction } from "../actions/actions";
const { connect } = require("react-redux");

interface CountProps {
  count: number;
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
  }

  render() {
    return (
      <>
        <div>{this.props.count}</div>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleDecrement}>decrement</button>
      </>
    );
  }
}

const mapStateToProps = (state: { count: number }) => {
  return {
    count: state.count,
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
