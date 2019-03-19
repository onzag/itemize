import ItemDefinition from ".";
import ConditionalRuleSet,
  { IConditionalRuleSetRawJSONDataType } from "./ConditionalRuleSet";
import { MIN_SUPPORTED_INTEGER, MAX_SUPPORTED_INTEGER,
  MAX_SUPPORTED_REAL, MAX_DECIMAL_COUNT,
  MAX_STRING_LENGTH,
  MAX_TEXT_LENGTH,
  REDUCED_BASE_I18N,
  CLASSIC_OPTIONAL_I18N,
  CLASSIC_BASE_I18N,
  CLASSIC_SEARCH_RANGED_I18N,
  CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
  CLASSIC_SEARCH_BASE_I18N,
  CLASSIC_SEARCH_OPTIONAL_I18N,
  CLASSIC_DISTANCE_I18N,
  MIN_SUPPORTED_REAL,
  MAX_SUPPORTED_YEAR,
  MIN_SUPPORTED_YEAR,
  MAX_CURRENCY_DECIMAL_COUNT} from "../../constants";
import Module, { OnStateChangeListenerType } from "../Module";

// All the supported property types
export type PropertyDefinitionSupportedTypes =
  "boolean" |         // A simple boolean, comparable, and stored as a boolean
  "integer" |         // A simple number, comparable, and stored as a number
  "number" |          // A simple number, comparable, and stored as a number
  "currency" |        // Currency, comparable and stored as an object
  "string" |          // A simple string, comparable, and stored as a string
  "password" |        // A password, stored as a hash, ensure to disable retrieval
  "text" |            // Represented as an object, non comparable,
                      // stored as text and object and it should be able to do
                      // full text search, it's an object due to image support
                      // images are stored separatedly which includes where in
                      // the text location they are.
  "year" |            // Represented as a number, comparable, stored as number
  "date" |            // Represented as a number, comparable, stored as a date
  "datetime" |        // Represented as a number, comparable, stored as a date
  "location" |        // Represented as an object, non comparable, stored
                      // as two values
  "images" |          // Represented as a list of local urls, non comparable,
                      // stored as a list of urls, a main image is allowed
  "files";            // Represented as a list of local urls, non comparable,
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

  // graphql type as a string
  gql: string;
  gqlDef?: {[key: string]: string};

  // represents an item that would mark for null
  // by default it is null itself
  nullableDefault?: any;
  rangeDefaultSearch?: boolean;

  // this is a validation function that checks whether the value
  // is valid,
  validate?: (value: PropertyDefinitionSupportedType) => any;
  // max valid, for numbers
  max?: number;
  // min valid for numbers
  min?: number;
  // max length for text and string and whatnot
  maxLength?: number;
  // max decimal count
  maxDecimalCount?: number;
  // whether it is searchable or not
  searchable: boolean;
  // the search interface used
  searchInterface?: PropertyDefinitionSearchInterfacesType;
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
    // location type for search interface specific attributes
    // not used if the searchInterface is not LOCATION_DISTANCE
    distance?: string[],
    // not requested if the searchLevel is disabled
    searchBase?: string[],
    searchOptional?: string[],
  };
}

// So this is how properties are defined to give an overview on
// how they are supposed to be managed
export type PropertyDefinitionSupportedTypesStandardType =
Record<PropertyDefinitionSupportedTypes, IPropertyDefinitionSupportedType>;

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
    i18n: {
      base: REDUCED_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    },
  },
  integer: {
    // an integer is represented as a number
    json: "number",
    gql: "Int",
    // it gotta be validated to check it's a number
    validate: (n: PropertyDefinitionSupportedIntegerType) =>
      !isNaN(NaN) && parseInt(n as any, 10) === n &&
      n <= MAX_SUPPORTED_INTEGER && n >= MIN_SUPPORTED_INTEGER,
    // max and min
    max: MAX_SUPPORTED_INTEGER,
    min: -MIN_SUPPORTED_INTEGER,
    // it is searchable by exact and range value
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    // i18n attributes
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      searchRange: CLASSIC_SEARCH_RANGED_I18N,
      searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    },
  },
  number: {
    // a number is just a number can be integer or decimal
    json: "number",
    gql: "Float",
    // the validator
    validate: (n: PropertyDefinitionSupportedNumberType) => {
      if (isNaN(n)) {
        return false;
      }

      if (n > MAX_SUPPORTED_REAL || n < MIN_SUPPORTED_REAL) {
        return false;
      }

      const splittedDecimals = n.toString().split(".");
      if (!splittedDecimals[1] ||
          splittedDecimals[1].length <= MAX_DECIMAL_COUNT) {
          return true;
        }

      return false;
    },
    // max and min
    max: MAX_SUPPORTED_REAL,
    min: MIN_SUPPORTED_REAL,
    maxDecimalCount: MAX_DECIMAL_COUNT,
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
      if (typeof l.value !== "number" &&
        typeof l.currency !== "string") {
        return false;
      }

      if (isNaN(l.value)) {
        return false;
      }

      if (l.value <= MAX_SUPPORTED_REAL && l.value >= MIN_SUPPORTED_REAL) {
        return false;
      }

      const splittedDecimals = l.value.toString().split(".");
      if (!splittedDecimals[1] ||
          splittedDecimals[1].length <= MAX_CURRENCY_DECIMAL_COUNT) {
          return true;
        }

      return false;
    },
    rangeDefaultSearch: true,
    // Similar to real
    max: MAX_SUPPORTED_REAL,
    min: MIN_SUPPORTED_REAL,
    maxDecimalCount: MAX_CURRENCY_DECIMAL_COUNT,
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
    },
  },
  string: {
    gql: "Float",
    // a string is a string
    json: "string",
    nullableDefault: "",
    // validates just the length
    validate: (s: PropertyDefinitionSupportedStringType) => s.length <= 255,
    maxLength: MAX_STRING_LENGTH,
    // it is searchable by an exact value, use text for organic things
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
    // i18n attributes required
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    },
  },
  password: {
    gql: "String",
    nullableDefault: "",
    // validates just the length
    validate: (s: PropertyDefinitionSupportedPasswordType) => s.length <= 255,
    maxLength: MAX_STRING_LENGTH,
    searchable: false,
    // i18n attributes required
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
    },
  },
  text: {
    gql: "String",
    nullableDefault: "",
    // validates the text, texts don't support json value
    validate: (s: PropertyDefinitionSupportedTextType) => {
      return typeof s === "string" && s.length < MAX_TEXT_LENGTH;
    },
    // the max length for the html
    maxLength: MAX_TEXT_LENGTH,
    // whether it is searchable or not
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.FTS,
    // i18n attributes
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
    },
  },
  year: {
    gql: "Float",
    // years can be set as a number
    json: "number",
    // validates
    validate: (n: number) => !isNaN(NaN) && parseInt(n as any, 10) === n &&
      n <= MAX_SUPPORTED_YEAR && n >= MIN_SUPPORTED_YEAR,
    // max and min
    max: MAX_SUPPORTED_YEAR,
    min: MIN_SUPPORTED_YEAR,
    // searchable attributes and supports range
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
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
  // TODO
  date: {
    gql: "String",
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    i18n: {
      base: CLASSIC_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      searchRange: CLASSIC_SEARCH_RANGED_I18N,
      searchRangeOptional: CLASSIC_SEARCH_RANGED_OPTIONAL_I18N,
    },
  },
  // TODO
  datetime: {
    gql: "String",
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
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
      txt: "String",
    },
    // locations just contain this basic data
    validate: (l: IPropertyDefinitionSupportedLocationType) => {
      return typeof l.lng === "string" &&
        typeof l.lat === "string" &&
        typeof l.txt === "string";
    },
    // they are searchable
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE,
    // i18n with the distance attributes
    i18n: {
      base: REDUCED_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
      searchBase: CLASSIC_SEARCH_BASE_I18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_I18N,
      distance: CLASSIC_DISTANCE_I18N,
    },
  },
  // TODO
  images: {
    gql: "__PropertyType__Images",
    searchable: false,
    i18n: {
      base: REDUCED_BASE_I18N,
      optional: CLASSIC_OPTIONAL_I18N,
    },
  },
  // TODO
  files: {
    gql: "__PropertyType__Files",
    searchable: false,
    i18n: {
      base: REDUCED_BASE_I18N,
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
    } else if (propDef.searchInterface ===
      PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE &&
      !propDef.i18n.distance) {
      throw new Error("Invalid propdef lacking distance data while location > " +
        propDefKey);
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
export type PropertyDefinitionSupportedStringType = string;
export type PropertyDefinitionSupportedPasswordType = string;
export type PropertyDefinitionSupportedTextType = string;
// TODO
export type PropertyDefinitionSupportedDateType = null;
export type PropertyDefinitionSupportedDateTimeType = null;
export interface IPropertyDefinitionSupportedLocationType {
  lng: string;
  lat: string;
  txt?: string;
}
// TODO
export type PropertyDefinitionSupportedImagesType = null;
export type PropertyDefinitionSupportedFilesType = null;

export type PropertyDefinitionSupportedType =
  PropertyDefinitionSupportedBooleanType |
  PropertyDefinitionSupportedIntegerType |
  PropertyDefinitionSupportedNumberType |
  IPropertyDefinitionSupportedCurrencyType |
  PropertyDefinitionSupportedStringType |
  PropertyDefinitionSupportedPasswordType |
  PropertyDefinitionSupportedTextType |
  PropertyDefinitionSupportedDateType |
  PropertyDefinitionSupportedDateTimeType |
  IPropertyDefinitionSupportedLocationType |
  PropertyDefinitionSupportedImagesType |
  PropertyDefinitionSupportedFilesType;

export interface IPropertyDefinitionRawJSONRuleDataType {
  value: PropertyDefinitionSupportedType;
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
  // Does not display any search field at all
  "disabled";

export interface IPropertyDefinitionRawJSONDataType {
  // the property identifier
  id: string;
  // the locale data, we don't know what it is
  // the structure is defined in the constants
  i18nData?: {
    [locale: string]: any,
  };
  rare?: boolean;
  // the type of the property
  type: PropertyDefinitionSupportedTypes;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  maxDecimalCount?: number;

  // values for the property set
  values?: PropertyDefinitionSupportedType[];
  // whether it can be null or not
  nullable?: boolean;
  // Makes the value be null if hidden
  nullIfHidden?: boolean;
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
  // default value
  default?: PropertyDefinitionSupportedType;
  defaultIf?: IPropertyDefinitionRawJSONRuleDataType[];
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
}

export interface IPropertyDefinitionRuleDataType {
  value: PropertyDefinitionSupportedType;
  if: ConditionalRuleSet;
}

export interface IPropertyValueGetterType {
  userSet: boolean;
  default: boolean;
  enforced: boolean;
  valid: boolean;
  value: PropertyDefinitionSupportedType;
}

// The class itself
export default class PropertyDefinition {
  /**
   * Schema only available in development
   */
  public static schema: any;
  public static supportedTypesStandard =
    PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD;

  /**
   * Checks whether a value is valid or not using
   * the raw data
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
  ): boolean {
    // Check for nulls
    if (propertyDefinitionRaw.nullable && value === null) {
      return true;
    }
    // Check against the values if allowed
    if (propertyDefinitionRaw.values &&
      checkAgainstValues &&
      !propertyDefinitionRaw.values.includes(value)) {
      return false;
    }
    // we get the definition and run basic checks
    const definition = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD
      [propertyDefinitionRaw.type];
    // These basic checks are the most important
    if (definition.json && typeof value !== definition.json) {
      return false;
    }
    if (definition.validate && !definition.validate(value)) {
      return false;
    }

    // Do the fancy checks
    if (typeof propertyDefinitionRaw.min !== "undefined" &&
      ((value as IPropertyDefinitionSupportedCurrencyType).value ||
        value) < propertyDefinitionRaw.min) {
      return false;
    } else if (typeof propertyDefinitionRaw.max !== "undefined" &&
      ((value as IPropertyDefinitionSupportedCurrencyType).value ||
        value) > propertyDefinitionRaw.max) {
      return false;
    } else if (typeof propertyDefinitionRaw.maxLength !== "undefined" &&
      (value as string).length > propertyDefinitionRaw.maxLength) {
      return false;
    } else if (typeof propertyDefinitionRaw.minLength !== "undefined" &&
      (value as string).length < propertyDefinitionRaw.minLength) {
      return false;
    } else if (typeof propertyDefinitionRaw.maxDecimalCount !== "number") {
      const splittedDecimals =
        ((value as IPropertyDefinitionSupportedCurrencyType).value || value)
        .toString().split(".");
      if (splittedDecimals[1] &&
        splittedDecimals[1].length > propertyDefinitionRaw.maxDecimalCount) {
        return false;
      }
    }

    return true;
  }

  public rawData: IPropertyDefinitionRawJSONDataType;
  private defaultIf?: IPropertyDefinitionRuleDataType[];
  private enforcedValues?: IPropertyDefinitionRuleDataType[];
  private hiddenIf?: ConditionalRuleSet;
  private isExtension: boolean;

  private superEnforcedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;
  private superDefaultedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;

  // representing the state of the class
  private onStateChangeListeners: OnStateChangeListenerType[];
  private stateValue: PropertyDefinitionSupportedType;
  private stateValueModified: boolean;

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
    // set the default value
    this.defaultIf = rawJSON.defaultIf && rawJSON.defaultIf.map((dif) => ({
      value: dif.value,
      if: new ConditionalRuleSet(dif.if, parentModule, parentItemDefinition),
    }));

    // set the enforced values from the conditional rule set
    this.enforcedValues = rawJSON.enforcedValues &&
      rawJSON.enforcedValues.map((ev) => ({
        value: ev.value,
        if: new ConditionalRuleSet(ev.if, parentModule, parentItemDefinition),
      }));

    // set the hidden if rule
    this.hiddenIf = rawJSON.hiddenIf &&
      new ConditionalRuleSet(rawJSON.hiddenIf, parentModule, parentItemDefinition);

    this.isExtension = isExtension;

    // STATE MANAGEMENT
    this.onStateChangeListeners = [];
    // initial value for all namespaces is null
    this.stateValue = null;
    this.stateValueModified = false;
  }

  /**
   * checks if it's currently hidden (not phantom)
   * @returns a boolean
   */
  public isCurrentlyHidden() {
    return this.rawData.hidden ||
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
   * provides the current useful value for the property defintion
   * @returns a bunch of information about the current value
   */
  public getCurrentValue(): IPropertyValueGetterType {
    // make if hidden if null if hidden is set to true
    if (this.rawData.nullIfHidden && this.isCurrentlyHidden()) {
      return {
        userSet: false,
        enforced: true,
        default: false,
        valid: true,
        value: null,
      };
    }

    // if there's an enforced value
    if (typeof this.superEnforcedValue !== "undefined" ||
        this.enforcedValues ||
        typeof this.rawData.enforcedValue !== "undefined") {

      // let's check if one matches the current situation
      // we first pick the superEnforcedValue or otherwise the enforcedValue
      // or otherwise the first enforcedValue that evaluates to true
      const enforcedValue = typeof this.superEnforcedValue !== "undefined" ?
        // superenforced might be a property definition so we got to
        // extract the value in such case
        (this.superEnforcedValue instanceof PropertyDefinition ?
          this.superEnforcedValue.getCurrentValue().value :
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
          userSet: false,
          enforced: true,
          default: false,
          valid: this.isValidValue(enforcedValue.value),
          value: enforcedValue.value,
        };
      }
    }

    // if the value hasn't been modified we are to return the defaults
    if (!this.stateValueModified) {
      // lets find the default value, first the super default
      // and we of course extract it in case of property definition
      // or otherwise use the default, which might be undefined
      let defaultValue = typeof this.superDefaultedValue !== "undefined" ?
        (this.superDefaultedValue instanceof PropertyDefinition ?
          this.superDefaultedValue.getCurrentValue().value :
          this.superDefaultedValue) : this.rawData.default;

      // Also by condition
      if (this.defaultIf && typeof defaultValue === "undefined") {
        // find a rule that passes
        const rulePasses = this.defaultIf.find((difRule) => difRule.if.evaluate());
        if (rulePasses) {
          // and set the default value to such
          defaultValue = rulePasses.value;
        }
      }

      // return the default value or null if nothing found
      // the maximum default is null, even if the item is not
      // nullable in which case the item would be considered invalid
      return {
        userSet: false,
        enforced: false,
        default: true,
        valid: this.isValidValue(defaultValue || null),
        value: defaultValue || null,
      };
    }

    return {
      userSet: true,
      enforced: false,
      default: false,
      valid: this.isValidValue(this.stateValue),
      value: this.stateValue,
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
      if (definition.validate && !definition.validate(actualValue)) {
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
        throw new Error("Invalid super enforced " + JSON.stringify(actualValue));
      }
      if (definition.validate && !definition.validate(actualValue)) {
        throw new Error("Invalid super enforced " + JSON.stringify(actualValue));
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
      if (definition.validate && !definition.validate(newActualValue)) {
        throw new Error("Invalid value " + JSON.stringify(newActualValue));
      }
    }

    // if the value differs we set it for the new
    // note that the value is set and never check
    if (newActualValue !== this.stateValue) {
      this.stateValue = newActualValue;
      this.stateValueModified = true;
      this.onStateChangeListeners.forEach((l) => l());
    }
  }

  /**
   * Externally checks a valid value for this input using all
   * its guns
   * @param value the value to check
   * @return a boolean
   */
  public isValidValue(value: PropertyDefinitionSupportedType): boolean {
    return PropertyDefinition.isValidValue(
      this.rawData,
      value,
      true,
    );
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
}

// We set the value of those if non in production
// These are very useful debugging utilities
if (process.env.NODE_ENV !== "production") {

  const valueOneOf = [
    {
      type: "string",
    },
    {
      type: "boolean",
    },
    {
      type: "number",
    },
  ];

  const searchLevels = ["always", "moderate", "rare", "disabled"];

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
      rare: {
        type: "boolean",
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
        items: {
          oneOf: valueOneOf,
        },
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
      default: {
        oneOf: valueOneOf,
      },
      defaultIf: {
        type: "array",
        items: {
          type: "object",
          properties: {
            if: {
              $ref: ConditionalRuleSet.schema.$id,
            },
            value: {
              oneOf: valueOneOf,
            },
          },
          additionalProperties: false,
          required: ["value", "if"],
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
            value: {
              oneOf: valueOneOf,
            },
          },
          additionalProperties: false,
          required: ["value", "if"],
        },
        minItems: 1,
      },
      nullIfHidden: {
        type: "boolean",
      },
      enforcedValue: {
        oneOf: valueOneOf,
      },
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
    },
    additionalProperties: false,
    definitions: {
      ConditionalRuleSet: ConditionalRuleSet.schema,
    },
    required: ["id", "type"],
  };
}
