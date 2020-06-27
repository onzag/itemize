/**
 * Contains SQL helper functions to be used within the property definition in order
 * to be able to perform searches of them in the database
 *
 * @packageDocumentation
 */

import { PropertyDefinitionSupportedType, ISQLArgInfo, ISQLInInfo, ISQLOutInfo,
  ISQLSearchInfo, ISQLEqualInfo, ISQLBtreeIndexableInfo, ISQLOrderByInfo } from "./types";
import PropertyDefinition from "../PropertyDefinition";
import { ISQLTableRowValue, ISQLTableDefinitionType, ISQLStreamComposedTableRowValue,
  ConsumeStreamsFnType, ISQLTableIndexType } from "../../../sql";
import { PropertyDefinitionSearchInterfacesPrefixes } from "./search-interfaces";
import Knex from "knex";
import ItemDefinition from "..";
import Include from "../Include";
import { processFileListFor, processSingleFileFor } from "./sql-files";
import { IGQLArgs, IGQLValue } from "../../../../../gql-querier";
import { SQL_CONSTRAINT_PREFIX } from "../../../../../constants";
import pkgcloud from "pkgcloud";
import Module from "../..";

/**
 * Provides the sql function that defines the schema that is used to build
 * the partial table definition
 * @param type the postgresql type
 * @param ext a extension to require for this type
 * @returns a function that returns the partial table definition object with the given type
 */
export function getStandardSQLFnFor(type: string, ext: string = null, indexCalculator?: (subtype: string, sqlPrefix: string, id: string) => ISQLTableIndexType):
  (arg: ISQLArgInfo) => ISQLTableDefinitionType {

  // so we return the function
  return (arg: ISQLArgInfo) => {
    const subtype = arg.property.getSubtype();

    return {
      // the sql prefix defined plus the id, eg for includes
      [arg.prefix + arg.id]: {
        // the type is defined
        type,
        // and we add an unique index if this property is deemed unique
        index: arg.property.isUnique() ? {
          type: "unique",
          id: SQL_CONSTRAINT_PREFIX + arg.prefix + arg.id,
          level: 0,
        } : (indexCalculator ? indexCalculator(subtype, arg.prefix, arg.id) : null),
        ext,
      },
    }
  };
}

export function standardSQLOrderBy(arg: ISQLOrderByInfo) {
  return [arg.prefix + arg.id, arg.direction, arg.nulls] as [string, string, string];
}

/**
 * The standard sql in function that specifies how a property inputs its value
 * into a table
 * @param arg the in arg
 * @returns the partial row value
 */
export function stardardSQLInFn(arg: ISQLInInfo): ISQLTableRowValue {
  // as simple as this
  return {
    [arg.prefix + arg.id]: arg.value,
  };
}

/**
 * The standard sql in function that inputs its value but
 * uses JSON stringify as a serialization tool
 * @param arg the in arg
 * @returns the partial row value
 */
export function stardardSQLInWithJSONStringifyFn(arg: ISQLInInfo): ISQLTableRowValue {
  if (arg.value === null) {
    return {
      [arg.prefix + arg.id]: null,
    };
  }
  return {
    [arg.prefix + arg.id]: JSON.stringify(arg.value),
  };
}

/**
 * The standard sql out function that defines
 * how a value for a property is extracted from a given
 * row
 * @param arg the out arg info
 * @returns the property value out
 */
export function standardSQLOutFn(arg: ISQLOutInfo): PropertyDefinitionSupportedType {
  return arg.row[arg.prefix + arg.id];
}

/**
 * The standard sql out function that deserializes values
 * as they are expected to be stored serialized
 */
export function standardSQLOutWithJSONParseFn(arg: ISQLOutInfo): PropertyDefinitionSupportedType {
  if (arg.row[arg.prefix + arg.id] === null) {
    return null;
  }

  try {
    return JSON.parse(arg.row[arg.prefix + arg.id]);
  } catch {
    return null;
  }
}

/**
 * The standard function that build queries for the property
 */
export function standardSQLSearchFnExactAndRange(arg: ISQLSearchInfo) {
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
  let searchedByIt: boolean = false;

  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    arg.knexBuilder.andWhere(arg.prefix + arg.id, arg.args[exactName] as any);
    searchedByIt = true;
  }

  if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
    arg.knexBuilder.andWhere(arg.prefix + arg.id, ">=", arg.args[fromName] as any);
    searchedByIt = true;
  }

  if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
    arg.knexBuilder.andWhere(arg.prefix + arg.id, "<=", arg.args[toName] as any);
    searchedByIt = true;
  }

  return searchedByIt;
}

/**
 * The standard function that perfoms equality checks within the database
 * @returns a knex valid search or select query object
 */
export function standardSQLEqualFn(arg: ISQLEqualInfo) {
  if (arg.ignoreCase && typeof arg.value === "string") {
    return arg.knex.raw(
      "LOWER(??) = ?",
      [
        arg.prefix + arg.id,
        arg.value.toLowerCase(),
      ],
    ); 
  }

  return {
    [arg.prefix + arg.id]: arg.value,
  };
}

export function standardSQLBtreeIndexable(arg: ISQLBtreeIndexableInfo) {
  return [arg.prefix, arg.id];
}

/**
 * Provides the table bit that is necessary to include this property and
 * this property alone, that is a table bit
 * @param knex the knex instance
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param prefix a prefix to prefix the table row names, this is
 * used to prefix item specific properties that are sinked in from
 * the parent in the item
 * @returns the partial sql table definition for the property
 */
export function getSQLTableDefinitionForProperty(
  knex: Knex,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
): ISQLTableDefinitionType {
  // get the sql def based on the property definition
  const sqlDef = propertyDefinition.getPropertyDefinitionDescription().sql;
  // let's get it based on the function it is
  return sqlDef({
    prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
    id: propertyDefinition.getId(),
    property: propertyDefinition,
    knex,
    itemDefinition,
    include,
    // server data unavailable
    serverData: null,
  });
}

/**
 * Takes row data information that is in the SQL form and converts
 * it into a graphql form, only for this specific property
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param row the row that we want to extract information from
 * @param prefix the prefix, if the information happens to be prefixed
 * @returns the graphql value for the property
 */
export function convertSQLValueToGQLValueForProperty(
  knex: Knex,
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  row: ISQLTableRowValue,
): IGQLValue {
  // we get the column name we are supposed to extract the data
  // from, usually properties in sql are stored as their raw id, eg.
  // "distance", "size", etc... but they might be prefixed
  // usually when they happen to be for an item ITEM_wheel_size
  // the prefix is now passed to the sqlOut function

  // now we need to extract the sql data, we try to get a sqlOut
  // function which extracts data from rows for a given property
  const sqlOut = propertyDefinition.getPropertyDefinitionDescription().sqlOut;

  // if the function to extract the data is not defined, this means the value is
  // just a plain value, so we just do a 1:1 extraction

  // we pass the data for the row, with the column name where the data
  // SHOULD be, this might do a complex conversion, like in currency types that
  // need 2 rows to store the field data, the currency, and the value
  // eg. ITEM_wheel_price might become ITEM_wheel_price_CURRENCY and ITEM_wheel_price_VALUE
  // which will in turn once extracted with sqlOut become {currency: ..., value: ...}
  let colValue = sqlOut({
    row,
    prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
    knex,
    serverData,
    itemDefinition,
    include,
    property: propertyDefinition,
    id: propertyDefinition.getId(),
  });

  // we check for null coersion, while this shouldn't really
  // happen, because it should have never saved nulls in the
  // database to begin with, we might have such a case where
  // the value is null, for example, after an update, this will
  // ensure coercion keeps on
  if (
    propertyDefinition.isCoercedIntoDefaultWhenNull() &&
    colValue === null
  ) {
    colValue = propertyDefinition.getDefaultValue();
  }

  // because we are returning from graphql, the information
  // is not prefixed and is rather returned in plain form
  // so the id is all what you get for the property, remember
  // properties are always in its singular name in graphql form
  // the only prefixed things are ITEM_
  // and the properties are into its own object if they
  // happen to be sinking properties
  return {
    [propertyDefinition.getId()]: colValue as any,
  };
}

/**
 * Converts a graphql value into a sql value, that is graphql data into row
 * data to be immediately added to the database as it is
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param propertyDefinition the property definition in question
 * @param data the graphql data
 * @param oldData the old graphql data
 * @param knex the knex instance
 * @param dictionary the dictionary to use in full text search mode
 * @returns a promise with the partial sql row value to be inputted, note
 * that this is a promise because data streams need to be processed
 */
export function convertGQLValueToSQLValueForProperty(
  knex: Knex,
  serverData: any,
  mod: Module,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  data: IGQLArgs,
  oldData: IGQLValue,
  uploadsContainer: pkgcloud.storage.Container,
  uploadsPrefix: string,
  dictionary: string,
): ISQLStreamComposedTableRowValue {
  // and this is the value of the property, again, properties
  // are not prefixed, they are either in their own object
  // or in the root
  let gqlPropertyValue: any = data[propertyDefinition.getId()] as any;

  // we treat undefined as null, and set it to default
  // if it is coerced into null
  if (
    propertyDefinition.isCoercedIntoDefaultWhenNull() &&
    (
      gqlPropertyValue === null ||
      typeof gqlPropertyValue === "undefined"
    )
  ) {
    gqlPropertyValue = propertyDefinition.getDefaultValue() as any;
  }
  // we also got to set to null any undefined value
  if (typeof gqlPropertyValue === "undefined") {
    gqlPropertyValue = null;
  }

  let consumeStreams: ConsumeStreamsFnType;
  const description = propertyDefinition.getPropertyDefinitionDescription();
  if (description.gqlAddFileToFields) {
    const oldValue: any = (oldData && oldData[propertyDefinition.getId()]) || null;
    const newValue = gqlPropertyValue;
    if (description.gqlList) {
      const processedValue = processFileListFor(
        newValue,
        oldValue,
        uploadsContainer,
        uploadsPrefix,
        itemDefinition || mod,
        include,
        propertyDefinition,
      );
      gqlPropertyValue = processedValue.value;
      consumeStreams = processedValue.consumeStreams;
    } else {
      const processedValue = processSingleFileFor(
        newValue,
        oldValue,
        uploadsContainer,
        uploadsPrefix,
        itemDefinition || mod,
        include,
        propertyDefinition,
      );
      gqlPropertyValue = processedValue.value;
      consumeStreams = processedValue.consumeStreams;
    }
  } else {
    consumeStreams = () => null;
  }

  // so we need the sql in function, from the property description
  const sqlIn = propertyDefinition.getPropertyDefinitionDescription().sqlIn;

  // we return as it is
  return {
    value: sqlIn({
      value: gqlPropertyValue,
      prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
      knex,
      serverData,
      itemDefinition,
      include,
      property: propertyDefinition,
      id: propertyDefinition.getId(),
      dictionary,
    }),
    consumeStreams,
  };
}

/**
 * Builds a sql search query from a given property definition, the data
 * coming from the search module, a sql prefix to use, and the knex builder
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param knexBuilder the knex building instance
 * @param isOrderedByIt whether there will be a subsequent order by request
 */
export function buildSQLQueryForProperty(
  knex: Knex,
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
  knexBuilder: Knex.QueryBuilder,
  dictionary: string,
  isOrderedByIt: boolean,
) {
  const sqlSearchFn = propertyDefinition.getPropertyDefinitionDescription().sqlSearch;
  return sqlSearchFn({
    knex,
    serverData,
    itemDefinition,
    args,
    prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
    id: propertyDefinition.getId(),
    knexBuilder,
    dictionary,
    isOrderedByIt,
    property: propertyDefinition,
  });
}

export function buildSQLStrSearchQueryForProperty(
  knex: Knex,
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
  search: string,
  knexBuilder: Knex.QueryBuilder,
  dictionary: string,
  isOrderedByIt: boolean,
) {
  const sqlStrSearchFn = propertyDefinition.getPropertyDefinitionDescription().sqlStrSearch;
  if (sqlStrSearchFn) {
    return sqlStrSearchFn({
      knex,
      serverData,
      itemDefinition,
      search,
      prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
      id: propertyDefinition.getId(),
      knexBuilder,
      dictionary,
      isOrderedByIt,
      property: propertyDefinition,
    });
  }

  return false;
}

// Just in case to avoid sql injection
// if for some reason the gql security is taken
const actualDirection = {
  "asc": "ASC",
  "desc": "DESC",
}
const actualNulls = {
  "first": "FIRST",
  "last": "LAST",
}
export function buildSQLOrderByForProperty(
  knex: Knex,
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  knexBuilder: Knex.QueryBuilder,
  direction: "asc" | "desc",
  nulls: "first" | "last",
  wasIncludedInSearch: boolean,
  wasIncludedInStrSearch: boolean,
) {
  const sqlOrderByFn = propertyDefinition.getPropertyDefinitionDescription().sqlOrderBy;
  if (sqlOrderByFn) {
    const result = sqlOrderByFn({
      knex,
      serverData,
      itemDefinition,
      include,
      property: propertyDefinition,
      id: propertyDefinition.getId(),
      prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
      direction,
      nulls,
      wasIncludedInSearch,
      wasIncludedInStrSearch,
    });

    if (result) {
      knexBuilder.orderByRaw(
        `?? ${actualDirection[result[1].toLowerCase()] || "ASC"} NULLS ${actualNulls[result[2].toLowerCase()] || "LAST"}`,
        [result[0]]
      );
    }
  }
}

export function buildSQLOrderByForInternalRequiredProperty(
  knex: Knex,
  itemDefinition: ItemDefinition,
  which: string,
  knexBuilder: Knex.QueryBuilder,
  direction: "asc" | "desc",
  nulls: "first" | "last",
) {
  const result = standardSQLOrderBy({
    prefix: "",
    id: which,
    property: null,
    include: null,
    itemDefinition,
    direction,
    nulls,
    wasIncludedInSearch: null,
    wasIncludedInStrSearch: null,
    knex,
    serverData: null,
  });

  if (result) {
    knexBuilder.orderByRaw(
      `?? ${actualDirection[result[1].toLowerCase()] || "ASC"} NULLS ${actualNulls[result[2].toLowerCase()] || "LAST"}`,
      [result[0]]
    );
  }
}