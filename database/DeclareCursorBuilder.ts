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
  public isWithHold: boolean = false;
  public scrollState: string = null;

  /**
   * Builds a new declare query builder
   * @param name the name
   * @param forQuery the query it is done for
   */
  constructor(name: string, forQuery: QueryBuilder) {
    super();

    this.name = name;
    this.forQuery = forQuery;

    // this.addBindingSource(this.name);
    this.addBindingSource(this.forQuery);
  }

  public withHold() {
    this.isWithHold = true;

    return this;
  }

  public withoutHold() {
    this.isWithHold = false;

    return this;
  }

  public scroll() {
    this.scrollState = "SCROLL";

    return this;
  }

  public noScroll() {
    this.scrollState = "NO SCROLL";

    return this;
  }

  public clearScroll() {
    this.scrollState = null;

    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile(parent: QueryBuilder): string {
    return "DECLARE " + JSON.stringify(this.name) +
      (this.scrollState ? " " + this.scrollState : "") +
      " CURSOR" +
      (this.isWithHold ? " WITH HOLD" : " WITHOUT HOLD") +
      " FOR " + this.forQuery.compile(this);
  }
}
