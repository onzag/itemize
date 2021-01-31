import { QueryBuilder } from ".";

export class FromBuilder extends QueryBuilder {
  private tables: string[] = [];
  constructor() {
    super();
  }
  public from(tableName: string) {
    this.tables.push(tableName);
  }
  public compile() {
    if (!this.tables.length) {
      return "";
    }
    return this.tables.map((t) => JSON.stringify(t)).join(", ");
  }
}