/**
 * Contains the with query builder that allows to create WITH queries
 * @module
 */

import { QueryBuilder } from "./base";

/**
 * This is each one of the queries we are doing with the with
 */
interface IWithRules {
  /**
   * The name we are giving it
   */
  name: string;
  /**
   * And the query itself
   */
  asWhat: QueryBuilder;
}

/**
 * The with query builder that allows to create WITH queries
 */
export class WithBuilder extends QueryBuilder {
  /**
   * These are all the WITH ... queries we are doing
   */
  private withs: IWithRules[] = [];
  /**
   * And this is the query itself we are executing with WITH ... DO ...
   */
  private query: QueryBuilder;

  /**
   * Builds a new query builder for a WITH query
   */
  constructor() {
    super();
  }

  /**
   * Adds a new query to use with
   * @param name the name to assign to it
   * @param asWhat and the query itself
   * @returns itself
   */
  public with(name: string, asWhat: QueryBuilder) {
    this.withs.push({
      name,
      asWhat,
    });

    // the with goes before the query
    // so we need to add and remove it
    // if it's there
    if (this.query) {
      this.popBindingSource();
    }
    this.addBindingSource(asWhat);
    if (this.query) {
      this.addBindingSource(this.query);
    }
    return this;
  }

  /**
   * Specifies the query that would execute
   * @param query the query to execute
   * @returns itself
   */
  public do(query: QueryBuilder) {
    this.query = query;
    this.addBindingSource(query);
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile(parent: QueryBuilder) {
    return "WITH " + this.withs.map((w) => {
      return JSON.stringify(w.name) + " AS (" + w.asWhat.compile(this) + ")"
    }).join(", ") + " " + this.query.compile(this);
  }

  /**
   * Clears all the with selections and the query itself
   * @returns itself
   */
  public clear() {
    this.withs = [];
    this.query = null;
    this.clearBindingSources();
    return this;
  }
}