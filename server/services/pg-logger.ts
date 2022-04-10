import { LOGS_IDENTIFIER } from "../../constants";
import { DatabaseConnection } from "../../database";
import LoggingProvider, { ILogsResult } from "./base/LoggingProvider";

export class PgLoggerService extends LoggingProvider<null> {
  private database: DatabaseConnection;

  public initialize(): void | Promise<void> {
    const dbConnectionConfig = {
      host: this.appDbConfig.host,
      port: this.appDbConfig.port,
      user: this.appDbConfig.user,
      password: this.appDbConfig.password,
      database: this.appDbConfig.database,
    };

    this.database = new DatabaseConnection(dbConnectionConfig);
    this.database.suppressLogging();
  }
  public async log(instanceId: string, level: string, data: any) {
    const stingifiedData = JSON.stringify(data);

    await this.database.query(
      `INSERT INTO ${JSON.stringify(LOGS_IDENTIFIER)} ("instance_id", "level", "data", "created_at") VALUES ($1, $2, $3, NOW())`,
      [
        instanceId,
        level,
        stingifiedData,
      ]
    );
  }

  public async getLogsInstanceIds(): Promise<string[]> {
    const basicRows = await this.database.query(
      `SELECT DISTINCT "instance_id" FROM ${JSON.stringify(LOGS_IDENTIFIER)}`,
    );

    return basicRows.rows.map((r) => r.instance_id);
  }

  public async clearLogsOf(instanceId: string): Promise<"OK" | "ERROR" | "NOT_AUTHORIZED"> {
    try {
      await this.database.query(
        `DELETE FROM ` + JSON.stringify(LOGS_IDENTIFIER) + ` WHERE "instance_id"=$1`,
        [
          instanceId,
        ]
      );
    } catch {
      return "ERROR";
    }
    return "OK";
  }

  public async getLogsOf(instanceId: string, level: "info" | "error", fromDate: Date, toDate: Date): Promise<ILogsResult> {
    const basicRows = await this.database.query(
      `SELECT "created_at", "data" FROM ${JSON.stringify(LOGS_IDENTIFIER)} WHERE "instance_id" = $1 AND level = $2 AND "created_at" >= $3 AND "created_at" <= $4`,
      [
        instanceId,
        level,
        fromDate.toISOString(),
        toDate.toISOString()
      ]
    );

    return ({
      instanceId,
      level,
      records: basicRows.rows.map((f) => {
        try {
          return (
            {
              createdAt: f.created_at,
              data: JSON.parse(f.data),
            }
          );
        } catch {
          return (
            {
              createdAt: f.created_at,
              data: f.data,
            }
          );
        }
      }),
    });
  }
}