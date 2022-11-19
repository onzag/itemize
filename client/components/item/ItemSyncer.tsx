import React, { useRef, useCallback, useEffect, useState, useMemo } from "react";
import type { EndpointErrorType } from "../../../base/errors";
import type { IGQLValue } from "../../../gql-querier";
import CacheWorkerInstance from "../../internal/workers/cache";
import { IActionResponseWithValue, ItemProvider } from "../../providers/item";
import { ModuleProvider } from "../../providers/module";
import { IBaseSyncerHandle, useHandleMechanism } from "../util/BaseSyncer";


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
  setSync?: (state: boolean) => void;
  /**
   * An error may be available if one produced it
   * another reason for a failed sync could be that
   * no storage engine is available at all
   */
  onFailedSync?: (err?: EndpointErrorType) => void;
  onEachLoad?: (id: string, version: string, value: IGQLValue) => void;

  /**
   * allows fallbacks, when the item cannot be loaded because there's no way
   * to save this will load the item anyway at least in memory, it will however
   * not be considered synced
   */
  allowFallback?: boolean;

  /**
   * Normally children are not rendered unless the values are ready, use this in order
   * to render with non-ready values, when that happens values will be null, fallback false
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
  children?: (value: IGQLValue, handle: IBaseSyncerHandle, info: { notReady: boolean, fallback: boolean, id: string, version: string }) => React.ReactNode;
  handle?: IBaseSyncerHandle;
}

/**
 * @param props 
 * @returns 
 */
export default function ItemSyncer(props: IItemSyncerProps) {
  const syncList = useRef([] as string[]);
  const [depsSynced, setDepsSynced] = useState(true);
  const [loaded, setLoaded] = useState({} as { [key: string]: { value: IGQLValue, cached: boolean, loaded: boolean, id: string, version: string } });

  const idsDeduplicated = useMemo(() => {
    return props.ids.filter((v, index) => props.ids.indexOf(v) === index);
  }, [props.ids]);

  // updates the synced state according to whether everything is loaded
  const updateSynced = useCallback(() => {
    const isSync = depsSynced && idsDeduplicated.every((v) => {
      const id = typeof v === "string" ? v : v.id;
      const version = typeof v === "string" ? null : (v.version || null);
      const key = id + "." + (version || "");
      return syncList.current.includes(key);
    });

    props.setSync && props.setSync(isSync);
    props.handle && props.handle.setSync(props.id, isSync);
  }, [idsDeduplicated, props.setSync, depsSynced, syncList, props.handle, props.id]);

  // when one item loads of all of them
  const onLoadedOne = useCallback((id: string, version: string, e: IActionResponseWithValue) => {
    if (!e.error && e.cached) {
      // can't use e.value.id because it could be null and we would get stuck
      const key = id + "." + (version || "");
      syncList.current.push(key);

      console.log("Synced " + props.type +  " from " + props.id + " with id " + id + " and version " + version);

      updateSynced();
    } else {
      const reason = e.cached ? ", not cached" : ", error";
      console.log("Could not sync " + props.type +  " from " + props.id + " with id " + id + " and version " + version + reason);

      // failed to cache
      props.handle && props.handle.onFailedSync(e.error);
      props.onFailedSync(e.error);
    }

    if (props.allowFallback || (!e.error && e.cached)) {
      if (props.onEachLoad) {
        props.onEachLoad(id, version, e.value);
      }

      const newLoaded = {
        ...loaded,
      }
      newLoaded[id] = {
        id: id,
        version: version,
        cached: e.cached,
        value: e.value,
        loaded: true,
      }
      setLoaded(newLoaded);
    }
  }, [syncList, props.onEachLoad, props.handle, props.onFailedSync, updateSynced]);

  // when one of them is set to load
  const onWillLoadOne = useCallback((id: string, version: string) => {
    const key = id + "." + (version || "");
    syncList.current = syncList.current.filter((v) => v !== key);

    const newLoaded = {
      ...loaded,
    }
    newLoaded[id] = {
      id: id,
      version: version,
      cached: false,
      value: null,
      loaded: true,
    }
    setLoaded(newLoaded);

    updateSynced();
  }, [props.setSync, idsDeduplicated, props.handle, depsSynced, updateSynced]);

  // update whenever the ids change, or the dependencies change
  useEffect(() => {
    updateSynced();
  }, [idsDeduplicated, depsSynced]);

  // get the handle mechanism
  const handleMechanism = useHandleMechanism(props.id, props.handle, props.allowFallback, props.onFailedSync, setDepsSynced);

  if (!handleMechanism.ready) {
    return null;
  }

  return (
    <>
      <ModuleProvider module={props.mod}>
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
      </ModuleProvider>
      {props.children && (
        <>
          {Object.keys(loaded).forEach((id) => {
            const value = loaded[id];

            if (props.alwaysRenderChildren || value.loaded) {
              // note that id and version are not guaranteed, and value can be null
              // we are potentially using unversioned fallback
              return <React.Fragment key={id}>{props.children(value.value, handleMechanism.handle, {
                fallback: !value.cached,
                notReady: !value.loaded,
                id: value.id,
                version: value.version,
              })}</React.Fragment>;
            }
          })}
        </>
      )}
    </>
  );
}