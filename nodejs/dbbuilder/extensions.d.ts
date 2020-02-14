/**
 * Adds the pgcrypto and the postgis extensions that are necessary if and only if they
 * are deemed necessary by the schema
 *
 * @packageDocumentation
 */
import Knex from "knex";
import { ISQLSchemaDefinitionType } from "../base/Root/sql";
/**
 * Builds all the foreign keys
 * @param knex the knex instance
 * @param newDatabaseSchema the new database schema as requested
 */
export declare function prepareExtensions(knex: Knex, newDatabaseSchema: ISQLSchemaDefinitionType): Promise<void>;
