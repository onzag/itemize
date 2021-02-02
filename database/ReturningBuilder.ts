/**
 * Provides the returning builder that allows to create RETURNING statments
 * @packageDocumentation
 */

import { QueryBuilder } from ".";

/**
 * The returning builder that allows to create RETURNING statments
 */
export class ReturningBuilder extends QueryBuilder {
  /**
   * the expressions that we are returning
   */
  private expressions: string[];

  /**
   * Builds a new SQL RETURNING statment
   */
  constructor() {
    super();
  }

  /**
   * a shorthand for RETURNING *
   * @param tableName an optional table name
   * @returns itself
   */
  public returningAll(tableName?: string) {
    if (tableName) {
      return this.returning(JSON.stringify(tableName) + ".*");
    }
    return this.returning("*");
  }

  /**
   * Returning a specific column
   * @param column the column to return
   * @returns itself
   */
  public returningColumn(column: string) {
    return this.returning(JSON.stringify(column));
  }

  /**
   * Returning a specific column in a table
   * @param column the column to return
   * @returns itself
   */
  public returningColumnInTable(tableName: string, column: string) {
    return this.returning(JSON.stringify(tableName) + "." + JSON.stringify(column));
  }

  /**
   * Returning an expression
   * @param expression the expression to return
   * @param bindings the bindings for that expression
   * @returns itself
   */
  public returning(expression: string, bindings?: Array<string | number>) {
    this.expressions.push(expression);

    if (bindings) {
      this.addBindingSources(bindings);
    }

    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile() {
    if (!this.expressions.length) {
      return "";
    }
    return "RETURNING " + this.expressions.join(", ");
  }

  /**
   * Clears the expressions that we are returning
   * @returns itself
   */
  public clear() {
    this.expressions = [];
    this.clearBindingSources();
    return this;
  }
}