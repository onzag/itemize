import { RedisClient } from "redis";
import equals from "deep-equal";
import Knex from "knex";
import { CONNECTOR_SQL_COLUMN_FK_NAME } from "../constants";
import { ISQLTableRowValue } from "../base/Root/sql";
import { ISearchResultIdentifierType } from "./resolvers/actions/search";

const CACHE_EXPIRES_DAYS = 2;

export class Cache {
  private redisClient: RedisClient;
  private knex: Knex;
  constructor(redisClient: RedisClient, knex: Knex) {
    this.redisClient = redisClient;
    this.knex = knex;
  }
  public getModuleCachedValue(
    moduleQueryIdentifier: string,
  ): Promise<{value: ISQLTableRowValue}> {
    return new Promise((resolve, reject) => {
      this.redisClient.get(moduleQueryIdentifier, (error, value) => {
        if (value === null) {
          resolve(null);
        }
        if (!error && value) {
          this.getIdefCachedValue(value).then(resolve).catch(() => {
            resolve(null);
          });
          this.pokeCache(moduleQueryIdentifier);
        } else {
          resolve(null);
        }
      });
    });
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
  public forceCacheInto(idefTable: string, id: number, value: any) {
    const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString();
    return new Promise((resolve) => {
      this.redisClient.set(idefQueryIdentifier, JSON.stringify(value), (error) => {
        resolve(value);
        if (!error) {
          this.pokeCache(idefQueryIdentifier);
        }
      });
    });
  }
  public async requestModuleCache(
    moduleTable: string,
    id: number,
    refresh?: boolean,
  ): Promise<ISQLTableRowValue> {
    const moduleQueryIdentifier = "MODQUERY:" + moduleTable + "." + id.toString();
    if (!refresh) {
      const currentValue = await this.getModuleCachedValue(moduleQueryIdentifier);
      if (currentValue) {
        return currentValue.value;
      }
    }
    const modQueryValue = await this.knex.first("*").from(moduleTable).where("id", id);
    let mergedValue: ISQLTableRowValue = null;
    let idefQueryIdentifier: string;
    if (modQueryValue) {
      idefQueryIdentifier = "IDEFQUERY:" + modQueryValue.type + "." + id.toString();
      const idefQueryValue =
        await this.knex.first("*").from(modQueryValue.type).where(CONNECTOR_SQL_COLUMN_FK_NAME, id);
      mergedValue = {
        ...modQueryValue,
        ...idefQueryValue,
      };
    }

    if (mergedValue) {
      this.redisClient.set(idefQueryIdentifier, JSON.stringify(mergedValue), (error) => {
        if (!error) {
          this.pokeCache(idefQueryIdentifier);
        }
      });

      this.redisClient.set(moduleQueryIdentifier, idefQueryIdentifier, (error) => {
        if (!error) {
          this.pokeCache(moduleQueryIdentifier);
        }
      });
    }

    return mergedValue;
  }
  public async requestCache(
    idefTable: string,
    moduleTable: string,
    id: number,
    refresh?: boolean,
  ): Promise<ISQLTableRowValue> {
    console.log("requested", idefTable, moduleTable, id);
    const idefQueryIdentifier = "IDEFQUERY:" + idefTable + "." + id.toString();
    if (!refresh) {
      const currentValue = await this.getIdefCachedValue(idefQueryIdentifier);
      if (currentValue) {
        return currentValue.value;
      }
    }
    const queryValue =
      await this.knex.first("*").from(moduleTable).where("id", id).join(idefTable, (clause) => {
      clause.on(CONNECTOR_SQL_COLUMN_FK_NAME, "=", "id");
    });
    this.redisClient.set(idefQueryIdentifier, JSON.stringify(queryValue), (error) => {
      if (!error) {
        this.pokeCache(idefQueryIdentifier);
      }
    });

    const moduleQueryIdentifier = "MODQUERY:" + moduleTable + "." + id.toString();
    this.redisClient.set(moduleQueryIdentifier, idefQueryIdentifier, (error) => {
      if (!error) {
        this.pokeCache(moduleQueryIdentifier);
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
    ids: ISearchResultIdentifierType[],
  ): Promise<ISQLTableRowValue[]> {
    const resultValues = await Promise.all(ids.map((idContainer) => {
      return this.requestCache(idContainer.type, moduleTable, idContainer.id);
    }));
    return resultValues;
  }
}
