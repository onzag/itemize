import Knex from "knex";
import { ISQLColumnDefinitionType } from "../base/Root/sql";

/**
 * Builds a type from the knex table
 * @param columnName the column name we want to create
 * @param columnData the column data from migrations
 * @param table the table creator
 */
export function buildColumn(
  columnName: string,
  columnData: ISQLColumnDefinitionType,
  table: Knex.CreateTableBuilder,
): Knex.ColumnBuilder {
  let actualType = columnData.type;
  if (actualType === "serial") {
    actualType = "increments";
  }

  const tableColumnExec = !table[actualType] ?
    table.specificType(columnName, actualType) :
    table[actualType](columnName);
  if (columnData.notNull) {
    tableColumnExec.notNullable();
  }

  return tableColumnExec;
}
