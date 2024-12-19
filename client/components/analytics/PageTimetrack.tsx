import { Location } from "history";
import { useLocationRetriever } from "../navigation/LocationRetriever";
import Timetrack, { useFunctionalTimetrack } from "./Timetrack";
import { genericAnalyticsDataProvider } from "./util";
import React from "react";

export interface IPageTimetrackProps {
  enabled: boolean;
  /**
   * The track where the time track is to be stored
   * please ensure that there's a viable timed track
   * in the given trackid in the server side
   */
  trackId: string;
  /**
   * the data generator to use, in the case of the paged timed track it will use
   * the generic analytics data provider by default if none is provided, set it to null if otherwise
   * required to make empty
   * 
   * @returns 
   */
  dataGenerator?: () => object;
  /**
   * Track offline at this track
   */
  trackOffline?: boolean;
  /**
   * Track both online and offline, the string specifies
   * the track where it is going to be tracked
   */
  trackOfflineAtTrack?: string;
  /**
   * Allows to track anonymous users
   */
  trackAnonymous?: boolean;
  /**
   * By default the context will be the location.pathname + location.search
   * you may change if you want otherwise
   * 
   * @param location 
   * @returns 
   */
  locationContextGenerator?: (location: Location) => string;
}

/**
 * Tracks the time spent in a given page
 * 
 * @param props 
 * @returns 
 */
export default function PageTimetrack(props: IPageTimetrackProps) {
  const location = useLocationRetriever();

  const context = props.locationContextGenerator ? props.locationContextGenerator(location) : (location.pathname + location.search);
  const dataGenerator = typeof props.dataGenerator === "undefined" ? genericAnalyticsDataProvider : props.dataGenerator;
  return (
    <>
      <Timetrack
        enabled={props.enabled}
        trackId={props.trackId}
        context={context}
        dataGenerator={dataGenerator}
        trackOffline={props.trackOffline}
        trackAnonymous={props.trackAnonymous}
      />
      {props.trackOfflineAtTrack ? (
        <Timetrack
          enabled={props.enabled}
          trackId={props.trackOfflineAtTrack}
          context={context}
          dataGenerator={dataGenerator}
          trackOffline={true}
          trackAnonymous={props.trackAnonymous}
        />
      ) : null}
    </>
  );
}

export function usePageTimeTrack(options: IPageTimetrackProps) {
  const location = useLocationRetriever();

  const context = options.locationContextGenerator ? options.locationContextGenerator(location) : (location.pathname + location.search);
  const dataGenerator = typeof options.dataGenerator === "undefined" ? genericAnalyticsDataProvider : options.dataGenerator;

  useFunctionalTimetrack({
    ...options,
    dataGenerator,
    context,
  });

  useFunctionalTimetrack({
    ...options,
    dataGenerator,
    context,
    enabled: options.enabled && !!options.trackOfflineAtTrack,
  });
}