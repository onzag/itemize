/**
 * Contains the functionality that is used in order to generate
 * the base structure of the tables and the database itself, by
 * morphing SQL schemas into one another
 *
 * @packageDocumentation
 */

import read from "read";
import colors from "colors/safe";
import Knex from "knex";

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

import { ISQLSchemaDefinitionType, ISQLTableDefinitionType, ISQLColumnDefinitionType } from "../base/Root/sql";
import { showErrorStackAndLogMessage, yesno } from ".";
import { buildColumn } from "./build-column";

// COLUMN ADD/UPDATE/REMOVE

/**
 * Adds a missing column to a table that already exists
 * @param knex the knex instance
 * @param tableName the table name in question
 * @param newColumnName the name of the column
 * @param newColumnSchema the schema of the column
 * @returns the new generated column or null if failed to generate
 */
export async function addMissingColumnToTable(
  knex: Knex,
  tableName: string,
  newColumnName: string,
  newColumnSchema: ISQLColumnDefinitionType,
): Promise<ISQLColumnDefinitionType> {
  // it means that this column is expected to be added
  console.log(colors.yellow("A new column at " + tableName + " has been added named " + newColumnName));

  // we create the update query
  const updateQuery = knex.schema.withSchema("public").alterTable(tableName, (table) => {
    buildColumn(newColumnName, newColumnSchema, table);
  });

  // ask if we want to execute it
  if (await yesno("Do you want to add the new column? saying no might cause breaking changes")) {
    // execute it
    try {
      console.log(updateQuery.toString());
      await updateQuery;
      if (await yesno("Do you want to set a default value for this newly added column?")) {
        const updateValue = await fastRead({
          prompt: "? = ",
          default: "NULL",
        });
        await knex.update({
          [newColumnName]: knex.raw("?", updateValue),
        }).table(tableName);
      }
      return newColumnSchema;
    } catch (err) {
      showErrorStackAndLogMessage(err);
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
 * @param knex the knex instance
 * @param tableName the table in question
 * @param currentColumnName the column name in question
 * @param currentColumnSchema the column schema to drop
 * @returns the result of dropping the column, usually null, but the column schema itself if cancelled
 */
export async function dropExtraColumnInTable(
  knex: Knex,
  tableName: string,
  currentColumnName: string,
  currentColumnSchema: ISQLColumnDefinitionType,
) {
  // if we find it notify
  console.log(colors.yellow("A column at " + tableName + " has been dropped, named " + currentColumnName));

  // make the query
  const dropQuery = knex.schema.withSchema("public").alterTable(tableName, (table) => {
    if (currentColumnSchema.foreignKey) {
      // columns is actually ignored according to docs since we have the id
      // so we don't need to dive deep
      table.dropForeign(null, tableName + "__" + currentColumnSchema.foreignKey.id);
    }
    table.dropColumn(currentColumnName);
  });

  // ask, for dropping things it's safe to leave
  if (await yesno("Do you want to drop the column? it's safe to leave it as it is")) {
    // execute if possible
    try {
      console.log(dropQuery.toString());
      await dropQuery;
      return null;
    } catch (err) {
      // if not change the result schema
      showErrorStackAndLogMessage(err);
      return currentColumnSchema;
    }
  } else {
    return currentColumnSchema;
  }
}

/**
 * Updates a column in a table
 * @param knex the knex instance
 * @param tableName the table name in question
 * @param columnName the column name
 * @param newColumnSchema the new column schema
 * @param currentColumnSchema the current column schema
 * @returns the updated result if managed
 */
export async function updateColumnInTable(
  knex: Knex,
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

  // so we create the query anyway
  const updateQuery = knex.schema.withSchema("public").alterTable(tableName, (table) => {
    // set it as an alter for a column
    buildColumn(columnName, newColumnSchema, table).alter();
  });

  // now we ask the question, slightly different and more alarming
  // for noop changes
  if (await yesno(
    noOp ?
      "Do you still want to alter such column? this is delicate and might fail" :
      "Do you wish to alter this column?",
  )) {
    // we give it a try
    try {
      console.log(updateQuery.toString());
      await updateQuery;
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
 * @param knex the knex instance
 * @param tableName the table name that needs to be created
 * @param newTableSchema the new table schema
 * @returns a promise for the actual table that was built or null if not added
 */
export async function createTable(
  knex: Knex,
  tableName: string,
  newTableSchema: ISQLTableDefinitionType,
): Promise<ISQLTableDefinitionType> {
  const finalTableSchema: ISQLTableDefinitionType = {};
  // that means the new schema expects to add a table
  console.log(colors.yellow("Table for " + tableName + " is missing"));

  // build the query with the query builder of knex
  const createQuery = knex.schema.withSchema("public").createTable(tableName, (table) => {
    // for each column we build the type
    Object.keys(newTableSchema).forEach((columnName) => {
      const columnData = newTableSchema[columnName];
      buildColumn(columnName, columnData, table);
      finalTableSchema[columnName] = {
        type: columnData.type,
        notNull: columnData.notNull,
        defaultTo: columnData.defaultTo,
      };
    });
  });

  // now we need to ask if we want that to be executed
  if (await yesno("Do you want to create the table? saying no might cause breaking changes")) {
    // we try to execute it
    try {
      console.log(createQuery.toString());
      await createQuery;
      return finalTableSchema;
    } catch (err) {
      showErrorStackAndLogMessage(err);
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
 * @param knex the knex instance
 * @param tableName the table name to update
 * @param newTableSchema the new schema
 * @param currentTableSchema the current schema
 * @returns the actual schema it managed to generate
 */
export async function updateTable(
  knex: Knex,
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
        await addMissingColumnToTable(knex, tableName, columnName, newColumnSchema);
      // Otherwise if there was just a change in the column basic information
      // that is because this is only in charge of the basic structure
    } else if (
      currentColumnSchema.type !== newColumnSchema.type ||
      currentColumnSchema.notNull !== newColumnSchema.notNull ||
      currentColumnSchema.defaultTo !== newColumnSchema.defaultTo
    ) {
      finalTableSchema[columnName] =
        await updateColumnInTable(knex, tableName, columnName, newColumnSchema, currentColumnSchema);
    }
  }

  // now we loop in the current ones
  for (const columnName of Object.keys(currentTableSchema)) {
    // grab this
    const newColumnSchema = newTableSchema[columnName];
    const currentColumnSchema = currentTableSchema[columnName];

    // we want to find if there are deleted columns
    if (!newColumnSchema) {
      finalTableSchema[columnName] =
        await dropExtraColumnInTable(knex, tableName, columnName, currentColumnSchema);
    }
  }

  return finalTableSchema;
}

/**
 * Drops a table in the database that should not exist anymore
 * but according to the previous schema exists
 * @param knex the knex instance
 * @param tableName the table to drop
 * @param currentTableSchema the schema of the table to drop
 * @returns the result of dropping the table, usually null, unless cancelled
 */
export async function dropTable(
  knex: Knex,
  tableName: string,
  currentTableSchema: ISQLTableDefinitionType,
): Promise<ISQLTableDefinitionType> {
  // we can assume it's meant to be dropped
  console.log(colors.yellow("Table for " + tableName + " is not required anymore"));

  // create the query
  const dropQuery = knex.schema.withSchema("public").dropTable(tableName);

  // ask again, another drop query, it's okay if it stays
  if (await yesno("Do you want to drop the table? it's safe to leave it as it is")) {
    // do the call
    try {
      console.log(dropQuery.toString());
      await dropQuery;
      return null;
    } catch (err) {
      showErrorStackAndLogMessage(err);
      return currentTableSchema;
    }
  } else {
    return currentTableSchema;
  }
}

/**
 * This function actually does the database calls
 * @param knex the knex instance
 * @param currentDatabaseSchema the previous latest migration config that shows
 * the current state of the database
 * @param newDatabaseSchema the new migration config we expect to apply (and we would modify if it changes)
 * @returns a promise with the definition that was actually built
 */
export async function buildTables(
  knex: Knex,
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
        await createTable(knex, tableName, newTableSchema);
      // So if there is an current schema and this is an update
    } else {
      finalSchema[tableName] =
        await updateTable(knex, tableName, newTableSchema, currentTableSchema);
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
          knex,
          tableName,
          currentDatabaseSchema[tableName],
        );
    }
  }

  return finalSchema;
}
