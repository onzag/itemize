/**
 * Contains the sql and server side specific functions for the currency type
 *
 * @module
 */

import { ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLOrderByInfo, ISQLBtreeIndexableInfo, ISQLMantenienceType, ISQLEqualInfo, ISQLSSCacheEqualInfo, IElasticSearchInfo, IArgInfo } from "../types";
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
    [arg.prefix + arg.id + "_VALUE"]: { type: "NUMERIC" },
    [arg.prefix + arg.id + "_CURRENCY"]: { type: "TEXT" },
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: { type: "NUMERIC" },
  };
}

export function currencyElastic(arg: ISQLArgInfo) {
  const currencyFactors = arg.serverData[CURRENCY_FACTORS_IDENTIFIER];

  return {
    properties: {
      [arg.prefix + arg.id + "_VALUE"]: {
        type: "double",
      },
      [arg.prefix + arg.id + "_CURRENCY"]: {
        type: "keyword",
        // this is an invalid ISO code so it works fine
        null_value: "NULL",
      },
    },
    runtime: {
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {
        type: "double",
        script: {
          lang: "painless",
          source: "emit(doc['" + arg.prefix + arg.id + "_VALUE" + "'].value * params[doc['" + arg.prefix + arg.id + "_CURRENCY" + "'].value])",
          params: currencyFactors || {},
        }
      }
    },
  }
}

/**
 * The selection for the currency in searches
 * does not need the normalized value
 * @param arg 
 */
export function currencySQLSelect(arg: ISQLArgInfo) {
  return [
    arg.prefix + arg.id + "_VALUE",
    arg.prefix + arg.id + "_CURRENCY",
  ]
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
 export function currencySQLElasticIn(arg: ISQLOutInfo) {
  return {
    [arg.prefix + arg.id + "_VALUE"]: arg.row[arg.prefix + arg.id + "_VALUE"],
    [arg.prefix + arg.id + "_CURRENCY"]: arg.row[arg.prefix + arg.id + "_CURRENCY"],
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"]
  };
}

/**
 * The sql out function
 * @param arg the argument out info
 * @returns a property definition supported currency type (or null)
 */
export function currencySQLOut(arg: ISQLOutInfo) {
  const value = arg.row[arg.prefix + arg.id + "_VALUE"];

  // if our value happens to be null
  if (value === null) {
    // return whole null as it should
    return null;
  }

  // so our results depends on the row we are getting
  const result: IPropertyDefinitionSupportedCurrencyType = {
    // we need to use parse float here because numeric gives string
    // in output, which is wrong
    value: parseFloat(value),
    currency: arg.row[arg.prefix + arg.id + "_CURRENCY"],
  };

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
    searchedByIt = true;
  } else if (arg.args[exactName] === null) {
    arg.whereBuilder.andWhereColumnNull(arg.prefix + arg.id + "_VALUE");
    searchedByIt = true;
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
        .andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", ">=", normalized).orWhere((subclause) => {
          subclause
            .andWhereColumn(arg.prefix + arg.id + "_VALUE", ">=", fromArg.value)
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
        .andWhereColumn(arg.prefix + arg.id + "_NORMALIZED_VALUE", "<=", normalized).orWhere((subclause) => {
          subclause
            .andWhereColumn(arg.prefix + arg.id + "_VALUE", "<=", toArg.value)
            .andWhereColumn(arg.prefix + arg.id + "_CURRENCY", toArg.currency)
        })
    });
    searchedByIt = true;
  }

  // now we return if we have been searched by it at the end
  return searchedByIt;
}

export function currencyElasticSearch(arg: IElasticSearchInfo) {
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
  let searchedByIt: boolean = false;

  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    const exactArg = arg.args[exactName] as IGQLArgs;
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id + "_CURRENCY"]: exactArg.currency as string,
      [arg.prefix + arg.id + "_VALUE"]: exactArg.value as number,
    }, arg.boost);
    searchedByIt = true;
  } else if (arg.args[exactName] === null) {
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id + "_CURRENCY"]: "NULL",
    }, arg.boost);
    searchedByIt = true;
  }

  const hasToDefined = typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null;
  const hasFromDefined = typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null;

  if (hasToDefined || hasFromDefined) {
    if (hasFromDefined) {
      const fromArg = arg.args[fromName] as any as IPropertyDefinitionSupportedCurrencyType;
      const factor: number = arg.serverData[CURRENCY_FACTORS_IDENTIFIER][fromArg.currency];

      // in these cases we use the normalized values and for that we use the conversion
      const normalized = factor ? factor * fromArg.value : null;

      arg.elasticQueryBuilder.must({
        bool: {
          should: [
            {
              range: {
                [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {
                  gte: normalized,
                }
              },
              bool: {
                must: [
                  {
                    range: {
                      [arg.prefix + arg.id + "_VALUE"]: {
                        gte: fromArg.value
                      },
                    },
                    match: {
                      [arg.prefix + arg.id + "_CURRENCY"]: fromArg.currency,
                    }
                  }
                ]
              }
            }
          ]
        }
      }, arg.boost);
    }
    if (hasToDefined) {
      const toArg = arg.args[toName] as any as IPropertyDefinitionSupportedCurrencyType;
      const factor: number = arg.serverData[CURRENCY_FACTORS_IDENTIFIER][toArg.currency];

      // in these cases we use the normalized values and for that we use the conversion
      const normalized = factor ? factor * toArg.value : null;

      arg.elasticQueryBuilder.must({
        bool: {
          should: [
            {
              range: {
                [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {
                  lte: normalized,
                }
              },
              bool: {
                must: [
                  {
                    range: {
                      [arg.prefix + arg.id + "_VALUE"]: {
                        lte: toArg.value
                      },
                    },
                    match: {
                      [arg.prefix + arg.id + "_CURRENCY"]: toArg.currency,
                    }
                  }
                ]
              }
            }
          ]
        }
      }, arg.boost);
    }

    searchedByIt = true;
  }

  return searchedByIt ? {} : null;
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
 * The order by functionality for the currency type
 * @param arg the order by arg
 * @returns the elastic rule
 */
export function currencyElasticOrderBy(arg: ISQLOrderByInfo) {
  // we order via the normalized value as a matter of fact
  return {
    [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: arg.direction
  }
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