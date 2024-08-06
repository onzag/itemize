import { Client } from "@elastic/elasticsearch";
import { ServiceProvider, ServiceProviderType } from "..";
import { RegistryService } from "../registry";
import { Router } from "express";
import { IAppDataType } from "../../";
import { IServerSideTokenDataType } from "../../resolvers/basic";

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
  manyHitsPerUser: boolean;
  /**
   * whether this track is exposed, normally you want this to be true
   * unless the track is being used exclusively with server side analytics
   * rather than analyzing user behaviour
   * 
   * A non exposed track simply cannot be used by the client side directly
   * unless is exposed by other means
   */
  exposed: boolean;
}

/**
 * @ignore
 */
const trackRegex = /^[a-zA-Z0-9_-]+$/;

// analytics events
export interface IAnalyticsPayload {
  track: string;
  context?: string;
  data?: any;
  timezone: string;
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

  private onAnalyticsHit(
    data: IAnalyticsPayload,
    userData: IServerSideTokenDataType,
  ) {
    
  }

  public initialize(): void {
    //this.localAppData.listener.addCustomEventListener(ANALYTICS_HIT_REQUEST, this.onAnalyticsHit);
  }

  public getTrackFor(id: string) {
    return this.tracks[id] || null;
  }

  public static createUserIdFromIp(ipAddr: string) {

  }

  /**
   * Should track a hit on an existing track
   * 
   * @param track represent which element is being used to track
   * @param options.weight the weight that is used to track with, expect a positive integer
   * @param options.upsert it will add a new value or update an existing one
   * @param options.context a secondary reference within the track, this is used for example with urls
   * @param options.anonymousUser this hit was caused by an anonymous user
   * 
   * @override
   */
  public async hit(track: string, userId: string, options: {
    weight: number;
    context: string;
    anonymousUser: boolean;
    upsert: boolean;
    data?: any;
    timeSlice?: {
      trusted: boolean;
      start: Date;
      stop: Date;
      timezone: string;
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
    anonymousUser?: boolean;
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
      anonymousUser: !!options.anonymousUser,
      context: options.context,
      upsert: trackInfo.manyHitsPerUser ? false : true,
      data: options.data,
      timeSlice: {
        start: value.start,
        stop,
        timezone: options.timezone,
        trusted: true,
      },
    });
  }
}