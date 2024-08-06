/**
 * Contains the create table query builder that allows to create CREATE TABLE queries
 * @module
 */

import { QueryBuilder, ValueType } from "./base";

interface ICreateTableColumnData {
  name: string;
  type: string;
  notNull: boolean;
  /**
   * the default must be a self contained expression
   */
  defaultTo?: string;
}

/**
 * The create table query builder that allows to create CREATE TABLE queries
 * @module
 */
export class CreateTableBuilder extends QueryBuilder {
  /**
   * Table name in question we are updating against
   */
  private tableName: string;
  private createIfNotExists: boolean;
  private columns: ICreateTableColumnData[] = [];

  /**
   * Builds a new create table query builder
   */
  constructor() {
    super();

    this.tableName = null;
  }

  /**
   * Adds a column to the create rule
   * @param info the info about the column
   * @returns itself
   */
  public addColumn(info: ICreateTableColumnData) {
    this.columns.push(info as any);
    return this;
  }

  /**
   * Specifies the table we are updating
   * @param tableName the table in question
   * @returns itself
   */
  public table(tableName: string) {
    this.tableName = tableName;
    return this;
  }

  /**
   * Makes the update be IF NOT EXISTS
   * @returns itself
   */
  public ifNotExists() {
    this.createIfNotExists = true;
    return this;
  }

  /**
   * Clears the table name, if not exists state and columns
   * @returns itself
   */
  public clear() {
    this.tableName = null;
    this.createIfNotExists = false;
    this.columns = [];
    this.clearBindingSources();
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile(parent: QueryBuilder) {
    if (!this.tableName) {
      return null;
    }

    return "CREATE TABLE " + (this.createIfNotExists ? "IF NOT EXISTS " : "") + JSON.stringify(this.tableName) +
      "(" + this.columns.map((c) => {
        return JSON.stringify(c.name) + " " + c.type + (c.notNull ? " NOT NULL" : "") +
        (typeof c.defaultTo !== "undefined" && c.defaultTo !== null ? " DEFAULT " + c.defaultTo : "");
      }).join(", ") + ")";
  }
}