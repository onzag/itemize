/**
 * Provides the group by builder that allows to create GROUP BY statements
 * @module
 */

import { QueryBuilder } from "./base";

/**
 * Provides the group by builders that allows to create GROUP BY sql statments
 */
export class GroupByBuilder extends QueryBuilder {
  private expressions: string[] = [];
  constructor() {
    super();
  }
  
  /**
   * Adds a column to group by
   * @param column the colum in question
   * @returns itself
   */
  public addColumn(column: string) {
    return this.addColumnWithTable(null, column);
  }

  /**
   * Adds a column to group by in a given table
   * @param tableName the table that holds the column
   * @param column the column in question
   * @returns itself
   */
  public addColumnWithTable(tableName: string, column: string) {
    const tableNameProper = tableName ? JSON.stringify(tableName) + "." : "";
    const columnProper = tableNameProper + JSON.stringify(column);
    return this.addExpression(columnProper);
  }

  /**
   * Adds a expression to group by
   * @param expression the expression as a string
   * @param bindings the bindings for that expression
   * @returns itself
   */
  public addExpression(expression: string, bindings?: Array<number | string>) {
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
    if (!this.expressions.length) {
      return "";
    }
    return "GROUP BY " + this.expressions.join(", ");
  }

  /**
   * Removes all the expressions that were used to group by
   * @returns itself
   */
  public clear() {
    this.expressions = [];
    this.clearBindingSources();
    return this;
  }
}