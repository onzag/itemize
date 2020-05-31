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
import PropertyDefinition, { PropertyInvalidReason } from "../../PropertyDefinition";
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
import Knex from "knex";
import { ISQLTableRowValue } from "../../../../../Root/sql";
import { IGQLArgs, IGQLValue } from "../../../../../../gql-querier";

/**
 * The currency definition is described by an object
 */
export interface IPropertyDefinitionSupportedCurrencyType {
  value: number;
  currency: string;
  normalized: number;
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
    normalized: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
  },
  sql: (sqlPrefix, id) => {
    return {
      [sqlPrefix + id + "_VALUE"]: {type: "float"},
      [sqlPrefix + id + "_CURRENCY"]: {type: "text"},
      [sqlPrefix + id + "_NORMALIZED_VALUE"]: {type: "float"},
    };
  },
  sqlIn: (value: IPropertyDefinitionSupportedCurrencyType, sqlPrefix: string, id: string) => {
    if (value === null) {
      return {
        [sqlPrefix + id + "_VALUE"]: null,
        [sqlPrefix + id + "_CURRENCY"]: null,
        [sqlPrefix + id + "_NORMALIZED_VALUE"]: null,
      };
    }

    return {
      [sqlPrefix + id + "_VALUE"]: value.value,
      [sqlPrefix + id + "_CURRENCY"]: value.currency,
      [sqlPrefix + id + "_NORMALIZED_VALUE"]: value.normalized,
    };
  },
  sqlOut: (data: ISQLTableRowValue, sqlPrefix: string, id: string) => {
    const result: IPropertyDefinitionSupportedCurrencyType = {
      value: data[sqlPrefix + id + "_VALUE"],
      currency: data[sqlPrefix + id + "_CURRENCY"],
      normalized: data[sqlPrefix + id + "_NORMALIZED_VALUE"],
    };
    if (result.value === null) {
      return null;
    }
    return result;
  },
  sqlSearch: (args: IGQLArgs, sqlPrefix: string, id: string, knexBuilder) => {
    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + id;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;
    let searchedByIt = false;

    if (typeof args[exactName] !== "undefined" && args[exactName] !== null) {
      const exactArg = args[exactName] as IGQLArgs;
      knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", exactArg.currency as string);
      knexBuilder.andWhere(sqlPrefix + id + "_VALUE", exactArg.value as number);
    } else if (args[exactName] === null) {
      knexBuilder.andWhere(sqlPrefix + id + "_VALUE", null);
      searchedByIt = true;
    }

    if (typeof args[fromName] !== "undefined" && args[fromName] !== null) {
      const fromArg = args[fromName] as IGQLArgs;
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", ">=", fromArg.normalized as number);
      searchedByIt = true;
    }

    if (typeof args[toName] !== "undefined" && args[toName] !== null) {
      const toArg = args[toName] as IGQLArgs;
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", "<=", toArg.normalized as number);
      searchedByIt = true;
    }

    return searchedByIt;
  },
  sqlStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: (
    sqlPrefix: string,
    id: string,
    direction: "asc" | "desc",
    nulls: "first" | "last",
  ) => {
    return [sqlPrefix + id + "_NORMALIZED_VALUE", direction, nulls];
  },
  localOrderBy: (
    direction: "asc" | "desc",
    nulls: "first" | "last",
    a: IPropertyDefinitionSupportedCurrencyType,
    b: IPropertyDefinitionSupportedCurrencyType,
  ) => {
    if (a === null && b === null) {
      return 0;
    } else if (a === null) {
      return nulls === "last" ? 1 : -1;
    } else if (b === null) {
      return nulls === "last" ? -1 : 1;
    }
    if (direction === "desc") {
      return b.normalized - a.normalized;
    }
    return a.normalized - b.normalized;
  },
  sqlBtreeIndexable: (
    sqlPrefix: string,
    id: string,
  ) => {
    return [sqlPrefix + id + "_CURRENCY", sqlPrefix + id + "_NORMALIZED_VALUE"];
  },
  sqlMantenience: (
    sqlPrefix: string,
    id: string,
    knex: Knex,
  ) => {
    const valueId = sqlPrefix + id + "_VALUE";
    const normalizedValueId = sqlPrefix + id + "_CURRENCY";
    const currencyId = sqlPrefix + id + "_NORMALIZED_VALUE";
    const asConversionRule = sqlPrefix + id + "_CURRENCY_FACTORS";
    return {
      columnToSetRaw: knex.raw("??", [normalizedValueId]),
      setColumnToRaw: knex.raw("??*??.??", [valueId, asConversionRule, "factor"]),
      fromListRaw: knex.raw("?? ??", [CURRENCY_FACTORS_IDENTIFIER, asConversionRule]),
      whereRaw: knex.raw("??.?? = ??", [asConversionRule, "name", currencyId]),
      updateConditionRaw: knex.raw("??*??.?? > 0.5", [valueId, asConversionRule, "factor"])
    }
  },
  localSearch: (
    args: IGQLArgs,
    rawData: IGQLValue,
    id: string,
    includeId?: string,
  ) => {
    // item is deleted
    if (!rawData) {
      return false;
    }
    // item is blocked
    if (rawData.DATA === null) {
      return false;
    }

    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + id;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;

    const usefulArgs = includeId ? args[INCLUDE_PREFIX + includeId] || {} : args;

    const propertyValue: IPropertyDefinitionSupportedCurrencyType =
      includeId ? rawData.DATA[includeId][id] : rawData.DATA[id];

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
        propertyValue.normalized >= usefulArgs[fromName].normalized ||
        (
          propertyValue.currency === usefulArgs[fromName].currency &&
          propertyValue.value >= usefulArgs[fromName].value
        ),
      );
    }

    if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
      conditions.push(
        propertyValue.normalized <= usefulArgs[toName].normalized ||
        (
          propertyValue.currency === usefulArgs[fromName].currency &&
          propertyValue.value <= usefulArgs[fromName].value
        ),
      );
    }

    if (!conditions.length) {
      return true;
    } else {
      return conditions.every((c) => c);
    }
  },
  sqlEqual: (
    value: IPropertyDefinitionSupportedCurrencyType,
    sqlPrefix: string,
    id: string,
    isCaseInsensitive: boolean,
    knex: Knex,
    columnName?: string,
  ) => {
    if (!columnName) {
      return {
        [sqlPrefix + id + "_CURRENCY"]: value.currency,
        [sqlPrefix + id + "_VALUE"]: value.value,
      };
    }
    return knex.raw(
      "?? = ? AND ?? = ? AS ??",
      [
        sqlPrefix + id + "_CURRENCY",
        value.currency,
        sqlPrefix + id + "_VALUE",
        value.value,
        columnName,
      ],
    );
  },
  sqlSSCacheEqual: (
    value: IPropertyDefinitionSupportedCurrencyType,
    sqlPrefix: string,
    id: string,
    data: ISQLTableRowValue,
  ) => {
    if (value === null) {
      return data[sqlPrefix + id + "_VALUE"] === value;
    }
    return data[sqlPrefix + id + "_VALUE"] === value.value &&
      data[sqlPrefix + id + "_CURRENCY"] === value.currency;
  },
  localEqual: (
    a: IPropertyDefinitionSupportedCurrencyType,
    b: IPropertyDefinitionSupportedCurrencyType,
  ) => {
    if (a === b) {
      return true;
    }

    return a.value === b.value && a.currency === b.currency;
  },
  validate: (l: IPropertyDefinitionSupportedCurrencyType) => {
    if (
      typeof l.value !== "number" ||
      typeof l.currency !== "string" ||
      typeof l.normalized !== "number"
    ) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (isNaN(l.value)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (isNaN(l.normalized)) {
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
