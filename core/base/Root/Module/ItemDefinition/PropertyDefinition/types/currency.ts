import {
  IPropertyDefinitionSupportedType,
} from "../types";
import { GraphQLNonNull, GraphQLFloat, GraphQLString } from "graphql";
import { IGQLValue } from "../../../../gql";
import PropertyDefinition, { PropertyInvalidReason } from "../../PropertyDefinition";
import {
  MAX_SUPPORTED_REAL,
  CLASSIC_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
} from "../../../../../../constants";
import { PropertyDefinitionSearchInterfacesPrefixes, PropertyDefinitionSearchInterfacesType } from "../search-interfaces";

export interface IPropertyDefinitionSupportedCurrencyType {
  value: number;
  currency: string;
}

const typeValue: IPropertyDefinitionSupportedType = {
  gql: "PROPERTY_TYPE__Currency",
  gqlFields: {
    value: {
      type: GraphQLNonNull(GraphQLFloat),
    },
    currency: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  sql: (id) => {
    const obj = {};
    obj[id + "_VALUE"] = "float";
    obj[id + "_CURRENCY"] = "text";
    return obj;
  },
  sqlIn: (value: IPropertyDefinitionSupportedCurrencyType, id: string) => {
    const obj = {};

    if (value === null) {
      obj[id + "_VALUE"] = null;
      obj[id + "_CURRENCY"] = null;
    } else {
      obj[id + "_VALUE"] = value.value;
      obj[id + "_CURRENCY"] = value.currency;
    }
    return obj;
  },
  sqlOut: (data: {[key: string]: any}, id: string) => {
    const result: IPropertyDefinitionSupportedCurrencyType = {
      value: data[id + "_VALUE"],
      currency: data[id + "_CURRENCY"],
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
      knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", data[exactName].currency);
      knexBuilder.andWhere(sqlPrefix + id + "_VALUE", data[exactName].value);
    }

    if (typeof data[fromName] !== "undefined" && data[fromName] !== null) {
      knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", data[fromName].currency);
      knexBuilder.andWhere(sqlPrefix + id + "_VALUE", ">=", data[fromName].value);
    }

    if (typeof data[toName] !== "undefined" && data[toName] !== null) {
      knexBuilder.andWhere(sqlPrefix + id + "_CURRENCY", data[toName].currency);
      knexBuilder.andWhere(sqlPrefix + id + "_VALUE", "<=", data[toName].value);
    }
  },
  sqlEqual: (
    value: IPropertyDefinitionSupportedCurrencyType,
    sqlPrefix: string,
    id: string,
    columnName: string,
    knex: any,
  ) => {
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
  validate: (l: IPropertyDefinitionSupportedCurrencyType) => {
    if (!PropertyDefinition.currencyData) {
      throw new Error("Please ensure to set currency data on the class of property definition");
    }

    if (typeof l.value !== "number" ||
      typeof l.currency !== "string") {
      return PropertyInvalidReason.UNSPECIFIED;
    }

    if (isNaN(l.value)) {
      return PropertyInvalidReason.UNSPECIFIED;
    }

    if (l.value > MAX_SUPPORTED_REAL) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (l.value < 0) {
      return PropertyInvalidReason.TOO_SMALL;
    }

    const splittedDecimals = l.value.toString().split(".");
    const currencyData = (PropertyDefinition.currencyData as any)[l.currency];
    const currencyDefinitionDecimals = currencyData.decimals;
    if (!splittedDecimals[1] ||
      splittedDecimals[1].length <= currencyDefinitionDecimals) {
      if (currencyData.rounding && !Number.isInteger((l.value * 10 ** 2) / (currencyData.rounding * 10 ** 2))) {
        return PropertyInvalidReason.UNSPECIFIED;
      }
      return null;
    }

    return PropertyInvalidReason.TOO_MANY_DECIMALS;
  },
  // it is searchable
  searchable: true,
  searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,

  supportsIcons: false,
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
