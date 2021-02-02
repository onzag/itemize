/**
 * Contains the database connection constructor that is able to run
 * queries against a posgreSQL database either using a raw method
 * or using its many query builders
 * 
 * @packageDocumentation
 */

import { Pool, PoolClient, QueryResult } from "pg";
import { InsertBuilder } from "./InsertBuilder";
import { SelectBuilder } from "./SelectBuilder";
import { UpdateBuilder } from "./UpdateBuilder";

/**
 * Represents a value that can be used to insert or update by, whatever
 * needs to be assigned a value, we support string, number, booleans
 * and raw values represented by an array and its bindings
 */
export type ValueType = string | number | boolean | [string, Array<string | number>];

/**
 * Represents a binding type, that binds to $1, $2, $3 etc... in the query itself
 * supports string, number, boolean or an array of those
 */
export type BasicBindingType = string | number | boolean | Array<BasicBindingType>;

/**
 * An extended way to represent bindings as a tree, represents the basic bindings
 * plus the query builder itself that can act as a compounded binding element
 * [binding, binding, binding, [binding, binding, binding]...]
 */
export type ExtendedBindingType = BasicBindingType | QueryBuilder;

/**
 * Represents a way to specify many values to many columns or elements
 */
export interface IManyValueType {
  [column: string]: ValueType;
}

/**
 * Reprsents the result of a compiled query builder
 */
interface IQueryBuilderSQLResult {
  /**
   * The resulting query that was compiled
   */
  query: string;
  /**
   * The bindings that will be used in its basic flattened form
   */
  bindings: BasicBindingType[];
}

/**
 * Reprents the basic query builder to build a bit of a query
 * or the entire query itself and this class is supposed to
 * be extended by other builders
 */
export class QueryBuilder {
  /**
   * These are all the bindings that are used by the query builder
   * in order
   */
  private bindingSources: ExtendedBindingType[] = [];

  /**
   * Constructs a new query
   */
  constructor() {
  }

  /**
   * Adds a binding source to the binding source list in order
   * @param value the binding source to add
   */
  public addBindingSource(value: ExtendedBindingType) {
    this.bindingSources.push(value);
  }

  /**
   * Adds many binding sources to the bindings sources list
   * @param values the binding sources to add
   */
  public addBindingSources(values: ExtendedBindingType[]) {
    this.bindingSources = this.bindingSources.concat(values);
  }

  /**
   * Adds a binding source at the start of the bindings source
   * list
   * @param value the binding source to add
   */
  public shiftBindingSource(value: ExtendedBindingType) {
    this.bindingSources = [value].concat(this.bindingSources);
  }

  /**
   * Adds many binding sources at the start of the bindings source
   * list
   * @param values the binding sources to add
   */
  public shiftBindingSources(values: ExtendedBindingType[]) {
    this.bindingSources = values.concat(this.bindingSources);
  }

  /**
   * Removes all binding sources
   */
  public clearBindingSources() {
    this.bindingSources = [];
  }

  /**
   * Removes the last added biding source and returns it
   */
  public popBindingSource() {
    return this.bindingSources.pop();
  }

  /**
   * Returns the result of the compilation of the query
   * this function needs to be overriden
   * @override
   */
  public compile() {
    return "";
  }

  /**
   * Returns the SQL result for usage in the query builder
   * @returns a sql builder result with the bindings and the query itself
   */
  public toSQL(): IQueryBuilderSQLResult {
    // we compile the string result
    const stringResult = this.compile();
    // now split for the binding holes
    const bindingHoles = stringResult.split("?");
    // get the bindings for this same query
    const bindings = this.getBindings();
    // and calculate the total holes
    const totalHoles = bindingHoles.length - 1;

    // if the holes and the bindings don't match then
    if (totalHoles !== bindings.length) {
      throw new Error("SQL query " + JSON.stringify(stringResult) + " did not provide all the bindings: " + bindings.length)
    }

    // now we can join the results with the given
    // valid pgsql id
    let joinedResult = "";
    // for that we loop in the splitted holes
    bindingHoles.forEach((r, index) => {
      if (index !== 0) {
        // and add this inbetween $1, $2, $1000 etc...
        joinedResult += "$" + index;
      }
      joinedResult += r;
    });

    // and now we can return the query
    return {
      query: joinedResult,
      bindings,
    };
  }

  /**
   * Provides the bindings for the query in order that
   * should match the compilation
   * @returns a list of basic bindings
   */
  public getBindings(): BasicBindingType[] {
    // we build a new list
    let allBindings: BasicBindingType[] = [];

    // now we loop over our binding sources
    this.bindingSources.forEach((bs) => {
      // if it is for some reason undefined
      if (typeof bs === "undefined") {
        // it's an invalid binding, null is valid binding
        return;
      }

      // so if the binding is a query builder
      if (bs instanceof QueryBuilder) {
        // we extract the bindings from that query and concat it
        allBindings = allBindings.concat(bs.getBindings())
      } else {
        // otherwise we just push the binding itself
        allBindings.push(bs);
      }
    });

    // and return it
    return allBindings;
  }
}

/**
 * Represents a conditional builder condition
 */
export interface IConditionalBuilderConditionType {
  /**
   * The condition itself can be a subcondition
   * or an expression itself
   */
  condition: ConditionalBuilder | string;
  /**
   * The gate that is going to use
   */
  gate: "AND" | "OR";
}

/**
 * The conditional builder function that is used to build
 * conditions that are nested
 */
export type ConditionalBuilderFn<T> = (builder: T) => void;

/**
 * The conditional builder class is based on the query builder
 * and its an utility to create conditional based queries like the
 * where query, joins queries, etc... whatever is using boolean
 * conditions
 */
export class ConditionalBuilder extends QueryBuilder {
  /**
   * This is the list of conditions, it represents either a expression
   * or a subcondition with a gate included, and or or
   */
  private conditions: IConditionalBuilderConditionType[] = [];
  /**
   * The parent of the condition, they might compile different
   * since these conditions nest
   */
  private parent: ConditionalBuilder;
  /**
   * The type of the condition, WHERE, ON, etc... whatever
   * you fancy
   */
  public type: string;

  /**
   * Build a new conditional builder
   * @param parent the parent of it
   * @param type the type, WHERE, ON, etc... it will be used
   */
  constructor(parent: ConditionalBuilder = null, type: string) {
    super();

    this.type = type;
    this.parent = parent;
  }

  /**
   * It should provide a new conditional builder that should
   * be a child of this
   * @override
   * @returns a new builder for itself to make a child of
   */
  public subcondition() {
    // basically when overriding you should do this
    // same thing but with your own class
    return new ConditionalBuilder(this, this.type);
  }

  /**
   * Makes a new condition based on an expression or a subrule function
   * @param gate the gate to use
   * @param rule either the expression itself or a subcondition
   * @param bindings the bindings for the expression, will not be used if using a subcondition
   * @returns itself
   */
  public condition(gate: "AND" | "OR", rule: string | ConditionalBuilderFn<any>, bindings?: BasicBindingType[]) {
    // first we build the condition that we are going to use
    let condition: ConditionalBuilder | string;
    // if the rule is a string, as in an expression
    if (typeof rule === "string") {
      // it's simple, we just add it
      condition = rule;
      this.addBindingSources(bindings);
    } else {
      // otherwise we make a new builder itself
      const builder = this.subcondition();
      // now we call the rule with that builder
      rule(builder);
      // and that's our condition
      condition = builder;

      // add the binding source
      this.addBindingSource(builder);

      // and we reject the bindings
      if (bindings) {
        throw new Error("Cannot have both bindings and have provided a builder as a rule");
      }
    }
    // now we can push the condition
    this.conditions.push({
      gate,
      condition,
    });

    // return this
    return this;
  }

  /**
   * Clears the conditional builder
   * @returns itself
   */
  public clear() {
    this.conditions = [];
    this.clearBindingSources();
    return this;
  }

  /**
   * Compiles the condition
   * @returns a string that represents the condition
   */
  public compile() {
    // no conditions, nothing to compile
    if (this.conditions.length === 0) {
      return "";
    }

    // now we can start building the compilation
    let result = "";
    this.conditions.forEach((c, index) => {
      // the first gate is never added that's simply not possible
      if (index !== 0) {
        result += " " + c.gate + " ";
      }

      // a expression just gets added
      if (typeof c.condition === "string") {
        result += c.condition;
      } else {
        // otherwise compile
        result += c.condition.compile();
      }
    });

    // if we have a parent, we will
    // make it into pharentesis
    if (this.parent) {
      return "(" + result + ")";
    }

    // otherwise we can add the type as well
    return this.type + " " + result;
  }
}

/**
 * This is what the database expects to be used as connection
 * for a single node in an extended instance 
 */
export interface IDatbaseConnectionInfo {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

/**
 * The database connection class that creates
 * a database conection and executes queries it is designed
 * to exist as a single instance and execute transactions
 */
export class DatabaseConnection {
  /**
   * This is the pg pool
   */
  private pool: Pool;
  /**
   * A client that is taken from the pool, normally
   * this will be undefined unless specified in the constructor
   * for child connections used for transactions
   */
  private client: PoolClient;

  /**
   * Constructs a new database connection
   * @param info the connection information
   * @param client for child database connections used in transactions the client that is in use
   * @param pool for child database connections used in transactions the pool that generated this from
   */
  constructor(info: IDatbaseConnectionInfo, client?: PoolClient, pool?: Pool) {
    // the client is set based on the argument
    this.client = client;
    // and the pool is either the one specified or a new pool
    this.pool = pool ? pool : new Pool({
      ...info,
      max: 5,
      min: 1,
    });
  }

  /**
   * Performs a query against the database and returns a query result
   * @param what what to execute, either a raw string or a query from a builder
   * @param bindings the bindings to use, you should not specify them when using a builder
   * as initial argument as they will not be used
   * @returns a promise of a query result
   */
  async query(what: string | QueryBuilder, bindings?: BasicBindingType[]): Promise<QueryResult> {
    const queryValue = typeof what === "string" ? what : what.compile();
    const queryBindings = typeof what === "string" ? bindings : what.getBindings();

    // we execute either from the client first or the pool later 
    return await (this.client || this.pool).query(queryValue, queryBindings);
  }

  /**
   * Performs a query against the database and returns only the rows
   * @param what what to execute, either a raw string or a query from a builder
   * @param bindings the bindings to use, you should not specify them when using a builder
   * as initial argument as they will not be used
   * @returns a promise of a list of rows
   */
  async queryRows(what: string | QueryBuilder, bindings?: BasicBindingType[]): Promise<any[]> {
    return (await this.query(what, bindings)).rows;
  }

  /**
   * Performs a query against the database and returns only the first row
   * @param what what to execute, either a raw string or a query from a builder
   * @param bindings the bindings to use, you should not specify them when using a builder
   * as initial argument as they will not be used
   * @returns a promise of a single row
   */
  async queryFirst(what: string | QueryBuilder, bindings?: BasicBindingType[]): Promise<any> {
    return (await this.query(what, bindings)).rows[0] || null;
  }

  /**
   * Provides a single update builder
   * @returns a new update builder
   */
  public getUpdateBuilder() {
    return new UpdateBuilder();
  }

  /**
   * Provides a single select builder
   * @returns a new select builder
   */
  public getSelectBuilder() {
    return new SelectBuilder();
  }

  /**
   * Provides a single insert builder
   * @returns a new insert builder
   */
  public getInsertBuilder() {
    return new InsertBuilder();
  }

  /**
   * Provides the current active pg pool
   * @returns the pool
   */
  public getPool(): Pool {
    return this.pool;
  }

  /**
   * Provides the current active pg client, only really existant on transactions
   * @returns the client
   */
  public getClient(): PoolClient {
    return this.client;
  }

  /**
   * Starts a transaction, while handling rollbacks and everything
   * @param arg a function that returns anything and handles the transacting client
   * @returns whatever you returned in your arg function
   */
  public async startTransaction(arg: (transactingClient: DatabaseConnection) => Promise<any>): Promise<any> {
    // first we fetch a client
    const client = await this.pool.connect();
    let result = null;

    // now we build a treansacting client as a new database connection
    const transactingClient = new DatabaseConnection(null, client, this.pool);

    // now we can try this
    try {
      // let's begin the transaction
      await this.client.query("BEGIN");
      // now we can call the transacting client in the function and get the result
      result = await arg(transactingClient);
      // then release such client
      client.release();
    } catch (err) {
      // any fail and we rollback
      await this.client.query("ROLLBACK");
      throw err;
    }

    // now we can commit
    await this.client.query("COMMIT");

    // and return the result we had given in the start
    return result;
  }
}
