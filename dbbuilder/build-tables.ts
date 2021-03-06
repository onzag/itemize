/**
 * Contains the functionality that is used in order to generate
 * the base structure of the tables and the database itself, by
 * morphing SQL schemas into one another
 *
 * @module
 */

import read from "read";
import colors from "colors/safe";

import { ISQLSchemaDefinitionType, ISQLTableDefinitionType, ISQLColumnDefinitionType } from "../base/Root/sql";
import { showErrorStackAndLogMessage, yesno } from ".";
import { buildColumn } from "./build-column";
import { DatabaseConnection } from "../database";
import { makeIdOutOf, MAX_PG_FK_SIZE } from "./build-foreign-key";

function fastRead(options: read.Options): Promise<{
  result: string;
  isDefault: boolean;
}> {
  return new Promise((resolve, reject) => {
    read(options, (error, result, isDefault) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          result,
          isDefault,
        })
      }
    });
  });
}

// COLUMN ADD/UPDATE/REMOVE

/**
 * Adds a missing column to a table that already exists
 * @param databaseConnection the database instance
 * @param tableName the table name in question
 * @param newColumnName the name of the column
 * @param newColumnSchema the schema of the column
 * @returns the new generated column or null if failed to generate
 */
export async function addMissingColumnToTable(
  databaseConnection: DatabaseConnection,
  tableName: string,
  newColumnName: string,
  newColumnSchema: ISQLColumnDefinitionType,
): Promise<ISQLColumnDefinitionType> {
  // it means that this column is expected to be added
  console.log(colors.yellow("A new column at " + tableName + " has been added named " + newColumnName));

  const alterTableQuery = databaseConnection.getAlterTableBuilder();
  alterTableQuery.table(tableName);
  buildColumn(newColumnName, newColumnSchema, alterTableQuery, "ADD COLUMN");

  // ask if we want to execute it
  if (await yesno("Do you want to add the new column? saying no might cause breaking changes")) {
    // execute it
    try {
      await databaseConnection.query(alterTableQuery);
      if (await yesno("Do you want to set a default value for this newly added column?")) {
        let lastReadAttemptFailed = true;
        let updateValue: any;
        while (lastReadAttemptFailed) {
          try {
            updateValue = JSON.parse((await fastRead({
              prompt: "? = ",
              default: "null",
            })).result);
            lastReadAttemptFailed = false;
          } catch (err) {
            console.log(colors.yellow("Failed to read json value"));
          }
        }

        if (typeof updateValue !== "undefined") {
          await databaseConnection.query(
            `UPDATE ${JSON.stringify(tableName)} SET ${JSON.stringify(newColumnName)} = $1 WHERE 1=1`,
            [
              updateValue,
            ],
          );
        }
      }
      return newColumnSchema;
    } catch (err) {
      showErrorStackAndLogMessage(err);
      if (await yesno("Consider it successful? The column will be considered as properly added")) {
        return newColumnSchema;
      }
      return null;
    }
  } else {
    // delete from both schemas
    return null;
  }
}

/**
 * Drops a column in a table that does not exist in the new schema
 * but existed in the previous schema
 * @param databaseConnection the database instance
 * @param tableName the table in question
 * @param currentColumnName the column name in question
 * @param currentColumnSchema the column schema to drop
 * @returns the result of dropping the column, usually null, but the column schema itself if cancelled
 */
export async function dropExtraColumnInTable(
  databaseConnection: DatabaseConnection,
  tableName: string,
  currentColumnName: string,
  currentColumnSchema: ISQLColumnDefinitionType,
) {
  // if we find it notify
  console.log(colors.yellow("A column at " + tableName + " has been dropped, named " + currentColumnName));

  let transactionalColumnSchema = {
    ...currentColumnSchema,
  };

  // ask, for dropping things it's safe to leave
  if (await yesno("Do you want to drop the column? it's safe to leave it as it is")) {
    // execute if possible
    try {
      if (transactionalColumnSchema.foreignKey) {
        let actualId = tableName + "__" + transactionalColumnSchema.foreignKey.id;
        if (actualId.length > MAX_PG_FK_SIZE) {
          actualId = makeIdOutOf(actualId);
        }
        
        await databaseConnection.query(
          `ALTER TABLE ${JSON.stringify(tableName)} DROP CONSTRAINT ${JSON.stringify(actualId)}`,
        );
      }

      transactionalColumnSchema.foreignKey = null;

      await databaseConnection.query(
        `ALTER TABLE ${JSON.stringify(tableName)} DROP COLUMN ${JSON.stringify(currentColumnName)}`,
      );

      return null;
    } catch (err) {
      // if not change the result schema
      showErrorStackAndLogMessage(err);
      if (await yesno("Consider it successful? The column will be considered as properly removed")) {
        return null;
      }
      return transactionalColumnSchema;
    }
  } else {
    return transactionalColumnSchema;
  }
}

/**
 * Updates a column in a table
 * @param databaseConnection the database instance
 * @param tableName the table name in question
 * @param columnName the column name
 * @param newColumnSchema the new column schema
 * @param currentColumnSchema the current column schema
 * @returns the updated result if managed
 */
export async function updateColumnInTable(
  databaseConnection: DatabaseConnection,
  tableName: string,
  columnName: string,
  newColumnSchema: ISQLColumnDefinitionType,
  currentColumnSchema: ISQLColumnDefinitionType,
): Promise<ISQLColumnDefinitionType> {
  // let's have this flag for weird changes, there is only so little we would like to change
  // that could break the app
  let noOp = false;
  // for example a type change (say from int to boolean), can break stuff
  if (currentColumnSchema.type !== newColumnSchema.type) {
    // so we warn and set the noop flag
    console.log(colors.red("A column at " + tableName + "." + columnName +
      " has been changed type from " + currentColumnSchema.type + " to " +
      newColumnSchema.type + " this is a no-op"));
    noOp = true;
  }

  // also to deny nulls, nulls are always active
  if (!!currentColumnSchema.notNull !== !!newColumnSchema.notNull && newColumnSchema.notNull) {
    // this is a noop too, there might be nulls
    console.log(colors.red("A column has changed from not being nullable to being nullable at " +
      tableName + "." + columnName + " this is a no-op"));
    noOp = true;
  }

  // let's show a message for the column change
  if (!noOp) {
    console.log(colors.yellow("A column has changed at " + tableName + "." + columnName));
  }

  const alterTableQuery = databaseConnection.getAlterTableBuilder();
  alterTableQuery.table(tableName);
  buildColumn(columnName, newColumnSchema, alterTableQuery, "ALTER COLUMN");

  // now we ask the question, slightly different and more alarming
  // for noop changes
  if (await yesno(
    noOp ?
      "Do you still want to alter such column? this is delicate and might fail" :
      "Do you wish to alter this column?",
  )) {
    // we give it a try
    try {
      await databaseConnection.query(alterTableQuery);
      return newColumnSchema;
    } catch (err) {
      showErrorStackAndLogMessage(err);
      return currentColumnSchema;
    }
  } else {
    return currentColumnSchema;
  }
}

// TABLE CREATE / UPDATE / REMOVE

/**
 * Creates a table in the database
 * @param databaseConnection the database instance
 * @param tableName the table name that needs to be created
 * @param newTableSchema the new table schema
 * @returns a promise for the actual table that was built or null if not added
 */
export async function createTable(
  databaseConnection: DatabaseConnection,
  tableName: string,
  newTableSchema: ISQLTableDefinitionType,
): Promise<ISQLTableDefinitionType> {
  const finalTableSchema: ISQLTableDefinitionType = {};
  // that means the new schema expects to add a table
  console.log(colors.yellow("Table for " + tableName + " is missing"));

  const createTableQuery = databaseConnection.getCreateTableBuilder();
  createTableQuery.table(tableName);
  Object.keys(newTableSchema).forEach((columnName) => {
    const columnData = newTableSchema[columnName];
    buildColumn(columnName, columnData, createTableQuery);
    finalTableSchema[columnName] = {
      type: columnData.type,
      notNull: columnData.notNull,
      defaultTo: columnData.defaultTo,
    };
  });

  // now we need to ask if we want that to be executed
  if (await yesno("Do you want to create the table? saying no might cause breaking changes")) {
    // we try to execute it
    try {
      await databaseConnection.query(createTableQuery);
      return finalTableSchema;
    } catch (err) {
      showErrorStackAndLogMessage(err);
      if (await yesno("Consider it successful? The table will be considered as properly added")) {
        return finalTableSchema;
      }
      return null;
    }
  } else {
    // we delete from the new one
    return null;
  }
}

/**
 * Updates a table that has changed from one form
 * to another
 * @param databaseConnection the database instance
 * @param tableName the table name to update
 * @param newTableSchema the new schema
 * @param currentTableSchema the current schema
 * @returns the actual schema it managed to generate
 */
export async function updateTable(
  databaseConnection: DatabaseConnection,
  tableName: string,
  newTableSchema: ISQLTableDefinitionType,
  currentTableSchema: ISQLTableDefinitionType,
): Promise<ISQLTableDefinitionType> {
  const finalTableSchema: ISQLTableDefinitionType = {
    ...currentTableSchema,
  };

  // we need to check what changed, so we go thru every single column
  for (const columnName of Object.keys(newTableSchema)) {
    // we get the data from the column
    const newColumnSchema = newTableSchema[columnName];
    const currentColumnSchema = currentTableSchema[columnName];

    // if there was no such column
    if (!currentColumnSchema) {
      finalTableSchema[columnName] =
        await addMissingColumnToTable(databaseConnection, tableName, columnName, newColumnSchema);
      // Otherwise if there was just a change in the column basic information
      // that is because this is only in charge of the basic structure
    } else if (
      currentColumnSchema.type !== newColumnSchema.type ||
      currentColumnSchema.notNull !== newColumnSchema.notNull ||
      currentColumnSchema.defaultTo !== newColumnSchema.defaultTo
    ) {
      finalTableSchema[columnName] =
        await updateColumnInTable(databaseConnection, tableName, columnName, newColumnSchema, currentColumnSchema);
    }
  }

  // now we loop in the current ones
  for (const columnName of Object.keys(currentTableSchema)) {
    // grab this
    const newColumnSchema = newTableSchema[columnName];
    const currentColumnSchema = currentTableSchema[columnName];

    // we want to find if there are deleted column
    // currentColumnSchema might be null in some situation this has happened in the past
    // so it's worth a check that the value is set, even when it shouldn't be
    if (!newColumnSchema && currentColumnSchema) {
      finalTableSchema[columnName] =
        await dropExtraColumnInTable(databaseConnection, tableName, columnName, currentColumnSchema);
    }
  }

  Object.keys(finalTableSchema).forEach((key) => {
    if (finalTableSchema[key] === null) {
      delete finalTableSchema[key];
    }
  });

  return finalTableSchema;
}

/**
 * Drops a table in the database that should not exist anymore
 * but according to the previous schema exists
 * @param databaseConnection the database instance
 * @param tableName the table to drop
 * @param currentTableSchema the schema of the table to drop
 * @returns the result of dropping the table, usually null, unless cancelled
 */
export async function dropTable(
  databaseConnection: DatabaseConnection,
  tableName: string,
  currentTableSchema: ISQLTableDefinitionType,
): Promise<ISQLTableDefinitionType> {
  // we can assume it's meant to be dropped
  console.log(colors.yellow("Table for " + tableName + " is not required anymore"));

  // ask again, another drop query, it's okay if it stays
  if (await yesno("Do you want to drop the table? it's safe to leave it as it is")) {
    // do the call
    try {
      await databaseConnection.query(
        `DROP TABLE ${JSON.stringify(tableName)} CASCADE`,
      );
      return null;
    } catch (err) {
      showErrorStackAndLogMessage(err);
      if (await yesno("Consider it successful? The table will be considered as properly removed")) {
        return null;
      }
      return currentTableSchema;
    }
  } else {
    return currentTableSchema;
  }
}

/**
 * This function actually does the database calls
 * @param databaseConnection the database instance
 * @param currentDatabaseSchema the previous latest migration config that shows
 * the current state of the database
 * @param newDatabaseSchema the new migration config we expect to apply (and we would modify if it changes)
 * @returns a promise with the definition that was actually built
 */
export async function buildTables(
  databaseConnection: DatabaseConnection,
  currentDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<ISQLSchemaDefinitionType> {
  const finalSchema: ISQLSchemaDefinitionType = {};

  // so we start by looping, we use an of-loop because we want
  // to keep things sync, despite being an async function
  for (const tableName of Object.keys(newDatabaseSchema)) {
    const currentTableSchema = currentDatabaseSchema[tableName];
    const newTableSchema = newDatabaseSchema[tableName];

    // if there is no current schema
    if (!currentTableSchema) {
      finalSchema[tableName] =
        await createTable(databaseConnection, tableName, newTableSchema);
      // So if there is an current schema and this is an update
    } else {
      finalSchema[tableName] =
        await updateTable(databaseConnection, tableName, newTableSchema, currentTableSchema);
    }
  }

  // now we want to check for dropped tables, by looping on the previous
  // migration config
  for (const tableName of Object.keys(currentDatabaseSchema)) {
    // if we don't find any table data in the new config
    if (!newDatabaseSchema[tableName]) {
      // we call the drop
      finalSchema[tableName] =
        await dropTable(
          databaseConnection,
          tableName,
          currentDatabaseSchema[tableName],
        );
    }
  }

  Object.keys(finalSchema).forEach((key) => {
    if (finalSchema[key] === null) {
      delete finalSchema[key];
    }
  });

  return finalSchema;
}
