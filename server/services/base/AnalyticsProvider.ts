import { Client } from "@elastic/elasticsearch";
import { ServiceProvider, ServiceProviderType } from "..";
import { RegistryService } from "../registry";
import { Router } from "express";
import { IAppDataType } from "../../";
import { IServerSideTokenDataType } from "../../resolvers/basic";
import { ICustomListenerInfo } from "../../listener";
import uuidv5 from "uuid/v5";
import { EndpointError } from "../../../base/errors";
import { ENDPOINT_ERRORS } from "../../../constants";

const NAMESPACE = "23ab4609-df49-5fdf-921b-4714adb284f3";
export function makeIdOutOf(str: string) {
  return "ANON" + uuidv5(str, NAMESPACE).replace(/-/g, "");
}


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
  allowAnonymous: boolean;
  /**
   * Whether this track will store one hit per user or many
   * hits per user with different accumulating weights
   */
  clientWillUpsert: boolean;
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
   */
  clientMustSpecifyContext?: boolean;
  /**
   * All values must have a context specified to them
   */
  clientMustNotSpecifyContext?: boolean;
  /**
   * Whether the user can specify the weight
   * 
   * does not hold in timed requests
   */
  clientCanSpecifyWeight?: boolean;
  /**
   * the tracking limit for trusted timed tracking
   * for this track, defaults to 50
   * 
   * does not hold in untimed requests
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
}

/**
 * @ignore
 */
const trackRegex = /^[a-z0-9_-]+$/;
const timezoneRegex = /^([+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/;

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

// analytics events
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

export const ANALYTICS_HIT_REQUEST = "$analytics-hit-request";
export const ANALYTICS_TIMETRACK_START_REQUEST = "$analytics-timetrack-start";
export const ANALYTICS_TIMETRACK_END_REQUEST = "$analytics-timetrack-end";

export interface IAnalyticsAnalysisResult {
  [id: string]: number;
}

/**
 * The currency factors provider base class is an interface class that should
 * be extended in order ot provide the proper currency factors
 */
export default class AnalyticsProvider<T> extends ServiceProvider<T> {
  private tracks: { [id: string]: ITrackOptions } = {};
  public elasticClient: Client;

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

  public static getType() {
    return ServiceProviderType.GLOBAL;
  }

  /**
   * Provides a list of all the context and their popularity ranking
   * 
   * @override
   * @param filters 
   * @returns 
   */
  public async getMostPopularContexts(trackId: string, filters: {
    userId?: string;
    anonymous?: boolean;
    size?: number;
    leastPopular?: boolean;
  }): Promise<IAnalyticsAnalysisResult> {
    return null;
  }

  /**
   * Provides the specified context and its given added weight
   * 
   * @override
   * @param filters 
   * @returns 
   */
  public async getContextTotalWeight(trackId: string, context: string, filters: {
    userId?: string;
    anonymous?: boolean;
  }): Promise<number> {
    return null;
  }

  /**
   * Provides the aggregate data for the given context with the provided information
   * 
   * @override
   * @param filters 
   * @returns 
   */
  public async getAggregateDataForContext(trackId: string, context: string, filters: {
    userId?: string;
    anonymous?: boolean;
  }): Promise<number> {
    return null;
  }

  constructor(c: T, registry: RegistryService, configs: any, elasticClient: Client) {
    super(c, registry, configs);

    this.elasticClient = elasticClient;

    this.onAnalyticsHit = this.onAnalyticsHit.bind(this);
  }

  private validateAnalyticPayload(
    type: "payload" | "timetrack-start" | "timetrack-end",
    data: IAnalyticsPayload | IAnalyticsTimetrackStartPayload | IAnalyticsTimetrackEndPayload,
    info: ICustomListenerInfo,
  ) {
    if (typeof data.track !== "string" || !this.tracks[data.track]?.exposed) {
      info.listener.emitError(info.socket, "Invalid track provided in analytics request", data);
      throw new EndpointError({
        code: ENDPOINT_ERRORS.UNSPECIFIED,
        message: "Invalid track provided in analytics request",
      });
    }

    const track = this.tracks[data.track];

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

  private async onAnalyticsHit(
    data: IAnalyticsPayload,
    info: ICustomListenerInfo,
  ) {
    this.validateAnalyticPayload("payload", data, info);

    const socketAddr = info.socket.handshake.address;
    const anonymous = !info.userData?.id;

    const track = this.tracks[data.track];

    let newData = data.data;
    if (track.dataEditor) {
      newData = await track.dataEditor(data.data, info.userData, this.localAppData);
    }

    this.hit(
      data.track,
      info.userData?.id || AnalyticsProvider.createUserIdFromIp(socketAddr),
      {
        anonymous,
        context: data.context,
        upsert: track.clientWillUpsert,
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
    )
  }

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

  public initialize(): void {
    this.localAppData.listener.registerCustomEventListener(ANALYTICS_HIT_REQUEST, this.onAnalyticsHit.bind(this));
    this.localAppData.listener.registerCustomEventListener(ANALYTICS_TIMETRACK_START_REQUEST, this.onAnalyticsTimeTrackStart.bind(this));
    this.localAppData.listener.registerCustomEventListener(ANALYTICS_TIMETRACK_END_REQUEST, this.onAnalyticsTimeTrackEnd.bind(this));
    this.localAppData.listener.addCustomDisconnectEventListener((info) => {
      const socketAddr = info.socket.handshake.address;
      const userId = info.userData?.id;
      const anonId = AnalyticsProvider.createUserIdFromIp(socketAddr);

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

  public getTrackFor(id: string) {
    return this.tracks[id] || null;
  }

  public static createUserIdFromIp(ipAddr: string): string {
    return makeIdOutOf(ipAddr);
  }

  /**
   * Should track a hit on an existing track
   * 
   * @param track represent which element is being used to track
   * @param options.weight the weight that is used to track with, expect a positive integer
   * @param options.upsert it will add a new value or update an existing one
   * @param options.context a secondary reference within the track, this is used for example with urls
   * 
   * @override
   */
  public async hit(track: string, userId: string, options: {
    weight: number;
    context: string;
    upsert: boolean;
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
      const err = new EndpointError({message, code: ENDPOINT_ERRORS.UNSPECIFIED});
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
      const err = new EndpointError({message, code: ENDPOINT_ERRORS.UNSPECIFIED});
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
      upsert: trackInfo.clientWillUpsert,
      data: newData,
      timezone: value.timezone,
      trusted: true,
      timeSlice: {
        start: value.start,
        end: stop,
      },
    });
  }
}
