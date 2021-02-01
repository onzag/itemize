import { QueryBuilder, ConditionalBuilder, ConditionalBuilderFn } from ".";

export class JoinRuleBuilder extends ConditionalBuilder {
  public on(rule: string | ConditionalBuilderFn<JoinRuleBuilder>, bindings?: Array<string | number>) {
    return this.condition("AND", rule, bindings);
  }
  public onColumnEquals(columnA: string, columnB: string) {
    return this.condition("AND", JSON.stringify(columnA) + " = " + JSON.stringify(columnB));
  }
}

type JoinBuilderFn = (ruleBuilder: JoinRuleBuilder) => void;

export class JoinBuilder extends QueryBuilder {
  private builders: JoinRuleBuilder[];
  constructor() {
    super();
  }
  private joinBase(type: "JOIN" | "LEFT JOIN" | "RIGHT JOIN" | "FULL JOIN", tableName: string) {
    const conditionalBuilder = new JoinRuleBuilder(null, type + " " + JSON.stringify(tableName));
    this.builders.push(conditionalBuilder);
    this.addBindingSource(conditionalBuilder);
    return conditionalBuilder;
  }
  public join(tableName: string, fn: JoinBuilderFn) {
    const builder = this.joinBase("JOIN", tableName);
    fn(builder);
    return this;
  }
  public leftJoin(tableName: string, fn: JoinBuilderFn) {
    const builder = this.joinBase("LEFT JOIN", tableName);
    fn(builder);
    return this;
  }
  public rightJoin(tableName: string, fn: JoinBuilderFn) {
    const builder = this.joinBase("RIGHT JOIN", tableName);
    fn(builder);
    return this;
  }
  public fullJoin(tableName: string, fn: JoinBuilderFn) {
    const builder = this.joinBase("FULL JOIN", tableName);
    fn(builder);
    return this;
  }
  public clear() {
    this.builders = [];
    this.clearBindingSources();
  }
  public compile() {
    if (!this.builders.length) {
      return "";
    }
    return this.builders.map(b => b.compile()).join(" ");
  }
}