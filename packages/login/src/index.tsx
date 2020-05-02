import React from "react";
import ReactDOM from "react-dom";
import App from "./login-app";
import * as serviceWorker from "./serviceWorker";
import { GraphqlProvider } from "@cabezonidas/shop-admin-graphql";
import { UiProvider } from "@cabezonidas/shop-ui";

ReactDOM.render(
  <GraphqlProvider uri={"http://localhost:8899"}>
    <UiProvider>
      <App />
    </UiProvider>
  </GraphqlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
