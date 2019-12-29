import { CONNECTOR_SQL_COLUMN_FK_NAME, RESERVED_BASE_PROPERTIES } from "../../../../constants";
import {
  convertSQLValueToGQLValueForProperty,
  getSQLTableDefinitionForProperty,
  convertGQLValueToSQLValueForProperty,
  buildSQLQueryForProperty,
} from "./PropertyDefinition/sql";
import ItemDefinition from ".";
import {
  getSQLTableDefinitionForItem,
  convertSQLValueToGQLValueForItem,
  convertGQLValueToSQLValueForItem,
  buildSQLQueryForItem,
} from "./Item/sql";
import { ISQLTableDefinitionType, ISQLSchemaDefinitionType, ISQLTableRowValue } from "../../sql";
import { IGQLValue } from "../../gql";
import Knex from "knex";

/**
 * Provides the table that is necesary to include this item definition as a whole
 * that is, this represents a whole table, that is necessary for this item to
 * be saved when populated, it basically adds up all the table bits
 * from all the properties and all the items, this does not include
 * prop extensions nor module level properties, nor base
 * @param itemDefinition the item definition in question
 */
export function getSQLTableDefinitionForItemDefinition(itemDefinition: ItemDefinition): ISQLTableDefinitionType {
  // add all the standard fields
  let resultTableSchema: ISQLTableDefinitionType = {
    [CONNECTOR_SQL_COLUMN_FK_NAME]: {
      type: "integer",
      notNull: true,
      fkTable: itemDefinition.getParentModule().getQualifiedPathName(),
      fkCol: "id",
      fkAction: "cascade",
    },
  };

  // now we loop thru every property (they will all become columns)
  itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
    resultTableSchema = {
      ...resultTableSchema,
      ...getSQLTableDefinitionForProperty(pd),
    };
  });

  // now we loop over the child items
  itemDefinition.getAllItems().forEach((i) => {
    resultTableSchema = { ...resultTableSchema, ...getSQLTableDefinitionForItem(i) };
  });

  return resultTableSchema;
}

/**
 * Provides all the schema of all the items, self and its children
 * that are included within this item definition and all the table names
 * that should be used using the qualified name
 * @param itemDefinition the item definition in question
 */
export function getSQLTablesSchemaForItemDefinition(itemDefinition: ItemDefinition): ISQLSchemaDefinitionType {
  // we add self
  let result = {
    [itemDefinition.getQualifiedPathName()]: getSQLTableDefinitionForItemDefinition(itemDefinition),
  };
  // loop over the children and add each one of them and whatever they have
  itemDefinition.getChildDefinitions().forEach((cIdef) => {
    result = { ...result, ...getSQLTablesSchemaForItemDefinition(cIdef) };
  });
  // return that
  return result;
}

/**
 * Converts a SQL value directly coming from the database as it is
 * to a graphql value for this specific item definition,
 * this includes the prop extensions and the reserved base properties
 * @param itemDefinition the item definition in question
 * @param row the row value, with all the columns it has; the row
 * can be overblown with other field data, this will extract only the
 * data required for this item definition
 * @param graphqlFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}, ITEM_kitten: {purrs: {}}}
 */
export function convertSQLValueToGQLValueForItemDefinition(
  itemDefinition: ItemDefinition,
  row: ISQLTableRowValue,
  graphqlFields?: any,
): IGQLValue {
  // first we create the graphql result
  let result: IGQLValue = {};

  // now we take all the base properties that we have
  // in the graphql model
  Object.keys(RESERVED_BASE_PROPERTIES).filter(
    (baseProperty) => !graphqlFields ? true : graphqlFields[baseProperty],
  ).forEach((basePropertyKey) => {
    result[basePropertyKey] = row[basePropertyKey] || null;
  });

  // we also take all the property definitions we have
  // in this item definitions, and convert them one by one
  // with the row data, this basically also gives graphql value
  // in the key:value format
  itemDefinition.getParentModule().getAllPropExtensions().filter(
    (property) =>  !graphqlFields ? true : graphqlFields[property.getId()],
  ).concat(
    itemDefinition.getAllPropertyDefinitions().filter(
      (property) =>  !graphqlFields ? true : graphqlFields[property.getId()],
    ),
  ).forEach((pd) => {
    result = { ...result, ...convertSQLValueToGQLValueForProperty(pd, row) };
  });

  // now we do the same for the items
  itemDefinition.getAllItems().filter(
    (item) =>  !graphqlFields ? true : graphqlFields[item.getQualifiedIdentifier()],
  ).forEach((item) => {
    result = {
      ...result, ...convertSQLValueToGQLValueForItem(
        item, row,  !graphqlFields ? null : graphqlFields[item.getQualifiedIdentifier()],
      ),
    };
  });

  return result;
}

/**
 * Converts a graphql value, with all its items and everything it
 * has into a SQL row data value for this specific item definition
 * it doesn't include its prop extensions
 * @param itemDefinition the item definition in question
 * @param data the graphql data
 * @param knex the knex instance
 * @param dictionary the dictionary to use in full text search mode
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 */
export function convertGQLValueToSQLValueForItemDefinition(
  itemDefinition: ItemDefinition,
  data: IGQLValue,
  knex: Knex,
  dictionary: string,
  partialFields?: any,
): ISQLTableRowValue {
  // first we create the row value
  let result: ISQLTableRowValue = {};

  // now we get all the property definitions and do the same
  // that we did in the SQLtoGQL but in reverse
  itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
    // we only add if partialFields allows it, or we don't have
    // partialFields set
    if (
      (partialFields && typeof partialFields[pd.getId()] !== "undefined") ||
      !partialFields
    ) {
      result = { ...result, ...convertGQLValueToSQLValueForProperty(pd, data, knex, dictionary, "") };
    }
  });
  // also with the items
  itemDefinition.getAllItems().forEach((item) => {
    // we only add if partialFields allows it, or we don't have
    // partialFields set
    const itemNameInPartialFields = item.getQualifiedIdentifier();
    if (
      (partialFields && typeof partialFields[itemNameInPartialFields] !== "undefined") ||
      !partialFields
    ) {
      const innerPartialFields = !partialFields ? null : partialFields[itemNameInPartialFields];
      result = { ...result, ...convertGQLValueToSQLValueForItem(item, data, knex, dictionary, innerPartialFields) };
    }
  });

  return result;
}

export function buildSQLQueryForItemDefinition(
  itemDefinition: ItemDefinition,
  data: IGQLValue,
  knexBuilder: Knex.QueryBuilder,
  dictionary: string,
) {
  itemDefinition
    .getParentModule()
    .getAllPropExtensions()
    .concat(
      itemDefinition.getAllPropertyDefinitions()).forEach((pd) => {
        if (!pd.isSearchable()) {
          return;
        }

        buildSQLQueryForProperty(pd, data, "", knexBuilder, dictionary);
      });

  itemDefinition.getAllItems().forEach((item) => {
    buildSQLQueryForItem(item, data, knexBuilder, dictionary);
  });
}
