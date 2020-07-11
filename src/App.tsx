import React from "react";
import Content from "./components/Content";
import { store } from "./store";

const { Provider } = require("react-redux");

function App() {
  return (
    <Provider store={store}>
      <Content />
    </Provider>
  );
}

export default App;
