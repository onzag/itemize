/**
 * Contains the where query builder that allows to create WHERE statments
 * @module
 */

import { CONNECTOR_SQL_COLUMN_VERSION_FK_NAME } from "../constants";
import { ConditionalBuilder, ConditionalBuilderFn, IManyValueType, ValueType } from "./base";
import { SelectBuilder } from "./SelectBuilder";
import type { IPropertyDefinitionSupportedCurrencyType } from "../base/Root/Module/ItemDefinition/PropertyDefinition/types/currency";

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
   * Specifies a condition for an EXISTS rule
   * @param arg a function that provides a select builder
   * @returns itself
   */
  public andWhereExists(arg: ConditionalBuilderFn<SelectBuilder>) {
    const builder = new SelectBuilder();
    arg(builder);

    return this.condition("AND", "EXISTS", builder);
  }

  /**
   * Specifies a condition for an EXISTS rule
   * @param arg a function that provides a select builder
   * @returns itself
   */
  public andWhereNotExists(arg: ConditionalBuilderFn<SelectBuilder>) {
    const builder = new SelectBuilder();
    arg(builder);

    return this.condition("AND", "NOT EXISTS", builder);
  }

  /**
   * Specifies a condition for an EXISTS rule
   * @param arg a function that provides a select builder
   * @returns itself
   */
  public orWhereExists(arg: ConditionalBuilderFn<SelectBuilder>) {
    const builder = new SelectBuilder();
    arg(builder);

    return this.condition("OR", "EXISTS", builder);
  }

  /**
   * Specifies a condition for an EXISTS rule
   * @param arg a function that provides a select builder
   * @returns itself
   */
  public orWhereNotExists(arg: ConditionalBuilderFn<SelectBuilder>) {
    const builder = new SelectBuilder();
    arg(builder);

    return this.condition("OR", "NOT EXISTS", builder);
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
    let value = typeof valueToCompare !== "undefined" ? valueToCompare : valueOrComparator;
    const comparator = typeof valueToCompare !== "undefined" ? valueOrComparator : "=";

    if (value === null && (column === "version" || column === CONNECTOR_SQL_COLUMN_VERSION_FK_NAME || column === "parent_version")) {
      value = ""
    }

    if (Array.isArray(value)) {
      const rule = JSON.stringify(column) + " " + comparator + " " + value[0];
      return this.condition("AND", null, rule, value[1]);
    } else {
      if (value === null && comparator === "=") {
        return this.andWhereColumnNull(column);
      } else if (value === null && (comparator === "<>" || comparator === "!=")) {
        return this.andWhereColumnNotNull(column);
      }
      const rule = JSON.stringify(column) + " " + comparator + " ?";
      return this.condition("AND", null, rule, [value]);
    }
  }

  /**
   * Specifies whether the column is within any of the given values in the array
   * @param column 
   * @param values 
   * @param type 
   * @returns 
   */
  public andWhereColumnIn(
    column: string,
    values: Array<string | number>,
    type: "INTEGER" | "TEXT" | "BIGINT" | "DATE" | "TIME" | "TIMESTAMP",
  ) {
    return this.andWhere(
      JSON.stringify(column) + " = ANY(ARRAY[" + values.map((v) => "?").join(",") + "]::" + type + "[])",
      values,
    );
  }

  /**
   * Specifies whether the column is a subset of the given array
   * @param column 
   * @param values 
   * @param type 
   * @returns 
   */
  public andWhereColumnSuperset(
    column: string,
    values: Array<string | number>,
    type: "INTEGER" | "TEXT" | "BIGINT" | "DATE" | "TIME" | "TIMESTAMP",
  ) {
    return this.andWhere(
      JSON.stringify(column) + " @> ARRAY[" + values.map((v) => "?").join(",") + "]::" + type + "[]",
      values,
    );
  }

  /**
   * Specifies whether the column is a subset of the given array
   * @param column 
   * @param values 
   * @param type 
   * @returns 
   */
  public andWhereColumnSubset(
    column: string,
    values: Array<string | number>,
    type: "INTEGER" | "TEXT" | "BIGINT" | "DATE" | "TIME" | "TIMESTAMP",
  ) {
    return this.andWhere(
      JSON.stringify(column) + " <@ ARRAY[" + values.map((v) => "?").join(",") + "]::" + type + "[]",
      values,
    );
  }

  /**
   * Specifies whether the column is a subset of the given array
   * @param column 
   * @param values 
   * @param type 
   * @returns 
   */
  public andWhereColumnOverlaps(
    column: string,
    values: Array<string | number>,
    type: "INTEGER" | "TEXT" | "BIGINT" | "DATE" | "TIME" | "TIMESTAMP",
  ) {
    return this.andWhere(
      JSON.stringify(column) + " && ARRAY[" + values.map((v) => "?").join(",") + "]::" + type + "[]",
      values,
    );
  }

  /**
   * Specifies an OR rule for a column with a given value or comparator
   * @param column the column in question
   * @param valueOrComparator a value to compare against in equality or a comparator
   * @param valueToCompare if the previous value was a comparator, then this one should be the value
   * @returns itself
   */
  public orWhereColumn(column: string, valueOrComparator: ValueType, valueToCompare?: ValueType) {
    let value = valueToCompare || valueOrComparator;

    if (value === null && (column === "version" || column === CONNECTOR_SQL_COLUMN_VERSION_FK_NAME || column === "parent_version")) {
      value = ""
    }

    const comparator = typeof valueToCompare !== "undefined" ? valueOrComparator : "=";
    if (Array.isArray(value)) {
      const rule = JSON.stringify(column) + " " + comparator + " " + value[0];
      return this.condition("OR", null, rule, value[1]);
    } else {
      if (value === null && comparator === "=") {
        return this.orWhereColumnNull(column);
      } else if (value === null && (comparator === "<>" || comparator === "!=")) {
        return this.orWhereColumnNotNull(column);
      }
      const rule = JSON.stringify(column) + " " + comparator + " ?";
      return this.condition("OR", null, rule, [value]);
    }
  }

  /**
   * Specifies an AND rule for a column when this one is null
   * @param column the column in question
   * @returns itself
   */
  public andWhereColumnNull(column: string) {
    const rule = JSON.stringify(column) + " IS NULL";
    return this.condition("AND", null, rule);
  }

  /**
   * Specifies an AND rule for a column when this one is not null
   * @param column the column in question
   * @returns itself
   */
  public andWhereColumnNotNull(column: string) {
    const rule = JSON.stringify(column) + " IS NOT NULL";
    return this.condition("AND", null, rule);
  }

  /**
   * Specifies an OR rule for a column when this one is null
   * @param column the column in question
   * @returns itself
   */
  public orWhereColumnNull(column: string) {
    const rule = JSON.stringify(column) + " IS NULL";
    return this.condition("OR", null, rule);
  }

  /**
   * Specifies an OR rule for a column when this one is not null
   * @param column the column in question
   * @returns itself
   */
  public orWhereColumnNotNull(column: string) {
    const rule = JSON.stringify(column) + " IS NOT NULL";
    return this.condition("OR", null, rule);
  }

  /**
   * Specifies a simple expression as an AND rule
   * @param rule the expression in question
   * @param bindings the bindings for that rule
   * @returns itself
   */
  public andWhere(rule: string | ConditionalBuilderFn<WhereBuilder>, bindings?: Array<string | number>) {
    return this.condition("AND", null, rule, bindings);
  }

  /**
   * Specifies a simple expression as a OR rule
   * @param rule the expression in question
   * @param bindings the bindings for that rule
   * @returns itself
   */
  public orWhere(rule: string | ConditionalBuilderFn<WhereBuilder>, bindings?: Array<string | number>) {
    return this.condition("OR", null, rule, bindings);
  }

  public andWhereBooleanProperty(property: string, valueOrOtherBooleanProperty: boolean | string) {
    if (valueOrOtherBooleanProperty === null) {
      return this.andWhereColumnNull(property);
    }
    if (typeof valueOrOtherBooleanProperty === "boolean") {
      return this.andWhereColumn(property, valueOrOtherBooleanProperty);
    }
    return this.condition("AND", null, JSON.stringify(property) + " = " + JSON.stringify(valueOrOtherBooleanProperty));
  }

  public orWhereBooleanProperty(property: string, valueOrOtherBooleanProperty: boolean | string) {
    if (valueOrOtherBooleanProperty === null) {
      return this.orWhereColumnNull(property);
    }
    if (typeof valueOrOtherBooleanProperty === "boolean") {
      return this.orWhereColumn(property, valueOrOtherBooleanProperty);
    }
    return this.condition("OR", null, JSON.stringify(property) + " = " + JSON.stringify(valueOrOtherBooleanProperty));
  }

  // TODO all these comparisons
  // public andWhereCurrencyProperty(
  //   property: string,
  //   valueOrComparator: IPropertyDefinitionSupportedCurrencyType | ">" | ">=" | "<" | "<=",
  //   valueToCompare: IPropertyDefinitionSupportedCurrencyType | string,
  // ) {
  //   const value = typeof valueToCompare !== "undefined" ? valueToCompare : valueOrComparator;
  //   const comparator = typeof valueToCompare !== "undefined" ? valueOrComparator : "=";

  //   if (value === null) {
  //     return this.andWhereColumnNull(property + "_VALUE");
  //   }
  // }

  // public orWhereCurrencyProperty(property: string, value: IPropertyDefinitionSupportedCurrencyType) {
  //   if (value === null) {
  //     return this.orWhereColumnNull(property + "_VALUE");
  //   }
  // }
}