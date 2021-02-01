// /**
//  * Adds the pgcrypto and the postgis extensions that are necessary if and only if they
//  * are deemed necessary by the schema
//  *
//  * @packageDocumentation
//  */

// import Knex from "@onzag/knex";
// import { ISQLSchemaDefinitionType } from "../base/Root/sql";

// /**
//  * Builds all the extensions as they are required to be processed
//  * @param knex the knex instance
//  * @param newDatabaseSchema the new database schema as requested
//  */
// export async function prepareExtensions(
//   knex: Knex,
//   newDatabaseSchema: ISQLSchemaDefinitionType,
// ): Promise<void> {
//   const gatheredExtensions: string[] = [];
//   Object.keys(newDatabaseSchema).forEach((tableName) => {
//     const tableSchema = newDatabaseSchema[tableName];
//     Object.keys(tableSchema).forEach((columnName) => {
//       const columnSchema = tableSchema[columnName];
//       if (columnSchema.ext && !gatheredExtensions.includes(columnSchema.ext)) {
//         gatheredExtensions.push(columnSchema.ext);
//       }
//     });
//   });

//   await Promise.all(gatheredExtensions.map(async (requiredExtension) => {
//     await knex.raw(`CREATE EXTENSION IF NOT EXISTS ${JSON.stringify(requiredExtension)}`);
//   }));
// }
