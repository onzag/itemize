/**
 * Contains the internal initialization function for initializing itemize app
 * @module
 */

// contains some base styles as well as leaflet and quill scss
import "./internal/theme/base.scss";

import ReactDOM from "react-dom";
import React from "react";
import { Router } from "react-router-dom";
import App from "./internal/app";
import { ILocaleContextType } from "./internal/providers/locale-provider";
import Moment from "moment";
import { createBrowserHistory } from "history";
import { IRendererContext, RendererContext } from "./providers/renderer";
import { ISSRContextType, SSRProvider } from "./internal/providers/ssr-provider";
import { IConfigRawJSONDataType } from "../config";
import Root, { ILangLocalesType } from "../base/Root";
import CacheWorkerInstance from "./internal/workers/cache";
import { ConfigProvider } from "./internal/providers/config-provider";
import Include from "../base/Root/Module/ItemDefinition/Include";
import PropertyDefinition from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import Module from "../base/Root/Module";
import { IGlobalTestingType, setupTesting } from "./internal/testing";
import type { ISSRServerModeInfo } from "../server/ssr";
import { destroyDestructionMarkers, destroySearchDestructionMarkers } from "./internal/app/destruction-markers";
import { onControllerChangeCall } from "./internal/workers/service";

/**
 * when cookies expire
 * @ignore
 */
export const COOKIE_EXPIRATION_DATE = (new Date(9999999999999)).toUTCString();

/**
 * Provides a single cookie based on a name, this function
 * is used heavily in order to retrieve the session values
 * @param name the name of the cookie to provide
 * @returns the value of the cookie as a string or null
 */
export function getCookie(name: string): string {
  const splittedCookie = document.cookie.split(";").map((c) => c.trim());
  const nameEQ = name + "=";
  const foundCookie = splittedCookie.find((cookieValue) => {
    return cookieValue.indexOf(nameEQ) === 0;
  });
  if (!foundCookie) {
    return null;
  }
  return foundCookie.substr(nameEQ.length) || null;
}

declare global {
  interface Window {
    BUILD_NUMBER: string;
    ROOT: Root;
    CONFIG: IConfigRawJSONDataType;
    SSR: ISSRContextType;
    LANG: ILangLocalesType;
    INITIAL_CURRENCY_FACTORS: {
      [code: string]: number;
    },
    PHONE_OR_PAD: boolean;
    TESTING: IGlobalTestingType;
    SET_DEV_MODE: (mode: string, key: string) => void;
    ENABLE_TESTING: () => void;
    DISABLE_TESTING: () => void;
    GET_MEMORY_STATE: () => void;
  }
}

// set development mode
if (typeof document !== "undefined") {
  let cookieEnd = ";domain=" + location.hostname;
  if (location.hostname !== "localhost") {
    cookieEnd = ";secure=true";
  }

  window.SET_DEV_MODE = function (mode, key) {
    document.cookie = "devmode=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/" + cookieEnd;
    document.cookie = "devkey=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/" + cookieEnd;
    document.cookie = "devmode=" + mode + ";path=/" + cookieEnd;
    document.cookie = "devkey=" + key + ";path=/" + cookieEnd;
  }

  // set testing mode
  if (process.env.NODE_ENV === "development") {
    window.ENABLE_TESTING = function () {
      document.cookie = "testing=true;path=/";
    }
    window.DISABLE_TESTING = function () {
      document.cookie = "testing=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/";
    }

    // in the client side if we happen to get
    // the special testing cookie we want to initialize
    // the testing in window in order to signal
    // the itemize app to initialize in testing mode
    // testing mode provides more insights to what is going on
    // in the app
    const testingCookie = getCookie("testing");
    if (testingCookie === "true") {
      setupTesting();
    }
  }
}

// Create the browser history to feed the router
export const history = typeof document !== "undefined" ? createBrowserHistory() : null;

// keeping track of imported files in this array
const importedSrcPool: string[] = [];

/**
 * This function imports a file given a url
 * @param src the source url
 */
export function importScript(src: string): Promise<void> {
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
    script.onload = () => { resolve() };
    script.onerror = reject;
    script.async = true;
    script.src = src;
  });
}

/**
 * Defines a collector, the collector will collect normally styles or other
 * data as it's feed the application and provide back the node to render (Which should contain the app)
 * as well as an id
 */
export interface ICollectorType {
  /**
   * This is the collection function
   * @param app the app itself that is fed to the collector
   * @returns a node and an id for the collection action in order to retrieve
   * the collection results
   */
  collect: (app: React.ReactElement, serverModeInfo: ISSRServerModeInfo) => {
    node: React.ReactNode,
    id: string,
  },
  /**
   * Retrieves the collection results based on the id previously given
   * @param id the id given
   * @param html the html generated by the react dom process
   * @returns a string, this string is added as the value of the <SSRHEAD> to the index.html template
   */
  retrieve: (id: string, html: string) => string,
}

/**
 * The main function that initializes the itemize app, it's meant both to work
 * on the server and the client side, however it's optimized for client side functionality
 * and SSR is secondary
 * 
 * @param rendererContext the renderer context to use, specifies how both entries and view should be renderer
 * based on these instructions, and it's static and provided to all the app, the renderer context can be replaced
 * to give a different look and feel, check out the fast prototyping renderer context for the default context which
 * uses material ui as this. Secondary renderers can be used and injected along the app by passing the renderer arg
 * to the react Entry or View component to use a different renderer
 * @param mainComponent the main application component this is basically the user custom App component that defines
 * the entire app, this is where the developer decides what to do, and uses components mainly out of the client/components
 * in order to build its app, with navigation and all, but also can use fast prototyping components which in term
 * use those components as base
 * @param options optional options, very useful in many circumstances
 * @param options.appWrapper a function that wraps the application itself, and executes only once over the initialization
 * of the app, it acts like a react component that should return a react element, allows to put static things in the app
 * on top of it that are required (likely by the renderers or other custom components) such as providers, eg. for fast prototyping
 * the app wrapper will add the material UI theme provider as well as the CSS baseline. NOTE that the app wrapper despite being
 * wrapping the app, the app itself (and as such this wrapper) sits under the config provider, ssr provider, route provider,
 * and the renderer context provider so it's totally possible for the app wrapper to access these, even when it's absolutely not recommended.
 * @param options.mainWrapper a function that wraps the main component that was given, the main component sits under the true application
 * under the locale context provider and the token provider, it provides as arguments the config and the locale context; the main wrapper
 * can execute several times any time the main component top context changes, as such ensure that it's effective enough, the mainWrapper
 * is only truly expected to execute these several times during login/out events and any localization change; this is then where you put
 * localization sensitive provider, eg. in the case of fast prototyping the moment utils provider which is locale sensitive is passed
 * here
 * @param options.serverMode options for doing SSR, not required and shouldn't be provided when doing SSR, when server mode is set
 * instead of doing a render, it will return a node, and an id; where id might be null, depending to the collection rules; this returned
 * react node will not contain a router
 * @param options.serverMode.collector a collector (eg. a JSS styles collector) that is fed the entire application all the way to the
 * main providers, however the router is still expected to sit on top for technical reasons, the collector is fed this application
 * and should return a node and an id (to get the results of the collection), the results of the collection are obtained in generator.tsx
 * and replaced the <SSRHEAD> tag with that
 * @param options.serverMode.config the configuration used, standard, normally the config is injected into the app source as a global
 * this global is named CONFIG, but this is not available to SSR mode, so it need to access it another way
 * @param options.serverMode.ssrContext the ssr context itself, normally this is injected into the app via the SSR global, but this
 * isn't available, the SSR contains all the injected collected queries, collected resources, the current user context and the currency
 * factors as well
 * @param options.serverMode.clientDetails some client details that are stored in the client in order to setup things lie initial
 * localization, they must be matched in the server side when doing SSR, normally these details are stored in a cookie
 * so they are accessible to both and should render equal
 * @param options.serverMode.clientDetails.lang the language that is being used
 * @param options.serverMode.clientDetails.currency the currency that is being last used by the client
 * @param options.serverMode.clientDetails.country the country that is being last used by the client
 * @param options.serverMode.clientDetails.guessedData a guess for lang, currency and country that was launched for this client and got stored
 * @param options.serverMode.langLocales the supported language locales
 * @param options.serverMode.root the root object to recycle since the root cannot be obtained via a fetch request,
 * it should be using the all version with all the languages loaded, note that this might pollute the root,
 * so ensure to use an unique all root instance and clean it afterwards, you should have a pool of root to choose from
 * @param options.serverMode.req the server request, this is used to build the static router that will choose what to render, since it
 * needs the original url
 * @param options.serverMode.res the server response, this is used to do the redirect, when no language is specified to the language
 * that was either guessed or was set by the user, or otherwise to change the url using a redirect to the actual language
 * that the user is supposed to speak, so that if the user picks a url on another language, switch it to his language
 * @param options.serverMode.userLocalizationService when no lang, currency, country are set an we have no guessed data indeed, then we need to run a guess
 * in the client side this is used by fetching the util/country under the hood, but this will perform
 * such check in place since we have no fetch chances
 */
export async function initializeItemizeApp(
  rendererContext: IRendererContext,
  mainComponent: React.ReactElement,
  options?: {
    appWrapper?: (
      app: React.ReactElement,
      config: IConfigRawJSONDataType,
    ) => React.ReactElement;
    mainWrapper?: (
      mainComponet: React.ReactElement,
      config: IConfigRawJSONDataType,
      localeContext: ILocaleContextType,
    ) => React.ReactElement;
    serverMode?: ISSRServerModeInfo;
  }
) {
  // so let's check if we are in server mode
  const serverMode = options && options.serverMode;

  // CONFIG, as well as SSR are injected variables via index.html
  const config: IConfigRawJSONDataType = serverMode ? serverMode.config : window.CONFIG;
  const ssrContext: ISSRContextType = serverMode ? serverMode.ssrContext : window.SSR;

  // basically the way this website works is that the
  // language is the first argument of the location url
  // so /en/whatever /fi/whatever, determine the language
  // there should be an url language set
  const pathNameSplitted = serverMode ? serverMode.originalUrl.split("/") : window.location.pathname.split("/");
  let urlLanguage = pathNameSplitted[1];
  if (urlLanguage.includes("?")) {
    urlLanguage = urlLanguage.split("?")[0];
  }
  if (urlLanguage.includes("#")) {
    urlLanguage = urlLanguage.split("#")[0];
  }
  let expectedLanguageToUse = urlLanguage;

  // The stored locale data takes priority over everything
  // The stored locale data has been set manually when fiddling
  // with the language selection, otherwise no language gets stored
  let storedLang = serverMode ? serverMode.clientDetails.lang : getCookie("lang");
  if (storedLang && !config.supportedLanguages.includes(storedLang)) {
    storedLang = config.fallbackLanguage;
  }

  const storedCurrency = serverMode ? serverMode.clientDetails.currency : getCookie("currency");
  const storedCountry = serverMode ? serverMode.clientDetails.country : getCookie("country");

  // so if we are not in server mode, and we are definetely in
  // the client side
  // SEO Hijacking is prevented in the server side right now
  // when ssr is enabled
  // if (!serverMode && document) {
  //   // prevent SEO hijacking
  //   // allows subdomains to be allowable
  //   if (
  //     location.hostname !== config.productionHostname &&
  //     !location.hostname.endsWith("." + config.productionHostname) &&
  //     location.hostname !== config.developmentHostname &&
  //     !location.hostname.endsWith("." + config.developmentHostname) &&
  //     location.hostname !== "localhost"
  //   ) {
  //     document.body.innerHTML =
  //       `<a href="https://${config.productionHostname}">Please visit the real website at ${config.productionHostname}</a>`;
  //     return;
  //   }
  // }

  // so if we have a stored language, and that stored language
  // that do differ, we need to change it to the stored language
  // because that has priority
  if (storedLang && storedLang !== urlLanguage) {
    // we are going to reuse the splitted path name array we created
    pathNameSplitted[1] = storedLang;
    // update the variables
    expectedLanguageToUse = storedLang;
    // and we are going to replace the history object that we will feed react
    // this will make it so that our url gets setup even before react
    // is initialized
    const newPathName = pathNameSplitted.join("/");
    if (!serverMode) {
      history.replace(newPathName + history.location.search, history.location.state);
      // if (window.history) {
      //   window.history.replaceState(window.history.state, "", newPathName + window.location.search);
      // }
    } else {
      // in server mode this does contain the query string as it uses the original url
      serverMode.redirectTo(newPathName);
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
    const previouslyGuessedData = serverMode ? serverMode.clientDetails.guessedData : getCookie("guessedData");

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

        // This only occurs during development
        if (
          serverMode.ip === "127.0.0.1" ||
          serverMode.ip === "::1" ||
          serverMode.ip === "::ffff:127.0.0.1" ||
          !serverMode.ip ||
          !serverMode.userLocalizationService
        ) {
          guessedUserData = standardAPIResponse;
        } else {
          guessedUserData = await serverMode.userLocalizationService.getLocalizationFor(serverMode.ip, standardAPIResponse);
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
      document.cookie = "guessedData=" + JSON.stringify(guessedUserData) + ";expires=" + COOKIE_EXPIRATION_DATE + ";path=/";
    }

    // Let's set the values
    guessedLang = storedLang || guessedUserData.language;
    guessedCountry = storedCountry || guessedUserData.country;
    guessedCurrency = storedCurrency || guessedUserData.currency;

    // So this is a global variable, that must exist, sadly but necessary
    // this is a very simple way to have it available in the client side
    // and it's always necessary, it's hardcoded in the webpage HTML during the build
    if (!config.supportedLanguages.includes(guessedLang)) {
      guessedLang = config.fallbackLanguage;
    }

    // if we have no url language we need to set it to the guessed value
    // this is for example when coming from a search engine to the main
    // home page, for some reason, even when search engines should be
    // able to handle the different languages, but hey, maybe the user
    // wrote the link manually, note that is is basically a first try
    // not only there was no stored language data, but no url data
    if (!expectedLanguageToUse) {
      // and set the url language to the guessed values
      expectedLanguageToUse = guessedLang;
      pathNameSplitted[1] = guessedLang;
      const newPathName = pathNameSplitted.join("/");

      if (!serverMode) {
        history.replace(newPathName + history.location.search, history.location.state);
        // window.history.replaceState(window.history.state, "", newPathName + window.location.search);
      } else {
        // do the redirect
        serverMode.redirectTo(newPathName);
        // returning nothing will prevent further processing in server mode
        // and the user will be redirected
        return;
      }
    }
  }

  // let's try now to set the initial locale, the initial language
  // is always the url language
  const initialLang = expectedLanguageToUse;
  const initialCurrency = storedCurrency || guessedCurrency;
  const initialCountry = storedCountry || guessedCountry;

  if (!serverMode) {
    // The reason we do this is because moment is a large library
    // and this library needs to support any language, in order
    // to import the locale moment data, we need to expose it to the global
    (window as any).moment = Moment;

    let isExpectedToReload = false;
    try {
      const response = await fetch("/rest/buildnumber?current=" + window.BUILD_NUMBER);
      if (response.status === 200 || response.status === 205) {
        // 205 responses don't have body and anyway we don't need to know
        const actualBuildNumber: string = response.status === 205 ? null : (await response.text()).trim();
        // either the build number from the server doesn't match the app, which
        // shouldn't really happen because we use network first for this index
        // or we have been given a 205 status which means we shall reload
        // because the caches have been wiped
        if (response.status === 205 || actualBuildNumber !== window.BUILD_NUMBER) {
          // refer to the setupVersion function in the cache for realization how
          // the object store in indexed db updates, since indexed db databases
          // are versioned, we don't need to worry
          isExpectedToReload = true;
          // while for most of the cases this reload is unceccesary there is a reason
          // it's safer, if the index.html file has changed (say due to google analytics)
          // changes and whatnot, it also trigger that, the build number is coded in the
          // index as well, etc... so safer it is to reload, the cache should be cleaned
          // by the service worker after a mismatch so the next load should be clean
        }
      }
    } catch (err) {

    }

    if (isExpectedToReload) {
      const loadingCss = `
      .loader {
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 1;
        width: 120px;
        height: 120px;
        margin: -76px 0 0 -76px;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
      }
      
      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      `;

      const injectedStyle = document.createElement("style");
      injectedStyle.type = "text/css";

      if ((injectedStyle as any).styleSheet) {
        (injectedStyle as any).styleSheet.cssText = loadingCss;
      } else {
        injectedStyle.appendChild(document.createTextNode(loadingCss));
      }

      document.head.appendChild(injectedStyle);

      const rotatingElement = document.createElement("div");
      rotatingElement.className = "loader";

      document.body.appendChild(rotatingElement);

      // this should make it reload once the controller changes
      onControllerChangeCall(() => {
        (location as any).reload(true);
      });

      // just in case
      setTimeout(() => {
        (location as any).reload(true);
      }, 20000);

      // reload true is deprecated but we want it forced anyway
      return;
    }
  }

  if (!serverMode) {
    document.body.parentElement.lang = initialLang;
    document.body.parentElement.dir = config.rtlLanguages.includes(initialLang) ? "rtl" : "ltr";
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
      window.ROOT = new Root(initialRoot);
      window.LANG = lang;
      window.INITIAL_CURRENCY_FACTORS = currencyFactors;
      if (CacheWorkerInstance.isSupportedAsWorker || CacheWorkerInstance.isPolyfilled) {
        // proxy the root to the cache worker
        CacheWorkerInstance.instance.proxyRoot(initialRoot, config);

        // let's set it up
        // as you can see this function might run several times per instance
        // but that's okay, all next runs get ignored
        CacheWorkerInstance.instance.setupVersion(parseInt(window.BUILD_NUMBER, 10));

        // we will block the initialization and use of the cache worker until
        // our destruction markers are deleted
        await CacheWorkerInstance.instance.startInitializationBlock();

        (async () => {
          const storedToken = getCookie("token");
          // not logged in with cache worker available
          if (!storedToken && !ssrContext?.user.token && CacheWorkerInstance.isSupportedAsWorker) {
            try {
              const succeeded = await destroyDestructionMarkers(false, true);
              if (!succeeded) {
                console.warn("Failed to clean all logout destruction markers");
              }
            } catch (err) {
              console.error(err);
            }
            try {
              const succeeded = await destroySearchDestructionMarkers(false, true);
              if (!succeeded) {
                console.warn("Failed to clean all logout destruction markers");
              }
            } catch (err) {
              console.error(err);
            }
          }

          // clean potentially missing unmount destruction markers that should have done
          // on unmount and may have been left dangling
          if (CacheWorkerInstance.isSupportedAsWorker) {
            try {
              const succeeded = await destroyDestructionMarkers(true, true);
              if (!succeeded) {
                console.warn("Failed to clean all unmount destruction markers");
              }
            } catch (err) {
              console.error(err);
            }
            try {
              const succeeded = await destroySearchDestructionMarkers(true, true);
              if (!succeeded) {
                console.warn("Failed to clean all unmount destruction markers");
              }
            } catch (err) {
              console.error(err);
            }
          }

          // now the cache worker is free to be used
          CacheWorkerInstance.instance.endInitializationBlock();
        })();
      }
    }

    // the locale of moment is set, note how await was used, hence all the previous script
    // have been imported, and should be available for moment
    Moment.locale(initialLang);

    const root: Root = serverMode ? serverMode.root : window.ROOT;

    // now we get the app that we are expected to use
    const app = <App
      root={root}
      langLocales={serverMode ? serverMode.langLocales : window.LANG}
      config={config}

      initialLang={initialLang}
      initialCurrency={initialCurrency}
      initialCountry={initialCountry}
      initialCurrencyFactors={serverMode ?
        serverMode.ssrContext.currencyFactors :
        window.INITIAL_CURRENCY_FACTORS
      }

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
      if (!query) {
        return;
      }
      const idef: ItemDefinition = root.registry[query.idef] as ItemDefinition;
      if (idef) {
        idef.applyValue(
          query.id,
          query.version,
          query.value,
          false,
          query.fields,
          false,
        );
      }
    });
    ssrContext && ssrContext.searches.forEach((search) => {
      if (!search) {
        return;
      }
      const idef: ItemDefinition = root.registry[search.idef] as ItemDefinition;
      if (idef) {
        idef.setSearchState(
          search.id,
          search.version,
          search.state,
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
        return serverMode.collector.collect(actualApp, serverMode);
      }
      // needs to be wrapped in the router itself
      return {
        node: actualApp,
        id: null,
      };
    }

    const finalApp = (
      <Router history={history}>
        {actualApp}
      </Router>
    );

    if (ssrContext) {
      ReactDOM.hydrate(
        finalApp,
        document.getElementById("app"),
      );
      return;
    }

    // finally we render the react thing
    ReactDOM.render(
      finalApp,
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

if (typeof document !== "undefined" && process.env.NODE_ENV === "development") {
  window.GET_MEMORY_STATE = function () {
    const state: any = {
      idefs: {},
      mods: {},
    };

    function processMod(m: Module) {
      m.getAllModules().forEach(processMod);
      m.getAllChildDefinitionsRecursive().forEach(processIdef);

      const absPath = m.getPath().join("/");
      state.mods[absPath] = {
        properties: {},
      }

      m.getAllPropExtensions().forEach((p) => {
        state.mods[absPath].properties[p.getId()] = processProperty(p);
      });
    }

    function processIdef(idef: ItemDefinition) {
      const absPath = idef.getAbsolutePath().join("/");
      state.idefs[absPath] = {
        appliedValue: (idef as any).stateRQAppliedValue,
        internalState: (idef as any).stateInternal,
        properties: {},
        includes: {}
      }

      idef.getAllPropertyDefinitionsAndExtensions().forEach((p) => {
        state.idefs[absPath].properties[p.getId()] = processProperty(p);
      });

      idef.getAllIncludes().forEach((i) => {
        state.idefs[absPath].includes[i.getId()] = processInclude(i);
      });
    }

    function processProperty(p: PropertyDefinition) {
      return {
        values: (p as any).stateValue,
        appliedValues: (p as any).stateAppliedValue,
        enforcedValues: (p as any).stateSuperEnforcedValue,
        internalValues: (p as any).stateInternalValue,
      }
    }

    function processInclude(i: Include) {
      const data: any = {};
      i.getSinkingProperties().forEach((p) => {
        data[p.getId()] = processProperty(p);
      });
      return data;
    }

    window.ROOT.getAllModules().forEach(processMod);

    return state;
  }
}