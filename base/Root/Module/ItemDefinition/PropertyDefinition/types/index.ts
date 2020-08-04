/**
 * Contains all the supported types within the standard specification of itemize
 * some mild checkers just in case as well as the types that are used within
 * typescript, this file acts as a registry of sorts
 *
 * @packageDocumentation
 */

import { GraphQLOutputType } from "graphql";
import { IGQLFieldsDefinitionType } from "../../../../gql";
import { ISQLTableRowValue, ISQLTableDefinitionType } from "../../../../sql";
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
import Knex from "knex";
import { IGQLArgs, IGQLValue } from "../../../../../../gql-querier";
import file, { PropertyDefinitionSupportedFileType } from "./file";
import ItemDefinition from "../..";
import Include from "../../Include";

/**
 * All the supported property types
 */
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
  "file" |            // Represents a single url
  "files";            // Represented as a list of urls, non comparable,
                      // stored as a list of urls

export interface IArgInfo {
  id: string;
  prefix: string;
  property: PropertyDefinition;
  itemDefinition: ItemDefinition;
  include?: Include;
}

export interface ISQLArgInfo extends IArgInfo {
  knex: Knex;
  serverData: any;
}

export interface ISQLInInfo extends ISQLArgInfo {
  value: PropertyDefinitionSupportedType;
  dictionary: string;
}

export interface ISQLOutInfo extends ISQLArgInfo {
  row: ISQLTableRowValue;
}

export interface ISQLSearchInfo extends ISQLArgInfo {
  dictionary: string;
  knexBuilder: Knex.QueryBuilder;
  args: IGQLArgs;
  isOrderedByIt: boolean;
}

export interface ISQLStrSearchInfo extends ISQLArgInfo {
  dictionary: string;
  knexBuilder: Knex.QueryBuilder;
  search: string;
  isOrderedByIt: boolean;
}

export interface ISQLEqualInfo extends ISQLArgInfo {
  value: PropertyDefinitionSupportedType;
  ignoreCase: boolean;
}

export interface ISQLSSCacheEqualInfo extends ISQLArgInfo {
  value: PropertyDefinitionSupportedType;
  row: ISQLTableRowValue;
}

export interface ISQLOrderByInfo extends ISQLArgInfo {
  direction: "asc" | "desc";
  nulls: "first" | "last";
  wasIncludedInSearch: boolean;
  wasIncludedInStrSearch: boolean;
}

export interface ISQLBtreeIndexableInfo extends ISQLArgInfo {
}

export interface ILocalSearchInfo extends IArgInfo {
  args: IGQLArgs;
  gqlValue: IGQLValue;
}

export interface ILocalStrSearchInfo extends IArgInfo {
  search: string;
  gqlValue: IGQLValue;
}

export interface ILocalEqualInfo extends IArgInfo {
  a: PropertyDefinitionSupportedType;
  b: PropertyDefinitionSupportedType;
}

export interface ILocalOrderByInfo extends IArgInfo {
  direction: "asc" | "desc";
  nulls: "first" | "last";
  a: PropertyDefinitionSupportedType;
  b: PropertyDefinitionSupportedType;
}

export interface ISQLMantenienceType {
  columnToSet: string,
  setColumnToRaw: [string, any[]],
  from: string,
  fromAs: string,
  whereRaw: [string, any[]],
  updateConditionRaw: [string, any[]],
}

/**
 * How every supported type behaviour should be described
 */
export interface IPropertyDefinitionSupportedType {
  /**
   * json represents how the element is represented in json form
   * objects are not allowed only boolean numbers and strings are
   * these are used for types that are allowed to be used by
   * enforcedProperties and predefinedProperties, it is optional
   * as types that are not settable do not have a json form
   */
  json?: "boolean" | "number" | "string";

  /**
   * supported subtypes of the type
   */
  supportedSubtypes?: string[];

  /**
   * graphql type, either a output type or a string, when it's a string
   * gqlFields should be defined
   */
  gql: GraphQLOutputType | string;
  /**
   * when gql is a string, the fields that it represents, this is for complex
   * types, only basic types are allowed
   */
  gqlFields?: IGQLFieldsDefinitionType;
  /**
   * Whether this object represents a list, this affects everything
   */
  gqlList?: boolean;
  /**
   * Whether this complex type (must be a complex type), should be merged
   * with IGQL file fields for supporting files and streams, you do not need
   * to worry about the validation of file fields
   */
  gqlAddFileToFields?: boolean;
  /**
   * sql definition, either a string for knex supported types
   * or a function where the id is the id is a property id
   * this represents how tables are populated and data is stored
   * a simple type simply saves the id, say it's a number, so
   * the row name will be property_id and the type will be number
   * however if it's a complex value you might need to set the row
   * names and their types by hand
   */
  sql: (arg: ISQLArgInfo) => ISQLTableDefinitionType;
  /**
   * specifies how data is stored, by default it just sets the row value
   * to whatever is given, however if you have a complex value you should
   * set this, the raw function is the raw knex function, that allows to build raw queries,
   * by default if not set this function just sets {property_id: value}
   */
  sqlIn: (arg: ISQLInInfo) => ISQLTableRowValue;
  /**
   * sqlOut basically gives the entire table as data, and the property id where it expects
   * retrieval of that data; by default this function takes the table and does
   * data[property_id]
   */
  sqlOut: (arg: ISQLOutInfo) => PropertyDefinitionSupportedType;
  /**
   * Represents a search for an item
   * data is the graphql value obtained from the search query mode item definition
   * sqlPrefix is a prefix that everything is prefixed in sql, usually for the item
   * id is the id of the property
   * knexBuilder is the builder that is being used so it can attach the where queries to it
   * and dictionary is the postgres dictionary that can be used for sql searches
   * return a boolean on whether it searched by it or it didn't
   * you might also return an array instead of true for adding custom rows to be added
   * to the selection, these represent arguments for knex.raw for a select query
   */
  sqlSearch: (arg: ISQLSearchInfo) => boolean | [string, any[]];
  /**
   * Represents a search for an item when the only input has been a string, make it null
   * to avoid supporting it
   * note that the knexBuilder can be null in this case, because of technical limitations
   * with knex as it only executes subqueries within the subquery and we need to know
   * the select query beforehand
   * return a boolean on whether it searched by it or it didn't
   */
  sqlStrSearch: (arg: ISQLStrSearchInfo) => boolean | [string, any[]];
  /**
   * Provides the rows that are expected to be indexed and in the order that they are expected
   * when an index is added via a request limiter in the module
   */
  sqlBtreeIndexable: (arg: ISQLBtreeIndexableInfo) => string[];
  /**
   * represents a local search checkup performed locally with a graphql value
   * raw (that is with DATA) the property id and the include id, the args are
   * the same
   */
  localSearch: (arg: ILocalSearchInfo) => boolean;
  /**
   * represents a local search but done using the single search value instead rather
   * than the entire value to match against, make it null to avoid supporting it
   */
  localStrSearch: (arg: ILocalStrSearchInfo) => boolean;
  /**
   * Represents a check for equality of a property against another
   * same with the sql prefix as the search
   * same for the id, and knex is just the knex instance, not a builder
   * and an optional column name so that it can be used as select as
   */
  sqlEqual: (arg: ISQLEqualInfo) => any;
  /**
   * A server side ran cached equal, ran during cache checks very useful for checking
   * against policies during policy checks and other forms of checks
   * with raw database data
   */
  sqlSSCacheEqual: (arg: ISQLSSCacheEqualInfo) => boolean;
  /**
   * Simply compare two values of the same type, this
   * is used for differing properties so it might differ
   * from the sql behaviour
   */
  localEqual: (arg: ILocalEqualInfo) => boolean;
  /**
   * The SQL order by function that tells the database how to order
   * by certain criteria, make it null to specify that this item can't
   * be ordered by, attempts to order by it will give an error
   */
  sqlOrderBy: (arg: ISQLOrderByInfo) => [string, string, string],
  /**
   * The local order by function that tells a client how to order by it
   * basically this is fed to a sort function the same way sorting would
   * work locally, except a direction is specified, make it null to specify
   * the item can't be sorted by
   */
  localOrderBy: (arg: ILocalOrderByInfo) => number,
  /**
   * SQL Row mantenience which runs every so often as defined
   * by the mantenience protocol where row is the entire row
   * and it expects a partial value, this value should be null
   * for fields without mantenience
   */
  sqlMantenience: (arg: ISQLArgInfo) => ISQLMantenienceType;

  /**
   * represents an item that would mark for null
   * by default it is null itself
   */
  nullableDefault?: any;

  /**
   * this is a validation function that checks whether the value
   * is valid,
   */
  validate?: (value: PropertyDefinitionSupportedType, subtype?: string) => PropertyInvalidReason;
  /**
   * whether it is searchable or not
   */
  searchable: boolean;
  /**
   * the search interface used, should be specified if searchable
   * otherwise it would mess up
   */
  searchInterface?: PropertyDefinitionSearchInterfacesType;
  /**
   * special attributes that might be added specific to that type
   */
  specialProperties?: Array<{
    name: string;
    type: "number" | "string" | "boolean" | "property-set" | "any",
    required?: boolean | Array<string>;
  }>;
  /**
   * whether a min and max value can be defined, use it if the value is in
   * some way numeric
   */
  allowsMinMaxDefined?: boolean;
  /**
   * whether a max decimal count can be specified use it if the value is numeric
   * and contains decimal
   */
  allowsMaxDecimalCountDefined?: boolean;
  /**
   * whether a max length can be defined, use it if the value is not an scalar of sort
   * but a combination of things, eg. characters, files,
   */
  allowsMinMaxLengthDefined?: boolean;
  /**
   * i18n supported and expected attributes
   * they won't be requested at all for hidden and not searchable items
   * if the item has a range it should be specified too
   * these will be used for checking more than anything
   */
  i18n: {
    base: string[],
    optional: string[],
    // range attributes are not requested if disableRangedSearch is true
    // nor if the searchInterface is not EXACT_AND_RANGE
    // nor if its not searchable
    searchRange?: string[],
    searchRangeOptional?: string[],
    // not requested if the searchable is disabled
    searchBase?: string[],
    searchOptional?: string[],

    tooLargeErrorInclude?: boolean | string[],
    tooSmallErrorInclude?: boolean | string[],
    tooManyDecimalsErrorInclude?: boolean | string[],
    invalidSubtypeErrorInclude?: boolean | string[],
  };
}

/**
 * So this is how properties are defined to give an overview on
 * how they are supposed to be managed
 */
export type PropertyDefinitionSupportedTypesStandardType =
Record<PropertyDefinitionSupportedTypeName, IPropertyDefinitionSupportedType>;

/**
 * The standard definition and registry of all types in itemize
 */
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
  file,
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

/**
 * All the supported types combined
 */
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
  PropertyDefinitionSupportedFileType |
  PropertyDefinitionSupportedFilesType;

export default supportedTypesStandard;
