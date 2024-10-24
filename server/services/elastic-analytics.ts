/**
 * This file extends the base analytics and creates the elasticsearch
 * analytics provider that uses elastic to resolve for analytics
 * 
 * @module
 */

import type { QueryDslQueryContainer, SearchRequest, SearchResponse, UpdateRequest } from "@elastic/elasticsearch/lib/api/types";
import { ServiceProviderType } from ".";
import AnalyticsProvider, { IDataAggregator, IResolveAggregationArg, ITrackOptions } from "./base/AnalyticsProvider";
import { ElasticQueryBuilder } from "../elastic";

/**
 * Information about a given term and how many times it appeared
 * these are for string values that take many forms
 */
export interface IElasticAnalyticsTermStats {
  /**
   * How many couldn't be counted or weren't included in the statistics
   */
  leftout_count: number;
  /**
   * The members that were counted
   */
  members: {
    [key: string]: IElasticAnalyticsNumericStat;
  };
}

/**
 * A numeric stat is based on the weight of a given
 * entry
 */
export interface IElasticAnalyticsNumericStat {
  /**
   * The count represents the number of times a hit was found
   */
  count: number;
  /**
   * Minimum weight
   */
  min: number;
  /**
   * Maxinum weight
   */
  max: number;
  /**
   * Average weight
   */
  avg: number;
  /**
   * Sum of weights
   */
  sum: number;
  /**
   * represents a subcategory of this measurement that is filtered by
   * for example say context, filtered by app_country
   */
  subcategories?: {
    [by: string]: IElasticAnalyticsTermStats | IElasticAnalyticsNumericStat | IElasticAnalyticsExtendedNumericStat;
  }
}

/**
 * Extended stats offer further information about weight
 */
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

/**
 * Basic response from the elasticsearch endpoint
 * without including histogram
 */
export interface IElasticAnalyticsResponseBase {
  /**
   * Number of records considered
   */
  count: number;
  /**
   * Basic standard statistics
   */
  stats: {
    /**
     * Split by context
     */
    context?: IElasticAnalyticsTermStats;
    /**
     * Split by users
     */
    users?: IElasticAnalyticsTermStats;
    /**
     * Weight analysis
     */
    weight: IElasticAnalyticsNumericStat;
  };
  /**
   * Customized data based statistics
   */
  dataStats: {
    /**
     * the key represents the data that is being used to split the statistical aggregation
     */
    [key: string]: IElasticAnalyticsTermStats | IElasticAnalyticsNumericStat | IElasticAnalyticsExtendedNumericStat;
  };
}

/**
 * Describes a histogram point
 */
export interface IElasticAnalyticsResponseHistogram extends IElasticAnalyticsResponseBase {
  /**
   * The date that this represents
   */
  date: string;
  /**
   * The date but in unix form
   */
  unixdate: number;
}

/**
 * The actual response that is retrieved from the aggregation process
 */
export interface IElasticAnalyticsResponse extends IElasticAnalyticsResponseBase {
  /**
   * The histogram that may or may not be available
   * depending on whether the endpoint allows for timeslices
   */
  histogram?: Array<IElasticAnalyticsResponseHistogram>;
}

/**
 * @ignore
 * 
 * This function takes a stat object from elasticsearch
 * and breaks it down into the form that will be consumed in the client side
 * these types are messy so any was used
 * 
 * @param stat 
 * @returns 
 */
function unwrapStat(stat: any): IElasticAnalyticsTermStats | IElasticAnalyticsNumericStat | IElasticAnalyticsExtendedNumericStat {
  if (!stat.buckets) {
    return stat;
  }

  const final: IElasticAnalyticsTermStats = {
    leftout_count: stat.sum_other_doc_count,
    members: {},
  };

  stat.buckets.forEach((bucket) => {
    final.members[bucket.key] = bucket.weight;

    Object.keys(bucket).forEach((innerKey: string) => {
      if (innerKey.startsWith("data.") || innerKey === "users") {
        if (!final.members[bucket.key].subcategories) {
          final.members[bucket.key].subcategories = {};
        }
        const unwrapped = unwrapStat(bucket[innerKey]);
        final.members[bucket.key].subcategories[innerKey] = unwrapped;
      }
    });
  });

  return final;
}

/**
 * @ignore
 * 
 * Provided a elastic query adds a data aggregator that was defined
 * to the query so it can be retrieved
 * 
 * @param aggregator the aggregation object, either the top level aggregation or a subcategory
 * @param query the query object
 */
function setDataAggregatorAt(
  aggregator: IDataAggregator,
  query: any,
) {
  // first we grab the aggregation keys from the aggregator
  const aggKeys = Object.keys(aggregator);
  if (aggKeys && aggKeys.length) {

    // now we loop
    aggKeys.forEach((k) => {
      const aggName = "data." + k;
      const aggValue = aggregator[k];

      // depending on the type we add the aggregation
      if (aggValue.method === "extended-stats") {
        query.aggs[aggName] = {
          extended_stats: {
            field: "data." + k,
          }
        }
      } else if (aggValue.method === "stats") {
        query.aggs[aggName] = {
          stats: {
            field: "data." + k,
          }
        }
      } else if (aggValue.method === "keyword-terms" || aggValue.method === "terms") {
        query.aggs[aggName] = {
          terms: {
            field: aggName + (aggValue.method === "keyword-terms" ? ".keyword" : ""),
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

      // if we have subcategorization
      if (aggValue.subcategorizeBy && query.aggs[aggName]) {
        if (!query.aggs[aggName].aggs) {
          query.aggs[aggName].aggs = {};
        }

        // we add it too
        setDataAggregatorAt(aggValue.subcategorizeBy, query.aggs[aggName]);
      }
    });
  }
}

/**
 * This is the elastic analytics service class that uses
 * elasticsearch in order to provide the analytics
 */
export class ElasticAnalyticsService extends AnalyticsProvider<null, ElasticQueryBuilder, SearchResponse> {
  public static getType() {
    return ServiceProviderType.LOCAL;
  }

  /**
   * overriden function of the AnalyticsProvider to provide the hit functionality
   * @param track 
   * @param userId 
   * @param options 
   */
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
   * Overriden function to create a new track element for tracking
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

  /**
   * Overriden function to resolve an aggregation
   * @param arg 
   * @returns 
   */
  public async resolveAggregation(arg: IResolveAggregationArg): Promise<any> {
    // first we make the query to the given track
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
        }
      }
    };

    // if we are not disabling context aggregation we add the context
    if (!arg.disableContextAggregation) {
      elasticQuery.aggs.context = {
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
      };
    }

    // we add the data aggreation to the context itself
    if (arg.dataAggregator && !arg.disableContextAggregation) {
      setDataAggregatorAt(
        arg.dataAggregator,
        elasticQuery.aggs.context,
      );
    }

    // if we are aggregating users
    if (arg.aggregateUsers) {
      // we do
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

      // add a potential data aggregator
      setDataAggregatorAt(
        arg.dataAggregator,
        elasticQuery.aggs.users,
      );

      // and even push that into the context
      if (!arg.disableContextAggregation) {
        elasticQuery.aggs.context.aggs.users = elasticQuery.aggs.users;
      }
    }

    // if we have a context to limit
    if (arg.contextToLimit) {
      // we filter by such context
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

    // same for user
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

    // and if we have data limiters we apply them
    if (arg.dataToLimit && Object.keys(arg.dataToLimit).length) {
      const dataKeys = Object.keys(arg.dataToLimit);

      // for that we loop
      dataKeys.forEach((k) => {
        const limitValue = arg.dataToLimit[k];

        // and check how we are limiting this thing
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

    // if we have a general data aggregator we set it on the top query too
    if (arg.dataAggregator) {
      setDataAggregatorAt(
        arg.dataAggregator,
        elasticQuery,
      );
    }

    // and now timeslices!
    if (arg.timeslices) {
      // make a shallow copy
      const currentAggs = Object.assign({}, elasticQuery.aggs);

      elasticQuery.aggs.histogram = {
        date_histogram: {
          field: "date",
          ...arg.timeslices.slices,
          // to allow results with no data
          // min_doc_count: 1,
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

    // log if in development
    if (process.env.NODE_ENV === "development") {
      console.log(JSON.stringify(elasticQuery, null, 2));
    }

    const rs = await this.elasticClient.search(elasticQuery);

    // make our response object
    const response: IElasticAnalyticsResponse = {
      count: (rs.hits.total as any).value,
      histogram: null,
      stats: {
        weight: rs.aggregations.weight as any,
      },
      dataStats: {

      },
    };

    // and now get our context information
    if (!arg.disableContextAggregation) {
      response.stats.context = unwrapStat(rs.aggregations.context) as any;
    }

    // our user information
    if (arg.aggregateUsers) {
      response.stats.users = unwrapStat(rs.aggregations.users) as any;
    }

    // Each data element
    if (arg.dataAggregator) {
      const aggKeys = Object.keys(arg.dataAggregator);
      if (aggKeys && aggKeys.length) {
        aggKeys.forEach((k) => {
          response.dataStats[k] = unwrapStat(rs.aggregations["data." + k]);
        });
      }
    }

    // and if we have timeslices, build them too
    if (arg.timeslices) {
      // generating the histogram by going inside the histogram buckets
      response.histogram = (rs.aggregations.histogram as any).buckets.map((b) => {
        // and grabbing this information from the bucket
        const rsPoint: IElasticAnalyticsResponseHistogram = {
          date: b.key_as_string,
          unixdate: b.key,
          count: b.doc_count,
          stats: {
            weight: b.weight as any,
          },
          dataStats: {

          },
        };

        // add the context if not disabled
        if (!arg.disableContextAggregation) {
          rsPoint.stats.context = unwrapStat(b.context) as any;
        }

        // adding the users if not disabled
        if (arg.aggregateUsers) {
          rsPoint.stats.users = unwrapStat(b.users) as any;
        }

        // and each data stat too
        if (arg.dataAggregator) {
          const aggKeys = Object.keys(arg.dataAggregator);
          if (aggKeys && aggKeys.length) {
            aggKeys.forEach((k) => {
              rsPoint.dataStats[k] = unwrapStat(b["data." + k]);
            });
          }
        }

        return rsPoint;
      });
    }

    // now we can return the response
    return response;
  }
}
