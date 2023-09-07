import { useCallback, useEffect, useRef, useState } from "react";
import CacheWorkerInstance from "../../internal/workers/cache";
import { useRootRetriever } from "../root/RootRetriever";
import { IItemStateType } from "../../../base/Root/Module/ItemDefinition";
import type { ICacheStateMetadata } from "../../internal/workers/cache/cache.worker.class";

export interface IOfflineCacheStateLoaderOptions {
  itemOrModule: string;
  id: string;
  version: string;
  disabled?: boolean;
}

export interface ICacheRecord { id: string, version: string, state: IItemStateType, metadata: ICacheStateMetadata };

export interface IOfflineCacheStateLoaderArg {
  loading: boolean;
  unsupported: boolean;
  record: ICacheRecord;
}

export interface IOfflineCacheStateLoaderProps extends IOfflineCacheStateLoaderOptions {
  children: (arg: IOfflineCacheStateLoaderArg) => React.ReactNode;
}

export function useOfflineCacheStateLoader(options: IOfflineCacheStateLoaderOptions) {
  const [ready, setReady] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const [loading, setLoading] = useState(true);

  const [record, setRecord] = useState(null as ICacheRecord);

  const root = useRootRetriever();
  const qualifiedName = root.root.registry[options.itemOrModule].getQualifiedPathName();

  const onShouldUpdate = useCallback((id: string, version: string, state: IItemStateType, metadata: ICacheStateMetadata) => {
    setRecord({
      id,
      metadata,
      state,
      version,
    });
  }, []);

  const recalculate = useCallback(async () => {
    if (!options.disabled) {
      setLoading(true);
      const [state, metadata] = await CacheWorkerInstance.instance.retrieveState(qualifiedName, options.id, options.version);
      setRecord({
        id: options.id,
        version: options.version,
        metadata,
        state,
      });
      setLoading(false);
    } else {
      setRecord(null);
    }
  }, [options.id, qualifiedName, options.disabled]);

  useEffect(() => {
    setReady(CacheWorkerInstance.isSupportedAsWorker);
    if (!CacheWorkerInstance.isSupportedAsWorker) {
      setUnsupported(true);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      !options.disabled && CacheWorkerInstance.instance.addEventListenerToStateChange(qualifiedName, options.id, options.version, onShouldUpdate);
      recalculate();

      return () => {
        !options.disabled && CacheWorkerInstance.instance.removeEventListenerToStateChange(qualifiedName, options.id, options.version, onShouldUpdate);
      }
    }
  }, [ready, recalculate, options.id, qualifiedName, options.disabled]);

  return {
    loading,
    unsupported,
    record,
  }
}

export default function OfflineCacheStateLoader(props: IOfflineCacheStateLoaderProps) {
  const state = useOfflineCacheStateLoader(props);
  const child = props.children(state);
  return child;
}

