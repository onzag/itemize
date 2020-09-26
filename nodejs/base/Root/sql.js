"use strict";
/**
 * Basically just contains types and the function that specifies how the whole
 * database for the itemize project should be described
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSQLTablesSchemaForRoot = void 0;
const sql_1 = require("./Module/sql");
const constants_1 = require("../../constants");
/**
 * Provides the whole schema that is necessary to populate
 * in order for all the items contained within this root
 * to function in the database
 * @param root The root in question
 * @returns a total database schema
 */
function getSQLTablesSchemaForRoot(knex, root) {
    let resultSchema = {
        [constants_1.CURRENCY_FACTORS_IDENTIFIER]: {
            code: {
                type: "text",
                index: {
                    id: "code_index",
                    type: "primary",
                    level: 1,
                },
            },
            factor: {
                type: "float"
            }
        }
    };
    root.getAllModules().forEach((cModule) => {
        // add together the schemas of all the modules
        resultSchema = { ...resultSchema, ...sql_1.getSQLTablesSchemaForModule(knex, cModule) };
    });
    // return that
    return resultSchema;
}
exports.getSQLTablesSchemaForRoot = getSQLTablesSchemaForRoot;
