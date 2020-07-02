import "./internal/theme/base.scss";

import ReactDOM from "react-dom";
import React from "react";
import { Router } from "react-router-dom";
import App, { ILocaleContextType } from "./internal/app";
import Moment from "moment";
import { createBrowserHistory } from "history";
import { IRendererContext, RendererContext } from "./providers/renderer";
import { ISSRContextType, SSRProvider } from "./internal/providers/ssr-provider";
import { IConfigRawJSONDataType } from "../config";
import Root, { ILangLocalesType } from "../base/Root";
import CacheWorkerInstance from "./internal/workers/cache";
import { ConfigProvider } from "./internal/providers/config-provider";
import ItemDefinition from "../base/Root/Module/ItemDefinition";

// Create the browser history to feed the router
export const history = typeof document !== "undefined" ? createBrowserHistory() : null;

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

export interface ICollectorType {
  collect: (app: React.ReactElement) => {
    node: React.ReactNode,
    id: string,
  },
  retrieve: (id: string) => string,
}

export async function initializeItemizeApp(
  rendererContext: IRendererContext,
  mainComponent: React.ReactElement,
  options?: {
    appWrapper?: (app: React.ReactElement, config: IConfigRawJSONDataType) => React.ReactElement;
    mainWrapper?: (mainComponet: React.ReactElement, localeContext: ILocaleContextType) => React.ReactElement;
    serverMode?: {
      collector?: ICollectorType;
      currencyFactors: {
        [code: string]: number,
      };
      config: IConfigRawJSONDataType,
      ssrContext: ISSRContextType;
      clientDetails: {
        lang: string,
        currency: string,
        country: string,
        guessedData: string,
      },
      langLocales: ILangLocalesType,
      root: Root,
      req: any,
      res: any,
      ipStack: any,
    }
  }
) {
  const serverMode = options && options.serverMode;

  // basically the way this website works is that the
  // language is the first argument of the location url
  // so /en/whatever /fi/whatever, determine the language
  // there should be an url language set
  const pathNameSplitted = serverMode ? serverMode.req.originalUrl.split("/") : window.location.pathname.split("/");
  let urlLanguage = pathNameSplitted[1];

  // The stored locale data takes priority over everything
  // The stored locale data has been set manually when fiddling
  // with the language selection, otherwise no language gets stored
  const storedLang = serverMode ? serverMode.clientDetails.lang : localStorage.getItem("lang");
  const storedCurrency = serverMode ? serverMode.clientDetails.currency : localStorage.getItem("currency");
  const storedCountry = serverMode ? serverMode.clientDetails.country : localStorage.getItem("country");

  const config: IConfigRawJSONDataType = serverMode ? serverMode.config : (window as any).CONFIG;
  const ssrContext: ISSRContextType = serverMode ? serverMode.ssrContext : (window as any).SSR;

  // so if we have a stored language, and that stored language
  // that do differ, we need to change it to the stored language
  // because that has priority
  if (storedLang && storedLang !== urlLanguage) {
    // we are going to reuse the splitted path name array we created
    pathNameSplitted[1] = storedLang;
    // update the variables
    urlLanguage = storedLang;
    // and we are going to replace the history object that we will feed react
    // this will make it so that our url gets setup even before react
    // is initialized
    const newPathName = pathNameSplitted.join("/");
    if (!serverMode) {
      history.replace(newPathName + window.location.search);
    } else {
      // in server mode this does contain the query string as it uses the original url
      serverMode.res.redirect(newPathName);
      // returning nothing in server mode will cancel further processing of the response
      return;
    }
  }

  // This is for a list of guesed information
  let guessedLang = null;
  let guessedCountry = null;
  let guessedCurrency = null;

  // if any of these are missing we need to try to guess them
  // we are trying to guess the preferred locale of the user
  // even if it will not be the initial one
  if (!storedLang || !storedCurrency || !storedCountry) {
    // We try to check if we previously tried to guess for this given instance
    // granted, there's no difference from redoing the guess, but, this saves
    // requests from having to go to the server side to make a guess
    const previouslyGuessedData = serverMode ? serverMode.clientDetails.guessedData : localStorage.getItem("guessedData");

    // So we do a trick here, because previouslyGuessedData
    // is a string, we need to parse it, and the server side
    // also returns this JSON information, so we process it
    // as text, if it's not available, to have the actual guessed
    // user data, either from local storage or the server side
    let guessedUserData: any;
    try {
      if (!serverMode) {
        guessedUserData = JSON.parse(
          previouslyGuessedData ||
          await fetch("/rest/util/country").then((r) => r.text()),
        );
      } else if (previouslyGuessedData) {
        guessedUserData = JSON.parse(
          previouslyGuessedData,
        );
      } else {
        const standardAPIResponse = {
          country: config.fallbackCountryCode,
          currency: config.fallbackCurrency,
          language: config.fallbackLanguage,
        };

        const XFF = serverMode.req.headers["X-Forwarded-For"] || serverMode.req.headers["x-forwarded-for"];
        let ip = serverMode.req.connection.remoteAddress;
        if (typeof XFF === "string") {
          ip = XFF.split(",")[0].trim();
        } else if (Array.isArray(XFF)) {
          ip = XFF[0];
        }

        // This only occurs during development
        if (
          ip === "127.0.0.1" ||
          ip === "::1" ||
          ip === "::ffff:127.0.0.1" ||
          !serverMode.ipStack
        ) {
          guessedUserData = standardAPIResponse;
        } else {
          guessedUserData = await serverMode.ipStack.requestUserInfoForIp(ip, standardAPIResponse);
        }
      }
    } catch (err) {
      guessedUserData = {
        language: config.fallbackLanguage,
        country: config.fallbackCountryCode,
        currency: config.fallbackCurrency
      };
    }

    // and we set it to local storage afterwards, we don't need to waste requests
    if (!serverMode) {
      document.cookie = "guessedData=" + JSON.stringify(guessedUserData) + ";path=/";
      localStorage.setItem("guessedData", JSON.stringify(guessedUserData));
    }

    // Let's set the values
    guessedLang = storedLang || guessedUserData.language;
    guessedCountry = storedCurrency || guessedUserData.country;
    guessedCurrency = storedCountry || guessedUserData.currency;

    // So this is a global variable, that must exist, sadly but necessary
    // this is a very simple way to have it available in the client side
    // and it's always necessary, it's hardcoded in the webpage HTML during the build
    if (!config.supportedLanguages.includes(guessedLang)) {
      guessedLang = "en";
    }

    // if we have no url language we need to set it to the guessed value
    // this is for example when coming from a search engine to the main
    // home page, for some reason, even when search engines should be
    // able to handle the different languages, but hey, maybe the user
    // wrote the link manually, note that is is basically a first try
    // not only there was no stored language data, but no url data
    if (!urlLanguage) {
      // and set the url language to the guessed values
      urlLanguage = guessedLang;
      pathNameSplitted[1] = guessedLang;
      const newPathName = pathNameSplitted.join("/");

      if (!serverMode) {
        history.replace(newPathName + window.location.search);
      } else {
        // do the redirect
        serverMode.res.redirect(newPathName);
        // returning nothing will prevent further processing in server mode
        // and the user will be redirected
        return;
      }
    }
  }

  // let's try now to set the initial locale, the initial language
  // is always the url language
  const initialLang = urlLanguage;
  const initialCurrency = storedCurrency || guessedCurrency;
  const initialCountry = storedCountry || guessedCountry;

  if (!serverMode) {
    // The reason we do this is because moment is a large library
    // and this library needs to support any language, in order
    // to import the locale moment data, we need to expose it to the global
    (window as any).moment = Moment;

    let isExpectedToRender = true;
    try {
      const response = await fetch("/rest/buildnumber?current=" + (window as any).BUILD_NUMBER);
      if (response.status === 200) {
        const actualBuildNumber: string = await response.text();
        if (actualBuildNumber !== (window as any).BUILD_NUMBER) {
          // refer to the setupVersion function in the cache for realization how
          // the object store in indexed db updates, since indexed db databases
          // are versioned, we don't need to worry
          isExpectedToRender = false;
          // while for most of the cases this reload is unceccesary there is a reason
          // it's safer, if the index.html file has changed (say due to google analytics)
          // changes and whatnot, it also trigger that, the build number is coded in the
          // index as well, etc... so safer it is to reload, the cache should be cleaned
          // by the service worker after a mismatch so the next load should be clean
          location.reload(true);
        }
      }
    } catch (err) {
      
    }

    if (!isExpectedToRender) {
      return;
    }
  }

  if (!serverMode) {
    document.body.parentElement.lang = initialLang;
    (document.head.querySelector("[rel='manifest']") as HTMLLinkElement).href =
      "/rest/resource/manifest." + initialLang + ".json";
  }

  // Now we fetch the data for the respective languages and currencies
  // the languag english is the default for moment, so we only import script
  // for anything else but english
  // the reason the build number gets used, is because of use of service workers
  // basically, we are going to keep this simple, only update the worker if it's
  // a new url, simple, even for this script the build number applies
  try {
    // set the values in the state to the initial
    // we expose the root variable because it makes debugging
    // easy and to allow access to the root registry to web workers
    if (!serverMode) {
      const [initialRoot, lang, currencyFactors] = await Promise.all<any>([
        fetch(`/rest/resource/build.${initialLang}.json`).then((r) => r.json()),
        fetch("/rest/resource/lang.json").then((r) => r.json()),
        ssrContext ? ssrContext.currencyFactors : fetch("/rest/currency-factors").then((r) => r.json()),

        initialLang !== "en" ?
          importScript(`/rest/resource/${initialLang}.moment.js`) : null,
      ]);
      (window as any).ROOT = new Root(initialRoot);
      (window as any).LANG = lang;
      (window as any).INITIAL_CURRENCY_FACTORS = currencyFactors;
      if (CacheWorkerInstance.isSupported) {
        CacheWorkerInstance.instance.proxyRoot(initialRoot);
      }
    }

    // the locale of moment is set, note how await was used, hence all the previous script
    // have been imported, and should be available for moment
    Moment.locale(initialLang);

    const root: Root = serverMode ? serverMode.root : (window as any).ROOT;

    // now we get the app that we are expected to use
    const app = <App
      root={root}
      langLocales={serverMode ? serverMode.langLocales : (window as any).LANG}
      config={config}

      initialCurrency={initialCurrency}
      initialCountry={initialCountry}
      initialCurrencyFactors={serverMode ? serverMode.currencyFactors : (window as any).INITIAL_CURRENCY_FACTORS}

      mainComponent={mainComponent}
      mainWrapper={options && options.mainWrapper}
    />;

    // if a wrapping function was provided, we use it
    const children = options && options.appWrapper ?
      options.appWrapper(app, config) :
      app;

    // now we need to load all the information that is included
    // with the SSR into the root
    ssrContext && ssrContext.queries.forEach((query) => {
      if (!query || !query.value) {
        return;
      }
      const idef: ItemDefinition = root.registry[query.idef] as ItemDefinition;
      if (idef) {
        idef.applyValue(
          query.id,
          query.version,
          query.value,
          false,
          ssrContext.user.id,
          ssrContext.user.role,
          query.fields,
          false,
        );
      }
    });

    const actualApp = (
      <ConfigProvider value={config}>
        <SSRProvider value={ssrContext}>
          <RendererContext.Provider value={rendererContext}>
            {children}
          </RendererContext.Provider>
        </SSRProvider>
      </ConfigProvider>
    );

    if (serverMode) {
      if (serverMode.collector) {
        return serverMode.collector.collect(actualApp);
      }
      // needs to be wrapped in the router itself
      return {
        node: actualApp,
        id: null,
      };
    }

    if (ssrContext) {
      ReactDOM.hydrate(
        <Router history={history}>
          {actualApp}
        </Router>,
        document.getElementById("app"),
      );
      return;
    }

    // finally we render the react thing
    ReactDOM.render(
      <Router history={history}>
        {actualApp}
      </Router>,
      document.getElementById("app"),
    );
  } catch (err) {
    if (serverMode) {
      throw err;
    } else {
      console.error("FATAL ERROR");
      console.error(err.stack);
    }
  }
}