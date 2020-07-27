/**
 * Contains the currency type description
 *
 * @packageDocumentation
 */

import { currencies } from "../../../../../../imported-resources";
import {
  IPropertyDefinitionSupportedType,
} from "../types";
import { GraphQLNonNull, GraphQLFloat, GraphQLString } from "graphql";
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
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { currencySQL, currencySQLIn, currencySQLOut, currencySQLSearch, currencySQLOrderBy, currencySQLBtreeIndexable, currencySQLMantenience, currencySQLEqual, currencySQLSSCacheEqual } from "../sql/currency";

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
const typeValue: IPropertyDefinitionSupportedType = {
  // the graphql is a new type
  gql: "PROPERTY_TYPE__Currency",
  // it contains the following fields, note how they
  // are conditional due to the fact this goes to the client side as well
  gqlFields: {
    value: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLFloat),
    },
    currency: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
  },

  // from the sql file to save space as they are not
  // used in the client side
  sql: currencySQL,
  sqlIn: currencySQLIn,
  sqlOut: currencySQLOut,
  sqlSearch: currencySQLSearch,
  sqlStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: currencySQLOrderBy,
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
    if (!arg.gqlValue) {
      return false;
    }
    // item is blocked
    if (!arg.gqlValue.DATA === null) {
      return false;
    }

    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;

    const includeId = arg.include ? arg.include.getId() : null;
    const usefulArgs = includeId ? arg.args[INCLUDE_PREFIX + includeId] || {} : arg.args;

    const propertyValue: IPropertyDefinitionSupportedCurrencyType =
      includeId ? arg.gqlValue.DATA[includeId][arg.id] : arg.gqlValue.DATA[arg.id];

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
        propertyValue.currency === usefulArgs[fromName].currency &&
        propertyValue.value <= usefulArgs[fromName].value
      );
    }

    if (!conditions.length) {
      return true;
    } else {
      return conditions.every((c) => c);
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
  validate: (l: IPropertyDefinitionSupportedCurrencyType) => {
    if (
      typeof l.value !== "number" ||
      typeof l.currency !== "string"
    ) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (isNaN(l.value)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (l.value > MAX_SUPPORTED_REAL) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (l.value < 0) {
      return PropertyInvalidReason.TOO_SMALL;
    }
    const currencyData = currencies[l.currency];

    if (!currencyData) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    const splittedDecimals = l.value.toString().split(".");
    const currencyDefinitionDecimals = currencyData.decimals;
    if (!splittedDecimals[1] ||
      splittedDecimals[1].length <= currencyDefinitionDecimals) {
      if (currencyData.rounding && !Number.isInteger((l.value * 10 ** 2) / (currencyData.rounding * 10 ** 2))) {
        return PropertyInvalidReason.INVALID_VALUE;
      }
      return null;
    }

    return PropertyInvalidReason.TOO_MANY_DECIMALS;
  },
  // it is searchable
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,

  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    searchRange: CLASSIC_SEARCH_RANGED_I18N,
    searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    tooLargeErrorInclude: true,
    tooManyDecimalsErrorInclude: true,
  },
};
export default typeValue;
