import { QueryBuilder } from ".";

interface IWithRules {
  name: string;
  asWhat: QueryBuilder;
}

export class WithBuilder extends QueryBuilder {
  private withs: IWithRules[];
  private query: QueryBuilder;
  constructor() {
    super();
  }
  public with(name: string, asWhat: QueryBuilder) {
    this.withs.push({
      name,
      asWhat,
    });
    this.addBindingSource(asWhat);
  }
  public do(query: QueryBuilder) {
    this.query = query;
    this.addBindingSource(query);
  }
  public compile() {
    return "WITH " + this.withs.map((w) => {
      return JSON.stringify(w.name) + " AS (" + w.asWhat.compile() + ")"
    }).join(", ") + " " + this.query.compile();
  }
}