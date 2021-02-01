// /**
//  * This file contains the functions that are used in order to setup
//  * columns in the database schema to be built
//  *
//  * @packageDocumentation
//  */

// import { ISQLColumnDefinitionType } from "../base/Root/sql";

// const typesForceSpecific = [
//   "timestamp",
//   "date",
//   "serial",
// ];

// /**
//  * Builds a type for the knex table
//  * @param columnName the column name we want to create
//  * @param columnData the column data from migrations
//  * @param table the table creator
//  * @returns a knex column builder
//  */
// export function buildColumn(
//   columnName: string,
//   columnData: ISQLColumnDefinitionType,
//   tableBuilder: Knex.CreateTableBuilder,
// ): Knex.ColumnBuilder {
//   // we need to use the special type that represents the id type
//   const actualType = columnData.type === "id" ? "string" : columnData.type;

//   // now we need to execute, if there's no function in the table
//   // creator or if it's marked as necessary to use a specific function
//   const tableColumnExec: Knex.ColumnBuilder =
//     !tableBuilder[actualType] || typesForceSpecific.includes(actualType) ?
//     // we use a specific function
//     tableBuilder.specificType(columnName, actualType) :
//     // otherwise we use the actual type
//     tableBuilder[actualType](columnName);

//   // if it's not null
//   if (columnData.notNull) {
//     // we mark it as so
//     tableColumnExec.notNullable();
//   }

//   // if it has a default value
//   if (
//     typeof columnData.defaultTo !== "undefined" &&
//     columnData.defaultTo !== null
//   ) {
//     // make the default
//     tableColumnExec.defaultTo(columnData.defaultTo);
//   }

//   // return the same column builder execution
//   return tableColumnExec;
// }
