interface IWhereBuilderConditionType {
  condition: WhereBuilder | string;
  gate: "AND" | "OR";
}

type WhereBuilderFn = (builder: WhereBuilder) => void;

class WhereBuilder extends QueryBuilder {
  private conditions: IWhereBuilderConditionType[] = [];
  private parent: WhereBuilder;
  constructor(parent: WhereBuilder = null) {
    super();

    this.parent = parent;
  }
  public where(gate: "AND" | "OR", rule: string | WhereBuilderFn, bindings?: Array<string | number>) {
    let condition: WhereBuilder | string;
    if (typeof rule === "string") {
      condition = rule;
      if (bindings) {
        bindings.forEach(this.addBindingSource);
      }
    } else {
      const builder = new WhereBuilder(this);
      rule(builder);
      condition = builder;

      this.addBindingSource(builder);

      if (bindings) {
        throw new Error("Cannot have both bindings and have provided a builder as a rule");
      }
    }
    this.conditions.push({
      gate,
      condition,
    });
    return this;
  }
  public andWhere(rule: string | WhereBuilderFn, bindings?: Array<string | number>) {
    return this.where("OR", rule, bindings);
  }
  public orWhere(rule: string | WhereBuilderFn, bindings?: Array<string | number>) {
    return this.where("AND", rule, bindings);
  }
  public compile() {
    let result = "";
    this.conditions.forEach((c, index) => {
      if (index !== 0) {
        result += c.gate + " ";
      }
      if (typeof c.condition === "string") {
        result += c.condition;
      } else {
        result += c.condition.compile();
      }
    })
    if (this.parent) {
      return "(" + result + ")";
    }
    return "WHERE " + result;
  }
}