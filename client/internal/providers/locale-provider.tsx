/**
 * Contains the locale provider that provides locale information
 * @module
 */

import React from "react";
import { Ii18NType, ILangLocalesType } from "../../../base/Root";
import equals from "deep-equal";
import { EndpointErrorType } from "../../../base/errors";

/**
 * to change the lanaguage to a new code
 * @param code the new language code
 * @param avoidUpdatingUser avoid updating the user (if logged in)
 * @returns a void promise, this promise is fullfilled once the language
 * has been changed successfully and as such the app has updated
 */
export type ChangeLanguageToFn = (code: string, avoidUpdatingUser?: boolean) => Promise<EndpointErrorType>;

/**
 * To change the currency to a new code
 * @param code a code which represents a valid supported currency from the currency list
 * @param avoidUpdatingUser avoid updating the user (if logged in)
 */
export type ChangeCurrencyToFn = (code: string, avoidUpdatingUser?: boolean) => Promise<EndpointErrorType>;

/**
 * To change the country to a new code
 * @param code a code which represents a valid supported country from the country list
 * @param avoidUpdatingCountry avoids updating the country itself, use this if you are only wanting
 * to know the predicted outcome of the language and currency
 * @param avoidChangingLanguageAndCurrency avoids triggering an automatic change to the language and currency
 * based on the country
 * @param avoidUpdatingUser avoid updating the user (if logged in)
 * @param onPotentialChangesFoundFor provides information regarding the country that was changed regarding potential changes
 * does not trigger if not found
 * @returns a void promise, this is basically for the same reason of changeLanguageTo
 */
export type ChangeCountryToFn = (
  code: string,
  avoidUpdatingCountry?: boolean,
  avoidChangingLanguageAndCurrency?: boolean,
  avoidUpdatingUser?: boolean,
  onPotentialChangesFoundFor?: (languageCode: string, currencyCode: string) => void,
) => Promise<EndpointErrorType>;

/**
 * This is the locale type, which contains the locale
 * information for using in the application
 */
export interface ILocaleContextType {
  changeLanguageTo: ChangeLanguageToFn;
  changeCurrencyTo: ChangeCurrencyToFn;
  changeCountryTo: ChangeCountryToFn;
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
    [code: string]: number,
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
export const LocaleContext = React.createContext<ILocaleContextType>(null);

/**
 * The locale provider
 */
interface ILocaleProviderProps {
  value: ILocaleContextType;
  children: React.ReactNode;
}

/**
 * The locale provider creates a context that serves the locale information
 * down the components, should be placed inside the app as the locale is
 * dynamic and controlled by the app, on top of the main
 */
export class LocaleProvider extends React.Component<ILocaleProviderProps> {
  public shouldComponentUpdate(nextProps: ILocaleProviderProps) {
    return nextProps.children !== this.props.children ||
      nextProps.value.country !== this.props.value.country ||
      nextProps.value.currency !== this.props.value.currency ||
      nextProps.value.currencyFactors !== this.props.value.currencyFactors ||
      nextProps.value.rtl !== this.props.value.rtl ||
      nextProps.value.updating !== this.props.value.updating ||
      !equals(nextProps.value.i18n, this.props.value.i18n, { strict: true });
  }
  public render() {
    return (
      <LocaleContext.Provider value={this.props.value}>
        {this.props.children}
      </LocaleContext.Provider>
    );
  }
}
