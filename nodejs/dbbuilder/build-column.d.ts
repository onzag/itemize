/**
 * This file contains the functions that are used in order to setup
 * columns in the database schema to be built
 *
 * @packageDocumentation
 */
import Knex from "knex";
import { ISQLColumnDefinitionType } from "../base/Root/sql";
/**
 * Builds a type for the knex table
 * @param columnName the column name we want to create
 * @param columnData the column data from migrations
 * @param table the table creator
 * @returns a knex column builder
 */
export declare function buildColumn(columnName: string, columnData: ISQLColumnDefinitionType, tableBuilder: Knex.CreateTableBuilder): Knex.ColumnBuilder;
