import { LOGS_IDENTIFIER, SERVER_ELASTIC_PING_INTERVAL_TIME } from "../../constants";
import LoggingProvider, { ILogsResult, IPingsResult } from "./base/LoggingProvider";
import { Client } from "@elastic/elasticsearch";
import { IItemizeFinalLoggingObject, IItemizePingObjectGenerator } from "../logger";
import { FORCE_CONSOLE_LOGS, INSTANCE_UUID, NODE_ENV } from "../environment";

const logsIndex = LOGS_IDENTIFIER.toLowerCase();

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export interface IElasticPing<D, S> extends IItemizePingObjectGenerator<D, S> {
  statusIndex: string;
  dataIndex: string;
}

interface IElasticPingSetter<D, S> extends IElasticPing<D, S> {
  instanceId: string;
}

export interface IPingEvent<D, S> extends IElasticPing<D, S> {
  status: S;
}

export class ElasticLoggerService extends LoggingProvider<null> {
  private elastic: Client;

  private pings: IElasticPingSetter<any, any>[] = [];
  private pingsInitialDataSet: boolean[] = [];
  private pingsInitialStatusTime: number[] = [];
  private pingsLastStatusTime: number[] = [];
  private pingsLastStatus: any[] = [];

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
        if (NODE_ENV !== "production" || FORCE_CONSOLE_LOGS) {
          console.log(errData);
        }
        this.logToFallback(err, INSTANCE_UUID, "error", errData);
        await wait(1000);
      }
    }

    setInterval(this.executePings.bind(this), SERVER_ELASTIC_PING_INTERVAL_TIME);
  }

  public async log(instanceId: string, level: string, data: IItemizeFinalLoggingObject) {
    (data as any).instance_id = instanceId;
    (data as any).level = level;
    await this.elastic.index({
      index: logsIndex,
      document: data,
    });
  }

  // ping functionality
  private _createPing<N, T>(setter: IElasticPingSetter<N, T>) {
    if (setter.dataIndex.startsWith("mod_")) {
      throw new Error("Index name for a ping cannot start with 'mod_' as in " + setter.dataIndex);
    } else if (setter.statusIndex.startsWith("mod_")) {
      throw new Error("Index status name for a ping cannot start with 'mod_' as in " + setter.statusIndex);
    } else if (setter.dataIndex === "status" || setter.dataIndex === "logs") {
      throw new Error("Index name for a ping cannot be " + setter.dataIndex);
    } else if (setter.statusIndex === "status" || setter.statusIndex === "logs") {
      throw new Error("Index status name for a ping cannot be " + setter.dataIndex);
    }

    if (this.pings.find((v) => v.id === setter.id)) {
      throw new Error("Ping with id " + setter.id + " already exists");
    }

    this.pings.push(setter);
    this.pingsInitialDataSet.push(false);
    this.pingsInitialStatusTime.push(null);
    this.pingsLastStatusTime.push(null);
    this.pingsLastStatus.push(null);
  }

  private async executePing(index: number) {
    const setter = this.pings[index];
    const initialDataSet = this.pingsInitialDataSet[index];

    if (!initialDataSet) {
      const initialData = { ...setter.data };
      initialData.timestamp = (new Date()).toISOString();

      try {
        await this.elastic.index({
          index: setter.dataIndex,
          id: setter.instanceId,
          document: initialData,
        });
        this.pingsInitialDataSet[index] = true;
      } catch (err) {
        this.logToFallback(err, INSTANCE_UUID, "error", {
          message: "Failed to execute ping, logged to fallback",
          timestamp: (new Date()).toISOString(),
          className: "ElasticLoggerService",
          errMessage: err.message,
          errStack: err.stack,
          serious: true,
        });
      }
    }

    try {
      const currentTime = (new Date()).getTime();
      const firstTime = this.pingsInitialStatusTime[index] || currentTime;
      const previousTime = this.pingsLastStatusTime[index];
      const statusObj = setter.statusRetriever({
        data: setter.data,
        firstTimeMs: firstTime,
        previousTimeMs: previousTime,
        currentTimeMs: currentTime,
        previousStatus: this.pingsLastStatus[index],
      });

      const status = statusObj.status;

      if (!this.pingsInitialStatusTime[index]) {
        this.pingsInitialStatusTime[index] = currentTime;
      }
      this.pingsLastStatusTime[index] = currentTime;
      this.pingsLastStatus[index] = status;

      if (!statusObj.doNotStore) {
        status.instanceId = setter.instanceId;
        status.timestamp = (new Date()).toISOString();

        await this.elastic.index({
          index: setter.statusIndex,
          document: status,
        });
      }
    } catch (err) {
      this.logToFallback(err, INSTANCE_UUID, "error", {
        message: "Failed to execute ping status storage, logged to fallback",
        timestamp: (new Date()).toISOString(),
        className: "ElasticLoggerService",
        errMessage: err.message,
        errStack: err.stack,
        serious: true,
      });
    }
  }

  public async getAllStoredPingsAt<N>(dataIndex: string) {
    const allResults = await this.elastic.search<N>({
      index: dataIndex,
    });

    const resultKeyd: { [key: string]: N } = {};

    allResults.hits.hits.forEach((hit) => {
      resultKeyd[hit._id] = hit._source;
    });

    return resultKeyd;
  }

  public async deletePingsFor(dataIndex: string, statusIndex: string, instanceId: string): Promise<"NOT_DEAD" | "OK"> {
    const lastStatusGiven = await this.elastic.search({
      index: statusIndex,
      size: 1,
      _source: false,
      query: {
        match: {
          instanceId,
        }
      },
      fields: [
        "timestamp",
      ],
      sort: [
        {
          timestamp: {
            order: "desc",
          }
        } as any,
      ]
    });

    if (lastStatusGiven.hits.total !== 0) {
      const now = (new Date()).getTime();
      const timestamp = (new Date(lastStatusGiven.hits[0].fields.timestamp[0])).getTime();

      const diff = timestamp - now;
      // can't assume dead until 30 seconds have passed
      if (diff <= 30000) {
        return "NOT_DEAD";
      }

      await this.elastic.deleteByQuery({
        index: statusIndex,
        query: {
          match: {
            instanceId,
          }
        },
      });
    }

    await this.elastic.deleteByQuery({
      index: dataIndex,
      query: {
        bool: {
          must: {
            term: {
              _id: instanceId,
            }
          },
        },
      },
    });

    return "OK";
  }

  private async executePings() {
    await Promise.all(this.pings.map((p, index) => this.executePing(index)));
  }

  public createPing<D, S>(instanceId: string, pingData: IItemizePingObjectGenerator<D, S>) {
    this._createPing({
      instanceId,
      dataIndex: pingData.id + "_data",
      statusIndex: pingData.id + "_status",
      ...pingData,
    });
  }

  public async getPingDataOf<D>(instanceId: string, pingId: string): Promise<{ data: D, timestamp: string }> {
    const results = await this.elastic.search({
      index: pingId + "_data",
      size: 1,
      query: {
        bool: {
          must: [
            {
              term: {
                _id: {
                  value: instanceId,
                }
              }
            }
          ]
        }
      }
    });

    if (results.hits?.hits.length) {
      const source = results.hits?.hits[0]._source as any;
      return {
        timestamp: source.timestamp,
        data: source,
      }
    }

    return null;
  }

  public async getPingInstanceIds(pingId: string): Promise<string[]> {
    const results = await this.elastic.search({
      index: pingId + "_data",
      _source: ["_id"],
      size: 10000,
    });

    return results.hits.hits.map((v) => v._id);
  }

  public async getPingsWithData<D>(pingId: string): Promise<Array<{ instanceId: string, data: D, timestamp: string }>> {
    const results = await this.elastic.search({
      index: pingId + "_data",
      size: 10000,
    });

    return results.hits.hits.map((v) => ({ instanceId: v._id, timestamp: (v._source as any).timestamp, data: v._source as any }));
  }

  public async clearLogsOf(instanceId: string) {
    await this.elastic.deleteByQuery({
      index: logsIndex,
      query: {
        bool: {
          must: {
            term: {
              instance_id: {
                value: instanceId,
              },
            },
          },
        },
      },
    });

    await this.triggerLogDataDestroyedListeners(instanceId);
  }

  public async clearPingsOf(instanceId: string, pingId: string) {
    const pingDataIndex = pingId + "_data";
    const pingStatusIndex = pingId + "_status";
    await this.elastic.deleteByQuery({
      index: pingDataIndex,
      query: {
        bool: {
          must: [
            {
              term: {
                _id: {
                  value: instanceId,
                }
              }
            }
          ]
        }
      }
    });
    await this.elastic.deleteByQuery({
      index: pingStatusIndex,
      query: {
        bool: {
          must: [
            {
              term: {
                ["instanceId.keyword"]: {
                  value: instanceId,
                },
              },
            },
          ]
        }
      }
    });
  }

  public async getLogsOf(instanceId: string, level: "info" | "error" | "any", fromDate: Date, toDate: Date): Promise<ILogsResult> {
    const result = await this.elastic.search({
      index: logsIndex,
      size: 10000,
      query: {
        bool: {
          must: ([
            {
              term: {
                instance_id: {
                  value: instanceId,
                },
              },
            },
            level !== "any" ? {
              term: {
                level: {
                  value: level,
                },
              },
            } : null,
            {
              range: {
                timestamp: toDate && fromDate ? {
                  gte: fromDate.toISOString(),
                  lte: toDate.toISOString(),
                } : (fromDate ? {
                  gte: fromDate.toISOString(),
                } : {
                  lte: toDate.toISOString(),
                }),
              },
            },
          ]).filter((v) => !!v),
        },
      },
      sort: [
        {
          timestamp: {
            order: "asc",
          }
        } as any,
      ],
    });

    return ({
      instanceId,
      level,
      records: result.hits.hits.map((f) => {
        const sourceAsAny = f._source as any;
        return (
          {
            createdAt: sourceAsAny.timestamp,
            data: sourceAsAny,
            level: sourceAsAny.level,
          }
        );
      }),
    });
  }

  /**
   * Streams the logs of a given writable response
   * 
   * it should write and append lines of valid json to this response with the given logs
   * 
   * @param instanceId 
   * @param write the write fn of the steream
   */
  public async streamLogsOf(instanceId: string, write: (chunk: string) => void): Promise<void> {
    let response = await this.elastic.search({
      index: logsIndex,
      scroll: "1m",
      size: 50,
      query: {
        bool: {
          must: [
            {
              term: {
                instance_id: {
                  value: instanceId,
                },
              },
            },
          ]
        },
      },
      sort: [
        {
          timestamp: {
            order: "asc",
          }
        } as any,
      ],
    });

    let scrollId = response._scroll_id;

    // Scroll through the remaining batches
    while (response.hits.hits.length > 0) {
      response.hits.hits.forEach(hit => write(JSON.stringify(hit._source) + '\n'));
      
      response = await this.elastic.scroll({
        scroll_id: scrollId,
        scroll: "1m",
      });

      scrollId = response._scroll_id;
    }
  }

  /**
   * Streams the pings of a given writable response
   * 
   * it should write and append lines of valid json to this response with the given logs
   * 
   * @param instanceId 
   * @param write the write fn of the steream
   */
  public async streamPingsOf(instanceId: string, pingId: string, write: (chunk: string) => void): Promise<void> {
    const pingData = await this.getPingDataOf(instanceId, pingId);
    write(JSON.stringify(pingData) + "\n");


    const statusIndex = pingId + "_status";

    let response = await this.elastic.search({
      index: statusIndex,
      scroll: "1m",
      size: 50,
      query: {
        bool: {
          must: [
            {
              term: {
                ["instanceId.keyword"]: {
                  value: instanceId,
                },
              },
            },
          ]
        },
      },
      sort: [
        {
          timestamp: {
            order: "asc",
          }
        } as any,
      ],
    });

    let scrollId = response._scroll_id;

    // Scroll through the remaining batches
    while (response.hits.hits.length > 0) {
      response.hits.hits.forEach(hit => write(JSON.stringify(hit._source) + '\n'));
      
      response = await this.elastic.scroll({
        scroll_id: scrollId,
        scroll: "1m",
      });

      scrollId = response._scroll_id;
    }
  }

  public async getPingsOf<S>(instanceId: string, pingId: string, fromDate: Date, toDate: Date): Promise<IPingsResult<S>> {
    const indexId = pingId + "_status";
    const result = await this.elastic.search({
      index: indexId,
      size: 300,
      query: {
        bool: {
          must: [
            {
              term: {
                ["instanceId.keyword"]: {
                  value: instanceId,
                },
              },
            },
            {
              range: {
                timestamp: toDate && fromDate ? {
                  gte: fromDate.toISOString(),
                  lte: toDate.toISOString(),
                } : (fromDate ? {
                  gte: fromDate.toISOString(),
                } : {
                  lte: toDate.toISOString(),
                }),
              },
            },
          ],
        },
      },
      sort: [
        {
          timestamp: {
            order: "desc",
          }
        } as any,
      ],
    });

    return ({
      instanceId,
      pings: result.hits.hits.map((f) => {
        const sourceAsAny = f._source as any;
        return (
          {
            createdAt: sourceAsAny.timestamp,
            data: sourceAsAny,
            level: sourceAsAny.level,
          }
        );
      }).reverse(),
    });
  }

  public async isPingAlive(instanceId: string, pingId: string): Promise<{ alive: boolean; lastHeard: string; }> {
    const results = await this.elastic.search({
      index: pingId + "_status",
      query: {
        bool: {
          must: {
            term: {
              ["instanceId.keyword"]: {
                value: instanceId,
              },
            },
          },
        },
      },
      size: 1,
      sort: [
        {
          timestamp: {
            order: "desc",
          }
        } as any,
      ],
      _source: ["timestamp"],
    });

    const lastTimestampHeardOfPings = results.hits?.hits && results.hits.hits[0] && results.hits.hits[0]._source["timestamp"];

    const logResults = await this.elastic.search({
      index: "logs",
      query: {
        bool: {
          must: {
            term: {
              instance_id: {
                value: instanceId,
              },
            },
          },
        },
      },
      size: 1,
      sort: [
        {
          timestamp: {
            order: "desc",
          }
        } as any,
      ],
      _source: ["timestamp"],
    });

    const lastTimestampHeardOfLogs = logResults.hits?.hits && logResults.hits.hits[0] && logResults.hits.hits[0]._source["timestamp"];

    if (!lastTimestampHeardOfPings && !lastTimestampHeardOfLogs) {
      return { alive: false, lastHeard: null };
    }

    const lastTime =
      Math.max.apply(
        null,
        [lastTimestampHeardOfPings, lastTimestampHeardOfLogs].filter((v) => !!v).map((v) => (new Date(v)).getTime()),
      );

    const currentTime = (new Date()).getTime();
    const timeDifference = currentTime - lastTime;

    if (timeDifference > (SERVER_ELASTIC_PING_INTERVAL_TIME * 2)) {
      return { alive: false, lastHeard: (new Date(lastTime)).toISOString() };
    }

    return { alive: true, lastHeard: (new Date(lastTime)).toISOString() };
  }
}