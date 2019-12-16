import {
  IPropertyDefinitionSupportedType,
} from "../types";
import { GraphQLNonNull, GraphQLFloat, GraphQLString } from "graphql";
import { IGQLValue } from "../../../../gql";
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
} from "../../../../../../constants";
import { PropertyInvalidReason } from "../../PropertyDefinition";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import Knex from "knex";

export interface IPropertyDefinitionSupportedUnitType {
  value: number;
  unit: string;
  normalizedValue: number;
  normalizedUnit: string;
}

const typeValue: IPropertyDefinitionSupportedType = {
  gql: "PROPERTY_TYPE__Unit",
  gqlFields: {
    value: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    unit: {
      type: GraphQLNonNull(GraphQLString),
    },
    normalizedValue: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    normalizedUnit: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  sql: (id: string) => {
    return {
      [id + "_VALUE"]: {
        type: "float",
      },
      [id + "_UNIT"]: {
        type: "text",
      },
      [id + "_NORMALIZED_VALUE"]: {
        type: "float",
      },
      [id + "_NORMALIZED_UNIT"]: {
        type: "text",
      },
    };
  },
  sqlIn: (value: IPropertyDefinitionSupportedUnitType, id: string) => {
    if (value === null) {
      return {
        [id + "_VALUE"]: null,
        [id + "_UNIT"]: null,
        [id + "_NORMALIZED_VALUE"]: null,
        [id + "_NORMALIZED_UNIT"]: null,
      };
    }
    return {
      [id + "_VALUE"]: value.value,
      [id + "_UNIT"]: value.unit,
      [id + "_NORMALIZED_VALUE"]: value.normalizedValue,
      [id + "_NORMALIZED_UNIT"]: value.normalizedUnit,
    };
  },
  sqlOut: (data: {[key: string]: any}, id: string) => {
    const result: IPropertyDefinitionSupportedUnitType = {
      value: data[id + "_VALUE"],
      unit: data[id + "_UNIT"],
      normalizedValue: data[id + "_NORMALIZED_VALUE"],
      normalizedUnit: data[id + "_NORMALIZED_UNIT"],
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
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_UNIT", data[exactName].normalizedUnit);
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", data[exactName].normalizedValue);
    }

    if (typeof data[fromName] !== "undefined" && data[fromName] !== null) {
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_UNIT", data[fromName].normalizedUnit);
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", ">=", data[fromName].normalizedValue);
    }

    if (typeof data[toName] !== "undefined" && data[toName] !== null) {
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_UNIT", data[toName].normalizedUnit);
      knexBuilder.andWhere(sqlPrefix + id + "_NORMALIZED_VALUE", "<=", data[toName].normalizedValue);
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
  supportedSubtypes: UNIT_SUBTYPES,
  validate: (l: IPropertyDefinitionSupportedUnitType) => {
    // TODO check the unit as for being proper unit, eg. kg, degC, etc...
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
