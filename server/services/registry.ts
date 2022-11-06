/**
 * This file contains the registry service
 * a special service file that is used within
 * other services for storing critical information
 * @module
 */

import { DatabaseConnection } from "../../database";
import { ServiceProvider, ServiceProviderType } from ".";
import { REGISTRY_IDENTIFIER } from "../../constants";
import crypto from "crypto";

interface IRegistryConfig {
  databaseConnection: DatabaseConnection,
};

interface IAllKeyResult { [skey: string]: any };

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
   * Sets a key in the given registry
   * @param pkey the primary key name
   * @param value any JSON serializable value
   * @param skey an optional subkey value
   */
  public async setKey(pkey: string, value: any, skey?: string) {
    // first we stringify this
    const valueStringified = JSON.stringify(value);
    const actualSkey = skey || "";

    // and then do an upsert
    await this.config.databaseConnection.query(
      `INSERT INTO ${JSON.stringify(REGISTRY_IDENTIFIER)} ("pkey", "skey", "value", "created_at", "last_modified") VALUES ($1, $2, $3, NOW(), NOW()) ` +
      `ON CONFLICT ("pkey", "skey") DO UPDATE SET "last_modified" = NOW(), "value" = $3`,
      [
        pkey,
        actualSkey,
        valueStringified,
      ]
    );

    const mergedId = pkey + "." + (skey || "");
    this.memoryCache[mergedId] = value;

    if (skey && this.memoryCache[pkey]) {
      this.memoryCache[pkey][skey] = value;
    }
  }

  public async setKeyDontUpdate(pkey: string, value: any, skey?: string): Promise<any> {
    // first we stringify this
    const valueStringified = JSON.stringify(value);
    const actualSkey = skey || "";

    // and then do an upsert
    const result = await this.config.databaseConnection.queryFirst(
      `INSERT INTO ${JSON.stringify(REGISTRY_IDENTIFIER)} ("pkey", "skey", "value", "created_at", "last_modified") VALUES ($1, $2, $3, NOW(), NOW()) ` +
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
        const mergedId = pkey + "." + (skey || "");
        this.memoryCache[mergedId] = value;
        if (skey && this.memoryCache[pkey]) {
          this.memoryCache[pkey][skey] = value;
        }
        return value;
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

    return null;
  }

  /**
   * Provides all the subkeys including the empty default subkey
   * for the given registry key name
   * @param pkey the primary key name
   */
  public async getAllInPkey(pkey: string): Promise<IAllKeyResult> {
    // so we selent all rows for the given pkey and select all skey and value
    const rows = await this.config.databaseConnection.queryRows(
      `SELECT * FROM ${JSON.stringify(REGISTRY_IDENTIFIER)} WHERE "pkey" = $1`,
      [
        pkey,
      ],
    );

    // now we need to build the result
    const result: IAllKeyResult = {};

    // per each row
    rows.forEach((r) => {
      try {
        result[r.skey] = JSON.parse(r.value);
        const mergedId = pkey + "." + (r.skey || "");
        this.memoryCache[mergedId] = result[r.skey];
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

    this.memoryCache[pkey] = result;

    // return the result
    return result;
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
      `SELECT "value" FROM ${JSON.stringify(REGISTRY_IDENTIFIER)} WHERE "pkey" = $1 AND "skey" = $2`,
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

  public async getAllInPkeyWithMemoryCache(pkey: string) {
    if (typeof this.memoryCache[pkey] !== "undefined") {
      return this.memoryCache[pkey];
    }

    return await this.getAllInPkey(pkey);
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
    return newValue;
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
        `DELETE FROM ${JSON.stringify(REGISTRY_IDENTIFIER)} WHERE "pkey" = $1 AND "skey" = $2`,
        [
          pkey,
          skey ? skey : "",
        ]
      );
    } else {
      await this.config.databaseConnection.queryFirst(
        `DELETE FROM ${JSON.stringify(REGISTRY_IDENTIFIER)} WHERE "pkey" = $1`,
        [
          pkey,
        ]
      );
    }
  }
}