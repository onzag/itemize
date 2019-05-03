import ItemDefinition from ".";
import ConditionalRuleSet,
  { IConditionalRuleSetRawJSONDataType } from "./ConditionalRuleSet";
import { MIN_SUPPORTED_INTEGER, MAX_SUPPORTED_INTEGER,
  MAX_SUPPORTED_REAL,
  MAX_DECIMAL_COUNT,
  MAX_STRING_LENGTH,
  REDUCED_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_BASE_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  MIN_SUPPORTED_REAL,
  MAX_SUPPORTED_YEAR,
  MIN_SUPPORTED_YEAR,
  MAX_RAW_TEXT_LENGTH,
  REDUCED_SEARCH_BASE_I18N,
  LOCATION_SEARCH_I18N,
  MAX_FILE_BATCH_COUNT,
  UNIT_SUBTYPES,
} from "../../constants";
import Module, { OnStateChangeListenerType } from "../Module";
import * as fastHTMLParser from "fast-html-parser";

export enum PropertyInvalidReason {
  UNSPECIFIED = "UNSPECIFIED",
  INVALID_VALUE = "INVALID_VALUE",
  INVALID_DATETIME = "INVALID_DATETIME",
  TOO_LARGE = "TOO_LARGE",
  TOO_SMALL = "TOO_SMALL",
  TOO_MANY_DECIMALS = "TOO_MANY_DECIMALS",
  TOO_FEW_DECIMALS = "TOO_FEW_DECIMALS",
  NOT_NULLABLE = "NOT_NULLABLE",
  INVALID_SUBTYPE_VALUE = "INVALID_SUBTYPE_VALUE",
  FROM_LARGER_THAN_TO = "FROM_LARGER_THAN_TO",
  TO_SMALLER_THAN_FROM = "TO_SMALLER_THAN_FROM",
}

// All the supported property types
export type PropertyDefinitionSupportedTypeName =
  "boolean" |         // A simple boolean, comparable, and stored as a boolean
  "integer" |         // A simple number, comparable, and stored as a number
  "number" |          // A simple number, comparable, and stored as a number
  "currency" |        // Currency, comparable and stored as an object
  "unit" |            // Unit, comparable and stored as an object
  "string" |          // A simple string, comparable, and stored as a string
  "password" |        // A password, stored as a hash, ensure to disable retrieval
  "text" |            // Represented as an object, non comparable,
                      // stored as text and object and it should be able to do
                      // full text search, it's an object due to image support
                      // images are stored separatedly which includes where in
                      // the text location they are.
  "year" |            // Represented as a number, comparable, stored as number
  "date" |            // Represented as a date, comparable, stored as a date
  "datetime" |        // Represented as a date, comparable, stored as a date
  "time" |            // Represented as a date, comparable, stored as a date
  "location" |        // Represented as an object, non comparable, stored
                      // as two values
  "files";            // Represented as a list of urls, non comparable,
                      // stored as a list of urls

export enum PropertyDefinitionSearchInterfacesType {
  // uses an instance of the same property type input
  EXACT,
  // uses an instance of the same property type input, or two for a range
  // provides either an exact value or a range
  EXACT_AND_RANGE,
  // full text search, uses a simple raw string as search
  FTS,
  // uses location and range for searching
  LOCATION_DISTANCE,
}

export interface IPropertyDefinitionSupportedType {
  // json represents how the element is represented in json form
  // objects are not allowed only boolean numbers and strings are
  // these are used for types that are allowed to be used by
  // enforcedProperties and predefinedProperties, it is optional
  // as types that are not settable do not have a json form
  json?: "boolean" | "number" | "string";

  // supported subtypes of the type
  supportedSubtypes?: string[];

  // graphql type as a string
  gql: string;
  gqlDef?: {[key: string]: string};

  // represents an item that would mark for null
  // by default it is null itself
  nullableDefault?: any;

  // Items that have this field support fetch for autocomplete
  // fields using rest endpoints, this includes support for
  // autocomplete, autocompleteSetFromProperty, autocompleteIsEnforced
  // and autocompleteSupportsPreffils
  supportsAutocomplete?: boolean;

  // this is a validation function that checks whether the value
  // is valid,
  validate?: (value: PropertyDefinitionSupportedType, subtype?: string) => PropertyInvalidReason;
  // whether it is searchable or not
  searchable: boolean;
  // the search interface used
  searchInterface?: PropertyDefinitionSearchInterfacesType;
  // whether it supports icons or not
  supportsIcons: boolean;
  // special attributes that might be added specific to that type
  specialProperties?: Array<{
    name: string;
    type: "number" | "string" | "boolean",
    required?: boolean;
  }>;
  allowsMinMaxDefined?: boolean;
  allowsMaxDecimalCountDefined?: boolean;
  allowsMinMaxLengthDefined?: boolean;
  // i18n supported and expected attributes
  // they won't be requested at all for hidden and not searchable items
  // if the item has a range it should be specified too
  // these will be used for checking more than anything
  i18n: {
    base: string[],
    optional: string[],
    // range attributes are not requested if disableRangedSearch is true
    // nor if the searchInterface is not EXACT_AND_RANGE
    // nor if the searchLevel is disabled
    searchRange?: string[],
    searchRangeOptional?: string[],
    // not requested if the searchLevel is disabled
    searchBase?: string[],
    searchOptional?: string[],

    tooLargeErrorInclude?: boolean,
    tooSmallErrorInclude?: boolean,
    tooManyDecimalsErrorInclude?: boolean,
  };

  // toSearch: (base: IPropertyDefinitionRawJSONDataType) => IPropertyDefinitionRawJSONDataType[];
}

// So this is how properties are defined to give an overview on
// how they are supposed to be managed
export type PropertyDefinitionSupportedTypesStandardType =
Record<PropertyDefinitionSupportedTypeName, IPropertyDefinitionSupportedType>;

const EMAIL_REGEX = new RegExp("(?:[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]" +
  "+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09" +
  "\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9" +
  "-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]" +
  "|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53" +
  "-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])");

const PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD
  : PropertyDefinitionSupportedTypesStandardType = {
  boolean: {
    // a boolean type can be written as a boolean
    json: "boolean",
    gql: "Boolean",
    // it is searchable by default
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
    // the i18n attributes
    supportsIcons: true,
    i18n: {
      base: REDUCED_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: REDUCED_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    },
  },
  integer: {
    // an integer is represented as a number
    json: "number",
    gql: "Int",
    supportsAutocomplete: true,
    // it gotta be validated to check it's a number
    validate: (n: PropertyDefinitionSupportedIntegerType) => {
      if (isNaN(n) || !Number.isInteger(n)) {
        return PropertyInvalidReason.UNSPECIFIED;
      } else if (n > MAX_SUPPORTED_INTEGER) {
        return PropertyInvalidReason.TOO_LARGE;
      } else if (n < MIN_SUPPORTED_INTEGER) {
        return PropertyInvalidReason.TOO_SMALL;
      }

      return null;
    },
    // it is searchable by exact and range value
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    supportsIcons: true,
    allowsMinMaxDefined: true,
    // i18n attributes
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      searchRange: CLASSIC_SEARCH_RANGED_I18N,
      searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
      tooSmallErrorInclude: true,
      tooLargeErrorInclude: true,
    },
  },
  number: {
    // a number is just a number can be integer or decimal
    json: "number",
    gql: "Float",
    supportsAutocomplete: true,
    // the validator
    validate: (n: PropertyDefinitionSupportedNumberType) => {
      if (isNaN(n)) {
        return PropertyInvalidReason.UNSPECIFIED;
      }

      if (n > MAX_SUPPORTED_REAL) {
        return PropertyInvalidReason.TOO_LARGE;
      } else if (n < MIN_SUPPORTED_REAL) {
        return PropertyInvalidReason.TOO_SMALL;
      }

      const splittedDecimals = n.toString().split(".");
      if (!splittedDecimals[1] || splittedDecimals[1].length <= MAX_DECIMAL_COUNT) {
        return null;
      }

      return PropertyInvalidReason.TOO_MANY_DECIMALS;
    },
    // it is searchable
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    allowsMinMaxDefined: true,
    allowsMaxDecimalCountDefined: true,
    // i18n attributes required
    supportsIcons: true,
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
  },
  currency: {
    gql: "__PropertyType__Currency",
    gqlDef: {
      value: "Float!",
      currency: "String!",
    },
    // locations just contain this basic data
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
  },
  unit: {
    gql: "__PropertyType__Unit",
    gqlDef: {
      value: "Float!",
      unit: "String!",
      normalizedValue: "Float!",
      normalizedUnit: "String!",
    },
    supportedSubtypes: UNIT_SUBTYPES,
    validate: (l: IPropertyDefinitionSupportedUnitType) => {
      // TODO check the unit as for being proper unit, eg. kg, degC, etc...
      if (typeof l.value !== "number" ||
        typeof l.unit !== "string" ||
        typeof l.normalizedValue !== "number" ||
        typeof l.normalizedUnit !== "string") {
        return PropertyInvalidReason.UNSPECIFIED;
      }

      if (isNaN(l.value) || isNaN(l.normalizedValue)) {
        return PropertyInvalidReason.UNSPECIFIED;
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
    supportsIcons: false,
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
    ],
  },
  string: {
    gql: "String",
    // a string is a string
    json: "string",
    nullableDefault: "",
    supportsAutocomplete: true,
    supportedSubtypes: ["email"],
    // validates just the length
    validate: (s: PropertyDefinitionSupportedStringType, subtype: string) => {
      if (typeof s !== "string") {
        return PropertyInvalidReason.UNSPECIFIED;
      } else if (s.length > MAX_STRING_LENGTH) {
        return PropertyInvalidReason.TOO_LARGE;
      }

      if (subtype === "email" && !EMAIL_REGEX.test(s)) {
        return PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
      }

      return null;
    },
    // it is searchable by an exact value, use text for organic things
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
    supportsIcons: true,
    allowsMinMaxLengthDefined: true,
    // i18n attributes required
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      tooLargeErrorInclude: true,
    },
  },
  password: {
    gql: "String",
    nullableDefault: "",
    // validates just the length
    validate: (s: PropertyDefinitionSupportedPasswordType) => {
      if (typeof s !== "string") {
        return PropertyInvalidReason.UNSPECIFIED;
      } else if (s.length > MAX_STRING_LENGTH) {
        return PropertyInvalidReason.TOO_LARGE;
      }

      return null;
    },
    searchable: false,
    supportsIcons: false,
    // i18n attributes required
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      tooLargeErrorInclude: true,
    },
  },
  text: {
    gql: "String",
    nullableDefault: "",
    supportedSubtypes: ["html"],
    // validates the text, texts don't support json value
    validate: (s: PropertyDefinitionSupportedTextType, subtype?: string) => {
      if (typeof s !== "string") {
        return PropertyInvalidReason.UNSPECIFIED;

      // NOTE how the html text lengh is not checked, even when it is possible
      } else if (s.length > MAX_RAW_TEXT_LENGTH) {
        return PropertyInvalidReason.TOO_LARGE;
      }

      return null;
    },
    // the max length for the text
    // whether it is searchable or not
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.FTS,
    supportsIcons: true,
    allowsMinMaxLengthDefined: true,
    // i18n attributes
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      tooLargeErrorInclude: true,
    },
  },
  year: {
    gql: "Float",
    // years can be set as a number
    json: "number",
    // validates
    validate: (n: PropertyDefinitionSupportedYearType) => {
      if (isNaN(n)) {
        return PropertyInvalidReason.UNSPECIFIED;
      } else if (!Number.isInteger(n)) {
        return PropertyInvalidReason.UNSPECIFIED;
      } else if (n > MAX_SUPPORTED_YEAR) {
        return PropertyInvalidReason.TOO_LARGE;
      } else if (n > MIN_SUPPORTED_YEAR) {
        return PropertyInvalidReason.TOO_SMALL;
      }

      return null;
    },
    // searchable attributes and supports range
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    supportsIcons: true,
    allowsMinMaxDefined: true,
    // i18n data
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      searchRange: CLASSIC_SEARCH_RANGED_I18N,
      searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    },
  },
  date: {
    gql: "String",
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    supportsIcons: false,
    validate: (d: PropertyDefinitionSupportedDateType) => {
      if (
        d === "Invalid Date" ||
        (new Date(d)).toJSON() === "Invalid Date"
      ) {
        return PropertyInvalidReason.INVALID_DATETIME;
      }
      return null;
    },
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      searchRange: CLASSIC_SEARCH_RANGED_I18N,
      searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    },
  },
  datetime: {
    gql: "String",
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    supportsIcons: false,
    validate: (d: PropertyDefinitionSupportedDateType) => {
      if (
        d === "Invalid Date" ||
        (new Date(d)).toJSON() === "Invalid Date"
      ) {
        return PropertyInvalidReason.INVALID_DATETIME;
      }
      return null;
    },
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      searchRange: CLASSIC_SEARCH_RANGED_I18N,
      searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    },
  },
  time: {
    gql: "String",
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    supportsIcons: false,
    validate: (d: PropertyDefinitionSupportedDateType) => {
      if (
        d === "Invalid Date" ||
        (new Date(d)).toJSON() === "Invalid Date"
      ) {
        return PropertyInvalidReason.INVALID_DATETIME;
      }
      return null;
    },
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      searchRange: CLASSIC_SEARCH_RANGED_I18N,
      searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    },
  },

  location: {
    gql: "__PropertyType__Location",
    gqlDef: {
      lng: "Float!",
      lat: "Float!",
      txt: "String!",
      atxt: "String",
    },
    // locations just contain this basic data
    validate: (l: IPropertyDefinitionSupportedLocationType) => {
      if (
        typeof l.lat !== "number" ||
        typeof l.lng !== "number" ||
        typeof l.txt !== "string" ||
        (typeof l.atxt !== "string" && l.atxt !== null)
      ) {
        return PropertyInvalidReason.UNSPECIFIED;
      }

      return null;
    },
    // they are searchable
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE,
    supportsIcons: false,
    // i18n with the distance attributes
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: LOCATION_SEARCH_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    },
  },
  files: {
    gql: "[String!]",
    searchable: false,
    supportsIcons: true,
    specialProperties: [
      {
        name: "accept",
        type: "string",
      },
    ],
    allowsMinMaxLengthDefined: true,
    validate: (l: PropertyDefinitionSupportedFilesType) => {
      if (!Array.isArray(l) || l.some((v) => typeof v !== "string")) {
        return PropertyInvalidReason.UNSPECIFIED;
      }

      if (l.length > MAX_FILE_BATCH_COUNT) {
        return PropertyInvalidReason.TOO_LARGE;
      }

      if (l.toString().indexOf("blob:") === 0) {
        return null;
      }

      if (l.toString().indexOf("/files/") === 0) {
        return null;
      }

      return PropertyInvalidReason.UNSPECIFIED;
    },
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
    },
  },
};

Object.keys(PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD).forEach((propDefKey) => {
  const propDef: IPropertyDefinitionSupportedType =
    PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD[propDefKey];
  if (!propDef.searchable &&
    (propDef.i18n.searchBase || propDef.i18n.searchOptional ||
    propDef.i18n.searchRange || propDef.i18n.searchRangeOptional)) {
      throw new Error("Invalid propdef with search data for non-searchable > " +
        propDefKey);
  } else if (propDef.searchable) {
    if (!propDef.i18n.searchBase || !propDef.i18n.searchOptional) {
      throw new Error("Invalid propdef lacking search data while searchable > " +
        propDefKey);
    } else if (propDef.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
      (!propDef.i18n.searchRange || !propDef.i18n.searchRangeOptional)) {
      throw new Error("Invalid propdef lacking ranged search " +
        "data while ranged searchable > " + propDefKey);
    }
  }
});

export type PropertyDefinitionSupportedBooleanType = boolean;
export type PropertyDefinitionSupportedIntegerType = number;
export type PropertyDefinitionSupportedNumberType = number;
export interface IPropertyDefinitionSupportedCurrencyType {
  value: number;
  currency: string;
}
export interface IPropertyDefinitionSupportedUnitType {
  value: number;
  unit: string;
  normalizedValue: number;
  normalizedUnit: string;
}
export type PropertyDefinitionSupportedStringType = string;
export type PropertyDefinitionSupportedPasswordType = string;
export type PropertyDefinitionSupportedTextType = string;
export type PropertyDefinitionSupportedYearType = number;
export type PropertyDefinitionSupportedDateType = string;
export type PropertyDefinitionSupportedDateTimeType = string;
export type PropertyDefinitionSupportedTimeType = string;
export interface IPropertyDefinitionSupportedLocationType {
  lng: number;
  lat: number;
  txt: string;
  atxt: string;
}
export type PropertyDefinitionSupportedFilesType = string[];

export type PropertyDefinitionSupportedType =
  PropertyDefinitionSupportedBooleanType |
  PropertyDefinitionSupportedIntegerType |
  PropertyDefinitionSupportedNumberType |
  IPropertyDefinitionSupportedCurrencyType |
  IPropertyDefinitionSupportedUnitType |
  PropertyDefinitionSupportedStringType |
  PropertyDefinitionSupportedPasswordType |
  PropertyDefinitionSupportedTextType |
  PropertyDefinitionSupportedDateType |
  PropertyDefinitionSupportedDateTimeType |
  PropertyDefinitionSupportedTimeType |
  IPropertyDefinitionSupportedLocationType |
  PropertyDefinitionSupportedFilesType;

export interface IPropertyDefinitionRawJSONRuleDataType {
  value: PropertyDefinitionSupportedType;
  if: IConditionalRuleSetRawJSONDataType;
}

export interface IPropertyDefinitionRawJSONInvalidRuleDataType {
  error: string;
  if: IConditionalRuleSetRawJSONDataType;
}

export type PropertyDefinitionSearchLevelsType =
  // Will always display a search field, but it might be skipped
  // this is the default
  "always" |
  // Will display a smaller search field and make it clearly optional
  "moderate" |
  // Will actually make it so that you need to press a button to see
  // all search options
  "rare" |
  // Makes the field hidden but remains there and is present at value
  // can be set programatically because is hidden
  "hidden" |
  // Does not display any search field at all and doesn't expect it
  "disabled";

export type PropertyDefinitionRarityLevelsType =
  "standard" | "moderate" | "rare";

export interface IPropertyDefinitionRawJSONDataType {
  // the property identifier
  id: string;
  // the locale data, we don't know what it is
  // the structure is defined in the constants
  i18nData?: {
    [locale: string]: any,
  };
  rarity?: PropertyDefinitionRarityLevelsType;
  // the type of the property
  type: PropertyDefinitionSupportedTypeName;
  subtype?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  maxDecimalCount?: number;
  minDecimalCount?: number;

  // values for the property set
  values?: PropertyDefinitionSupportedType[];
  // whether it can be null or not
  nullable?: boolean;
  // Makes the value be null if hidden
  // doe not perform checks so it makes it valid
  nullIfHidden?: boolean;
  // Makes the field hidden if value is enforced
  hiddenIfEnforced?: boolean;
  // hidden does not show at all
  hidden?: boolean;
  // autocomplete is an endpoint of some sort that requests
  // data for autocomplete
  autocomplete?: string;
  // uses a property attribute
  autocompleteSetFromProperty?: string[];
  // whether it's enforced or not
  autocompleteIsEnforced?: boolean;
  // whether the autocomplete supports prefills
  autocompleteSupportsPrefills?: boolean;
  // whether the autocomplete supports locale
  autocompleteSupportsLocale?: boolean;
  // html style autocomplete
  htmlAutocomplete?: string;
  // default value
  default?: PropertyDefinitionSupportedType;
  defaultIf?: IPropertyDefinitionRawJSONRuleDataType[];
  // invalid value
  invalidIf?: IPropertyDefinitionRawJSONInvalidRuleDataType[];
  // enforced values
  enforcedValues?: IPropertyDefinitionRawJSONRuleDataType[];
  enforcedValue?: PropertyDefinitionSupportedType;
  // hidden if conditional
  hiddenIf?: IConditionalRuleSetRawJSONDataType;
  // search level
  searchLevel?: PropertyDefinitionSearchLevelsType;
  // disable ranged search
  disableRangedSearch?: boolean;
  // disable retrieval, property value is never retrieved
  // it can only be set or updated
  disableRetrieval?: boolean;
  // Special properties
  specialProperties: {
    [key: string]: string | boolean | number;
  };

  // some design elements
  icon?: string;
}

export interface IPropertyDefinitionRuleDataType {
  value: PropertyDefinitionSupportedType;
  if: ConditionalRuleSet;
}

export interface IPropertyDefinitionInvalidRuleDataType {
  error: string;
  if: ConditionalRuleSet;
}

export interface IPropertyDefinitionValue {
  userSet: boolean;
  default: boolean;
  enforced: boolean;
  hidden: boolean;
  valid: boolean;
  invalidReason: PropertyInvalidReason | string;
  value: PropertyDefinitionSupportedType;
  internalValue: any;
  stateValue: any;
  stateValueModified: boolean;
  propertyId: string;
}

// OTHER EXPORTS

export interface IPropertyDefinitionAlternativePropertyType {
  property: string;
}

// The class itself
export default class PropertyDefinition {
  /**
   * Schema only available in development
   */
  public static currencyData: null;
  public static schema: any;
  public static supportedTypesStandard =
    PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD;

  /**
   * Checks whether a value is valid or not using
   * the raw data, NOTE!!!! this function is context unaware
   * and hence it cannot execute invalidIf conditional rule
   * set rules
   *
   * @param propertyDefinitionRaw The raw json property definition data
   * @param value the value to check against
   * @param checkAgainstValues if to check against its own values
   * some properties are enums, and this checks whether to check against
   * these enums, but you mighst not want to do that if checking that the
   * enums itself are valid
   */
  public static isValidValue(
    propertyDefinitionRaw: IPropertyDefinitionRawJSONDataType,
    value: PropertyDefinitionSupportedType,
    checkAgainstValues: boolean,
  ): PropertyInvalidReason {
    // Check for nulls
    if (propertyDefinitionRaw.nullable && value === null) {
      return null;
    } else if (!propertyDefinitionRaw.nullable && value === null) {
      return PropertyInvalidReason.NOT_NULLABLE;
    }
    // Check against the values if allowed
    if (propertyDefinitionRaw.values &&
      checkAgainstValues &&
      !propertyDefinitionRaw.values.includes(value)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }
    // we get the definition and run basic checks
    const definition = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD
      [propertyDefinitionRaw.type];
    // These basic checks are the most important
    if (definition.json && typeof value !== definition.json) {
      return PropertyInvalidReason.UNSPECIFIED;
    }
    if (definition.validate) {
      const invalidReason = definition.validate(
        value,
        propertyDefinitionRaw.subtype,
      );
      if (invalidReason) {
        return invalidReason;
      }
    }

    // Do the fancy checks
    if (typeof propertyDefinitionRaw.min !== "undefined" &&
      ((value as IPropertyDefinitionSupportedCurrencyType).value ||
        value) < propertyDefinitionRaw.min) {
      return PropertyInvalidReason.TOO_SMALL;
    } else if (typeof propertyDefinitionRaw.max !== "undefined" &&
      ((value as IPropertyDefinitionSupportedCurrencyType).value ||
        value) > propertyDefinitionRaw.max) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (typeof propertyDefinitionRaw.minLength !== "undefined" &&
      (value as string).length < propertyDefinitionRaw.minLength) {
      return PropertyInvalidReason.TOO_SMALL;
    } else if (typeof propertyDefinitionRaw.maxDecimalCount !== "undefined" ||
      typeof propertyDefinitionRaw.minDecimalCount !== "undefined") {
      const splittedDecimals =
        ((value as IPropertyDefinitionSupportedCurrencyType).value || value)
        .toString().split(".");
      if (
        typeof propertyDefinitionRaw.maxDecimalCount !== "undefined" && splittedDecimals[1] &&
        splittedDecimals[1].length > propertyDefinitionRaw.maxDecimalCount
      ) {
        return PropertyInvalidReason.TOO_MANY_DECIMALS;
      } else if (
        typeof propertyDefinitionRaw.minDecimalCount !== "undefined" &&
        (splittedDecimals[1] || "").length < propertyDefinitionRaw.minDecimalCount
      ) {
        return PropertyInvalidReason.TOO_FEW_DECIMALS;
      }
    }

    // Special length check
    if (
      typeof propertyDefinitionRaw.maxLength !== "undefined" ||
      typeof propertyDefinitionRaw.minLength !== "undefined"
    ) {
      let count: number;
      const isRichText = propertyDefinitionRaw.type === "text" && propertyDefinitionRaw.subtype === "html";
      if (Array.isArray(value)) {
        count = value.length;
      } else if (!isRichText) {
        count = value.toString().length;
      } else if (isRichText && fastHTMLParser.parse) {
        const dummyElement = fastHTMLParser.parse(value.toString());
        count = dummyElement.text.length;
        if (dummyElement.querySelector(".ql-cursor")) {
          count--;
        }
      } else if (isRichText) {
        const dummyElement = document.createElement("div");
        dummyElement.innerHTML = value.toString();
        count = dummyElement.innerText.length;
        if (dummyElement.querySelector(".ql-cursor")) {
          count--;
        }
      }

      if (
        typeof propertyDefinitionRaw.maxLength !== "undefined" &&
        count > propertyDefinitionRaw.maxLength
      ) {
        return PropertyInvalidReason.TOO_LARGE;
      } else if (
        typeof propertyDefinitionRaw.minLength !== "undefined" &&
        count < propertyDefinitionRaw.minLength
      ) {
        return PropertyInvalidReason.TOO_SMALL;
      }
    }

    return null;
  }

  public rawData: IPropertyDefinitionRawJSONDataType;
  private parentModule: Module;
  private parentItemDefinition: ItemDefinition;
  private isExtension: boolean;

  private defaultIf?: IPropertyDefinitionRuleDataType[];
  private invalidIf?: IPropertyDefinitionInvalidRuleDataType[];
  private enforcedValues?: IPropertyDefinitionRuleDataType[];
  private hiddenIf?: ConditionalRuleSet;

  private superEnforcedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;
  private superDefaultedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;

  // representing the state of the class
  private onStateChangeListeners: OnStateChangeListenerType[];
  private stateValue: PropertyDefinitionSupportedType;
  private stateValueModified: boolean;
  private stateinternalValue: any;

  /**
   * Builds a property definition
   * @param rawJSON the raw json structure
   * @param parentItemDefinition the parent item definition
   */
  constructor(
    rawJSON: IPropertyDefinitionRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    isExtension: boolean,
  ) {
    this.rawData = rawJSON;
    this.parentModule = parentModule;
    this.parentItemDefinition = parentItemDefinition;
    this.isExtension = isExtension;

    // set the default value
    this.defaultIf = rawJSON.defaultIf && rawJSON.defaultIf.map((dif) => ({
      value: dif.value,
      if: new ConditionalRuleSet(dif.if, parentModule, parentItemDefinition, this, null),
    }));

    // create the invalid rules
    this.invalidIf = rawJSON.invalidIf && rawJSON.invalidIf.map((ii) => ({
      error: ii.error,
      if: new ConditionalRuleSet(ii.if, parentModule, parentItemDefinition, this, null),
    }));

    // set the enforced values from the conditional rule set
    this.enforcedValues = rawJSON.enforcedValues &&
      rawJSON.enforcedValues.map((ev) => ({
        value: ev.value,
        if: new ConditionalRuleSet(ev.if, parentModule,
          parentItemDefinition, this, null),
      }));

    // set the hidden if rule
    this.hiddenIf = rawJSON.hiddenIf &&
      new ConditionalRuleSet(rawJSON.hiddenIf, parentModule,
        parentItemDefinition, this, null);

    // STATE MANAGEMENT
    this.onStateChangeListeners = [];
    // initial value for all namespaces is null
    this.stateValue = null;
    this.stateValueModified = false;
    this.stateinternalValue = null;
  }

  public getEnforcedValue(): {
    enforced: boolean;
    value?: PropertyDefinitionSupportedType;
  } {
    if (
      typeof this.superEnforcedValue !== "undefined" ||
      this.enforcedValues ||
      typeof this.rawData.enforcedValue !== "undefined"
    ) {

      // let's check if one matches the current situation
      // we first pick the superEnforcedValue or otherwise the enforcedValue
      // or otherwise the first enforcedValue that evaluates to true
      const enforcedValue = typeof this.superEnforcedValue !== "undefined" ?
        // superenforced might be a property definition so we got to
        // extract the value in such case
        (this.superEnforcedValue instanceof PropertyDefinition ?
          this.superEnforcedValue.getCurrentValueClean() :
          this.superEnforcedValue) :

        // otherwise in other cases we check the enforced value
        // which has priority
        (typeof this.rawData.enforcedValue !== "undefined" ?
          this.rawData.enforcedValue :
          // otherwise we go to for evaluating the enforced values
          // or give undefined if nothing is found
          (this.enforcedValues.find((ev) => {
            return ev.if.evaluate();
          }) || {value: undefined}).value);

      // if we get one
      if (typeof enforcedValue !== "undefined") {
        // we return the value that was set to be
        return {
          enforced: true,
          value: enforcedValue,
        };
      }
    }

    return {
      enforced: false,
    };
  }

  /**
   * checks if it's currently hidden (not phantom)
   * @returns a boolean
   */
  public isCurrentlyHidden() {
    return this.rawData.hidden ||
      (this.rawData.hiddenIfEnforced ? this.getEnforcedValue().enforced : false) ||
      (this.hiddenIf && this.hiddenIf.evaluate()) || false;
  }

  /**
   * gives the id of this property defintion
   * @returns the id
   */
  public getId() {
    return this.rawData.id;
  }

  /**
   * gives the type of this property defintion
   * @returns the type
   */
  public getType() {
    return this.rawData.type;
  }

  public getCurrentValueClean(): PropertyDefinitionSupportedType {
    const possibleEnforcedValue = this.getEnforcedValue();

    if (possibleEnforcedValue.enforced) {
      return possibleEnforcedValue.value;
    }

    if (this.rawData.nullIfHidden && this.isCurrentlyHidden()) {
      return null;
    }

    if (!this.stateValueModified) {
      // lets find the default value, first the super default
      // and we of course extract it in case of property definition
      // or otherwise use the default, which might be undefined
      let defaultValue = typeof this.superDefaultedValue !== "undefined" ?
        (this.superDefaultedValue instanceof PropertyDefinition ?
          this.superDefaultedValue.getCurrentValueClean() :
          this.superDefaultedValue) : this.rawData.default;

      // Also by condition
      if (this.defaultIf && typeof this.superDefaultedValue === "undefined") {
        // find a rule that passes
        const rulePasses = this.defaultIf.find((difRule) => difRule.if.evaluate());
        if (rulePasses) {
          // and set the default value to such
          defaultValue = rulePasses.value;
        }
      }

      return defaultValue || null;
    }

    return this.stateValue;
  }

  /**
   * provides the current useful value for the property defintion
   * @returns a bunch of information about the current value
   */
  public getCurrentValue(): IPropertyDefinitionValue {

    const possibleEnforcedValue = this.getEnforcedValue();

    if (possibleEnforcedValue.enforced) {
      const possibleInvalidEnforcedReason = this.isValidValue(possibleEnforcedValue.value);
      // we return the value that was set to be
      return {
        userSet: false,
        enforced: true,
        default: false,
        valid: !possibleInvalidEnforcedReason,
        invalidReason: possibleInvalidEnforcedReason,
        value: possibleEnforcedValue.value,
        hidden: this.rawData.hiddenIfEnforced ? true : this.isCurrentlyHidden(),
        internalValue: null,
        stateValue: this.stateValue,
        stateValueModified: this.stateValueModified,
        propertyId: this.getId(),
      };
    }

    // make if hidden if null if hidden is set to true
    // note nulls set this way are always valid
    if (this.rawData.nullIfHidden && this.isCurrentlyHidden()) {
      return {
        userSet: false,
        enforced: true,
        default: false,
        valid: true,
        invalidReason: null,
        value: null,
        hidden: true,
        internalValue: null,
        stateValue: this.stateValue,
        stateValueModified: this.stateValueModified,
        propertyId: this.getId(),
      };
    }

    const value = this.getCurrentValueClean();
    const invalidReason = this.isValidValue(value);
    return {
      userSet: this.stateValueModified,
      enforced: false,
      default: !this.stateValueModified,
      valid: !invalidReason,
      invalidReason,
      value,
      hidden: this.isCurrentlyHidden(),
      internalValue: this.stateValueModified ? this.stateinternalValue : null,
      stateValue: this.stateValue,
      stateValueModified: this.stateValueModified,
      propertyId: this.getId(),
    };
  }

  /**
   * Sets a super enforced value that superseeds any enforced value or
   * values and makes the field enforced, the value might
   * be another property definition to extract the value from
   * @throws an error if the value is invalid
   * @param value the value to enforce it can be a property
   */
  public setSuperEnforced(
    value: PropertyDefinitionSupportedType | PropertyDefinition,
  ) {
    // let's get the definition
    const definition = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD
      [this.rawData.type];
    // find whether there is a nullable value and if it matches
    const actualValue = definition.nullableDefault === value ?
      null : value;

    if (actualValue !== null && !(actualValue instanceof PropertyDefinition)) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (definition.json && typeof actualValue !== definition.json) {
        throw new Error("Invalid super enforced " + JSON.stringify(actualValue));
      }
    }

    this.superEnforcedValue = actualValue;
  }

  /**
   * Sets a super default value that superseeds any default value or
   * values, the value might be another property definition to extract
   * the value from
   * @param value the value to default to it can be a property
   */
  public setSuperDefault(
    value: PropertyDefinitionSupportedType | PropertyDefinition,
  ) {
    // let's get the definition
    const definition = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD
      [this.rawData.type];
    // find whether there is a nullable value and if it matches
    const actualValue = definition.nullableDefault === value ?
      null : value;

    if (actualValue !== null && !(actualValue instanceof PropertyDefinition)) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (definition.json && typeof actualValue !== definition.json) {
        throw new Error("Invalid super default " + JSON.stringify(actualValue));
      }
    }

    this.superDefaultedValue = actualValue;
  }

  /**
   * Sets the current value for the item, null is a valid value
   * Specially if the item is nullable
   *
   * The resulting value set might not be the same, if the item
   * has a default null value, that is, if the value is set to that
   * value it will be converted to null
   *
   * @throws an error if the value is invalid by definition
   * @param  newValue the new value
   */
  public setCurrentValue(
    newValue: PropertyDefinitionSupportedType,
    internalValue: any,
  ) {
    // let's get the definition
    const definition = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD
      [this.rawData.type];
    // find whether there is a nullable value and if it matches
    const newActualValue = definition.nullableDefault === newValue ?
      null : newValue;

    if (newActualValue !== null) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (definition.json && typeof newActualValue !== definition.json) {
        throw new Error("Invalid value " + JSON.stringify(newActualValue));
      }
    }

    // note that the value is set and never check
    this.stateValue = newActualValue;
    this.stateValueModified = true;
    this.stateinternalValue = internalValue;
    this.onStateChangeListeners.forEach((l) => l());
  }

  public applyValue(
    value: IPropertyDefinitionValue,
  ) {
    this.stateValue = value.stateValue;
    this.stateValueModified = value.stateValueModified;
    this.stateinternalValue = value.internalValue;
  }

  /**
   * Externally checks a valid value for this input using all
   * its guns, this function is context aware
   *
   * @param value the value to check
   * @return the invalid reason as a string
   */
  public isValidValue(value: PropertyDefinitionSupportedType): PropertyInvalidReason | string {
    if (this.invalidIf) {
      const invalidMatch = this.invalidIf.find((ii) => ii.if.evaluate());
      if (invalidMatch) {
        return invalidMatch.error;
      }
    }
    return PropertyDefinition.isValidValue(
      this.rawData,
      value,
      true,
    );
  }

  /**
   * Uses the raw data to instantiate a new instance of
   * the item definition, uses the same on state change
   * function for state changes so it remains linked to the
   * module
   */
  public getNewInstance() {
    return new PropertyDefinition(this.rawData, this.parentModule,
      this.parentItemDefinition, this.isExtension);
  }

  /**
   * Provides the property definition description from the
   * supported standards
   */
  public getPropertyDefinitionDescription() {
    return PropertyDefinition.supportedTypesStandard[this.getType()];
  }

  public isNullable() {
    return this.rawData.nullable;
  }

  public isHidden() {
    return this.rawData.hidden;
  }

  public getRarity() {
    return this.rawData.rarity || "standard";
  }

  public isRetrievalDisabled() {
    return this.rawData.disableRetrieval || false;
  }

  public isRangedSearchDisabled() {
    return this.rawData.disableRangedSearch || false;
  }

  public getSearchLevel(): PropertyDefinitionSearchLevelsType {
    return this.rawData.searchLevel || "always";
  }

  public hasSpecificValidValues() {
    return !!this.rawData.values;
  }

  public getSpecificValidValues() {
    return this.rawData.values;
  }

  public hasAutocomplete() {
    return !!this.rawData.autocomplete;
  }

  public isAutocompleteEnforced() {
    return !!this.rawData.autocompleteIsEnforced;
  }

  public isAutocompleteLocalized() {
    return !!this.rawData.autocompleteSupportsLocale;
  }

  public getHTMLAutocomplete() {
    return this.rawData.htmlAutocomplete || null;
  }

  public getSubtype() {
    return this.rawData.subtype || null;
  }

  public isRichText() {
    return this.rawData.type === "text" && this.rawData.subtype === "html";
  }

  public getMaxLength() {
    return typeof this.rawData.maxLength !== "undefined" ?
      this.rawData.maxLength : null;
  }

  public getMinLength() {
    return typeof this.rawData.minLength !== "undefined" ?
      this.rawData.minLength : null;
  }

  public getMaxDecimalCount() {
    // currency max decimal count is variable, we don't know
    if (this.getType() === "currency") {
      return null;
    }
    return this.rawData.maxDecimalCount || null;
  }

  public getMinDecimalCount() {
    if (this.getType() === "currency") {
      return null;
    }
    return this.rawData.minDecimalCount || 0;
  }

  public getSpecialProperty(name: string) {
    if (!this.rawData.specialProperties) {
      return null;
    }

    return typeof this.rawData.specialProperties[name] !== "undefined" ? this.rawData.specialProperties[name] : null;
  }

  public getIcon() {
    return this.rawData.icon || null;
  }

  /**
   * Just gives the parent module
   */
  public getParentModule() {
    return this.parentModule;
  }

  /**
   * Just gives the parent item definition
   */
  public getParentItemDefinition() {
    return this.parentItemDefinition;
  }

  /**
   * Tells if the property is an extension
   * from the propext list, they usually have priority
   * @return a boolean
   */
  public checkIfIsExtension(): boolean {
    return this.isExtension;
  }

  /**
   * Returns the locale data definition, or null
   * @param  locale the locale
   * @returns the locale data
   */
  public getI18nDataFor(locale: string): any {
    if (!this.rawData.i18nData) {
      return null;
    }
    return this.rawData.i18nData[locale] || null;
  }

  public addOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.onStateChangeListeners.push(listener);
  }

  public removeOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    const index = this.onStateChangeListeners.indexOf(listener);
    if (index !== -1) {
      this.onStateChangeListeners.splice(index, 1);
    }
  }

  public toJSON() {
    return this.rawData;
  }
}

// We set the value of those if non in production
// These are very useful debugging utilities
if (process.env.NODE_ENV !== "production") {

  const searchLevels = ["always", "moderate", "rare", "hidden", "disabled"];
  const rarityLevels = ["standard", "moderate", "rare"];

  // The schema for the definition
  // {
  //   "amount": 4,
  //   "type": "car"
  // },
  // properties can be any string
  // the values must be boolean string or number
  // we should have at least one
  PropertyDefinition.schema = {
    $id: "PropertyDefinition",
    type: "object",
    properties: {
      id: {
        type: "string",
        pattern: "^[a-z_]+$",
      },
      i18nData: {
        type: "object",
      },
      type:  {
        type: "string",
      },
      subtype:  {
        type: "string",
      },
      rarity: {
        type: "string",
        enum: rarityLevels,
      },
      min: {
        type: "number",
      },
      max: {
        type: "number",
      },
      maxLength: {
        type: "number",
        minimum: 0,
      },
      minLength: {
        type: "number",
        minimum: 0,
      },
      maxDecimalCount: {
        type: "number",
        minimum: 0,
      },
      values: {
        type: "array",
        items: {},
      },
      nullable: {
        type: "boolean",
      },
      autocomplete: {
        type: "string",
      },
      autocompleteSetFromProperty: {
        type: "array",
        items: {
          type: "string",
        },
      },
      autocompleteIsEnforced: {
        type: "boolean",
      },
      autocompleteSupportsPrefills: {
        type: "boolean",
      },
      autocompleteSupportsLocale: {
        type: "boolean",
      },
      htmlAutocomplete: {
        type: "string",
      },
      default: {},
      defaultIf: {
        type: "array",
        items: {
          type: "object",
          properties: {
            if: {
              $ref: ConditionalRuleSet.schema.$id,
            },
            value: {},
          },
          additionalProperties: false,
          required: ["value", "if"],
        },
        minItems: 1,
      },
      invalidIf: {
        type: "array",
        items: {
          type: "object",
          properties: {
            if: {
              $ref: ConditionalRuleSet.schema.$id,
            },
            error: {
              type: "string",
              pattern: "^[A-Z_]+$",
            },
          },
          additionalProperties: false,
          required: ["error", "if"],
        },
        minItems: 1,
      },
      enforcedValues: {
        type: "array",
        items: {
          type: "object",
          properties: {
            if: {
              $ref: ConditionalRuleSet.schema.$id,
            },
            value: {},
          },
          additionalProperties: false,
          required: ["value", "if"],
        },
        minItems: 1,
      },
      nullIfHidden: {
        type: "boolean",
      },
      hiddenIfEnforced: {
        type: "boolean",
      },
      enforcedValue: {},
      hidden: {
        type: "boolean",
      },
      hiddenIf: {
        $ref: ConditionalRuleSet.schema.$id,
      },
      searchLevel: {
        type: "string",
        enum: searchLevels,
      },
      disableRangedSearch: {
        type: "boolean",
      },
      disableRetrieval: {
        type: "boolean",
      },
      icon: {
        type: "string",
      },
      richText: {
        type: "boolean",
      },
      specialProperties: {
        type: "object",
        properties: {},
        additionalProperties: true,
      },
    },
    additionalProperties: false,
    definitions: {
      ConditionalRuleSet: ConditionalRuleSet.schema,
    },
    dependencies: {
      autocompleteSetFromProperty: ["autocomplete"],
      autocompleteIsEnforced: ["autocomplete"],
      autocompleteSupportsPrefills: ["autocomplete"],
      autocompleteSupportsLocale: ["autocomplete", "autocompleteIsEnforced"],
    },
    required: ["id", "type"],
  };
}
