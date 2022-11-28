import React, { useRef, useCallback, useEffect, useState, useMemo } from "react";
import type { EndpointErrorType } from "../../../base/errors";
import type { IGQLValue } from "../../../gql-querier";
import CacheWorkerInstance from "../../internal/workers/cache";
import { IActionResponseWithValue, ItemProvider } from "../../providers/item";
import { ModuleProvider } from "../../providers/module";

export interface IBaseSyncerHandle {
  onMount: (id: string) => void;
  onDismount: (id: string,) => void;
  onFailedSync: (err?: EndpointErrorType) => void;
  setSync: (id: string, state: boolean) => void;
}

interface IBaseDependants {
  [id: string]: boolean;
}

export function useHandleMechanism(
  id: string,
  handle: IBaseSyncerHandle,
  allowFallback: boolean,
  onFailedSync: (err?: EndpointErrorType) => void,
  setSynced: (synced?: boolean) => void,
) {
  const dependants = useRef({} as IBaseDependants);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (handle) {
      handle.onMount(id);
    }

    return () => {
      if (handle) {
        handle.onDismount(id);
      }
    }
  }, []);

  useEffect(() => {
    setReady(allowFallback ? true : CacheWorkerInstance.isSupported);

    if (!CacheWorkerInstance.isSupported) {
      if (handle) {
        handle.onFailedSync();
      }
      onFailedSync && onFailedSync();
    }
  }, []);

  const isDepedantsSync = useCallback(() => {
    return Object.keys(dependants.current).every((v) => dependants.current[v])
  }, [dependants]);

  // own handle creation
  const handleMount = useCallback((id: string) => {
    dependants.current = {
      ...dependants.current,
      [id]: true,
    };
    setSynced && setSynced(isDepedantsSync());
  }, [setSynced]);

  const handleDismount = useCallback((id: string) => {
    const newD = {
      ...dependants.current,
    };
    delete newD[id];
    dependants.current = newD;
    setSynced && setSynced(isDepedantsSync());
  }, [setSynced]);

  const handleSetSync = useCallback((id: string) => {
    dependants.current = {
      ...dependants.current,
      [id]: true,
    };
    setSynced && setSynced(isDepedantsSync());
  }, [setSynced]);

  const handleFailedSync = useCallback(() => {
    if (handle) {
      handle.onFailedSync();
    }
    onFailedSync && onFailedSync();
  }, [setSynced]);

  const ownHandle = useMemo<IBaseSyncerHandle>(() => {
    return ({
      onMount: handleMount,
      onDismount: handleDismount,
      onFailedSync: handleFailedSync,
      setSync: handleSetSync,
    });
  }, [onFailedSync, handleMount, handleDismount, handleSetSync]);

  return {
    ready,
    handle: ownHandle,
  }
}

interface IBaseSyncerProps {
  /**
   * unique id
   */
  id: string;

  /**
   * Called whenever the sync state changes
   * you should assume true at the start
   */
  setSync?: (state: boolean) => void;
  /**
   * An error may be available if one produced it
   * another reason for a failed sync could be that
   * no storage engine is available at all
   */
  onFailedSync?: (err?: EndpointErrorType) => void;

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
  handle?: IBaseSyncerHandle;

  /**
   * children to render
   */
  children?: (handle: IBaseSyncerHandle) => React.ReactNode;
}

/**
 * A base syncer that loads nothing but it can be used to group other
 * syncers
 * @param props 
 * @returns 
 */
export default function BaseSyncer(props: IBaseSyncerProps): any {
  // buggy typescript forces to return any, it won't accept anything else it's just buggy
  const handleMechanism = useHandleMechanism(props.id, props.handle, props.allowFallback, props.onFailedSync, props.setSync);

  if (!handleMechanism.ready) {
    if (props.alwaysRenderChildren) {
      return props.children(handleMechanism.handle);
    }
    return null;
  }

  return props.children(handleMechanism.handle);
}