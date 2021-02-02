/**
 * Provides a raw query builder, it's not very useful
 * but it's there
 * @packageDocumentation
 */

import { QueryBuilder } from "./base";

/**
 * This is the raw builder for raw queries, it's not very useful
 * you might prefer to pass raw queries into the database connection
 * instead of using this
 */
export class RawBuilder extends QueryBuilder {
  /**
   * The raw expression
   */
  private raw: string;

  /**
   * Builds a new raw query
   * @param raw the raw query
   * @param bindings the bindings for such
   */
  constructor(raw: string, bindings?: Array<string | number>) {
    super();

    this.raw = raw;

    if (bindings) {
      this.addBindingSources(bindings);
    }
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile() {
    return this.raw;
  }
}
