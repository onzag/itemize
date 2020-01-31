/**
 * This file is in charge of building the foreign keys of an stablished current database
 * so that references can be respected
 *
 * @packageDocumentation
 */

import colors from "colors/safe";
import Knex from "knex";

import { ISQLSchemaDefinitionType, ISQLTableDefinitionType } from "../base/Root/sql";
import { showErrorStackAndLogMessage, yesno } from ".";
import { buildColumn } from "./build-column";

/**
 * Builds all the foreign keys
 * @param knex the knex instance
 * @param currentDatabaseSchema the current database schema
 * @param newDatabaseSchema the new database schema as requested
 * @returns the resulting database schema and the new current
 */
export async function buildForeignKeys(
  knex: Knex,
  currentDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<ISQLSchemaDefinitionType> {
  // foreign key creation requires a current database schema
  // this is because the buildTables should have ran first
  if (!currentDatabaseSchema) {
    throw new Error("A current database schema should exist");
  }

  // we make a copy of our current schema
  const finalSchema: ISQLSchemaDefinitionType = {
    ...currentDatabaseSchema,
  };

  // Now we want to check for foreign keys we start over, add foreign keys
  // later because we don't know what order were tables added
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
      // we get the data from the column
      const newColumnData = newTableSchema[columnName];

      // now we try to get what is available (there might be none)
      const currentColumnData = currentTableSchema && currentTableSchema[columnName];
      const currentFkTable = currentColumnData && currentColumnData.fkTable;
      const currentFkColumn = currentColumnData && currentColumnData.fkCol || "id";
      const currentFkAction = currentColumnData && currentColumnData.fkAction || "cascade";

      // even when we don't know whether it exists or not, we prepare this, if awaited
      // it will drop the current foreign key that exists in the schema (if any)
      const currentForeignKeyDrop = knex.schema.withSchema("public").alterTable(tableName, (table) => {
        table.dropForeign([columnName]);
      });

      // if we have a new foreign key to add
      if (newColumnData.fkTable) {
        // we get the data of the new foreign key to add
        const newFkTable = newColumnData.fkTable;
        const newFkColumn = newColumnData.fkCol || "id";
        const newFkAction = newColumnData.fkAction || "cascade";

        // so this is now the function that is used in order to create the foreign key
        // note that the table exists already
        const foreignKeyCreation = knex.schema.withSchema("public").alterTable(tableName, (table) => {
          // we need to use the build column function in order to refer to it
          buildColumn(columnName, newTableSchema[columnName], table)
            .references(newFkColumn).inTable(newFkTable).onDelete(newFkAction)
            .alter();
        });

        // so now if we don't have a foreign key there already,
        // we add it
        if (!currentFkTable) {
          console.log(colors.yellow(`Foreign key on ${tableName}.${columnName} which references ${newFkTable}.${newFkColumn} is missing`));

          // ask to add the foreign key
          if (await yesno(
            "create the foreign key?",
          )) {
            try {
              console.log(foreignKeyCreation.toString());
              await foreignKeyCreation;

              // now we copy the column to make it a new value
              // as we need to modify certain properties as
              // they had been updated
              finalSchema[tableName][columnName] = {
                ...currentDatabaseSchema[tableName][columnName],
              };
              // we update the properties as we managed to do
              finalSchema[tableName][columnName].fkTable = newFkTable;
              finalSchema[tableName][columnName].fkCol = newFkColumn;
              finalSchema[tableName][columnName].fkAction = newFkAction;
            } catch (err) {
              showErrorStackAndLogMessage(err);
            }
          }

        // otherwise if we actually have a currentFkTable
        // and these do not match
        } else if (
          currentFkTable !== newFkTable ||
          currentFkColumn !== newFkColumn ||
          currentFkAction !== newFkAction
        ) {
          console.log(colors.yellow(
            `Foreign key on ${tableName}.${columnName} which references ${currentFkTable}.${currentFkColumn} ${currentFkAction} has been changed ` +
            `to ${newFkTable}.${newFkColumn} ${newFkAction}`,
          ));

          // drop current foreign key and create new
          if (await yesno(
             "update the foreign key?",
          )) {
            // try to drop current foreign key
            try {
              console.log(currentForeignKeyDrop.toString());
              await currentForeignKeyDrop;

              // now we copy the column to make it a new value
              // as we need to modify certain properties as
              // they had been updated
              finalSchema[tableName][columnName] = {
                ...currentDatabaseSchema[tableName][columnName],
              };

              // if we succeed and we came here we update the
              // resulting schema to reflect that the fk is gone
              delete finalSchema[tableName][columnName].fkTable;
              delete finalSchema[tableName][columnName].fkAction;
              delete finalSchema[tableName][columnName].fkCol;

              // now we enter into a second clause
              // this won't execute if the first one fails
              try {
                console.log(foreignKeyCreation.toString());
                await foreignKeyCreation;

                // now we update to reflect we have added the new
                // foreign key
                finalSchema[tableName][columnName].fkTable = newFkTable;
                finalSchema[tableName][columnName].fkAction = newFkAction;
                finalSchema[tableName][columnName].fkCol = newFkColumn;
              } catch (err) {
                // we show an error
                showErrorStackAndLogMessage(err);
              }
            } catch (err) {
              // this error only comes if current foriegn key fails to drop
              showErrorStackAndLogMessage(err);
            }
          }
        }

      // Otherwise if there is no new value and there is only
      // a current value, we are only asking to drop
      } else if (currentFkTable) {
        console.log(colors.yellow(
          `Foreign key on ${tableName}.${columnName} which references ${currentFkTable}.${currentFkColumn} has been dropped`,
        ));

        // drop current foreign key
        if (await yesno(
          "Do you wish to remove the foreign key?",
        )) {
          try {
            console.log(currentForeignKeyDrop.toString());
            await currentForeignKeyDrop;

            // now we copy the column to make it a new value
            // as we need to delete
            finalSchema[tableName][columnName] = {
              ...currentDatabaseSchema[tableName][columnName],
            };

            // we remove the properties
            delete finalSchema[tableName][columnName].fkTable;
            delete finalSchema[tableName][columnName].fkAction;
            delete finalSchema[tableName][columnName].fkCol;
          } catch (err) {
            showErrorStackAndLogMessage(err);
          }
        }
      }
    }

    return finalSchema;
  }
}
