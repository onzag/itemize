import { QueryBuilder } from ".";

interface IOrderByExpression {
  expression: string;
  style: "ASC" | "DESC" | "USING";
  nulls: "FIRST" | "LAST";
  operator?: string;
}

export class OrderByBuilder extends QueryBuilder {
  private expressions: IOrderByExpression[] = [];
  constructor() {
    super();
  }
  public orderByColumnInTable(tableName: string, column: string, style: "ASC" | "DESC", nulls: "FIRST" | "LAST") {
    const tableNameProper = tableName ? JSON.stringify(tableName) + "." : "";
    const orderByExpression = tableNameProper + JSON.stringify(column);
    this.expressions.push({
      expression: orderByExpression,
      style,
      nulls,
    });
    return this;
  }

  public orderByColumn(column: string, style: "ASC" | "DESC", nulls: "FIRST" | "LAST") {
    return this.orderByColumnInTable(null, column, style, nulls);
  }

  public orderBy(expression: string, style: "ASC" | "DESC", nulls: "FIRST" | "LAST", bindings?: Array<string | number>) {
    this.expressions.push({
      expression,
      style,
      nulls,
    });

    this.addBindingSources(bindings);

    return this;
  }

  public orderByUsing(expression: string, operator: string, nulls: "FIRST" | "LAST", bindings?: Array<string | number>) {
    this.expressions.push({
      expression,
      style: "USING",
      operator,
      nulls,
    });

    this.addBindingSources(bindings);

    return this;
  }

  public clear() {
    this.expressions = [];
    this.clearBindingSources();
    return this;
  }

  public compile() {
    if (!this.expressions.length) {
      return "";
    }

    return "ORDER BY " +
      this.expressions.map(
        (x) =>
          x.expression + " " +
          x.style + " " +
          (x.operator ? x.operator + " " : "") +
          "NULLS " + x.nulls
      ).join(", ");
  }
}