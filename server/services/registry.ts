/**
 * This file contains the registry service
 * a special service file that is used within
 * other services for storing critical information
 * @module
 */

import { DatabaseConnection } from "../../database";
import { ServiceProvider, ServiceProviderType } from ".";
import { REGISTRY_IDENTIFIER } from "../../constants";

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
    if (row && row.value) {
      // we give it by parsing
      try {
        return JSON.parse(row.value);
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

    // otherwise return null by default
    return null;
  }

  /**
   * deletes a key value
   * @param pkey the primary key name
   * @param skey an optional secondary key name
   */
  public async delKey(pkey: string, skey?: string) {
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