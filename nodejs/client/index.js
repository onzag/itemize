"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./internal/theme/base.scss");
const react_dom_1 = __importDefault(require("react-dom"));
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const app_1 = __importDefault(require("./internal/app"));
const moment_1 = __importDefault(require("moment"));
const history_1 = require("history");
const renderer_1 = require("./providers/renderer");
const ssr_provider_1 = require("./internal/providers/ssr-provider");
const Root_1 = __importDefault(require("../base/Root"));
const cache_1 = __importDefault(require("./internal/workers/cache"));
const config_provider_1 = require("./internal/providers/config-provider");
function getCookie(name) {
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
exports.getCookie = getCookie;
// Create the browser history to feed the router
exports.history = typeof document !== "undefined" ? history_1.createBrowserHistory() : null;
// keeping track of imported files in this array
const importedSrcPool = [];
/**
 * This function imports a file given a url
 * @param src the source url
 */
function importScript(src) {
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
exports.importScript = importScript;
async function initializeItemizeApp(rendererContext, mainComponent, options) {
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
    const storedLang = serverMode ? serverMode.clientDetails.lang : getCookie("lang");
    const storedCurrency = serverMode ? serverMode.clientDetails.currency : getCookie("currency");
    const storedCountry = serverMode ? serverMode.clientDetails.country : getCookie("country");
    const config = serverMode ? serverMode.config : window.CONFIG;
    const ssrContext = serverMode ? serverMode.ssrContext : window.SSR;
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
            exports.history.replace(newPathName + window.location.search);
        }
        else {
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
        const previouslyGuessedData = serverMode ? serverMode.clientDetails.guessedData : getCookie("guessedData");
        // So we do a trick here, because previouslyGuessedData
        // is a string, we need to parse it, and the server side
        // also returns this JSON information, so we process it
        // as text, if it's not available, to have the actual guessed
        // user data, either from local storage or the server side
        let guessedUserData;
        try {
            if (!serverMode) {
                guessedUserData = JSON.parse(previouslyGuessedData ||
                    await fetch("/rest/util/country").then((r) => r.text()));
            }
            else if (previouslyGuessedData) {
                guessedUserData = JSON.parse(previouslyGuessedData);
            }
            else {
                const standardAPIResponse = {
                    country: config.fallbackCountryCode,
                    currency: config.fallbackCurrency,
                    language: config.fallbackLanguage,
                };
                const XFF = serverMode.req.headers["X-Forwarded-For"] || serverMode.req.headers["x-forwarded-for"];
                let ip = serverMode.req.connection.remoteAddress;
                if (typeof XFF === "string") {
                    ip = XFF.split(",")[0].trim();
                }
                else if (Array.isArray(XFF)) {
                    ip = XFF[0];
                }
                // This only occurs during development
                if (ip === "127.0.0.1" ||
                    ip === "::1" ||
                    ip === "::ffff:127.0.0.1" ||
                    !serverMode.ipStack) {
                    guessedUserData = standardAPIResponse;
                }
                else {
                    guessedUserData = await serverMode.ipStack.requestUserInfoForIp(ip, standardAPIResponse);
                }
            }
        }
        catch (err) {
            guessedUserData = {
                language: config.fallbackLanguage,
                country: config.fallbackCountryCode,
                currency: config.fallbackCurrency
            };
        }
        // and we set it to local storage afterwards, we don't need to waste requests
        if (!serverMode) {
            document.cookie = "guessedData=" + JSON.stringify(guessedUserData) + ";path=/";
        }
        // Let's set the values
        guessedLang = storedLang || guessedUserData.language;
        guessedCountry = storedCurrency || guessedUserData.country;
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
                exports.history.replace(newPathName + window.location.search);
            }
            else {
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
        window.moment = moment_1.default;
        let isExpectedToRender = true;
        try {
            const response = await fetch("/rest/buildnumber?current=" + window.BUILD_NUMBER);
            if (response.status === 200) {
                const actualBuildNumber = await response.text();
                if (actualBuildNumber !== window.BUILD_NUMBER) {
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
        }
        catch (err) {
        }
        if (!isExpectedToRender) {
            return;
        }
    }
    if (!serverMode) {
        document.body.parentElement.lang = initialLang;
        document.head.querySelector("[rel='manifest']").href =
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
            const [initialRoot, lang, currencyFactors] = await Promise.all([
                fetch(`/rest/resource/build.${initialLang}.json`).then((r) => r.json()),
                fetch("/rest/resource/lang.json").then((r) => r.json()),
                ssrContext ? ssrContext.currencyFactors : fetch("/rest/currency-factors").then((r) => r.json()),
                initialLang !== "en" ?
                    importScript(`/rest/resource/${initialLang}.moment.js`) : null,
            ]);
            window.ROOT = new Root_1.default(initialRoot);
            window.LANG = lang;
            window.INITIAL_CURRENCY_FACTORS = currencyFactors;
            if (cache_1.default.isSupported) {
                cache_1.default.instance.proxyRoot(initialRoot);
            }
        }
        // the locale of moment is set, note how await was used, hence all the previous script
        // have been imported, and should be available for moment
        moment_1.default.locale(initialLang);
        const root = serverMode ? serverMode.root : window.ROOT;
        // now we get the app that we are expected to use
        const app = react_1.default.createElement(app_1.default, { root: root, langLocales: serverMode ? serverMode.langLocales : window.LANG, config: config, initialCurrency: initialCurrency, initialCountry: initialCountry, initialCurrencyFactors: serverMode ? serverMode.currencyFactors : window.INITIAL_CURRENCY_FACTORS, mainComponent: mainComponent, mainWrapper: options && options.mainWrapper });
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
            const idef = root.registry[query.idef];
            if (idef) {
                idef.applyValue(query.id, query.version, query.value, false, ssrContext.user.id, ssrContext.user.role, query.fields, false);
            }
        });
        const actualApp = (react_1.default.createElement(config_provider_1.ConfigProvider, { value: config },
            react_1.default.createElement(ssr_provider_1.SSRProvider, { value: ssrContext },
                react_1.default.createElement(renderer_1.RendererContext.Provider, { value: rendererContext }, children))));
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
            react_dom_1.default.hydrate(react_1.default.createElement(react_router_dom_1.Router, { history: exports.history }, actualApp), document.getElementById("app"));
            return;
        }
        // finally we render the react thing
        react_dom_1.default.render(react_1.default.createElement(react_router_dom_1.Router, { history: exports.history }, actualApp), document.getElementById("app"));
    }
    catch (err) {
        if (serverMode) {
            throw err;
        }
        else {
            console.error("FATAL ERROR");
            console.error(err.stack);
        }
    }
}
exports.initializeItemizeApp = initializeItemizeApp;
