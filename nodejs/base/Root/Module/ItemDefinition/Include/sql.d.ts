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
import pkgcloud from "pkgcloud";
/**
 * Provides the table bit that is necessary to store include data
 * for this include when included from the parent definition
 * @param include the include in question
 * @returns the partial table definition schema for the include
 */
export declare function getSQLTableDefinitionForInclude(include: Include): ISQLTableDefinitionType;
/**
 * Given a SQL row it converts the value of the data contained
 * within that row into the valid graphql value for that data
 * @param include the include in question
 * @param row the row sql data
 * @param graphqlFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}}
 * @returns a partial graphql value
 */
export declare function convertSQLValueToGQLValueForInclude(include: Include, row: ISQLTableRowValue, graphqlFields?: any): IGQLValue;
/**
 * Converts a GraphQL value into a SQL row data, it takes apart a complex
 * graphql value and converts it into a serializable sql form
 * @param transitoryId the transitory id where things are stored
 * @param itemDefinition the item definition in question
 * @param include the include in question
 * @param data the graphql data value
 * @param knex the knex instance
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
export declare function convertGQLValueToSQLValueForInclude(itemDefinition: ItemDefinition, include: Include, data: IGQLArgs, oldData: IGQLValue, knex: Knex, uploadsContainer: pkgcloud.storage.Container, dictionary: string, partialFields?: any): ISQLStreamComposedTableRowValue;
/**
 * Builds a sql query for an include
 * @param include the include in question
 * @param args the args as they come from the search module, specific for this item (not nested)
 * @param knexBuilder the knex query builder
 * @param dictionary the dictionary to use to build the search
 */
export declare function buildSQLQueryForInclude(include: Include, args: IGQLArgs, knexBuilder: Knex.QueryBuilder, dictionary: string): void;
