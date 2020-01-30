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
  let oldDatabaseSchema: ISQLSchemaDefinitionType = {};
  try {
    oldDatabaseSchema = JSON.parse(await fsAsync.readFile(
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
    path.join("dist", "data", "build.all.json"),
    "utf8",
  ));

  // build the root from that data
  const root = new Root(data);

  // let's get the result by progressively building on top of it
  const result = getSQLTablesSchemaForRoot(root);

  // make some copies of that result
  const optimal = {...result};
  const actual = {...result};

  // this function will modify actual
  // for the actual executed functions
  try {
    await buildDatabase(knex, oldDatabaseSchema, actual);
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
 * @param oldDatabaseSchema the previous latest migration config that shows
 * the current state of the database
 * @param newDatabaseSchema the new migration config we expect to apply (and we would modify if it changes)
 */
async function buildDatabase(
  knex: Knex,
  oldDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
) {
  await buildTables(knex, oldDatabaseSchema, newDatabaseSchema);
  await buildForeignKeys(knex, oldDatabaseSchema, newDatabaseSchema);
  await buildIndexes(knex, oldDatabaseSchema, newDatabaseSchema);
}
