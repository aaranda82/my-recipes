import React from "react";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";

const Nav = styled.footer`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Anchor = styled.a`
  padding-left: 5px;
  text-decoration: none;
  color: ${colorScheme.accentColorOne};
`;

function Footer() {
  return (
    <Nav>
      Created by
      <Anchor
        href="https://alex-aranda.com/"
        target="_blank"
        rel="noopener noreferrer">
        Alex Aranda
      </Anchor>
    </Nav>
  );
}

export default Footer;
