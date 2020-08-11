"use strict";
/**
 * Contains the base app structure that holds the main component which
 * is the custom application file
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const __1 = require("../..");
const moment_1 = __importDefault(require("moment"));
const react_router_dom_1 = require("react-router-dom");
const __2 = require("../..");
const imported_resources_1 = require("../../../imported-resources");
const token_provider_1 = require("../providers/token-provider");
const remote_listener_1 = require("./remote-listener");
require("../workers/service");
const gql_client_util_1 = require("../gql-client-util");
const cache_1 = __importDefault(require("../workers/cache"));
const comlink_1 = require("comlink");
const deep_equal_1 = __importDefault(require("deep-equal"));
const locale_provider_1 = require("../providers/locale-provider");
const appdata_provider_1 = require("../providers/appdata-provider");
/**
 * Just a variable for whether is development
 * @ignore
 */
const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
    console.info("Starting Development Mode, Have Fun :)");
}
/**
 * This is the itemize app, and it contains all the application
 * logic inside, it sits inside the appWrapper, if specified, as well
 * as some general providers, that are set by the initialize function
 * such as the router
 */
class App extends react_1.default.Component {
    /**
     * The itemize app constructor
     * @param props props for the app
     */
    constructor(props) {
        super(props);
        /**
         * This is the token state that is actually given by the token provider that sits inside
         * the application itself, the reason why this app itself needs it, it's because the remote listener
         * as well as the update functions need token provider
         */
        this.tokenState = null;
        /**
         * the remote listener object that listens for the remote changes
         * and does the registration of itemize items that are loaded in order for listen to changes
         * as well as buildnumbers, currency factors changed info, etc...
         */
        this.remoteListener = null;
        // so our initial state depends on these initial resources
        this.state = {
            specifiedCountry: props.initialCountry,
            specifiedCurrency: props.initialCurrency,
            specifiedCurrencyFactors: props.initialCurrencyFactors,
            localeIsUpdating: false,
            localeIsUpdatingFrom: null,
            updateIsBlocked: false,
        };
        // the set blocked callback state function triggered by the cache worker
        // when it's blocked and can't release indexeddb, we need to pass it
        this.setBlockedCallbackState = this.setBlockedCallbackState.bind(this);
        // but it's a worker so we need to check if it's supported
        if (cache_1.default.isSupported) {
            // since we are using comlink we use this method
            cache_1.default.instance.setBlockedCallback(comlink_1.proxy(this.setBlockedCallbackState));
        }
        // the helper functions that change the state of the whole app
        // to change language, country and currency
        this.changeLanguageTo = this.changeLanguageTo.bind(this);
        this.changeCountryTo = this.changeCountryTo.bind(this);
        this.changeCurrencyTo = this.changeCurrencyTo.bind(this);
        this.renderAppWithLocaleContext = this.renderAppWithLocaleContext.bind(this);
        this.setTokenState = this.setTokenState.bind(this);
        this.updateUserProperty = this.updateUserProperty.bind(this);
        this.updateCurrencyFactorsIfNecessary = this.updateCurrencyFactorsIfNecessary.bind(this);
        // a sad hack to know if we are in the client side to initialize this
        // remote listener
        if (typeof document !== "undefined") {
            this.remoteListener = new remote_listener_1.RemoteListener(this.props.root);
            this.remoteListener.setCurrencyFactorsHandler(this.updateCurrencyFactorsIfNecessary);
        }
    }
    /**
     * function that updates the currency factors if it finds it necessary, now according to the remote
     * listener specification, the currency factors are rechecked after a disconnect event, so we might not
     * be sure if such upate is necessary, and since it has rendering consequences we only update if necessary
     * also when the event triggers for a currency factors change in the remote listener, it might not be a
     * true change as maybe the prices hasn't changed, unlikely but possible
     *
     * Currency factors is also service worked so it should work offline
     */
    async updateCurrencyFactorsIfNecessary() {
        // so we try
        try {
            // get the new factors
            const newFactors = await fetch(`/rest/currency-factors`).then((r) => r.json());
            const currentFactors = this.state.specifiedCurrencyFactors;
            // and if they don't equal to the current we set the state
            if (!deep_equal_1.default(currentFactors, newFactors)) {
                this.setState({
                    specifiedCurrencyFactors: newFactors,
                });
            }
        }
        catch {
            return;
        }
    }
    /**
     * Sets the state for the blocked callback, this function is proxied using comlink
     * to the worker that actually calls this function and specifies if the state
     * of the app is blocked from update as it can't access indexeddb
     * @param state the state that it should set to
     */
    setBlockedCallbackState(state) {
        if (this.state.updateIsBlocked !== state) {
            this.setState({
                updateIsBlocked: state,
            });
        }
    }
    /**
     * This function is triggered by the TokenProvider as a callback and triggers once
     * it has a state ready, the state is its own internal state, but since access of the token
     * provider state is needed here, it's streamed here once it's ready, as well as on any change
     * @param state the new state
     * @param logout the logout function
     */
    setTokenState(state, logout) {
        // we save this state
        this.tokenState = state;
        // and set these handlers for the remote listener
        this.remoteListener.setLogoutHandler(logout);
        // once the remote listener has a token it can start functioning properly
        // the token might be null, if not logged in; while the token and all is already
        // the same as the cookie, it might have been expired by the session id or other factors
        // so only a token validated by the provider makes it here
        this.remoteListener.setToken(state.token);
    }
    /**
     * updates an user property from the property list of user properties
     * and it performs a graphql request to do such
     *
     * in practique this is used to update app_language, app_currency and app_country
     *
     * @param propertyId the property id we are updating
     * @param value the value
     */
    async updateUserProperty(propertyId, value) {
        // we check that there's an user logged in
        if (this.tokenState && this.tokenState.id) {
            // simple log message
            console.log("updating user property", propertyId, value);
            // now we need the user definition
            const userItemDefinition = this.props.root
                .getModuleFor(["users"]).getItemDefinitionFor(["user"]);
            // so we can run an edit query, this will update
            // the cache too
            const result = await gql_client_util_1.runEditQueryFor({
                args: {
                    [propertyId]: value,
                },
                fields: {
                    DATA: {
                        [propertyId]: {},
                    },
                },
                itemDefinition: userItemDefinition,
                token: this.tokenState.token,
                id: this.tokenState.id,
                version: null,
                // we use the listener uuid to prevent changes
                listenerUUID: this.remoteListener.getUUID(),
                language: "en",
                cacheStore: true,
            });
            // Ignore errors, we just go for success
            if (result && result.value && result.value.DATA) {
                // we check the value the server gave us
                const actualPropertyResult = result.value.DATA[propertyId];
                // and if we have an applied value to it, as it, it has been somehow loaded
                if (userItemDefinition.hasAppliedValueTo(this.tokenState.id, null)) {
                    console.log("found a possible instance, triggering update");
                    // we get this property, apply the value and trigger the change
                    const property = userItemDefinition.getPropertyDefinitionFor(propertyId, false);
                    // we apply such value
                    property.applyValue(this.tokenState.id, null, actualPropertyResult, true, false);
                    // and we inform of changes so that item definitions
                    // can listen to changes for it
                    userItemDefinition.triggerListeners("change", this.tokenState.id, null);
                }
            }
        }
    }
    /**
     * Checks whether there is a locale data for a given language
     * @param locale the two letter or language-region code for the locale
     */
    hasLocaleDataFor(locale) {
        return !!this.props.langLocales[locale];
    }
    /**
     * Performs the final steps to set the locale data for a given application
     * after all the respective locale infomation required has been loaded, this
     * includes changing the url
     * @param locale the locale we are updating for
     * @param avoidUpdatingUser whether to avoid updating the user server information
     */
    finallySetLocaleDataFor(locale, avoidUpdatingUser) {
        // the pathname splitted for the current location
        const pathNameSplitted = window.location.pathname.split("/");
        // Now we patch moment
        moment_1.default.locale(locale);
        // And we set the language
        document.cookie = "lang=" + locale + ";expires=" + __1.COOKIE_EXPIRATION_DATE + ";path=/";
        // now we set the html lang in locale
        document.body.parentElement.lang = locale;
        // we also update the manifest
        document.head.querySelector("[rel='manifest']").href =
            "/rest/resource/manifest." + locale + ".json";
        // We set it to the url
        pathNameSplitted[1] = locale;
        const newPathName = pathNameSplitted.join("/");
        __2.history.push(newPathName + window.location.search);
        // and now if we don't avoid updating the user
        if (!avoidUpdatingUser) {
            this.updateUserProperty("app_language", locale);
        }
    }
    /**
     * Changes the language for the one specified by that locale
     * @param locale the two letter or language-region code for the locale
     * @param avoidUpdatingUser whether to avoid updating the user
     */
    async changeLanguageTo(locale, avoidUpdatingUser) {
        console.log("changing language to", locale);
        // if it's updating, this shouldn't have happened
        if (this.state.localeIsUpdating) {
            console.warn("Attempted to update locale to " + locale + " while on update");
        }
        // so we check which locale we are attempting to set
        let localeToSet = locale;
        // if there is no locale data
        if (!this.hasLocaleDataFor(localeToSet)) {
            // we will force it to english, for example if an user picks the language
            // that we don't have, we'll default to english
            // this might happen for example when selecting a country, changing the country attempts to change
            // the language of the country, so we default to english in such case
            localeToSet = "en";
            console.warn("Attempted to set to unavailable language locale " + locale + ", defaulted to english");
        }
        // Like we did in our main file we need to take care of the url in such case
        const pathNameSplitted = window.location.pathname.split("/");
        const urlLanguage = pathNameSplitted[1];
        // if it's the same, then we do not care, the url language is the real language
        if (localeToSet === urlLanguage) {
            return;
        }
        // if the language is currently loaded in memory, just set it as it is
        // we don't need to fetch anything
        if (this.props.root.getI18nDataFor(localeToSet)) {
            this.finallySetLocaleDataFor(localeToSet, avoidUpdatingUser);
            return;
        }
        // otherwise we send the state, this state is part of the context
        this.setState({
            localeIsUpdating: true,
            localeIsUpdatingFrom: urlLanguage,
        });
        // and we fetch the new data, as relevant, mostly the build, and the moment to patch
        let newData;
        try {
            [newData] =
                await Promise.all([
                    fetch(`/rest/resource/build.${localeToSet}.json`)
                        .then((r) => r.json()),
                    localeToSet !== "en" ?
                        __1.importScript(`/rest/resource/${localeToSet}.moment.js`) : null,
                ]);
        }
        catch {
            this.setState({
                localeIsUpdating: false,
                localeIsUpdatingFrom: null,
            });
            return;
        }
        // Now we patch the root
        this.props.root.mergeWithI18n(newData);
        // set the locale data
        this.finallySetLocaleDataFor(localeToSet, avoidUpdatingUser);
        // and fix the state
        this.setState({
            localeIsUpdating: false,
            localeIsUpdatingFrom: null,
        });
    }
    /**
     * changes the country given a specific country code
     * changing the country will trigger an automatic change
     * of currency and language
     * @param code the two letter uppercase code for the country
     * @param avoidChangingLanguageAndCurrency avoids changing the language and the currency
     * @param avoidUpdatingUser avoids updating the user
     */
    async changeCountryTo(code, avoidChangingLanguageAndCurrency, avoidUpdatingUser) {
        console.log("changing country to", code);
        // Codes should be uppercase, but well, let's get wiggle room for error
        let codeToSet = code.toUpperCase();
        // We check that it's a valid country in our list of countries
        const countryData = imported_resources_1.countries[codeToSet];
        // This shouldn't really happen, but otherwise we default to the fallback
        if (!countryData) {
            codeToSet = this.props.config.fallbackCountryCode;
            console.warn("Attempted to set country to unavailable " + code + ", defaulted to " + codeToSet);
        }
        // Now we set the country in local storage
        document.cookie = "country=" + codeToSet + ";expires=" + __1.COOKIE_EXPIRATION_DATE + ";path=/";
        if (!avoidUpdatingUser) {
            this.updateUserProperty("app_country", codeToSet);
        }
        // and update the state
        this.setState({
            specifiedCountry: codeToSet,
        });
        if (!avoidChangingLanguageAndCurrency) {
            // Now we also change the currency, we default to euros in
            // case there's no currency defined
            const currencyUsedThere = countryData.currency || "EUR";
            this.changeCurrencyTo(currencyUsedThere, avoidUpdatingUser);
            // So now we need to get what is relevant, the languages, we check
            // what languages are spokes in the region, now because we have some places
            // where no official language exist (aka now just Antartica), we check for
            // that we have some, otherwise default to english; also notice how
            // there are many official languages, however, we default to the first one
            // which we assume is the most spoken
            const languageSpokenThere = countryData.languages.length ?
                countryData.languages[0].toLowerCase() || "en" : "en";
            // now the language might be regionalized, we check it is
            const isRegionalizedAlready = languageSpokenThere.includes("-");
            // now we extract the regionalized and non regionalized factors
            const languageSpokenThereNonRegionalized = isRegionalizedAlready ?
                languageSpokenThere.split("-")[0] : languageSpokenThere;
            const languageSpokenThereRegionalized = isRegionalizedAlready ?
                languageSpokenThere : languageSpokenThere + "-" + codeToSet;
            // We check for both, giving the regionalized priority
            // as you can notice, this language might not be available,
            // in that case the app will default to the default language
            if (this.hasLocaleDataFor(languageSpokenThereRegionalized)) {
                await this.changeLanguageTo(languageSpokenThereRegionalized, avoidUpdatingUser);
            }
            else {
                await this.changeLanguageTo(languageSpokenThereNonRegionalized, avoidUpdatingUser);
            }
        }
    }
    /**
     * Changes the currency to a given currency code
     * given its 3 letter uppercase code
     * @param code the three letter uppercase code of the currency
     * @param avoidUpdatingUser whether to avoid updating the user
     */
    changeCurrencyTo(code, avoidUpdatingUser) {
        console.log("changing currency to", code);
        // We still uppercase it anyway
        let codeToSet = code.toUpperCase();
        // Now we check if it is a valid currency
        if (!imported_resources_1.currencies[codeToSet]) {
            // Otherwise we go for the default, this is unlikely to happen
            // because all currencies are in the currency list
            codeToSet = "EUR";
            console.warn("Attempted to set currency to unavailable " + code + ", defaulted to Euros");
        }
        // We set the currency in local storage
        document.cookie = "currency=" + codeToSet + ";expires=" + __1.COOKIE_EXPIRATION_DATE + ";path=/";
        if (!avoidUpdatingUser) {
            this.updateUserProperty("app_currency", codeToSet);
        }
        // and set the state
        this.setState({
            specifiedCurrency: codeToSet,
        });
    }
    /**
     * Renders the application with the locale context data
     * @param routerProps the url match from the router, contains the url language
     * @returns the application in the right locale context
     */
    renderAppWithLocaleContext(routerProps) {
        // typescript being really annoying
        const { match } = routerProps;
        // Now the match.params.lang is actually a quite unreliable way to check for the current language
        // in use during updates, there's a reason, the url changes triggering a react update before the
        // language data has been loaded, this makes the app feel quite responsive and it's important, but
        // if the rest of the app thinks the new language is the right language
        // before having the new language completely loaded a crash is going to happen, hence, we remain onto
        // the old language until the new language data is truly loaded
        const currentActualLanguage = this.state.localeIsUpdating ? this.state.localeIsUpdatingFrom : match.params.lang;
        const rtl = this.props.langLocales[currentActualLanguage].rtl;
        // now we populate the locale context which is used all over the app
        const localeContextValue = {
            changeLanguageTo: this.changeLanguageTo,
            changeCountryTo: this.changeCountryTo,
            changeCurrencyTo: this.changeCurrencyTo,
            language: currentActualLanguage,
            rtl,
            country: this.state.specifiedCountry,
            currency: this.state.specifiedCurrency,
            currencyFactors: this.state.specifiedCurrencyFactors,
            updating: this.state.localeIsUpdating,
            langLocales: this.props.langLocales,
            i18n: this.props.root.getI18nData(),
        };
        // Now we return the app with its given locale context
        // the Material ui pickers depends on the locale too from
        // the match, so we pass that as well, we use the deregionalized
        // version nevertheless,
        // note how we include the devtools if we are in development mode
        // such a code is stripped if it's production
        return (react_1.default.createElement(locale_provider_1.LocaleProvider, { value: localeContextValue },
            react_1.default.createElement(token_provider_1.TokenProvider, { localeContext: localeContextValue, onProviderStateSet: this.setTokenState },
                react_1.default.createElement("div", { id: "main", dir: rtl ? "rtl" : "ltr" }, this.props.mainWrapper ?
                    this.props.mainWrapper(this.props.mainComponent, this.props.config, localeContextValue) :
                    this.props.mainComponent))));
    }
    /**
     * The render function
     */
    render() {
        // The data contet passes the raw root and the value
        // that contains the instance that can store values
        const dataContextValue = {
            value: this.props.root,
            remoteListener: this.remoteListener,
            updateIsBlocked: this.state.updateIsBlocked,
        };
        // Now we return that with the JSS provider, material ui theme provider,
        // our data context, and then pass the react router route, note that the
        // router itself is the parent
        return (react_1.default.createElement(appdata_provider_1.DataProvider, { value: dataContextValue },
            react_1.default.createElement(react_router_dom_1.Route, { path: "/:lang/", component: this.renderAppWithLocaleContext })));
    }
}
exports.default = App;
