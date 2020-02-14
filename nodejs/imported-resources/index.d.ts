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
export interface ICurrencyType {
    code: string;
    name: string;
    symbol: string;
    rounding: number;
    decimals: number;
}
export interface ICountryDataType {
    [countryCode: string]: ICountryType;
}
export interface ICurrencyDataType {
    [currencyCode: string]: ICurrencyType;
}
export declare const countries: ICountryDataType;
export declare const currencies: ICurrencyDataType;
export declare const arrCountries: ICountryType[];
export declare const arrCurrencies: ICurrencyType[];
