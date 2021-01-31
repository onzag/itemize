import { QueryBuilder } from ".";

export class RawBuilder extends QueryBuilder {
  private raw: string;
  constructor(raw: string, bindings?: Array<string | number>) {
    super();

    this.raw = raw;

    if (bindings) {
      this.addBindingSources(bindings);
    }
  }
  public compile() {
    return this.raw;
  }
}