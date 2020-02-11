"use strict";
/**
 * Basically just contains types and the function that specifies how the whole
 * database for the itemize project should be described
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("./Module/sql");
/**
 * Provides the whole schema that is necessary to populate
 * in order for all the items contained within this root
 * to function in the database
 * @param root The root in question
 * @returns a total database schema
 */
function getSQLTablesSchemaForRoot(root) {
    let resultSchema = {};
    root.getAllModules().forEach((cModule) => {
        // add together the schemas of all the modules
        resultSchema = { ...resultSchema, ...sql_1.getSQLTablesSchemaForModule(cModule) };
    });
    // return that
    return resultSchema;
}
exports.getSQLTablesSchemaForRoot = getSQLTablesSchemaForRoot;
