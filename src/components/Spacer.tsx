import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const { primaryColorOne } = ColorScheme;
const SpacerDiv = styled.div`
  background: ${primaryColorOne};
  height: 3px;
  width: 100%;
`;

function Spacer() {
  return <SpacerDiv />;
}

export default Spacer;
