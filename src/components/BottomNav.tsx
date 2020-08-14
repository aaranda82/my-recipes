import React from "react";
import styled from "styled-components";

const Nav = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function BottomNav() {
  return (
    <Nav>
      Created by
      <br></br>
      <a href="https:/alex-aranda.com"> Alex Aranda</a>
    </Nav>
  );
}

export default BottomNav;
