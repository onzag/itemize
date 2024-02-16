/**
 * Contains the select query builder that allows to create SELECT queries
 * @module
 */

import { QueryBuilder } from "./base";
import { ReturningBuilder } from "./ReturningBuilder";
import { WhereBuilder } from "./WhereBuilder";

/**
 * The select query builder that allows to create SELECT queries
 */
export class DeleteBuilder extends QueryBuilder {
  private tableDeleteFromExpression: string;

  public whereBuilder: WhereBuilder;
  public returningBuilder: ReturningBuilder;

  /**
   * Builds a new select query builder
   */
  constructor() {
    super();

    this.whereBuilder = new WhereBuilder();
    this.returningBuilder = new ReturningBuilder();

    this.addBindingSource(this.whereBuilder);
    this.addBindingSource(this.returningBuilder);
  }

  /**
   * Clears the seleted expressions, limit and offset but does not affect the builders
   * @returns itself
   */
  public clear() {
    this.tableDeleteFromExpression = null;
    this.clearBindingSources();
    this.addBindingSource(this.whereBuilder);
    this.addBindingSource(this.returningBuilder);

    return this;
  }

  /**
   * Allows to select all
   * @param tableName an optional table name
   * @returns itself
   */
  public deleteFrom(tableName: string) {
    this.tableDeleteFromExpression = JSON.stringify(tableName);
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile(parent: QueryBuilder) {
    if (!this.tableDeleteFromExpression) {
      return "";
    }

    const whereRule = this.whereBuilder.compile(this);
    const returningRule = this.returningBuilder.compile(this);

    return "DELETE FROM " + this.tableDeleteFromExpression +
      (whereRule ? " " + whereRule : "") +
      (returningRule ? " " + returningRule : "");
  }
}
