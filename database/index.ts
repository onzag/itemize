/**
 * Contains the database connection constructor that is able to run
 * queries against a posgreSQL database either using a raw method
 * or using its many query builders
 * 
 * @module
 */

import { Pool, PoolClient, QueryResult } from "pg";
import { AlterTableBuilder } from "./AlterTableBuilder";
import type { QueryBuilder, BasicBindingType } from "./base";
import { CreateTableBuilder } from "./CreateTableBuilder";
import { InsertBuilder } from "./InsertBuilder";
import { SelectBuilder } from "./SelectBuilder";
import { UpdateBuilder } from "./UpdateBuilder";

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
   * Suppresses console logging
   */
  private suppressLogs: boolean;

  /**
   * Forces the logging even if env is not development
   */
  private forceLogs: boolean;

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
   * Suppresses console logging
   */
  public suppressLogging() {
    this.suppressLogs = true;
  }

  /**
   * Forces console logging even if env is not
   * development
   */
  public forceLogging() {
    this.forceLogs = true;
  }

  /**
   * Performs a query against the database and returns a query result
   * @param what what to execute, either a raw string or a query from a builder
   * @param bindings the bindings to use, you should not specify them when using a builder
   * as initial argument as they will not be used
   * @returns a promise of a query result
   */
  async query(what: string | QueryBuilder, bindings?: BasicBindingType[], useHoles?: boolean): Promise<QueryResult> {
    let queryValue = typeof what === "string" ? what : what.compile();
    const queryBindings = (typeof what === "string" ? bindings : what.getBindings()) || [];
    let optimizedBindings: BasicBindingType[];

    if (typeof what !== "string" || useHoles) {
      const splittedValue = queryValue.split("?");

      optimizedBindings = [];
      const optimizedBindingsIndexes: number[] = [];

      queryBindings.forEach((b) => {
        const optimizedBindingsIndex = b === null ? -1 : optimizedBindings.indexOf(b);
        if (optimizedBindingsIndex === -1) {
          optimizedBindings.push(b);
          optimizedBindingsIndexes.push(optimizedBindings.length - 1);
        } else {
          optimizedBindingsIndexes.push(optimizedBindingsIndex);
        }
      });
  
      let holes: number = 0;
      queryValue = "";
      splittedValue.forEach((v, index) => {
        if (index !== 0) {
          const optimizedIndexOfBinding = optimizedBindingsIndexes[index - 1] + 1;
          queryValue += "$" + optimizedIndexOfBinding;
          holes++;
        }
        queryValue += v;
      });

      if (holes !== queryBindings.length) {
        if ((process.env.NODE_ENV === "development" || this.forceLogs) && !this.suppressLogs) {
          console.log(
            {
              sql: queryValue,
              bindings: queryBindings,
              optimizedBindings,
            }
          );
        }
        throw new Error("Found " + holes + " holes, but provided " + queryBindings.length + " values");
      }
    }

    if ((process.env.NODE_ENV === "development" || this.forceLogs) && !this.suppressLogs) {
      console.log(
        {
          sql: queryValue,
          bindings: queryBindings,
          optimizedBindings,
        }
      );
    }

    // we execute either from the client first or the pool later 
    const response = await (this.client || this.pool).query(queryValue, optimizedBindings || queryBindings);

    if ((process.env.NODE_ENV === "development" || this.forceLogs) && !this.suppressLogs) {
      console.log(
        {
          commandExecuted: response.command,
          returnedRowCount: response.rowCount,
        }
      );
    }

    return response;
  }

  /**
   * Performs a query against the database and returns only the rows
   * @param what what to execute, either a raw string or a query from a builder
   * @param bindings the bindings to use, you should not specify them when using a builder
   * as initial argument as they will not be used
   * @returns a promise of a list of rows
   */
  async queryRows(what: string | QueryBuilder, bindings?: BasicBindingType[], useHoles?: boolean): Promise<any[]> {
    return (await this.query(what, bindings, useHoles)).rows;
  }

  /**
   * Performs a query against the database and returns only the first row
   * @param what what to execute, either a raw string or a query from a builder
   * @param bindings the bindings to use, you should not specify them when using a builder
   * as initial argument as they will not be used
   * @returns a promise of a single row
   */
  async queryFirst(what: string | QueryBuilder, bindings?: BasicBindingType[], useHoles?: boolean): Promise<any> {
    return (await this.query(what, bindings, useHoles)).rows[0] || null;
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
   * Provides a single create table builder
   * @returns a new create table builder
   */
  public getCreateTableBuilder() {
    return new CreateTableBuilder();
  }

  /**
   * Provides a single alter table builder
   * @returns a new alter table builder
   */
  public getAlterTableBuilder() {
    return new AlterTableBuilder();
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
    if (this.suppressLogs) {
      transactingClient.suppressLogging();
    }
    if (this.forceLogs) {
      transactingClient.forceLogging();
    }

    // now we can try this
    try {
      // let's begin the transaction
      await client.query("BEGIN");
      // now we can call the transacting client in the function and get the result
      result = await arg(transactingClient);
    } catch (err) {
      // any fail and we rollback
      await client.query("ROLLBACK");
      // then release such client
      client.release();
      throw err;
    }

    // now we can commit
    await client.query("COMMIT");

    // then release such client
    client.release();

    // and return the result we had given in the start
    return result;
  }
}
