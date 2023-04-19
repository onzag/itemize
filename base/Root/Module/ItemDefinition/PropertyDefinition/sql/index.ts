/**
 * Contains SQL helper functions to be used within the property definition in order
 * to be able to perform searches of them in the database
 *
 * @module
 */

import {
  ISQLArgInfo, ISQLInInfo, ISQLOutInfo,
  ISQLSearchInfo, ISQLEqualInfo, ISQLBtreeIndexableInfo, ISQLOrderByInfo, IElasticSearchInfo, IArgInfo
} from "../types";
import PropertyDefinition from "../../PropertyDefinition";
import {
  ISQLTableRowValue, ISQLTableDefinitionType, ISQLStreamComposedTableRowValue,
  ConsumeStreamsFnType, ISQLTableIndexType, IElasticIndexDefinitionType
} from "../../../../sql";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../search-interfaces";
import ItemDefinition from "../..";
import Include from "../../Include";
import { processFileListFor, processSingleFileFor } from "./file-management";
import { IGQLArgs, IGQLValue } from "../../../../../../gql-querier";
import { MAX_DECIMAL_COUNT, SQL_CONSTRAINT_PREFIX } from "../../../../../../constants";
import Module from "../../..";
import StorageProvider from "../../../../../../server/services/base/StorageProvider";
import { WhereBuilder } from "../../../../../../database/WhereBuilder";
import { OrderByBuilder } from "../../../../../../database/OrderByBuilder";
import type { ElasticQueryBuilder } from "../../../../../../server/elastic";
import type { IAppDataType } from "../../../../../../server";

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

export function getStandardElasticFor(
  type: string,
  nullValue: any,
  format?: string,
  disabled?: boolean,
): (arg: IArgInfo) => IElasticIndexDefinitionType {
  return (arg: IArgInfo) => {
    if (disabled) {
      return {
        properties: {
          [arg.prefix + arg.id]: {
            enabled: false,
          }
        }
      }
    }

    const value: any = {
      // the type is defined
      type,
      null_value: nullValue,
    };
    if (format) {
      value.format = format;
    }
    return {
      properties: { [arg.prefix + arg.id]: value },
    }
  }
}

export function getStandardElasticForWithNullField(
  type: string,
  format?: string,
  disabled?: boolean,
): (arg: IArgInfo) => IElasticIndexDefinitionType {
  return (arg: IArgInfo) => {
    const value: any = {
      // the type is defined
      type,
    };
    if (format) {
      value.format = format;
    }
    if (disabled) {
      value.enabled = false;
    }
    return {
      properties: {
        [arg.prefix + arg.id]: value,
        [arg.prefix + arg.id + "_NULL"]: {
          type: "boolean",
        }
      },
    }
  }
}

/**
 * the standard order by functionality
 * @param arg the orer by info arg
 * @returns an array of string with the order by
 */
export function standardSQLOrderBy(arg: ISQLOrderByInfo) {
  return [arg.prefix + arg.id, arg.direction, arg.nulls] as [string, string, string];
}

export function standardElasticOrderBy(arg: ISQLOrderByInfo) {
  return {
    [arg.prefix + arg.id]: arg.direction,
  }
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
 * @ignore
 */
const dateTypes = ["date", "datetime", "time"];

/**
 * The standard sql in function that specifies how a property inputs its value
 * into a table
 * @param arg the in arg
 * @returns the partial row value
 */
export function standardSQLInFn(arg: ISQLInInfo): ISQLTableRowValue {
  // special case for non-standard now as a value
  // for the field
  if (
    arg.value === "now" &&
    dateTypes.includes(arg.property.getType())
  ) {
    return {
      [arg.prefix + arg.id]: ["NOW()", []],
    }
  }

  if (typeof arg.value === "undefined") {
    throw new Error("Invalid value SQL IN in must not be undefined in " + arg.property.getId());
  }

  if (typeof arg.value === "number") {
    let maxDecimalCount = arg.property.getMaxDecimalCount();
    if (maxDecimalCount > MAX_DECIMAL_COUNT) {
      maxDecimalCount = MAX_DECIMAL_COUNT;
    }
    const decimalCount = (arg.value.toString().split(".")[1] || "").length;
    if (decimalCount > maxDecimalCount) {
      return {
        [arg.prefix + arg.id]: Math.round(arg.value * (10 ** maxDecimalCount)) / (10 ** maxDecimalCount),
      };
    }
  }
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
  if (typeof arg.value === "undefined") {
    throw new Error("Invalid value SQL IN in must not be undefined in " + arg.property.getId());
  }
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
export function standardSQLOutFn(fallbackNull: any, arg: ISQLOutInfo): any {
  let value = arg.row[arg.prefix + arg.id];

  if (typeof value === "number") {
    let maxDecimalCount = arg.property.getMaxDecimalCount();
    if (maxDecimalCount > MAX_DECIMAL_COUNT) {
      maxDecimalCount = MAX_DECIMAL_COUNT;
    }
    const decimalCount = (value.toString().split(".")[1] || "").length;
    if (decimalCount > maxDecimalCount) {
      value = Math.round(value * (10 ** maxDecimalCount)) / (10 ** maxDecimalCount);
    }
  }

  if (
    (
      typeof value === "undefined" ||
      value === null
    ) && !arg.property.isNullable()
  ) {
    const def = arg.property.getDefaultValue();
    if (def !== null) {
      return def;
    }
    return fallbackNull;
  }

  // just in case I can imagine an edge case with passwords
  // where the password is in elastic where it is not stored
  // and then the conversion is attempted into a search
  // technically these values can be retrieved
  // but that won't work with passwords
  return typeof value === "undefined" ? null : value;
}

/**
 * The standard sql elastic out that converts to the elastic
 * stored form
 * @param arg the out arg info
 * @returns the property value out
 */
export function standardSQLElasticInFn(arg: ISQLOutInfo): any {
  return {
    [arg.prefix + arg.id]: arg.row[arg.prefix + arg.id]
  };
}

/**
 * The standard sql out function that deserializes values
 * as they are expected to be stored serialized
 * @param arg the sql out info arg
 * @returns the supported type json parsed
 */
export function standardSQLOutWithJSONParseFn(fallbackNull: any, arg: ISQLOutInfo): any {
  if (arg.row[arg.prefix + arg.id] === null) {
    if (!arg.property.isNullable()) {
      const def = arg.property.getDefaultValue();
      if (def !== null) {
        return def;
      }
      return fallbackNull;
    }
    return null;
  }

  try {
    return JSON.parse(arg.row[arg.prefix + arg.id]);
  } catch {
    if (!arg.property.isNullable()) {
      const def = arg.property.getDefaultValue();
      if (def !== null) {
        return def;
      }
      return fallbackNull;
    }
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
  } else if (arg.args[exactName] === null) {
    arg.whereBuilder.andWhereColumnNull(arg.prefix + arg.id);
    searchedByIt = true;
  }

  // we will try to force an exact search if from and to are equal
  let alreadyUsedTo = false;
  if (typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null) {
    if (arg.args[fromName] === arg.args[toName]) {
      alreadyUsedTo = true;
      arg.whereBuilder.andWhereColumn(arg.prefix + arg.id, arg.args[fromName] as any);
    } else {
      arg.whereBuilder.andWhereColumn(arg.prefix + arg.id, ">=", arg.args[fromName] as any);
    }
    searchedByIt = true;
  }

  if (!alreadyUsedTo && typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null) {
    arg.whereBuilder.andWhereColumn(arg.prefix + arg.id, "<=", arg.args[toName] as any);
    searchedByIt = true;
  }

  return searchedByIt;
}

function internalElasticSeachFn(arg: IElasticSearchInfo, nullFieldValue: string, nullStyle: boolean) {
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + arg.prefix + arg.id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + arg.prefix + arg.id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + arg.prefix + arg.id;
  let searchedByIt: boolean = false;

  if (typeof arg.args[exactName] !== "undefined" && arg.args[exactName] !== null) {
    arg.elasticQueryBuilder.mustTerm({
      [arg.prefix + arg.id]: arg.args[exactName] as any,
    }, arg.boost);
    searchedByIt = true;
  } else if (arg.args[exactName] === null) {
    if (!nullStyle) {
      arg.elasticQueryBuilder.mustTerm({
        [arg.prefix + arg.id]: nullFieldValue,
      }, arg.boost);
    } else {
      arg.elasticQueryBuilder.mustTerm({
        [arg.prefix + arg.id + "_NULL"]: true,
      }, arg.boost);
    }
    searchedByIt = true;
  }

  const hasToDefined = typeof arg.args[toName] !== "undefined" && arg.args[toName] !== null;
  const hasFromDefined = typeof arg.args[fromName] !== "undefined" && arg.args[fromName] !== null;

  if (hasToDefined || hasFromDefined) {
    // check if they are equal to prevent using range
    if (arg.args[fromName] === arg.args[toName]) {
      arg.elasticQueryBuilder.mustTerm({
        [arg.prefix + arg.id]: arg.args[fromName] as any,
      }, arg.boost);
    } else {
      const rule: any = {};
      if (hasFromDefined) {
        rule.gte = arg.args[fromName];
      }
      if (hasToDefined) {
        rule.lte = arg.args[toName];
      }

      if (!nullStyle) {
        arg.elasticQueryBuilder.must({
          bool: {
            must: [
              {
                range: {
                  [arg.prefix + arg.id]: rule,
                },
              }
            ],
            must_not: [
              {
                term: {
                  [arg.prefix + arg.id]: nullFieldValue,
                }
              }
            ],
            boost: arg.boost,
          }
        });
      } else {
        arg.elasticQueryBuilder.must({
          range: {
            [arg.prefix + arg.id]: rule,
          },
        }, arg.boost);
      }

      searchedByIt = true;
    }
  }

  return searchedByIt ? {} : null;
}

/**
 * You must ensure no overlap in ranged search, if they are availbe in order
 * for this function to be useful, it will not pluck them out
 * @param nullFieldValue 
 * @param arg 
 * @returns 
 */
export function standardElasticSearchFnExactAndRange(nullFieldValue: string, arg: IElasticSearchInfo) {
  return internalElasticSeachFn(arg, nullFieldValue, false);
}

export function standardElasticSearchFnWithNullFieldExactAndRange(arg: IElasticSearchInfo) {
  return internalElasticSeachFn(arg, null, true);
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
    appData: null,
  });
}

export function getElasticSchemaForProperty(
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  serverData: any,
  appData: IAppDataType,
): IElasticIndexDefinitionType {
  const elasticFn = propertyDefinition.getPropertyDefinitionDescription().elastic;
  if (elasticFn) {
    return elasticFn({
      prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
      id: propertyDefinition.getId(),
      property: propertyDefinition,
      itemDefinition,
      include,
      serverData,
      appData,
    });
  }

  return {
    properties: {},
  };
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
  appData: IAppDataType,
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
    appData,
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

export function convertSQLValueToElasticSQLValueForProperty(
  serverData: any,
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  row: ISQLTableRowValue,
): IGQLValue {
  const sqlElasticIn = propertyDefinition.getPropertyDefinitionDescription().sqlElasticIn;
  let value = sqlElasticIn({
    row,
    prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
    serverData,
    itemDefinition,
    include,
    property: propertyDefinition,
    id: propertyDefinition.getId(),
    appData,
  });
  return value;
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
  appData: IAppDataType,
  mod: Module,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  data: IGQLArgs,
  oldData: IGQLValue,
  uploadsClient: StorageProvider<any>,
  domain: string,
  language: string | ISQLTableRowValue,
  dictionary: string | ISQLTableRowValue,
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
      appData,
      itemDefinition,
      include,
      property: propertyDefinition,
      id: propertyDefinition.getId(),
      language,
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
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
  whereBuilder: WhereBuilder,
  language: string,
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
    language,
    dictionary,
    isOrderedByIt,
    property: propertyDefinition,
    appData,
  });
}

/**
 * Builds a sql search query from a given property definition, the data
 * coming from the search module, a sql prefix to use
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param elasticQueryBuilder the elastic building instance
 * @param dictionary the dictionary that is being used
 * @param isOrderedByIt whether there will be a subsequent order by request
 */
export function buildElasticQueryForProperty(
  serverData: any,
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
  elasticQueryBuilder: ElasticQueryBuilder,
  language: string,
  dictionary: string,
  isOrderedByIt: boolean,
) {
  const searchFn = propertyDefinition.getPropertyDefinitionDescription().elasticSearch;
  if (searchFn) {
    return searchFn({
      serverData,
      itemDefinition,
      args,
      prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
      id: propertyDefinition.getId(),
      elasticQueryBuilder,
      language,
      dictionary,
      isOrderedByIt,
      property: propertyDefinition,
      boost: propertyDefinition.getSearchBoost(),
      appData,
    });
  }

  return null;
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
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
  search: string,
  whereBuilder: WhereBuilder,
  language: string,
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
      language,
      dictionary,
      isOrderedByIt,
      property: propertyDefinition,
      appData,
    });
  }

  return false;
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
 * @param elasticQueryBuilder the building instance
 * @param dictionary the dictionary that is being used
 * @param isOrderedByIt whether there will be a subsequent order by request
 */
export function buildElasticStrSearchQueryForProperty(
  serverData: any,
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
  search: string,
  elasticQueryBuilder: ElasticQueryBuilder,
  language: string,
  dictionary: string,
  isOrderedByIt: boolean,
) {
  const searchFn = propertyDefinition.getPropertyDefinitionDescription().elasticStrSearch;
  if (searchFn) {
    return searchFn({
      serverData,
      itemDefinition,
      search,
      prefix: include ? include.getPrefixedQualifiedIdentifier() : "",
      id: propertyDefinition.getId(),
      elasticQueryBuilder,
      language,
      dictionary,
      isOrderedByIt,
      property: propertyDefinition,
      boost: propertyDefinition.getSearchBoost(),
      appData,
    });
  }

  return null;
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
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
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
      args,
      appData,
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
 * Builds an order by query for a given property
 * @param serverData the server data that is being used
 * @param itemDefinition the item definition in question
 * @param include the include (or null)
 * @param propertyDefinition the property in question
 * @param direction the direction to be accounted for
 * @param nulls the nulls (first or last)
 * @param wasIncludedInSearch whether this property was included in search
 * @param wasIncludedInStrSearch whether this property was included in the str FTS search
 */
export function buildElasticOrderByForProperty(
  serverData: any,
  appData: IAppDataType,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  args: IGQLArgs,
  direction: "asc" | "desc",
  nulls: "first" | "last",
  wasIncludedInSearch: boolean,
  wasIncludedInStrSearch: boolean,
) {
  // first we need to check whether there's even a sql order by function
  const elasticSort = propertyDefinition.getPropertyDefinitionDescription().elasticSort;
  // if we have one
  if (elasticSort) {
    // we call it
    const result = elasticSort({
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
      args,
      appData,
    });

    return result || null;
  }

  return null;
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
  args: IGQLArgs,
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
    appData: null,
    args,
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

/**
 * Builds the order by functionality for the internal properties, such as
 * created_at, edited_at, etc...
 * @param itemDefinition the item definition
 * @param which basically the column name
 * @param direction the direction of the order by rule
 * @param nulls whether nulls are first or last
 */
export function buildElasticOrderByForInternalRequiredProperty(
  itemDefinition: ItemDefinition,
  which: string,
  args: IGQLArgs,
  direction: "asc" | "desc",
  nulls: "first" | "last",
) {
  // so we call our standard function
  const result = standardElasticOrderBy({
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
    appData: null,
    args,
  });

  return result || null;
}