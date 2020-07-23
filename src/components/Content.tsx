import React from "react";
import LandingPage from "./LandingPage";
import UserLoggedIn from "./UserLoggedIn";
const { connect } = require("react-redux");

function Content(props: { displayName: string }) {
  if (props.displayName) {
    return <UserLoggedIn />;
  } else {
    return <LandingPage />;
  }
}

const mapStateToProps = (state: { userReducer: { displayName: boolean } }) => {
  return {
    displayName: state.userReducer.displayName,
  };
};

export default connect(mapStateToProps)(Content);
