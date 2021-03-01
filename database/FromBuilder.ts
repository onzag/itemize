/**
 * Provides a builder for a FROM statments
 * @module
 */

import { QueryBuilder } from "./base";

/**
 * Provides a builder for a FROM statments in SQL
 */
export class FromBuilder extends QueryBuilder {
  /**
   * The tables we do the from rule
   */
  private tables: string[] = [];

  /**
   * builds a new from builder
   */
  constructor() {
    super();
  }

  /**
   * Select tables to pick from
   * @param tableNames the tables to select
   * @returns itself
   */
  public from(...tableNames: string[]) {
    this.tables = this.tables.concat(tableNames);
    return this;
  }

  /**
   * On the from builder this will clear all the tables
   * @returns itself
   */
  public clear() {
    this.tables = [];
    this.clearBindingSources();
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile() {
    if (!this.tables.length) {
      return "";
    }
    return "FROM " + this.tables.map((t) => JSON.stringify(t)).join(", ");
  }
}