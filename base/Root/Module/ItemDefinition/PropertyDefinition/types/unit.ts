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
  sql: (arg) => {
    return {
      [arg.prefix + arg.id + "_VALUE"]: {
        type: "float",
      },
      [arg.prefix + arg.id + "_UNIT"]: {
        type: "text",
      },
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: {
        type: "float",
      },
      [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: {
        type: "text",
      },
    };
  },
  sqlIn: (arg) => {
    if (arg.value === null) {
      return {
        [arg.prefix + arg.id + "_VALUE"]: null,
        [arg.prefix + arg.id + "_UNIT"]: null,
        [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: null,
        [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: null,
      };
    }
    const value = arg.value as IPropertyDefinitionSupportedUnitType;
    return {
      [arg.prefix + arg.id + "_VALUE"]: value.value,
      [arg.prefix + arg.id + "_UNIT"]: value.unit,
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: value.normalizedValue,
      [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
    };
  },
  sqlOut: (arg) => {
    const result: IPropertyDefinitionSupportedUnitType = {
      value: arg.row[arg.prefix + arg.id + "_VALUE"],
      unit: arg.row[arg.prefix + arg.id + "_UNIT"],
      normalizedValue: arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"],
      normalizedUnit: arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"],
    };
    if (result.value === null) {
      return null;
    }
    return result;
  },
  sqlSearch: (arg) => {
    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix +arg.id;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
    let searchedByIt = false;

    if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
      const exactAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[exactName] as any;
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_UNIT", exactAsUnit.normalizedUnit);
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", exactAsUnit.normalizedValue);
    } else if (arg.args[exactName] === null) {
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", null);
      searchedByIt = true;
    }

    if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
      const fromAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[fromName] as any;
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_UNIT", fromAsUnit.normalizedUnit);
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", ">=", fromAsUnit.normalizedValue);
      searchedByIt = true;
    }

    if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
      const toAsUnit: IPropertyDefinitionSupportedUnitType = arg.args[toName] as any;
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_UNIT", toAsUnit.normalizedUnit);
      arg.knexBuilder.andWhere(arg.prefix + arg.id + "_NORMALIZED_VALUE", "<=", toAsUnit.normalizedValue);
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
    if (arg.direction === "desc") {
      return (arg.b as IPropertyDefinitionSupportedUnitType).normalizedValue -
        (arg.a as IPropertyDefinitionSupportedUnitType).normalizedValue;
    }
    return (arg.a as IPropertyDefinitionSupportedUnitType).normalizedValue -
      (arg.b as IPropertyDefinitionSupportedUnitType).normalizedValue;
  },
  localSearch: (arg) => {
    // item is deleted
    if (!arg.gqlValue) {
      return false;
    }
    // item is blocked
    if (arg.gqlValue.DATA === null) {
      return false;
    }

    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix +arg.id;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;

    const usefulArgs = arg.include ? arg.args[INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;

    const propertyValue: IPropertyDefinitionSupportedUnitType =
      arg.include ? arg.gqlValue.DATA[arg.include.getId()][arg.id] : arg.gqlValue.DATA[arg.id];

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
  sqlEqual: (arg) => {
    return {
      [arg.prefix + arg.id + "_NORMALIZED_UNIT"]: (arg.value as IPropertyDefinitionSupportedUnitType).normalizedUnit,
      [arg.prefix + arg.id + "_NORMALIZED_VALUE"]: (arg.value as IPropertyDefinitionSupportedUnitType).normalizedValue,
    };
  },
  sqlSSCacheEqual: (arg) => {
    if (arg.value === null) {
      return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === null;
    }
    const value = arg.value as IPropertyDefinitionSupportedUnitType;
    return arg.row[arg.prefix + arg.id + "_NORMALIZED_VALUE"] === value.normalizedValue &&
      arg.row[arg.prefix + arg.id + "_NORMALIZED_UNIT"] === value.normalizedUnit;
  },
  sqlBtreeIndexable: (arg) => {
    return [arg.prefix + arg.id + "_NORMALIZED_UNIT", arg.prefix + arg.id + "_NORMALIZED_VALUE"];
  },
  localEqual: (arg) => {
    const a = arg.a as IPropertyDefinitionSupportedUnitType;
    const b = arg.b as IPropertyDefinitionSupportedUnitType;

    if (a === b) {
      return true;
    } else if (a === null || b === null) {
      return false;
    }

    return a.value === b.value && a.unit === b.unit;
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
  sqlMantenience: null,

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
