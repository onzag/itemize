/**
 * This file is in charge of building the postgresql indexes on the database
 * for speeding up things and setting up unique constraints
 *
 * @packageDocumentation
 */

import colors from "colors/safe";
import Knex from "knex";

import { ISQLSchemaDefinitionType } from "../base/Root/sql";
import { showErrorStackAndLogMessage, yesno } from ".";

/**
 * Builds all the indexes
 * @param knex the knex instance
 * @param currentDatabaseSchema the current database schema
 * @param newDatabaseSchema the new database schema as requested
 * @returns the resulting database schema and the new current
 */
export async function buildIndexes(
  knex: Knex,
  currentDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<ISQLSchemaDefinitionType> {
  // index creation requires a current database schema
  // this is because the buildTables should have ran first
  if (!currentDatabaseSchema) {
    throw new Error("A current database schema should exist");
  }

  // we make a copy of our current schema
  const finalSchema: ISQLSchemaDefinitionType = {
    ...currentDatabaseSchema,
  };

  // So we want to loop into each table
  for (const tableName of Object.keys(newDatabaseSchema)) {
    // the result table schema for that specific table
    const newTableSchema = newDatabaseSchema[tableName];
    const currentTableSchema = currentDatabaseSchema[tableName];

    // we cannot operate unless there's a current table schema this could
    // mean a table was not added or something
    if (!currentTableSchema) {
      return;
    }

    // now we copy the current table schema
    finalSchema[tableName] = {...currentTableSchema};

    for (const columnName of Object.keys(newTableSchema)) {
      // so we get the new schema of the column and the old
      // note that there might not have been an old one
      const newColumnSchema = newTableSchema[columnName];
      const currentColumnSchema = currentTableSchema[columnName];

      // and let's check what new index type was added
      const newIndexType = newColumnSchema.index;

      // this variable is a helper, basically we cannot over
      // set indexes, so we need to drop the current if there
      // is one
      let wasSupposedToDropCurrentIndexButDidnt = false;

      if (
        currentColumnSchema &&
        currentColumnSchema.index &&
        currentColumnSchema.index !== newIndexType
      ) {
        console.log(colors.yellow(
          `Index on ${tableName}.${columnName} of type ${currentColumnSchema.index} has` +
          ` been changed or dropped, the current index needs to be dropped`,
        ));

        // ask if we want the index to be dropped
        if (await yesno(
          "drop the index?",
        )) {
          try {
            await knex.schema.withSchema("public").alterTable(tableName, (t) => {
              if (currentColumnSchema.index === "unique") {
                t.dropUnique([columnName]);
              } else {
                t.dropIndex([columnName]);
              }
            });

            // copy the column information to reflect the update
            finalSchema[tableName][columnName] = {
              ...currentDatabaseSchema[tableName][columnName],
            };
            // and now delete the index
            delete finalSchema[tableName][columnName].index;

          } catch (err) {
            showErrorStackAndLogMessage(err);
            wasSupposedToDropCurrentIndexButDidnt = true;
          }
        } else {
          wasSupposedToDropCurrentIndexButDidnt = true;
        }
      }

      // so now if we have a new index type which is not equal to the old
      // and we actually dropped the old index (if there was any)
      if (
        newIndexType &&
        newIndexType !== (currentColumnSchema && currentColumnSchema.index) &&
        !wasSupposedToDropCurrentIndexButDidnt
      ) {
        // show the message
        console.log(colors.yellow(
          `Index on ${tableName}.${columnName} of type ${newIndexType} has been created`,
        ));

        // ask on whether we create the index
        if (await yesno(
          "create the index?",
        )) {
          try {
            await knex.schema.withSchema("public").alterTable(tableName, (t) => {
              if (newIndexType === "unique") {
                t.unique([columnName]);
              } else {
                t.index([columnName], null, newIndexType);
              }
            });

            // copy the column information to reflect the update
            finalSchema[tableName][columnName] = {
              ...currentDatabaseSchema[tableName][columnName],
            };
            // and now set the index
            finalSchema[tableName][columnName].index = newIndexType;

          } catch (err) {
            showErrorStackAndLogMessage(err);
          }
        }
      }
    }
  }

  return finalSchema;
}
