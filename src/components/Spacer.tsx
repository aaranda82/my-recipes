import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const { ivory, blueMunsell } = ColorScheme;
const SpacerDiv = styled.div`
  background: radial-gradient(${blueMunsell} 10%, ${ivory} 60%);
  height: 3px;
  width: 100%;
`;

function Spacer() {
  return <SpacerDiv />;
}

export default Spacer;
