import { useCallback, useEffect, useRef, useState } from "react";
import CacheWorkerInstance from "../../internal/workers/cache";
import { useRootRetriever } from "../root/RootRetriever";
import { IItemStateType } from "../../../base/Root/Module/ItemDefinition";
import type { ICacheStateMetadata } from "../../internal/workers/cache/cache.worker";

export interface IOfflineCacheStatesLoaderOptions {
  itemOrModule: string;
  id: string;
}

export interface ICacheRecord {id: string, version: string, state: IItemStateType, metadata: ICacheStateMetadata};

export interface IOfflineCacheStatesLoaderProps extends IOfflineCacheStatesLoaderOptions {
  children: (loading: boolean, records: ICacheRecord[]) => React.ReactNode;
}

export function useOfflineCacheStatesLoader(options: IOfflineCacheStatesLoaderOptions) {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const [records, setRecords] = useState([] as ICacheRecord[]);
  const recordsRef = useRef([...records]);

  const root = useRootRetriever();
  const qualifiedName = root.root.registry[options.itemOrModule].getQualifiedPathName();

  const onShouldUpdate = useCallback((id: string, version: string, state: IItemStateType, metadata: ICacheStateMetadata) => {
    const existingValueIndex = recordsRef.current.findIndex((v) => v.id === id && v.version === version);
    if (existingValueIndex !== -1) {
      if (state === null) {
        recordsRef.current.splice(existingValueIndex, 1);
      } else {
        recordsRef.current[existingValueIndex] = {
          id,
          version,
          state,
          metadata,
        };
      }
    } else {
      recordsRef.current.push({
        id,
        version,
        state,
        metadata,
      });
    }

    setRecords([...recordsRef.current]);
  }, []);

  const recalculate = useCallback(async () => {
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
  }, [options.id, qualifiedName]);

  useEffect(() => {
    setReady(CacheWorkerInstance.isSupported);
  }, []);

  useEffect(() => {
    if (ready) {
      CacheWorkerInstance.instance.addUnversionedEventListenerToStateChange(qualifiedName, options.id, onShouldUpdate);
      recalculate();

      return () => {
        CacheWorkerInstance.instance.removeUnversionedEventListenerToStateChange(qualifiedName, options.id, onShouldUpdate);
      }
    }
  }, [ready, recalculate, options.id, qualifiedName]);

  return {
    loading,
    records,
  }
}

export default function OfflineCacheStatesLoader(props: IOfflineCacheStatesLoaderProps) {
  const state = useOfflineCacheStatesLoader(props);
  const child = props.children(state.loading, state.records);
  return child;
}

