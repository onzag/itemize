import { RedisClient } from "redis";
import Knex from "knex";
import { CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME } from "../constants";
import { ISQLTableRowValue } from "../base/Root/sql";
import { IGQLSearchResult } from "../gql-querier";

const CACHE_EXPIRES_DAYS = 2;

export class Cache {
  private redisClient: RedisClient;
  private knex: Knex;
  constructor(redisClient: RedisClient, knex: Knex) {
    this.redisClient = redisClient;
    this.knex = knex;
  }
  public getIdefCachedValue(
    idefQueryIdentifier: string,
  ): Promise<{value: ISQLTableRowValue}> {
    return new Promise((resolve, reject) => {
      this.redisClient.get(idefQueryIdentifier, (error, value) => {
        if (value === null) {
          resolve(null);
        }
        if (!error) {
          try {
            resolve({
              value: JSON.parse(value),
            });
            this.pokeCache(idefQueryIdentifier);
          } catch {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  }
  public pokeCache(keyIdentifier: string) {
    this.redisClient.expire(keyIdentifier, CACHE_EXPIRES_DAYS * 86400);
  }
  public forceCacheInto(idefTable: string, id: number, version: string, value: any) {
    const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + JSON.stringify(version);
    return new Promise((resolve) => {
      this.redisClient.set(idefQueryIdentifier, JSON.stringify(value), (error) => {
        resolve(value);
        if (!error) {
          this.pokeCache(idefQueryIdentifier);
        }
      });
    });
  }
  public async requestCache(
    idefTable: string,
    moduleTable: string,
    id: number,
    version: string,
    refresh?: boolean,
  ): Promise<ISQLTableRowValue> {
    console.log("requested", idefTable, moduleTable, id);
    const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString() + "." + JSON.stringify(version);
    if (!refresh) {
      const currentValue = await this.getIdefCachedValue(idefQueryIdentifier);
      if (currentValue) {
        return currentValue.value;
      }
    }
    const queryValue =
      await this.knex.first("*").from(moduleTable)
        .where("id", id).andWhere("version", version).join(idefTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_ID_FK_NAME, "=", "id");
      clause.on(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME, "=", "version");
    });
    this.redisClient.set(idefQueryIdentifier, JSON.stringify(queryValue), (error) => {
      if (!error) {
        this.pokeCache(idefQueryIdentifier);
      }
    });
    return queryValue;
  }
  public checkCache(keyIdentifier: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.redisClient.exists(keyIdentifier, (error, reply: number) => {
        if (error) {
          resolve(false);
        } else {
          resolve(reply === 1);
        }
      });
    });
  }
  public async requestListCache(
    moduleTable: string,
    ids: IGQLSearchResult[],
  ): Promise<ISQLTableRowValue[]> {
    const resultValues = await Promise.all(ids.map((idContainer) => {
      return this.requestCache(idContainer.type, moduleTable, idContainer.id, idContainer.version);
    }));
    return resultValues;
  }
}
