import type { QueryDslQueryContainer, SearchRequest, SearchResponse, UpdateRequest } from "@elastic/elasticsearch/lib/api/types";
import { ServiceProviderType } from ".";
import AnalyticsProvider, { IResolveAggregationArg, ITrackOptions } from "./base/AnalyticsProvider";
import { ElasticQueryBuilder } from "../elastic";

export interface IElasticAnalyticsTermStats {
  leftout_count: number;
  members: {
    [key: string]: IElasticAnalyticsNumericStat;
  };
}

export interface IElasticAnalyticsNumericStat {
  count: number;
  min: number;
  max: number;
  avg: number;
  sum: number;
  subcategories?: {
    [by: string]: {
      [key: string]: IElasticAnalyticsNumericStat;
    };
  }
}

export interface IElasticAnalyticsExtendedNumericStat extends IElasticAnalyticsNumericStat {
  sum_of_squares: number;
  variance: number;
  variance_population: number;
  variance_sampling: number;
  std_deviation: number;
  std_deviation_population: number;
  std_deviation_sampling: number;
  std_deviation_bounds: {
    upper: number;
    lower: number;
    upper_population: number;
    lower_population: number;
    upper_sampling: number;
    lower_sampling: number;
  }
}

export interface IElasticAnalyticsResponseBase {
  count: number;
  stats: {
    context: IElasticAnalyticsTermStats,
    users?: IElasticAnalyticsTermStats,
    weight: IElasticAnalyticsNumericStat,
  };
  dataStats: {
    [key: string]: IElasticAnalyticsTermStats | IElasticAnalyticsNumericStat | IElasticAnalyticsExtendedNumericStat;
  };
}

export interface IElasticAnalyticsResponseHistogram extends IElasticAnalyticsResponseBase {
  date: string;
  unixdate: number;
}

export interface IElasticAnalyticsResponse extends IElasticAnalyticsResponseBase {
  histogram: Array<IElasticAnalyticsResponseHistogram>;
}

function unwrapTermsStats(stat: any): IElasticAnalyticsTermStats {
  const final: IElasticAnalyticsTermStats = {
    leftout_count: stat.sum_other_doc_count,
    members: {},
  };

  stat.buckets.forEach((bucket) => {
    final.members[bucket.key] = bucket.weight;
  });

  return final;
}

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
            field: "weight",
          }
        },
        context: {
          terms: {
            field: "context",
            size: arg.contextMaxSize || 300,
          },
          aggs: {
            weight: {
              stats: {
                field: "weight",
              },
            },
          },
        },
      }
    };

    if (arg.aggregateUsers) {
      elasticQuery.aggs.users = {
        terms: {
          field: "userid",
          size: arg.aggregateUsersMaxSize || 300,
        },
        aggs: {
          weight: {
            stats: {
              field: "weight",
            },
          },
        },
      };
      // TODO automatically add categories by the data aggregator
      elasticQuery.aggs.context.aggs.users = elasticQuery.aggs.users;
    }

    if (arg.contextToLimit) {
      if (typeof arg.contextToLimit === "string") {
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
    }

    if (arg.userToLimit) {
      if (typeof arg.userToLimit === "string") {
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

    // TODO add subcategories query
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
                size: aggValue.size || 300,
              },
              aggs: {
                weight: {
                  stats: {
                    field: "weight",
                  },
                },
              },
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

    if (process.env.NODE_ENV === "development") {
      console.log(JSON.stringify(elasticQuery, null, 2));
    }

    const rs = await this.elasticClient.search(elasticQuery);

    const response: IElasticAnalyticsResponse = {
      count: (rs.hits.total as any).value,
      histogram: null,
      stats: {
        context: unwrapTermsStats(rs.aggregations.context),
        weight: rs.aggregations.weight as any,
      },
      dataStats: {
        
      },
    };

    if (arg.aggregateUsers) {
      response.stats.users = unwrapTermsStats(rs.aggregations.users);
    }

    // TODO extract subcategories
    if (arg.dataAggregator) {
      const aggKeys = Object.keys(arg.dataAggregator);
      if (aggKeys && aggKeys.length) {
        aggKeys.forEach((k) => {
          const aggValue = arg.dataAggregator[k];
          if (aggValue.method === "extended-stats" || aggValue.method === "stats") {
            response.dataStats[k] = rs.aggregations["data." + k] as any;
          } else if (aggValue.method === "keyword-terms" || aggValue.method === "terms") {
            response.dataStats[k] = unwrapTermsStats(rs.aggregations["data." + k] as any);
          }
        });
      }
    }

    if (arg.timeslices) {
      response.histogram = (rs.aggregations.histogram as any).buckets.map((b) => {
        const rsPoint: IElasticAnalyticsResponseHistogram = {
          date: b.key_as_string,
          unixdate: b.key,
          count: b.doc_count,
          stats: {
            context: unwrapTermsStats(b.context),
            weight: b.weight as any,
          },
          dataStats: {
        
          },
        };

        if (arg.aggregateUsers) {
          rsPoint.stats.users = unwrapTermsStats(b.users);
        }

        if (arg.dataAggregator) {
          const aggKeys = Object.keys(arg.dataAggregator);
          if (aggKeys && aggKeys.length) {
            aggKeys.forEach((k) => {
              const aggValue = arg.dataAggregator[k];
              if (aggValue.method === "extended-stats" || aggValue.method === "stats") {
                rsPoint.dataStats[k] = b["data." + k] as any;
              } else if (aggValue.method === "keyword-terms" || aggValue.method === "terms") {
                rsPoint.dataStats[k] = unwrapTermsStats(b["data." + k] as any);
              }
            });
          }
        }

        return rsPoint;
      });
    }

    return response;
  }
}
