/**
 * Contains the where query builder that allows to create WHERE statments
 * @packageDocumentation
 */

import { ConditionalBuilder, ConditionalBuilderFn, IManyValueType, ValueType } from "./base";

/**
 * The where query builder allows to create WHERE statments
 * extends the conditional builder since it's basically a nesting condition
 */
export class WhereBuilder extends ConditionalBuilder {

  /**
   * Creates a new where builder instance
   * @param parent the parent where builder in question
   */
  constructor(parent: WhereBuilder = null) {
    super(parent, "WHERE");
  }

  /**
   * Specifies how to build a subcondition for the where builder
   * @returns a new subcondition instance parented by this one
   */
  public subcondition() {
    return new WhereBuilder(this);
  }

  /**
   * Specifies an AND rule for column value key pairs
   * @param obj the values that are relevant
   * @returns itself
   */
  public andWhereMany(obj: IManyValueType) {
    Object.keys(obj).forEach((col) => {
      this.andWhereColumn(col, obj[col]);
    });
    return this;
  }

  /**
   * Specifies an OR rule for column value key pairs
   * @param obj the values that are relevant
   * @returns itself
   */
  public orWhereMany(obj: IManyValueType) {
    Object.keys(obj).forEach((col) => {
      this.orWhereColumn(col, obj[col]);
    });
    return this;
  }

  /**
   * Specifies an AND rule for a column with a given value or comparator
   * @param column the column in question
   * @param valueOrComparator a value to compare against in equality or a comparator
   * @param valueToCompare if the previous value was a comparator, then this one should be the value
   * @returns itself
   */
  public andWhereColumn(column: string, valueOrComparator: ValueType, valueToCompare?: ValueType) {
    const value = valueToCompare || valueOrComparator;
    const comparator = typeof valueToCompare !== "undefined" ? valueOrComparator : "=";
    if (Array.isArray(value)) {
      const rule = JSON.stringify(column) + " " + comparator + " " + value[0];
      return this.condition("AND", rule, value[1]);
    } else {
      if (value === null && comparator === "=") {
        return this.andWhereColumnNull(column);
      } else if (value === null && (comparator === "<>" || comparator === "!=")) {
        return this.andWhereColumnNotNull(column);
      }
      const rule = JSON.stringify(column) + " " + comparator + " ?";
      return this.condition("AND", rule, [value]);
    }
  }

  /**
   * Specifies an OR rule for a column with a given value or comparator
   * @param column the column in question
   * @param valueOrComparator a value to compare against in equality or a comparator
   * @param valueToCompare if the previous value was a comparator, then this one should be the value
   * @returns itself
   */
  public orWhereColumn(column: string, valueOrComparator: ValueType, valueToCompare?: ValueType) {
    const value = valueToCompare || valueOrComparator;
    const comparator = typeof valueToCompare !== "undefined" ? valueOrComparator : "=";
    if (Array.isArray(value)) {
      const rule = JSON.stringify(column) + " " + comparator + " " + value[0];
      return this.condition("OR", rule, value[1]);
    } else {
      if (value === null && comparator === "=") {
        return this.orWhereColumnNull(column);
      } else if (value === null && (comparator === "<>" || comparator === "!=")) {
        return this.orWhereColumnNotNull(column);
      }
      const rule = JSON.stringify(column) + " " + comparator + " ?";
      return this.condition("OR", rule, [value]);
    }
  }

  /**
   * Specifies an AND rule for a column when this one is null
   * @param column the column in question
   * @returns itself
   */
  public andWhereColumnNull(column: string) {
    const rule = JSON.stringify(column) + " IS NULL";
    return this.condition("AND", rule);
  }

  /**
   * Specifies an AND rule for a column when this one is not null
   * @param column the column in question
   * @returns itself
   */
  public andWhereColumnNotNull(column: string) {
    const rule = JSON.stringify(column) + " IS NOT NULL";
    return this.condition("AND", rule);
  }

  /**
   * Specifies an OR rule for a column when this one is null
   * @param column the column in question
   * @returns itself
   */
  public orWhereColumnNull(column: string) {
    const rule = JSON.stringify(column) + " IS NULL";
    return this.condition("OR", rule);
  }

  /**
   * Specifies an OR rule for a column when this one is not null
   * @param column the column in question
   * @returns itself
   */
  public orWhereColumnNotNull(column: string) {
    const rule = JSON.stringify(column) + " IS NOT NULL";
    return this.condition("OR", rule);
  }

  /**
   * Specifies a simple expression as an AND rule
   * @param rule the expression in question
   * @param bindings the bindings for that rule
   * @returns itself
   */
  public andWhere(rule: string | ConditionalBuilderFn<WhereBuilder>, bindings?: Array<string | number>) {
    return this.condition("AND", rule, bindings);
  }

  /**
   * Specifies a simple expression as a OR rule
   * @param rule the expression in question
   * @param bindings the bindings for that rule
   * @returns itself
   */
  public orWhere(rule: string | ConditionalBuilderFn<WhereBuilder>, bindings?: Array<string | number>) {
    return this.condition("OR", rule, bindings);
  }
}