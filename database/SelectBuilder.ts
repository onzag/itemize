/**
 * Contains the select query builder that allows to create SELECT queries
 * @module
 */

import { BasicBindingType, QueryBuilder } from "./base";
import { FromBuilder } from "./FromBuilder";
import { GroupByBuilder } from "./GroupByBuilder";
import { HavingBuilder } from "./HavingBuilder";
import { JoinBuilder } from "./JoinBuilder";
import { OrderByBuilder } from "./OrderByBuilder";
import { WhereBuilder } from "./WhereBuilder";

/**
 * The select query builder that allows to create SELECT queries
 */
export class SelectBuilder extends QueryBuilder {
  /**
   * The expressions that we are selecting
   */
  private selectedExpressions: string[] = [];
  private distinctOnExpressions: string[] = [];

  public fromBuilder: FromBuilder;
  public joinBuilder: JoinBuilder;
  public whereBuilder: WhereBuilder;
  public groupByBuilder: GroupByBuilder;
  public havingBuilder: HavingBuilder;
  public orderByBuilder: OrderByBuilder;

  private ilimit: number;
  private ioffset: number;

  /**
   * Builds a new select query builder
   */
  constructor() {
    super();

    this.fromBuilder = new FromBuilder();
    this.joinBuilder = new JoinBuilder();
    this.whereBuilder = new WhereBuilder();
    this.groupByBuilder = new GroupByBuilder();
    this.havingBuilder = new HavingBuilder();
    this.orderByBuilder = new OrderByBuilder();

    this.clearSelect();
  }

  /**
   * Allows to select all
   * @param tableName an optional table name
   * @returns itself
   */
  public selectAll(tableName?: string) {
    const tableNameProper = tableName ? JSON.stringify(tableName) + "." : "";
    const allExpression = tableNameProper + "*";
    return this.selectExpression(allExpression);
  }

  /**
   * Allows to select many columns
   * @param columns the columns to select
   * @returns itself
   */
  public select(...columns: string[]) {
    columns.forEach((column) => {
      this.selectColumnFromTable(null, column);
    });
    return this;
  }

  /**
   * Allows to select based on a column in a table
   * @param tableName the table in question
   * @param column the column
   * @returns itself
   */
  public selectColumnFromTable(tableName: string, column: string) {
    const tableNameProper = tableName ? JSON.stringify(tableName) + "." : "";
    const expression = tableNameProper + JSON.stringify(column);
    return this.selectExpression(expression);
  }

  /**
   * Allows to select based on an expression
   * @param expression the expression in question
   * @param bindings the bindings for that expression
   * @returns itself
   */
  public selectExpression(expression: string, bindings?: BasicBindingType[]) {
    this.selectedExpressions.unshift(expression);
    
    if (bindings) {
      this.insertBindingSourcesAt(this.distinctOnExpressions.length, bindings);
    }

    return this;
  }

  public rowsMustBeDistinctOn(...columns: string[]) {
    columns.forEach((column) => {
      this.rowsMustBeDistinctOnColumnForTable(null, column);
    });
    return this;
  }

  public rowsMustBeDistinctOnColumnForTable(tableName: string, column: string) {
    const tableNameProper = tableName ? JSON.stringify(tableName) + "." : "";
    const expression = tableNameProper + JSON.stringify(column);
    return this.rowsMustBeDistinctOnExpression(expression);
  }

  public rowsMustBeDistinctOnExpression(expression: string, bindings?: BasicBindingType[]) {
    this.distinctOnExpressions.unshift(expression);

    if (bindings) {
      this.shiftBindingSources(bindings);
    }

    return this;
  }

  /**
   * Clears the seleted expressions but does not affect the builders
   * nor the limit or offset
   * @returns itself
   */
  public clearSelect() {
    this.selectedExpressions = [];
    this.clearBindingSources();

    this.addBindingSource(this.fromBuilder);
    this.addBindingSource(this.joinBuilder);
    this.addBindingSource(this.whereBuilder);
    this.addBindingSource(this.groupByBuilder);
    this.addBindingSource(this.havingBuilder);
    this.addBindingSource(this.orderByBuilder);

    return this;
  }

  /**
   * Clears the seleted expressions, limit and offset but does not affect the builders
   * @returns itself
   */
  public clear() {
    this.clearSelect();
    this.ilimit = null;
    this.ioffset = null;
    return this;
  }

  /**
   * Sets the limit
   * @param n the limit
   * @returns itself
   */
  public limit(n: number) {
    if (typeof n !== "number") {
      this.ilimit = null;
    } else {
      this.ilimit = n;
    }
    return this;
  }

  /**
   * Sets the offset
   * @param n the offset
   * @returns itself
   */
  public offset(n: number) {
    if (typeof n !== "number") {
      this.ioffset = null;
    } else {
      this.ioffset = n;
    }
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile(parent: QueryBuilder): string {
    if (!this.selectedExpressions.length && !this.distinctOnExpressions.length) {
      return "";
    }

    const fromRule = this.fromBuilder.compile(this);
    const joinRule = this.joinBuilder.compile(this);
    const whereRule = this.whereBuilder.compile(this);
    const groupByRule = this.groupByBuilder.compile(this);
    const havingRule = this.havingBuilder.compile(this);
    const orderByRule = this.orderByBuilder.compile(this);

    return "SELECT " +
      (this.distinctOnExpressions.length ? (
        "DISTINCT ON (" + this.distinctOnExpressions.join(", ") + ") "
      ) : "") +
      this.selectedExpressions.join(", ") +
      (fromRule ? " " + fromRule : "") +
      (joinRule ? " " + joinRule : "") +
      (whereRule ? " " + whereRule : "") +
      (groupByRule ? " " + groupByRule : "") +
      (havingRule ? " " + havingRule : "") +
      (orderByRule ? " " + orderByRule : "") +
      (typeof this.ilimit === "number" ? " LIMIT " + this.ilimit : "") +
      (typeof this.ioffset === "number" ? " OFFSET " + this.ioffset : "");
  }
}
