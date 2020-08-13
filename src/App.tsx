import React from "react";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import { store } from "./store";
import styled from "styled-components";

const { Provider } = require("react-redux");

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Container>
        <Content id="Content" />
      </Container>
    </Provider>
  );
}

export default App;
