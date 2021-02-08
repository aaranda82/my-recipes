import React, { ReactElement } from "react";
import styled from "styled-components";
import { colorScheme } from "../styles/colorScheme";

const { primaryColorOne } = colorScheme;
const SpacerDiv = styled.div`
  background: ${primaryColorOne};
  height: 3px;
  width: 100%;
`;

export const Spacer = (): ReactElement => <SpacerDiv />;
