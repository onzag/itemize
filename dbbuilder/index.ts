/**
 * Contains the builder that builds the database based on the schema
 * that is generated during the compiltation process
 *
 * @module
 */

import fs from "fs";
import path from "path";
import colors from "colors/safe";

import Root from "../base/Root";
import { buildTables } from "./build-tables";
import { buildForeignKeys } from "./build-foreign-key";
import { ISQLSchemaDefinitionType, getSQLTablesSchemaForRoot } from "../base/Root/sql";
import { buildIndexes } from "./build-index";
import { IDBConfigRawJSONDataType } from "../config";
import { prepareExtensions } from "./extensions";
import dump from "./dump";
import loadDump from "./load-dump";
import { postprocessIdTriggers, prepareIdTrigger } from "./id";
import { DatabaseConnection } from "../database";
import read from "read";

const fsAsync = fs.promises;

/**
 * Simple function to ask for a question
 * @param question the question to ask
 * @returns a boolean on the answer
 */
export function yesno(question: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    read({
      prompt: question,
      default: "y",
    }, (error, result, isDefault) => {
      if (error) {
        return yesno(question);
      } else {
        resolve(result.toLowerCase() === "y");
      }
    });
  });
}

/**
 * Actually runs the build
 */
export default async function build(version: string, action: "build" | "dump" | "load-dump" = "build") {
  // Retrieve the config for the database
  let configToUse = version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`;
  const dbConfig: IDBConfigRawJSONDataType = JSON.parse(await fsAsync.readFile(
    path.join("config", configToUse),
    "utf8",
  ));

  // Create the connection string
  const dbConnectionConfig = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  };

  // parse the data
  let data: any;
  try {
    data = JSON.parse(await fsAsync.readFile(
      path.join("dist", "data", "build.all.json"),
      "utf8",
    ));
  } catch (err) {
    console.log(colors.yellow("Error while reading " + path.join("dist", "data", "build.all.json")));
    console.log(colors.red(err.stack));

    try {
      data = JSON.parse(await fsAsync.readFile(
        "build.all.json",
        "utf8",
      ));
    } catch (err) {
      console.log(colors.yellow("Error while reading build.all.json"));
      console.log(colors.red(err.stack));
    }
  }

  if (!data) {
    process.exit(1);
  }

  console.log(colors.yellow(`attempting database connection at ${dbConnectionConfig.host}...`));

  // we only need one client instance
  const databaseConnection = new DatabaseConnection(dbConnectionConfig);
  databaseConnection.forceLogging();

  console.log(colors.yellow(`Established at ${dbConnectionConfig.host}...`));

  // build the root from that data
  const root = new Root(data);

  if (action === "dump") {
    return dump(version, databaseConnection, root);
  } else if (action === "load-dump") {
    return loadDump(version, databaseConnection, root);
  }

  let optimal: ISQLSchemaDefinitionType;
  let actual: ISQLSchemaDefinitionType;

  

  // write the resulting actual
  let showAllDone = true;
  try {
    await buildDatabase(databaseConnection, getSQLTablesSchemaForRoot(root));
  } catch (err) {
    console.log(colors.red("FAILED TO WRITE UPDATES TO THE DATABASE"));
    console.log(colors.red("PLEASE DO NOT ATTEMPT TO UPDATE THE SERVER IN THIS STATE AS THIS CAN LEAD TO DATA CORRUPTION"));
    console.log(colors.red("PLEASE RUN THIS SCRIPT AGAIN TO FIX THIS ONCE YOU FIX THE ISSUE"));

    showAllDone = false;
  }

  // say it's all done
  if (showAllDone) {
    console.log(colors.green("All done..."));
  }
};

export function showErrorStackAndLogMessage(err: Error) {
  console.log(colors.red(err.stack));
}

/**
 * This function actually does the database calls
 * @param databaseConnection the database instance
 * @param currentDatabaseSchema the current latest migration config that shows
 * the current state of the database
 * @param newDatabaseSchema the new migration config we expect to apply (and we would modify if it changes)
 * @returns the new database schema that resulted
 */
async function buildDatabase(
  databaseConnection: DatabaseConnection,
  newDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<void> {
  await prepareExtensions(databaseConnection, newDatabaseSchema);
  await prepareIdTrigger(databaseConnection);

  await buildTables(databaseConnection, newDatabaseSchema);
  await buildIndexes(databaseConnection, newDatabaseSchema);
  await buildForeignKeys(databaseConnection, newDatabaseSchema);

  await postprocessIdTriggers(
    databaseConnection,
  );
}
