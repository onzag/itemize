import { QueryBuilder } from ".";

export class GroupByBuilder extends QueryBuilder {
  private expressions: string[];
  constructor() {
    super();
  }
  public addColumn(column: string) {
    return this.addColumnWithTable(null, column);
  }
  public addColumnWithTable(tableName: string, column: string) {
    const tableNameProper = tableName ? JSON.stringify(tableName) + "." : "";
    const columnProper = tableNameProper + JSON.stringify(column);
    return this.addExpression(columnProper);
  }
  public addExpression(expression: string, bindings?: Array<number | string>) {
    this.expressions.push(expression);

    if (bindings) {
      this.addBindingSources(bindings);
    }
    return this;
  }
  public compile() {
    return this.expressions.join(", ");
  }
  public clear() {
    this.expressions = [];
    this.clearBindingSources();
    return this;
  }
}