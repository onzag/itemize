import { RedisClient } from "redis";
import equals from "deep-equal";
import Knex from "knex";
import { CONNECTOR_SQL_COLUMN_FK_NAME } from "../constants";
import { ISQLTableRowValue } from "../base/Root/sql";

const CACHE_EXPIRES_DAYS = 2;

export class Cache {
  private redisClient: RedisClient;
  private knex: Knex;
  constructor(redisClient: RedisClient, knex: Knex) {
    this.redisClient = redisClient;
    this.knex = knex;
  }
  public getCachedValue(qualifiedPathName: string, id: number): Promise<{value: ISQLTableRowValue}> {
    console.log("retrieving", qualifiedPathName, id);
    const qualifiedIdentifier = "QUERY:" + qualifiedPathName + "." + id.toString();
    return new Promise((resolve, reject) => {
      this.redisClient.get(qualifiedIdentifier, (error, value) => {
        console.log("obtained", value);
        if (value === null) {
          resolve(null);
        }
        if (!error) {
          try {
            resolve({
              value: JSON.parse(value),
            });
          } catch {
            resolve(null);
          }
        } else {
          resolve(null);
        }

        this.pokeCache(qualifiedPathName, id);
      });
    });
  }
  public pokeCache(qualifiedPathName: string, id: number) {
    const qualifiedIdentifier = "QUERY:" + qualifiedPathName + "." + id.toString();
    this.redisClient.expire(qualifiedIdentifier, CACHE_EXPIRES_DAYS * 86400);
  }
  public forceCacheInto(qualifiedPathName: string, id: number, value: any) {
    const qualifiedIdentifier = "QUERY:" + qualifiedPathName + "." + id.toString();
    return new Promise((resolve) => {
      this.redisClient.set(qualifiedIdentifier, JSON.stringify(value), (error) => {
        resolve(value);
        if (!error) {
          this.pokeCache(qualifiedPathName, id);
        }
      });
    });
  }
  public async requestCache(
    qualifiedPathName: string,
    moduleTable: string,
    id: number,
    refresh?: boolean,
  ): Promise<ISQLTableRowValue> {
    if (!refresh) {
      const currentValue = await this.getCachedValue(qualifiedPathName, id);
      if (currentValue) {
        return currentValue.value;
      }
    }
    const qualifiedIdentifier = "QUERY:" + qualifiedPathName + "." + id.toString();
    const queryValue =
      await this.knex.first("*").from(moduleTable).where("id", id).join(qualifiedPathName, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
    });
    this.redisClient.set(qualifiedIdentifier, JSON.stringify(queryValue), (error) => {
      if (!error) {
        this.pokeCache(qualifiedPathName, id);
      }
    });
    return queryValue;
  }
}
