"use strict";
/**
 * Adds the pgcrypto and the postgis extensions that are necessary if and only if they
 * are deemed necessary by the schema
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareExtensions = void 0;
/**
 * Builds all the foreign keys
 * @param knex the knex instance
 * @param newDatabaseSchema the new database schema as requested
 */
async function prepareExtensions(knex, newDatabaseSchema) {
    const gatheredExtensions = [];
    Object.keys(newDatabaseSchema).forEach((tableName) => {
        const tableSchema = newDatabaseSchema[tableName];
        Object.keys(tableSchema).forEach((columnName) => {
            const columnSchema = tableSchema[columnName];
            if (columnSchema.ext && !gatheredExtensions.includes(columnSchema.ext)) {
                gatheredExtensions.push(columnSchema.ext);
            }
        });
    });
    await Promise.all(gatheredExtensions.map(async (requiredExtension) => {
        await knex.raw(`CREATE EXTENSION IF NOT EXISTS ${JSON.stringify(requiredExtension)}`);
    }));
}
exports.prepareExtensions = prepareExtensions;
