import { QueryBuilder, IManyValueType, ValueType, BasicBindingType } from ".";

export class SetBuilder extends QueryBuilder {
  private rules: string[] = [];
  constructor() {
    super();
  }
  public setMany(value: IManyValueType) {
    Object.keys(value).forEach((columnName) => {
      const columnValue = value[columnName];
      this.setColumn(columnName, columnValue);
    });
    return this;
  }
  public setColumn(columnName: string, value: ValueType) {
    return this.setColumnWithTable(null, columnName, value);
  }
  public setColumnWithTable(tableName: string, columnName: string, value: ValueType) {
    let rule = (tableName ? JSON.stringify(tableName) + "." : "") + JSON.stringify(columnName) + " = ";
    if (Array.isArray(value)) {
      rule += value[0];
      return this.set(rule, value[1]);
    } else {
      rule += "?";
      return this.set(rule, [value]);
    }
  }
  public set(rule: string, bindings?: BasicBindingType[]) {
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
  public clear() {
    this.rules = [];
    this.clearBindingSources();
  }
}