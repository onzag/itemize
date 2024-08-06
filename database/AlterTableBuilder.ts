/**
 * Contains the create table query builder that allows to create ALTER TABLE queries
 * @module
 */

import { QueryBuilder, ValueType } from "./base";

interface IAlterTableColumnData {
  name: string;
  type: string;
  notNull: boolean;
  /**
   * the default must be a self contained expression
   */
  defaultTo?: string;
}

/**
 * The alter table query builder that allows to create ALTER TABLE queries
 * @module
 */
export class AlterTableBuilder extends QueryBuilder {
  /**
   * Table name in question we are updating against
   */
  private tableName: string;
  private columnRule: IAlterTableColumnData;
  private action: string;
  /**
   * Builds a new alter table query builder
   */
  constructor() {
    super();

    this.tableName = null;
  }

  /**
   * Adds a column to the alter rule
   * @param info the info about the column
   * @returns itself
   */
  public affectColumn(action: "DROP COLUMN" | "ADD COLUMN" | "ALTER COLUMN", info: IAlterTableColumnData) {
    if (this.columnRule) {
      throw new Error("Cannot modify many columns in one statement");
    }

    this.action = action;
    this.columnRule = info as any;

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
   * Clears only the alters without modifying the table name
   */
  public clearAlters() {
    this.action = null;
    this.columnRule = null;
    this.clearBindingSources();
  }

  /**
   * Clears the table name, if not exists state and columns
   * @returns itself
   */
  public clear() {
    this.tableName = null;
    this.clearAlters();
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile(parent: QueryBuilder) {
    if (!this.tableName || !this.action) {
      return null;
    }

    const startBit = "ALTER TABLE " + JSON.stringify(this.tableName) + " ";
    const quotedColumn = JSON.stringify(this.columnRule.name);
    if (this.action === "DROP COLUMN") {
      return startBit +
        this.action + " " + quotedColumn;
    } else if (this.action === "ADD COLUMN") {
      const c = this.columnRule;
      return startBit +
        this.action + " " + quotedColumn + " " +
          c.type + (c.notNull ? " NOT NULL" : "") + (c.defaultTo ? " DEFAULT " + c.defaultTo : "");
    } else if (this.action === "ALTER COLUMN") {
      return startBit +
        this.action + " " + quotedColumn + " TYPE " + this.columnRule.type + ", " +
        this.action + " " + quotedColumn + (this.columnRule.notNull ? " SET " : " DROP ") + "NOT NULL, " +
        this.action + " " + quotedColumn +
        (
          typeof this.columnRule.defaultTo !== "undefined" && this.columnRule !== null ?
          " SET DEFAULT " + this.columnRule.defaultTo :
          " DROP DEFAULT"
        );
    }
  }
}