import { ServiceProvider } from ".";
import type Knex from "knex";
import { REGISTRY_IDENTIFIER } from "../../constants";

interface IRegistryConfig {
  knex: Knex,
};

interface IAllKeyResult { [skey: string]: any };

export class RegistryService extends ServiceProvider<IRegistryConfig> {
  public async setKey(pkey: string, value: any, skey?: string) {
    const valueStringified = JSON.stringify(value);
    const actualSkey = skey || "";

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
  public async getAllInPkey(pkey: string): Promise<IAllKeyResult> {
    const rows = await this.config.knex.select("skey", "value").from(REGISTRY_IDENTIFIER).where({
      pkey,
    });

    const result: IAllKeyResult = {};

    rows.forEach((r) => {
      result[r.skey] = r.value;
    });

    return result;
  }
  public async getKey(pkey: string, skey?: string) {
    const row = await this.config.knex.first("value").from(REGISTRY_IDENTIFIER).where({
      pkey,
      skey: skey ? skey : "",
    });

    if (row && row.value) {
      try {
        return JSON.parse(row.value);
      } catch {
        this.logError(
          "RegistryService.getKey [SERIOUS]: Received invalid json for key",
          {
            pkey,
            skey,
            value: row.value,
          }
        );
      }
    }

    return null;
  }
}