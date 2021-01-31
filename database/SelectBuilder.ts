class SelectBuilder extends QueryBuilder {
  public fromBuilder: FromBuilder;
  public whereBuilder: WhereBuilder;

  constructor() {
    super();

    this.tableName = null;
    this.alias = null;
    this.setBuilder = new SetBuilder();
    this.fromBuilder = new FromBuilder();
    this.whereBuilder = new WhereBuilder();
    this.returningBuilder = new ReturningBuilder();

    this.addBindingSource(this.setBuilder);
    this.addBindingSource(this.fromBuilder);
    this.addBindingSource(this.whereBuilder);
    this.addBindingSource(this.returningBuilder);
  }
  public table(tableName: string) {
    this.tableName = tableName;
    return this;
  }
  public alias(alias: string) {
    this.tableAlias = alias;
    return this;
  }
  public makeOnly() {
    this.isOnly = true;
    return this;
  }
  public compile() {
    if (!this.tableName) {
      return null;
    }
    return "UPDATE " + (this.isOnly ? "ONLY " : "") + JSON.stringify(this.tableName) +
      (this.tableAlias ? "AS " + JSON.stringify(this.tableAlias) : "") +
      this.setBuilder.compile() +
      this.fromBuilder.compile() +
      this.whereBuilder.compile() +
      this.returningBuilder.compile();
  }
}