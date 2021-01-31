import { ConditionalBuilder, ConditionalBuilderFn } from ".";

interface IWhereManyOption {
  [column: string]: string | number;
}

export class WhereBuilder extends ConditionalBuilder {
  constructor(parent: WhereBuilder = null) {
    super(parent, "WHERE");
  }
  public andWhereMany(obj: IWhereManyOption) {
    Object.keys(obj).forEach((col) => {
      this.andWhereColumn(col, obj[col]);
    });
    return this;
  }
  public orWhereMany(obj: IWhereManyOption) {
    Object.keys(obj).forEach((col) => {
      this.orWhereColumn(col, obj[col]);
    });
    return this;
  }
  public andWhereColumn(column: string, value: string | number, comparator: string = "=") {
    const rule = JSON.stringify(column) + " " + comparator + " ?";
    return this.condition("AND", rule, [value]);
  }
  public orWhereColumn(column: string, value: string | number, comparator: string = "=") {
    const rule = JSON.stringify(column) + " " +  comparator + " ?";
    return this.condition("OR", rule, [value]);
  }
  public andWhere(rule: string | ConditionalBuilderFn<WhereBuilder>, bindings?: Array<string | number>) {
    return this.condition("AND", rule, bindings);
  }
  public orWhere(rule: string | ConditionalBuilderFn<WhereBuilder>, bindings?: Array<string | number>) {
    return this.condition("OR", rule, bindings);
  }
}