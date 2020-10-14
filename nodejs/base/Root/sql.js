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
        },
        [constants_1.DELETED_REGISTRY_IDENTIFIER]: {
            reg_id: {
                type: "serial",
                notNull: true,
                index: {
                    id: "PRIMARY_KEY",
                    type: "primary",
                    level: 0,
                },
            },
            id: {
                type: "integer",
                notNull: true,
            },
            version: {
                type: "text",
                notNull: true,
            },
            type: {
                type: "text",
                notNull: true
            },
            created_by: {
                type: "integer",
                index: {
                    id: constants_1.CREATED_BY_INDEX,
                    level: 0,
                    type: "btree",
                }
            },
            parenting_id: {
                type: "text",
                index: {
                    id: constants_1.PARENT_INDEX,
                    level: 0,
                    type: "btree",
                }
            },
            transaction_time: {
                type: "datetime",
            },
        },
    };
    root.getAllModules().forEach((cModule) => {
        // add together the schemas of all the modules
        resultSchema = { ...resultSchema, ...sql_1.getSQLTablesSchemaForModule(knex, cModule) };
    });
    // return that
    return resultSchema;
}
exports.getSQLTablesSchemaForRoot = getSQLTablesSchemaForRoot;
