import React from "react";
import styled from "styled-components";
import { RootState } from "../reducers/rootReducer";
import { ColorScheme } from "../ColorScheme";
const { useSelector } = require("react-redux");

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

function AccountPage() {
  const props = useSelector((state: RootState) => state)
  const { displayName, email } = props.userReducer;
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

export default AccountPage;