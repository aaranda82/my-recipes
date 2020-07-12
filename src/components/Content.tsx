import React from "react";
import Auth from "./Auth";
import Count from "./Count";
const { connect } = require("react-redux");

function Content(props: { isSignedIn: boolean }) {
  if (props.isSignedIn) {
    return (
      <>
        <Auth />
        <Count />
      </>
    );
  } else {
    return <Auth />;
  }
}

const mapStateToProps = (state: { userReducer: { isSignedIn: boolean } }) => {
  return {
    isSignedIn: state.userReducer.isSignedIn,
  };
};

export default connect(mapStateToProps)(Content);
