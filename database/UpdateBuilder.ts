/**
 * Contains the update query builder that allows to create UPDATE queries
 * @module
 */

import { QueryBuilder } from "./base";
import { FromBuilder } from "./FromBuilder";
import { ReturningBuilder } from "./ReturningBuilder";
import { SetBuilder } from "./SetBuilder";
import { WhereBuilder } from "./WhereBuilder";

/**
 * The update query builder that allows to create UPDATE queries
 * @module
 */
export class UpdateBuilder extends QueryBuilder {
  /**
   * Table name in question we are updating against
   */
  private tableName: string;
  private tableAlias: string;
  /**
   * Whether it's an update only query
   */
  private isOnly: boolean = false;

  public setBuilder: SetBuilder;
  public fromBuilder: FromBuilder;
  public whereBuilder: WhereBuilder;
  public returningBuilder: ReturningBuilder;

  /**
   * Builds a new update query builder
   */
  constructor() {
    super();

    this.tableName = null;
    this.tableAlias = null;
    this.setBuilder = new SetBuilder();
    this.fromBuilder = new FromBuilder();
    this.whereBuilder = new WhereBuilder();
    this.returningBuilder = new ReturningBuilder();

    this.addBindingSource(this.setBuilder);
    this.addBindingSource(this.fromBuilder);
    this.addBindingSource(this.whereBuilder);
    this.addBindingSource(this.returningBuilder);
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
   * Specifies an alias for the update
   * @param alias the alias in question
   * @returns itself
   */
  public alias(alias: string) {
    this.tableAlias = alias;
    return this;
  }

  /**
   * Makes the update be UPDATE ONLY
   * @returns itself
   */
  public makeOnly() {
    this.isOnly = true;
    return this;
  }

  /**
   * Clears the table name, alias, and only state
   * @returns itself
   */
  public clear() {
    this.tableName = null;
    this.tableAlias = null;
    this.isOnly = false;
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile() {
    if (!this.tableName) {
      return null;
    }

    const setRule = this.setBuilder.compile();
    const fromRule = this.fromBuilder.compile();
    const whereRule = this.whereBuilder.compile();
    const returningRule = this.returningBuilder.compile();

    return "UPDATE " + (this.isOnly ? "ONLY " : "") + JSON.stringify(this.tableName) +
      (this.tableAlias ? "AS " + JSON.stringify(this.tableAlias) : "") +
      (setRule ? " " + setRule : "") +
      (fromRule ? " " + fromRule : "") +
      (whereRule ? " " + whereRule : "") +
      (returningRule ? " " + returningRule : "");
  }
}