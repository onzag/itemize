import { PropertyDefinitionSupportedType } from "./types";
import PropertyDefinition from "../PropertyDefinition";
import { ISQLTableRowValue, ISQLTableDefinitionType } from "../../../sql";
import { IGQLValue } from "../../../gql";
import { PropertyDefinitionSearchInterfacesPrefixes } from "./search-interfaces";
import Knex from "knex";
import ItemDefinition from "..";
import Include from "../Include";
import { processFileListFor, processSingleFileFor } from "./sql-files";

export function getStandardSQLFnFor(type: string):
  (sqlPrefix: string, id: string, property: PropertyDefinition) => ISQLTableDefinitionType {
  return (sqlPrefix: string, id: string, property: PropertyDefinition) => ({
    [sqlPrefix + id]: {
      type,
      index: property.isUnique() ? "unique" : null,
    },
  });
}

export function stardardSQLInFn(
  value: PropertyDefinitionSupportedType,
  sqlPrefix: string,
  id: string,
): ISQLTableRowValue {
  return {
    [sqlPrefix + id]: value,
  };
}

export function stardardSQLInWithJSONStringifyFn(
  value: PropertyDefinitionSupportedType,
  sqlPrefix: string,
  id: string,
): ISQLTableRowValue {
  if (value === null) {
    return {
      [sqlPrefix + id]: null,
    };
  }
  return {
    [sqlPrefix + id]: JSON.stringify(value),
  };
}

export function standardSQLOutFn(
  row: ISQLTableRowValue,
  sqlPrefix: string,
  id: string,
): PropertyDefinitionSupportedType {
  return row[sqlPrefix + id];
}

export function standardSQLOutWithJSONParseFn(
  row: ISQLTableRowValue,
  sqlPrefix: string,
  id: string,
): PropertyDefinitionSupportedType {
  try {
    return JSON.parse(row[sqlPrefix + id]);
  } catch {
    return null;
  }
}

export function standardSQLSearchFnExactAndRange(
  data: IGQLValue,
  sqlPrefix: string,
  id: string,
  knexBuilder: Knex.QueryBuilder,
) {
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;

  if (typeof data[exactName] !== "undefined") {
    knexBuilder.andWhere(sqlPrefix + id, data[exactName]);
  }

  if (typeof data[fromName] !== "undefined" && data[fromName] !== null) {
    knexBuilder.andWhere(sqlPrefix + id, ">=", data[fromName]);
  }

  if (typeof data[toName] !== "undefined" && data[toName] !== null) {
    knexBuilder.andWhere(sqlPrefix + id, "<=", data[toName]);
  }
}

export function standardSQLEqualFn(
  value: PropertyDefinitionSupportedType,
  sqlPrefix: string,
  id: string,
  knex: Knex,
  columnName?: string,
) {
  if (!columnName) {
    return {
      [sqlPrefix + id]: value,
    };
  }

  return knex.raw(
    "?? = ? AS ??",
    [
      sqlPrefix + id,
      value as any,
      columnName,
    ],
  );
}

export function standardSQLLocalEqualFn(
  value: PropertyDefinitionSupportedType,
  sqlPrefix: string,
  id: string,
  data: ISQLTableRowValue,
): boolean {
  return data[sqlPrefix + id] === value;
}

/**
 * Provides the table bit that is necessary to include this property and
 * this property alone, that is a table bit
 * @param propertyDefinition the property definition in question
 * @param prefix a prefix to prefix the table row names, this is
 * used to prefix item specific properties that are sinked in from
 * the parent in the item
 */
export function getSQLTableDefinitionForProperty(
  propertyDefinition: PropertyDefinition,
  prefix?: string,
): ISQLTableDefinitionType {
  const actualPrefix = prefix ? prefix : "";
  // get the sql def based on the property definition
  const sqlDef = propertyDefinition.getPropertyDefinitionDescription().sql;
  // let's get it based on the function it is
  return sqlDef(actualPrefix, propertyDefinition.getId(), propertyDefinition);
}

/**
 * Takes row data information that is in the SQL form and converts
 * it into a graphql form, only for this specific property
 * @param propertyDefinition the property definition in question
 * @param row the row that we want to extract information from
 * @param prefix the prefix, if the information happens to be prefixed
 */
export function convertSQLValueToGQLValueForProperty(
  propertyDefinition: PropertyDefinition,
  row: ISQLTableRowValue,
  prefix?: string,
): IGQLValue {
  // we get an actual prefix, because it's an optional attribute
  const actualPrefix = prefix ? prefix : "";

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
  let colValue = sqlOut(row, actualPrefix, propertyDefinition.getId(), this);

  // we check for null coersion, while this shouldn't really
  // happen, because it should have never saved nulls in the
  // database to begin with, we might have such a case where
  // the value is null, for example, after an update, this will
  // ensure coercion keeps on
  if (
    propertyDefinition.isCoercedIntoDefaultWhenNull() &&
    colValue == null
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
    [propertyDefinition.getId()]: colValue,
  };
}

/**
 * Converts a graphql value into a sql value, that is graphql data into row
 * data to be immediately added to the database as it is
 * @param propertyDefinition the property definition in question
 * @param data the graphql data
 * @param knex the knex instance
 * @param dictionary the dictionary to use in full text search mode
 * @param prefix the prefix, if we need the SQL values to be prefixed, usually
 * used within items, because item properties need to be prefixed
 */
export async function convertGQLValueToSQLValueForProperty(
  transitoryId: string,
  itemDefinition: ItemDefinition,
  include: Include,
  propertyDefinition: PropertyDefinition,
  data: IGQLValue,
  oldData: IGQLValue,
  knex: Knex,
  dictionary: string,
  prefix: string,
): Promise<ISQLTableRowValue> {
  // and this is the value of the property, again, properties
  // are not prefixed, they are either in their own object
  // or in the root
  let gqlPropertyValue = data[propertyDefinition.getId()];

  // we treat undefined as null, and set it to default
  // if it is coerced into null
  if (
    propertyDefinition.isCoercedIntoDefaultWhenNull() &&
    (
      gqlPropertyValue === null ||
      typeof gqlPropertyValue === "undefined"
    )
  ) {
    gqlPropertyValue = propertyDefinition.getDefaultValue();
  }
  // we also got to set to null any undefined value
  if (typeof gqlPropertyValue === "undefined") {
    gqlPropertyValue = null;
  }

  const description = propertyDefinition.getPropertyDefinitionDescription();
  if (description.gqlAddFileToFields) {
    const oldValue = (oldData && oldData[propertyDefinition.getId()]) || null;
    const newValue = gqlPropertyValue;
    if (description.gqlList) {
      gqlPropertyValue = await processFileListFor(
        newValue,
        oldValue,
        transitoryId,
        itemDefinition,
        include,
        propertyDefinition,
      );
    } else {
      gqlPropertyValue = await processSingleFileFor(
        newValue,
        oldValue,
        transitoryId,
        itemDefinition,
        include,
        propertyDefinition,
      );
    }
  }

  // so we need the sql in function, from the property description
  const sqlIn = propertyDefinition.getPropertyDefinitionDescription().sqlIn;

  // we return as it is
  return sqlIn(gqlPropertyValue, prefix, propertyDefinition.getId(), propertyDefinition, knex, dictionary);
}

/**
 * Builds a sql search query from a given property definition, the data
 * coming from the search module, a sql prefix to use, and the knex builder
 * @param propertyDefinition the property definition in question
 * @param data the data coming from the search module, in such format
 * @param sqlPrefix a sql prefix to append say if we refer to an item
 * @param knexBuilder the knex building instance
 */
export function buildSQLQueryForProperty(
  propertyDefinition: PropertyDefinition,
  data: IGQLValue,
  sqlPrefix: string,
  knexBuilder: any,
  dictionary: string,
) {
  const sqlSearchFn = propertyDefinition.getPropertyDefinitionDescription().sqlSearch;
  sqlSearchFn(
    data,
    sqlPrefix,
    propertyDefinition.getId(),
    knexBuilder,
    dictionary,
  );
}
