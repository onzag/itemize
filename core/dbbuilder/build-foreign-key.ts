import colors from "colors/safe";
import Knex from "knex";

import { ISQLSchemaDefinitionType } from "../base/Root/sql";
import { showErrorStackAndLogMessage, yesno } from ".";
import { buildColumn } from "./build-column";

export async function buildForeignKeys(
  knex: Knex,
  oldDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
) {
  // Now we want to check for foreign keys we start over, add foreign keys
  // later because we don't know what order were tables added
  for (const tableName of Object.keys(newDatabaseSchema)) {
    // the result table schema for that specific table
    const newTableSchema = newDatabaseSchema[tableName];
    const oldTableSchema = oldDatabaseSchema[tableName];

    for (const columnName of Object.keys(newTableSchema)) {
      // we get the data from the column
      const newColumnData = newTableSchema[columnName];
      const oldColumnData = oldTableSchema && oldTableSchema[columnName];

      const oldFkTable = oldColumnData && oldColumnData.fkTable;
      const oldFkColumn = oldColumnData && oldColumnData.fkCol || "id";
      const oldFkAction = oldColumnData && oldColumnData.fkAction || "cascade";

      const oldForeignKeyDrop = knex.schema.withSchema("public").alterTable(tableName, (table) => {
        table.dropForeign([columnName]);
      });

      if (newColumnData.fkTable) {
        const newFkTable = newColumnData.fkTable;
        const newFkColumn = newColumnData.fkCol || "id";
        const newFkAction = newColumnData.fkAction || "cascade";

        const foreignKeyCreation = knex.schema.withSchema("public").alterTable(tableName, (table) => {
          buildColumn(columnName, newTableSchema[columnName], table)
            .references(newFkColumn).inTable(newFkTable).onDelete(newFkAction)
            .alter();
        });

        if (!oldFkTable) {
          console.log(colors.yellow(`Foreign key on ${tableName}.${columnName} which references ${newFkTable}.${newFkColumn} is missing`));

          // ask to add the foreign key
          if (await yesno(
            "create the foreign key?",
          )) {
            try {
              console.log(foreignKeyCreation.toString());
              await foreignKeyCreation;
            } catch (err) {
              showErrorStackAndLogMessage(err);
              delete newTableSchema[columnName].fkTable;
              delete newTableSchema[columnName].fkAction;
              delete newTableSchema[columnName].fkCol;
            }
          } else {
            delete newTableSchema[columnName].fkTable;
            delete newTableSchema[columnName].fkAction;
            delete newTableSchema[columnName].fkCol;
          }
        } else if (
          oldFkTable !== newFkTable ||
          oldFkColumn !== newFkColumn ||
          oldFkAction !== newFkAction
        ) {
          console.log(colors.yellow(
            `Foreign key on ${tableName}.${columnName} which references ${oldFkTable}.${oldFkColumn} ${oldFkAction} has been changed ` +
            `to ${newFkTable}.${newFkColumn} ${newFkAction}`,
          ));
          // drop old foreign key and create new
          if (await yesno(
             "update the foreign key?",
          )) {
            // try to drop old foreign key
            try {
              console.log(oldForeignKeyDrop.toString());
              await oldForeignKeyDrop;

              // if we succeed and we came here we update the
              // resulting schema to reflect that the fk is gone
              delete newTableSchema[columnName].fkTable;
              delete newTableSchema[columnName].fkAction;
              delete newTableSchema[columnName].fkCol;

              // now we enter into a second clause
              // this won't execute if the first one fails
              try {
                console.log(foreignKeyCreation.toString());
                await foreignKeyCreation;

                // now we update to reflect we have added the new
                // foreign key
                newTableSchema[columnName].fkTable = newFkTable;
                newTableSchema[columnName].fkAction = newFkAction;
                newTableSchema[columnName].fkCol = newFkColumn;
              } catch (err) {
                // we show an error but do nothing to reflect
                // the change, because we already did so beforehand
                showErrorStackAndLogMessage(err);
              }
            } catch (err) {
              // this error only comes if old foriegn key fails to drop
              // hence we restore the old foreign key
              showErrorStackAndLogMessage(err);
              newTableSchema[columnName].fkTable = oldFkTable;
              newTableSchema[columnName].fkAction = oldFkAction;
              newTableSchema[columnName].fkCol = oldFkColumn;
            }
          } else {
            // we restore the old foreign key by user request
            newTableSchema[columnName].fkTable = oldFkTable;
            newTableSchema[columnName].fkAction = oldFkAction;
            newTableSchema[columnName].fkCol = oldFkColumn;
          }
        }
      } else if (oldFkTable) {
        console.log(colors.yellow(
          `Foreign key on ${tableName}.${columnName} which references ${oldFkTable}.${oldFkColumn} has been dropped`,
        ));

        // drop old foreign key
        if (await yesno(
          "Do you wish to remove the foreign key?",
        )) {
          try {
            console.log(oldForeignKeyDrop.toString());
            await oldForeignKeyDrop;
          } catch (err) {
            showErrorStackAndLogMessage(err);
            newTableSchema[columnName].fkTable = oldFkTable;
            newTableSchema[columnName].fkAction = oldFkAction;
            newTableSchema[columnName].fkCol = oldFkColumn;
          }
        } else {
          newTableSchema[columnName].fkTable = oldFkTable;
          newTableSchema[columnName].fkAction = oldFkAction;
          newTableSchema[columnName].fkCol = oldFkColumn;
        }
      }
    }
  }
}
