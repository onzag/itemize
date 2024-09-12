import uuid from "uuid";
import type { IAnalyticsPayload, IAnalyticsTimetrackEndPayload, IAnalyticsTimetrackStartPayload } from "../../../server/services/base/AnalyticsProvider";
import { DataContext } from "../../internal/providers/appdata-provider";
import { useCallback, useContext, useEffect, useRef } from "react";
import { getCurrentTimeZoneOffset } from "./util";
import { useUserDataRetriever } from "../user/UserDataRetriever";

/**
 * Options to trigger a timetrack
 */
export interface ITimetrackOptions {
  /**
   * the track id, changing the track id will generate a new hit
   */
  trackId: string;
  /**
   * The data generator of the hit, changing the data generator will not generate
   * a new hit
   */
  dataGenerator?: () => object;
  /**
   * The context of the hit, changing the context will generate a new hit
   */
  context?: string;
  /**
   * if the track supports untrusted, you may specify this so it's able to track
   * offline hits
   */
  trackOffline?: boolean;
}

export interface ITimetrackProps extends ITimetrackOptions {
  /**
   * whether the hit is enabled, the hit will only trigger
   * if it's marked as enabled
   */
  enabled: boolean;
  /**
   * Allows to track anonymous users
   */
  trackAnonymous?: boolean;
}

/**
 * Represents the hit as a hook
 * @param options 
 * @returns 
 */
export function useTimetrack(): [(options: ITimetrackOptions) => void, () => void] {
  const dataCtx = useContext(DataContext);

  // first we declare this thing to see the previous options
  // that we used
  const previousOptionsTracked = useRef<ITimetrackOptions>(null);
  const offlineTrackInterval = useRef<NodeJS.Timeout>(null);
  const offlineTrackId = useRef<string>(null);

  // stops the track at the given last tracked options
  const stopLastTrack = useCallback(() => {
    if (previousOptionsTracked.current) {
      // if we are not meant to track offline which means the server
      // side is the one measuring time and making it trusted
      if (!previousOptionsTracked.current.trackOffline) {
        // get the track and the context
        const payload: IAnalyticsTimetrackEndPayload = {
          track: previousOptionsTracked.current.trackId,
          context: previousOptionsTracked.current.context,
        };
        // trigger the event to tell it to stop the track
        dataCtx.remoteListener.triggerCustomEvent(
          "$analytics-timetrack-end",
          payload,
          {
            graceTime: 10000,
          }
        );
      } else {
        // otherwise it's offline we stop the interval we were updating the event
        // for
        clearInterval(offlineTrackInterval.current);
        // and now we just execute the thing
        dataCtx.remoteListener.executeCustomEvent(offlineTrackId.current, {
          graceTime: 10000,
        });
      }

      previousOptionsTracked.current = null;
    }
  }, []);

  const startTrack = useCallback((options: ITimetrackOptions) => {
    stopLastTrack();

    // if we are not tracking offline simple, we send our data
    if (!options.trackOffline) {
      // grab the stuff
      const data = (options.dataGenerator && options.dataGenerator()) || null;
      const timezone = getCurrentTimeZoneOffset();
      const payload: IAnalyticsTimetrackStartPayload = {
        timezone,
        track: options.trackId,
        context: options.context || null,
        data,
      };

      // send the payload
      dataCtx.remoteListener.triggerCustomEvent(
        "$analytics-timetrack-start",
        payload,
        {
          graceTime: 3000,
        }
      );
    } else {
      // otherwise we also started an offline track
      // make a new id for that offline
      const newId = uuid.v4();
      // this is when we started tracking
      const timetrackStartedAt = (new Date()).getTime();

      // and in each 10s interval we will update the event
      // with new data, this will go to local storage
      offlineTrackInterval.current = setInterval(() => {
        // we will be updating all the time
        const data = (options.dataGenerator && options.dataGenerator()) || null;
        const timezone = getCurrentTimeZoneOffset();
        const currentTime = (new Date()).getTime();
        // make our payload with the timeslice
        const payload: IAnalyticsPayload = {
          timezone,
          track: options.trackId,
          context: options.context || null,
          data,
          time: currentTime,
          timeslice: {
            start: timetrackStartedAt,
            end: currentTime,
          },
          weight: Math.round((currentTime - timetrackStartedAt) / 1000),
        };
        // and then queing or updating the custom event
        dataCtx.remoteListener.queueCustomEvent(newId, "$analytics-hit-request", payload, {
          // we make it that it survives refresh and make ready when storing
          // so it's executed automagically once
          // the browser is refreshed and we don't need to grab custom id events
          surviveRefresh: true,
          makeReadyWhenStoring: true,
        });
      }, 10000);
      offlineTrackId.current = newId;
    }

    previousOptionsTracked.current = options;
  }, []);

  // now for an unmount effect
  useEffect(() => {
    return () => {
      stopLastTrack();
    }
  }, []);

  return [startTrack, stopLastTrack];
}

/**
 * Prevent timetracks on the same track and same context to overlap
 */
const GLOBAL_TRACK_CONTEXT_POOL: {
  [trackId: string]: {
    [context: string]: number
  }
} = {};

/**
 * Represents the timetrack as a component
 * 
 * this component has the special property of prevent overlapping tracks within the same context
 * so they will not interfere with one another
 * 
 * @param options 
 * @returns 
 */
export default function Timetrack(props: ITimetrackProps) {
  const [startTrack, stopLastTrack] = useTimetrack();

  const userData = useUserDataRetriever();

  const previousOptionsEffected = useRef<ITimetrackProps>(null);
  const previousRealEnabledEffected = useRef<boolean>(null);

  const realEnabled = props.enabled && (props.trackAnonymous ? true : !!userData.id);

    // now we are to use an effect every time our described options
  // that trigger a hit have changed
  useEffect(() => {
    // so we will check just like when we do the hit
    if (
      realEnabled &&
      (
        !previousOptionsEffected.current ||
        (
          previousRealEnabledEffected.current !== realEnabled ||
          previousOptionsEffected.current.context !== props.context ||
          previousOptionsEffected.current.trackId !== props.trackId
        )
      )
    ) {
      const rawCtx = props.context || "";
      if (!GLOBAL_TRACK_CONTEXT_POOL[props.trackId]) {
        GLOBAL_TRACK_CONTEXT_POOL[props.trackId] = {};
      }
      if (!GLOBAL_TRACK_CONTEXT_POOL[props.trackId][rawCtx]) {
        GLOBAL_TRACK_CONTEXT_POOL[props.trackId][rawCtx] = 0;
      }

      if (!GLOBAL_TRACK_CONTEXT_POOL[props.trackId][rawCtx]) {
        startTrack(props);
      }
      GLOBAL_TRACK_CONTEXT_POOL[props.trackId][rawCtx]++;
    }

    // if we started one and we had one that we were tracking for
    // already in this same settings, well, we stop that one
    if (!realEnabled && previousOptionsEffected && previousOptionsEffected.current) {
      const rawOldCtx = previousOptionsEffected.current.context || "";
      if (
        GLOBAL_TRACK_CONTEXT_POOL[previousOptionsEffected.current.trackId] &&
        GLOBAL_TRACK_CONTEXT_POOL[previousOptionsEffected.current.trackId][rawOldCtx]
      ) {
        GLOBAL_TRACK_CONTEXT_POOL[previousOptionsEffected.current.trackId][rawOldCtx]--;
        if (!GLOBAL_TRACK_CONTEXT_POOL[previousOptionsEffected.current.trackId][rawOldCtx]) {
          stopLastTrack();
        }
      } else {
        stopLastTrack();
      }
    }

    // now we set our previously effected
    previousOptionsEffected.current = props;
    previousRealEnabledEffected.current = realEnabled;
  }, [realEnabled, props.trackId, props.context]);

  return null;
}