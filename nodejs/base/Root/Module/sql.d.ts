/**
 * This file contains the sql functionaly that is used within modules in order to perform
 * queries within the module itself as well as to define the parent module table that is
 * to be used in the item definition for properties in common
 *
 * @packageDocumentation
 */
import { IOrderByRuleType } from "../../../constants";
import Module from ".";
import { ISQLTableDefinitionType, ISQLSchemaDefinitionType, ISQLTableRowValue, ISQLStreamComposedTableRowValue } from "../sql";
import Knex from "knex";
import { IGQLRequestFields, IGQLValue, IGQLArgs } from "../../../gql-querier";
import pkgcloud from "pkgcloud";
/**
 * Provides the table that is necesary to include this module and all
 * its children child definitions into it
 * @param mod the module in question
 * @returns a whole table schema for the module table
 */
export declare function getSQLTableDefinitionForModule(knex: Knex, mod: Module): ISQLTableDefinitionType;
/**
 * Provides the SQL table schemas that are contained
 * within this module, you expect one schema per item definition
 * it contains
 * @param mod the module in question
 * @returns a partial database schema for the module itself, all the child modules, and the item definition
 */
export declare function getSQLTablesSchemaForModule(knex: Knex, mod: Module): ISQLSchemaDefinitionType;
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
export declare function convertGQLValueToSQLValueForModule(knex: Knex, serverData: any, mod: Module, data: IGQLArgs, oldData: IGQLValue, uploadsContainer: pkgcloud.storage.Container, uploadsPrefix: string, dictionary: string, partialFields?: IGQLRequestFields | IGQLArgs | IGQLValue): ISQLStreamComposedTableRowValue;
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
export declare function convertSQLValueToGQLValueForModule(knex: Knex, serverData: any, mod: Module, row: ISQLTableRowValue, graphqlFields: IGQLRequestFields): IGQLValue;
/**
 * Builds a sql query specific for this module to search
 * within itself in the database
 * @param mod the module in question
 * @param data the data for the query from graphql
 * @param knexBuilder the knex builder
 * @param dictionary the dictionary used
 */
export declare function buildSQLQueryForModule(knex: Knex, serverData: any, mod: Module, args: IGQLArgs, knexBuilder: Knex.QueryBuilder, dictionary: string, search: string, orderBy: IOrderByRuleType): [string, any[]][];
