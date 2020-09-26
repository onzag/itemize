"use strict";
/**
 * This file contains the functions that are used in order to setup
 * columns in the database schema to be built
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildColumn = void 0;
const typesForceSpecific = [
    "timestamp",
    "date",
    "serial",
];
/**
 * Builds a type for the knex table
 * @param columnName the column name we want to create
 * @param columnData the column data from migrations
 * @param table the table creator
 * @returns a knex column builder
 */
function buildColumn(columnName, columnData, tableBuilder) {
    // now we need to execute, if there's no function in the table
    // creator or if it's marked as necessary to use a specific function
    const tableColumnExec = !tableBuilder[columnData.type] || typesForceSpecific.includes(columnData.type) ?
        // we use a specific function
        tableBuilder.specificType(columnName, columnData.type) :
        // otherwise we use the actual type
        tableBuilder[columnData.type](columnName);
    // if it's not null
    if (columnData.notNull) {
        // we mark it as so
        tableColumnExec.notNullable();
    }
    // if it has a default value
    if (typeof columnData.defaultTo !== "undefined" &&
        columnData.defaultTo !== null) {
        // make the default
        tableColumnExec.defaultTo(columnData.defaultTo);
    }
    // return the same column builder execution
    return tableColumnExec;
}
exports.buildColumn = buildColumn;
