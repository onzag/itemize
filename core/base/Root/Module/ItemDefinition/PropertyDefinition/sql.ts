import { PropertyDefinitionSupportedType } from "./types";
import PropertyDefinition from "../PropertyDefinition";
import { ISQLTableRowValue, ISQLTableDefinitionType } from "../../../sql";
import { IGQLValue } from "../../../gql";
import { PropertyDefinitionSearchInterfacesPrefixes } from "./search-interfaces";

export function stardardSQLInFn(value: PropertyDefinitionSupportedType, id: string): ISQLTableRowValue {
  return {
    [id]: value,
  };
}

export function standardSQLOutFn(row: ISQLTableRowValue, id: string): PropertyDefinitionSupportedType {
  return row[id];
}

export function standardSQLSearchFnExactAndRange(data: IGQLValue, sqlPrefix: string, id: string, knexBuilder: any) {
  const fromName = PropertyDefinitionSearchInterfacesPrefixes.FROM + id;
  const toName = PropertyDefinitionSearchInterfacesPrefixes.TO + id;
  const exactName = PropertyDefinitionSearchInterfacesPrefixes.EXACT + id;

  if (typeof data[exactName] !== "undefined" && data[exactName] !== null) {
    knexBuilder.andWhere(sqlPrefix + id, data[exactName]);
  }

  if (typeof data[fromName] !== "undefined" && data[fromName] !== null) {
    knexBuilder.andWhere(sqlPrefix + id, ">=", data[exactName]);
  }

  if (typeof data[toName] !== "undefined" && data[toName] !== null) {
    knexBuilder.andWhere(sqlPrefix + id, ">=", data[toName]);
  }
}

export function standardSQLEqualFn(
  value: PropertyDefinitionSupportedType,
  sqlPrefix: string,
  id: string,
  knexBuilder: any,
  columnName: string,
) {
  knexBuilder.select(knexBuilder.raw(
    "?? = ? AS ??",
    sqlPrefix + id,
    value,
    columnName,
  ));
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
  prefix ?: string,
): ISQLTableDefinitionType {
  const resultTableSchema = {};
  const actualPrefix = prefix ? prefix : "";
  // get the sql def based on the property definition
  const sqlDef = propertyDefinition.getPropertyDefinitionDescription().sql;
  // if it's a string, that's the type
  if (typeof sqlDef === "string") {
    resultTableSchema[actualPrefix + propertyDefinition.getId()] = {
      type: sqlDef,
    };
    // otherwise we might have a more complex value
  } else {
    // let's get it based on the function it is
    const complexValue = sqlDef(actualPrefix + propertyDefinition.getId());
    // we are going to loop over that object
    Object.keys(complexValue).forEach((key) => {
      // so we can add each row that it returns to the table schema
      resultTableSchema[key] = {
        type: complexValue[key],
      };
    });
  }
  return resultTableSchema;
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
  const colName = actualPrefix + propertyDefinition.getId();

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
  let colValue = sqlOut(row, colName, this);

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
export function convertGQLValueToSQLValueForProperty(
  propertyDefinition: PropertyDefinition,
  data: IGQLValue,
  knex: any,
  dictionary: string,
  prefix: string,
): ISQLTableRowValue {
  // TODO validation of the value, otherwise invalid values can be manually set,
  // there should be also an overall validation by converting the whole value into
  // a standard value and then validating against that

  // this is where the resulting column should be named
  const resultingColumnName = prefix + propertyDefinition.getId();
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

  // so we need the sql in function, from the property description
  const sqlIn = propertyDefinition.getPropertyDefinitionDescription().sqlIn;

  // we return as it is
  return sqlIn(gqlPropertyValue, resultingColumnName, this, knex, dictionary);
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
