import { QueryBuilder } from ".";

export class ReturningBuilder extends QueryBuilder {
  private expressionAlias: string;
  private expression: string;
  constructor() {
    super();
  }
  public returningAll(tableName?: string) {
    if (tableName) {
      return this.returning(JSON.stringify(tableName) + ".*");
    }
    return this.returning("*");
  }
  public returningColumn(column: string) {
    return this.returning(JSON.stringify(column));
  }
  public returningColumnInTable(tableName: string, column: string) {
    this.returning(JSON.stringify(tableName) + "." + JSON.stringify(column));
  }
  public returning(expression: string, bindings?: Array<string | number>) {
    this.expression = expression;

    if (bindings) {
      this.addBindingSources(bindings);
    }

    return this;
  }
  public alias(alias: string) {
    this.expressionAlias = alias;
    return this;
  }
  public compile() {
    if (!this.expression) {
      return "";
    }
    return "RETURNING " + this.expression + (this.expressionAlias ? " AS " + JSON.stringify(this.expressionAlias) : "");
  }
}