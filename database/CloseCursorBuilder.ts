/**
 * Contains the select query builder that allows to create SELECT queries
 * @module
 */

import { QueryBuilder } from "./base";

/**
 * The select query builder that allows to create SELECT queries
 */
export class CloseCursorBuilder extends QueryBuilder {
  public name: string;

  /**
   * Builds a new declare query builder
   * @param name the name
   */
  constructor(name: string) {
    super();

    this.name = name;

    // this.addBindingSource(this.name);
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile(parent: QueryBuilder): string {
    return "CLOSE " + JSON.stringify(this.name);
  }
}
