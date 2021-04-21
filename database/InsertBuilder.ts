/**
 * Contains the insert query builder that allows to create INSERT queries
 * @module
 */

import { IManyValueType, QueryBuilder } from "./base";
import { ReturningBuilder } from "./ReturningBuilder";
import { SetBuilder } from "./SetBuilder";
import { WhereBuilder } from "./WhereBuilder";

/**
 * the insert query builder that allows to create INSERT queries
 */
export class InsertBuilder extends QueryBuilder {
  /**
   * Represents the expressions that we are trying
   * to insert in order, these are already converted
   * into a string form, for example
   * 
   * "?, ?, ?, NOW()" etc...
   */
  private valuesToInsert: string[] = [];
  /**
   * The signature of what we are trying to add
   * this is the columns list
   * 
   * "id", "version", "name"
   * 
   * as a string itself
   */
  private columnSignature: string = null;

  /**
   * The set builder for an upsert
   */
  private upsertSetBuilder: SetBuilder = null;

  /**
   * The where builder for an upsert
   */
  private upsertWhereBuilder: WhereBuilder = null;

  /**
   * The returning builder to specify the returning condition
   */
  public returningBuilder: ReturningBuilder;

  /**
   * The table name we try to insert at
   */
  private tableName: string;
  /**
   * What to do on conflict
   */
  private doOnConflict: "NOTHING" | "UPDATE";

  /**
   * Builds a new insert query
   */
  constructor() {
    super();

    this.tableName = null;

    this.returningBuilder = new ReturningBuilder();

    this.addBindingSource(this.returningBuilder);
  }

  /**
   * Clears the values to insert and the values alone
   * @returns itself
   */
  public clearValues() {
    this.valuesToInsert = [];
    this.clearBindingSources();

    this.addBindingSource(this.returningBuilder);

    return this;
  }

  /**
   * Clears the values to insert and removes the table name as well
   * this function does not affect the builders
   * @returns itself
   */
  public clear() {
    this.clearValues();
    this.tableName = null;
    return this;
  }

  /**
   * Sets the table you are trying to insert at
   * @param tableName the table name
   * @returns itself
   */
  public table(tableName: string) {
    this.tableName = tableName;
    return this;
  }

  /**
   * Specifies what values to insert
   * @param values the values to insert as an object
   * @returns itself
   */
  public insert(...values: IManyValueType[]) {
    const valuesToAdd: string[] = [];

    // we clear because the returning comes last
    // and adding these values is a nightmare
    this.popBindingSource();

    // now we got to get the signatures of all the columns
    const signatures = values.map((v) => {
      // the keys we sort
      const sortedKeys = Object.keys(v).sort();

      // and now we can add the values based on
      // that sorted keys
      valuesToAdd.push(

        // we map per key in this sorted way
        sortedKeys.map((key) => {
          // get the value
          const value = v[key];
          // and if it's an array this means
          // it's a raw value
          if (Array.isArray(value)) {
            // so these are the bindings
            const bindings = value[1];
            this.addBindingSources(bindings);
            // and then we return the string value
            // we will be using
            return value[0];
          } else {
            // otherwise we add the value as the binding source
            this.addBindingSource(value);
            // and return "?" which is a placeholder
            // for the binding source
            return "?";
          }
        // now we join
        }).join(", ")
      );

      // and now we can return the signature
      return sortedKeys.map((k) => JSON.stringify(k)).join(", ");
    });

    // and readd it then
    this.addBindingSource(this.returningBuilder);

    // we got to check that all the signatures are equal
    signatures.forEach((signature, i) => {
      const nextSignature = signatures[i + 1];
      if (nextSignature && nextSignature !== signature) {
        throw new Error("Shape mismatch between the inserts");
      }
    });

    // we also got to check that the signatures are equal with the column
    // signature that already exists if one had been defined
    if (this.columnSignature && this.columnSignature !== signatures[0]) {
      throw new Error("Shape mismatch between the new inserts and the already defined ones");
    } else {
      // otherwise we updated the signature itself
      this.columnSignature = signatures[0];
    }

    // and now we can set the values to insert
    this.valuesToInsert = this.valuesToInsert.concat(valuesToAdd);
    return this;
  }

  /**
   * sets the on conflict rule for the insert
   * @param doWhat what to do NOTHING or UPDATE
   * @param fn a function to specify the set and where builder that is given on update
   * @returns itself
   */
  public onConflict(doWhat: "NOTHING" | "UPDATE", fn?: (setBuilder: SetBuilder, whereBuilder: WhereBuilder) => void) {
    this.doOnConflict = doWhat;
    
    if (this.upsertWhereBuilder && doWhat === "NOTHING") {
      this.popBindingSource();
    }
    if (this.upsertSetBuilder && doWhat === "NOTHING") {
      this.popBindingSource();
    }
    if (!this.upsertSetBuilder && doWhat === "UPDATE") {
      this.upsertSetBuilder = new SetBuilder();
      this.addBindingSource(this.upsertSetBuilder);
    }
    if (!this.upsertWhereBuilder && doWhat === "UPDATE") {
      this.upsertWhereBuilder = new WhereBuilder();
      this.addBindingSource(this.upsertWhereBuilder);
    }

    if (doWhat === "UPDATE") {
      fn(this.upsertSetBuilder, this.upsertWhereBuilder);
    }
    return this;
  }

  /**
   * Converts this from query to a pseudo SQL query that uses ?
   * @returns a string that represents the compiled result
   */
  public compile() {
    if (!this.tableName || !this.valuesToInsert.length) {
      return "";
    }

    const returningRule = this.returningBuilder.compile();

    return "INSERT INTO " + JSON.stringify(this.tableName) +
      " (" + this.columnSignature + ") VALUES (" +
      this.valuesToInsert.join("), (") + ") " +
      (this.doOnConflict ? "ON CONFLICT DO " + this.doOnConflict : "") +
      (this.upsertSetBuilder ? " " + this.upsertSetBuilder.compile() : "") +
      (this.upsertWhereBuilder ? " " + this.upsertWhereBuilder.compile() : "") +
      (returningRule ? " " + returningRule : "");
  }
}
