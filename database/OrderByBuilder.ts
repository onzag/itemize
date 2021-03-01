/**
 * Contains the order by query builder that allows to create ORDER BY statments
 * @module
 */

import { QueryBuilder } from "./base";

/**
 * Represents a rule to order by
 */
interface IOrderByExpression {
  expression: string;
  style: "ASC" | "DESC" | "USING";
  nulls: "FIRST" | "LAST";
  operator?: string;
}

/**
 * The order by query builder that allows to create ORDER BY statments
 */
export class OrderByBuilder extends QueryBuilder {
  /**
   * The expressions we are ordering by
   */
  private expressions: IOrderByExpression[] = [];

  /**
   * Builds a new order by query
   */
  constructor() {
    super();
  }

  /**
   * Allows to order by a specific column in a specific table
   * @param tableName the table
   * @param column the column
   * @param style ASC or DESC, for ascending or descending
   * @param nulls whether nulls go first or last
   * @returns itself
   */
  public orderByColumnInTable(tableName: string, column: string, style: "ASC" | "DESC", nulls: "FIRST" | "LAST") {
    const tableNameProper = tableName ? JSON.stringify(tableName) + "." : "";
    const orderByExpression = tableNameProper + JSON.stringify(column);
    this.expressions.push({
      expression: orderByExpression,
      style,
      nulls,
    });
    return this;
  }

  /**
   * Allows to order by a column
   * @param column the column
   * @param style ASC or DESC, for ascending or descending
   * @param nulls whether nulls go first or last
   * @returns itself
   */
  public orderByColumn(column: string, style: "ASC" | "DESC", nulls: "FIRST" | "LAST") {
    return this.orderByColumnInTable(null, column, style, nulls);
  }

  /**
   * Allows to order by an expression
   * @param expression the expression in question
   * @param style ASC or DESC, for ascending or descending
   * @param nulls whether nulls go first or last
   * @param bindings the bindings for the expression
   * @returns itself
   */
  public orderBy(expression: string, style: "ASC" | "DESC", nulls: "FIRST" | "LAST", bindings?: Array<string | number>) {
    this.expressions.push({
      expression,
      style,
      nulls,
    });

    this.addBindingSources(bindings);

    return this;
  }

  /**
   * Allows to order by an expression
   * @param expression the expression in question
   * @param operator the operator to go with USING
   * @param nulls whether nulls go first or last
   * @param bindings the bindings for the expression
   * @returns itself
   */
  public orderByUsing(expression: string, operator: string, nulls: "FIRST" | "LAST", bindings?: Array<string | number>) {
    this.expressions.push({
      expression,
      style: "USING",
      operator,
      nulls,
    });

    this.addBindingSources(bindings);

    return this;
  }

  /**
   * Clears all the expressions in the order by builder
   * @returns itself
   */
  public clear() {
    this.expressions = [];
    this.clearBindingSources();
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

    return "ORDER BY " +
      this.expressions.map(
        (x) =>
          x.expression + " " +
          x.style + " " +
          (x.operator ? x.operator + " " : "") +
          "NULLS " + x.nulls
      ).join(", ");
  }
}