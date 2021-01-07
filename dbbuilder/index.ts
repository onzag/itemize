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
// @ts-nocheck
import Confirm from "prompt-confirm";

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

const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");

const fsAsync = fs.promises;

/**
 * Simple function to ask for a question
 * @param question the question to ask
 * @returns a boolean on the answer
 */
export function yesno(question: string) {
  return (new Confirm(question)).run();
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
  const dbConnectionKnexConfig = {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  };

  if (USING_DOCKER && (dbConnectionKnexConfig.host === "localhost" || dbConnectionKnexConfig.host === "127.0.0.1")) {
    dbConnectionKnexConfig.host = "pgsql";
  }

  console.log(colors.yellow(`attempting database connection at ${dbConnectionKnexConfig.host}...`));

  // we only need one client instance
  const knex = Knex({
    client: "pg",
    debug: true,
    connection: dbConnectionKnexConfig,
  });

  // parse the data
  let data: any;
  try {
    data = JSON.parse(await fsAsync.readFile(
      path.join("dist", "data", "build.all.json"),
      "utf8",
    ));
  } catch {
    data = JSON.parse(await fsAsync.readFile(
      "build.all.json",
      "utf8",
    ));
  }

  // build the root from that data
  const root = new Root(data);

  if (action === "dump") {
    return dump(version, knex, root);
  } else if (action === "load-dump") {
    return loadDump(version, knex, root);
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
    optimal = getSQLTablesSchemaForRoot(knex, root);

    // Retrieve the past migration configuration
    // if available
    let currentDatabaseSchema: ISQLSchemaDefinitionType = {};
    const schemaTableExists = await knex.schema.withSchema("public").hasTable("schema");
    if (schemaTableExists) {
      const currentSchemaData = await knex.withSchema("public").first("schema", "created_at").from("schema").where({
        status: "actual",
      }).orderBy("id", "desc");
      if (currentSchemaData) {
        console.log(colors.yellow("Found existing schema created at"), currentSchemaData.created_at);
        currentDatabaseSchema = JSON.parse(currentSchemaData.schema);
      } else {
        console.log(colors.yellow("Could not find a Previous Schema File..."));
      }
    } else {
      await knex.schema.withSchema("public").createTable("schema", (table) => {
        table.increments();
        table.text("schema").notNullable();
        table.text("status").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      });
      console.log(colors.yellow("Could not find a Previous Schema File..."));
    }

    // this function will modify actual
    // for the actual executed functions
    try {
      actual = await buildDatabase(knex, currentDatabaseSchema, optimal);
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
    await knex.batchInsert("schema", [
      {
        schema: JSON.stringify(actual),
        status: "actual",
      },
      {
        schema: JSON.stringify(optimal),
        status: "optimal",
      },
    ], 2);

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

  knex.destroy();

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
  await prepareExtensions(knex, newDatabaseSchema);
  await prepareIdTrigger(knex);

  let transitoryCurrentSchema = await buildTables(knex, currentDatabaseSchema, newDatabaseSchema);
  transitoryCurrentSchema = await buildIndexes(knex, transitoryCurrentSchema, newDatabaseSchema);
  transitoryCurrentSchema = await buildForeignKeys(knex, transitoryCurrentSchema, newDatabaseSchema);

  await postprocessIdTriggers(
    knex,
    transitoryCurrentSchema,
  );

  return transitoryCurrentSchema;
}
