/**
 * This file contains the registry service
 * a special service file that is used within
 * other services for storing critical information
 * @module
 */

import { DatabaseConnection } from "../../database";
import { ServiceProvider, ServiceProviderType } from ".";
import crypto from "crypto";

interface IRegistryConfig {
  databaseConnection: DatabaseConnection;
  registryTable: string;
};

interface IAllKeyResult<T = any> { [skey: string]: T };

/**
 * The registry service allows services to store critical information
 * in a key value fashion, it's a rather simple service on its own
 * and it's special and not treated like other services, it even
 * runs on the load-dump and dump mechanisms
 */
export class RegistryService extends ServiceProvider<IRegistryConfig> {
  private memoryCache: { [key: string]: any } = {};
  public static getType() {
    return ServiceProviderType.NONE;
  }

  /**
   * Given a registry array, push the value provided into the registry
   * 
   * @param pkey 
   * @param value
   * @returns an object with the skeys of a deleted objects to apply to max size and the inserted skey id
   */
  public async pushInArrayKey(pkey: string, value: any, options: { maxSize?: number, failIfDeleteFails?: boolean } = {}): Promise<{ deleted: string[]; inserted: string }> {
    const created = await this.setKey(pkey, value, null, {
      noMemoryCache: true,
      createSkey: true,
    });

    const inserted = created.skey;

    if (options?.maxSize) {
      try {
        const deleteOlds = await this.config.databaseConnection.query(`WITH "rows_to_keep" AS (SELECT id FROM ${JSON.stringify(this.config.registryTable)} WHERE "pkey" = $1 ORDER BY last_modified DESC LIMIT 50)` +
          ` DELETE FROM ${JSON.stringify(this.config.registryTable)} WHERE "id" NOT IN (SELECT "id" FROM "rows_to_keep") RETURNING skey`,
        [
          pkey,
        ]);

        const deleted = deleteOlds.rows.map((d) => d.skey);

        return { deleted, inserted };
      } catch (err) {
        this.logError({
          message: "Failed to resize an array with a max size of " + options.maxSize + " at " + pkey,
          data: {
            pkey,
            value,
            options,
          }
        });
        if (options.failIfDeleteFails) {
          throw err;
        } else {
          return { deleted: [], inserted };
        }
      }
    }

    return { deleted: [], inserted };
  }

  /**
   * Sets a key in the given registry
   * @param pkey the primary key name
   * @param value any JSON serializable value
   * @param skey an optional subkey value
   * @returns the skey
   */
  public async setKey(pkey: string, value: any, skey?: string, options?: { noMemoryCache?: boolean, createSkey?: boolean }) {
    // first we stringify this
    const valueStringified = JSON.stringify(value);
    const actualSkey = skey || "";

    // and then do an upsert
    const row = await this.config.databaseConnection.queryFirst(
      `INSERT INTO ${JSON.stringify(this.config.registryTable)} ("pkey", "skey", "value", "created_at", "last_modified") VALUES ($1, ` +
      `${options?.createSkey ? "uuid_generate_v1()::TEXT" : "$3"}, $2, NOW(), NOW()) ` +
      `ON CONFLICT ("pkey", "skey") DO UPDATE SET "last_modified" = NOW(), "value" = $2 RETURNING "skey"`,
      options?.createSkey ? [
        pkey,
        valueStringified,
      ] : [
        pkey,
        valueStringified,
        actualSkey,
      ]
    );

    const realSkey = row.skey as string;

    if (options && options.noMemoryCache) {
      return { skey: realSkey };
    }

    const mergedId = pkey + "." + (realSkey || "");
    this.memoryCache[mergedId] = value;

    if (realSkey && this.memoryCache[pkey]) {
      this.memoryCache[pkey][realSkey] = value;
    }

    return { skey: realSkey };
  }

  public async setKeyDontUpdate(pkey: string, value: any, skey?: string, options?: { noMemoryCache?: boolean }): Promise<{ value: any, skey: string }> {
    // first we stringify this
    const valueStringified = JSON.stringify(value);
    const actualSkey = skey || "";

    // and then do an upsert
    const result = await this.config.databaseConnection.queryFirst(
      `INSERT INTO ${JSON.stringify(this.config.registryTable)} ("pkey", "skey", "value", "created_at", "last_modified") VALUES ($1, $2, $3, NOW(), NOW()) ` +
      `ON CONFLICT ("pkey", "skey") DO UPDATE SET "last_modified" = NOW() RETURNING "value"`,
      [
        pkey,
        actualSkey,
        valueStringified,
      ]
    );

    if (result && result.value) {
      try {
        const value = JSON.stringify(result.value);
        if (options && options.noMemoryCache) {
          return { value, skey };
        }

        const mergedId = pkey + "." + (skey || "");
        this.memoryCache[mergedId] = value;
        if (skey && this.memoryCache[pkey]) {
          this.memoryCache[pkey][skey] = value;
        }
        return { value, skey };
      } catch {
        this.logError(
          {
            className: "RegistryService",
            methodName: "setKeyDontUpdate",
            message: "Received invalid json for a key",
            serious: true,
            data: {
              pkey,
              skey: skey,
            },
          }
        );
      }
    }

    return { value, skey };
  }

  /**
   * Provides all the subkeys including the empty default subkey
   * for the given registry key name
   * @param pkey the primary key name
   */
  public async getAllInPkey<T>(pkey: string, options: {asArray?: boolean, limit?: number, noStoreInMemoryCache?: boolean} = {}): Promise<IAllKeyResult<T> | T[]> {
    // so we selent all rows for the given pkey and select all skey and value
    const rows = await this.config.databaseConnection.queryRows(
      `SELECT * FROM ${JSON.stringify(this.config.registryTable)} WHERE "pkey" = $1` + (
        options.asArray ? " ORDER BY \"last_modified\" DESC" : ""
      ) + (
        options.limit ? " LIMIT " + options.limit : ""
      ),
      [
        pkey,
      ],
    );

    // now we need to build the result
    const result: IAllKeyResult<T> = {};
    let resultValuesSorted: T[] = options.asArray ? [] : null;

    // per each row
    rows.forEach((r) => {
      try {
        const parsed = JSON.parse(r.value);
        if (resultValuesSorted) {
          resultValuesSorted.push(parsed)
        }
        result[r.skey] = parsed;
        const mergedId = pkey + "." + (r.skey || "");
        if (options.noStoreInMemoryCache) {
          this.memoryCache[mergedId] = parsed;
        }
      } catch {
        this.logError(
          {
            className: "RegistryService",
            methodName: "getAllInPkey",
            message: "Received invalid json for a key",
            serious: true,
            data: {
              pkey,
              skey: r.skey,
              value: r.value,
            },
          }
        );
      }
    });

    if (!options.noStoreInMemoryCache) {
      this.memoryCache[pkey] = result;
    }

    // return the result
    return options.asArray ? resultValuesSorted : result;
  }

  /**
   * Provides a single key value
   * if not found provides null
   * @param pkey the primary key name
   * @param skey an optional secondary key name
   */
  public async getKey(pkey: string, skey?: string) {
    // so we select based on that
    const row = await this.config.databaseConnection.queryFirst(
      `SELECT "value" FROM ${JSON.stringify(this.config.registryTable)} WHERE "pkey" = $1 AND "skey" = $2`,
      [
        pkey,
        skey ? skey : "",
      ]
    );

    // if we have a value
    let value: any = null;
    if (row && row.value) {
      // we give it by parsing
      try {
        value = JSON.parse(row.value);
      } catch {
        this.logError(
          {
            className: "RegistryService",
            methodName: "getKey",
            message: "Received invalid json for a key",
            serious: true,
            data: {
              pkey,
              skey,
              value: row.value,
            },
          }
        );
      }
    }

    const mergedId = pkey + "." + (skey || "");
    this.memoryCache[mergedId] = value;

    // otherwise return null by default
    return value;
  }

  public async getAllInPkeyWithMemoryCache<T>(pkey: string): Promise<IAllKeyResult<T>> {
    if (typeof this.memoryCache[pkey] !== "undefined") {
      return this.memoryCache[pkey];
    }

    return await this.getAllInPkey<T>(pkey) as IAllKeyResult<T>;
  }

  public async getKeyWithMemoryCache(pkey: string, skey?: string) {
    const mergedId = pkey + "." + (skey || "");
    if (typeof this.memoryCache[mergedId] !== "undefined") {
      return this.memoryCache[mergedId];
    }

    return await this.getKey(pkey, skey);
  }

  public async invalidateMemoryCache(pkey: string, skey?: string) {
    const mergedId = pkey + "." + (skey || "");
    delete this.memoryCache[mergedId];
  }

  public async invalidateAllInPkeyMemoryCache(pkey: string) {
    delete this.memoryCache[pkey];
  }

  public async createJWTSecretFor(pkey: string, skey?: string) {
    this.logInfo(
      {
        className: "RegistryService",
        methodName: "createJWTSecretFor",
        message: "Generating new JWT secret, this method ensures concurrency if two extended instances tried it at once",
        data: {
          pkey,
          skey: skey,
        },
      }
    );

    const secret = crypto.randomBytes(64).toString("hex")

    // will return the same secret if race conditions apply from other instances
    // as postgresql will take the first
    const newValue = await this.setKeyDontUpdate(pkey, secret, skey);
    return newValue.value;
  }

  public async getJWTSecretFor(pkey: string, skey?: string) {
    const value = await this.getKeyWithMemoryCache(pkey, skey);
    if (value && typeof value === "string") {
      return value;
    }

    return this.createJWTSecretFor(pkey, skey);
  }

  // Cycling JWT keys is going to work the following
  // users will be informed that the current jwt secret has been changed
  // whenever they identify by the token in the wesocket or if they
  // are already identified, that will cause a dangling logout
  // if they already have a dangling logout, once their session is over
  // and they close all connections they will be logged out
  // forced to login again, do we need this?...
  // public async getCycledJWTSecretsFor(pkey: string) {
  //   const value = await this.getKeyWithMemoryCache(pkey, "value");
  //   if (value && typeof value === "string") {
  //     const expiration = await this.getKeyWithMemoryCache(pkey, "expiration");
  //   }
  // }

  /**
   * deletes a key value
   * @param pkey the primary key name
   * @param skey an optional secondary key name
   */
  public async delKey(pkey: string, skey?: string) {
    const mergedId = pkey + "." + (skey || "");
    delete this.memoryCache[mergedId];

    if (skey) {
      await this.config.databaseConnection.queryFirst(
        `DELETE FROM ${JSON.stringify(this.config.registryTable)} WHERE "pkey" = $1 AND "skey" = $2`,
        [
          pkey,
          skey ? skey : "",
        ]
      );
    } else {
      await this.config.databaseConnection.queryFirst(
        `DELETE FROM ${JSON.stringify(this.config.registryTable)} WHERE "pkey" = $1`,
        [
          pkey,
        ]
      );
    }
  }
}