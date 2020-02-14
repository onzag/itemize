/**
 * This file is in charge of building the foreign keys of an stablished current database
 * so that references can be respected
 *
 * @packageDocumentation
 */
import Knex from "knex";
import { ISQLSchemaDefinitionType } from "../base/Root/sql";
/**
 * Builds all the foreign keys
 * @param knex the knex instance
 * @param currentDatabaseSchema the current database schema
 * @param newDatabaseSchema the new database schema as requested
 * @returns the resulting database schema and the new current
 */
export declare function buildForeignKeys(knex: Knex, currentDatabaseSchema: ISQLSchemaDefinitionType, newDatabaseSchema: ISQLSchemaDefinitionType): Promise<ISQLSchemaDefinitionType>;
