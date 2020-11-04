/**
 * This file contains the registry service
 * a special service file that is used within
 * other services for storing critical information
 * @packageDocumentation
 */

import { ServiceProvider } from ".";
import type Knex from "knex";
import { REGISTRY_IDENTIFIER } from "../../constants";

interface IRegistryConfig {
  knex: Knex,
};

interface IAllKeyResult { [skey: string]: any };

/**
 * The registry service allows services to store critical information
 * in a key value fashion, it's a rather simple service on its own
 * and it's special and not treated like other services, it even
 * runs on the load-dump and dump mechanisms
 */
export class RegistryService extends ServiceProvider<IRegistryConfig> {
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
    await this.config.knex.raw(
      `INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?) ` +
      `ON CONFLICT ("pkey", "skey") DO UPDATE SET ?? = ?, ?? = ?`,
      [
        REGISTRY_IDENTIFIER,

        "pkey",
        "skey",
        "value",
        "created_at",
        "last_modified",

        pkey,
        actualSkey,
        valueStringified,
        this.config.knex.fn.now(),
        this.config.knex.fn.now(),

        "last_modified",
        this.config.knex.fn.now(),

        "value",
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
    const rows = await this.config.knex.select("skey", "value").from(REGISTRY_IDENTIFIER).where({
      pkey,
    });

    // now we need to build the result
    const result: IAllKeyResult = {};

    // per each row
    rows.forEach((r) => {
      try {
        result[r.skey] = JSON.parse(r.value);
      } catch {
        this.logError(
          "RegistryService.getAllInPkey [SERIOUS]: Received invalid json for a key",
          {
            pkey,
            skey: r.skey,
            value: r.value,
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
    const row = await this.config.knex.first("value").from(REGISTRY_IDENTIFIER).where({
      pkey,
      skey: skey ? skey : "",
    });

    // if we have a value
    if (row && row.value) {
      // we give it by parsing
      try {
        return JSON.parse(row.value);
      } catch {
        this.logError(
          "RegistryService.getKey [SERIOUS]: Received invalid json for a key",
          {
            pkey,
            skey,
            value: row.value,
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
  public async detKey(pkey: string, skey?: string) {
    // so we select based on that
    await this.config.knex.delete(REGISTRY_IDENTIFIER).where({
      pkey,
      skey: skey ? skey : "",
    });
  }
}