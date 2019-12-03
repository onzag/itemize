import "./theme/base.scss";
import ReactDOM from "react-dom";
import React from "react";
import { Router } from "react-router-dom";
import App from "./app";
import "babel-polyfill";
import Moment from "moment";
import { createBrowserHistory } from "history";

// Create the browser history to feed the router
export const history = createBrowserHistory();

// keeping track of imported files in this array
const importedSrcPool: string[] = [];

/**
 * This function imports a file given a url
 * @param src the source url
 */
export function importScript(src: string) {
  // if the file has already been imported
  if (importedSrcPool.includes(src)) {
    // resolve right away
    return new Promise((resolve) => {
      resolve();
    });
  }
  // otherwise push the given source
  importedSrcPool.push(src);

  // and create a promise for such
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = src;
  });
}

export async function initializeItemizeApp(mainComponent: React.ReactElement) {
  // basically the way this website works is that the
  // language is the first argument of the location url
  // so /en/whatever /fi/whatever, determine the language
  // there should be an url language set
  const pathNameSplitted = window.location.pathname.split("/");
  let urlLanguage = pathNameSplitted[1];

  // The stored locale data takes priority over everything
  // The stored locale data has been set manually when fiddling
  // with the language selection, otherwise no language gets stored
  const storedLang = localStorage.getItem("lang");
  const storedCurrency = localStorage.getItem("currency");
  const storedCountry = localStorage.getItem("country");

  // so if we have a stored language, and that stored language
  // that do differ, we need to change it to the stored language
  // because that has priority
  if (storedLang && storedLang !== urlLanguage) {

    // We send a message to the console
    console.info(
      "stored locale and url language differ, setting url language from",
      urlLanguage,
      "to",
      storedLang,
    );

    // we are going to reuse the splitted path name array we created
    pathNameSplitted[1] = storedLang;
    // update the variables
    urlLanguage = storedLang;
    // and we are going to replace the history object that we will feed react
    // this will make it so that our url gets setup even before react
    // is initialized
    const newPathName = pathNameSplitted.join("/");
    history.replace(newPathName);
  }

  // This is for a list of guesed information
  let guessedLang = null;
  let guessedCountry = null;
  let guessedCurrency = null;

  // if any of these are missing we need to try to guess them
  // we are trying to guess the preferred locale of the user
  // even if it will not be the initial one
  if (!storedLang || !storedCurrency || !storedCountry) {

    // Log what is going on
    console.log("stored locale is incomplete running a guess", storedLang, storedCountry, storedCurrency);

    // We try to check if we previously tried to guess for this given instance
    // granted, there's no difference from redoing the guess, but, this saves
    // requests from having to go to the server side to make a guess
    const previouslyGuessedData = localStorage.getItem("guessedData");

    // if we find it, we log it
    if (previouslyGuessedData) {
      console.log("found previously guessed locale");
    }

    // So we do a trick here, because previouslyGuessedData
    // is a string, we need to parse it, and the server side
    // also returns this JSON information, so we process it
    // as text, if it's not available, to have the actual guessed
    // user data, either from local storage or the server side
    const guessedUserData = JSON.parse(
      previouslyGuessedData ||
      await fetch(`/rest/util/country`).then((r) => r.text()),
    );

    // and we set it to local storage afterwards, we don't need to waste requests
    localStorage.setItem("guessedData", JSON.stringify(guessedUserData));

    // We log this
    console.log("guessed locale is", guessedUserData);

    // Let's set the values
    guessedLang = storedLang || guessedUserData.language;
    guessedCountry = storedCurrency || guessedUserData.country;
    guessedCurrency = storedCountry || guessedUserData.currency;

    console.log("applying from guess", guessedLang, guessedCountry, guessedCurrency);

    // So this is a global variable, that must exist, sadly but necessary
    // this is a very simple way to have it available in the client side
    // and it's always necessary, it's hardcoded in the webpage HTML during the build
    if (!(window as any).SUPPORTED_LANGUAGES.includes(guessedLang)) {
      console.log("guessed locale is not valid defaulting to english");
      guessedLang = "en";
    }

    // if we have no url language we need to set it to the guessed value
    // this is for example when coming from a search engine to the main
    // home page, for some reason, even when search engines should be
    // able to handle the different languages, but hey, maybe the user
    // wrote the link manually, note that is is basically a first try
    // not only there was no stored language data, but no url data
    if (!urlLanguage) {
      // We log this is happening
      console.log("using guessed value as lang setting");

      // and set the url language to the guessed values
      urlLanguage = guessedLang;
      pathNameSplitted[1] = guessedLang;
      const newPathName = pathNameSplitted.join("/");
      history.replace(newPathName);
    }
  } else {
    // Otherwise we log what we have gotten stored
    console.log("Stored locale is", storedLang, storedCountry, storedCurrency);
  }

  // let's try now to set the initial locale, the initial language
  // is always the url language
  const initialLang = urlLanguage;
  const initialCurrency = storedCurrency || guessedCurrency;
  const initialCountry = storedCountry || guessedCountry;

  // The reason we do this is because moment is a large library
  // and this library needs to support any language, in order
  // to import the locale moment data, we need to expose it to the global
  (window as any).moment = Moment;

  // Now we fetch the data for the respective languages and currencies
  // the languag english is the default for moment, so we only import script
  // for anything else but english
  // the reason the build number gets used, is because of use of service workers
  // basically, we are going to keep this simple, only update the worker if it's
  // a new url, simple, even for this script the build number applies
  const [initialData, localeData] = await Promise.all([
    fetch(`/rest/resource/build.${initialLang}.json?version=${(window as any).BUILD_NUMBER}`).then((r) => r.json()),
    fetch(`/rest/resource/lang.json?version=${(window as any).BUILD_NUMBER}`).then((r) => r.json()),

    initialLang !== "en" ?
      importScript(`/rest/resource/${initialLang}.moment.js?version=${(window as any).BUILD_NUMBER}`) : null,
  ]);

  // the locale of moment is set, note how await was used, hence all the previous script
  // have been imported, and should be available for moment
  Moment.locale(initialLang);
  document.body.parentElement.lang = initialLang;

  // finally we render the react thing
  ReactDOM.render(
    <Router history={history}>
      <App
        initialData={initialData}
        localeData={localeData.locales}

        initialCurrency={initialCurrency}
        initialCountry={initialCountry}

        mainComponent={mainComponent}
      />
    </Router>,
    document.getElementById("app"),
  );
}
