/**
 * This file is in charge of building the postgresql indexes on the database
 * for speeding up things and setting up unique constraints
 *
 * @packageDocumentation
 */
import Knex from "knex";
import { ISQLSchemaDefinitionType } from "../base/Root/sql";
/**
 * Builds all the indexes
 * @param knex the knex instance
 * @param currentDatabaseSchema the current database schema
 * @param newDatabaseSchema the new database schema as requested
 * @returns the resulting database schema and the new current
 */
export declare function buildIndexes(knex: Knex, currentDatabaseSchema: ISQLSchemaDefinitionType, newDatabaseSchema: ISQLSchemaDefinitionType): Promise<ISQLSchemaDefinitionType>;
