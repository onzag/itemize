interface ISetBuilderManyRule {
  [columnName: string]: string | number;
}

class SetBuilder extends QueryBuilder {
  private rules: string[] = [];
  constructor() {
    super();
  }
  public setMany(value: ISetBuilderManyRule) {
    Object.keys(value).forEach((columnName) => {
      const columnValue = value[columnName];
      this.set(columnName, columnValue);
    });
    return this;
  }
  public set(columnName: string, value: string | number) {
    return this.setWithTable(null, columnName, value);
  }
  public setWithTable(tableName: string, columnName: string, value: string | number) {
    const rule = (tableName ? JSON.stringify(tableName) + "." : "") + JSON.stringify(columnName) + "=?";
    return this.setRaw(rule, [value]);
  }
  public setRaw(rule: string, bindings?: Array<string | number>) {
    this.rules.push(rule);
    bindings.forEach(this.addBindingSource);
    return this;
  }
  public compile() {
    if (!this.rules.length) {
      return "";
    }
    return "SET " + this.rules.join(",");
  }
}