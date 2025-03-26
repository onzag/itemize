/**
 * Contains all the supported types within the standard specification of itemize
 * some mild checkers just in case as well as the types that are used within
 * typescript, this file acts as a registry of sorts
 *
 * @module
 */

import type { ISQLTableRowValue, ISQLTableDefinitionType, IElasticIndexDefinitionType } from "../../../../sql";
import PropertyDefinition, { PropertyInvalidReason, IPropertyDefinitionRawJSONDataType } from "../../PropertyDefinition";
import boolean, { PropertyDefinitionSupportedBooleanType } from "./boolean";
import number, { PropertyDefinitionSupportedNumberType } from "./number";
import string, { PropertyDefinitionSupportedStringType } from "./string";
import integer, { PropertyDefinitionSupportedIntegerType } from "./integer";
import currency, { IPropertyDefinitionSupportedCurrencyType } from "./currency";
import unit, { IPropertyDefinitionSupportedUnitType } from "./unit";
import password, { PropertyDefinitionSupportedPasswordType } from "./password";
import text, { IPropertyDefinitionSupportedTextType } from "./text";
import date, { PropertyDefinitionSupportedDateType } from "./date";
import datetime, { PropertyDefinitionSupportedDateTimeType } from "./datetime";
import time, { PropertyDefinitionSupportedTimeType } from "./time";
import location, { IPropertyDefinitionSupportedLocationType } from "./location";
import files, { PropertyDefinitionSupportedFilesType } from "./files";
import year, { PropertyDefinitionSupportedYearType } from "./year";
import payment, { IPropertyDefinitionSupportedPaymentType } from "./payment";
import taglist, { PropertyDefinitionSupportedTagListType } from "./taglist";
import { PropertyDefinitionSearchInterfacesType } from "../search-interfaces";
import { IRQArgs, IRQValue } from "../../../../../../rq-querier";
import file, { PropertyDefinitionSupportedFileType } from "./file";
import ItemDefinition from "../..";
import Include from "../../Include";
import { WhereBuilder } from "../../../../../../database/WhereBuilder";
import type { IAppDataType, IServerDataType } from "../../../../../../server";
import type { ElasticQueryBuilder } from "../../../../../../server/elastic";
import { RQField } from "../../../../rq";
// import type PaymentProvider from "../../../../../../server/services/base/PaymentProvider";
import type { IConfigRawJSONDataType, IDBConfigRawJSONDataType } from "../../../../../../config";

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
  "files" |           // Represented as a list of urls, non comparable,
  // stored as a list of urls
  "payment" |
  "taglist";

export interface IArgInfo {
  id: string;
  prefix: string;
  property: PropertyDefinition;
  itemDefinition: ItemDefinition;
  include?: Include;
}

export interface ISQLRedoDictionaryBasedIndex extends IArgInfo {
  newDictionary: string;
  newLanguage: string;
}

export interface ISQLArgInfo extends IArgInfo {
  serverData: IServerDataType;
  config: IConfigRawJSONDataType;
  databaseConfig: IDBConfigRawJSONDataType;
  // paymentServiceProvider: PaymentProvider<any>,
  // appData: IAppDataType;
}

export interface ISQLInInfo extends ISQLArgInfo {
  value: PropertyDefinitionSupportedType;

  /**
   * When the dictionary and the language are passed
   * as a sql table row value they will
   * find a property that is used for the language
   * in it, this is more useful when it's used
   * in conjuction with copying as it needs to inherit
   * the specific language that was used in that row
   */
  dictionary: string | ISQLTableRowValue;
  language: string | ISQLTableRowValue;
}

export interface ISQLOutInfo extends ISQLArgInfo {
  row: ISQLTableRowValue;
}

export interface ISQLSearchInfo extends ISQLArgInfo {
  language: string;
  dictionary: string;
  whereBuilder: WhereBuilder;
  args: IRQArgs;
  isOrderedByIt: boolean;
}

export interface IElasticSearchInfo extends ISQLArgInfo {
  language: string;
  dictionary: string;
  elasticQueryBuilder: ElasticQueryBuilder;
  args: IRQArgs;
  isOrderedByIt: boolean;
  boost: number;
  fullHighlights: number;
}

export interface IElasticHighlight {
  /**
   * The name of the original property that is being highlighted
   * with its given prefix if it's from an include
   */
  name: string;
  /**
   * Whatever we are matching it against
   */
  match: string;
  /**
* Property definition in quesiton
*/
  property?: PropertyDefinition;
  /**
   * Include if any
   */
  include?: Include;
}

export interface IElasticHighlightReply {
  /**
   * The eleasticsearch field that will be highlighted
   * the field name is the real name for the highlight
   */
  [fieldName: string]: IElasticHighlight;
}

export interface IElasticHighlighPropertyInfo {
  lang: string;
  highlights: string[];
  match: string;
  full: boolean;
}

export interface IElasticHighlightSingleRecordInfo {
  [propertyId: string]: IElasticHighlighPropertyInfo;
}

export interface IElasticHighlightRecordInfo {
  [mergedId: string]: IElasticHighlightSingleRecordInfo;
}

export interface ISQLStrSearchInfo extends ISQLArgInfo {
  language: string;
  dictionary: string;
  whereBuilder: WhereBuilder;
  search: string;
  isOrderedByIt: boolean;
}

export interface IElasticStrSearchInfo extends ISQLArgInfo {
  language: string;
  dictionary: string;
  elasticQueryBuilder: ElasticQueryBuilder;
  search: string;
  boost: number;
  isOrderedByIt: boolean;
}

export interface ISQLEqualInfo extends ISQLArgInfo {
  value: PropertyDefinitionSupportedType;
  whereBuilder: WhereBuilder;
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
  args: IRQArgs;
}

export interface ISQLBtreeIndexableInfo extends ISQLArgInfo {
}

export interface ILocalSearchInfo extends IArgInfo {
  args: IRQArgs;
  rqValue: IRQValue;
}

export interface ILocalStrSearchInfo extends IArgInfo {
  search: string;
  rqValue: IRQValue;
}

export interface ILocalEqualInfo<T> extends IArgInfo {
  a: T;
  b: T;
}

export interface ILocalOrderByInfo<T> extends IArgInfo {
  direction: "asc" | "desc";
  nulls: "first" | "last";
  a: T;
  b: T;
}

export interface ISQLMantenienceType {
  columnToSet: string,
  setColumnToRaw: [string, any[]],
  from: string,
  fromAs: string,
  whereRaw: [string, any[]],
  updateConditionRaw: [string, any[]],
}

export interface ISQLSideEffectType<T> extends IArgInfo {
  appData: IAppDataType;
  originalValue: T;
  newValue: T;
  rowId: string;
  rowVersion: string;
  /**
   * This field is unknown on a pre-side effect event
   */
  newRowValue: ISQLTableRowValue;
  originalRowValue: ISQLTableRowValue;
}

/**
 * How every supported type behaviour should be described
 */
export interface IPropertyDefinitionSupportedType<T> {
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
   * whether it has an own language property
   */
  ownLanguageProperty?: string;
  /**
   * The rq type
   */
  rq: RQField;
  /**
   * Whether it currently represents a rq file
   * within the structure that is ought to be processed
   * by file manageent
   * 
   * such field must therefore contain
   * id string
   * name string
   * metadata string
   * url string
   * src binary
   * size integer-positive
   * 
   * to fit in the IRQFile structure
   */
  rqRepresentsFile?: boolean;
  /**
   * sql definition
   * or a function where the id is the id is a property id
   * this represents how tables are populated and data is stored
   * a simple type simply saves the id, say it's a number, so
   * the row name will be property_id and the type will be number
   * however if it's a complex value you might need to set the row
   * names and their types by hand
   */
  sql: (arg: ISQLArgInfo) => ISQLTableDefinitionType;
  /**
   * elastic index definition for the property
   * it's used inside the mappings for creating the elastic index
   */
  elastic: (arg: ISQLArgInfo) => IElasticIndexDefinitionType;
  /**
   * On a simple search what fields should be selected that are
   * the minimum necessary to perform a selection, this is used
   * for traditional search mainly
   */
  sqlSelect: (arg: IArgInfo) => string[];
  /**
   * specifies how data is stored, by default it just sets the row value
   * to whatever is given, however if you have a complex value you should
   * set this, that allows to build raw queries,
   * by default if not set this function just sets {property_id: value}
   */
  sqlIn: (arg: ISQLInInfo) => ISQLTableRowValue;
  /**
   * sqlOut basically gives the entire table as data, and the property id where it expects
   * retrieval of that data; by default this function takes the table and does
   * data[property_id]
   */
  sqlOut: (arg: ISQLOutInfo) => T;
  /**
   * Defines how data is to be stored in elasticsearch
   * similar to sql in in how it works
   */
  sqlElasticIn: (arg: ISQLOutInfo) => ISQLTableRowValue;
  /**
   * Represents a search for an item
   * data is the rq value obtained from the search query mode item definition
   * sqlPrefix is a prefix that everything is prefixed in sql, usually for the item
   * id is the id of the property
   * whereBuilder is the builder that is being used so it can attach the where queries to it
   * and dictionary is the postgres dictionary that can be used for sql searches
   * return a boolean on whether it searched by it or it didn't
   * you might also return an array instead of true for adding custom rows to be added
   * to the selection, these represent arguments for a raw select query
   */
  sqlSearch: (arg: ISQLSearchInfo) => boolean | [string, any[]];
  /**
   * Defines how to perform elastic search into the property
   */
  elasticSearch: (arg: IElasticSearchInfo) => IElasticHighlightReply;
  /**
   * Represents a search for an item when the only input has been a string, make it null
   * to avoid supporting it
   * return a boolean on whether it searched by it or it didn't
   */
  sqlStrSearch: (arg: ISQLStrSearchInfo) => boolean | [string, any[]];
  /**
   * Represents a str based search using the elastic interface
   */
  elasticStrSearch: (arg: IElasticStrSearchInfo) => IElasticHighlightReply;
  /**
   * Provides the rows that are expected to be indexed and in the order that they are expected
   * when an index is added via a request limiter in the module
   */
  sqlBtreeIndexable: (arg: ISQLBtreeIndexableInfo) => string[];
  /**
   * represents a local search checkup performed locally with a rq value
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
   */
  sqlEqual: (arg: ISQLEqualInfo) => void;
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
  localEqual: (arg: ILocalEqualInfo<T>) => boolean;
  /**
   * The SQL order by function that tells the database how to order
   * by certain criteria, make it null to specify that this item can't
   * be ordered by, attempts to order by it will give an error
   */
  sqlOrderBy: (arg: ISQLOrderByInfo) => [string, string, string];
  /**
   * similar to sql order by but done against elasticsearch sort
   * you must return values that are valid for sort as they will
   * be appended to the array of sort that elasticsearch expects
   */
  elasticSort: (arg: ISQLOrderByInfo) => any;
  /**
   * The local order by function that tells a client how to order by it
   * basically this is fed to a sort function the same way sorting would
   * work locally, except a direction is specified, make it null to specify
   * the item can't be sorted by
   */
  localOrderBy: (arg: ILocalOrderByInfo<T>) => number,
  /**
   * SQL Row mantenience which runs every so often as defined
   * by the mantenience protocol where row is the entire row
   * and it expects a partial value, this value should be null
   * for fields without mantenience
   */
  sqlMantenience: (arg: ISQLArgInfo) => ISQLMantenienceType;

  /**
   * SQL to redo the dictionary based index
   */
  sqlRedoDictionaryIndex?: (arg: ISQLRedoDictionaryBasedIndex) => ISQLTableRowValue;

  /**
   * Allows to specify side effects that occur on the server side
   * once the type has been modified
   */
  sqlSideEffect?: (arg: ISQLSideEffectType<T>) => void;

  /**
   * Allows to specify side effects that occur on the server side
   * before the type has been modified
   * 
   * The main function is to prevent unwanted modifications or setup
   * fields that have certain rules to them, for example a XML only field
   * in a type, or a JSON specific one, etc...
   * 
   * Because of the nature of the pre side effecct it is unable to run
   * on delete as it's too expensive because of deletition cascading
   */
  sqlPreSideEffect?: (arg: ISQLSideEffectType<T>) => boolean | string | Promise<boolean | string>;

  /**
   * Use this function to
   * establish when a field will be considered null
   */
  isNull?: (value: T) => boolean;

  /**
   * use to establish the value for null, by default it is null
   */
  getNullValue?: (value: T) => T;

  /**
   * this is a validation function that checks whether the value
   * is valid,
   */
  validate?: (value: T, p: IPropertyDefinitionRawJSONDataType) => PropertyInvalidReason;
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
  configOptions?: Array<{
    name: string;
    type: "number" | "string" | "boolean" | "property-set" | "any" | "array-string" | "array-number" | "array-boolean",
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
   * This field is required to have specified specific values
   */
  requiresValues?: boolean | string[];
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
    // this will get requested if the range attributes are not requested
    searchRangeDisabled?: string[],
    searchRangeDisabledOptional?: string[],
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
  Record<PropertyDefinitionSupportedTypeName, IPropertyDefinitionSupportedType<PropertyDefinitionSupportedType>>;

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
  payment,
  taglist,
};

// Checking that the property descriptions are right
Object.keys(supportedTypesStandard).forEach((propDefKey) => {
  // we loop over each one of them
  const propDef: IPropertyDefinitionSupportedType<PropertyDefinitionSupportedType> = supportedTypesStandard[propDefKey];
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
  IPropertyDefinitionSupportedTextType |
  PropertyDefinitionSupportedDateType |
  PropertyDefinitionSupportedDateTimeType |
  PropertyDefinitionSupportedTimeType |
  PropertyDefinitionSupportedYearType |
  IPropertyDefinitionSupportedLocationType |
  PropertyDefinitionSupportedFileType |
  PropertyDefinitionSupportedFilesType |
  IPropertyDefinitionSupportedPaymentType |
  PropertyDefinitionSupportedTagListType;

export default supportedTypesStandard;
