import colors from "colors/safe";
import Knex from "knex";

import { ISQLSchemaDefinitionType, ISQLTableDefinitionType, ISQLColumnDefinitionType } from "../base/Root";
import { showErrorStackAndLogMessage, yesno } from ".";
import { buildColumn } from "./build-column";

// COLUMN ADD/UPDATE/REMOVE

export async function addMissingColumnToTable(
  knex: Knex,
  newColumnSchema: ISQLColumnDefinitionType,
  newColumnName: string,
  tableSchema: ISQLTableDefinitionType,
  tableName: string,
) {
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
    } catch (err) {
      showErrorStackAndLogMessage(err);
      // delete the column from the table schema as it failed
      delete tableSchema[newColumnName];
    }
  } else {
    // delete from both schemas
    delete tableSchema[newColumnName];
  }
}

export async function dropExtraColumnInTable(
  knex: Knex,
  oldColumnSchema: ISQLColumnDefinitionType,
  oldColumnName: string,
  tableSchema: ISQLTableDefinitionType,
  tableName: string,
) {
  // if we find it notify
  console.log(colors.yellow("A column at " + tableName + " has been dropped, named " + oldColumnName));

  // make the query
  const dropQuery = knex.schema.withSchema("public").alterTable(tableName, (table) => {
    if (oldColumnSchema[oldColumnName].fkTable) {
      table.dropForeign([oldColumnName]);
    }
    table.dropColumn(oldColumnName);
  });

  // ask, for dropping things it's safe to leave
  if (await yesno("Do you want to drop the column? it's safe to leave it as it is")) {
    // execute if possible
    try {
      console.log(dropQuery.toString());
      await dropQuery;
    } catch (err) {
      // if not change the result schema
      showErrorStackAndLogMessage(err);
      tableSchema[oldColumnName] = oldColumnSchema;
    }
  } else {
    tableSchema[oldColumnName] = oldColumnSchema;
  }
}

export async function updateColumnInTable(
  knex: Knex,
  newColumnSchema: ISQLColumnDefinitionType,
  oldColumnSchema: ISQLColumnDefinitionType,
  columnName: string,
  tableName: string,
) {
  // let's have this flag for weird changes, there is only so little we would like to change
  // that could break the app
  let noOp = false;
  // for example a type change (say from int to boolean), can break stuff
  if (oldColumnSchema.type !== newColumnSchema.type) {
    // so we warn and set the noop flag
    console.log(colors.red("A column at " + tableName + "." + columnName +
      " has been changed type from " + oldColumnSchema.type + " to " +
      newColumnSchema.type + " this is a no-op"));
    noOp = true;
  }

  // also to deny nulls, nulls are always active
  if (!!oldColumnSchema.notNull !== !!newColumnSchema.notNull && newColumnSchema.notNull) {
    // this is a noop too, there might be nulls
    console.log(colors.red("A column has changed from not being nullable to being nullable at " +
      tableName + "." + columnName + " this is a no-op"));
    noOp = true;
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
    } catch (err) {
      showErrorStackAndLogMessage(err);
      newColumnSchema.type = oldColumnSchema.type;
      newColumnSchema.notNull = oldColumnSchema.notNull;
    }
  } else {
    newColumnSchema.type = oldColumnSchema.type;
    newColumnSchema.notNull = oldColumnSchema.notNull;
  }
}

// TABLE CREATE / UPDATE / REMOVE

export async function createTable(
  knex: Knex,
  tableName: string,
  newTableSchema: ISQLTableDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
) {
  // that means the new schema expects to add a table
  console.log(colors.yellow("Table for " + tableName + " is missing"));

  // build the query with the query builder of knex
  const createQuery = knex.schema.withSchema("public").createTable(tableName, (table) => {
    // for each column we build the type
    Object.keys(newTableSchema).forEach((columnName) => {
      const columnData = newTableSchema[columnName];
      buildColumn(columnName, columnData, table);
    });
  });

  // now we need to ask if we want that to be executed
  if (await yesno("Do you want to create the table? saying no might cause breaking changes")) {
    // we try to execute it
    try {
      console.log(createQuery.toString());
      await createQuery;
    } catch (err) {
      showErrorStackAndLogMessage(err);
      // we delete from the new one, modify it
      delete newDatabaseSchema[tableName];
    }
  } else {
    // we delete from the new one
    delete newDatabaseSchema[tableName];
  }
}

export async function updateTable(
  knex: Knex,
  tableName: string,
  newTableSchema: ISQLTableDefinitionType,
  oldTableSchema: ISQLTableDefinitionType,
) {
  // we need to check what changed, so we go thru every single column
  for (const columnName of Object.keys(newTableSchema)) {
    // we get the data from the column
    const newColumnSchema = newTableSchema[columnName];
    const oldColumnSchema = oldTableSchema[columnName];

    // if there was no such column
    if (!oldColumnSchema) {
      await addMissingColumnToTable(knex, newColumnSchema, columnName, newTableSchema, tableName);
      // Otherwise if there was just a change in the column basic information
    } else if (
      oldColumnSchema.type !== newColumnSchema.type ||
      oldColumnSchema.notNull !== newColumnSchema.notNull
    ) {
      await updateColumnInTable(knex, newColumnSchema, oldColumnSchema, columnName, tableName);
    }
  }

  // now we loop in the old ones
  for (const columnName of Object.keys(oldTableSchema)) {
    // grab this
    const newColumnSchema = newTableSchema[columnName];
    const oldColumnSchema = oldTableSchema[columnName];

    // we want to find if there are deleted columns
    if (!newColumnSchema) {
      await dropExtraColumnInTable(knex, oldColumnSchema, columnName, newTableSchema, tableName);
    }
  }
}

export async function dropTable(
  knex: Knex,
  tableName: string,
  oldDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
) {
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
    } catch (err) {
      showErrorStackAndLogMessage(err);
      newDatabaseSchema[tableName] = oldDatabaseSchema[tableName];
    }
  } else {
    newDatabaseSchema[tableName] = oldDatabaseSchema[tableName];
  }
}

/**
 * This function actually does the database calls
 * @param knex the knex instance
 * @param oldDatabaseSchema the previous latest migration config that shows
 * the current state of the database
 * @param newDatabaseSchema the new migration config we expect to apply (and we would modify if it changes)
 */
export async function buildTables(
  knex: Knex,
  oldDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
) {
  // so we start by looping, we use an of-loop because we want
  // to keep things sync, despite being an async function
  for (const tableName of Object.keys(newDatabaseSchema)) {
    const oldTableSchema = oldDatabaseSchema[tableName];
    const newTableSchema = newDatabaseSchema[tableName];

    // if there is no old schema
    if (!oldTableSchema) {
      await createTable(knex, tableName, newTableSchema, newDatabaseSchema);
      // So if there is an old schema and this is an update
    } else {
      await updateTable(knex, tableName, newTableSchema, oldTableSchema);
    }
  }

  // now we want to check for dropped tables, by looping on the previous
  // migration config
  for (const tableName of Object.keys(oldDatabaseSchema)) {
    // if we don't find any table data in the new config
    if (!newDatabaseSchema[tableName]) {
      await dropTable(
        knex,
        tableName,
        oldDatabaseSchema,
        newDatabaseSchema,
      );
    }
  }
}
