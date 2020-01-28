/**
 * Contains the unit type description
 *
 * @packageDocumentation
 */

import {
  IPropertyDefinitionSupportedType,
} from "../types";
import { GraphQLNonNull, GraphQLFloat, GraphQLString } from "graphql";
import {
  UNIT_SUBTYPES,
  MAX_SUPPORTED_REAL,
  MIN_SUPPORTED_REAL,
  MAX_DECIMAL_COUNT,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
  INCLUDE_PREFIX,
} from "../../../../../../constants";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import Knex from "knex";
import { ISQLTableRowValue } from "../../../../sql";
import { IGQLArgs, IGQLValue } from "../../../../../../gql-querier";

/**
 * Units are described by a value and a unit, in either SI
 * or imperial system, the normalized value is always in SI
 * in a normalized unit as specified
 */
export interface IPropertyDefinitionSupportedUnitType {
  value: number;
  unit: string;
  normalizedValue: number;
  normalizedUnit: string;
}

/**
 * The description of the unit type as it behaves in the app
 */
const typeValue: IPropertyDefinitionSupportedType = {
  gql: "PROPERTY_TYPE__Unit",
  gqlFields: {
    value: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLFloat),
    },
    unit: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
    normalizedValue: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLFloat),
    },
    normalizedUnit: {
      type: GraphQLNonNull && GraphQLNonNull(GraphQLString),
    },
  },
  sql: (sqlPrefix: string, id: string) => {
    return {
      [sqlPrefix + id + "_VALUE"]: {
        type: "float",
      },
      [sqlPrefix + id + "_UNIT"]: {
        type: "text",
      },
      [sqlPrefix + id + "_NORMALIZED_VALUE"]: {
        type: "float",
      },
      [sqlPrefix + id + "_NORMALIZED_UNIT"]: {
        type: "text",
      },
    };
  },
  sqlIn: (value: IPropertyDefinitionSupportedUnitType, sqlPrefix: string, id: string) => {
    if (value === null) {
      return {
        [sqlPrefix + id + "_VALUE"]: null,
        [sqlPrefix + id + "_UNIT"]: null,
        [sqlPrefix + id + "_NORMALIZED_VALUE"]: null,
        [sqlPrefix + id + "_NORMALIZED_UNIT"]: null,
      };
    }
    return {
      [sqlPrefix + id + "_VALUE"]: value.value,
      [sqlPrefix + id + "_UNIT"]: value.unit,
      [sqlPrefix + id + "_NORMALIZED_VALUE"]: value.normalizedValue,
      [sqlPrefix + id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
    };
  },
  sqlOut: (data: ISQLTableRowValue, sqlPrefix: string, id: string) => {
    const result: IPropertyDefinitionSupportedUnitType = {
      value: data[sqlPrefix + id + "_VALUE"],
      unit: data[sqlPrefix + id + "_UNIT"],
      normalizedValue: data[sqlPrefix + id + "_NORMALIZED_VALUE"],
      normalizedUnit: data[sqlPrefix + id + "_NORMALIZED_UNIT"],
    };
    if (result.value === null) {
      return null;
    }
    return result;
  },
  sqlSearch: (data: IGQLValue, sqlPrefix: string, id: string, knexBuilder) => {
    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + id;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;

    if (typeof data[exactName] !== "undefined" && data[exactName] !== null) {
      const exactAsUnit: IPropertyDefinitionSupportedUnitType = data[exactName] as any;
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_UNIT", exactAsUnit.normalizedUnit);
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", exactAsUnit.normalizedValue);
    } else if (data[exactName] === null) {
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", null);
    }

    if (typeof data[fromName] !== "undefined" && data[fromName] !== null) {
      const fromAsUnit: IPropertyDefinitionSupportedUnitType = data[fromName] as any;
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_UNIT", fromAsUnit.normalizedUnit);
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", ">=", fromAsUnit.normalizedValue);
    }

    if (typeof data[toName] !== "undefined" && data[toName] !== null) {
      const toAsUnit: IPropertyDefinitionSupportedUnitType = data[toName] as any;
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_UNIT", toAsUnit.normalizedUnit);
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", "<=", toAsUnit.normalizedValue);
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

    const propertyValue: IPropertyDefinitionSupportedUnitType =
      includeId ? rawData.DATA[includeId][id] : rawData.DATA[id];

    const conditions: boolean[] = [];
    if (typeof usefulArgs[exactName] !== "undefined") {
      if (usefulArgs[exactName] === null) {
        conditions.push(
          propertyValue.normalizedValue === null,
        );
      } else {
        conditions.push(
          propertyValue.normalizedValue === usefulArgs[exactName].normalizedValue &&
          propertyValue.normalizedUnit === usefulArgs[exactName].normalizedUnit,
        );
      }
    }

    if (typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null) {
      conditions.push(
        propertyValue.normalizedValue >= usefulArgs[fromName].normalizedValue &&
        propertyValue.normalizedUnit === usefulArgs[fromName].normalizedUnit,
      );
    }

    if (typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null) {
      conditions.push(
        propertyValue.normalizedValue <= usefulArgs[toName].normalizedValue &&
        propertyValue.normalizedUnit === usefulArgs[toName].normalizedUnit,
      );
    }

    if (!conditions.length) {
      return true;
    } else {
      return conditions.every((c) => c);
    }
  },
  sqlEqual: (
    value: IPropertyDefinitionSupportedUnitType,
    sqlPrefix: string,
    id: string,
    knex: Knex,
    columnName?: string,
  ) => {
    if (!columnName) {
      return {
        [sqlPrefix + id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
        [sqlPrefix + id + "_NORMALIZED_VALUE"]: value.normalizedValue,
      };
    }
    return knex.raw(
      "?? = ? AND ?? = ? AS ??",
      [
        sqlPrefix + id + "_NORMALIZED_UNIT",
        value.normalizedUnit,
        sqlPrefix + id + "_NORMALIZED_VALUE",
        value.normalizedValue,
        columnName,
      ],
    );
  },
  sqlLocalEqual: (
    value: IPropertyDefinitionSupportedUnitType,
    sqlPrefix: string,
    id: string,
    data: ISQLTableRowValue,
  ) => {
    if (value === null) {
      return data[sqlPrefix + id + "_NORMALIZED_VALUE"] === value;
    }
    return data[sqlPrefix + id + "_NORMALIZED_VALUE"] === value.normalizedValue &&
      data[sqlPrefix + id + "_NORMALIZED_UNIT"] === value.normalizedUnit;
  },
  supportedSubtypes: UNIT_SUBTYPES,
  validate: (l: IPropertyDefinitionSupportedUnitType) => {
    if (typeof l.value !== "number" ||
      typeof l.unit !== "string" ||
      typeof l.normalizedValue !== "number" ||
      typeof l.normalizedUnit !== "string") {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (isNaN(l.value) || isNaN(l.normalizedValue)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (l.value > MAX_SUPPORTED_REAL) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (l.value < MIN_SUPPORTED_REAL) {
      return PropertyInvalidReason.TOO_SMALL;
    }

    const splittedDecimals = l.value.toString().split(".");
    if (!splittedDecimals[1] || splittedDecimals[1].length <= MAX_DECIMAL_COUNT) {
      return null;
    }

    return PropertyInvalidReason.TOO_MANY_DECIMALS;
  },
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
  allowsMinMaxDefined: true,
  allowsMaxDecimalCountDefined: true,
  // i18n attributes required
  i18n: {
    base: CLASSIC_BASE_I18N,
    optional: CLASSIC_OPTIONAL_I18N,
    searchBase: CLASSIC_SEARCH_BASE_I18N,
    searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    searchRange: CLASSIC_SEARCH_RANGED_I18N,
    searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    tooSmallErrorInclude: true,
    tooLargeErrorInclude: true,
    tooManyDecimalsErrorInclude: true,
  },

  specialProperties: [
    {
      name: "unit",
      type: "string",
      required: true,
    },
    {
      name: "imperialUnit",
      type: "string",
      required: true,
    },
    {
      name: "lockUnitsToPrimaries",
      type: "boolean",
    },
    {
      name: "initialPrefill",
      type: "number",
    },
  ],
};
export default typeValue;
