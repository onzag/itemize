import type { UpdateRequest } from "@elastic/elasticsearch/lib/api/types";
import { ServiceProviderType } from ".";
import AnalyticsProvider, { ITrackOptions } from "./base/AnalyticsProvider";
export class ElasticAnalyticsService extends AnalyticsProvider<null> {
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

}
