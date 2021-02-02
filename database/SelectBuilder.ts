/**
 * Contains the select query builder that allows to create SELECT queries
 * @packageDocumentation
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
    this.ilimit = n;
    return this;
  }

  /**
   * Sets the offset
   * @param n the offset
   * @returns itself
   */
  public offset(n: number) {
    this.ioffset = n;
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile() {
    if (!this.selectedExpressions.length) {
      return "";
    }

    const fromRule = this.fromBuilder.compile();
    const joinRule = this.joinBuilder.compile();
    const whereRule = this.whereBuilder.compile();
    const groupByRule = this.groupByBuilder.compile();
    const havingRule = this.havingBuilder.compile();
    const orderByRule = this.orderByBuilder.compile();

    return "SELECT " + this.selectedExpressions.join(", ") +
      (fromRule ? " " + fromRule : "") +
      (joinRule ? " " + joinRule : "") +
      (whereRule ? " " + whereRule : "") +
      (groupByRule ? " " + groupByRule : "") +
      (havingRule ? " " + havingRule : "") +
      (orderByRule ? " " + orderByRule : "") +
      (this.ilimit ? " LIMIT " + this.ilimit : "") +
      (this.ioffset ? " OFFSET " + this.ioffset : "");
  }
}
