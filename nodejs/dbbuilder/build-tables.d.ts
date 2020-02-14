/**
 * Contains the functionality that is used in order to generate
 * the base structure of the tables and the database itself, by
 * morphing SQL schemas into one another
 *
 * @packageDocumentation
 */
import Knex from "knex";
import { ISQLSchemaDefinitionType, ISQLTableDefinitionType, ISQLColumnDefinitionType } from "../base/Root/sql";
/**
 * Adds a missing column to a table that already exists
 * @param knex the knex instance
 * @param tableName the table name in question
 * @param newColumnName the name of the column
 * @param newColumnSchema the schema of the column
 * @returns the new generated column or null if failed to generate
 */
export declare function addMissingColumnToTable(knex: Knex, tableName: string, newColumnName: string, newColumnSchema: ISQLColumnDefinitionType): Promise<ISQLColumnDefinitionType>;
/**
 * Drops a column in a table that does not exist in the new schema
 * but existed in the previous schema
 * @param knex the knex instance
 * @param tableName the table in question
 * @param currentColumnName the column name in question
 * @param currentColumnSchema the column schema to drop
 * @returns the result of dropping the column, usually null, but the column schema itself if cancelled
 */
export declare function dropExtraColumnInTable(knex: Knex, tableName: string, currentColumnName: string, currentColumnSchema: ISQLColumnDefinitionType): Promise<ISQLColumnDefinitionType>;
/**
 * Updates a column in a table
 * @param knex the knex instance
 * @param tableName the table name in question
 * @param columnName the column name
 * @param newColumnSchema the new column schema
 * @param currentColumnSchema the current column schema
 * @returns the updated result if managed
 */
export declare function updateColumnInTable(knex: Knex, tableName: string, columnName: string, newColumnSchema: ISQLColumnDefinitionType, currentColumnSchema: ISQLColumnDefinitionType): Promise<ISQLColumnDefinitionType>;
/**
 * Creates a table in the database
 * @param knex the knex instance
 * @param tableName the table name that needs to be created
 * @param newTableSchema the new table schema
 * @returns a promise for the actual table that was built or null if not added
 */
export declare function createTable(knex: Knex, tableName: string, newTableSchema: ISQLTableDefinitionType): Promise<ISQLTableDefinitionType>;
/**
 * Updates a table that has changed from one form
 * to another
 * @param knex the knex instance
 * @param tableName the table name to update
 * @param newTableSchema the new schema
 * @param currentTableSchema the current schema
 * @returns the actual schema it managed to generate
 */
export declare function updateTable(knex: Knex, tableName: string, newTableSchema: ISQLTableDefinitionType, currentTableSchema: ISQLTableDefinitionType): Promise<ISQLTableDefinitionType>;
/**
 * Drops a table in the database that should not exist anymore
 * but according to the previous schema exists
 * @param knex the knex instance
 * @param tableName the table to drop
 * @param currentTableSchema the schema of the table to drop
 * @returns the result of dropping the table, usually null, unless cancelled
 */
export declare function dropTable(knex: Knex, tableName: string, currentTableSchema: ISQLTableDefinitionType): Promise<ISQLTableDefinitionType>;
/**
 * This function actually does the database calls
 * @param knex the knex instance
 * @param currentDatabaseSchema the previous latest migration config that shows
 * the current state of the database
 * @param newDatabaseSchema the new migration config we expect to apply (and we would modify if it changes)
 * @returns a promise with the definition that was actually built
 */
export declare function buildTables(knex: Knex, currentDatabaseSchema: ISQLSchemaDefinitionType, newDatabaseSchema: ISQLSchemaDefinitionType): Promise<ISQLSchemaDefinitionType>;
