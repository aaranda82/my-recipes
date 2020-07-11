import React from "react";
import Auth from "./Auth";
import Count from "./Count";
const { connect } = require("react-redux");

function Content(props: { view: string }) {
  console.log(props);
  switch (props.view) {
    case "Landing Page":
      return (
        <>
          <div>AUTH CONTENT</div>
          <Auth />
        </>
      );
    case "Logged In":
      return (
        <>
          <div>COUNT CONTENT</div>
          <Count />
        </>
      );
  }
}

const mapStateToProps = (state: { viewReducer: { view: string } }) => {
  return { view: state.viewReducer.view };
};

export default connect(mapStateToProps)(Content);
