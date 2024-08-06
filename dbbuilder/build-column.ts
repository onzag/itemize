/**
 * This file contains the functions that are used in order to setup
 * columns in the database schema to be built
 *
 * @module
 */

import { CreateTableBuilder } from "../database/CreateTableBuilder";
import { AlterTableBuilder } from "../database/AlterTableBuilder";
import { ISQLColumnDefinitionType } from "../base/Root/sql";

export function escapeString(str: string) {
  return "'" + Array.from(str).map((char: string) => char === "'" ? "\\'" : char).join("") + "'";
}
export function convertValueToExpression(
  v: any
) {
  if (typeof v === "boolean") {
    return v ? "TRUE" : "FALSE";
  } else if (typeof v === "string") {
    return escapeString(v);
  } else if (typeof v === "number") {
    return v.toString();
  } else {
    return escapeString(JSON.stringify(v)) + "::jsonb";
  }
}

/**
 * Builds a type for the table
 * @param columnName the column name we want to create
 * @param columnData the column data from migrations
 * @param tableBuilder the table creator
 * @param alterAction the action to perform if an alter table was given as the table builder
 */
export function buildColumn(
  columnName: string,
  columnData: ISQLColumnDefinitionType,
  tableBuilder: CreateTableBuilder | AlterTableBuilder,
  action?: "ADD COLUMN" | "DROP COLUMN" | "ALTER COLUMN",
) {
  // we need to use the special type that represents the id type
  const actualType = columnData.type === "ID" ? "TEXT" : columnData.type;

  if (columnData.type === "ID" && columnName !== "id") {
    throw new Error("Cannot make a column type ID and it not be named id");
  }

  const columnInfo = {
    name: columnName,
    type: actualType,
    notNull: columnData.notNull,
    defaultTo: convertValueToExpression(columnData.defaultTo),
  };

  if (tableBuilder instanceof CreateTableBuilder) {
    tableBuilder.addColumn(columnInfo);
  } else {
    tableBuilder.affectColumn(action, columnInfo);
  }
}
