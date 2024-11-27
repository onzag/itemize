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
import { buildColumn, convertValueToExpression } from "./build-column";
import { DatabaseConnection } from "../database";
import equals from "deep-equal";

async function checkValuesAreEquivalent(
  databaseConnection: DatabaseConnection,
  pgGiven: string,
  schemaGiven: any,
  isSerial: boolean,
): Promise<boolean> {
  // this is a serial and of course has a next val due to primary key pruposes
  if (isSerial && pgGiven?.startsWith("nextval(") && (schemaGiven === null || typeof schemaGiven === "undefined")) {
    return true;
  }
  // the value in postgreSQL is a function
  // and our schema does not support function calling
  // so it must have changed by default
  if (pgGiven?.includes("(")) {
    return false;
  }

  if (!pgGiven && schemaGiven) {
    return false;
  }

  if (!pgGiven && (typeof schemaGiven === "undefined" || schemaGiven === null)) {
    return true;
  }

  const toAny = await databaseConnection.queryFirst("SELECT " + pgGiven + " AS value");
  const pgValue: any = toAny.value;

  return (pgValue === schemaGiven || equals(pgGiven, schemaGiven, { strict: true }));
}

const postgresTypeEquivalents = [
  ["NUMERIC", "DECIMAL"],
  ["INT", "INTEGER", "INT4", "SERIAL", "SERIAL4"],
  ["SMALLINT", "INT2"],
  ["BIGINT", "INT8", "BIGSERIAL", "SERIAL8"],
  ["REAL", "FLOAT4"],
  ["DOUBLE PRECISION", "FLOAT8"],
  ["CHARACTER VARYING", "VARCHAR"],
  ["CHARACTER", "CHAR"],
  ["TIMESTAMP WITHOUT TIME ZONE", "TIMESTAMP"],
  ["TIMESTAMP WITH TIME ZONE", "TIMESTAMPTZ"],
  ["TIME WITHOUT TIME ZONE", "TIME"],
  ["TIME WITH TIME ZONE", "TIMETZ"],
  ["BOOLEAN", "BOOL"]
];

async function checkTypesAreEquivalent(
  current: string,
  wanted: string,
  currentDefault: string,
) {
  const currentUpper = current.trim().toUpperCase().replace(/\s\s+/g, ' ');
  const wantedUpper = wanted.trim() === "ID" ? "TEXT" : wanted.trim().toUpperCase().replace(/\s\s+/g, ' ');

  if (currentUpper === wantedUpper) {
    return true;
  }

  const currentIsArray = currentUpper.endsWith("[]");
  const wantedIsArray = wantedUpper.endsWith("[]");

  if (currentIsArray !== wantedIsArray) {
    return false;
  }

  const currentUnarrayed = currentUpper.replace("[]", "").trim();
  const wantedUnarrayed = wantedUpper.replace("[]", "").trim();

  const currentEquivalenceIndex = postgresTypeEquivalents.findIndex((v) => v.some((v2) => v2 === currentUnarrayed));
  const wantedEquivalenceIndex = postgresTypeEquivalents.findIndex((v) => v.some((v2) => v2 === wantedUnarrayed));

  if (currentEquivalenceIndex !== -1 && currentEquivalenceIndex === wantedEquivalenceIndex) {
    // serials just are integers that have a default value
    if (wantedUpper.includes("SERIAL")) {
      // in order to be 100% sure they are truly equal we are going to check
      // that the default for the nextval exists
      const hasNextVal = currentDefault.startsWith("nextval(");
      if (!hasNextVal) {
        return false;
      }
    }
    return true;
  }

  return currentUnarrayed === wantedUnarrayed;
}

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
      await showErrorStackAndLogMessage(err);
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
) {
  // if we find it notify
  console.log(colors.yellow("A column at " + tableName + " has been dropped, named " + currentColumnName));

  // ask, for dropping things it's safe to leave
  if (await yesno("Do you want to drop the column? it's safe to leave it as it is")) {
    // execute if possible
    try {
      const foreignKeys = await databaseConnection.queryRows(
        "SELECT conname FROM pg_constraint WHERE conrelid = $1::regclass AND confkey IS NOT NULL AND " +
        "conkey @> (SELECT ARRAY(SELECT attnum FROM pg_attribute WHERE attrelid = $1::regclass AND attname = $2))",
        [
          "public." + JSON.stringify(tableName),
          currentColumnName,
        ]
      );

      for (const fkKey of foreignKeys) {
        await databaseConnection.query(
          `ALTER TABLE ${JSON.stringify(tableName)} DROP CONSTRAINT ${JSON.stringify(fkKey.conname)}`,
        );
      }

      await databaseConnection.query(
        `ALTER TABLE ${JSON.stringify(tableName)} DROP COLUMN ${JSON.stringify(currentColumnName)}`,
      );

      return null;
    } catch (err) {
      // if not change the result schema
      await showErrorStackAndLogMessage(err);
    }
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
  currentColumnInfo: {
    data_type: string;
    is_nullable: boolean;
    column_default: any;
  },
) {
  // let's have this flag for weird changes, there is only so little we would like to change
  // that could break the app
  let noOp = false;
  let somethingChanged = false;
  // for example a type change (say from int to boolean), can break stuff
  if (!checkTypesAreEquivalent(currentColumnInfo.data_type, newColumnSchema.type, currentColumnInfo.column_default)) {
    // so we warn and set the noop flag
    console.log(colors.red("A column at " + tableName + "." + columnName +
      " has been changed type from " + currentColumnInfo.data_type + " to " +
      newColumnSchema.type + " this is a no-op"));
    noOp = true;
    somethingChanged = true;
  }

  // primary indexes are not nullable
  const notNullNew = newColumnSchema.notNull || newColumnSchema.index?.type.toLowerCase() === "primary";

  // also to deny nulls, nulls are always active
  if (currentColumnInfo.is_nullable !== !notNullNew) {
    if (notNullNew) {
      // this is a noop too, there might be nulls
      console.log(colors.red("A column has changed from being nullable to not being nullable at " +
        tableName + "." + columnName + " this is a no-op"));
      noOp = true;
    }
    somethingChanged = true;
  }

  // let's show a message for the column change
  if (!noOp) {
    console.log(colors.yellow("A column has changed at " + tableName + "." + columnName));
    if (!await checkValuesAreEquivalent(
      databaseConnection,
      currentColumnInfo.column_default,
      newColumnSchema.defaultTo,
      newColumnSchema.type.toUpperCase().includes("SERIAL"),
    )) {
      console.log(colors.yellow(
        "The default value of " + JSON.stringify(columnName) + " in " + JSON.stringify(tableName)  + " has changed from " +
        JSON.stringify(currentColumnInfo.column_default) +
        " to " +
        JSON.stringify(typeof newColumnSchema.defaultTo === "undefined" ? null : newColumnSchema.defaultTo))
      );
      somethingChanged = true;
    }
  }

  if (!somethingChanged) {
    console.log(colors.yellow("but nothing has changed, leaving as it is"));
    return;
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
      await showErrorStackAndLogMessage(err);
    }
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
      defaultTo: convertValueToExpression(columnData.defaultTo),
    };
  });

  // now we need to ask if we want that to be executed
  if (await yesno("Do you want to create the table? saying no might cause breaking changes")) {
    // we try to execute it
    try {
      await databaseConnection.query(createTableQuery);
      return finalTableSchema;
    } catch (err) {
      await showErrorStackAndLogMessage(err);
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
) {
  // we need to check what changed, so we go thru every single column
  for (const columnName of Object.keys(newTableSchema)) {
    // we get the data from the column
    const newColumnSchema = newTableSchema[columnName];

    const rawColumnInfo = await databaseConnection.queryFirst("SELECT column_name, data_type, is_nullable, column_default FROM " +
      "information_schema.columns WHERE table_schema = $1 AND table_name = $2 AND column_name = $3",
      [
        "public",
        tableName,
        columnName,
      ]
    );

    const columnInfo = rawColumnInfo ? {
      column_name: rawColumnInfo.column_name,
      data_type: rawColumnInfo.data_type,
      is_nullable: rawColumnInfo.is_nullable === "YES",
      column_default: rawColumnInfo.column_default,
    } : null;

    // if there was no such column
    if (!columnInfo) {
      await addMissingColumnToTable(databaseConnection, tableName, columnName, newColumnSchema);
      // Otherwise if there was just a change in the column basic information
      // that is because this is only in charge of the basic structure
    } else if (
      columnInfo.is_nullable !== !(newColumnSchema.notNull || newColumnSchema.index?.type.toLowerCase() === "primary") ||
      !checkTypesAreEquivalent(columnInfo.data_type, newColumnSchema.type, columnInfo.column_default) ||
      !(await checkValuesAreEquivalent(
        databaseConnection,
        columnInfo.column_default,
        newColumnSchema.defaultTo,
        newColumnSchema.type.toUpperCase().includes("SERIAL"),
      ))
    ) {
      await updateColumnInTable(
        databaseConnection,
        tableName,
        columnName,
        newColumnSchema,
        columnInfo,
      );
    }
  }

  const columnNames = await databaseConnection.queryRows(
    "SELECT column_name FROM information_schema.columns WHERE table_schema=$1 AND table_name=$2",
    [
      "public",
      tableName,
    ],
  );

  // now we loop in the current ones
  for (const columnData of columnNames) {
    const columnName = columnData.column_name;
    // grab this
    const newColumnSchema = newTableSchema[columnName];

    // we want to find if there are deleted column
    // currentColumnSchema might be null in some situation this has happened in the past
    // so it's worth a check that the value is set, even when it shouldn't be
    if (!newColumnSchema) {
      await dropExtraColumnInTable(databaseConnection, tableName, columnName);
    }
  }
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
      await showErrorStackAndLogMessage(err);
      if (await yesno("Consider it successful? The table will be considered as properly removed")) {
        return null;
      }
    }
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
  newDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<void> {

  // so we start by looping, we use an of-loop because we want
  // to keep things sync, despite being an async function
  for (const tableName of Object.keys(newDatabaseSchema)) {
    const newTableSchema = newDatabaseSchema[tableName];

    const tableExists = await databaseConnection.queryFirst(
      "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name=$1 AND table_schema=$2)",
      [
        tableName,
        "public",
      ]
    );

    // if there is no current schema
    if (!tableExists.exists) {
      await createTable(databaseConnection, tableName, newTableSchema);
      // So if there is an current schema and this is an update
    } else {
      await updateTable(databaseConnection, tableName, newTableSchema);
    }
  }

  const allTablesInDb = await databaseConnection.queryRows(
    "SELECT table_name FROM information_schema.tables WHERE " +
    "table_schema = $1 AND table_type = 'BASE TABLE'",
    [
      "public",
    ],
  );

  // now we want to check for dropped tables, by looping on the previous
  // migration config
  for (const tableDataRow of allTablesInDb) {
    // if we don't find any table data in the new config
    if (!newDatabaseSchema[tableDataRow.table_name] && tableDataRow.table_name.startsWith("MOD_")) {
      // we call the drop
      await dropTable(
        databaseConnection,
        tableDataRow.table_name,
      );
    }
  }
}
