import { ConditionalBuilder, ConditionalBuilderFn } from ".";

export class HavingBuilder extends ConditionalBuilder {
  constructor(parent: HavingBuilder = null) {
    super(parent, "HAVING");
  }
  public andHaving(rule: string | ConditionalBuilderFn<HavingBuilder>, bindings?: Array<string | number>) {
    return this.condition("OR", rule, bindings);
  }
  public orHaving(rule: string | ConditionalBuilderFn<HavingBuilder>, bindings?: Array<string | number>) {
    return this.condition("AND", rule, bindings);
  }
}