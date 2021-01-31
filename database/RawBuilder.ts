class RawBuilder extends QueryBuilder {
  private raw: string;
  constructor(raw: string, bindings?: Array<string | number>) {
    super();

    this.raw = raw;

    if (bindings) {
      bindings.forEach(this.addBindingSource);
    }
  }
  public compile() {
    return this.raw;
  }
}