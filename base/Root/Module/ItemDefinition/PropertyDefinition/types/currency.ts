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
  CURRENCY_FACTORS_IDENTIFIER,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { IGQLArgs } from "../../../../../../gql-querier";

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
  gql: "PROPERTY_TYPE__Currency",
  gqlFields: {
    value: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLFloat),
    },
    currency: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
  },
  sql: (arg) => {
    return {
      [arg.prefix + arg.id + "_VALUE"]: {type: "float"},
      [arg.prefix + arg.id + "_CURRENCY"]: {type: "text"},
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {type: "float"},
    };
  },
  sqlIn: (arg) => {
    const value: IPropertyDefinitionSupportedCurrencyType = arg.value as IPropertyDefinitionSupportedCurrencyType;
    if (arg.value === null) {
      return {
        [arg.prefix + arg.id + "_VALUE"]: null,
        [arg.prefix + arg.id + "_CURRENCY"]: null,
        [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: null,
      };
    }

    const factor: number = arg.serverData[CURRENCY_FACTORS_IDENTIFIER][value.currency];
    const normalized = factor ? (1/factor)*value.value : null;

    return {
      [arg.prefix + arg.id + "_VALUE"]: value.value,
      [arg.prefix + arg.id + "_CURRENCY"]: value.currency,
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: normalized,
    };
  },
  sqlOut: (arg) => {
    const result: IPropertyDefinitionSupportedCurrencyType = {
      value: arg.row[arg.prefix + arg.id + "_VALUE"],
      currency: arg.row[arg.prefix + arg.id + "_CURRENCY"],
    };
    if (result.value === null) {
      return null;
    }
    return result;
  },
  sqlSearch: (arg) => {
    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
    let searchedByIt = false;

    if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
      const exactArg = arg.args[exactName] as IGQLArgs;
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_CURRENCY", exactArg.currency as string);
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_VALUE", exactArg.value as number);
    } else if (arg.args[exactName] === null) {
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_VALUE", null);
      searchedByIt = true;
    }

    if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
      const fromArg = arg.args[fromName] as IGQLArgs;
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", ">=", fromArg.normalized as number);
      searchedByIt = true;
    }

    if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
      const toArg = arg.args[toName] as IGQLArgs;
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", "<=", toArg.normalized as number);
      searchedByIt = true;
    }

    return searchedByIt;
  },
  sqlStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: (arg) => {
    return [arg.prefix + arg.id + "_NORMALIZED_VALUE", arg.direction, arg.nulls];
  },
  localOrderBy: (arg) => {
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
  sqlBtreeIndexable: (arg) => {
    return [arg.prefix + arg.id + "_CURRENCY", arg.prefix + arg.id + "_NORMALIZED_VALUE"];
  },
  sqlMantenience: (arg) => {
    const valueId = arg.prefix + arg.id + "_VALUE";
    const normalizedValueId = arg.prefix + arg.id + "_CURRENCY";
    const currencyId = arg.prefix + arg.id + "_NORMALIZED_VALUE";
    const asConversionRule = arg.prefix + arg.id + "_CURRENCY_FACTORS";
    return {
      columnToSet: normalizedValueId,
      setColumnToRaw: arg.knex.raw("??*??.??", [valueId, asConversionRule, "factor"]),
      from: CURRENCY_FACTORS_IDENTIFIER,
      fromAs: asConversionRule,
      whereRaw: arg.knex.raw("??.?? = ??", [asConversionRule, "name", currencyId]),
      updateConditionRaw: arg.knex.raw("??*??.?? > 0.5", [valueId, asConversionRule, "factor"])
    }
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
  sqlEqual: (arg) => {
    return {
      [arg.prefix + arg.id + "_CURRENCY"]: (arg.value as IPropertyDefinitionSupportedCurrencyType).currency,
      [arg.prefix + arg.id + "_VALUE"]: (arg.value as IPropertyDefinitionSupportedCurrencyType).value,
    };
  },
  sqlSSCacheEqual: (arg) => {
    if (arg.value === null) {
      return arg.row[arg.prefix + arg.id + "_VALUE"] === null;
    }
    return arg.row[arg.prefix + arg.id + "_VALUE"] === (arg.value as IPropertyDefinitionSupportedCurrencyType).value &&
      arg.row[arg.prefix + arg.id + "_CURRENCY"] === (arg.value as IPropertyDefinitionSupportedCurrencyType).currency;
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
