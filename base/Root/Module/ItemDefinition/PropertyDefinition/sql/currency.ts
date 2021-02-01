/**
 * Contains the sql and server side specific functions for the currency type
 *
 * @packageDocumentation
 */

import { ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLBtreeIndexableInfo, ISQLMantenienceType, ISQLEqualInfo, ISQLSSCacheEqualInfo } from "../types";
import { IPropertyDefinitionSupportedCurrencyType } from "../types/currency";
import { CURRENCY_FACTORS_IDENTIFIER } from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import { IGQLArgs } from "../../../../../../gql-querier";

/**
 * the sql function that setups the fields for currency
 * @param arg the sql argumnent
 * @returns a partial row definition
 */
export function currencySQL(arg: ISQLArgInfo) {
  // there are 3 fields, value, currency and normalized value
  return {
    [arg.prefix + arg.id + "_VALUE"]: {type: "float"},
    [arg.prefix + arg.id + "_CURRENCY"]: {type: "text"},
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {type: "float"},
  };
}

/**
 * The sql in function for the currency
 * @param arg the sql in info argument
 * @returns a partial row
 */
export function currencySQLIn(arg: ISQLInInfo) {
  // so we get our value we are trying to input in the row for the arg
  const value: IPropertyDefinitionSupportedCurrencyType = arg.value as IPropertyDefinitionSupportedCurrencyType;
  // if this value is null
  if (arg.value === null) {
    return {
      [arg.prefix + arg.id + "_VALUE"]: null,
      [arg.prefix + arg.id + "_CURRENCY"]: null,
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: null,
    };
  }

  // otherwise we need to get the conversion information from the server data
  const factor: number = arg.serverData[CURRENCY_FACTORS_IDENTIFIER][value.currency];
  const normalized = factor ? factor * value.value : null;

  return {
    [arg.prefix + arg.id + "_VALUE"]: value.value,
    [arg.prefix + arg.id + "_CURRENCY"]: value.currency,
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: normalized,
  };
}

/**
 * The sql out function
 * @param arg the argument out info
 * @returns a property definition supported currency type (or null)
 */
export function currencySQLOut(arg: ISQLOutInfo) {
  // so our results depends on the row we are getting
  const result: IPropertyDefinitionSupportedCurrencyType = {
    value: arg.row[arg.prefix + arg.id + "_VALUE"],
    currency: arg.row[arg.prefix + arg.id + "_CURRENCY"],
  };
  // if our value happens to be null
  if (result.value === null) {
    // return whole null as it should
    return null;
  }
  // otherwise return the result itself, note how normalized
  // isn't included as the currency doesn't include the normalized
  return result;
}

/**
 * Searching for currency values
 * @param arg the argument search info
 * @returns a boolean on whether it's searched by it or not
 */
export function currencySQLSearch(arg: ISQLSearchInfo) {
  // first we need to get the arguments
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;

  // now if we are searching by it
  let searchedByIt = false;

  // if we have an exact search
  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    const exactArg = arg.args[exactName] as IGQLArgs;
    // we just match it as it is
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_CURRENCY", exactArg.currency as string);
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_VALUE", exactArg.value as number);
  }

  // if we have a from search
  if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
    const fromArg = arg.args[fromName] as any as IPropertyDefinitionSupportedCurrencyType;
    const factor: number = arg.serverData[CURRENCY_FACTORS_IDENTIFIER][fromArg.currency];

    // in these cases we use the normalized values and for that we use the conversion
    const normalized = factor ? factor * fromArg.value : null;
    // so we do
    arg.whereBuilder.andWhere((clause) => {
      clause
        .andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", normalized, ">=").orWhere((subclause) => {
        subclause
          .andWhereColumn(arg.prefix + arg.id + "_VALUE", fromArg.value, ">=")
          .andWhereColumn(arg.prefix + arg.id + "_CURRENCY", fromArg.currency)
      })
    });
    searchedByIt = true;
  }

  // same here as we did with from, but with the to
  if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
    const toArg = arg.args[toName] as any as IPropertyDefinitionSupportedCurrencyType;
    const factor: number = arg.serverData[CURRENCY_FACTORS_IDENTIFIER][toArg.currency];
    const normalized = factor ? factor * toArg.value : null;
    arg.whereBuilder.andWhere((clause) => {
      clause
        .andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", normalized, "<=").orWhere((subclause) => {
        subclause
          .andWhereColumn(arg.prefix + arg.id + "_VALUE", toArg.value, "<=")
          .andWhereColumn(arg.prefix + arg.id + "_CURRENCY", toArg.currency)
      })
    });
    searchedByIt = true;
  }

  // now we return if we have been searched by it at the end
  return searchedByIt;
}

/**
 * The order by functionality for the currency type
 * @param arg the order by arg
 * @returns an array of string with the rule options
 */
export function currencySQLOrderBy(arg: ISQLOrderByInfo): [string, string, string] {
  // we order via the normalized value as a matter of fact
  return [arg.prefix + arg.id + "_NORMALIZED_VALUE", arg.direction, arg.nulls];
}

/**
 * The btree indexable used in searches
 * @param arg the arg for the btree indexable options
 * @returns the columns to index
 */
export function currencySQLBtreeIndexable(arg: ISQLBtreeIndexableInfo) {
  // we index the currency column and the normalize value column
  return [arg.prefix + arg.id + "_CURRENCY", arg.prefix + arg.id + "_NORMALIZED_VALUE"];
}

/**
 * The SQL mantenience for the currency fields that are currently active
 * to be searched
 * @param arg the sql mantenience arg
 * @returns the sql mantenience rule
 */
export function currencySQLMantenience(arg: ISQLArgInfo): ISQLMantenienceType {
  // so the value of the currency in its original currency is in this column
  const valueId = arg.prefix + arg.id + "_VALUE";
  // the normalized value
  const normalizedValueId = arg.prefix + arg.id + "_NORMALIZED_VALUE";
  // the currency itself
  const currencyId = arg.prefix + arg.id + "_CURRENCY";
  // and this is an unique id we will use for the conversion, a meta row
  const asConversionRule = arg.prefix + arg.id + "_CURRENCY_FACTORS";
  return {
    // so we are setting normalized value column
    columnToSet: normalizedValueId,
    // we are setting it to, the value column multiplied by the meta row, factor column 
    setColumnToRaw: [`${JSON.stringify(valueId)}*${JSON.stringify(asConversionRule)}."factor"`, []],
    // from our currency factors table
    from: CURRENCY_FACTORS_IDENTIFIER,
    // the table row that matches will be matched as the conversion rule id we have just created
    fromAs: asConversionRule,
    // and this row will be updated only if the value is not null, and also the currency
    // factors table, code, matches our current currency id
    whereRaw: [
      `${JSON.stringify(valueId)} is not NULL AND ${JSON.stringify(asConversionRule)}."code" = ${JSON.stringify(currencyId)}`,
      [],
    ],
    // we only update if the result of all this creates a change that is larger than 0.1 from the original
    // this will avoid updating too much unnecesarily, basically 1 cent of difference
    updateConditionRaw: [
      `${JSON.stringify(valueId)}*${JSON.stringify(asConversionRule)}."factor" > 0.1`,
      [],
    ],
  }
}

/**
 * How to consider equality with a value
 * @param arg the argument to check equality against
 * @returns a partial row match
 */
export function currencySQLEqual(arg: ISQLEqualInfo) {
  arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_CURRENCY", (arg.value as IPropertyDefinitionSupportedCurrencyType).currency);
  arg.whereBuilder.andWhereColumn(arg.prefix + arg.id + "_VALUE", (arg.value as IPropertyDefinitionSupportedCurrencyType).value);
}

/**
 * How to check equality with a value using the cache
 * @param arg the argument to check against
 * @returns a boolean
 */
export function currencySQLSSCacheEqual(arg: ISQLSSCacheEqualInfo) {
  if (arg.value === null) {
    return arg.row[arg.prefix + arg.id + "_VALUE"] === null;
  }
  return arg.row[arg.prefix + arg.id + "_VALUE"] === (arg.value as IPropertyDefinitionSupportedCurrencyType).value &&
    arg.row[arg.prefix + arg.id + "_CURRENCY"] === (arg.value as IPropertyDefinitionSupportedCurrencyType).currency;
}