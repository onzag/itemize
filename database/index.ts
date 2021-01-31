interface IQueryBuilderSQLResult {
  query: string;
  bindings: Array<string | number>;
}

class QueryBuilder {
  private bindingSources: Array<QueryBuilder | string | number>;
  constructor() {
  }
  public addBindingSource(value: QueryBuilder | string | number) {
    this.bindingSources.push(value);
  }
  public addBindingSourceAt(index: number, value: QueryBuilder | string | number) {
    this.bindingSources[index] = value;
  }
  public compile() {
    return "";
  }
  public toSQL(): IQueryBuilderSQLResult {
    const stringResult = this.compile();
    const bindingHoles = stringResult.split("?");
    const bindings = this.getBindings();
    const totalHoles = bindingHoles.length - 1;

    if (totalHoles !== bindings.length) {
      throw new Error("SQL query " + JSON.stringify(stringResult) + " did not provide all the bindings: " + bindings.length)
    }

    let joinedResult = "";
    bindingHoles.forEach((r, index) => {
      if (index !== 0) {
        joinedResult += "$" + index;
      }
      joinedResult += r;
    });

    return {
      query: joinedResult,
      bindings,
    };
  }
  public getBindings() {
    let allBindings: Array<string | number> = [];
    this.bindingSources.forEach((bs) => {
      if (typeof bs === "undefined") {
        return;
      }

      if (bs instanceof QueryBuilder) {
        allBindings = allBindings.concat(bs.getBindings())
      } else {
        allBindings.push(bs as any);
      }
    });
    return allBindings;
  }
}