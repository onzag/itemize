import type { QueryDslQueryContainer, SearchRequest, SearchResponse, UpdateRequest } from "@elastic/elasticsearch/lib/api/types";
import { ServiceProviderType } from ".";
import AnalyticsProvider, { IResolveAggregationArg, ITrackOptions } from "./base/AnalyticsProvider";
import { ElasticQueryBuilder } from "../elastic";

export class ElasticAnalyticsService extends AnalyticsProvider<null, ElasticQueryBuilder, SearchResponse> {
  public static getType() {
    return ServiceProviderType.LOCAL;
  }

  public async hit(track: string, userId: string, options: { weight: number; context: string; upsert: boolean; anonymous: boolean; data?: any; trusted: boolean; timezone: string; time?: Date; timeSlice?: { start: Date; end: Date; }; }): Promise<void> {
    const trackInfo = this.getTrackFor(track);

    if (trackInfo.clientWillUpsert !== options.upsert) {
      // it is not supported because when we upsert we know that there is only one per user per context
      // of a given type, but otherwise there can be more this allows for an efficiency increase
      // where we can have upserts straight from elasticsearch, instead of manually making them
      throw new Error("The track specifies that the client is supposed to upsert but the option provided specifies upsert as false, this is not supported");
    }

    const indexName = "track_" + track;
    const document = {
      userid: userId,
      weight: options.weight,
      context: options.context || "",
      anonymous: options.anonymous,
      data: options.data || {},
      timezone: options.timezone,
      date: (options.time || (new Date())).toISOString(),
      timeslice: options.timeSlice ? {
        gte: options.timeSlice.start.toISOString(),
        lte: options.timeSlice.end.toISOString(),
      } : {},
      trusted: options.trusted,
    };

    // options.upsert and this are equivalent but we will play it safe
    if (trackInfo.clientWillUpsert) {
      const updateAction: UpdateRequest = {
        id: userId + "." + (options.context || ""),
        index: indexName,
        doc: document,
        doc_as_upsert: true,
      };
      if (process.env.NODE_ENV === "development") {
        console.log(JSON.stringify(updateAction, null, 2));
      }
      await this.elasticClient.update(updateAction);
    } else {
      const indexR = {
        index: indexName,
        document,
      };
      if (process.env.NODE_ENV === "development") {
        console.log(JSON.stringify(indexR, null, 2));
      }
      await this.elasticClient.index(indexR);
    }
  }

  /**
   * Create a new track element for tracking
   * 
   * the track should be able to handle all data forms to put a hit
   * 
   * @param track
   */
  public async createTrackIfNotExist(track: string, options: ITrackOptions): Promise<void> {
    const indexName = "track_" + track;
    const doesExist = await this.elasticClient.indices.exists({
      index: indexName,
      allow_no_indices: false,
    });
    if (doesExist) {
      return;
    } else {
      await this.elasticClient.indices.create({
        index: indexName,
        mappings: {
          properties: {
            userid: {
              type: "keyword",
            },
            anonymous: {
              type: "boolean",
            },
            timezone: {
              type: "keyword",
            },
            context: {
              type: "keyword",
            },
            date: {
              type: "date",
            },
            timeslice: {
              type: "date_range",
            },
            weight: {
              type: "integer",
            },
            data: {
              type: "object",
            },
            trusted: {
              type: "boolean",
            }
          }
        },
      });
    }
  }

  public async resolveAggregation(arg: IResolveAggregationArg): Promise<any> {
    const elasticQuery: SearchRequest = {
      index: "track_" + arg.trackId,
      query: {
        bool: {
          filter: [],
        },
      },
      size: 0,
      aggs: {
        weight: {
          stats: {
            field: "weight"
          }
        },
        context: {
          terms: {
            field: "context",
          }
        },
      }
    };

    if (arg.contextToLimit) {
      if (typeof arg.contextToLimit === "string")
        (elasticQuery.query.bool.filter as QueryDslQueryContainer[]).push({
          term: {
            context: arg.contextToLimit,
          }
        })
    } else {
      (elasticQuery.query.bool.filter as QueryDslQueryContainer[]).push({
        terms: {
          context: arg.contextToLimit,
        }
      })
    }

    if (arg.userToLimit) {
      if (typeof arg.userToLimit === "string")
        (elasticQuery.query.bool.filter as QueryDslQueryContainer[]).push({
          term: {
            userid: arg.userToLimit,
          }
        })
    } else {
      (elasticQuery.query.bool.filter as QueryDslQueryContainer[]).push({
        terms: {
          userid: arg.userToLimit,
        }
      });
    }

    if (arg.dataToLimit && Object.keys(arg.dataToLimit).length) {
      const dataKeys = Object.keys(arg.dataToLimit);

      dataKeys.forEach((k) => {
        const limitValue = arg.dataToLimit[k];

        if (Array.isArray(limitValue)) {
          (elasticQuery.query.bool.filter as QueryDslQueryContainer[]).push({
            terms: {
              ["data." + k + ".keyword"]: limitValue,
            }
          });
        } else if (typeof limitValue === "object") {
          (elasticQuery.query.bool.filter as QueryDslQueryContainer[]).push({
            range: {
              ["data." + k]: limitValue,
            }
          });
        } else if (typeof limitValue === "string") {
          (elasticQuery.query.bool.filter as QueryDslQueryContainer[]).push({
            term: {
              ["data." + k + ".keyword"]: limitValue,
            }
          });
        } else if (typeof limitValue === "boolean" || typeof limitValue === "number") {
          (elasticQuery.query.bool.filter as QueryDslQueryContainer[]).push({
            term: {
              ["data." + k]: limitValue,
            }
          });
        }
      });
    }

    if (arg.dataAggregator) {
      const aggKeys = Object.keys(arg.dataAggregator);
      if (aggKeys && aggKeys.length) {
        aggKeys.forEach((k) => {
          const aggValue = arg.dataAggregator[k];
          if (aggValue.method === "extended-stats") {
            elasticQuery.aggs["data." + k] = {
              extended_stats: {
                field: "data." + k,
              }
            }
          } else if (aggValue.method === "stats") {
            elasticQuery.aggs["data." + k] = {
              stats: {
                field: "data." + k,
              }
            }
          } else if (aggValue.method === "keyword-terms" || aggValue.method === "terms") {
            elasticQuery.aggs["data." + k] = {
              terms: {
                field: "data." + k + (aggValue.method === "keyword-terms" ? ".keyword" : ""),
              }
            }
          }
        });
      }
    }

    if (arg.timeslices) {
      // make a shallow copy
      const currentAggs = Object.assign({}, elasticQuery.aggs);

      elasticQuery.aggs.histogram = {
        date_histogram: {
          field: "date",
          ...arg.timeslices,
          min_doc_count: 1,
        },

        aggs: currentAggs,
      }

      if (arg.timeslicesFrom || arg.timeslicesTo) {
        elasticQuery.aggs.histogram.date_histogram.hard_bounds = {
          min: arg.timeslicesFrom || null,
          max: arg.timeslicesTo || "now",
        }
      }
    }

    const rs = await this.elasticClient.search(elasticQuery);
    return rs;
  }
}
