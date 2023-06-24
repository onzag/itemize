/**
 * Contains the select query builder that allows to create SELECT queries
 * @module
 */

import { QueryBuilder } from "./base";

export type FetchCursorDirection = "NEXT" | "PRIOR" | "FIRST" | "LAST" | "ABSOLUTE" | "RELATIVE" | "FORWARD" | "BACKWARD";

/**
 * The select query builder that allows to create SELECT queries
 */
export class FetchOrMoveFromCursorBuilder extends QueryBuilder {
  public type: "FETCH" | "MOVE";
  public name: string;
  public direction: FetchCursorDirection = "NEXT";
  public directionCount: number = null;

  /**
   * Builds a new declare query builder
   * @param name the name
   */
  constructor(type: "FETCH" | "MOVE", name: string) {
    super();

    this.type = type;
    this.name = name;

    this.addBindingSource(this.name);
  }

  public next() {
    this.setDirection("NEXT", null);
    return this;
  }

  public prior() {
    this.setDirection("PRIOR", null);
    return this;
  }

  public first() {
    this.setDirection("FIRST", null);
    return this;
  }

  public last() {
    this.setDirection("LAST", null);
    return this;
  }

  public absolute(count: number) {
    this.setDirection("ABSOLUTE", count);
    return this;
  }

  public relative(count: number) {
    this.setDirection("RELATIVE", count);
    return this;
  }

  public forward(count: number) {
    this.setDirection("FORWARD", count);
    return this;
  }

  public backward(count: number) {
    this.setDirection("BACKWARD", count);
    return this;
  }

  public setDirection(dir: FetchCursorDirection, count: number) {
    if (typeof count === "number") {
      this.clearBindingSources();
      this.addBindingSource(count);
      this.addBindingSource(this.name);
    } else {
      this.clearBindingSources();
      this.addBindingSource(this.name);
    }

    this.directionCount = count;
    this.direction = dir;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile(): string {
    if (typeof this.directionCount === "number") {
      return this.type + " " + this.direction + " ? FROM ?";
    }
    return this.type + " " + this.direction + " FROM ?";
  }
}
