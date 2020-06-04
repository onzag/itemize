import React from "react";
import Root, { Ii18NType, ILangLocalesType } from "../../../base/Root";
import { IActualTokenProviderState } from "../providers/token-provider";
import { RemoteListener } from "./remote-listener";
import "../workers/service";
import { IConfigRawJSONDataType } from "../../../config";
export interface ILocaleContextType {
    changeLanguageTo: (code: string, avoidUpdatingUser?: boolean) => Promise<void>;
    changeCurrencyTo: (code: string, avoidUpdatingUser?: boolean) => void;
    changeCountryTo: (code: string, avoidChangingLanguageAndCurrency?: boolean, avoidUpdatingUser?: boolean) => void;
    language: string;
    rtl: boolean;
    currency: string;
    country: string;
    updating: boolean;
    langLocales: ILangLocalesType;
    i18n: Ii18NType;
}
export interface IDataContextType {
    value: Root;
    remoteListener: RemoteListener;
    updateIsBlocked: boolean;
}
interface IAppProps {
    root: Root;
    initialCurrency: string;
    initialCountry: string;
    config: IConfigRawJSONDataType;
    langLocales: ILangLocalesType;
    mainComponent: React.ReactElement;
    mainWrapper?: (mainComponent: React.ReactElement, localeContextValue: ILocaleContextType) => React.ReactElement;
}
interface IAppState {
    specifiedCountry: string;
    specifiedCurrency: string;
    localeIsUpdating: boolean;
    localeIsUpdatingFrom: string;
    updateIsBlocked: boolean;
}
export declare const LocaleContext: React.Context<ILocaleContextType>;
export declare const DataContext: React.Context<IDataContextType>;
interface ILocaleContextProviderProps {
    value: ILocaleContextType;
    children: React.ReactNode;
}
interface IDataContextProviderProps {
    value: IDataContextType;
    children: React.ReactNode;
}
export declare class DataContextProvider extends React.Component<IDataContextProviderProps> {
    shouldComponentUpdate(nextProps: IDataContextProviderProps): boolean;
    render(): JSX.Element;
}
export declare class LocaleContextProvider extends React.Component<ILocaleContextProviderProps> {
    shouldComponentUpdate(nextProps: ILocaleContextProviderProps): boolean;
    render(): JSX.Element;
}
export default class App extends React.Component<IAppProps, IAppState> {
    private tokenState;
    private remoteListener;
    constructor(props: IAppProps);
    setBlockedCallbackState(state: boolean): void;
    setTokenState(state: IActualTokenProviderState): void;
    updateUserProperty(propertyId: string, value: string): Promise<void>;
    /**
     * Checks whether there is a locale data for a given language
     * @param locale the two letter or language-region code for the locale
     */
    hasLocaleDataFor(locale: string): boolean;
    finallySetLocaleDataFor(locale: string, avoidUpdatingUser: boolean): void;
    /**
     * Changes the language for the one specified by that locale
     * @param locale the two letter or language-region code for the locale
     */
    changeLanguageTo(locale: string, avoidUpdatingUser?: boolean): Promise<void>;
    /**
     * changes the country given a specific country code
     * changing the country will trigger an automatic change
     * of currency and language
     * @param code the two letter uppercase code for the country
     */
    changeCountryTo(code: string, avoidChangingLanguageAndCurrency?: boolean, avoidUpdatingUser?: boolean): void;
    /**
     * Changes the currency to a given currency code
     * given its 3 letter uppercase code
     * @param code the three letter uppercase code of the currency
     */
    changeCurrencyTo(code: string, avoidUpdatingUser?: boolean): void;
    /**
     * Renders the application with the locale context data
     * @param param0 the url match from the router, contains the url language
     */
    renderAppWithLocaleContext(routerProps: any): JSX.Element;
    render(): JSX.Element;
}
export {};
