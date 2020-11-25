import React from "react";
import { RootState } from "../reducers/rootReducer";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";
const { connect } = require("react-redux");

const AccountContainer = styled.div`
  color: ${ColorScheme.gunmetal};
  text-align: center;
`;

const InfoContainer = styled.div`
  width: fit-content;
  margin: auto;
  text-align: left;
`;

const DisplayName = styled.h2`
  width: 100%;
  margin: 20px auto;
`;

const Email = styled.p`
  width: 100%;
  margin: auto;
`;

function AccountPage(props: { displayName: string; email: string }) {
  const { displayName, email } = props
  return (
    <AccountContainer>
      <h1>ACCOUNT PAGE</h1>
      <InfoContainer>
        <DisplayName>{displayName}</DisplayName>
        <Email>{email}</Email>
      </InfoContainer>
    </AccountContainer>
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
