/**
 * Contains the currency type description
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
import Knex from "knex";
import { ISQLTableRowValue } from "../../../../../Root/sql";
import { IGQLArgs, IGQLValue } from "../../../../../../gql-querier";

export interface IPropertyDefinitionSupportedCurrencyType {
  value: number;
  currency: string;
}

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
  sql: (sqlPrefix, id) => {
    return {
      [sqlPrefix + id + "_VALUE"]: {type: "float"},
      [sqlPrefix + id + "_CURRENCY"]: {type: "text"},
    };
  },
  sqlIn: (value: IPropertyDefinitionSupportedCurrencyType, sqlPrefix: string, id: string) => {
    if (value === null) {
      return {
        [sqlPrefix + id + "_VALUE"]: null,
        [sqlPrefix + id + "_CURRENCY"]: null,
      };
    }

    return {
      [sqlPrefix + id + "_VALUE"]: value.value,
      [sqlPrefix + id + "_CURRENCY"]: value.currency,
    };
  },
  sqlOut: (data: {[key: string]: any}, sqlPrefix: string, id: string) => {
    const result: IPropertyDefinitionSupportedCurrencyType = {
      value: data[sqlPrefix + id + "_VALUE"],
      currency: data[sqlPrefix + id + "_CURRENCY"],
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

    if (typeof args[exactName] !== "undefined" && args[exactName] !== null) {
      const exactArg = args[exactName] as IGQLArgs;
      knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", exactArg.currency as string);
      knexBuilder.andWhere(sqlPrefix + id + "_VALUE", exactArg.value as number);
    } else if (args[exactName] === null) {
      knexBuilder.andWhere(sqlPrefix + id + "_VALUE", null);
    }

    if (typeof args[fromName] !== "undefined" && args[fromName] !== null) {
      const fromArg = args[fromName] as IGQLArgs;
      knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", fromArg.currency as string);
      knexBuilder.andWhere(sqlPrefix + id + "_VALUE", ">=", fromArg.value as number);
    }

    if (typeof args[toName] !== "undefined" && args[toName] !== null) {
      const toArg = args[toName] as IGQLArgs;
      knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", toArg.currency as string);
      knexBuilder.andWhere(sqlPrefix + id + "_VALUE", "<=", toArg.value as number);
    }
  },
  sqlLocalSearch: (
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
        propertyValue.value >= usefulArgs[fromName].value &&
        propertyValue.currency === usefulArgs[fromName].currency,
      );
    }

    if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
      conditions.push(
        propertyValue.value <= usefulArgs[toName].value &&
        propertyValue.currency === usefulArgs[toName].currency,
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
  sqlLocalEqual: (
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
  validate: (l: IPropertyDefinitionSupportedCurrencyType) => {
    if (typeof l.value !== "number" ||
      typeof l.currency !== "string") {
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

    const splittedDecimals = l.value.toString().split(".");
    const currencyData = currencies[l.currency];
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
