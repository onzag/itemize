import { QueryBuilder } from ".";

export interface ISetBuilderManyRule {
  [columnName: string]: string | number | [string, Array<string | number>];
}

export class SetBuilder extends QueryBuilder {
  private rules: string[] = [];
  constructor() {
    super();
  }
  public setMany(value: ISetBuilderManyRule) {
    Object.keys(value).forEach((columnName) => {
      const columnValue = value[columnName];
      this.setColumn(columnName, columnValue);
    });
    return this;
  }
  public setColumn(columnName: string, value: string | number | [string, Array<string | number>]) {
    return this.setWithTable(null, columnName, value);
  }
  public setWithTable(tableName: string, columnName: string, value: string | number | [string, Array<string | number>]) {
    let rule = (tableName ? JSON.stringify(tableName) + "." : "") + JSON.stringify(columnName) + " = ";
    if (Array.isArray(value)) {
      rule += value[0];
      return this.set(rule, value[1]);
    } else {
      rule += "?";
      return this.set(rule, [value]);
    }
  }
  public set(rule: string, bindings?: Array<string | number>) {
    this.rules.push(rule);
    this.addBindingSources(bindings);
    return this;
  }
  public compile() {
    if (!this.rules.length) {
      return "";
    }
    return "SET " + this.rules.join(",");
  }
}