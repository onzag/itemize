/**
 * Contains the locale provider that provides locale information
 * @packageDocumentation
 */
import React from "react";
import { Ii18NType, ILangLocalesType } from "../../../base/Root";
/**
 * This is the locale type, which contains the locale
 * information for using in the application
 */
export interface ILocaleContextType {
    /**
     * to change the lanaguage to a new code
     * @param code the new language code
     * @param avoidUpdatingUser avoid updating the user (if logged in)
     * @returns a void promise, this promise is fullfilled once the language
     * has been changed successfully and as such the app has updated
     */
    changeLanguageTo: (code: string, avoidUpdatingUser?: boolean) => Promise<void>;
    /**
     * To change the currency to a new code
     * @param code a code which represents a valid supported currency from the currency list
     * @param avoidUpdatingUser avoid updating the user (if logged in)
     */
    changeCurrencyTo: (code: string, avoidUpdatingUser?: boolean) => void;
    /**
     * To change the country to a new code
     * @param code a code which represents a valid supported country from the country list
     * @param avoidUpdatingUser avoid updating the user (if logged in)
     * @returns a void promise, this is basically for the same reason of changeLanguageTo
     */
    changeCountryTo: (code: string, avoidChangingLanguageAndCurrency?: boolean, avoidUpdatingUser?: boolean) => Promise<void>;
    /**
     * The current language code
     */
    language: string;
    /**
     * Whether this current language is rtl
     */
    rtl: boolean;
    /**
     * The current currency code
     */
    currency: string;
    /**
     * The current currency factors
     */
    currencyFactors: {
        [code: string]: number;
    };
    /**
     * The current country code
     */
    country: string;
    /**
     * Whether this is currently updating, on practise only happens
     * with updating the language as it has to be refetched
     */
    updating: boolean;
    /**
     * The language locales available, and their given direction
     */
    langLocales: ILangLocalesType;
    /**
     * The root i18n data
     */
    i18n: Ii18NType;
}
/**
 * The locale context provides the locale information down all the way
 * to any component that demands it
 */
export declare const LocaleContext: React.Context<ILocaleContextType>;
/**
 * The locale provider
 */
interface ILocaleProviderProps {
    value: ILocaleContextType;
    children: React.ReactNode;
}
/**
 * The locale provider creates a context that serves the locale information
 * down the components
 */
export declare class LocaleProvider extends React.Component<ILocaleProviderProps> {
    shouldComponentUpdate(nextProps: ILocaleProviderProps): boolean;
    render(): JSX.Element;
}
export {};
