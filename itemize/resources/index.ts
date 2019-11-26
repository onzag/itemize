import countriesJSON from "./countries.json";
import currenciesJSON from "./currencies.json";

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

// This one represents the list of countries as an object,
// given the country code
export interface ICountryDataType {
  [countryCode: string]: ICountryType;
}

// TODO move this logic
// This one is the list of currencies given the currency
// code
export interface ICurrencyDataType {
  [currencyCode: string]: ICurrencyType;
}

export const countries: ICountryDataType = countriesJSON as any;
export const currencies: ICurrencyDataType = currenciesJSON as any;
