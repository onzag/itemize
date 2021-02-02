/**
 * Contains the join query builder and join rule builder that allows to create JOIN statments
 * joins are a combination of a simple specification on how to join with the rules
 * @packageDocumentation
 */

import { QueryBuilder, ConditionalBuilder, ConditionalBuilderFn } from ".";

/**
 * Represents the join rule basically the real LEFT JOIN, RIGHT  JOIN, INNER JOIN and whatnot
 */
export class JoinRuleBuilder extends ConditionalBuilder {
  /**
   * Specifies how to subcondition this conditional builder
   */
  public subcondition(): JoinRuleBuilder {
    // we just reinstantiate itself with this as parent
    return new JoinRuleBuilder(this, this.type);
  }

  /**
   * Specifies a rule where the conditiuon applies this is an AND rule
   * @param rule the rule to join with
   * @param bindings the bindings for the expression
   * @returns itself
   */
  public on(rule: string | ConditionalBuilderFn<JoinRuleBuilder>, bindings?: Array<string | number>) {
    return this.condition("AND", rule, bindings);
  }

  /**
   * Specifies a rule where the conditiuon applies this is an OR rule
   * @param rule the rule to join with
   * @param bindings the bindings for the expression
   * @returns itself
   */
  public orOn(rule: string | ConditionalBuilderFn<JoinRuleBuilder>, bindings?: Array<string | number>) {
    return this.condition("OR", rule, bindings);
  }

  /**
   * Specify a join rule on equality between columns this is an AND rule
   * @param columnA 
   * @param columnB 
   * @returns itself
   */
  public onColumnEquals(columnA: string, columnB: string) {
    return this.condition("AND", JSON.stringify(columnA) + " = " + JSON.stringify(columnB));
  }

  /**
   * Specify a join rule on equality between columns this is an OR rule
   * @param columnA 
   * @param columnB
   * @returns itself
   */
  public orOnColumnEquals(columnA: string, columnB: string) {
    return this.condition("OR", JSON.stringify(columnA) + " = " + JSON.stringify(columnB));
  }
}

/**
 * The join builder function
 */
type JoinBuilderFn = (ruleBuilder: JoinRuleBuilder) => void;

/**
 * This class is the actual join builder as it represents a collection of multiple join
 * rules builders
 */
export class JoinBuilder extends QueryBuilder {
  /**
   * These are the list of all the builders that represents the join rules
   */
  private builders: JoinRuleBuilder[];

  /**
   * Builds a new join builder
   */
  constructor() {
    super();
  }

  /**
   * Base function for joining
   * @param type the type of join
   * @param tableName the table name that we join at
   * @returns the new builder
   */
  private joinBase(type: "JOIN" | "LEFT JOIN" | "RIGHT JOIN" | "FULL JOIN", tableName: string) {
    const conditionalBuilder = new JoinRuleBuilder(null, type + " " + JSON.stringify(tableName));
    this.builders.push(conditionalBuilder);
    this.addBindingSource(conditionalBuilder);
    return conditionalBuilder;
  }

  /**
   * Performs a join with a table
   * @param tableName the table name
   * @param fn a function to specify the join rule
   * @returns itself
   */
  public join(tableName: string, fn: JoinBuilderFn) {
    const builder = this.joinBase("JOIN", tableName);
    fn(builder);
    return this;
  }

  /**
   * Performs a left join with a table
   * @param tableName the table name
   * @param fn a function to specify the join rule
   * @returns itself
   */
  public leftJoin(tableName: string, fn: JoinBuilderFn) {
    const builder = this.joinBase("LEFT JOIN", tableName);
    fn(builder);
    return this;
  }

  /**
   * Performs a right join with a table
   * @param tableName the table name
   * @param fn a function to specify the join rule
   * @returns itself
   */
  public rightJoin(tableName: string, fn: JoinBuilderFn) {
    const builder = this.joinBase("RIGHT JOIN", tableName);
    fn(builder);
    return this;
  }

  /**
   * Performs a full join with a table
   * @param tableName the table name
   * @param fn a function to specify the join rule
   * @returns itself
   */
  public fullJoin(tableName: string, fn: JoinBuilderFn) {
    const builder = this.joinBase("FULL JOIN", tableName);
    fn(builder);
    return this;
  }

  /**
   * Clears all the joining rules from the builder
   * @returns itself
   */
  public clear() {
    this.builders = [];
    this.clearBindingSources();
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile() {
    if (!this.builders.length) {
      return "";
    }
    return this.builders.map(b => b.compile()).join(" ");
  }
}