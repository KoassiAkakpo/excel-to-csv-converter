import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { IntlProvider } from "react-intl";
import French from "./lang/fr.json";
import English from "./lang/en.json";
import "./index.css";
const locale = navigator.language;

let lang;
if (locale === "fr-FR") {
  lang = French;
} else {
  lang = English;
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={lang}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
