import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const { primaryColorTwo, primaryColorOne } = ColorScheme;
const SpacerDiv = styled.div`
  background: radial-gradient(${primaryColorOne} 10%, ${primaryColorTwo} 60%);
  height: 3px;
  width: 100%;
`;

function Spacer() {
  return <SpacerDiv />;
}

export default Spacer;
