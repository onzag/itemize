/**
 * Contains the builder that builds the database based on the schema
 * that is generated during the compiltation process
 *
 * @packageDocumentation
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";
import Knex from "knex";
import Confirm from "prompt-confirm";

import Root from "../base/Root";
import { buildTables } from "./build-tables";
import { buildForeignKeys } from "./build-foreign-key";
import { ISQLSchemaDefinitionType, getSQLTablesSchemaForRoot } from "../base/Root/sql";
import { buildIndexes } from "./build-index";

const fsAsync = fs.promises;

/**
 * Simple function to ask for a question
 * @param question the question to ask
 * @returns a boolean on the answer
 */
export function yesno(question: string) {
  return (new Confirm(question)).run();
}

(async () => {
  // Retrieve the config for the database
  const dbConfig = JSON.parse(await fsAsync.readFile(
    path.join("config", "db.sensitive.json"),
    "utf8",
  ));

  // Retrieve the past migration configuration
  // if available
  let currentDatabaseSchema: ISQLSchemaDefinitionType = {};
  try {
    currentDatabaseSchema = JSON.parse(await fsAsync.readFile(
      path.join("config", "dbhistory", "db-status.latest.json"),
      "utf8",
    ));
  } catch (e) {
    console.log(colors.yellow("Could not find a Previous Schema File..."));
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
    path.join("dist", "data", "build.all.json"),
    "utf8",
  ));

  // build the root from that data
  const root = new Root(data);

  // let's get the result by progressively building on top of it
  const optimal = getSQLTablesSchemaForRoot(root);

  // this function will modify actual
  // for the actual executed functions
  let actual: ISQLSchemaDefinitionType;
  try {
    actual = await buildDatabase(knex, currentDatabaseSchema, optimal);
  } catch (err) {
    console.error(err.stack);
    return;
  }
  knex.destroy();

  // write the resulting actual
  await fsAsync.writeFile(
    path.join("config", "dbhistory", "db-status.latest.json"),
    JSON.stringify(actual, null, 2),
  );
  await fsAsync.writeFile(
    path.join("config", "dbhistory", `db-status.${(new Date()).toISOString().replace(/:/g, ".")}.json`),
    JSON.stringify(actual, null, 2),
  );

  // Write the optimal, what should have been
  await fsAsync.writeFile(
    path.join("config", "dbhistory", `db-status.${(new Date()).toISOString().replace(/:/g, ".")}.optimal.json`),
    JSON.stringify(optimal, null, 2),
  );
  await fsAsync.writeFile(
    path.join("config", "dbhistory", `db-status.latest.optimal.json`),
    JSON.stringify(optimal, null, 2),
  );

  // say it's all done
  console.log(colors.green("All done..."));
})();

export function showErrorStackAndLogMessage(err: Error) {
  console.log(colors.red(err.stack));
}

/**
 * This function actually does the database calls
 * @param knex the knex instance
 * @param currentDatabaseSchema the current latest migration config that shows
 * the current state of the database
 * @param newDatabaseSchema the new migration config we expect to apply (and we would modify if it changes)
 * @returns the new database schema that resulted
 */
async function buildDatabase(
  knex: Knex,
  currentDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<ISQLSchemaDefinitionType> {
  let transitoryCurrentSchema = await buildTables(knex, currentDatabaseSchema, newDatabaseSchema);
  transitoryCurrentSchema = await buildForeignKeys(knex, transitoryCurrentSchema, newDatabaseSchema);
  transitoryCurrentSchema = await buildIndexes(knex, transitoryCurrentSchema, newDatabaseSchema);
  return transitoryCurrentSchema;
}
