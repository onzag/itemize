import equals from "deep-equal";

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import Knex from "knex";
import Confirm from "prompt-confirm";

import Root, { ISQLColumnDefinitionType, ISQLSchemaDefinitionType } from "../base/Root";

const fsAsync = fs.promises;
// TODO implement foreign keys, fk, fkAction, etc...
function yesno(question: string) {
  return (new Confirm(question)).run();
}

(async () => {
  // Retrieve the config for the database
  const dbConfig = JSON.parse(await fsAsync.readFile(
    path.join("config", "db.json"),
    "utf8",
  ));

  // Retrieve the past migration configuration
  // if available
  let migrationConfig: ISQLSchemaDefinitionType = {};
  try {
    migrationConfig = JSON.parse(await fsAsync.readFile(
      path.join("config", "dbhistory", "db-status.latest.json"),
      "utf8",
    ));
  } catch (e) {
    console.log(colors.yellow("Could not find a Migration File..."));
  }

  // Create the connection string
  const dbConnectionKnexConfig = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  };

  // we only need one client instance
  const knex = Knex({
    client: "pg",
    debug: true,
    connection: dbConnectionKnexConfig,
  });

  console.log(colors.yellow(`attempting database connection at ${dbConnectionKnexConfig.host}...`));

  // parse the data
  const data = JSON.parse(await fsAsync.readFile(
    path.join("dist", "data", "build.en.json"),
    "utf8",
  ));

  // build the root from that data
  const root = new Root(data.root);

  // let's get the result by progressively building on top of it
  const result = root.getSQLTablesSchema();

  // make some copies of that result
  const optimal = {...result};
  const actual = {...result};

  // this function will modify actual
  // for the actual executed functions
  await buildFromData(knex, migrationConfig, actual);
  knex.destroy();

  // write the resulting actual
  await fsAsync.writeFile(
    path.join("config", "dbhistory", "db-status.latest.json"),
    JSON.stringify(actual, null, 2),
  );
  await fsAsync.writeFile(
    path.join("config", "dbhistory", `db-status.${(new Date()).toJSON().replace(/:/g, ".")}.json`),
    JSON.stringify(actual, null, 2),
  );

  // Write the optimal, what should have been
  await fsAsync.writeFile(
    path.join("config", "dbhistory", `db-status.${(new Date()).toJSON().replace(/:/g, ".")}.optimal.json`),
    JSON.stringify(optimal, null, 2),
  );
  await fsAsync.writeFile(
    path.join("config", "dbhistory", `db-status.latest.optimal.json`),
    JSON.stringify(optimal, null, 2),
  );

  // say it's all done
  console.log(colors.green("All done..."));
})();

/**
 * Builds a type from the knex table
 * @param columnName the column name we want to create
 * @param columnData the column data from migrations
 * @param table the table creator
 */
function buildType(
  columnName: string,
  columnData: ISQLColumnDefinitionType,
  table: Knex.CreateTableBuilder,
): Knex.ColumnBuilder {
  let actualType = columnData.type;
  if (actualType === "serial") {
    actualType = "increments";
  }

  const tableColumnExec = !table[actualType] ?
    table.specificType(columnName, actualType) :
    table[actualType](columnName);
  if (columnData.notNull) {
    tableColumnExec.notNullable();
  }

  return tableColumnExec;
}

function showErrorStackAndLogMessage(err: Error) {
  console.log(colors.red(err.stack));
  console.log(colors.yellow("You might fix this issue and all others by hand and " +
    "rename db-status.ignore-errors.latest.json to db-status.latest.json"));
}

/**
 * This function actually does the database calls
 * @param knex the knex instance
 * @param previousMigrationConfig the previous latest migration config that shows
 * the current state of the database
 * @param newMigrationConfig the new migration config we expect to apply (and we would modify if it changes)
 */
async function buildFromData(
  knex: Knex,
  previousMigrationConfig: ISQLSchemaDefinitionType,
  newMigrationConfig: ISQLSchemaDefinitionType,
) {
  // so we start by looping, we use an of-loop because we want
  // to keep things sync, despite being an async function
  for (const tableName of Object.keys(newMigrationConfig)) {
    // the result table schema for that specific table
    const resultTableSchema = newMigrationConfig[tableName];
    const oldResultTableSchema = previousMigrationConfig[tableName];

    // if there is no old schema
    if (!oldResultTableSchema) {
      // that means the new schema expects to add a table
      console.log(colors.yellow("Table for " + tableName + " is missing"));

      // build the query with the query builder of knex
      const createQuery = knex.schema.withSchema("public").createTable(tableName, (table) => {
        // for each column we build the type
        Object.keys(resultTableSchema).forEach((columnName) => {
          const columnData = resultTableSchema[columnName];
          buildType(columnName, columnData, table);
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
          delete newMigrationConfig[tableName];
        }
      } else {
        // we delete from the new one
        delete newMigrationConfig[tableName];
      }

    // So if there is an old schema and this is an update
    } else {

      // we need to check what changed, so we go thru every single column
      for (const columnName of Object.keys(resultTableSchema)) {
        // we get the data from the column
        const newColumnData = resultTableSchema[columnName];
        const oldColumnData = oldResultTableSchema[columnName];

        // if there was no such column
        if (!oldColumnData) {

          // it means that this column is expected to be added
          console.log(colors.yellow("A new column at " + tableName + " has been added named " + columnName));

          // we create the update query
          const updateQuery = knex.schema.withSchema("public").alterTable(tableName, (table) => {
            buildType(columnName, newColumnData, table);
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
              delete resultTableSchema[columnName];
            }
          } else {
            // delete from both schemas
            delete resultTableSchema[columnName];
          }

        // Otherwise if there was just a change in the column
        } else if (oldColumnData.type !== newColumnData.type || oldColumnData.notNull !== newColumnData.notNull) {

          // let's have this flag for weird changes, there is only so little we would like to change
          // that could break the app
          let noOp = false;
          // for example a type change (say from int to boolean), can break stuff
          if (oldColumnData.type !== newColumnData.type) {
            // so we warn and set the noop flag
            console.log(colors.red("A column at " + tableName + "." + columnName +
            " has been changed type from " + oldColumnData.type + " to " + newColumnData.type + " this is a no-op"));
            noOp = true;
          }

          // also to deny nulls, nulls are always active
          if (!!oldColumnData.notNull !== !!newColumnData.notNull && newColumnData.notNull) {
            // this is a noop too, there might be nulls
            console.log(colors.red("A column has changed from not being nullable to being nullable at " +
            tableName + "." + columnName + " this is a no-op"));
            noOp = true;
          }

          // so we create the query anyway
          const updateQuery = knex.schema.withSchema("public").alterTable(tableName, (table) => {
            // set it as an alter for a column
            buildType(columnName, newColumnData, table).alter();
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
              newColumnData.type = oldColumnData.type;
              newColumnData.notNull = oldColumnData.notNull;
            }
          } else {
            newColumnData.type = oldColumnData.type;
            newColumnData.notNull = oldColumnData.notNull;
          }
        }
      }

      // now we loop in the old ones
      for (const columnName of Object.keys(oldResultTableSchema)) {
        // grab this
        const newColumnData = resultTableSchema[columnName];
        const oldColumnData = oldResultTableSchema[columnName];

        // we want to find if there are deleted columns
        if (!newColumnData) {
          // if we find it notify
          console.log(colors.yellow("A column at " + tableName + " has been dropped, named " + columnName));

          // make the query
          const dropQuery = knex.schema.withSchema("public").alterTable(tableName, (table) => {
            if (oldColumnData[columnName].fkTable) {
              table.dropForeign([columnName]);
            }
            table.dropColumn(columnName);
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
              resultTableSchema[columnName] = oldColumnData;
            }
          } else {
            resultTableSchema[columnName] = oldColumnData;
          }
        }
      }
    }
  }

  // now we want to check for dropped tables, by looping on the previous
  // migration config
  for (const tableName of Object.keys(previousMigrationConfig)) {
    // if we don't find any table data in the new config
    if (!newMigrationConfig[tableName]) {
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
          newMigrationConfig[tableName] = previousMigrationConfig[tableName];
        }
      } else {
        newMigrationConfig[tableName] = previousMigrationConfig[tableName];
      }
    }
  }

  // Now we want to check for foreign keys we start over, add foreign keys
  // later because we don't know what order were tables added
  for (const tableName of Object.keys(newMigrationConfig)) {
    // the result table schema for that specific table
    const resultTableSchema = newMigrationConfig[tableName];
    const oldResultTableSchema = previousMigrationConfig[tableName];

    for (const columnName of Object.keys(resultTableSchema)) {
      // we get the data from the column
      const newColumnData = resultTableSchema[columnName];
      const oldColumnData = oldResultTableSchema && oldResultTableSchema[columnName];

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
          buildType(columnName, resultTableSchema[columnName], table)
            .references(newFkColumn).inTable(newFkTable).onDelete(newFkAction)
            .alter();
        });

        if (!oldFkTable) {
          // ask to add the foreign key
          if (await yesno(
            `Foreign key on ${tableName}.${columnName} which references ${newFkTable}.${newFkColumn} is missing, create it?`,
          )) {
            try {
              console.log(foreignKeyCreation.toString());
              await foreignKeyCreation;
            } catch (err) {
              showErrorStackAndLogMessage(err);
              delete resultTableSchema[columnName].fkTable;
              delete resultTableSchema[columnName].fkAction;
              delete resultTableSchema[columnName].fkCol;
            }
          } else {
            delete resultTableSchema[columnName].fkTable;
            delete resultTableSchema[columnName].fkAction;
            delete resultTableSchema[columnName].fkCol;
          }
        } else if (
          oldFkTable !== newFkTable ||
          oldFkColumn !== newFkColumn ||
          oldFkAction !== newFkAction
        ) {
          // drop old foreign key and create new
          if (await yesno(
            `Foreign key on ${tableName}.${columnName} which references ${oldFkTable}.${oldFkColumn} ${oldFkAction} has been changed ` +
            `to ${newFkTable}.${newFkColumn} ${newFkAction}, update?`,
          )) {
            // try to drop old foreign key
            try {
              console.log(oldForeignKeyDrop.toString());
              await oldForeignKeyDrop;

              // if we succeed and we came here we update the
              // resulting schema to reflect that the fk is gone
              delete resultTableSchema[columnName].fkTable;
              delete resultTableSchema[columnName].fkAction;
              delete resultTableSchema[columnName].fkCol;

              // now we enter into a second clause
              // this won't execute if the first one fails
              try {
                console.log(foreignKeyCreation.toString());
                await foreignKeyCreation;

                // now we update to reflect we have added the new
                // foreign key
                resultTableSchema[columnName].fkTable = newFkTable;
                resultTableSchema[columnName].fkAction = newFkAction;
                resultTableSchema[columnName].fkCol = newFkColumn;
              } catch (err) {
                // we show an error but do nothing to reflect
                // the change, because we already did so beforehand
                showErrorStackAndLogMessage(err);
              }
            } catch (err) {
              // this error only comes if old foriegn key fails to drop
              // hence we restore the old foreign key
              showErrorStackAndLogMessage(err);
              resultTableSchema[columnName].fkTable = oldFkTable;
              resultTableSchema[columnName].fkAction = oldFkAction;
              resultTableSchema[columnName].fkCol = oldFkColumn;
            }
          } else {
            // we restore the old foreign key by user request
            resultTableSchema[columnName].fkTable = oldFkTable;
            resultTableSchema[columnName].fkAction = oldFkAction;
            resultTableSchema[columnName].fkCol = oldFkColumn;
          }
        }
      } else if (oldFkTable) {
        // drop old foreign key
        if (await yesno(
          `Foreign key on ${tableName}.${columnName} which references ${oldFkTable}.${oldFkColumn} has been dropped, ` +
          ` remove?`,
        )) {
          try {
            console.log(oldForeignKeyDrop.toString());
            await oldForeignKeyDrop;
          } catch (err) {
            showErrorStackAndLogMessage(err);
            resultTableSchema[columnName].fkTable = oldFkTable;
            resultTableSchema[columnName].fkAction = oldFkAction;
            resultTableSchema[columnName].fkCol = oldFkColumn;
          }
        } else {
          resultTableSchema[columnName].fkTable = oldFkTable;
          resultTableSchema[columnName].fkAction = oldFkAction;
          resultTableSchema[columnName].fkCol = oldFkColumn;
        }
      }
    }
  }
}
