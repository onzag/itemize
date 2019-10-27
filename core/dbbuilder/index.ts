import equals from "deep-equal";

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import Knex from "knex";
import Confirm from "prompt-confirm";

import Root from "../base/Root";
import ItemDefinition from "../base/ItemDefinition";
import Module from "../base/Module";
import { RESERVED_BASE_PROPERTIES_SQL } from "../constants";

const fsAsync = fs.promises;

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
  let migrationConfig = {};
  try {
    migrationConfig = JSON.parse(await fsAsync.readFile(
      path.join("config", "db-status.latest.json"),
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
  let result = {};
  root.getAllModules().forEach((rModule) => {
    result = {...result, ...buildModuleTables(rModule)};
  });

  // make some copies of that result
  const optimal = {...result};
  const actual = {...result};
  const actualIgnoreErrors = {...result};

  // this function will modify actual and actualIgnoreErrors
  // for the actual executed functions
  await buildFromData(knex, migrationConfig, actual, actualIgnoreErrors);

  // write the resulting actual
  await fsAsync.writeFile(
    path.join("config", "db-status.latest.json"),
    JSON.stringify(actual, null, 2),
  );
  await fsAsync.writeFile(
    path.join("config", `db-status.${(new Date()).toJSON().replace(/:/g, ".")}.json`),
    JSON.stringify(actual, null, 2),
  );

  // write the actual with the errors ignored
  await fsAsync.writeFile(
    path.join("config", "db-status.ignore-errors.latest.json"),
    JSON.stringify(actualIgnoreErrors, null, 2),
  );
  await fsAsync.writeFile(
    path.join("config", `db-status.ignore-errors.${(new Date()).toJSON().replace(/:/g, ".")}.json`),
    JSON.stringify(actualIgnoreErrors, null, 2),
  );

  // Write the optimal, what should have been
  await fsAsync.writeFile(
    path.join("config", `db-status.${(new Date()).toJSON().replace(/:/g, ".")}.optimal.json`),
    JSON.stringify(optimal, null, 2),
  );
  await fsAsync.writeFile(
    path.join("config", `db-status.latest.optimal.json`),
    JSON.stringify(optimal, null, 2),
  );

  // say it's all done
  console.log(colors.green("All done..."));
})();

/**
 * Builds a module migration configuration
 * @param rModule the module in question
 * @returns the migration configuration
 */
function buildModuleTables(rModule: Module) {
  // we progresively build the result
  let result = {};
  rModule.getAllModules().forEach((cModule) => {
    // first with child modules
    result = {...result, ...buildModuleTables(cModule)};
  });
  // then with child item definitions
  rModule.getAllChildItemDefinitions().forEach((cIdef) => {
    result = {...result, ...buildItemDefinitionTables(cIdef)};
  });
  return result;
}

/**
 * Builds the table for an item definition
 * @param itemDefinition the item definition in question
 * @retuurns the migration table
 */
function buildItemDefinitionTables(itemDefinition: ItemDefinition) {
  // let's get the qualified path name for the item definition
  const qualifiedPathName = itemDefinition.getQualifiedPathName();

  // add all the standard fields
  const resultTableSchema = {...RESERVED_BASE_PROPERTIES_SQL};

  // now we loop thru every property (they will all become columns)
  itemDefinition.getAllPropertyDefinitions().forEach((pd) => {
    // get the sql def based on the property definition
    const sqlDef = pd.getPropertyDefinitionDescription().sql;
    // if it's a string, that's the type
    if (typeof sqlDef === "string") {
      resultTableSchema[pd.getId()] = {
        type: sqlDef,
      };
    // otherwise we might have a more complex value
    } else {
      // let's get it based on the function it is
      const complexValue = sqlDef(pd.getId());
      // we are going to loop over that object
      Object.keys(complexValue).forEach((key) => {
        // so we can add each row that it returns to the table schema
        resultTableSchema[key] = {
          type: complexValue[key],
        };
      });
    }
  });

  // now we loop over the child items
  itemDefinition.getAllItems().forEach((i) => {
    // we add each one of them, they are a foreign key
    // TODO foreign keys somehow
    resultTableSchema["CHILD_" + i.getId()] = {
      type: "integer",
    };
  });

  // add that to the result
  const result = {};
  result[qualifiedPathName] = resultTableSchema;
  return result;
}

/**
 * Builds a type from the knex table
 * @param rowName the row name we want to create
 * @param rowData the row data from migrations
 * @param table the table creator
 */
function buildType(rowName: string, rowData: any, table: Knex.CreateTableBuilder): Knex.ColumnBuilder {
  let actualType = rowData.type;
  if (actualType === "serial") {
    actualType = "increments";
  }

  const tableRowExec = !table[actualType] ?
    table.specificType(rowName, actualType) :
    table[actualType](rowName);
  if (rowData.notNull) {
    tableRowExec.notNullable();
  }

  return tableRowExec;
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
 * @param newMigrationConfigIgnoreErrors the new migration config we expect to apply
 * and we would modify as well bug ignore the errrors that might occur and treat it as sucesful even
 * if the step failed due to an error
 */
async function buildFromData(
  knex: Knex,
  previousMigrationConfig: any,
  newMigrationConfig: any,
  newMigrationConfigIgnoreErrors: any,
) {
  // so we start by looping, we use an of-loop because we want
  // to keep things sync, despite being an async function
  for (const qualifiedPathName of Object.keys(newMigrationConfig)) {
    // the result table schema for that specific table
    const resultTableSchema = newMigrationConfig[qualifiedPathName];
    const resultTableSchemaIgnoreErrors = newMigrationConfigIgnoreErrors[qualifiedPathName];
    const oldResultTableSchema = previousMigrationConfig[qualifiedPathName];

    // if there is no old schema
    if (!oldResultTableSchema) {
      // that means the new schema expects to add a table
      console.log(colors.yellow("Table for " + qualifiedPathName + " is missing"));

      // build the query with the query builder of knex
      const createQuery = knex.schema.withSchema("public").createTable(qualifiedPathName, (table) => {
        // for each row we build the type
        Object.keys(resultTableSchema).forEach((rowName) => {
          const rowData = resultTableSchema[rowName];
          buildType(rowName, rowData, table);
        });
      });

      // now we need to ask if we want that to be executed
      if (await yesno("Do you want to create the table? saying no might cause breaking changes")) {
        // we try to execute it
        try {
          console.log(createQuery.toString());
        } catch (err) {
          showErrorStackAndLogMessage(err);
          // we delete from the new one, modify it
          delete newMigrationConfig[qualifiedPathName];
        }
      } else {
        // we delete from the new one, and also from the one that ignores errors
        // because this was intended, not an error
        delete newMigrationConfig[qualifiedPathName];
        delete newMigrationConfigIgnoreErrors[qualifiedPathName];
      }

    // So if there is an old schema and this is an update
    } else {

      // we need to check what changed, so we go thru every single row
      for (const rowName of Object.keys(resultTableSchema)) {
        // we get the data from the row
        const newRowData = resultTableSchema[rowName];
        const oldRowData = oldResultTableSchema[rowName];

        // if there was no such row
        if (!oldRowData) {

          // it means that this row is expected to be added
          console.log(colors.yellow("A new row at " + qualifiedPathName + " has been added named " + rowName));

          // we create the update query
          const updateQuery = knex.schema.withSchema("public").alterTable(qualifiedPathName, (table) => {
            buildType(rowName, newRowData, table);
          });

          // ask if we want to execute it
          if (await yesno("Do you want to add the new row? saying no might cause breaking changes")) {
            // execute it
            try {
              console.log(updateQuery.toString());
            } catch (err) {
              showErrorStackAndLogMessage(err);
              // delete the row from the table schema as it failed
              delete resultTableSchema[rowName];
            }
          } else {
            // delete from both schemas
            delete resultTableSchema[rowName];
            delete resultTableSchemaIgnoreErrors[rowName];
          }

        // Otherwise if there was just a change in the row
        } else if (!equals(oldRowData, newRowData)) {

          // let's have this flag for weird changes, there is only so little we would like to change
          // that could break the app
          let noOp = false;
          // for example a type change (say from int to boolean), can break stuff
          if (oldRowData.type !== newRowData.type) {
            // so we warn and set the noop flag
            console.log(colors.red("A row at " + qualifiedPathName + "." + rowName +
            " has been changed type from " + oldRowData.type + " to " + newRowData.type + " this is a no-op"));
            noOp = true;
          }

          // also to deny nulls, nulls are always active
          if (!!oldRowData.notNull !== !!newRowData.notNull && newRowData.notNull) {
            // this is a noop too, there might be nulls
            console.log(colors.red("A row has changed from not being nullable to being nullable at " +
            qualifiedPathName + "." + rowName + " this is a no-op"));
            noOp = true;
          }

          // so we create the query anyway
          const updateQuery = knex.schema.withSchema("public").alterTable(qualifiedPathName, (table) => {
            // set it as an alter for a row
            buildType(rowName, newRowData, table).alter();
          });

          // now we ask the question, slightly different and more alarming
          // for noop changes
          if (await yesno(
            noOp ?
            "Do you still want to alter such row? this is delicate and might fail" :
            "Do you wish to alter this row?",
          )) {
            // we give it a try
            try {
              console.log(updateQuery.toString());
            } catch (err) {
              showErrorStackAndLogMessage(err);
              delete resultTableSchema[rowName];
            }
          } else {
            delete resultTableSchema[rowName];
            delete resultTableSchemaIgnoreErrors[rowName];
          }
        }
      }

      // now we loop in the old ones
      for (const rowName of Object.keys(oldResultTableSchema)) {
        // grab this
        const newRowData = resultTableSchema[rowName];
        const oldRowData = oldResultTableSchema[rowName];

        // we want to find if there are deleted rows
        if (!newRowData) {
          // if we find it notify
          console.log(colors.yellow("A row at " + qualifiedPathName + " has been dropped, named " + rowName));

          // make the query
          const dropQuery = knex.schema.withSchema("public").alterTable(qualifiedPathName, (table) => {
            table.dropColumn(rowName);
          });

          // ask, for dropping things it's safe to leave
          if (await yesno("Do you want to drop the column? it's safe to leave it as it is")) {
            // execute if possible
            try {
              console.log(dropQuery.toString());
            } catch (err) {
              // if not change the result schema
              showErrorStackAndLogMessage(err);
              resultTableSchema[rowName] = oldRowData;
            }
          } else {
            resultTableSchema[rowName] = oldRowData;
            resultTableSchemaIgnoreErrors[rowName] = oldRowData;
          }
        }
      }
    }
  }

  // now we want to check for dropped tables, by looping on the previous
  // migration config
  for (const qualifiedPathName of Object.keys(previousMigrationConfig)) {
    // if we don't find any table data in the new config
    if (!newMigrationConfig[qualifiedPathName]) {
      // we can assume it's meant to be dropped
      console.log(colors.yellow("Table for " + qualifiedPathName + " is not required anymore"));

      // create the query
      const dropQuery = knex.schema.withSchema("public").dropTable(qualifiedPathName);

      // ask again, another drop query, it's okay if it stays
      if (await yesno("Do you want to drop the table? it's safe to leave it as it is")) {
        // do the call
        try {
          console.log(dropQuery.toString());
        } catch (err) {
          showErrorStackAndLogMessage(err);
          newMigrationConfig[qualifiedPathName] = previousMigrationConfig[qualifiedPathName];
        }
      } else {
        newMigrationConfig[qualifiedPathName] = previousMigrationConfig[qualifiedPathName];
        newMigrationConfigIgnoreErrors[qualifiedPathName] = previousMigrationConfig[qualifiedPathName];
      }
    }
  }
}
