import { LOGS_IDENTIFIER } from "../../constants";
import LoggingProvider, { ILogsResult } from "./base/LoggingProvider";
import { Client } from "@elastic/elasticsearch";
import { IItemizeFinalLoggingObject } from "../logger";

const logsIndex = LOGS_IDENTIFIER.toLowerCase();

export class ElasticLoggerService extends LoggingProvider<null> {
  private elastic: Client;

  public async initialize(): Promise<void> {
    this.elastic = new Client(this.appDbConfig.elastic);

    const logsIndexExist = await this.elastic.indices.exists({
      index: logsIndex,
    });

    if (!logsIndexExist) {
      await this.elastic.indices.create({
        index: logsIndex,
        mappings: {
          properties: {
            instance_id: {
              type: "keyword",
            },
            level: {
              type: "keyword",
            },
            className: {
              type: "text",
            },
            functionName: {
              type: "text",
            },
            methodName: {
              type: "text",
            },
            endpoint: {
              type: "text",
            },
            message: {
              type: "text",
            },
            serious: {
              type: "boolean"
            },
            orphan: {
              type: "boolean"
            },
            timestamp: {
              type: "date",
            },
            data: {
              enabled: false,
            },
          }
        }
      });
    }
  }

  public async log(instanceId: string, level: string, data: IItemizeFinalLoggingObject) {
    (data as any).instance_id = instanceId;
    (data as any).level = level;
    await this.elastic.index({
      index: logsIndex,
      document: data,
    });
  }

  public async getLogsInstanceIds(): Promise<string[]> {
    const results = await this.elastic.search({
      index: logsIndex,
      aggs: {
        instance_ids: {
          terms: {
            field: "instance_id",
          }
        }
      }
    });

    // TODO
    console.log(results)

    return [];
  }

  public async clearLogsOf(instanceId: string): Promise<"OK" | "ERROR" | "NOT_AUTHORIZED"> {
    try {
      await this.elastic.deleteByQuery({
        index: logsIndex,
        query: {
          term: {
            instance_id: instanceId,
          },
        },
      });
    } catch {
      return "ERROR";
    }
    return "OK";
  }

  public async getLogsOf(instanceId: string, level: "info" | "error", fromDate: Date, toDate: Date): Promise<ILogsResult> {
    const result = await this.elastic.search({
      index: logsIndex,
      query: {
        term: {
          instance_id: instanceId,
          level: level,
        },
        range: {
          created_at: {
            gte: fromDate.toISOString(),
            lte: toDate.toISOString(),
          },
        },
      },
    });

    return ({
      instanceId,
      level,
      records: result.hits.hits.map((f) => {
        const sourceAsAny = f._source as any;
        return (
          {
            createdAt: sourceAsAny.created_at,
            data: sourceAsAny.data,
          }
        );
      }),
    });
  }
}