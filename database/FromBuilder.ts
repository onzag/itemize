/**
 * Provides a builder for a FROM statments
 * @module
 */

import { QueryBuilder } from "./base";
import { SelectBuilder } from "./SelectBuilder";

/**
 * Provides a builder for a FROM statments in SQL
 */
export class FromBuilder extends QueryBuilder {
  /**
   * The tables we do the from rule
   */
  private tables: Array<string | [string, string]> = [];
  private selectBuilder: SelectBuilder = null;
  private selectBuilderAlias: string = null;

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
  public from(...tableNames: Array<string | [string, string]>) {
    this.tables = this.tables.concat(tableNames);
    return this;
  }

  public fromSelect(builder: (b: SelectBuilder) => void, alias: string) {
    this.selectBuilder = new SelectBuilder();
    builder(this.selectBuilder);
    this.selectBuilderAlias = alias;
    this.addBindingSource(this.selectBuilder);
    return this;
  }

  /**
   * On the from builder this will clear all the tables
   * @returns itself
   */
  public clear() {
    this.tables = [];
    this.clearBindingSources();
    this.selectBuilder.clearBindingSources();
    this.selectBuilder = null;
    this.selectBuilderAlias = null;
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile() {
    if (!this.tables.length && !this.selectBuilder) {
      return "";
    }
    if (this.selectBuilder) {
      return "FROM (" + this.selectBuilder.compile() + ") " + JSON.stringify(this.selectBuilderAlias);
    }
    return "FROM " + this.tables.map((t) =>
      typeof t === "string" ?
        JSON.stringify(t) :
        JSON.stringify(t[0]) + " " + JSON.stringify(t[1])
      ).join(", ");
  }
}