import React, { Component } from "react";
import { increment, decrement } from "../actions/actions";
const { connect } = require("react-redux");

interface CountProps {
  count: number;
  increment: any;
  decrement: any;
}

class Count extends Component<CountProps> {
  constructor(props: any) {
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
    console.log(this.props);
    return (
      <>
        <div>{this.props.count}</div>
        <button onClick={this.handleIncrement}>increment</button>
        <button onClick={this.handleDecrement}>decrement</button>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: () => {
      dispatch(increment());
    },
    decrement: () => {
      dispatch(decrement());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);
