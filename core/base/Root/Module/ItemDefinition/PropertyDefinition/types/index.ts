import { GraphQLOutputType } from "graphql";
import { IGQLFieldsDefinitionType, IGQLValue } from "../../../../gql";
import { ISQLTableRowValue } from "../../../../sql";
import PropertyDefinition, { PropertyInvalidReason } from "../../PropertyDefinition";
import boolean, { PropertyDefinitionSupportedBooleanType } from "./boolean";
import number, { PropertyDefinitionSupportedNumberType } from "./number";
import string, { PropertyDefinitionSupportedStringType } from "./string";
import integer, { PropertyDefinitionSupportedIntegerType } from "./integer";
import currency, { IPropertyDefinitionSupportedCurrencyType } from "./currency";
import unit, { IPropertyDefinitionSupportedUnitType } from "./unit";
import password, { PropertyDefinitionSupportedPasswordType } from "./password";
import text, { PropertyDefinitionSupportedTextType } from "./text";
import date, { PropertyDefinitionSupportedDateType } from "./date";
import datetime, { PropertyDefinitionSupportedDateTimeType } from "./datetime";
import time, { PropertyDefinitionSupportedTimeType } from "./time";
import location, { IPropertyDefinitionSupportedLocationType } from "./location";
import files, { PropertyDefinitionSupportedFilesType } from "./files";
import year, { PropertyDefinitionSupportedYearType } from "./year";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";

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

export interface IPropertyDefinitionSupportedType {
  // json represents how the element is represented in json form
  // objects are not allowed only boolean numbers and strings are
  // these are used for types that are allowed to be used by
  // enforcedProperties and predefinedProperties, it is optional
  // as types that are not settable do not have a json form
  json?: "boolean" | "number" | "string";

  // supported subtypes of the type
  supportedSubtypes?: string[];

  // graphql type
  gql: GraphQLOutputType | string;
  gqlFields?: IGQLFieldsDefinitionType;
  // sql definition, either a string for knex supported types
  // or a function where the id is the id is a property id
  // this represents how tables are populated and data is stored
  // a simple type simply saves the id, say it's a number, so
  // the row name will be property_id and the type will be number
  // however if it's a complex value you might need to set the row
  // names and their types by hand
  sql: string | ((id: string) => {[key: string]: string});
  // specifies how data is stored, by default it just sets the row value
  // to whatever is given, however if you have a complex value you should
  // set this, the raw function is the raw knex function, that allows to build raw queries,
  // by default if not set this function just sets {property_id: value}
  sqlIn: (
    value: PropertyDefinitionSupportedType,
    id: string,
    property: PropertyDefinition,
    knex: any,
    dictionary: string,
  ) => ISQLTableRowValue;
  // sqlOut basically gives the entire table as data, and the property id where it expects
  // retrieval of that data; by default this function takes the table and does
  // data[property_id]
  sqlOut: (
    row: ISQLTableRowValue,
    id: string,
    property: PropertyDefinition,
  ) => PropertyDefinitionSupportedType;
  // TODO description
  sqlSearch: (data: IGQLValue, sqlPrefix: string, id: string, knexBuilder: any, dictionary: string) => void;
  sqlEqual: (
    value: PropertyDefinitionSupportedType,
    sqlPrefix: string,
    id: string,
    knexBuilder: any,
    columnName: string,
    knex: any,
  ) => void;

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

const supportedTypesStandard: PropertyDefinitionSupportedTypesStandardType = {
  boolean,
  integer,
  number,
  currency,
  unit,
  string,
  password,
  text,
  year,
  date,
  time,
  datetime,
  location,
  files,
};

// Checking that the property descriptions are right
Object.keys(supportedTypesStandard).forEach((propDefKey) => {
  // we loop over each one of them
  const propDef: IPropertyDefinitionSupportedType = supportedTypesStandard[propDefKey];
  // if it's not searchable, but we provide requests for search i18n data
  if (!propDef.searchable &&
    (propDef.i18n.searchBase || propDef.i18n.searchOptional ||
    propDef.i18n.searchRange || propDef.i18n.searchRangeOptional)) {
      throw new Error("Invalid propdef with search data for non-searchable > " +
        propDefKey);

  // if it's searchable, but we provide no requests for search i18n data
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
  PropertyDefinitionSupportedYearType |
  IPropertyDefinitionSupportedLocationType |
  PropertyDefinitionSupportedFilesType;

export default supportedTypesStandard;
