import React, { useRef, useCallback, useEffect, useState, useMemo } from "react";
import type { EndpointErrorType } from "../../../base/errors";
import type { IGQLValue } from "../../../gql-querier";
import CacheWorkerInstance from "../../internal/workers/cache";
import { IActionResponseWithValue, ItemProvider } from "../../providers/item";
import { ModuleProvider } from "../../providers/module";
import { IBaseSyncerHandle, IBaseSyncerHandleMechanism, useHandleMechanism } from "../util/BaseSyncer";


interface IItemSyncerProps {
  /**
   * an unique identifier for this syncer handler
   * could be anything as long as it's unique
   */
  id: string;
  ids: Array<string | { id: string, version: string }>;
  type: string;
  mod: string;
  properties: string[];
  loadUnversionedFallback?: boolean;

  /**
   * allows fallbacks, when the item cannot be loaded because there's no way
   * to save this will load the item anyway at least in memory, it will however
   * not be considered synced
   */
  allowFallback?: boolean;

  /**
   * Normally children are not rendered unless the values are ready, use this in order
   * to render with non-ready values, when that happens values will be null
   */
  alwaysRenderChildren?: boolean;

  /**
   * whether static or not
   */
  static?: "NO_LISTENING" | "TOTAL";

  /**
   * avoid marking for destruction on logout, by default the application tree will be removed
   */
  doNotMarkForDestruction?: boolean;

  /**
   * This children is a function that will be run against each one
   * of the loaded values, you get things raw in order to improve
   * efficiency
   */
  children?: (values: ILoadedValue[], handle: IBaseSyncerHandleMechanism) => React.ReactNode;
  parentHandle?: IBaseSyncerHandle;
  disabled?: boolean;
}

export interface ILoadedValue {
  value: IGQLValue,
  cached: boolean,
  loaded: boolean,
  id: string,
  version: string,
  fallback: boolean,
};

/**
 * @param props 
 * @returns 
 */
export default function ItemSyncer(props: IItemSyncerProps) {
  // what is loaded
  const [loaded, setLoaded] = useState({} as { [key: string]: ILoadedValue });
  const [failed, setFailed] = useState(null as EndpointErrorType);

  // get the handle mechanism
  const handleMechanism = useHandleMechanism(
    props.id,
    props.parentHandle,
    props.allowFallback,

    // for this to be considered synced every element has to be loaded
    Object.keys(loaded).every((k) => loaded[k].loaded && loaded[k].cached),
    !!failed,
    failed,
  );

  // the ids we are supposed to load for
  const idsDeduplicated = useMemo(() => {
    return props.ids.filter((v, index) => props.ids.indexOf(v) === index);
  }, [props.ids]);

  // when one item loads of all of them
  const onLoadedOne = useCallback((id: string, version: string, e: IActionResponseWithValue) => {
    if (!e.error && e.cached) {
      // can't use e.value.id because it could be null and we would get stuck
      console.log("Synced " + props.type + " from " + props.id + " with id " + id + " and version " + version);
    } else {
      const reason = e.cached ? ", not cached" : ", error";
      console.log("Could not sync " + props.type + " from " + props.id + " with id " + id + " and version " + version + reason);
      console.log(e);
    }

    // if we allowed fallback it means we did not use the cache worker
    // for syncing so it will not be cached
    if (!e.error && (props.allowFallback || e.cached)) {
      // and update this state
      const newLoaded = {
        ...loaded,
      }
      newLoaded[id] = {
        id: id,
        version: version,
        cached: e.cached,
        value: e.value,
        loaded: true,
        fallback: !e.cached,
      }
      setLoaded(newLoaded);
    } else {
      setFailed(e.error);
    }
  }, [loaded]);

  // when one of them is set to load
  const onWillLoadOne = useCallback((id: string, version: string) => {
    const key = id + "." + (version || "");
    const newLoaded = {
      ...loaded,
    }
    newLoaded[key] = {
      id: id,
      version: version,
      cached: false,
      value: null,
      loaded: false,
      fallback: false,
    }
    setLoaded(newLoaded);
  }, [loaded]);

  if (!handleMechanism.ready) {
    if (props.alwaysRenderChildren) {
      return (
        <>
          {null}
          {props.children ? (
            props.children(
              [],
              handleMechanism,
            )
          ) : null}
        </>
      )
    }
    return null;
  }

  return (
    <>
      {props.disabled ? null : <ModuleProvider module={props.mod}>
        {
          idsDeduplicated.map((f) => {
            const id = typeof f === "string" ? f : f.id;
            const version = typeof f === "string" ? null : (f.version || null);
            const key = id + "." + (version || "");
            return (
              <ItemProvider
                forId={id}
                forVersion={version}
                longTermCaching={true}
                itemDefinition={props.type}
                properties={props.properties}
                waitAndMerge={true}
                onWillLoad={onWillLoadOne.bind(null, id, version)}
                onLoad={onLoadedOne.bind(null, id, version)}
                static={props.static}
                markForDestructionOnLogout={props.doNotMarkForDestruction ? false : true}
                loadUnversionedFallback={props.loadUnversionedFallback}
                key={key}
              />
            );
          })
        }
      </ModuleProvider>}
      {props.children ? (
        props.children(
          Object.keys(loaded).filter((v) => loaded[v].loaded).map((v) => loaded[v]),
          handleMechanism,
        )
      ) : null}
    </>
  );
}