/**
 * This file specifies all the sql executions functions that are used in order
 * to query item definitions from the postgresql database, refer to this file
 * once you need to figure out how resources are requested
 *
 * @packageDocumentation
 */
import { IOrderByRuleType } from "../../../../constants";
import ItemDefinition from ".";
import { ISQLTableDefinitionType, ISQLSchemaDefinitionType, ISQLTableRowValue, ISQLStreamComposedTableRowValue } from "../../sql";
import Knex from "knex";
import { IGQLValue, IGQLRequestFields, IGQLArgs } from "../../../../gql-querier";
import pkgcloud from "pkgcloud";
/**
 * Provides the table that is necesary to include this item definition as a whole
 * that is, this represents a whole table, that is necessary for this item to
 * be saved when populated, it basically adds up all the table bits
 * from all the properties and all the items, this does not include
 * prop extensions nor module level properties, nor base
 * @param itemDefinition the item definition in question
 * @returns a complete table definition type
 */
export declare function getSQLTableDefinitionForItemDefinition(itemDefinition: ItemDefinition): ISQLTableDefinitionType;
/**
 * Provides all the schema of all the items, self and its children
 * that are included within this item definition and all the table names
 * that should be used using the qualified name
 * @param itemDefinition the item definition in question
 * @returns a partial sql schema definition for the whole database (adds tables)
 */
export declare function getSQLTablesSchemaForItemDefinition(itemDefinition: ItemDefinition): ISQLSchemaDefinitionType;
/**
 * Converts a SQL value directly coming from the database as it is
 * to a graphql value for this specific item definition,
 * this includes the prop extensions and the reserved base properties
 * This value is FLATTENED
 * @param itemDefinition the item definition in question
 * @param row the row value, with all the columns it has; the row
 * can be overblown with other field data, this will extract only the
 * data required for this item definition
 * @param graphqlFields contains the only properties that are required
 * in the request provided by grapql fields,
 * eg {id: {}, name: {}, ITEM_kitten: {purrs: {}}}
 * @returns a graphql value
 */
export declare function convertSQLValueToGQLValueForItemDefinition(itemDefinition: ItemDefinition, row: ISQLTableRowValue, graphqlFields?: IGQLRequestFields): IGQLValue;
/**
 * Converts a graphql value, with all its items and everything it
 * has into a SQL row data value for this specific item definition
 * it doesn't include its prop extensions
 * @param itemDefinition the item definition in question
 * @param data the graphql data
 * @param knex the knex instance
 * @param uploadsContainer the uploads container from openstack
 * @param dictionary the dictionary to use in full text search mode
 * @param partialFields fields to make a partial value rather than a total
 * value, note that we don't recommend using partial fields in order to create
 * because some properties might treat nulls in a fancy way, when creating
 * all the table rows should be set, only when updating you should use
 * partial fields; for example, if you have a field that has a property
 * that is nullable but it's forced into some value it will be ignored
 * in a partial field value, don't use partial fields to create
 * @returns a sql value
 */
export declare function convertGQLValueToSQLValueForItemDefinition(itemDefinition: ItemDefinition, data: IGQLArgs, oldData: IGQLValue, knex: Knex, uploadsContainer: pkgcloud.storage.Container, dictionary: string, partialFields?: IGQLRequestFields | IGQLArgs | IGQLValue): ISQLStreamComposedTableRowValue;
/**
 * Builds a sql query for an item definition so that it can be
 * queried for searches
 * @param itemDefinition the item definition that is being requested (normal form)
 * @param args the args from the search mode
 * @param knexBuilder the knex builder instance
 * @param dictionary the dictionary being used
 */
export declare function buildSQLQueryForItemDefinition(itemDefinition: ItemDefinition, args: IGQLArgs, knexBuilder: Knex.QueryBuilder, dictionary: string, search: string, orderBy: IOrderByRuleType): [string, any[]][];
