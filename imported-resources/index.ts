/**
 * Countries list origin:
 * https://raw.githubusercontent.com/annexare/Countries/master/dist/countries.emoji.json
 * Countries long and lat
 * https://developers.google.com/public-data/docs/canonical/countries_csv
 * Currencies list base
 * https://gist.github.com/Fluidbyte/2973986
 * Comprehensive currency list names in many languages, downloaded original csv and converted to json
 * http://www.mapanet.eu/en/resources/Currencies.asp
 * Languages list Origin
 * https://gist.githubusercontent.com/piraveen/fafd0d984b2236e809d03a0e306c8a4d/raw/4258894f85de7752b78537a4aa66e027090c27ad/languages.json
 * 
 * @module
 */

import countriesJSON from "./countries.json";
import currenciesJSON from "./currencies.json";
import languagesJSON from "./languages.json";

// The interface for the country contains all the data there should
// be for a country, code is the country code for the country,
// note how there is a currency, which is the currency code that
// matches the currency
export interface ICountryType {
  name: string;
  native: string;
  phone: string;
  continent: string;
  capital: string;
  currency: string;
  languages: string[];
  emoji: string;
  emojiU: string;
  longitude: number;
  latitude: number;
  code: string;
}

// The currency contains all the data we need to know for the currency
// code is the currency code for the currency
export interface ICurrencyType {
  code: string;
  name: string;
  symbol: string;
  rounding: number;
  decimals: number;
}

// The langauge contains all the data we need to know for language
export interface ILanguageType {
  code: string;
  name: string;
  native: string;
}

export interface ICountryDataType {
  [countryCode: string]: ICountryType;
}

export interface ICurrencyDataType {
  [currencyCode: string]: ICurrencyType;
}

export interface ILanguageDataType {
  [languageCode: string]: ILanguageType;
}

export const countries: ICountryDataType = countriesJSON as any;
export const currencies: ICurrencyDataType = currenciesJSON as any;
export const languages: ILanguageDataType = languagesJSON as any;
export const arrCountries: ICountryType[] = Object.keys(countries).map((code) => countries[code]).sort((a, b) => {
  if (a.native > b.native) {
      return 1;
  }
  if (b.native > a.native) {
      return -1;
  }
  return 0;
});
export const arrCurrencies: ICurrencyType[] = Object.keys(currencies).map((code) => currencies[code]).sort((a, b) => {
  if (a.name > b.name) {
      return 1;
  }
  if (b.name > a.name) {
      return -1;
  }
  return 0;
});
export const arrLanguages: ILanguageType[] = Object.keys(languages).map((code) => languages[code]).sort((a, b) => {
  if (a.native > b.native) {
      return 1;
  }
  if (b.native > a.native) {
      return -1;
  }
  return 0;
});