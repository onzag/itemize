import { ConditionalBuilder, ConditionalBuilderFn, IManyValueType, ValueType } from ".";

export class WhereBuilder extends ConditionalBuilder {
  constructor(parent: WhereBuilder = null) {
    super(parent, "WHERE");
  }
  public andWhereMany(obj: IManyValueType) {
    Object.keys(obj).forEach((col) => {
      this.andWhereColumn(col, obj[col]);
    });
    return this;
  }
  public orWhereMany(obj: IManyValueType) {
    Object.keys(obj).forEach((col) => {
      this.orWhereColumn(col, obj[col]);
    });
    return this;
  }
  public andWhereColumn(column: string, value: ValueType, comparator: string = "=") {
    if (Array.isArray(value)) {
      const rule = JSON.stringify(column) + " " + comparator + " " + value[0];
      return this.condition("AND", rule, value[1]);
    } else {
      if (value === null && comparator === "=") {
        return this.andWhereColumnNull(column);
      } else if (value === null && (comparator === "<>" || comparator === "!=")) {
        return this.andWhereColumnNotNull(column);
      }
      const rule = JSON.stringify(column) + " " + comparator + " ?";
      return this.condition("AND", rule, [value]);
    }
  }
  public orWhereColumn(column: string, value: ValueType, comparator: string = "=") {
    if (Array.isArray(value)) {
      const rule = JSON.stringify(column) + " " + comparator + " " + value[0];
      return this.condition("OR", rule, value[1]);
    } else {
      if (value === null && comparator === "=") {
        return this.orWhereColumnNull(column);
      } else if (value === null && (comparator === "<>" || comparator === "!=")) {
        return this.orWhereColumnNotNull(column);
      }
      const rule = JSON.stringify(column) + " " + comparator + " ?";
      return this.condition("OR", rule, [value]);
    }
  }
  public andWhereColumnNull(column: string) {
    const rule = JSON.stringify(column) + " IS NULL";
    return this.condition("AND", rule);
  }
  public andWhereColumnNotNull(column: string) {
    const rule = JSON.stringify(column) + " IS NOT NULL";
    return this.condition("AND", rule);
  }
  public orWhereColumnNull(column: string) {
    const rule = JSON.stringify(column) + " IS NULL";
    return this.condition("OR", rule);
  }
  public orWhereColumnNotNull(column: string) {
    const rule = JSON.stringify(column) + " IS NOT NULL";
    return this.condition("OR", rule);
  }
  public andWhere(rule: string | ConditionalBuilderFn<WhereBuilder>, bindings?: Array<string | number>) {
    return this.condition("AND", rule, bindings);
  }
  public orWhere(rule: string | ConditionalBuilderFn<WhereBuilder>, bindings?: Array<string | number>) {
    return this.condition("OR", rule, bindings);
  }
}