import React from "react";
import Auth from "./Auth";
import Spacer from "./Spacer";
import { ColorScheme } from "../ColorScheme";
import styled from "styled-components";

const { gunmetal } = ColorScheme;
const Container = styled.div`
  text-align: center;
  width: 80%;
`;

const Intro = styled.div`
  font-family: "Quattrocento", serif;
  font-size: 3em;
  color: ${gunmetal};
  margin: 50px 0 50px 0;
`;

function LandingPage() {
  return (
    <Container id="Landing Page">
      <Intro>
        Welcome to My Recipes, a place to keep all your culinary creations
      </Intro>
      <Spacer />
      <Auth />
    </Container>
  );
}

export default LandingPage;
