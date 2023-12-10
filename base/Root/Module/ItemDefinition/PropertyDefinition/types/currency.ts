/**
 * Contains the currency type description
 *
 * @module
 */

import { currencies } from "../../../../../../imported-resources";
import {
  IPropertyDefinitionSupportedType,
} from "../types";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  MAX_SUPPORTED_REAL,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
  INCLUDE_PREFIX,
  MIN_SUPPORTED_REAL,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import {
  currencySQL, currencySQLIn, currencySQLOut, currencySQLSearch, currencySQLOrderBy,
  currencySQLBtreeIndexable, currencySQLMantenience, currencySQLEqual, currencySQLSSCacheEqual, currencySQLSelect,
  currencyElasticSearch,
  currencySQLElasticIn,
  currencyElastic,
  currencyElasticOrderBy
} from "../sql/currency";

/**
 * The currency definition is described by an object
 */
export interface IPropertyDefinitionSupportedCurrencyType {
  value: number;
  currency: string;
}

/**
 * The type of a curreny type specifies how it behaves in the app
 */
const typeValue: IPropertyDefinitionSupportedType<IPropertyDefinitionSupportedCurrencyType> = {
  rq: {
    type: "object",
    stdFields: {
      value: {
        type: "number",
        required: true,
      },
      currency: {
        type: "string",
        required: true,
      }
    },
  },

  // from the sql file to save space as they are not
  // used in the client side
  sql: currencySQL,
  elastic: currencyElastic,
  sqlSelect: currencySQLSelect,
  sqlIn: currencySQLIn,
  sqlOut: currencySQLOut,
  sqlElasticIn: currencySQLElasticIn,
  sqlSearch: currencySQLSearch,
  elasticSearch: currencyElasticSearch,
  sqlStrSearch: null,
  elasticStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: currencySQLOrderBy,
  elasticSort: currencyElasticOrderBy,
  sqlBtreeIndexable: currencySQLBtreeIndexable,
  sqlMantenience: currencySQLMantenience,
  sqlEqual: currencySQLEqual,
  sqlSSCacheEqual: currencySQLSSCacheEqual,

  // local order by used in the cached searches
  localOrderBy: (arg) => {
    // compare a and b, nulls are equal
    if (arg.a === null && arg.b === null) {
      return 0;
    } else if (arg.a === null) {
      return arg.nulls === "last" ? 1 : -1;
    } else if (arg.b === null) {
      return arg.nulls === "last" ? -1 : 1;
    }

    // locally currencies are ignored because it's too expensive
    // for the client, it's possible to read server data here nevertheless
    const a = arg.a as IPropertyDefinitionSupportedCurrencyType;
    const b = arg.b as IPropertyDefinitionSupportedCurrencyType;
    if (arg.direction === "desc") {
      return b.value - a.value;
    }
    return a.value - b.value;
  },
  localSearch: (arg) => {
    // item is deleted
    if (!arg.rqValue) {
      return false;
    }
    // item is blocked
    if (!arg.rqValue.DATA === null) {
      return false;
    }

    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;

    const includeId = arg.include ? arg.include.getId() : null;
    const usefulArgs = includeId ? arg.args[INCLUDE_PREFIX + includeId] || {} : arg.args;

    if (
      typeof usefulArgs[exactName] !== "undefined" ||
      typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null ||
      typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null
    ) {

      const propertyValue: IPropertyDefinitionSupportedCurrencyType =
        includeId ? arg.rqValue.DATA[includeId][arg.id] : arg.rqValue.DATA[arg.id];

      if (typeof propertyValue === "undefined") {
        console.warn("Attempted to local search by the property " + arg.id + " but could not find it in the local given value");
        return false;
      }

      const conditions: boolean[] = [];
      if (typeof usefulArgs[exactName] !== "undefined") {
        if (usefulArgs[exactName] === null) {
          conditions.push(
            propertyValue.value === null,
          );
        } else {
          conditions.push(
            propertyValue.value === usefulArgs[exactName].value &&
            propertyValue.currency === usefulArgs[exactName].currency,
          );
        }
      }

      if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
        conditions.push(
          propertyValue.currency === usefulArgs[fromName].currency &&
          propertyValue.value >= usefulArgs[fromName].value
        );
      }

      if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
        conditions.push(
          propertyValue.currency === usefulArgs[toName].currency &&
          propertyValue.value <= usefulArgs[toName].value
        );
      }

      if (!conditions.length) {
        return true;
      } else {
        return conditions.every((c) => c);
      }
    } else {
      return true;
    }
  },
  localEqual: (arg) => {
    const a = arg.a as IPropertyDefinitionSupportedCurrencyType;
    const b = arg.b as IPropertyDefinitionSupportedCurrencyType;

    if (a === b) {
      return true;
    } else if (a === null || b === null) {
      return false;
    }

    return a.value === b.value && a.currency === b.currency;
  },
  validate: (l: IPropertyDefinitionSupportedCurrencyType, p) => {
    if (
      typeof l.value !== "number" ||
      typeof l.currency !== "string"
    ) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (isNaN(l.value)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    let maxValue = MAX_SUPPORTED_REAL;
    let minValue = 0;
    let isZeroPrevented = false;
    if (p.config) {
      if (p.config.allowNegatives || p.config.isDebt) {
        minValue = MIN_SUPPORTED_REAL;
      }
      if (p.config.isDebt) {
        maxValue = 0;
      }
      isZeroPrevented = p.config.preventZero;
    }

    if (maxValue === 0 && isZeroPrevented ? l.value >= maxValue : l.value > maxValue) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (minValue === 0 && isZeroPrevented ? l.value <= minValue : l.value < minValue) {
      return PropertyInvalidReason.TOO_SMALL;
    }
    const currencyData = currencies[l.currency];

    if (!currencyData) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    const splittedDecimals = l.value.toString().split(".");
    const currencyDefinitionDecimals = currencyData.decimals;
    if (!splittedDecimals[1] || splittedDecimals[1].length <= currencyDefinitionDecimals) {
      return null;
    }

    return PropertyInvalidReason.TOO_MANY_DECIMALS;
  },
  // it is searchable
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,

  configOptions: [
    {
      name: "allowNegatives",
      type: "boolean",
      required: false,
    },
    {
      name: "isDebt",
      type: "boolean",
      required: false,
    },
    {
      name: "preventZero",
      type: "boolean",
      required: false,
    },
    {
      name: "initialPrefill",
      type: "number",
      required: false,
    }
  ],

  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    searchRange: CLASSIC_SEARCH_RANGED_I18N,
    searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
    tooSmallErrorInclude: true,
    tooManyDecimalsErrorInclude: true,
  },
};
export default typeValue;
