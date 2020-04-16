/**
 * This file contains the sql functionaly that is used within modules in order to perform
 * queries within the module itself as well as to define the parent module table that is
 * to be used in the item definition for properties in common
 *
 * @packageDocumentation
 */

import { RESERVED_BASE_PROPERTIES_SQL, RESERVED_BASE_PROPERTIES } from "../../../constants";
import Module from ".";
import {
  getSQLTableDefinitionForProperty,
  convertGQLValueToSQLValueForProperty,
  convertSQLValueToGQLValueForProperty,
  buildSQLQueryForProperty,
} from "./ItemDefinition/PropertyDefinition/sql";
import { getSQLTablesSchemaForItemDefinition } from "./ItemDefinition/sql";
import { ISQLTableDefinitionType, ISQLSchemaDefinitionType, ISQLTableRowValue, ISQLStreamComposedTableRowValue, ConsumeStreamsFnType } from "../sql";
import Knex from "knex";
import ItemDefinition from "./ItemDefinition";
import { IGQLRequestFields, IGQLValue, IGQLArgs } from "../../../gql-querier";
import pkgcloud from "pkgcloud";

/**
 * Provides the table that is necesary to include this module and all
 * its children child definitions into it
 * @param mod the module in question
 * @returns a whole table schema for the module table
 */
export function getSQLTableDefinitionForModule(mod: Module): ISQLTableDefinitionType {
  // add all the standard fields
  const resultTableSchema: ISQLTableDefinitionType = {
    ...RESERVED_BASE_PROPERTIES_SQL,
  };

  // now we loop thru every property (they will all become columns)
  mod.getAllPropExtensions().forEach((pd) => {
    Object.assign(
      resultTableSchema,
      getSQLTableDefinitionForProperty(pd),
    );
  });

  return resultTableSchema;
}

/**
 * Provides the SQL table schemas that are contained
 * within this module, you expect one schema per item definition
 * it contains
 * @param mod the module in question
 * @returns a partial database schema for the module itself, all the child modules, and the item definition
 */
export function getSQLTablesSchemaForModule(mod: Module): ISQLSchemaDefinitionType {
  // this is where it will be contained
  const resultSchema = {
    [mod.getQualifiedPathName()]: getSQLTableDefinitionForModule(mod),
  };
  mod.getAllModules().forEach((cModule) => {
    // first with child modules
    Object.assign(
      resultSchema,
      getSQLTablesSchemaForModule(cModule),
    );
  });
  // then with child item definitions
  mod.getAllChildItemDefinitions().forEach((cIdef) => {
    Object.assign(
      resultSchema,
      getSQLTablesSchemaForItemDefinition(cIdef),
    );
  });
  return resultSchema;
}

/**
 * Converts a graphql value, with all its items and everything it
 * has into a SQL row data value for this specific module
 * @param mod the module in question
 * @param data the graphql data
 * @param knex the knex instance
 * @param uploadsContainer the uploads container from openstack
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 * @returns a promise for a row value
 */
export function convertGQLValueToSQLValueForModule(
  mod: Module,
  itemDefinition: ItemDefinition,
  data: IGQLArgs,
  oldData: IGQLValue,
  knex: Knex,
  uploadsContainer: pkgcloud.storage.Container,
  dictionary: string,
  partialFields?: IGQLRequestFields | IGQLArgs | IGQLValue,
): ISQLStreamComposedTableRowValue {
  // first we create the row value
  const result: ISQLTableRowValue = {};
  const consumeStreamsFns: ConsumeStreamsFnType[] = []

  mod.getAllPropExtensions().forEach((pd) => {
    // we only add if partialFields allows it, or we don't have
    // partialFields set
    if (
      (partialFields && typeof partialFields[pd.getId()] !== "undefined") ||
      !partialFields
    ) {
      const addedFieldsByProperty = convertGQLValueToSQLValueForProperty(
        itemDefinition, null, pd, data, oldData, knex, uploadsContainer, dictionary, "",
      );
      Object.assign(
        result,
        addedFieldsByProperty.value,
      );
      consumeStreamsFns.push(addedFieldsByProperty.consumeStreams)
    }
  });

  return {
    value: result,
    consumeStreams: async (containerId: string) => {
      await Promise.all(consumeStreamsFns.map(fn => fn(containerId)));
    }
  };
}

/**
 * Converts a SQL value directly coming from the database as it is
 * to a graphql value for this specific module, this
 * only includes prop extensions and standard properties
 * and excludes everything else
 * @param mod the module in question
 * @param row the row value, with all the columns it has; the row
 * can be overblown with other field data, this will extract only the
 * data required for this module
 * @param graphqlFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}}
 * @returns a graphql value
 */
export function convertSQLValueToGQLValueForModule(
  mod: Module,
  row: ISQLTableRowValue,
  graphqlFields: IGQLRequestFields,
): IGQLValue {
  // first we create the graphql result
  const result: IGQLValue = {};

  // now we take all the base properties that we have
  // in the graphql model
  Object.keys(RESERVED_BASE_PROPERTIES).forEach((basePropertyKey) => {
    result[basePropertyKey] = row[basePropertyKey] || null;
  });

  // we also take all the property definitions we have
  // in this item definitions, and convert them one by one
  // with the row data, this basically also gives graphql value
  // in the key:value format
  mod.getAllPropExtensions().filter(
    (property) => graphqlFields[property.getId()],
  ).forEach((pd) => {
    Object.assign(
      result,
      convertSQLValueToGQLValueForProperty(pd, row),
    );
  });

  return result;
}

/**
 * Builds a sql query specific for this module to search
 * within itself in the database
 * @param mod the module in question
 * @param data the data for the query from graphql
 * @param knexBuilder the knex builder
 * @param dictionary the dictionary used
 */
export function buildSQLQueryForModule(
  mod: Module,
  data: IGQLValue,
  knexBuilder: Knex.QueryBuilder,
  dictionary: string,
) {
  mod.getAllPropExtensions().forEach((pd) => {
    if (!pd.isSearchable()) {
      return;
    }

    buildSQLQueryForProperty(pd, data, "", knexBuilder, dictionary);
  });
}
