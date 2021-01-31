import { QueryBuilder } from ".";
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

  private tableNames: string[];
  private ilimit: number;
  private ioffset: number;

  constructor() {
    super();

    this.tableNames = [];

    this.fromBuilder = new FromBuilder();
    this.joinBuilder = new JoinBuilder();
    this.whereBuilder = new WhereBuilder();
    this.groupByBuilder = new GroupByBuilder();
    this.havingBuilder = new HavingBuilder();
    this.orderByBuilder = new OrderByBuilder();

    this.addBindingSource(this.fromBuilder);
    this.addBindingSource(this.joinBuilder);
    this.addBindingSource(this.whereBuilder);
    this.addBindingSource(this.groupByBuilder);
    this.addBindingSource(this.havingBuilder);
    this.addBindingSource(this.orderByBuilder);
  }
  public table(tableName: string) {
    this.tableNames.push(tableName);
    return this;
  }
  public tables(tableNames: string[]) {
    this.tableNames = tableNames;
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
  public selectExpression(expression: string, bindings?: Array<string | number>) {
    this.selectedExpressions.push(expression);
    
    if (bindings) {
      this.shiftBindingSources(bindings);
    }
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
    if (!this.tableNames.length) {
      return "";
    }
    return "SELECT " + this.selectedExpressions.join(", ") + " FROM " + this.tableNames.map((v) => JSON.stringify(v)).join(", ") +
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