import { Pool, PoolClient, QueryResult } from "pg";
import { InsertBuilder } from "./InsertBuilder";
import { SelectBuilder } from "./SelectBuilder";
import { UpdateBuilder } from "./UpdateBuilder";

export type ValueType = string | number | boolean | [string, Array<string | number>];

export type BasicBindingType = string | number | boolean | Array<BasicBindingType>;

export type ExtendedBindingType = BasicBindingType | QueryBuilder;

export interface IManyValueType {
  [column: string]: ValueType;
}

interface IQueryBuilderSQLResult {
  query: string;
  bindings: BasicBindingType[];
}

export class QueryBuilder {
  private bindingSources: ExtendedBindingType[] = [];
  constructor() {
  }
  public addBindingSource(value: ExtendedBindingType) {
    this.bindingSources.push(value);
  }
  public addBindingSources(values: ExtendedBindingType[]) {
    this.bindingSources = this.bindingSources.concat(values);
  }
  public addBindingSourceAt(index: number, value: ExtendedBindingType) {
    this.bindingSources[index] = value;
  }
  public shiftBindingSource(value: ExtendedBindingType) {
    this.bindingSources = [value].concat(this.bindingSources);
  }
  public shiftBindingSources(values: ExtendedBindingType[]) {
    this.bindingSources = values.concat(this.bindingSources);
  }
  public clearBindingSources() {
    this.bindingSources = [];
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
  public getBindings(): BasicBindingType[] {
    let allBindings: BasicBindingType[] = [];
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

export interface IConditionalBuilderConditionType {
  condition: ConditionalBuilder | string;
  gate: "AND" | "OR";
}

export type ConditionalBuilderFn<T> = (builder: T) => void;

export class ConditionalBuilder extends QueryBuilder {
  private conditions: IConditionalBuilderConditionType[] = [];
  private parent: ConditionalBuilder;
  private type: string;

  constructor(parent: ConditionalBuilder = null, type: string) {
    super();

    this.type = type;
    this.parent = parent;
  }
  public condition(gate: "AND" | "OR", rule: string | ConditionalBuilderFn<any>, bindings?: BasicBindingType[]) {
    let condition: ConditionalBuilder | string;
    if (typeof rule === "string") {
      condition = rule;
      this.addBindingSources(bindings);
    } else {
      const builder = new ConditionalBuilder(this, this.type);
      rule(builder);
      condition = builder;

      this.addBindingSource(builder);

      if (bindings) {
        throw new Error("Cannot have both bindings and have provided a builder as a rule");
      }
    }
    this.conditions.push({
      gate,
      condition,
    });
    return this;
  }
  public clear() {
    this.conditions = [];
    this.clearBindingSources();
    return this;
  }
  public compile() {
    if (this.conditions.length === 0) {
      return "";
    }

    let result = "";
    this.conditions.forEach((c, index) => {
      if (index !== 0) {
        result += c.gate + " ";
      }
      if (typeof c.condition === "string") {
        result += c.condition;
      } else {
        result += c.condition.compile();
      }
    })
    if (this.parent) {
      return "(" + result + ")";
    }
    return this.type + " " + result;
  }
}

interface IDatbaseConnectionInfo {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export class DatabaseConnection {
  private pool: Pool;
  private client: PoolClient;
  constructor(info: IDatbaseConnectionInfo, client?: PoolClient, pool?: Pool) {
    this.client = client;
    this.pool = pool ? pool : new Pool({
      ...info,
      max: 5,
      min: 1,
    });
  }
  async query(what: string | QueryBuilder, bindings?: BasicBindingType[]): Promise<QueryResult> {
    const queryValue = typeof what === "string" ? what : what.compile();
    const queryBindings = typeof what === "string" ? bindings : what.getBindings();

    return await (this.pool || this.client).query(queryValue, queryBindings);
  }
  async queryRows(what: string | QueryBuilder, bindings?: BasicBindingType[]): Promise<any[]> {
    return (await this.query(what, bindings)).rows;
  }
  async queryFirst(what: string | QueryBuilder, bindings?: BasicBindingType[]): Promise<any> {
    return (await this.query(what, bindings)).rows[0] || null;
  }
  public getUpdateBuilder() {
    return new UpdateBuilder();
  }
  public getSelectBuilder() {
    return new SelectBuilder();
  }
  public getInsertBuilder() {
    return new InsertBuilder();
  }
  public getPool(): Pool {
    return this.pool;
  }
  public getClient(): PoolClient {
    return this.client;
  }
  public async startTransaction(arg: (transactingClient: DatabaseConnection) => Promise<any>): Promise<any> {
    const client = await this.pool.connect();
    let result = null;

    const transactingClient = new DatabaseConnection(null, client, this.pool);

    try {
      await this.client.query("BEGIN");
      result = await arg(transactingClient);
      client.release();
    } catch (err) {
      await this.client.query("ROLLBACK");
      throw err;
    }

    await this.client.query("COMMIT");

    return result;
  }
}