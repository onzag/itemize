/**
 * This file contains the sql functionaly that is used within modules in order to perform
 * queries within the module itself as well as to define the parent module table that is
 * to be used in the item definition for properties in common
 *
 * @packageDocumentation
 */

import { RESERVED_BASE_PROPERTIES_SQL, RESERVED_BASE_PROPERTIES, COMBINED_INDEX } from "../../../constants";
import Module from ".";
import {
  getSQLTableDefinitionForProperty,
  convertGQLValueToSQLValueForProperty,
  convertSQLValueToGQLValueForProperty,
  buildSQLQueryForProperty,
  buildSQLStrSearchQueryForProperty,
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
  // first we need to calculate the initial combined and added indexes
  // these are the indexes that get added to the standard module fields
  // we don't want indexes that won't be used in search so we want to check
  // what the rules are regarding the added indexes in the limiters
  const initialCombinedIndexes: string[] = [];
  const initialAddedIndexes: string[] = [];

  // so we recieve the limiters from the module itself
  const limiters = mod.getRequestLimiters();
  // now we need to check if we have an AND type limiter, which creates
  // combined indexes
  if (limiters && limiters.condition === "AND") {
    // if the limiter has a created at factor
    if (limiters.since) {
      // we request a combined index on it, created_at goes first
      initialCombinedIndexes.push("created_at");
    }
    // if the limitr has a created_by
    if (limiters.createdBy) {
      initialCombinedIndexes.push("created_by");
    }
    // for the partent that one comes last
    if (limiters.parenting) {
      initialCombinedIndexes.push("parent_id");
      initialCombinedIndexes.push("parent_version");
      initialCombinedIndexes.push("parent_type");
    }
  } else if (limiters) {
    // now we add OR type limiters, these are basically
    // independent so the order doesn't really matter that
    // we are adding these
    if (limiters.since) {
      initialAddedIndexes.push("created_at");
    }
    if (limiters.createdBy) {
      initialAddedIndexes.push("created_by");
    }
    if (limiters.parenting) {
      initialAddedIndexes.push("parent_id");
      initialAddedIndexes.push("parent_version");
      initialAddedIndexes.push("parent_type");
    }
  }

  // add all the standard fields
  const resultTableSchema: ISQLTableDefinitionType = {
    ...RESERVED_BASE_PROPERTIES_SQL(initialCombinedIndexes, initialAddedIndexes),
  };

  // now we loop thru every property (they will all become columns)
  mod.getAllPropExtensions().forEach((pd) => {
    Object.assign(
      resultTableSchema,
      getSQLTableDefinitionForProperty(pd),
    );
  });

  // now we need to add indexes to custom rules
  if (limiters && limiters.custom) {
    // if we have a powerful AND limiter
    if (limiters.condition === "AND") {
      // we need to offset to the index that we have currently added
      // these might be zero
      let indexCombinedOffset = initialCombinedIndexes.length;
      // now we loop over the rows we plan to index
      limiters.custom.forEach((propertyId: string) => {
        // we get the property
        const property = mod.getPropExtensionFor(propertyId);
        // and the columns that are expected to be added to the combined index
        const columnsToAddLimiter = property.getPropertyDefinitionDescription().sqlBtreeIndexable("", propertyId);
        if (columnsToAddLimiter) {
          columnsToAddLimiter.forEach((columnName: string, index: number) => {
            resultTableSchema[columnName].index = {
              id: COMBINED_INDEX,
              type: "btree",
              level: indexCombinedOffset + index,
            }
          });
          indexCombinedOffset += columnsToAddLimiter.length;
        }
      });
    } else {
      // otherwise if it's an OR we add these custom singular indexes
      limiters.custom.forEach((propertyId: string) => {
        const property = mod.getPropExtensionFor(propertyId);
        const columnsToAddLimiter = property.getPropertyDefinitionDescription().sqlBtreeIndexable("", propertyId);
        if (columnsToAddLimiter) {
          columnsToAddLimiter.forEach((columnName: string, index: number) => {
            resultTableSchema[columnName].index = {
              id: propertyId + "_CUSTOM_INDEX",
              type: "btree",
              level: index,
            }
          });
        }
      });
    }
  }

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
  args: IGQLArgs,
  knexBuilder: Knex.QueryBuilder,
  dictionary: string,
  search: string,
) {
  mod.getAllPropExtensions().forEach((pd) => {
    if (!pd.isSearchable()) {
      return;
    }

    buildSQLQueryForProperty(pd, args, "", knexBuilder, dictionary);
  });

  if (search) {
    knexBuilder.andWhere((builder) => {
      mod.getAllPropExtensions().forEach((pd) => {
        if (!pd.isSearchable()) {
          return;
        }
        builder.orWhere((orBuilder) => {
          buildSQLStrSearchQueryForProperty(pd, args, search, "", orBuilder, dictionary);
        });
      });
    });
  }
}
