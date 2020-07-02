import React, { FC } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { GraphqlProvider } from "@cabezonidas/shop-admin-graphql";
import { UiProvider, useTranslation, useTheme } from "@cabezonidas/shop-ui";
import FrontEnd from "./front-end";
import "@reach/dialog/styles.css";
import "@reach/combobox/styles.css";
import "highlight.js/styles/default.css";
import "@cabezonidas/shop-ui/assets/style.css";

const uri = (() => {
  switch (process.env.NODE_ENV) {
    case "test":
      return "https://api.javascript.kiwi";
    case "production":
      return "https://api.latamtradingclub.com";
    default:
      return "http://localhost:8899";
  }
})();

const getInitialLanguage = (languages: any): string =>
  languages.find(l => window?.localStorage?.getItem("language") === l.localeId)?.localeId ||
  languages.find(l => l.localeId.startsWith((window?.navigator?.language ?? "").slice(0, 2)))
    ?.localeId ||
  "es-AR";
const LocalStorageCtx: React.FC = ({ children }) => {
  const { languages, i18n } = useTranslation();
  const { mode } = useTheme();

  const [initLanguage, setInitLanguage] = React.useState(false);
  if (!initLanguage) {
    i18n.changeLanguage(getInitialLanguage(languages));
    setInitLanguage(true);
  }

  React.useEffect(() => {
    window?.localStorage?.setItem("language", i18n.language);
  }, [i18n.language]);

  React.useEffect(() => {
    window?.localStorage?.setItem("darkMode", mode);
  }, [mode]);

  return <>{children}</>;
};

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

const darkMode =
  (["dark", "light"].find(m => m === localStorage?.getItem("darkMode") ?? "") as
    | "dark"
    | "light") ?? "dark";

ReactDOM.render(
  <UiProvider mode={darkMode}>
    <LocalStorageCtx>
      <GraphqlState>
        <FrontEnd />
      </GraphqlState>
    </LocalStorageCtx>
  </UiProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
