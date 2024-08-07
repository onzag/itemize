import { Client } from "@elastic/elasticsearch";
import { ServiceProvider, ServiceProviderType } from "..";
import { RegistryService } from "../registry";
import { Router } from "express";
import { IAppDataType } from "../../";
import { IServerSideTokenDataType } from "../../resolvers/basic";
import { ICustomListenerInfo } from "../../listener";
import uuidv5 from "uuid/v5";

const NAMESPACE = "23ab4609-df49-5fdf-921b-4714adb284f3";
export function makeIdOutOf(str: string) {
  return "ANON" + uuidv5(str, NAMESPACE).replace(/-/g, "");
}

export enum TrackTimedStatus {
  /**
   * This track does not track time
   */
  NO = "NO",
  /**
   * This track tracks time but only using server side
   * values
   */
  TRUSTED = "TRUSTED",
  /**
   * This track tracks client side provided time
   */
  UNTRUSTED = "UNTRUSTED",
}


export interface ITrackOptions {
  /**
   * Whether the track will have information
   * about tracking time slices or simple weights
   * 
   * if the value is TRUSTED then this means only the server
   * side can define these timed tracks
   * 
   * if the value is UNTRUSTED then this means the client side
   * determines the values of the timed tracks
   */
  timed: "NO" | "TRUSTED" | "UNTRUSTED";
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
  clientMustSpecifyContext: boolean;
  /**
   * All values must have a context specified to them
   */
  clientMustNotSpecifyContext: boolean;
  /**
   * Whether the user can specify the weight
   */
  clientCanSpecifyWeight: boolean;
  /**
   * A data validator for the incoming data, if not provided
   * the track is not allowed to have any data from client providers
   * 
   * @param data 
   * @returns 
   */
  dataValidator?: (data: any) => boolean;
  /**
   * Use for validating context
   * 
   * it will provide null if no context specified
   * 
   * @param context 
   * @returns 
   */
  contextValidator?: (context: string) => boolean;
  /**
   * if can specify weight use this to validate a valid weight
   * by default it will provide 1 if no weight specified
   * @param weight 
   * @returns 
   */
  weightValidator?: (weight: number) => boolean;
}

/**
 * @ignore
 */
const trackRegex = /^[a-zA-Z0-9_-]+$/;
const timezoneRegex = /^(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])$/;

// analytics events
export interface IAnalyticsPayload {
  track: string;
  context?: string;
  data?: any;
  timezone: string;
  weight?: number;
  timeslice?: {
    start: number;
    end: number;
  }
}

export const ANALYTICS_HIT_REQUEST = "$analytics-hit-request";
export const ANALYTICS_TIMETRACK_START_REQUEST = "$analytics-timetrack-start";
export const ANALYTICS_TIMETRACK_END_REQUEST = "$analytics-timetrack-end";
export const ANALYTICS_TIMETRACK_INFORM_REQUEST = "$analytics-timetrack-inform";

/**
 * The currency factors provider base class is an interface class that should
 * be extended in order ot provide the proper currency factors
 */
export default class AnalyticsProvider<T> extends ServiceProvider<T> {
  private tracks: { [id: string]: ITrackOptions } = {};
  private elasticClient: Client;

  private timedTracking: {
    [userId: string]: {
      [contextId: string]: {
        start: Date;
        anonymous: boolean;
      }
    }
  } = {};

  public static getType() {
    return ServiceProviderType.GLOBAL;
  }

  constructor(c: T, registry: RegistryService, configs: any, elasticClient: Client) {
    super(c, registry, configs);

    this.elasticClient = elasticClient;

    //this.onAnalyticsHit = this.onAnalyticsHit.bind(this);
  }

  private validateAnalyticPayload(
    data: IAnalyticsPayload,
    info: ICustomListenerInfo,
  ): boolean {
    if (typeof data.track !== "string" || !this.tracks[data.track]?.exposed) {
      info.listener.emitError(info.socket, "Invalid track provided in analytics request", data);
      return false;
    }

    const track = this.tracks[data.track];

    if (typeof data.data !== "undefined" && data.data !== null) {
      if (typeof data.data !== "object") {
        info.listener.emitError(info.socket, "Invalid data provided in analytics request", data);
        return false;
      }

      if (!track.dataValidator) {
        info.listener.emitError(info.socket, "The track in the request does not support data from clients", data);
        return false;
      }

      if (!track.dataValidator(data.data)) {
        info.listener.emitError(info.socket, "The track has rejected the data", data);
        return false;
      }
    }

    if (typeof data.timezone !== "string" || !timezoneRegex.test(data.timezone)) {
      info.listener.emitError(info.socket, "Invalid timezone provided in analytics request", data);
      return false;
    }

    if (typeof data.context !== "undefined" && data.context !== null && typeof data.context !== "string") {
      info.listener.emitError(info.socket, "Invalid context provided in analytics request", data);
      return false;
    }

    if (typeof data.context !== "string" && track.clientMustSpecifyContext) {
      info.listener.emitError(info.socket, "The given track must provide a context", data);
      return false;
    }

    if (typeof data.context === "string" && track.clientMustNotSpecifyContext) {
      info.listener.emitError(info.socket, "The given track must not provide a context", data);
      return false;
    }

    if (track.contextValidator && !track.contextValidator(data.context)) {
      info.listener.emitError(info.socket, "The context was rejected by the validator", data);
      return false;
    }

    if ((!info.userData || !info.userData.id) && !track.allowAnonymous) {
      info.listener.emitError(info.socket, "The track does not allow for anonymous data", data);
      return false;
    }

    if (typeof data.timeslice !== "undefined" && data.timeslice !== null) {
      if (track.timed !== "UNTRUSTED") {
        info.listener.emitError(info.socket, "Track is not an untrusted timed track yet a timeslice was provided", data);
        return false;
      }
      if (typeof data.timeslice !== "object") {
        info.listener.emitError(info.socket, "Invalid timeslice provided", data);
        return false;
      }
      if (typeof data.timeslice.start !== "number" || data.timeslice.start < 0 || isNaN((new Date(data.timeslice.start)).getTime())) {
        info.listener.emitError(info.socket, "Invalid timeslice provided (start is not a number, too large, or less than 0)", data);
        return false;
      }
      if (typeof data.timeslice.end !== "number" || data.timeslice.end < data.timeslice.start || isNaN((new Date(data.timeslice.end)).getTime())) {
        info.listener.emitError(info.socket, "Invalid timeslice provided (end is not a number, too large, or less than start)", data);
        return false;
      }
    }

    if (typeof data.weight !== "undefined" && data.weight !== null && typeof data.weight !== "number") {
      info.listener.emitError(info.socket, "Invalid weight provided in analytics request", data);
      return false;
    }

    if (data.weight && data.weight !== 1 && !track.clientCanSpecifyWeight) {
      info.listener.emitError(info.socket, "Weight is not allowed to be specified by the client", data);
      return false;
    }

    const assumedWeight = typeof data.weight === "number" ? data.weight : 1;
    if (!track.weightValidator(assumedWeight)) {
      info.listener.emitError(info.socket, "Weight validator rejected a weight of " + assumedWeight, data);
      return false;
    }

    return true;
  }

  private onAnalyticsHit(
    data: IAnalyticsPayload,
    info: ICustomListenerInfo,
  ) {
    if (!this.validateAnalyticPayload(data, info)) {
      return;
    }

    const socketAddr = info.socket.handshake.address;
    const anonymous = !info.userData?.id;

    const track = this.tracks[data.track];

    this.hit(
      data.track,
      info.userData?.id || AnalyticsProvider.createUserIdFromIp(socketAddr),
      {
        anonymous,
        context: data.context,
        upsert: track.clientWillUpsert,
        weight: typeof data.weight === "number" ? data.weight : 1,
        data: data.data,
        timezone: data.timezone,
        timeSlice: data.timeslice ? {
          trusted: false,
          start: new Date(data.timeslice.start),
          end: new Date(data.timeslice.end),
        } : null,
      }
    )
  }

  public initialize(): void {
    this.localAppData.listener.registerCustomEventListener(ANALYTICS_HIT_REQUEST, this.onAnalyticsHit);
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
    timeSlice?: {
      trusted: boolean;
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
      const err = new Error("Invalid track name " + JSON.stringify(track) + " must be A-Za-z0-9_-");
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
    anonymousUser?: boolean;
  }) {
    const trackInfo = this.tracks[track];

    if (!trackInfo || trackInfo.timed !== TrackTimedStatus.TRUSTED) {
      const err = new Error(
        trackInfo.timed !== TrackTimedStatus.TRUSTED ?
          ("The track at " + track + " is not a trusted track") :
          ("There's no track for " + track)
      );
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
      throw err;
    }

    if (!this.timedTracking[userId]) {
      this.timedTracking[userId] = {};
    }
    if (!this.timedTracking[userId][options.context || ""]) {
      this.timedTracking[userId][options.context || ""] = {
        anonymous: options.anonymousUser,
        start: (new Date()),
      }
    } else {
      const message = "Attemtped to start tracking trusted time, but the timer was never started, this indicates a potential memory leak";
      const err = new Error(message);
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
    anonymous?: boolean;
    timezone: string;
    data: any;
  }) {
    // no track
    if (!this.timedTracking[userId] || !this.timedTracking[userId][options.context || ""]) {
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

    const value = this.timedTracking[userId][options.context || ""];
    delete this.timedTracking[userId][options.context || ""];

    if (Object.keys(this.timedTracking[userId]).length === 0) {
      delete this.timedTracking[userId];
    }

    const stop = (new Date());

    const trackInfo = this.tracks[track];

    await this.hit(track, userId, {
      weight: stop.getTime() - value.start.getTime(),
      anonymous: !!options.anonymous,
      context: options.context,
      upsert: trackInfo.clientWillUpsert,
      data: options.data,
      timezone: options.timezone,
      timeSlice: {
        start: value.start,
        end: stop,
        trusted: true,
      },
    });
  }
}