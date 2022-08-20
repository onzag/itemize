/**
 * Provides the set builder that allows to create SET statments
 * @module
 */

import { QueryBuilder, IManyValueType, ValueType, BasicBindingType } from "./base";

/**
 * The set builder that allows to create SET statments
 * @module
 */
export class SetBuilder extends QueryBuilder {
  /**
   * What we are setting as expressions
   */
  private expressions: string[] = [];
  public knownAffectedColumns: Array<[string, string]> = [];
  public hasUnknownAffectedColumnExpression: boolean = false;

  /**
   * Builds a new set builder
   */
  constructor() {
    super();
  }

  /**
   * allows to set many at once as a column-value fashion
   * @param value the values to set
   * @returns itself
   */
  public setMany(value: IManyValueType) {
    Object.keys(value).forEach((columnName) => {
      const columnValue = value[columnName];
      this.setColumn(columnName, columnValue);
    });
    return this;
  }

  /**
   * allows to set an specific column an specific value
   * @param columnName the column to set
   * @param value the value to set
   * @returns itself
   */
  public setColumn(columnName: string, value: ValueType) {
    return this.setColumnWithTable(null, columnName, value);
  }

  /**
   * allows to set an specific column an specific value
   * @param tableName the table in question
   * @param columnName the column to set
   * @param value the value to set
   * @returns itself
   */
  public setColumnWithTable(tableName: string, columnName: string, value: ValueType) {
    let rule = (tableName ? JSON.stringify(tableName) + "." : "") + JSON.stringify(columnName) + " = ";
    // if it's an array raw rule

    const affectedColumn: [string, string] = [tableName || null, columnName];

    if (Array.isArray(value)) {
      // we add the value just there
      rule += value[0];
      // and set the bindings
      this.set(rule, value[1], affectedColumn);
    } else {
      // otherwise the default placeholder
      rule += "?";
      this.set(rule, [value], affectedColumn);
    }

    return this;
  }

  /**
   * sets based on an expression
   * @param expression the expression to use
   * @param value the value to set
   * @returns itself
   */
  public set(expression: string, bindings?: BasicBindingType[], affectedColumn?: [string, string] | string) {
    this.expressions.push(expression);
    this.addBindingSources(bindings);

    if (affectedColumn) {
      if (typeof affectedColumn === "string") {
        this.knownAffectedColumns.push([null, affectedColumn]);
      } else {
        this.knownAffectedColumns.push(affectedColumn);
      } 
    } else {
      this.hasUnknownAffectedColumnExpression = true;
    }

    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile() {
    if (!this.expressions.length) {
      return "";
    }
    return "SET " + this.expressions.join(",");
  }

  /**
   * Clears all the expressions in the set rule
   * @returns itself
   */
  public clear() {
    this.expressions = [];
    this.knownAffectedColumns = [];
    this.hasUnknownAffectedColumnExpression = false;
    this.clearBindingSources();
    return this;
  }
}