import React from "react";
const { connect } = require("react-redux");

interface verifiedProps {
  displayName: string;
  email: string;
  uid: string;
}

function Verified(props: verifiedProps) {
  return (
    <>
      <div>Verified</div>
      <div>{props.displayName}</div>
      <div>{props.email}</div>
      <div>{props.uid}</div>
    </>
  );
}

interface mapState {
  userReducer: {
    displayName: string;
    email: string;
    uid: string;
  };
}
const mapStateToProps = (state: mapState) => {
  return {
    userReducer: {
      displayName: state.userReducer.displayName,
      email: state.userReducer.email,
      uid: state.userReducer.uid,
    },
  };
};

export default connect(mapStateToProps)(Verified);
