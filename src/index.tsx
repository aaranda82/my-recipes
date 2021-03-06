import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import { colorScheme } from "./styles/colorScheme";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Alegreya', serif;
    font-weight: 400;
    line-height: 1.75;
    color: #000000;
    margin: 0;
    padding: 0;
    background-color: ${colorScheme.primaryColorOne};
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
