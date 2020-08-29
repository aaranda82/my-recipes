import React from "react";
import { RootState } from "../reducers/rootReducer";
const { connect } = require("react-redux");

function AccountPage(props: { displayName: string; email: string }) {
  console.log(props);
  return (
    <>
      <h1>ACCOUNT PAGE</h1>
      <h2>{props.displayName}</h2>
      <p>{props.email}</p>
    </>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    displayName: state.userReducer.displayName,
    email: state.userReducer.email,
    uid: state.userReducer.uid,
  };
};

export default connect(mapStateToProps)(AccountPage);
