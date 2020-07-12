import React from "react";
import Auth from "./Auth";
import Count from "./Count";
const { connect } = require("react-redux");

function Content(props: { displayName: string }) {
  if (props.displayName) {
    return <Count />;
  } else {
    return <Auth />;
  }
}

const mapStateToProps = (state: { userReducer: { displayName: boolean } }) => {
  return {
    displayName: state.userReducer.displayName,
  };
};

export default connect(mapStateToProps)(Content);
