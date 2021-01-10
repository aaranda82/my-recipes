import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";
import { RootState } from "../reducers/rootReducer";

const AccountContainer = styled.div`
  color: ${colorScheme.gunmetal};
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

const AccountPage = () => {
  const { displayName, email } = useSelector(
    (state: RootState) => state.userReducer,
  );
  return (
    <AccountContainer>
      <h1>ACCOUNT PAGE</h1>
      <InfoContainer>
        <DisplayName>{displayName}</DisplayName>
        <Email>{email}</Email>
      </InfoContainer>
    </AccountContainer>
  );
};

export default AccountPage;
