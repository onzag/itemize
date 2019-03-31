import "./theme/base.scss";
import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "babel-polyfill";

(async () => {
  const initialLocale = localStorage.getItem("locale") || "en";
  const [initialData, localeData] = await Promise.all([
    fetch(`/resource/build.${initialLocale}.json`).then((r) => r.json()),
    fetch(`/resource/lang.json`).then((r) => r.json()),
  ]);

  ReactDOM.render(
    <BrowserRouter>
      <App
        initialData={initialData}
        localeData={localeData.locales}
        initialLocale={initialLocale}
      />
    </BrowserRouter>,
    document.getElementById("app"),
  );
})();
