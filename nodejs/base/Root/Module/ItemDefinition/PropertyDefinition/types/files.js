"use strict";
/**
 * Contains the files type description
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sql_1 = require("../sql");
const PropertyDefinition_1 = require("../../PropertyDefinition");
const constants_1 = require("../../../../../../constants");
const local_sql_1 = require("../local-sql");
/**
 * The type value represents the behaviour of files in the app
 */
const typeValue = {
    gql: "PROPERTY_TYPE__Files",
    gqlFields: {},
    gqlAddFileToFields: true,
    gqlList: true,
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
        throw new Error("Attempted to search within files");
    },
    localSearch: () => {
        throw new Error("Attempted to search within files locally");
    },
    sqlEqual: () => {
        throw new Error("Attempted to equal within files");
    },
    sqlLocalEqual: () => {
        throw new Error("Attempted to local equal within files");
    },
    sqlBtreeIndexable: () => {
        throw new Error("Attempted to btree index files, this might mean a files value is in request limiters, don't do that");
    },
    sqlMantenience: null,
    localEqual: local_sql_1.standardLocalEqual,
    allowsMinMaxLengthDefined: true,
    validate: (l) => {
        if (l.length > constants_1.MAX_FILE_BATCH_COUNT) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_LARGE;
        }
        return null;
    },
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        tooLargeErrorInclude: true,
    },
};
exports.default = typeValue;
