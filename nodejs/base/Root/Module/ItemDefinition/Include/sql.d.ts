/**
 * This file contains utility functionality that is necessary in order to
 * setup includes into and out of the postgresql database as well
 * as how to build the definition for the tables
 *
 * @packageDocumentation
 */
import Include from "../Include";
import { ISQLTableDefinitionType, ISQLTableRowValue, ISQLStreamComposedTableRowValue } from "../../../sql";
import Knex from "knex";
import ItemDefinition from "..";
import { IGQLValue, IGQLArgs } from "../../../../../gql-querier";
import { CloudClient } from "../../../../../server/cloud";
/**
 * Provides the table bit that is necessary to store include data
 * for this include when included from the parent definition
 * @param kenx the current knex instance
 * @param itemDefinition the item definition that contains the include (not the referred)
 * @param include the include in question
 * @returns the partial table definition schema for the include, prefixed and with the exclusion state
 */
export declare function getSQLTableDefinitionForInclude(knex: Knex, itemDefinition: ItemDefinition, include: Include): ISQLTableDefinitionType;
/**
 * Given a SQL row it converts the value of the data contained
 * within that row into the valid graphql output
 * @param knex the knex instance
 * @param serverData the server data that is currently in use
 * @param include the include in question
 * @param row the row sql data
 * @param graphqlFields (optional) contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}}
 * @returns a partial graphql value
 */
export declare function convertSQLValueToGQLValueForInclude(knex: Knex, serverData: any, itemDefinition: ItemDefinition, include: Include, row: ISQLTableRowValue, graphqlFields?: any): IGQLValue;
/**
 * Converts a GraphQL value into a SQL row data, it takes apart a complex
 * graphql value and converts it into a serializable sql form
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition in question
 * @param include the include in question
 * @param data the graphql data value
 * @param oldData the old graphql data value that used to be stored for that include
 * @param uploadsClient the uploads client
 * @param dictionary the dictionary to use in full text search mode
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 * @returns the partial sql result to be added into the table
 */
export declare function convertGQLValueToSQLValueForInclude(knex: Knex, serverData: any, itemDefinition: ItemDefinition, include: Include, data: IGQLArgs, oldData: IGQLValue, uploadsClient: CloudClient, domain: string, dictionary: string, partialFields?: any): ISQLStreamComposedTableRowValue;
/**
 * Builds a sql query for an include
 * @param knex the knex instance
 * @param serverData the server data information
 * @param itemDefinition the item definition that contains the include
 * @param include the include in question
 * @param args the args as they come from the search module, specific for this item (not nested)
 * @param knexBuilder the knex query builder
 * @param dictionary the dictionary to use to build the search
 */
export declare function buildSQLQueryForInclude(knex: Knex, serverData: any, itemDefinition: ItemDefinition, include: Include, args: IGQLArgs, knexBuilder: Knex.QueryBuilder, dictionary: string): void;
