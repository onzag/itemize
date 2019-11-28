import colors from "colors/safe";
import Knex from "knex";

import { ISQLSchemaDefinitionType } from "../base/Root/sql";
import { showErrorStackAndLogMessage, yesno } from ".";

export async function buildIndexes(
  knex: Knex,
  oldDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
) {
  // So we want to loop into each table
  for (const tableName of Object.keys(newDatabaseSchema)) {
    // the result table schema for that specific table
    const newTableSchema = newDatabaseSchema[tableName];
    const oldTableSchema = oldDatabaseSchema && oldDatabaseSchema[tableName];

    for (const columnName of Object.keys(newTableSchema)) {
      const newColumnSchema = newTableSchema[columnName];
      const oldColumnSchema = oldTableSchema && oldTableSchema[columnName];
      const newIndexType = newColumnSchema.index;
      let wasSupposedToDropOldIndexButDidnt = false;

      if (
        oldColumnSchema &&
        oldColumnSchema.index &&
        oldColumnSchema.index !== newIndexType
      ) {
        console.log(colors.yellow(
          `Index on ${tableName}.${columnName} of type ${oldColumnSchema.index} has been changed or dropped, the old index needs to be dropped`,
        ));
        if (await yesno(
          "drop the index?",
        )) {
          try {
            await knex.schema.withSchema("public").alterTable(tableName, (t) => {
              if (oldColumnSchema.index === "unique") {
                t.dropUnique([columnName]);
              } else {
                t.dropIndex([columnName]);
              }
            });
            newColumnSchema.index = null;
          } catch (err) {
            showErrorStackAndLogMessage(err);
            wasSupposedToDropOldIndexButDidnt = true;
            newColumnSchema.index = oldColumnSchema.index;
          }
        } else {
          wasSupposedToDropOldIndexButDidnt = true;
          newColumnSchema.index = oldColumnSchema.index;
        }
      }

      if (
        newIndexType &&
        newIndexType !== (oldColumnSchema && oldColumnSchema.index) &&
        !wasSupposedToDropOldIndexButDidnt
      ) {
        console.log(colors.yellow(
          `Index on ${tableName}.${columnName} of type ${newIndexType} has been created`,
        ));

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
            newColumnSchema.index = newIndexType;
          } catch (err) {
            showErrorStackAndLogMessage(err);
          }
        }
      }
    }
  }
}
