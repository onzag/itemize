/**
 * Contains the select query builder that allows to create SELECT queries
 * @module
 */

import { QueryBuilder } from "./base";

/**
 * The select query builder that allows to create SELECT queries
 */
export class DeclareCursorBuilder extends QueryBuilder {
  public forQuery: QueryBuilder;
  public name: string;

  /**
   * Builds a new declare query builder
   * @param name the name
   * @param forQuery the query it is done for
   */
  constructor(name: string, forQuery: QueryBuilder) {
    super();

    this.name = name;
    this.forQuery = forQuery;

    this.addBindingSource(this.name);
    this.addBindingSource(this.forQuery);
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile(): string {
    return "DECLARE ? CURSOR FOR " + this.forQuery.compile();
  }
}
