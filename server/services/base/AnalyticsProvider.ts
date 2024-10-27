/**
 * This file specifies a base for creating the internal analytics
 * provider that is used to manage analytics and other
 * statistical information
 * 
 * @module
 */

import { Client } from "@elastic/elasticsearch";
import { ServiceProvider, ServiceProviderType } from "..";
import { RegistryService } from "../registry";
import { IAppDataType } from "../../";
import { IServerSideTokenDataType } from "../../resolvers/basic";
import { ICustomListenerInfo } from "../../listener";
import uuidv5 from "uuid/v5";
import { EndpointError } from "../../../base/errors";
import { ADMIN_ROLE, ENDPOINT_ERRORS, GUEST_METAROLE } from "../../../constants";
import path from "path";
import { jwtVerifyRequest } from "../../token";
import { AggregationsCalendarInterval } from "@elastic/elasticsearch/lib/api/types";
import type { Request } from "express";

const NAMESPACE = "23ab4609-df49-5fdf-921b-4714adb284f3";
export function makeIdOutOf(str: string) {
  return "ANON" + uuidv5(str, NAMESPACE).replace(/-/g, "");
}

/**
 * Used to limit a numberic value in the data of the analytics information to keep it within a range
 */
interface INumericRangeDataLimiter { gte?: number; ge?: number, lte?: number; le?: number };

/**
 * The data limiter represents functionality to limit the data that can be retrieved to a given
 * analytics point
 */
export interface IBasicDataLimiter { [key: string]: string | boolean | number | Array<string> | INumericRangeDataLimiter };

/**
 * The timeslices definition determines how a timeline is to be built
 * in order to retrieve the timeline information
 */
interface ITimeslicesDefinition {
  /**
   * Fixed interval based on elastic fixed interval definition
   */
  fixed_interval?: string;
  /**
   * calendar interval based on elastic calendar_interval definition
   */
  calendar_interval?: AggregationsCalendarInterval;
};

const maxSizeIdToNumber = {
  minute: 60000,
  hour: 3600000,
  // wiggle room
  day: 3600000*25,
  week: 3600000*24*8,
  month: 3600000*24*7*32,
  year: 3600000*24*7*366,
}

export interface ISingleTimesliceDescription {
  /**
   * How many slices can be retrieved at once on the histogram
   * this number is the number of milliseconds
   * that is allowed to be retrieved and it enforces
   * using from to ensure that these millisecond amounts are respected
   * otherwise it will throw an error that the timeslices are too large
   */
  maxsize?: number | "minute" | "hour" | "day" | "week" | "month" | "year";
  /**
   * The definition of how this scale is to be sliced
   */
  slices: ITimeslicesDefinition;
};

/**
 * The timeslices description provides the slices definition
 * while also adding information about limits
 */
interface ITimeslicesDescription {
  [key: string]: ISingleTimesliceDescription;
}

/**
 * The data aggregator represents the way to aggregate the data in order to build
 * statistical models
 */
export interface IDataAggregator {
  [dataKey: string]: {
    /**
     * The method to use
     * keyword-terms uses the keyword of a field in order to create a list on how many times this was found
     * terms is the same as keyword-terms but it will not use the keyword field, usually a matter of performance, keyword is better, terms works for boolean
     * stats used for numeric values
     * extended-stats used for numeric values as well and has more stats
     * 
     * These are the options for when elastic-analytics the default provider is used
     * if you use a different provider check for their options
     */
    method: string;
    /**
     * Perform a subcategorization operation, for example you may want to subcategorize by the intersection between
     * language and country if those are available as data, the subcategorization depends on the data that is available
     */
    subcategorizeBy?: IDataAggregator;
    /**
     * a limiter for methods that have a size limitation, such a terms
     * the default size is 300
     */
    size?: number;
  }
}

/**
 * The resolve aggregation is passed to the analytics
 * provider resolver that is used by the service provider
 * the properties are similar to the ones given by the app
 * server developer
 * 
 * It can also be used in the server side to resolve information
 */
export interface IResolveAggregationArg {
  /**
   * The track id in question
   * based on what the client is querying
   * server specfied
   */
  trackId: string;
  /**
   * The request that was used in the http query
   * server specfied
   */
  req?: Express.Request;
  /**
   * The context to limit specfied by the developer
   * 
   * If you make contextToLimit be a string or a single item in the array
   * it is recommended to have disableContextAggregation as true
   * as it will be irrelevant
   * 
   * developer specified
   */
  contextToLimit?: string | string[];
  /**
   * Disable retrieving the context in the aggregation results
   * developer specified
   */
  disableContextAggregation?: boolean;
  /**
   * Limit to a specific user(s)
   * 
   * If you have userToLimit as string or single item in the array
   * it's not recommended to have aggregateUsers as true
   * 
   * developer specified
   */
  userToLimit?: string | string[];
  /**
   * Limit by data properties
   * developer specified
   */
  dataToLimit?: IBasicDataLimiter;
  /**
   * The data aggregator that the developer specified
   * developer specified
   */
  dataAggregator: IDataAggregator;
  /**
   * The timeslice mechanism if it's to use one
   * this is a elasticsearch style definition
   * developer specified
   */
  timeslices?: ISingleTimesliceDescription;
  /**
   * The timelice to grab should start at this date
   * client specified
   */
  timeslicesFrom?: string;
  /**
   * The timelice to grab should end at this date
   * client specified
   */
  timeslicesTo?: string;
  /**
   * Aggregate the users in all the potential aggregations
   * developer specified
   */
  aggregateUsers?: boolean;
  /**
   * How many users to aggregate
   * developer specified
   */
  aggregateUsersMaxSize?: number;
  /**
   * How many contexts to aggregate
   * developer specified
   */
  contextMaxSize?: number;
}

/**
 * Options to expose an analytics endpoint to a client
 * that will provide analytics for a given track
 */
export interface IExposeAnalyticsOptionsNoTrack {
  /**
   * Endpoint, will exist at /rest/service/stats/${endpoint}
   */
  endpoint: string;
  /**
   * Authorize or not the given user
   * 
   * the user authorization should come in the form fo the token
   * in the headers as token
   * 
   * @param user 
   * @param appData 
   * @param req 
   * @returns 
   */
  authUser?: (user: IServerSideTokenDataType, appData: IAppDataType, req: Request) => boolean | Promise<boolean>;
  /**
   * Prevent guests from querying this
   */
  authUserNoGuests?: boolean;
  /**
   * Set limiters for the conext that the user gets information from
   * @param user 
   * @param appData 
   * @param req 
   * @returns 
   */
  limitToContext?: (user: IServerSideTokenDataType, appData: IAppDataType, req: Request) => string | string[] | Promise<string | string[]>;
  /**
   * Set limiters for the users that are retrieved information from
   * @param user 
   * @param appData 
   * @param req 
   * @returns 
   */
  limitToUser?: (user: IServerSideTokenDataType, appData: IAppDataType, req: Request) => string | string[] | Promise<string | string[]>;
  /**
   * Set limiters for the kind of data that can be accessed, it generates a filter query in the aggregation
   * @param user 
   * @param appData 
   * @param req 
   * @returns 
   */
  limitToData?: (user: IServerSideTokenDataType, appData: IAppDataType, req: Request) => IBasicDataLimiter | Promise<IBasicDataLimiter>;
  // customizeQuery?: (user: IServerSideTokenDataType, builder: T, req: Express.Request) => void | Promise<void>;
  /**
   * Set to use timeslices specify the range between the slices in order to get statistics
   * based on these slices
   * 
   * setting timeslices will also add a "from" and "to" querystring to the endpoint
   * 
   * the timeslices should be written in the elasticsearch format for its fixed_interval check the documentation for
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-datehistogram-aggregation.html
   * and check fixed_interval or calendar_interval values
   */
  timeslices?: ITimeslicesDescription;
  /**
   * You need to specify a data agregator even if an empty object {} this means you send no data
   * you should specify it to know that you are not providing data otherwise
   */
  dataAggregator: IDataAggregator;
  /**
   * Aggregate users and how commonly they appear
   */
  aggregateUsers?: boolean;
  /**
   * A non-zero number to account when building the buckets for
   * the context information, if not provided it will default to 300
   */
  maxContextsToAccountAtOnce?: number;
  /**
   * Requires aggregateUsers to be set and represents the bucket
   * size limit for the user information, if not provided it will default to 300
   */
  maxUsersToAccountAtOnce?: number;
}

/**
 * Options to expose an analytics endpoint to a client
 * that will provide analytics for a given track, includes track id
 */
export interface IExposeAnalyticsOptions extends IExposeAnalyticsOptionsNoTrack {
  /**
   * The track id which is to be exposed
   */
  trackId: string;
}

/**
 * Options used to create a track for trackig purposes
 */
export interface ITrackOptions {
  /**
   * Whether the track will have information
   * about tracking time slices or simple weights
   */
  timed: boolean;
  /**
   * if the value is teusted then this means only the server
   * side can define these timed tracks or time of valuation
   * 
   * if the value is UNTRUSTED then this means the client side
   * determines the time of activation
   */
  trusted: boolean;
  /**
   * Whether anonymous users can use this track to store
   * anonymous data
   */
  allowAnonymous?: boolean;
  /**
   * Whether this track will store one hit per user or many
   * hits per user with different accumulating weights
   */
  clientWillUpsert?: boolean;
  /**
   * whether this track is exposed, normally you want this to be true
   * unless the track is being used exclusively with server side analytics
   * rather than analyzing user behaviour
   * 
   * A non exposed track simply cannot be used by the client side directly
   * unless is exposed by other means
   */
  exposed: boolean;
  /**
   * All values must have a context specified to them
   * only useful if exposed is true
   */
  clientMustSpecifyContext?: boolean;
  /**
   * All values must have a context specified to them
   * only useful if exposed is true
   */
  clientMustNotSpecifyContext?: boolean;
  /**
   * Whether the user can specify the weight
   * 
   * does not hold in timed requests
   * 
   * only useful if exposed is true
   * only useful if timed is false
   */
  clientCanSpecifyWeight?: boolean;
  /**
   * the tracking limit for trusted timed tracking
   * for this track, defaults to 50, aka how many
   * requests can be tracked at the same time
   * 
   * does not hold in untimed requests
   * 
   * only useful if exposed is true
   * only useful if timed is true
   * only useful if trusted is true
   */
  clientTrustedTrackingLimit?: number;
  /**
   * A data validator for the incoming data, if not provided
   * the track is not allowed to have any data from client providers
   * 
   * @param data 
   * @returns 
   */
  dataValidator?: (data: object, context: string, userData: IServerSideTokenDataType, appData: IAppDataType) => boolean;
  /**
   * If the validation yields true, use this function to extend
   * what data is being stored in the analytics
   * @param data 
   * @param userData 
   * @returns 
   */
  dataEditor?: (data: object, userData: IServerSideTokenDataType, appData: IAppDataType) => Promise<object>;
  /**
   * Use for validating context
   * 
   * it will provide null if no context specified
   * 
   * @param context 
   * @returns 
   */
  contextValidator?: (context: string, userData: IServerSideTokenDataType, appData: IAppDataType) => boolean;
  /**
   * if can specify weight use this to validate a valid weight
   * by default it will provide 1 if no weight specified
   * @param weight 
   * @returns 
   */
  weightValidator?: (weight: number, userData: IServerSideTokenDataType, appData: IAppDataType) => boolean;

  /**
   * Endpoints to be exposed for the given track
   * 
   * This has nothing to do with the capacity of a client to start/stop tracking events
   * but rather the capacity of a client to retrieve information about tracking
   * events in order to build chart statistics in the client side
   */
  clientRetrievableEndpoint?: IExposeAnalyticsOptionsNoTrack[];
}

/**
 * @ignore
 */
const trackRegex = /^[a-z0-9_-]+$/;
/**
 * @ignore
 */
const timezoneRegex = /^([+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/;

/**
 * Options to stop a timetrack event
 */
export interface IAnalyticsTimetrackEndPayload {
  /**
   * The track that is to be used
   */
  track: string;
  /**
   * relating context, you can only track onto
   * one context at a time, including the null
   * context
   */
  context?: string;
}

/**
 * Options to start a timetrack event
 */
export interface IAnalyticsTimetrackStartPayload extends IAnalyticsTimetrackEndPayload {
  /**
   * data related to the track
   */
  data?: any;
  /**
   * timezone where the event occurs
   */
  timezone: string;
}

/**
 * Payload to specify an analytics event
 */
export interface IAnalyticsPayload extends IAnalyticsTimetrackStartPayload {
  /**
 * weight of the hit, if not provided it counts
 * as one
 */
  weight?: number;
  /**
   * time of when the payload is registered
   */
  time?: number;
  /**
   * the time slice that is to be informed
   */
  timeslice?: {
    /**
     * start of slice
     */
    start: number;
    /**
     * end of slice
     */
    end: number;
  }
}

/**
 * @ignore
 */
const validProperties = ["track", "context", "data", "timezone", "weight", "timeslice", "time"];

/**
 * This is the id of the event that comes for an analytics hit
 * they are used for both timetrack (untrusted) and standard hits
 */
export const ANALYTICS_HIT_REQUEST = "$analytics-hit-request";
/**
 * This is the id of the event that comes for an analytics timetrack start
 * trusted event
 */
export const ANALYTICS_TIMETRACK_START_REQUEST = "$analytics-timetrack-start";
/**
 * This is the id of the event that comes for an analytics timetrack end
 * trusted event
 */
export const ANALYTICS_TIMETRACK_END_REQUEST = "$analytics-timetrack-end";

export interface IAnalyticsAnalysisResult {
  [id: string]: number;
}

/**
 * The currency factors provider base class is an interface class that should
 * be extended in order ot provide the proper currency factors
 */
export default class AnalyticsProvider<T, BuilderType, ResponseType> extends ServiceProvider<T> {
  private tracks: { [id: string]: ITrackOptions } = {};
  public elasticClient: Client;

  /**
   * The users that we are currently tracking
   */
  private timedTracking: {
    [userId: string]: {
      [trackId: string]: {
        [contextId: string]: {
          start: Date;
          anonymous: boolean;
          data: any;
          timezone: string;
        }
      }
    }
  } = {};

  /**
   * Stores the endpoints that are used for exposing to the client
   * side in the rest
   */
  private clientRetrievableEndpoints: {
    [endpointPath: string]: IExposeAnalyticsOptions;
  } = {};

  /**
   * Local type I guess, it doesn't matter much when it's a default service
   * @returns the type
   */
  public static getType() {
    return ServiceProviderType.LOCAL;
  }

  constructor(c: T, registry: RegistryService, configs: any, elasticClient: Client) {
    super(c, registry, configs);

    this.elasticClient = elasticClient;

    this.onAnalyticsHit = this.onAnalyticsHit.bind(this);
  }

  /**
   * For a given analytic payload coming from websocket it is validated
   * 
   * @param type 
   * @param data 
   * @param info 
   */
  private validateAnalyticPayload(
    type: "payload" | "timetrack-start" | "timetrack-end",
    data: IAnalyticsPayload | IAnalyticsTimetrackStartPayload | IAnalyticsTimetrackEndPayload,
    info: ICustomListenerInfo,
  ) {
    // if the track isn't a string that's wrong
    if (typeof data.track !== "string" || !this.tracks[data.track]?.exposed) {
      info.listener.emitError(info.socket, "Invalid track provided in analytics request", data);
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "Invalid track provided in analytics request",
      });
    }

    // get the track info now
    const track = this.tracks[data.track];

    // check by the type
    if (type === "payload" || type === "timetrack-start") {
      if (typeof (data as IAnalyticsPayload).data !== "undefined" && (data as IAnalyticsPayload).data !== null) {
        if (typeof (data as IAnalyticsPayload).data !== "object") {
          info.listener.emitError(info.socket, "Invalid data provided in analytics request", data);
          throw new EndpointError({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "Invalid data provided in analytics request",
          });
        }

        if (!track.dataValidator) {
          info.listener.emitError(info.socket, "The track in the request does not support data from clients", data);
          throw new EndpointError({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "The track in the request does not support data from clients",
          });
        }

        if (!track.dataValidator((data as IAnalyticsPayload).data, data.context, info.userData, this.localAppData)) {
          info.listener.emitError(info.socket, "The track has rejected the data", data);
          throw new EndpointError({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "The track has rejected the data",
          });
        }
      }

      if (typeof (data as IAnalyticsPayload).timezone !== "string" || !timezoneRegex.test((data as IAnalyticsPayload).timezone)) {
        info.listener.emitError(info.socket, "Invalid timezone provided in analytics request", data);
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "Invalid timezone provided in analytics request",
        });
      }
    } else {
      if (typeof (data as IAnalyticsPayload).data !== "undefined") {
        info.listener.emitError(info.socket, "Data was provided where it is not supported", data);
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "Data was provided where it is not supported",
        });
      }

      if (typeof (data as IAnalyticsPayload).timezone !== "undefined") {
        info.listener.emitError(info.socket, "Timezone was provided where it is not supported", data);
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "Timezone was provided where it is not supported",
        });
      }
    }

    if (typeof data.context !== "undefined" && data.context !== null && typeof data.context !== "string") {
      info.listener.emitError(info.socket, "Invalid context provided in analytics request", data);
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "Invalid context provided in analytics request",
      });
    }

    if (typeof data.context !== "string" && track.clientMustSpecifyContext) {
      info.listener.emitError(info.socket, "The given track must provide a context", data);
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "The given track must provide a context",
      });
    }

    if (typeof data.context === "string" && track.clientMustNotSpecifyContext) {
      info.listener.emitError(info.socket, "The given track must not provide a context", data);
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "The given track must not provide a context",
      });
    }

    if (typeof data.context === "string" && data.context === "") {
      info.listener.emitError(info.socket, "The context cannot be empty string", data);
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "The context cannot be empty string",
      });
    }

    if (track.contextValidator && !track.contextValidator(data.context, info.userData, this.localAppData)) {
      info.listener.emitError(info.socket, "The context was rejected by the validator", data);
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "The context was rejected by the validator",
      });
    }

    if ((!info.userData || !info.userData.id) && !track.allowAnonymous) {
      info.listener.emitError(info.socket, "The track does not allow for anonymous data", data);
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "The track does not allow for anonymous data",
      });
    }

    if (type === "payload") {
      if (typeof (data as IAnalyticsPayload).timeslice !== "undefined" && (data as IAnalyticsPayload).timeslice !== null) {
        if (track.timed && track.trusted) {
          info.listener.emitError(info.socket, "Track is not an untrusted timed track yet a timeslice was provided", data);
          throw new EndpointError({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "Track is not an untrusted timed track yet a timeslice was provided",
          });
        }
        if (typeof (data as IAnalyticsPayload).timeslice !== "object") {
          info.listener.emitError(info.socket, "Invalid timeslice provided", data);
          throw new EndpointError({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "Invalid timeslice provided",
          });
        }
        if (
          typeof (data as IAnalyticsPayload).timeslice.start !== "number" ||
          (
            data as IAnalyticsPayload).timeslice.start < 0 ||
          isNaN((new Date((data as IAnalyticsPayload).timeslice.start)).getTime()
          )
        ) {
          info.listener.emitError(info.socket, "Invalid timeslice provided (start is not a number, too large, or less than 0)", data);
          throw new EndpointError({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "Invalid timeslice provided (start is not a number, too large, or less than 0)",
          });
        }
        if (
          typeof (data as IAnalyticsPayload).timeslice.end !== "number" ||
          (
            data as IAnalyticsPayload).timeslice.end < (data as IAnalyticsPayload).timeslice.start ||
          isNaN((new Date((data as IAnalyticsPayload).timeslice.end)).getTime()
          )
        ) {
          info.listener.emitError(info.socket, "Invalid timeslice provided (end is not a number, too large, or less than start)", data);
          throw new EndpointError({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "Invalid timeslice provided (end is not a number, too large, or less than start)",
          });
        }
      }

      if (typeof (data as IAnalyticsPayload).time !== "undefined" && (data as IAnalyticsPayload).time !== null) {
        if (track.trusted) {
          info.listener.emitError(info.socket, "Track is a trusted track, yet the time of the hit was specified", data);
          throw new EndpointError({
            code: ENDPOINT_ERRORS.UNSPECIFIED,
            message: "Track is a trusted track, yet the time of the hit was specified",
          });
        }
      }
    } else {
      if (typeof (data as IAnalyticsPayload).timeslice !== "undefined") {
        info.listener.emitError(info.socket, "Timeslice was provided where it is not supported", data);
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "Timeslice was provided where it is not supported",
        });
      }
    }

    if (type === "payload") {
      if (
        (data as IAnalyticsPayload).weight &&
        (data as IAnalyticsPayload).weight !== 1 &&
        !(data as IAnalyticsPayload).timeslice &&
        !track.clientCanSpecifyWeight
      ) {
        info.listener.emitError(info.socket, "Weight is not allowed to be specified by the client", data);
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "Weight is not allowed to be specified by the client",
        });
      }

      const assumedWeight = typeof (data as IAnalyticsPayload).weight === "number" ? (data as IAnalyticsPayload).weight : 1;
      if (track.weightValidator && !track.weightValidator(assumedWeight, info.userData, this.localAppData)) {
        info.listener.emitError(info.socket, "Weight validator rejected a weight of " + assumedWeight, data);
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "Weight validator rejected a weight of " + assumedWeight,
        });
      }
    } else {
      if (typeof (data as IAnalyticsPayload).weight !== "undefined") {
        info.listener.emitError(info.socket, "Weight was provided where it is not supported", data);
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "Weight was provided where it is not supported",
        });
      }
    }

    const allKeys = Object.keys(data);

    for (const key of allKeys) {
      if (!validProperties.includes(key)) {
        info.listener.emitError(info.socket, "unknown property " + JSON.stringify(key), data);
        throw new EndpointError({
          code: ENDPOINT_ERRORS.UNSPECIFIED,
          message: "unknown property " + JSON.stringify(key),
        });
      }
    }
  }

  /**
   * This funciton triggers when an user does an analytics hit request and sends some data
   * it's attached to the websocket
   * 
   * @param data 
   * @param info 
   */
  private async onAnalyticsHit(
    data: IAnalyticsPayload,
    info: ICustomListenerInfo,
  ) {
    // first we validate the payload
    this.validateAnalyticPayload("payload", data, info);

    // now we grab the scoket adddress
    const socketAddr = info.socket.handshake.address;
    const anonymous = !info.userData?.id;

    // and the track
    const track = this.tracks[data.track];

    // let's get the data ad edit the data if we have a function for it
    let newData = data.data;
    if (track.dataEditor) {
      newData = await track.dataEditor(data.data, info.userData, this.localAppData);
    }

    // and now we can do a hit
    // note how we do detach in order to free the websocket
    // which is waiting for an ack reply
    // let it be acked
    (async () => {
      try {
        await this.hit(
          data.track,
          info.userData?.id || AnalyticsProvider.createUserIdFromIp(socketAddr),
          {
            anonymous,
            context: data.context,
            weight: typeof data.weight === "number" ? data.weight : 1,
            data: newData,
            timezone: data.timezone,
            time: data.time ? new Date(data.time) : null,
            trusted: data.time || data.timeslice ? false : true,
            timeSlice: data.timeslice ? {
              start: new Date(data.timeslice.start),
              end: new Date(data.timeslice.end),
            } : null,
          }
        );
      } catch (err) {
        this.logError({
          message: "Failed to perform a hit in a detached analytics hit query",
          className: "AnalyticsProvider",
          data: data,
          methodName: "onAnalyticsHit",
          err,
        });
      }
    })();
  }

  /**
   * Internal function that triggers when the timetrack is requested to start by a client
   * @param data the payload given in the websocket
   * @param info the websocket information
   */
  private onAnalyticsTimeTrackStart(
    data: IAnalyticsTimetrackStartPayload,
    info: ICustomListenerInfo,
  ) {
    this.validateAnalyticPayload("timetrack-start", data, info);

    const socketAddr = info.socket.handshake.address;
    const anonymous = !info.userData?.id;

    try {
      this.startTrackingTrustedTime(
        data.track,
        info.userData?.id || AnalyticsProvider.createUserIdFromIp(socketAddr),
        {
          anonymous,
          context: data.context || null,
          silent: true,
          timezone: data.timezone,
          data: data.data,
        },
      );
    } catch (err) {
      info.listener.emitError(info.socket, err.message, data);
    }
  }

  /**
   * Internal function that triggers when the timetrack is requested to end by a client
   * @param data the payload given by the websocket
   * @param info the websocket information
   */
  private onAnalyticsTimeTrackEnd(
    data: IAnalyticsTimetrackEndPayload,
    info: ICustomListenerInfo,
  ) {
    this.validateAnalyticPayload("timetrack-end", data, info);

    const socketAddr = info.socket.handshake.address;

    try {
      this.stopTrackingTrustedTime(
        data.track,
        info.userData?.id || AnalyticsProvider.createUserIdFromIp(socketAddr),
        {
          context: data.context || null,
          userData: info.userData,
        },
      );
    } catch (err) {
      info.listener.emitError(info.socket, err.message, data);
    }
  }

  /**
   * Standard initialize function
   */
  public initialize(): void {
    // first we register these custom events to the listener
    this.localAppData.listener.registerCustomEventListener(ANALYTICS_HIT_REQUEST, this.onAnalyticsHit.bind(this));
    this.localAppData.listener.registerCustomEventListener(ANALYTICS_TIMETRACK_START_REQUEST, this.onAnalyticsTimeTrackStart.bind(this));
    this.localAppData.listener.registerCustomEventListener(ANALYTICS_TIMETRACK_END_REQUEST, this.onAnalyticsTimeTrackEnd.bind(this));

    // and now we can add a custom disconnect listener
    this.localAppData.listener.addCustomDisconnectEventListener((info) => {
      const socketAddr = info.socket.handshake.address;
      const userId = info.userData?.id;
      const anonId = AnalyticsProvider.createUserIdFromIp(socketAddr);

      // when this happens we want to find all tracks we have created
      // for this user and untrack their trusted time
      // since they are now disconnected
      for (const userIdToUntrack of [userId, anonId]) {
        if (userIdToUntrack && this.timedTracking[userIdToUntrack]) {
          const tracksInUser = Object.keys(this.timedTracking[userIdToUntrack]);
          tracksInUser.forEach((track) => {
            const contextsBeingTrackedInTrack = Object.keys(this.timedTracking[userIdToUntrack][track]);

            contextsBeingTrackedInTrack.forEach((context) => {
              this.stopTrackingTrustedTime(track, userIdToUntrack, {
                context,
                userData: info.userData,
              });
            });
          });
        }
      }
    });
  }

  /**
   * Provides a track information given an id
   * @param id 
   * @returns 
   */
  public getTrackFor(id: string) {
    return this.tracks[id] || null;
  }

  /**
   * Given an user ip address it will create a custom user id
   * for that anonymous user
   * @param ipAddr 
   * @returns 
   */
  public static createUserIdFromIp(ipAddr: string): string {
    return makeIdOutOf(ipAddr);
  }

  /**
   * Should track a hit on an existing track
   * 
   * @param track represent which element is being used to track
   * @param options.weight the weight that is used to track with, expect a positive integer
   * @param options.context a secondary reference within the track, this is used for example with urls
   * 
   * @override
   */
  public async hit(track: string, userId: string, options: {
    weight: number;
    context: string;
    anonymous: boolean;
    data?: any;
    timezone: string;
    time?: Date;
    trusted: boolean;
    timeSlice?: {
      start: Date;
      end: Date;
    }
  }): Promise<void> {
    return null;
  }

  /**
   * Create a new track element for tracking
   * 
   * the track should be able to handle all data forms to put a hit
   * 
   * @param track
   * @override
   */
  public async createTrackIfNotExist(track: string, options: ITrackOptions): Promise<void> {
    return null;
  }

  /**
   * Resolve an aggregation and return a json object
   * that wil be provided to the client
   * 
   * Can also be used in the server side to resolve for a given criteria
   * 
   * @param arg 
   */
  public async resolveAggregation(arg: IResolveAggregationArg): Promise<any> {

  }

  /**
   * should create a track and keep track of it
   * 
   * @param track 
   * @param options 
   */
  public async initializeTrack(track: string, options: ITrackOptions): Promise<void> {
    if (!trackRegex.test(track)) {
      const err = new Error("Invalid track name " + JSON.stringify(track) + " must be a-z0-9_-");
      this.logError({
        message: err.message,
        className: "AnalyticsProvider",
        methodName: "initializeTrack",
        data: {
          track,
          options,
        },
        err: err,
      });
      throw err;
    }

    if (options.clientCanSpecifyWeight && options.timed) {
      const err = new Error("Track is timed yet clientCanSpecifyWeight is true");
      this.logError({
        message: err.message,
        className: "AnalyticsProvider",
        methodName: "initializeTrack",
        data: {
          track,
          options,
        },
        err: err,
      });
      throw err;
    }

    if (options.clientMustNotSpecifyContext && options.clientMustSpecifyContext) {
      const err = new Error("Track has been defined in a contradictory manner where both clientMustNotSpecifyContext and clientMustSpecifyContext are set");
      this.logError({
        message: err.message,
        className: "AnalyticsProvider",
        methodName: "initializeTrack",
        data: {
          track,
          options,
        },
        err: err,
      });
      throw err;
    }

    if (options.weightValidator && !options.timed) {
      const err = new Error("Track is timed yet weightValidator is set");
      this.logError({
        message: err.message,
        className: "AnalyticsProvider",
        methodName: "initializeTrack",
        data: {
          track,
          options,
        },
        err: err,
      });
      throw err;
    }

    if (options.clientTrustedTrackingLimit && options.timed && !options.trusted) {
      const err = new Error("Track is not a trusted timed yet clientTrustedTrackingLimit is set");
      this.logError({
        message: err.message,
        className: "AnalyticsProvider",
        methodName: "initializeTrack",
        data: {
          track,
          options,
        },
        err: err,
      });
      throw err;
    }

    await this.createTrackIfNotExist(track, options);
    this.tracks[track] = options;

    if (options.clientRetrievableEndpoint) {
      options.clientRetrievableEndpoint.forEach((e) => {
        this.addClientRetrievableEndpoint({
          trackId: track,
          ...e,
        });
      });
    }
  }

  /**
   * Use this function to start tracking the trusted time of an user
   * in a given context
   * 
   * Note that this function is specific to a given server and should not
   * be used over different servers, it's meant to be ran over websockets
   * on a dropping connection so the time can stop being tracked
   * 
   * Otherwise you open yourself to memory leaks
   * 
   * @param track 
   * @param userId 
   * @param options 
   */
  public startTrackingTrustedTime(track: string, userId: string, options: {
    context?: string;
    anonymous?: boolean;
    silent?: boolean;
    timezone: string;
    data?: any;
  }) {
    const trackInfo = this.tracks[track];

    if (!trackInfo || (trackInfo.timed && !trackInfo.trusted)) {
      const err = new EndpointError({
        message:
          trackInfo ?
            ("The track at " + track + " is not a trusted track") :
            ("There's no track for " + track),
        code: ENDPOINT_ERRORS.UNSPECIFIED,
      });
      if (!options.silent) {
        this.logError({
          message: err.message,
          className: "AnalyticsProvider",
          methodName: "startTrackingTrustedTime",
          data: {
            track,
            userId,
            options,
          },
          err: err,
        });
      }
      throw err;
    }

    if (!this.timedTracking[userId]) {
      this.timedTracking[userId] = {};
    }

    if (!this.timedTracking[userId][track]) {
      this.timedTracking[userId][track] = {};
    }

    const currentTimedTracksForUserInTrack = Object.keys(this.timedTracking[userId][track]).length;

    if (currentTimedTracksForUserInTrack >= (trackInfo.clientTrustedTrackingLimit || 50)) {
      const message = "Exceeded the security limit of timed tracking requests for the given user at the track";
      const err = new EndpointError({ message, code: ENDPOINT_ERRORS.UNSPECIFIED });
      if (!options.silent) {
        this.logError({
          message,
          className: "AnalyticsProvider",
          methodName: "startTrackingTrustedTime",
          data: {
            track,
            userId,
            options,
            currentTimedTracksForUserInTrack,
          },
          err: err,
        });
      }
      throw err;
    } else if (!this.timedTracking[userId][track][options.context || ""]) {
      this.timedTracking[userId][track][options.context || ""] = {
        anonymous: options.anonymous,
        start: (new Date()),
        data: options.data || null,
        timezone: options.timezone,
      }
    } else {
      const message = "Attemtped to start tracking trusted time, but the timer has already started, this indicates a potential memory leak";
      const err = new EndpointError({ message, code: ENDPOINT_ERRORS.UNSPECIFIED });
      if (!options.silent) {
        this.logError({
          message,
          className: "AnalyticsProvider",
          methodName: "startTrackingTrustedTime",
          data: {
            track,
            userId,
            options,
          },
          err: err,
        });
      }
      throw err;
    }
  }

  /**
   * Stops tracking trusted time for a given user
   * 
   * Note that this function is specific to a given server and should not
   * be used over different servers, it's meant to be ran over websockets
   * on a dropping connection so the time can stop being tracked
   * 
   * Otherwise you open yourself to memory leaks
   * 
   * @param track 
   * @param userId 
   * @param options 
   * @returns 
   */
  public async stopTrackingTrustedTime(track: string, userId: string, options: {
    context?: string;
    userData: IServerSideTokenDataType;
  }) {
    // no track
    if (
      !this.timedTracking[userId] ||
      !this.timedTracking[userId][track] ||
      !this.timedTracking[userId][track][options.context || ""]
    ) {
      const message = "Attemtped to stop tracking trusted time, but the timer was never started, this indicates a potential memory leak";
      const err = new Error(message);
      this.logError({
        message,
        className: "AnalyticsProvider",
        methodName: "stopTrackingTrustedTime",
        data: {
          track,
          userId,
          options,
        },
        err: err,
      });
      return;
    }

    const value = this.timedTracking[userId][track][options.context || ""];
    delete this.timedTracking[userId][track][options.context || ""];

    if (Object.keys(this.timedTracking[userId][track]).length === 0) {
      delete this.timedTracking[userId][track];
    }

    if (Object.keys(this.timedTracking[userId]).length === 0) {
      delete this.timedTracking[userId];
    }

    const stop = (new Date());

    const trackInfo = this.tracks[track];

    let newData = value.data;
    if (trackInfo.dataEditor) {
      newData = await trackInfo.dataEditor(value.data, options.userData, this.localAppData);
    }

    await this.hit(track, userId, {
      weight: Math.round((stop.getTime() - value.start.getTime()) / 1000),
      anonymous: !!value.anonymous,
      context: options.context,
      data: newData,
      timezone: value.timezone,
      trusted: true,
      timeSlice: {
        start: value.start,
        end: stop,
      },
    });
  }

  /**
   * Provides the router for the analytics provider
   * @param appData 
   * @returns 
   */
  public getRouter(appData: IAppDataType) {
    const router = this.expressRouter();

    // the stats info will provide the information
    // for all potential endpoints
    router.get("/stats-info", async (req, res, next) => {
      const userData = await jwtVerifyRequest(appData, req);

      // not a guest and not verified, which means invalid credentials
      if (!userData.verified || userData.info.role !== ADMIN_ROLE) {
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.status(403);
        res.end(JSON.stringify(userData.err));
        return;
      }

      res.setHeader("content-type", "application/json; charset=utf-8");
      res.status(200);
      res.end(JSON.stringify({
        endpoints: Object.keys(this.clientRetrievableEndpoints).map((e) => {
          const clientRetrievableEndpoint = this.clientRetrievableEndpoints[e];
          return {
            trackId: clientRetrievableEndpoint.trackId,
            path: "/rest/service/stats" + (!clientRetrievableEndpoint.endpoint.startsWith("/") ? "/" : "") + clientRetrievableEndpoint.endpoint,
          };
        }),
      }));
    });

    // this endpoint will envertheless provide the given information for the given
    // statistic required
    router.use("/stats", async (req, res, next) => {
      let pathOfTrack = path.normalize(req.path.replace("/rest/service/stats", ""));
      if (!pathOfTrack.startsWith("/")) {
        pathOfTrack = "/" + pathOfTrack;
      }

      const endpointAtPath = this.clientRetrievableEndpoints[pathOfTrack];

      if (!endpointAtPath) {
        next();
        return;
      }

      const userData = await jwtVerifyRequest(appData, req);

      // not a guest and not verified, which means invalid credentials
      if ((!userData.verified && userData.info.role !== GUEST_METAROLE) || !userData.info) {
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.status(400);
        res.end(JSON.stringify(userData.err));
        return;
      }

      if (endpointAtPath.authUserNoGuests && userData.info.role === GUEST_METAROLE) {
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.status(400);
        res.end(JSON.stringify(userData.err));
        return;
      }

      if (endpointAtPath.authUser) {
        const checked = await endpointAtPath.authUser(userData.info, appData, req);

        if (!checked) {
          res.setHeader("content-type", "application/json; charset=utf-8");
          res.status(400);
          res.end(JSON.stringify({
            code: ENDPOINT_ERRORS.FORBIDDEN,
            message: "This resource is not accessible by the given user",
          }));
          return;
        }
      }

      const contextToLimit = endpointAtPath.limitToContext ? await endpointAtPath.limitToContext(userData.info, appData, req) : null;
      const userToLimit = endpointAtPath.limitToUser ? await endpointAtPath.limitToUser(userData.info, appData, req) : null;
      const dataToLimit = endpointAtPath.limitToData ? await endpointAtPath.limitToData(userData.info, appData, req) : null;

      try {
        const from = req.query.from as string;
        const to = req.query.to as string;

        let actualFrom: string = null;
        if (from && typeof from === "string") {
          actualFrom = from;
        }

        let actualTo: string = null;
        if (to && typeof to === "string") {
          actualTo = to;
        }

        const timesliceQueried = req.query.timeslice as string;
        let timeslice: ISingleTimesliceDescription = null;

        if (timesliceQueried) {
          timeslice = endpointAtPath.timeslices[timesliceQueried];

          if (!timeslice) {
            res.setHeader("content-type", "application/json; charset=utf-8");
            res.status(400);
            res.end(JSON.stringify({
              code: ENDPOINT_ERRORS.UNSPECIFIED,
              message: "There is no timeslice with id " + timesliceQueried,
            }));
            return;
          }
        }


        if (timeslice && typeof timeslice.maxsize !== "undefined") {
          if (!actualFrom) {
            res.setHeader("content-type", "application/json; charset=utf-8");
            res.status(400);
            res.end(JSON.stringify({
              code: ENDPOINT_ERRORS.UNSPECIFIED,
              message: "With timeslices enabled with a maxsize the query for from should be defined and passed",
            }));
            return;
          }

          const actualMaxSize = typeof timeslice.maxsize === "string" ? maxSizeIdToNumber[timeslice.maxsize] : timeslice.maxsize;

          // calculate the difference
          const diff = (actualTo ? new Date(actualTo) : new Date()).getTime() - (new Date(actualFrom)).getTime();
          // if the difference is greater than our limit
          if (diff >= actualMaxSize) {
            res.setHeader("content-type", "application/json; charset=utf-8");
            res.status(400);
            res.end(JSON.stringify({
              code: ENDPOINT_ERRORS.UNSPECIFIED,
              message: "The date range from " + actualFrom + " to " + (actualTo || "now") + " is too large for the max size of " +
                actualMaxSize + "ms as the difference is calculated at " + diff + "ms",
            }));
            return;
          }
        }

        // now we can resolve this aggregation
        const result = await this.resolveAggregation({
          trackId: endpointAtPath.trackId,
          req,
          contextToLimit,
          userToLimit,
          dataToLimit,
          dataAggregator: endpointAtPath.dataAggregator,
          timeslices: timeslice,
          timeslicesFrom: actualFrom,
          timeslicesTo: actualTo,
          aggregateUsers: endpointAtPath.aggregateUsers,
          contextMaxSize: endpointAtPath.maxContextsToAccountAtOnce,
          aggregateUsersMaxSize: endpointAtPath.maxUsersToAccountAtOnce,
        });
        res.setHeader("content-type", "application/json; charset=utf-8");
        res.status(200);
        res.end(JSON.stringify(result));
      } catch (err) {
        res.setHeader("content-type", "application/json; charset=utf-8");
        if (err instanceof EndpointError) {
          res.status(400);
          res.end(JSON.stringify(err.data));
        } else {
          this.logError({
            message: "Internal server error while handling response",
            className: "AnalyticsProvider",
            data: {
              pathOfTrack,
            },
            endpoint: req.path,
            err,
            serious: true,
          });
          res.status(500);
          res.end(JSON.stringify({
            code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
          }));
        }
      }
    });
    return router;
  }

  /**
   * Adds an endpoint that a client can access based on expose configurations
   * @param options 
   */
  public async addClientRetrievableEndpoint(options: IExposeAnalyticsOptions) {
    let realEndpoint = options.endpoint;
    if (!realEndpoint.startsWith("/")) {
      realEndpoint = "/" + realEndpoint;
    }
    if (this.clientRetrievableEndpoints[realEndpoint]) {
      throw new Error("Could not register endpoint for " + realEndpoint + " twice as it's already registered");
    }
    this.clientRetrievableEndpoints[realEndpoint] = options;
  }
}
