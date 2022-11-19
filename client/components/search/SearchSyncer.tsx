import React, { useRef, useCallback, useEffect, useState } from "react";
import type { EndpointErrorType } from "../../../base/errors";
import type { IGQLValue } from "../../../gql-querier";
import CacheWorkerInstance from "../../internal/workers/cache";
import { IActionResponseWithSearchResults, IActionSearchOptions, ItemProvider } from "../../providers/item";
import { ModuleProvider } from "../../providers/module";
import { IBaseSyncerHandle, useHandleMechanism } from "../util/BaseSyncer";
import { IPropertySetterProps } from "../property/base";

interface ISearchSyncerProps {
  id: string;
  /**
   * Options will be passed to automatic search
   * you should use a cache policy for this
   * and do not filter, if you do filter while
   * all the results will be retrieved by the cache
   * not all the results will be passed for the context
   * 
   * required
   * cachePolicy and not none
   * cacheDoNotFallback in order to avoid doing a standard request, see allowTraditionalFallback to force it
   * 
   * some options that you should probably use here
   * cacheNoLimitOffset so that the limit offset doesn't apply and you get all the results regardless of the limit offset
   * 
   * some options here that are useful
   * allowTraditionalFallback in order to make a traditional request based on the search that will resolve anyway but not sync
   * this occurs when the cache is not supported
   */
  search: IActionSearchOptions;
  /**
   * for the item provider
 * Setters for setting values for the properties within the item definition
 * itself, useful not to depend on mounting at time
 */
  setters?: IPropertySetterProps[];
  /**
   * for the item provider
   * only downloads and includes the properties specified in the list
   * in the state
   */
  properties?: string[];
  /**
   * for the item provider
   * only includes the items specified in the list in the state
   */
  includes?: { [include: string]: string[] };

  /**
   * The item definition type, not required as you may do
   * module search
   */
  type?: string;
  /**
   * The module
   */
  mod: string;

  /**
   * This will make it so that the search is executed as a traditional search if there's no way
   * to execute it otherwise (as in no way to save the search results is available) so that you
   * can still use them, however it will be considered not synced and the non sync functions
   * will trigger, the fallback flag will be set to true
   */
  allowTraditionalFallback?: boolean;
  handle?: IBaseSyncerHandle;
  setSync?: (state: boolean) => void;
  onFailedSync?: (err: EndpointErrorType) => void;
  onBulkLoad?: (values: IGQLValue[]) => void;

  /**
   * Normally children are not rendered unless the values are ready, use this in order
   * to render with non-ready values, when that happens values will be null, fallback false
   */
  alwaysRenderChildren?: boolean;

  /**
   * The children once the values are loaded and cached, if you get the fallback flag
   * as true this means that they were not actually cached and these values are just fallback
   * which is a good sign not to keep chaining providers as they will all not sync
   */
  children?: (values: IGQLValue[], handle: IBaseSyncerHandle, info: {fallback: boolean, notReady: boolean}) => React.ReactNode;
}

// buggy typescript I must return any because it's buggy
export default function SearchSyncer(props: ISearchSyncerProps): any {
  const [depsSynced, setDepsSynced] = useState(true);
  const [selfSynced, setSelfSynced] = useState(true);
  const [selfSearchResults, setSelfSearchResults] = useState(null as IGQLValue[]);
  const [selfUsedFallback, setSelfUsedFallback] = useState(false);
  const handleMechanism = useHandleMechanism(props.id, props.handle, props.allowTraditionalFallback, props.onFailedSync, setDepsSynced);

  useEffect(() => {
    props.setSync && props.setSync(depsSynced && selfSynced);
    props.handle && props.handle.setSync(props.id, depsSynced && selfSynced);
  }, [props.setSync, depsSynced, selfSynced]);

  const onWillSearch = useCallback(() => {
    setSelfSynced(false);
  }, []);

  const onSearch = useCallback((data: IActionResponseWithSearchResults) => {
    // we sync
    setSelfSynced(!data.error && data.cached);

    if (!data.error && data.cached) {
      console.log("Synced search for " + (props.type || props.mod) +  " from " + props.id + " with " + data.count + " results");
    } else {
      const reason = data.cached ? " not cached" : " error";
      console.log("Could not sync " + (props.type || props.mod) +  " from " + props.id + " with " + data.count + " results," + reason);
    }

    // if we allow or we are synced
    if (props.allowTraditionalFallback || (!data.error && data.cached)) {
      // grab the results and send them
      const results = data.results;
      props.onBulkLoad && props.onBulkLoad(results);
      setSelfSearchResults(data.results);
      if (!data.cached) {
        setSelfUsedFallback(true);
      }
    }
  }, [props.allowTraditionalFallback, props.onBulkLoad]);

  if (!props.search.cachePolicy) {
    throw new Error("You should use a cache policy for the search syncer, set cachePolicy in the automatic search options");
  }

  if (!props.search.cacheDoNotFallback) {
    throw new Error("The cache search syncer needs to be in non-fallback mode " +
    " set cacheDoNotFallback in the automatic search options, use forceTraditionalFallback to force a fallback");
  }

  let searchArgs = props.search;

  if (props.allowTraditionalFallback) {
    searchArgs = {
      ...searchArgs,
      traditional: true,
      cacheDoNotFallback: false,
    }
  }

  if (!handleMechanism.ready) {
    if (props.alwaysRenderChildren && props.children) {
      return props.children([], handleMechanism.handle, {fallback: false, notReady: true});
    }
    return null;
  }

  let children: React.ReactNode = null;
  if ((selfSearchResults || props.alwaysRenderChildren) && props.children) {
    children = props.children(selfSearchResults || [], handleMechanism.handle, {fallback: selfUsedFallback, notReady: !selfSearchResults})
  }

  return (
    <>
      <ModuleProvider module={props.mod}>
        <ItemProvider
          itemDefinition={props.type}
          searchCounterpart={true}
          setters={props.setters}
          properties={props.properties}
          includes={props.includes}
          automaticSearch={props.search}
          automaticSearchInstant={true}
          automaticSearchForce={true}
          automaticSearchNoGraceTime={true}
          onWillSearch={onWillSearch}
          onSearch={onSearch}
        />
      </ModuleProvider>
      {children}
    </>
  )
}