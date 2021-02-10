import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers/rootReducer";
import { colorScheme } from "../styles/colorScheme";

const { primaryColorOne } = colorScheme;
const SpacerDiv = styled.div<{ loggedIn: boolean }>`
  background: ${(props) => (props.loggedIn ? "black" : primaryColorOne)};
  height: 3px;
  width: 100%;
`;

export const Spacer = (): ReactElement => {
  const { uid } = useSelector((state: RootState) => state.userReducer);
  return <SpacerDiv loggedIn={!!uid} />;
};
