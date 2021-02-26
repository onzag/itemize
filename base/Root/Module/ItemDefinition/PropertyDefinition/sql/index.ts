/**
 * Contains SQL helper functions to be used within the property definition in order
 * to be able to perform searches of them in the database
 *
 * @packageDocumentation
 */

import {
  PropertyDefinitionSupportedType, ISQLArgInfo, ISQLInInfo, ISQLOutInfo,
  ISQLSearchInfo, ISQLEqualInfo, ISQLBtreeIndexableInfo, ISQLOrderByInfo
} from "../types";
import PropertyDefinition from "../../PropertyDefinition";
import {
  ISQLTableRowValue, ISQLTableDefinitionType, ISQLStreamComposedTableRowValue,
  ConsumeStreamsFnType, ISQLTableIndexType
} from "../../../../sql";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import ItemDefinition from "../..";
import Include from "../../Include";
import { processFileListFor, processSingleFileFor } from "./file-management";
import { IGQLArgs, IGQLValue } from "../../../../../../gql-querier";
import { SQL_CONSTRAINT_PREFIX } from "../../../../../../constants";
import Module from "../../..";
import StorageProvider from "../../../../../../server/services/base/StorageProvider";
import { WhereBuilder } from "../../../../../../database/WhereBuilder";
import { OrderByBuilder } from "../../../../../../database/OrderByBuilder";

/**
 * Provides the sql function that defines the schema that is used to build
 * the partial table definition
 * @param type the postgresql type
 * @param ext a extension to require for this type
 * @param indexCalculator an function to decide how to build an index for this type
 * @returns a function that returns the partial table definition object with the given type
 */
export function getStandardSQLFnFor(
  type: string,
  ext: string = null,
  indexCalculator?: (subtype: string, sqlPrefix: string, id: string) => ISQLTableIndexType
):
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

/**
 * the standard order by functionality
 * @param arg the orer by info arg
 * @returns an array of string with the order by
 */
export function standardSQLOrderBy(arg: ISQLOrderByInfo) {
  return [arg.prefix + arg.id, arg.direction, arg.nulls] as [string, string, string];
}

/**
 * The standard sql select function that is used to select the minimum necessary
 * for a selection in a traditional search
 * @param arg the in arg
 * @returns the rows to select
 */
export function standardSQLSelect(arg: ISQLArgInfo): string[] {
  // as simple as this
  return [
    arg.prefix + arg.id,
  ];
}

/**
 * The standard sql in function that specifies how a property inputs its value
 * into a table
 * @param arg the in arg
 * @returns the partial row value
 */
export function standardSQLInFn(arg: ISQLInInfo): ISQLTableRowValue {
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
 * @param arg the sql out info arg
 * @returns the supported type json parsed
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
 * @param arg the search info arg
 * @returns a boolean on whether it was searched by it
 */
export function standardSQLSearchFnExactAndRange(arg: ISQLSearchInfo) {
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
  let searchedByIt: boolean = false;

  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id, arg.args[exactName] as any);
    searchedByIt = true;
  }

  if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id, ">=", arg.args[fromName] as any);
    searchedByIt = true;
  }

  if (typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id, "<=", arg.args[toName] as any);
    searchedByIt = true;
  }

  return searchedByIt;
}

/**
 * The standard function that perfoms equality checks within the database
 * @param arg the equal info arg
 * @returns a valid args to use in the where expression or an object
 * for where many
 */
export function standardSQLEqualFn(arg: ISQLEqualInfo) {
  if (arg.ignoreCase && typeof arg.value === "string") {
    arg.whereBuilder.andWhere(
      "LOWER(" + JSON.stringify(arg.prefix + arg.id) + ") = ?",
      [
        arg.value.toLowerCase(),
      ],
    );
    return;
  }

  arg.whereBuilder.andWhereColumn(
    arg.prefix + arg.id,
    arg.value as string,
  );
}

/**
 * The standard btree indexable column builder
 * @param arg the sql btree indexable arg
 * @returns an array of the columns to index
 */
export function standardSQLBtreeIndexable(arg: ISQLBtreeIndexableInfo) {
  return [arg.prefix + arg.id];
}

/**
 * Provides the table bit that is necessary to include this property and
 * this property alone, that is a table bit
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @returns the partial sql table definition for the property
 */
export function getSQLTableDefinitionForProperty(
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
    itemDefinition,
    include,
    // server data unavailable
    serverData: null,
  });
}

/**
 * Takes row data information that is in the SQL form and converts
 * it into a graphql form, only for this specific property
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param row the row that we want to extract information from
 * @returns the graphql value for the property
 */
export function convertSQLValueToGQLValueForProperty(
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
 * @param serverData the server data
 * @param mod the module
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param data the graphql data
 * @param oldData the old graphql data
 * @param uploadsContainer the uploads container that is to be used (to manage files)
 * @param uploadsPrefix the uploads prefix of such container
 * @param dictionary the dictionary to use in full text search mode
 * @returns a composed value with a partial row value and the consume streams functionality
 * included in it
 */
export function convertGQLValueToSQLValueForProperty(
  serverData: any,
  mod: Module,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  data: IGQLArgs,
  oldData: IGQLValue,
  uploadsClient: StorageProvider<any>,
  domain: string,
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
        uploadsClient,
        domain,
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
        uploadsClient,
        domain,
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
 * coming from the search module, a sql prefix to use
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param whereBuilder the where building instance
 * @param dictionary the dictionary that is being used
 * @param isOrderedByIt whether there will be a subsequent order by request
 */
export function buildSQLQueryForProperty(
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
  whereBuilder: WhereBuilder,
  dictionary: string,
  isOrderedByIt: boolean,
) {
  const sqlSearchFn = propertyDefinition.getPropertyDefinitionDescription().sqlSearch;
  return sqlSearchFn({
    serverData,
    itemDefinition,
    args,
    prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
    id: propertyDefinition.getId(),
    whereBuilder,
    dictionary,
    isOrderedByIt,
    property: propertyDefinition,
  });
}

/**
 * Builds a sql str FTS search query from a given property definition, the data
 * coming from the search module, a sql prefix to use, and the builder
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param search the search string that is being used
 * @param whereBuilder the where building instance
 * @param dictionary the dictionary that is being used
 * @param isOrderedByIt whether there will be a subsequent order by request
 */
export function buildSQLStrSearchQueryForProperty(
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
  search: string,
  whereBuilder: WhereBuilder,
  dictionary: string,
  isOrderedByIt: boolean,
) {
  const sqlStrSearchFn = propertyDefinition.getPropertyDefinitionDescription().sqlStrSearch;
  if (sqlStrSearchFn) {
    return sqlStrSearchFn({
      serverData,
      itemDefinition,
      search,
      prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
      id: propertyDefinition.getId(),
      whereBuilder,
      dictionary,
      isOrderedByIt,
      property: propertyDefinition,
    });
  }

  return false;
}

// Just in case to avoid sql injection
// if for some reason the gql security is taken
// remember that the direction variable, and nulls, comes directly
// from the graphql query
const actualDirection = {
  "asc": "ASC",
  "desc": "DESC",
}
const actualNulls = {
  "first": "FIRST",
  "last": "LAST",
}

/**
 * Builds an order by query for a given property
 * @param serverData the server data that is being used
 * @param itemDefinition the item definition in question
 * @param include the include (or null)
 * @param propertyDefinition the property in question
 * @param orderByBuilder the order by builder that is currently building the query
 * @param direction the direction to be accounted for
 * @param nulls the nulls (first or last)
 * @param wasIncludedInSearch whether this property was included in search
 * @param wasIncludedInStrSearch whether this property was included in the str FTS search
 */
export function buildSQLOrderByForProperty(
  serverData: any,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  orderByBuilder: OrderByBuilder,
  direction: "asc" | "desc",
  nulls: "first" | "last",
  wasIncludedInSearch: boolean,
  wasIncludedInStrSearch: boolean,
) {
  // first we need to check whether there's even a sql order by function
  const sqlOrderByFn = propertyDefinition.getPropertyDefinitionDescription().sqlOrderBy;
  // if we have one
  if (sqlOrderByFn) {
    // we call it
    const result = sqlOrderByFn({
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

    // if we have a result at all
    if (result) {
      orderByBuilder.orderByColumn(
        result[0],
        actualDirection[result[1].toLowerCase()] || "ASC",
        actualNulls[result[2].toLowerCase()] || "LAST",
      );
    }
  }
}

/**
 * Builds the order by functionality for the internal properties, such as
 * created_at, edited_at, etc...
 * @param itemDefinition the item definition
 * @param which basically the column name
 * @param orderByBuilder the order by builder
 * @param direction the direction of the order by rule
 * @param nulls whether nulls are first or last
 */
export function buildSQLOrderByForInternalRequiredProperty(
  itemDefinition: ItemDefinition,
  which: string,
  orderByBuilder: OrderByBuilder,
  direction: "asc" | "desc",
  nulls: "first" | "last",
) {
  // so we call our standard function
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
    serverData: null,
  });

  // if we have a result, we add it (we should have one, but who knows)
  if (result) {
    orderByBuilder.orderByColumn(
      result[0],
      actualDirection[result[1].toLowerCase()] || "ASC",
      actualNulls[result[2].toLowerCase()] || "LAST",
    );
  }
}