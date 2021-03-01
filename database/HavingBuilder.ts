/**
 * Provides the having builder that allows to create HAVING statments
 * @module
 */

import { ConditionalBuilder, ConditionalBuilderFn } from "./base";

/**
 * The having builder that allows to create HAVING statments
 */
export class HavingBuilder extends ConditionalBuilder {

  /**
   * Builds a new having builder, because this is the nested
   * conditional builder it needs to take a parent in order
   * to compile properly
   * @param parent 
   */
  constructor(parent: HavingBuilder = null) {
    // we call the super specifying this is for HAVING
    super(parent, "HAVING");
  }

  /**
   * The override method that specifies how to create a subcondition
   */
  public subcondition() {
    return new HavingBuilder(this);
  }

  /**
   * Specifies a new AND having condition
   * @param rule the rule expression
   * @param bindings the bindings for that expression
   * @returns itself
   */
  public andHaving(rule: string | ConditionalBuilderFn<HavingBuilder>, bindings?: Array<string | number>) {
    return this.condition("AND", null, rule, bindings);
  }

  /**
   * Specifies a new OR having condition
   * @param rule the rule expression
   * @param bindings the bindings for that expression
   * @returns itself
   */
  public orHaving(rule: string | ConditionalBuilderFn<HavingBuilder>, bindings?: Array<string | number>) {
    return this.condition("OR", null, rule, bindings);
  }
}