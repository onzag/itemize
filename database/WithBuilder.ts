class WithBuilder extends QueryBuilder {
  private name: string;
  private asWhat: QueryBuilder;
  constructor(name: string, asWhat: QueryBuilder) {
    super();

    this.name = name;
    this.asWhat = asWhat;

    this.addBindingSource(this.asWhat);
  }
  public compile() {
    return "WITH " + JSON.stringify(this.name) + " AS (" + this.asWhat.compile() + ")"
  }
}