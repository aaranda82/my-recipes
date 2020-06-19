import React from "react";
import Auth from "./components/Auth";
import Count from "./components/Count";
import { store } from "./store";

const { Provider } = require("react-redux");

function App() {
  return (
    <Provider store={store}>
      <Count></Count>
      <Auth></Auth>
    </Provider>
  );
}

export default App;
