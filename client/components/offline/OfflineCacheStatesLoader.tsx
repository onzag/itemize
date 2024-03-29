import { useCallback, useEffect, useRef, useState } from "react";
import CacheWorkerInstance from "../../internal/workers/cache";
import { useRootRetriever } from "../root/RootRetriever";
import { IItemStateType } from "../../../base/Root/Module/ItemDefinition";
import type { ICacheStateMetadata } from "../../internal/workers/cache/cache.worker.class";

export interface IOfflineCacheStatesLoaderOptions {
  itemOrModule: string;
  id: string;
  disabled?: boolean;
}

export interface ICacheRecord { id: string, version: string, state: IItemStateType, metadata: ICacheStateMetadata };

export interface IOfflineCacheStatesLoaderArg {
  loading: boolean;
  unsupported: boolean;
  records: ICacheRecord[];
}

export interface IOfflineCacheStatesLoaderProps extends IOfflineCacheStatesLoaderOptions {
  children: (arg: IOfflineCacheStatesLoaderArg) => React.ReactNode;
}

export function useOfflineCacheStatesLoader(options: IOfflineCacheStatesLoaderOptions) {
  const [ready, setReady] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [loading, setLoading] = useState(true);

  const [records, setRecords] = useState([] as ICacheRecord[]);
  const recordsRef = useRef([...records]);

  const root = useRootRetriever();
  const qualifiedName = root.root.registry[options.itemOrModule].getQualifiedPathName();

  const onShouldUpdate = useCallback((id: string, version: string, state: IItemStateType, metadata: ICacheStateMetadata) => {
    const existingValueIndex = recordsRef.current.findIndex((v) => v.id === id && v.version === version);
    let changed: boolean = false;
    if (existingValueIndex !== -1) {
      if (state === null) {
        recordsRef.current.splice(existingValueIndex, 1);
        changed = true;
      } else {
        recordsRef.current[existingValueIndex] = {
          id,
          version,
          state,
          metadata,
        };
        changed = true;
      }
    } else if (state !== null) {
      recordsRef.current.push({
        id,
        version,
        state,
        metadata,
      });
      changed = true;
    }

    if (changed) {
      setRecords([...recordsRef.current]);
    }
  }, []);

  const recalculate = useCallback(async () => {
    if (!options.disabled) {
      setLoading(true);
      const unversionedStateList = await CacheWorkerInstance.instance.retrieveUnversionedStateList(qualifiedName, options.id);
      const values = await Promise.all(unversionedStateList.map(async (v) => {
        const [state, metadata] = await CacheWorkerInstance.instance.retrieveState(qualifiedName, v.id, v.version);
        return {
          id: v.id,
          version: v.version,
          state,
          metadata,
        }
      }));
      recordsRef.current = [...values];
      setRecords(values);
      setLoading(false);
    } else {
      recordsRef.current = [];
      setRecords([]);
    }
  }, [options.id, options.disabled, qualifiedName]);

  useEffect(() => {
    setReady(CacheWorkerInstance.isSupportedAsWorker);
    if (!CacheWorkerInstance.isSupportedAsWorker) {
      setUnsupported(true);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      !options.disabled && CacheWorkerInstance.instance.addUnversionedEventListenerToStateChange(qualifiedName, options.id, onShouldUpdate);
      recalculate();

      return () => {
        !options.disabled && CacheWorkerInstance.instance.removeUnversionedEventListenerToStateChange(qualifiedName, options.id, onShouldUpdate);
      }
    }
  }, [ready, recalculate, options.id, options.disabled, qualifiedName]);

  return {
    loading,
    unsupported,
    records,
  }
}

export default function OfflineCacheStatesLoader(props: IOfflineCacheStatesLoaderProps) {
  const state = useOfflineCacheStatesLoader(props);
  const child = props.children(state);
  return child;
}

