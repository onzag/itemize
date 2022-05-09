import { LOGS_IDENTIFIER } from "../../constants";
import LoggingProvider, { ILogsResult } from "./base/LoggingProvider";
import { Client } from "@elastic/elasticsearch";
import { IItemizeFinalLoggingObject } from "../logger";
import { INSTANCE_UUID, NODE_ENV } from "../environment";

const logsIndex = LOGS_IDENTIFIER.toLowerCase();

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export class ElasticLoggerService extends LoggingProvider<null> {
  private elastic: Client;

  public async initialize(): Promise<void> {
    this.elastic = new Client(this.appDbConfig.elastic);

    while (true) {
      try {
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
        break;
      } catch (err) {
        const errData = {
          message: "ElasticLoggerService.initialize: Could not connect to elasticsearch, waiting 1 second",
          timestamp: (new Date()).toISOString(),
          className: "ElasticLoggerService",
          errMessage: err.message,
          errStack: err.stack,
          methodName: "initialize",
        };
        if (NODE_ENV === "production") {
          console.log(errData);
        }
        this.logToFallback(err, INSTANCE_UUID, "error", errData);
        await wait(1000);
      }
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