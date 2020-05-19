"use strict";
/**
 * Contains the builder that builds the database based on the schema
 * that is generated during the compiltation process
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const safe_1 = __importDefault(require("colors/safe"));
const knex_1 = __importDefault(require("knex"));
const prompt_confirm_1 = __importDefault(require("prompt-confirm"));
const Root_1 = __importDefault(require("../base/Root"));
const build_tables_1 = require("./build-tables");
const build_foreign_key_1 = require("./build-foreign-key");
const sql_1 = require("../base/Root/sql");
const build_index_1 = require("./build-index");
const extensions_1 = require("./extensions");
const USING_DOCKER = JSON.parse(process.env.USING_DOCKER || "false");
const fsAsync = fs_1.default.promises;
/**
 * Simple function to ask for a question
 * @param question the question to ask
 * @returns a boolean on the answer
 */
function yesno(question) {
    return (new prompt_confirm_1.default(question)).run();
}
exports.yesno = yesno;
/**
 * Actually runs the build
 */
async function build(version) {
    // Retrieve the config for the database
    let configToUse = version === "development" ? "db.sensitive.json" : `db.${version}.sensitive.json`;
    const dbConfig = JSON.parse(await fsAsync.readFile(path_1.default.join("config", configToUse), "utf8"));
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
    console.log(safe_1.default.yellow(`attempting database connection at ${dbConnectionKnexConfig.host}...`));
    // we only need one client instance
    const knex = knex_1.default({
        client: "pg",
        debug: true,
        connection: dbConnectionKnexConfig,
    });
    let isCorrupted = false;
    try {
        isCorrupted = JSON.parse(await fsAsync.readFile("db-status.corruption.json", "utf-8"));
    }
    catch {
        // DO nothing
    }
    let optimal;
    let actual;
    if (!isCorrupted) {
        // parse the data
        let data;
        try {
            data = JSON.parse(await fsAsync.readFile(path_1.default.join("dist", "data", "build.all.json"), "utf8"));
        }
        catch {
            data = JSON.parse(await fsAsync.readFile("build.all.json", "utf8"));
        }
        // build the root from that data
        const root = new Root_1.default(data);
        // let's get the result by progressively building on top of it
        optimal = sql_1.getSQLTablesSchemaForRoot(root);
        // Retrieve the past migration configuration
        // if available
        let currentDatabaseSchema = {};
        const schemaTableExists = await knex.schema.withSchema("public").hasTable("schema");
        if (schemaTableExists) {
            const currentSchemaData = await knex.withSchema("public").first("schema", "created_at").from("schema").where({
                status: "actual",
            }).orderBy("id", "desc");
            if (currentSchemaData) {
                console.log(safe_1.default.yellow("Found existing schema created at"), currentSchemaData.created_at);
                currentDatabaseSchema = JSON.parse(currentSchemaData.schema);
            }
            else {
                console.log(safe_1.default.yellow("Could not find a Previous Schema File..."));
            }
        }
        else {
            await knex.schema.withSchema("public").createTable("schema", (table) => {
                table.increments();
                table.text("schema").notNullable();
                table.text("status").notNullable();
                table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
            });
            console.log(safe_1.default.yellow("Could not find a Previous Schema File..."));
        }
        // this function will modify actual
        // for the actual executed functions
        try {
            actual = await buildDatabase(knex, currentDatabaseSchema, optimal);
        }
        catch (err) {
            console.error(err.stack);
            return;
        }
        await fsAsync.writeFile("db-status.json", JSON.stringify(actual, null, 2));
        await fsAsync.writeFile("db-status.optimal.json", JSON.stringify(optimal, null, 2));
    }
    else {
        try {
            actual = JSON.parse(await fsAsync.readFile("db-status.json", "utf-8"));
            optimal = JSON.parse(await fsAsync.readFile("db-status.optimal.json", "utf-8"));
        }
        catch {
            console.log(safe_1.default.red("FAILED TO FIX STATED CORRUPTION"));
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
        await fsAsync.writeFile("db-status.corruption.json", "false");
    }
    catch (err) {
        console.log(safe_1.default.red("FAILED TO WRITE UPDATES TO THE DATABASE"));
        console.log(safe_1.default.red("PLEASE DO NOT ATTEMPT TO UPDATE THE SERVER IN THIS STATE AS THIS CAN LEAD TO DATA CORRUPTION"));
        console.log(safe_1.default.red("PLEASE RUN THIS SCRIPT AGAIN TO FIX THIS ONCE YOU FIX THE ISSUE"));
        await fsAsync.writeFile("db-status.corruption.json", "true");
        showAllDone = false;
    }
    knex.destroy();
    // say it's all done
    if (showAllDone) {
        console.log(safe_1.default.green("All done..."));
    }
}
exports.default = build;
;
function showErrorStackAndLogMessage(err) {
    console.log(safe_1.default.red(err.stack));
}
exports.showErrorStackAndLogMessage = showErrorStackAndLogMessage;
/**
 * This function actually does the database calls
 * @param knex the knex instance
 * @param currentDatabaseSchema the current latest migration config that shows
 * the current state of the database
 * @param newDatabaseSchema the new migration config we expect to apply (and we would modify if it changes)
 * @returns the new database schema that resulted
 */
async function buildDatabase(knex, currentDatabaseSchema, newDatabaseSchema) {
    await extensions_1.prepareExtensions(knex, newDatabaseSchema);
    let transitoryCurrentSchema = await build_tables_1.buildTables(knex, currentDatabaseSchema, newDatabaseSchema);
    transitoryCurrentSchema = await build_index_1.buildIndexes(knex, transitoryCurrentSchema, newDatabaseSchema);
    transitoryCurrentSchema = await build_foreign_key_1.buildForeignKeys(knex, transitoryCurrentSchema, newDatabaseSchema);
    return transitoryCurrentSchema;
}
