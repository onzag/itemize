/**
 * Contains the unit type description
 *
 * @module
 */

import {
  IPropertyDefinitionSupportedType,
} from "../types";
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
import { unitSQL, unitSQLIn, unitSQLOrderBy, unitSQLOut, unitSQLSearch, unitSQLEqual, unitSQLSSCacheEqual, unitSQLBtreeIndexable, unitSQLSelect, unitSQLElasticIn, unitElasticSearch, unitElastic, unitElasticOrderBy } from "../sql/unit";

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
const typeValue: IPropertyDefinitionSupportedType<IPropertyDefinitionSupportedUnitType> = {
  rq: {
    type: "object",
    stdFields: {
      value: {
        type: "number",
        required: true,
      },
      unit: {
        type: "string",
        required: true,
      },
      normalizedValue: {
        type: "number",
        required: true,
      },
      normalizedUnit: {
        type: "string",
        required: true,
      },
    },
  },
  sql: unitSQL,
  elastic: unitElastic,
  sqlIn: unitSQLIn,
  sqlSelect: unitSQLSelect,
  sqlOut: unitSQLOut,
  sqlElasticIn: unitSQLElasticIn,
  sqlSearch: unitSQLSearch,
  elasticSearch: unitElasticSearch,
  sqlStrSearch: null,
  elasticStrSearch: null,
  localStrSearch: null,
  sqlOrderBy: unitSQLOrderBy,
  elasticSort: unitElasticOrderBy,
  sqlEqual: unitSQLEqual,
  sqlSSCacheEqual: unitSQLSSCacheEqual,
  sqlBtreeIndexable: unitSQLBtreeIndexable,
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
    if (!arg.rqValue) {
      return false;
    }
    // item is blocked
    if (arg.rqValue.DATA === null) {
      return false;
    }

    const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
    const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
    const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;

    const usefulArgs = arg.include ? arg.args[INCLUDE_PREFIX + arg.include.getId()] || {} : arg.args;

    if (
      typeof usefulArgs[exactName] !== "undefined" ||
      typeof usefulArgs[fromName] !== "undefined" && usefulArgs[fromName] !== null ||
      typeof usefulArgs[toName] !== "undefined" && usefulArgs[toName] !== null
    ) {
      const propertyValue: IPropertyDefinitionSupportedUnitType =
        arg.include ? arg.rqValue.DATA[arg.include.getId()][arg.id] : arg.rqValue.DATA[arg.id];

      if (typeof propertyValue === "undefined") {
        console.warn("Attempted to local search by the property " + arg.id + " but could not find it in the local given value");
        return false;
      }

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
    } else {
      return true;
    }
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
  validate: (l: IPropertyDefinitionSupportedUnitType, p) => {
    if (typeof l.value !== "number" ||
      typeof l.unit !== "string" ||
      typeof l.normalizedValue !== "number" ||
      typeof l.normalizedUnit !== "string") {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    if (isNaN(l.value) || isNaN(l.normalizedValue)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    // normalized unit should be the same as the specified
    // in the definition
    if (l.normalizedUnit !== p.config["unit"]) {
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

  configOptions: [
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
