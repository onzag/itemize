import { BasicBindingType, QueryBuilder } from ".";
import { FromBuilder } from "./FromBuilder";
import { GroupByBuilder } from "./GroupByBuilder";
import { HavingBuilder } from "./HavingBuilder";
import { JoinBuilder } from "./JoinBuilder";
import { OrderByBuilder } from "./OrderByBuilder";
import { WhereBuilder } from "./WhereBuilder";

export class SelectBuilder extends QueryBuilder {
  private selectedExpressions: string[] = [];

  public fromBuilder: FromBuilder;
  public joinBuilder: JoinBuilder;
  public whereBuilder: WhereBuilder;
  public groupByBuilder: GroupByBuilder;
  public havingBuilder: HavingBuilder;
  public orderByBuilder: OrderByBuilder;

  private ilimit: number;
  private ioffset: number;

  constructor() {
    super();

    this.fromBuilder = new FromBuilder();
    this.joinBuilder = new JoinBuilder();
    this.whereBuilder = new WhereBuilder();
    this.groupByBuilder = new GroupByBuilder();
    this.havingBuilder = new HavingBuilder();
    this.orderByBuilder = new OrderByBuilder();

    this.clearSelect();
  }
  public table(tableName: string) {
    this.selectedExpressions.push(JSON.stringify(tableName));
    return this;
  }
  public tables(tableNames: string[]) {
    tableNames.forEach((t) => {
      this.selectedExpressions.push(JSON.stringify(t));
    });
    return this;
  }
  public selectAll(tableName?: string) {
    const tableNameProper = tableName ? JSON.stringify(tableName) + "." : "";
    const allExpression = tableNameProper + "*";
    return this.selectExpression(allExpression);
  }
  public select(...columns: string[]) {
    return this.selectFromTable(null, ...columns);
  }
  public selectFromTable(tableName: string, ...columns: string[]) {
    const tableNameProper = tableName ? JSON.stringify(tableName) + "." : "";
    columns.forEach((column) => {
      const expression = tableNameProper + JSON.stringify(column);
      this.selectExpression(expression);
    });
    return this;
  }
  public selectExpression(expression: string, bindings?: BasicBindingType[]) {
    this.selectedExpressions.unshift(expression);
    
    if (bindings) {
      this.shiftBindingSources(bindings);
    }
    return this;
  }
  public clearSelect() {
    this.selectedExpressions = [];
    this.clearBindingSources();

    this.addBindingSource(this.fromBuilder);
    this.addBindingSource(this.joinBuilder);
    this.addBindingSource(this.whereBuilder);
    this.addBindingSource(this.groupByBuilder);
    this.addBindingSource(this.havingBuilder);
    this.addBindingSource(this.orderByBuilder);

    return this;
  }
  public clear() {
    this.clearSelect();
    this.ilimit = null;
    this.ioffset = null;
    return this;
  }
  public limit(n: number) {
    this.ilimit = n;
    return this;
  }
  public offset(n: number) {
    this.ioffset = n;
    return this;
  }
  public compile() {
    if (!this.selectedExpressions.length) {
      return "";
    }
    return "SELECT " + this.selectedExpressions.join(", ") +
      this.fromBuilder.compile() +
      this.joinBuilder.compile() +
      this.whereBuilder.compile() +
      this.groupByBuilder.compile() +
      this.havingBuilder.compile() +
      this.orderByBuilder.compile() +
      (this.ilimit ? " LIMIT " + this.ilimit : "") +
      (this.ioffset ? " OFFSET " + this.ioffset : "");
  }
}