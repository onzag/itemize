"use strict";
/**
 * Contains the single file type description
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../sql");
const constants_1 = require("../../../../../../constants");
/**
 * The type value represents the behaviour of files in the app
 */
const typeValue = {
    gql: "PROPERTY_TYPE__File",
    gqlFields: {},
    gqlAddFileToFields: true,
    gqlList: false,
    searchable: false,
    specialProperties: [
        {
            name: "accept",
            type: "string",
        },
        {
            name: "imageUploader",
            type: "boolean",
        },
        {
            name: "dimensions",
            type: "string",
        },
        {
            name: "smallDimension",
            type: "string",
        },
        {
            name: "mediumDimension",
            type: "string",
        },
        {
            name: "largeDimension",
            type: "string",
        },
    ],
    sql: sql_1.getStandardSQLFnFor && sql_1.getStandardSQLFnFor("text"),
    sqlIn: sql_1.stardardSQLInWithJSONStringifyFn,
    sqlOut: sql_1.standardSQLOutWithJSONParseFn,
    sqlSearch: () => {
        throw new Error("Attempted to search within a file");
    },
    localSearch: () => {
        throw new Error("Attempted to search within a file locally");
    },
    sqlEqual: () => {
        throw new Error("Attempted to equal within a file");
    },
    sqlLocalEqual: () => {
        throw new Error("Attempted to local equal within a file");
    },
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        tooLargeErrorInclude: true,
    },
};
exports.default = typeValue;
