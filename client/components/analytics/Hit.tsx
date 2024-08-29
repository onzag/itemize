import type { IAnalyticsPayload } from "../../../server/services/base/AnalyticsProvider";
import { DataContext } from "../../internal/providers/appdata-provider";
import { useContext, useEffect, useRef } from "react";

/**
 * Options to trigger a hit
 */
export interface IHitOptions {
  /**
   * whether the hit is enabled, the hit will only trigger
   * if it's marked as enabled
   */
  enabled: boolean;
  /**
   * the track id, changing the track id will generate a new hit
   */
  trackId: string;
  /**
   * The weight of the hit, changing the weight will not generate
   * a new hit
   */
  weight?: number;
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

/**
 * Represents the hit as a hook
 * @param options 
 * @returns 
 */
export function useHit(options: IHitOptions) {
  const dataCtx = useContext(DataContext);

  // first we declare this thing to see the previous options
  // that we used
  const previousOptionsEffected = useRef<IHitOptions>(null);

  // now we are to use an effect every time our described options
  // that trigger a hit have changed
  useEffect(() => {
    // and we will check that they are good for a new hit
    if (
      options.enabled &&
      (
        !previousOptionsEffected.current ||
        (
          previousOptionsEffected.current.enabled !== options.enabled ||
          previousOptionsEffected.current.context !== options.context ||
          previousOptionsEffected.current.trackId !== options.trackId
        )
      )
    ) {
      // and we get the data, timezone, and build the payload
      const data = (options.dataGenerator && options.dataGenerator()) || null;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const payload: IAnalyticsPayload = {
        timezone,
        track: options.trackId,
        context: options.context || null,
        data,
        weight: options.weight,
      };
      // if it's tracking offline then we set the time ourselves
      if (options.trackOffline) {
        payload.time = (new Date()).getTime();
      }

      // and now we send it to the remote listener our analytics request
      // using the custom event for our analytics provider
      dataCtx.remoteListener.triggerCustomEvent(
        // our event is a analytics hit request
        "$analytics-hit-request",
        payload,
        {
          // the grace time is either Infinity or 3000 depending
          // on if we are offline, if offline it will wait forever
          // and then send that event
          graceTime: options.trackOffline ? Infinity : 3000,
          // survive refresh will make it keep tracking
          // even if the user closes the browser as it will send the hit
          // once the browser is reopened and a conneciton is adquired
          surviveRefresh: options.trackOffline,
        }
      );
    }
    previousOptionsEffected.current = options;
  }, [options.enabled, options.trackId, options.context]);

  return;
}

/**
 * Represents the hit as a component
 * @param options 
 * @returns 
 */
export default function Hit(props: IHitOptions) {
  useHit(props);
  return null;
}