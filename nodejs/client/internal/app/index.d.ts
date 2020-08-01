/**
 * Contains the base app structure that holds the main component which
 * is the custom application file
 * @packageDocumentation
 */
import React from "react";
import Root, { ILangLocalesType } from "../../../base/Root";
import { IActualTokenProviderState } from "../providers/token-provider";
import "../workers/service";
import { IConfigRawJSONDataType } from "../../../config";
import { ILocaleContextType } from "../providers/locale-provider";
/**
 * The props for the application, this initial information
 * must be passed by the initializer and it't available via
 * the rest endpoint, for the given languages
 * country data, currency data, and locale data are static fields
 * and don't really change; whereas the initial information, is
 * as said, initial, and takes part of the state
 */
interface IAppProps {
    /**
     * This is the root we are using
     */
    root: Root;
    /**
     * The intial currency we are expected to use, as the actual
     * currency might be changed either by user action or when
     * the user itself is loaded
     */
    initialCurrency: string;
    /**
     * The initial currency factors, these do change when the server
     * pushes new server data
     */
    initialCurrencyFactors: {
        [code: string]: number;
    };
    /**
     * The initial country, works the same way as currency
     */
    initialCountry: string;
    /**
     * The configuration, which is static
     */
    config: IConfigRawJSONDataType;
    /**
     * The available language locales, with their given information
     */
    langLocales: ILangLocalesType;
    /**
     * The main component of the application
     */
    mainComponent: React.ReactElement;
    /**
     * This is the main wrapper as defined in the itemize initialize
     * function
     */
    mainWrapper?: (mainComponent: React.ReactElement, config: IConfigRawJSONDataType, localeContextValue: ILocaleContextType) => React.ReactElement;
}
/**
 * so you can see here, the specified country and currency
 * are taken from both initials, the specified data is also the
 * initial data, the specified processed root, is what comes
 * after processing the raw json "root" property
 * locale is updating and locale is updating from are
 * variables that pop during a change in locale
 */
interface IAppState {
    /**
     * the actual current country code
     */
    specifiedCountry: string;
    /**
     * The actual current currency code
     */
    specifiedCurrency: string;
    /**
     * The actual curent currency factors
     */
    specifiedCurrencyFactors: {
        [code: string]: number;
    };
    /**
     * Whether the locale is currently updating
     */
    localeIsUpdating: boolean;
    /**
     * What is it updating from
     */
    localeIsUpdatingFrom: string;
    /**
     * whether the upddate is currently blocked,
     * happens when an update is triggered but another older version
     * is still running in another tab, so indexeddb can't be flushed
     */
    updateIsBlocked: boolean;
}
/**
 * This is the itemize app, and it contains all the application
 * logic inside, it sits inside the appWrapper, if specified, as well
 * as some general providers, that are set by the initialize function
 * such as the router
 */
export default class App extends React.Component<IAppProps, IAppState> {
    /**
     * This is the token state that is actually given by the token provider that sits inside
     * the application itself, the reason why this app itself needs it, it's because the remote listener
     * as well as the update functions need token provider
     */
    private tokenState;
    /**
     * the remote listener object that listens for the remote changes
     * and does the registration of itemize items that are loaded in order for listen to changes
     * as well as buildnumbers, currency factors changed info, etc...
     */
    private remoteListener;
    /**
     * The itemize app constructor
     * @param props props for the app
     */
    constructor(props: IAppProps);
    /**
     * function that updates the currency factors if it finds it necessary, now according to the remote
     * listener specification, the currency factors are rechecked after a disconnect event, so we might not
     * be sure if such upate is necessary, and since it has rendering consequences we only update if necessary
     * also when the event triggers for a currency factors change in the remote listener, it might not be a
     * true change as maybe the prices hasn't changed, unlikely but possible
     *
     * Currency factors is also service worked so it should work offline
     */
    updateCurrencyFactorsIfNecessary(): Promise<void>;
    /**
     * Sets the state for the blocked callback, this function is proxied using comlink
     * to the worker that actually calls this function and specifies if the state
     * of the app is blocked from update as it can't access indexeddb
     * @param state the state that it should set to
     */
    setBlockedCallbackState(state: boolean): void;
    /**
     * This function is triggered by the TokenProvider as a callback and triggers once
     * it has a state ready, the state is its own internal state, but since access of the token
     * provider state is needed here, it's streamed here once it's ready, as well as on any change
     * @param state the new state
     * @param logout the logout function
     */
    setTokenState(state: IActualTokenProviderState, logout: () => void): void;
    /**
     * updates an user property from the property list of user properties
     * and it performs a graphql request to do such
     *
     * in practique this is used to update app_language, app_currency and app_country
     *
     * @param propertyId the property id we are updating
     * @param value the value
     */
    updateUserProperty(propertyId: string, value: string): Promise<void>;
    /**
     * Checks whether there is a locale data for a given language
     * @param locale the two letter or language-region code for the locale
     */
    hasLocaleDataFor(locale: string): boolean;
    /**
     * Performs the final steps to set the locale data for a given application
     * after all the respective locale infomation required has been loaded, this
     * includes changing the url
     * @param locale the locale we are updating for
     * @param avoidUpdatingUser whether to avoid updating the user server information
     */
    finallySetLocaleDataFor(locale: string, avoidUpdatingUser: boolean): void;
    /**
     * Changes the language for the one specified by that locale
     * @param locale the two letter or language-region code for the locale
     * @param avoidUpdatingUser whether to avoid updating the user
     */
    changeLanguageTo(locale: string, avoidUpdatingUser?: boolean): Promise<void>;
    /**
     * changes the country given a specific country code
     * changing the country will trigger an automatic change
     * of currency and language
     * @param code the two letter uppercase code for the country
     * @param avoidChangingLanguageAndCurrency avoids changing the language and the currency
     * @param avoidUpdatingUser avoids updating the user
     */
    changeCountryTo(code: string, avoidChangingLanguageAndCurrency?: boolean, avoidUpdatingUser?: boolean): Promise<void>;
    /**
     * Changes the currency to a given currency code
     * given its 3 letter uppercase code
     * @param code the three letter uppercase code of the currency
     * @param avoidUpdatingUser whether to avoid updating the user
     */
    changeCurrencyTo(code: string, avoidUpdatingUser?: boolean): void;
    /**
     * Renders the application with the locale context data
     * @param routerProps the url match from the router, contains the url language
     * @returns the application in the right locale context
     */
    renderAppWithLocaleContext(routerProps: any): JSX.Element;
    /**
     * The render function
     */
    render(): JSX.Element;
}
export {};
