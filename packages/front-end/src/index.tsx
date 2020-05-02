import React, { FC } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { GraphqlProvider } from "@cabezonidas/shop-admin-graphql";
import { UiProvider, useTranslation } from "@cabezonidas/shop-ui";
import FrontEnd from "./front-end";

const uri = (() => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "https://api.javascript.kiwi";
    default:
      return "http://localhost:8899/prd";
  }
})();

const GraphqlState: FC = ({ children }) => {
  const { i18n } = useTranslation();
  return (
    <GraphqlProvider
      language={i18n.language}
      uri={uri}
      onErrorResponse={({ operation, networkError }) => {
        // Use toast/alert here.
        if (networkError) {
          console.log(networkError, operation);
        }
      }}
    >
      {children}
    </GraphqlProvider>
  );
};

ReactDOM.render(
  <UiProvider>
    <GraphqlState>
      <FrontEnd />
    </GraphqlState>
  </UiProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
