/**
 * Contains the sql and server side specific functions for the currency type
 *
 * @packageDocumentation
 */
import { ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLBtreeIndexableInfo, ISQLMantenienceType, ISQLEqualInfo, ISQLSSCacheEqualInfo } from "../types";
import { IPropertyDefinitionSupportedCurrencyType } from "../types/currency";
/**
 * the sql function that setups the fields for currency
 * @param arg the sql argumnent
 * @returns a partial row definition
 */
export declare function currencySQL(arg: ISQLArgInfo): {
    [x: string]: {
        type: string;
    };
};
/**
 * The sql in function for the currency
 * @param arg the sql in info argument
 * @returns a partial row
 */
export declare function currencySQLIn(arg: ISQLInInfo): {
    [x: string]: string | number;
};
/**
 * The sql out function
 * @param arg the argument out info
 * @returns a property definition supported currency type (or null)
 */
export declare function currencySQLOut(arg: ISQLOutInfo): IPropertyDefinitionSupportedCurrencyType;
/**
 * Searching for currency values
 * @param arg the argument search info
 * @returns a boolean on whether it's searched by it or not
 */
export declare function currencySQLSearch(arg: ISQLSearchInfo): boolean;
/**
 * The order by functionality for the currency type
 * @param arg the order by arg
 * @returns an array of string with the rule options
 */
export declare function currencySQLOrderBy(arg: ISQLOrderByInfo): [string, string, string];
/**
 * The btree indexable used in searches
 * @param arg the arg for the btree indexable options
 * @returns the columns to index
 */
export declare function currencySQLBtreeIndexable(arg: ISQLBtreeIndexableInfo): string[];
/**
 * The SQL mantenience for the currency fields that are currently active
 * to be searched
 * @param arg the sql mantenience arg
 * @returns the sql mantenience rule
 */
export declare function currencySQLMantenience(arg: ISQLArgInfo): ISQLMantenienceType;
/**
 * How to consider equality with a value
 * @param arg the argument to check equality against
 * @returns a partial row match
 */
export declare function currencySQLEqual(arg: ISQLEqualInfo): {
    [x: string]: string | number;
};
/**
 * How to check equality with a value using the cache
 * @param arg the argument to check against
 * @returns a boolean
 */
export declare function currencySQLSSCacheEqual(arg: ISQLSSCacheEqualInfo): boolean;
