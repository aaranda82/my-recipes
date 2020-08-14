import React from "react";
import Content from "./components/Content";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
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
      <BottomNav />
    </Provider>
  );
}

export default App;
