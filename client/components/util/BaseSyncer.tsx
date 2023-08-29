import React, { useRef, useCallback, useEffect, useState, useMemo } from "react";
import type { EndpointErrorType } from "../../../base/errors";
import CacheWorkerInstance from "../../internal/workers/cache";

export interface IBaseSyncerHandle {
  onDismount: (id: string) => void;
  onFailedSync: (err?: EndpointErrorType) => void;
  setSync: (id: string, state: boolean) => void;
}

export interface IBaseSyncerHandleMechanism {
  /**
   * A handle that can be passed to other children
   * syncers
   */
  handle: IBaseSyncerHandle;

  /**
   * Whether it is ready to begin syncing
   */
  ready: boolean;

  /**
   * whether it (self) and the children are already
   * synced, note that this variable may change values quickly and dramatically for example
   * say a syncer managed to sync but with the data retrieved new elements are added to add
   * to the syncing queue, in this sense, it will change drastically and it's not recommended
   * to use this value, use gracefulTreeSynced instead which will try to make up for these
   */
  treeSynced: boolean;

  /**
   * whether it is currently synced except it prevents value flickering by adding a delay
   * the value always starts in a false state
   */
  gracefulTreeSynced: boolean;

  /**
   * Similarly to gracefulTreeSynced but once it syncs for the first time it never goes
   * to an unsynced state, basically specifies whether it has synced at least once
   */
  gracefulTreeHasSynced: boolean;

  /**
   * Whether it is synced up to this level and this level alone, for example in an ItemSyncer
   * this means that all the item data is loaded, in an search syncer that the search has been done
   */
  selfSynced: boolean;

  /**
   * Whether this layer and this layer alone is currently synced and prevents value flickering by adding
   * a delay
   */
  gracefulSelfSynced: boolean;

  /**
   * Similarly to gracefulSelfSynced but once it syncs for the first time it never goes
   * to an unsynced state, basically specifies whether it has synced at least once
   */
  gracefulSelfHasSynced: boolean;

  /**
   * Whether it has failed to synchronize, whether itself or at any children level
   */
  failedSync: boolean;

  /**
   * The error of why it failed to sync, potentially there may be no error, for example
   * if no cache worker is present, it just can't sync
   */
  failedSyncErr?: EndpointErrorType;
}

interface IBaseDependants {
  [id: string]: boolean;
}

export function useHandleMechanism(
  id: string,
  handle: IBaseSyncerHandle,
  allowFallback: boolean,
  synced: boolean,
  failed: boolean,
  err: EndpointErrorType,
): IBaseSyncerHandleMechanism {
  // first get the dependants
  const dependants = useRef({} as IBaseDependants);
  const [ready, setReady] = useState(false);

  const [depsSynced, setDepsSynced] = useState(false);

  const [depsFailedSync, setDepsFailedSync] = useState(false);
  const [depsFailedSyncErr, setDepsFailedSyncErr] = useState(null as EndpointErrorType);

  // the syncing may pop on and off as more items get added to the syncing queue as
  // so this will add a time to make it to avoid this flickering in the synced
  // element
  const [treeSyncedDelayed, setTreeSyncedDelayed] = useState(false);
  const [treeSyncedDelayedOnce, setTreeSyncedDelayedOnce] = useState(false);
  const treeSyncedDelayedTimer = useRef(null as NodeJS.Timer);

  const [selfSyncedDelayed, setSelfSyncedDelayed] = useState(false);
  const [selfSyncedDelayedOnce, setSelfSyncedDelayedOnce] = useState(false);
  const selfSyncedDelayedTimer = useRef(null as NodeJS.Timer);

  // determine if dependants are synced
  const isDepedantsSync = useCallback(() => {
    return Object.keys(dependants.current).every((v) => dependants.current[v])
  }, [dependants]);

  // initial mount effect only
  useEffect(() => {
    // if we allow for fallback then we are ready out of the box
    // otherwise we are only ready if the cache worker instance is supported
    // and we will begin the sync process
    setReady(allowFallback ? true : CacheWorkerInstance.isSupportedAsWorker);

    // if it's not supported we have failed to sync
    // we inform the parent handle
    if (!CacheWorkerInstance.isSupportedAsWorker) {
      if (handle) {
        handle.onFailedSync(null);
      }

      // no error
      setDepsFailedSync(true);
      setDepsSynced(false);
    } else {
      // this will most likely be true to start with
      // as no dependencies may be added yet
      const newDepsSynced = isDepedantsSync();
      setDepsSynced(newDepsSynced);

      if (handle) {
        // only at the start
        handle.setSync(id, depsFailedSync ? false : (newDepsSynced && synced));
        if (failed) {
          handle.onFailedSync(err || null);
        }
      }
    }

    return () => {
      clearTimeout(treeSyncedDelayedTimer.current);
    }
  }, []);

  // on id changing only
  useEffect(() => {
    if (handle) {
      const newDepsSynced = isDepedantsSync();
      handle.setSync(id, depsFailedSync ? false : (newDepsSynced && synced));
      if (failed) {
        handle.onFailedSync(err || null);
      }
    }

    return () => {
      if (handle) {
        handle.onDismount(id);
      }
    }
  }, [id]);

  const selfSynced = depsFailedSync ? false : (depsSynced && synced);
  // on whether it is synced
  useEffect(() => {
    if (handle) {
      handle.setSync(id, selfSynced);
    }
  }, [id, selfSynced]);
  useEffect(() => {
    if (selfSynced !== selfSyncedDelayed) {
      clearTimeout(selfSyncedDelayedTimer.current);
      // will only pop when it's stable
      selfSyncedDelayedTimer.current = setTimeout(() => {
        setSelfSyncedDelayed(selfSynced);
        selfSyncedDelayedTimer.current = null;
      }, 100);

      // it's equal but there's likely a timer trying
      // to change that fact
    } else if (selfSyncedDelayedTimer.current) {
      clearTimeout(selfSyncedDelayedTimer.current);
      selfSyncedDelayedTimer.current = null;
    }
  }, [selfSynced, selfSyncedDelayed]);
  useEffect(() => {
    if (selfSyncedDelayed && !selfSyncedDelayedOnce) {
      setSelfSyncedDelayedOnce(true);
    }
  }, [selfSyncedDelayed, selfSyncedDelayedOnce]);

  // on whether it has failed sync
  useEffect(() => {
    if (failed && handle) {
      handle.onFailedSync(err);
    }
    if (depsFailedSync && handle) {
      handle.onFailedSync(depsFailedSyncErr);
    }
  }, [failed, depsFailedSync, err, depsFailedSyncErr]);

  // on dependency
  useEffect(() => {
    if (handle) {
      handle.setSync(id, depsSynced && synced);
    }
  }, [depsSynced, synced]);

  // synced state but delayed in order to prevent
  // state flickering
  useEffect(() => {
    const state = depsFailedSync ? false : (depsSynced && synced);
    if (state !== treeSyncedDelayed) {
      clearTimeout(treeSyncedDelayedTimer.current);
      // will only pop when it's stable
      treeSyncedDelayedTimer.current = setTimeout(() => {
        setTreeSyncedDelayed(state);
        treeSyncedDelayedTimer.current = null;
      }, 100);

      // it's equal but there's likely a timer trying
      // to change that fact
    } else if (treeSyncedDelayedTimer.current) {
      clearTimeout(treeSyncedDelayedTimer.current);
      treeSyncedDelayedTimer.current = null;
    }
  }, [depsSynced, treeSyncedDelayed, synced]);
  useEffect(() => {
    if (treeSyncedDelayed && !treeSyncedDelayedOnce) {
      setTreeSyncedDelayedOnce(true);
    }
  }, [treeSyncedDelayed, treeSyncedDelayedOnce]);

  // own handle removal
  const handleDismount = useCallback((id: string) => {
    const newD = {
      ...dependants.current,
    };
    delete newD[id];
    dependants.current = newD;
    setDepsSynced(isDepedantsSync());
  }, []);

  // own set sync
  const handleSetSync = useCallback((id: string, state: boolean) => {
    dependants.current = {
      ...dependants.current,
      [id]: state,
    };
    setDepsSynced(isDepedantsSync());
  }, []);

  // own failed sync
  const handleFailedSync = useCallback((err?: EndpointErrorType) => {
    if (handle) {
      handle.onFailedSync(err);
    }
    setDepsFailedSync(true);
    setDepsFailedSyncErr(err);
  }, []);

  // this is the handle that we will pass the children
  const ownHandle = useMemo<IBaseSyncerHandle>(() => {
    return ({
      onDismount: handleDismount,
      onFailedSync: handleFailedSync,
      setSync: handleSetSync,
    });
  }, [handleFailedSync, handleDismount, handleSetSync]);

  return {
    ready,
    handle: ownHandle,
    treeSynced: depsFailedSync ? false : (depsSynced && synced),
    selfSynced: synced,
    gracefulTreeSynced: treeSyncedDelayed,
    gracefulSelfSynced: selfSyncedDelayed,
    gracefulSelfHasSynced: selfSyncedDelayedOnce,
    gracefulTreeHasSynced: treeSyncedDelayedOnce,
    failedSync: failed || depsFailedSync,
    failedSyncErr: err || depsFailedSyncErr,
  }
}

interface IBaseSyncerProps {
  /**
   * unique id
   */
  id: string;

  /**
   * Whether it is itself synced
   * 
   * default to true if not specified
   */
  synced?: boolean;

  /**
   * Whether it itself has failed
   * defaults to false
   */
  failed?: boolean;

  /**
   * The error for why it has failed
   * defaults to null
   */
  failedErr?: EndpointErrorType;

  // /**
  //  * Called whenever the sync state changes
  //  * you should assume true at the start
  //  */
  // setSync?: (state: boolean) => void;
  // /**
  //  * An error may be available if one produced it
  //  * another reason for a failed sync could be that
  //  * no storage engine is available at all
  //  */
  // onFailedSync?: (err?: EndpointErrorType) => void;

  /**
   * allow for fallback if cache worker is not available
   * otherwise it will not load a thing
   */
  allowFallback?: boolean;

  /**
   * Normally children are not rendered unless the values are ready, use this in order
   * to render with non-ready values, when that happens values will be null, fallback false
   */
  alwaysRenderChildren?: boolean;

  /**
   * The handle
   */
  parentHandle?: IBaseSyncerHandle;

  /**
   * children to render
   */
  children?: (handle: IBaseSyncerHandleMechanism) => React.ReactNode;
}

/**
 * A base syncer that loads nothing but it can be used to group other
 * syncers
 * @param props 
 * @returns 
 */
export default function BaseSyncer(props: IBaseSyncerProps): any {
  // because we are not loading anything we pass true as our internally synced value of whatever
  // we are supposed to be loading
  const handleMechanism = useHandleMechanism(
    props.id,
    props.parentHandle,
    props.allowFallback,
    typeof props.synced === "boolean" ? props.synced : true,
    props.failed || false,
    props.failedErr || null,
  );

  if (!handleMechanism.ready && !props.alwaysRenderChildren) {
    return null;
  }

  return props.children(
    handleMechanism
  );
}