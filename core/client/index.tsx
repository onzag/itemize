import "./theme/base.scss";
import ReactDOM from "react-dom";
import React from "react";
import { Router } from "react-router-dom";
import App from "./app";
import "babel-polyfill";
import PropertyDefinition from "../base/ItemDefinition/PropertyDefinition";
import Moment from "moment";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const importedSrcPool: string[] = [];
export function importScript(src: string) {
  if (importedSrcPool.includes(src)) {
    return new Promise((resolve) => {
      resolve();
    });
  }
  importedSrcPool.push(src);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = src;
  });
}

(async () => {
  const pathNameSplitted = window.location.pathname.split("/");
  let urlLanguage = pathNameSplitted[1];

  // The stored language takes priority over everything, it would in fact
  // quick users out of urls in language that isn't stored
  const storedLang = localStorage.getItem("lang");
  const storedCurrency = localStorage.getItem("currency");
  const storedCountry = localStorage.getItem("country");

  if (storedLang && storedLang !== urlLanguage) {
    console.info(
      "stored locale and url language differ, setting url language from",
      urlLanguage,
      "to",
      storedLang,
    );

    pathNameSplitted[1] = storedLang;
    urlLanguage = storedLang;
    const newPathName = pathNameSplitted.join("/");
    history.replace(newPathName);
  }

  let guessedLang = null;
  let guessedCountry = null;
  let guessedCurrency = null;

  // if any of these are missing we need to try to guess them
  // we are trying to guess the preferred locale of the user
  // even if it will not be the initial one
  if (!storedLang || !storedCurrency || !storedCountry) {

    console.info("stored locale is incomplete running a guess", storedLang, storedCountry, storedCurrency);
    const previouslyGuessedData = localStorage.getItem("guessedData");

    if (previouslyGuessedData) {
      console.info("found previously guessed locale");
    }

    // We might have done this before
    const guessedUserData = JSON.parse(
      previouslyGuessedData ||
      await fetch(`/util/country`).then((r) => r.text()),
    );
    localStorage.setItem("guessedData", JSON.stringify(guessedUserData));

    console.info("guessed locale is", guessedUserData);

    // Let's set the values
    guessedLang = guessedUserData.language;
    guessedCountry = guessedUserData.country;
    guessedCurrency = guessedUserData.currency;

    if (!(window as any).SUPPORTED_LANGUAGES.includes(guessedLang)) {
      console.warn("guessed locale is not valid defaulting to english");
      guessedLang = "en";
    }

    // if we have no url language we need to set it to the guessed value
    if (!urlLanguage) {
      console.info("using guessed value as lang setting");

      urlLanguage = guessedLang;
      pathNameSplitted[1] = guessedLang;
      const newPathName = pathNameSplitted.join("/");
      history.replace(newPathName);
    }
  } else {
    console.info("Stored locale is", storedLang, storedCountry, storedCurrency);
  }

  // let's try now to set the initial locale, the initial language
  // is always the url language
  const initialLang = urlLanguage;
  const initialCurrency = storedCurrency || guessedCurrency;
  const initialCountry = storedCountry || guessedCountry;

  (window as any).moment = Moment;

  const [initialData, localeData, countryData, currencyData] = await Promise.all([
    fetch(`/resource/build.${initialLang}.json?version=${(window as any).BUILD_NUMBER}`).then((r) => r.json()),
    fetch(`/resource/lang.json?version=${(window as any).BUILD_NUMBER}`).then((r) => r.json()),
    fetch(`/resource/countries.json?version=${(window as any).BUILD_NUMBER}`).then((r) => r.json()),
    fetch(`/resource/currency.json?version=${(window as any).BUILD_NUMBER}`).then((r) => r.json()),

    initialLang !== "en" ?
      importScript(`/resource/${initialLang}.moment.js?version=${(window as any).BUILD_NUMBER}`) : null,
  ]);

  Moment.locale(initialLang);
  PropertyDefinition.currencyData = currencyData;

  ReactDOM.render(
    <Router history={history}>
      <App
        initialData={initialData}
        localeData={localeData.locales}
        countryData={countryData}
        currencyData={currencyData}

        initialCurrency={initialCurrency}
        initialCountry={initialCountry}
      />
    </Router>,
    document.getElementById("app"),
  );
})();
