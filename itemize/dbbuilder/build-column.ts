/**
 * This file contains the functions that are used in order to setup
 * columns in the database schema to be built
 *
 * @packageDocumentation
 */

import Knex from "knex";
import { ISQLColumnDefinitionType } from "../base/Root/sql";

const typesForceSpecific = [
  "timestamp",
  "date",
];

/**
 * Builds a type for the knex table
 * @param columnName the column name we want to create
 * @param columnData the column data from migrations
 * @param table the table creator
 * @returns a knex column builder
 */
export function buildColumn(
  columnName: string,
  columnData: ISQLColumnDefinitionType,
  tableBuilder: Knex.CreateTableBuilder,
): Knex.ColumnBuilder {
  // so we first get the type we are requested
  let actualType = columnData.type;
  // if we are requested a serial, the postgres serial
  // in knex is the increments
  if (actualType === "serial") {
    actualType = "increments";
  }

  // now we need to execute, if there's no function in the table
  // creator or if it's marked as necessary to use a specific function
  const tableColumnExec = !tableBuilder[actualType] || typesForceSpecific.includes(actualType) ?
    // we use a specific function
    tableBuilder.specificType(columnName, actualType) :
    // otherwise we use the actual type
    tableBuilder[actualType](columnName);

  // if it's not null
  if (columnData.notNull) {
    // we mark it as so
    tableColumnExec.notNullable();
  }

  // return the same column builder execution
  return tableColumnExec;
}
