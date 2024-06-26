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

  let isCorrupted = false;
  try {
    isCorrupted = JSON.parse(await fsAsync.readFile("db-status.corruption.json", "utf-8"));
  } catch {
    // DO nothing
  }

  let optimal: ISQLSchemaDefinitionType;
  let actual: ISQLSchemaDefinitionType;

  if (!isCorrupted) {
    // let's get the result by progressively building on top of it
    optimal = getSQLTablesSchemaForRoot(root);

    // Retrieve the past migration configuration
    // if available
    let currentDatabaseSchema: ISQLSchemaDefinitionType = {};
    const schemaTableExists = (await databaseConnection.queryFirst(
      `SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'schema') AS "exists"`,
    )).exists;
    if (schemaTableExists) {
      const currentSchemaData = (await databaseConnection.queryFirst(
        `SELECT "schema", "created_at" FROM "public"."schema" WHERE "status" = 'actual' ORDER BY "id" DESC LIMIT 1`,
      ));
      if (currentSchemaData) {
        console.log(colors.yellow("Found existing schema created at"), currentSchemaData.created_at);
        currentDatabaseSchema = JSON.parse(currentSchemaData.schema);
      } else {
        console.log(colors.yellow("Could not find a Previous Schema File..."));
      }
    } else {
      await databaseConnection.queryFirst(
        `CREATE TABLE "schema" (` +
        `"id" SERIAL PRIMARY KEY,` +
        `"schema" TEXT NOT NULL,` +
        `"status" TEXT NOT NULL,` +
        `"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()` +
        `)`
      );
      console.log(colors.yellow("Could not find a Previous Schema File..."));
    }

    // this function will modify actual
    // for the actual executed functions
    try {
      actual = await buildDatabase(databaseConnection, currentDatabaseSchema, optimal);
    } catch (err) {
      console.error(err.stack);
      return;
    }

    await fsAsync.writeFile(
      "db-status.json",
      JSON.stringify(actual, null, 2),
    );

    await fsAsync.writeFile(
      "db-status.optimal.json",
      JSON.stringify(optimal, null, 2),
    );
  } else {
    try {
      actual = JSON.parse(await fsAsync.readFile("db-status.json", "utf-8"));
      optimal = JSON.parse(await fsAsync.readFile("db-status.optimal.json", "utf-8"));
    } catch {
      console.log(colors.red("FAILED TO FIX STATED CORRUPTION"));
      process.exit(1);
    }
  }

  // write the resulting actual
  let showAllDone = true;
  try {
    await databaseConnection.query(
      `INSERT INTO "schema" ("schema", "status") VALUES ($1, $2), ($3, $4)`,
      [
        JSON.stringify(actual),
        "actual",
        JSON.stringify(optimal),
        "optimal",
      ]
    );

    await fsAsync.writeFile(
      "db-status.corruption.json",
      "false",
    );
  } catch (err) {
    console.log(colors.red("FAILED TO WRITE UPDATES TO THE DATABASE"));
    console.log(colors.red("PLEASE DO NOT ATTEMPT TO UPDATE THE SERVER IN THIS STATE AS THIS CAN LEAD TO DATA CORRUPTION"));
    console.log(colors.red("PLEASE RUN THIS SCRIPT AGAIN TO FIX THIS ONCE YOU FIX THE ISSUE"));

    await fsAsync.writeFile(
      "db-status.corruption.json",
      "true",
    );

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
  currentDatabaseSchema: ISQLSchemaDefinitionType,
  newDatabaseSchema: ISQLSchemaDefinitionType,
): Promise<ISQLSchemaDefinitionType> {
  await prepareExtensions(databaseConnection, newDatabaseSchema);
  await prepareIdTrigger(databaseConnection);

  let transitoryCurrentSchema = await buildTables(databaseConnection, currentDatabaseSchema, newDatabaseSchema);
  transitoryCurrentSchema = await buildIndexes(databaseConnection, transitoryCurrentSchema, newDatabaseSchema);
  transitoryCurrentSchema = await buildForeignKeys(databaseConnection, transitoryCurrentSchema, newDatabaseSchema);

  await postprocessIdTriggers(
    databaseConnection,
    transitoryCurrentSchema,
  );

  return transitoryCurrentSchema;
}
