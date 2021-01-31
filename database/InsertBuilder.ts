import { QueryBuilder } from ".";
import { ReturningBuilder } from "./ReturningBuilder";

export interface IValueToInsert {
  [columnName: string]: number | string | [string, Array<string | number>];
}

export class InsertBuilder extends QueryBuilder {
  private valuesToInsert: string[] = [];
  private columnSignature: string = null;

  public returningBuilder: ReturningBuilder;

  private tableName: string;
  private doOnConflict: "NOTHING" | "UPDATE";

  constructor() {
    super();

    this.tableName = null;

    this.returningBuilder = new ReturningBuilder();

    this.addBindingSource(this.returningBuilder);
  }
  public table(tableName: string) {
    this.tableName = tableName;
    return this;
  }
  public insert(...values: IValueToInsert[]) {
    const valuesToAdd: string[] = [];

    const signatures = values.map((v) => {
      const sortedKeys = Object.keys(v).sort();

      valuesToAdd.push(
        sortedKeys.map((key) => {
          const value = v[key];
          if (Array.isArray(value)) {
            const bindings = value[1];
            this.addBindingSources(bindings);
            return value[0];
          } else {
            this.addBindingSource(value);
            return "?";
          }
        }).join(", ")
      );

      return sortedKeys.map((k) => JSON.stringify(k)).join(", ");
    });

    signatures.forEach((signature, i) => {
      const nextSignature = signatures[i + 1];
      if (nextSignature && nextSignature !== signature) {
        throw new Error("Shape mismatch between the inserts");
      }
    });

    if (this.columnSignature && this.columnSignature !== signatures[0]) {
      throw new Error("Shape mismatch between the new inserts and the already defined ones");
    } else {
      this.columnSignature = signatures[0];
    }

    this.valuesToInsert = this.valuesToInsert.concat(valuesToAdd);
    return this;
  }
  public onConflict(doWhat: "NOTHING" | "UPDATE") {
    this.doOnConflict = doWhat;
  }
  public compile() {
    if (!this.tableName || !this.valuesToInsert.length) {
      return "";
    }

    return "INSERT INTO " + JSON.stringify(this.tableName) +
      " (" + this.columnSignature + ") VALUES (" +
      this.valuesToInsert.join("), (") + ") " +
      (this.doOnConflict ? "ON CONFLICT DO " + this.doOnConflict : "") +
      this.returningBuilder.compile();
  }
}