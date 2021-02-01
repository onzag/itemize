import { QueryBuilder } from ".";

export class FromBuilder extends QueryBuilder {
  private tables: string[] = [];
  constructor() {
    super();
  }
  public from(tableName: string) {
    this.tables.push(tableName);
    return this;
  }
  public clear() {
    this.tables = [];
    this.clearBindingSources();
    return this;
  }
  public compile() {
    if (!this.tables.length) {
      return "";
    }
    return "FROM " + this.tables.map((t) => JSON.stringify(t)).join(", ");
  }
}