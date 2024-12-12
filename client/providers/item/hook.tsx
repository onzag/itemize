import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IActionResponseWithValue, IActionSearchOptions, IBasicFns, IItemProviderProps, IPokeElementsType, SearchItemValueContext } from ".";
import { useRootRetriever } from "../../components/root/RootRetriever";
import type Module from "../../../base/Root/Module";
import ItemDefinition, { IItemSearchStateType, IItemStateType } from "../../../base/Root/Module/ItemDefinition";
import { IPropertyBaseProps } from "../../components/property/base";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { ENDPOINT_ERRORS, MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION, PREFIX_GET, RESERVED_BASE_PROPERTIES_RQ, SEARCH_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION } from "../../../constants";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import {
  getFieldsAndArgs, runGetQueryFor, runDeleteQueryFor, runEditQueryFor, runAddQueryFor, runSearchQueryFor, IIncludeOverride,
  IPropertyOverride, ICacheMetadataMismatchAction, ISearchCacheMetadataMismatchAction, reprocessQueryArgumentsForFiles, getPropertyListForSearchMode, SearchCacheMetadataMismatchActionFn, getPropertyListDefault
} from "../../internal/rq-client-util";
import { requestFieldsAreContained } from "../../../rq-util";
import { ICacheMetadataMatchType } from "../../../client/internal/workers/cache/cache.worker.class";
import CacheWorkerInstance from "../../../client/internal/workers/cache";
import equals from "deep-equal";
import { DataContext } from "../../../client/internal/providers/appdata-provider";
import { EndpointErrorType } from "../../../base/errors";
import uuid from "uuid";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { useLocationRetriever } from "../../../client/components/navigation/LocationRetriever";
import { TokenContext } from "../../../client/internal/providers/token-provider";
import { LocaleContext } from "../../../client/internal/providers/locale-provider";
import { ConfigContext } from "../../../client/internal/providers/config-provider";
import { blockCleanup, changeListener, changeSearchListener, didUpdate, dismissSearchResults, downloadStateAt, getDerived, installPrefills, installSetters, loadListener, loadStateFromFileAt, loadValue, onConnectStatusChange, onMount, onPropertyRestore, onSearchReload, reloadListener, setStateToCurrentValueWithExternalChecking, setupInitialState, setupListeners, willUnmount } from "./util";
import { IRemoteListenerRecordsCallbackArg } from "../../../client/internal/app/remote-listener";
import { genericAnalyticsDataProvider } from "../../../client/components/analytics/util";
import { IPropertyCoreProps, IPropertySetterProps } from "../../components/property/base";

export interface IItemProviderOptions extends Omit<IItemProviderProps, 'mountId'> {
  module: string | Module;
}

export interface IPropertyBasePropsWInclude extends IPropertyBaseProps {
  include: string | Include;
}

export class SSRError extends Error {
  public resolveServerSideState: () => Promise<void>;

  constructor(resolve: () => Promise<void>) {
    super("SSRError");

    this.resolveServerSideState = resolve;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, SSRError.prototype);
  }
}

export interface IHookItemProviderState extends IItemSearchStateType {
  searchWasRestored: "NO" | "FROM_STATE" | "FROM_LOCATION";
  itemState: IItemStateType;
  isBlocked: boolean;
  isBlockedButDataIsAccessible: boolean;
  notFound: boolean;
  loadError: EndpointErrorType;
  loading: boolean;
  loaded: boolean;
  submitError: EndpointErrorType;
  submitting: boolean;
  submitted: boolean;
  deleteError: EndpointErrorType;
  deleting: boolean;
  deleted: boolean;
  pokedElements: IPokeElementsType;
}

export interface IItemProviderHookElement {
  state: IHookItemProviderState;
  getStateForProperty<T>(pId: string | IPropertyBasePropsWInclude): IPropertyDefinitionState<T>;
  getValueForProperty<T>(pId: string | IPropertyBasePropsWInclude): T;
}


export function useItemProvider(options: IItemProviderOptions): IItemProviderHookElement {
  // getting the root and other context information
  const root = useRootRetriever();
  const mod = typeof options.module === "string" ? root.root.registry[options.module] as Module : options.module;

  const searchContext = useContext(SearchItemValueContext);
  const dataContext = useContext(DataContext);
  const config = useContext(ConfigContext);
  const localeData = useContext(LocaleContext);
  const tokenData = useContext(TokenContext);
  const location = useLocationRetriever();

  // first necessary functions
  // getting the item definition
  const idef: ItemDefinition = useMemo(() => {
    let idef: ItemDefinition = null;
    if (typeof options.itemDefinition === "string") {
      if (options.itemDefinition) {
        if (options.itemDefinition.startsWith("MOD_") && options.itemDefinition.includes("IDEF")) {
          idef = mod.getParentRoot().registry[options.itemDefinition] as ItemDefinition;
        } else {
          idef = mod.getItemDefinitionFor(options.itemDefinition.split("/"))
        }
      } else {
        idef = mod.getPropExtensionItemDefinition();
      }
    } else {
      idef = options.itemDefinition;
    }

    return idef;
  }, [options.itemDefinition, mod]);

  // EMULATE of state and setState as well as derived state
  const [stateBase, setStateBase] = useState<IHookItemProviderState>(
    () => setupInitialState(idef, options),
  );
  const derived = getDerived(idef, location, options, stateBase);
  const state = derived ? {
    ...stateBase,
    ...derived,
  } : stateBase;

  const cbRef = useRef<() => void>(null);
  useEffect(() => {
    if (cbRef.current) {
      cbRef.current();
      cbRef.current = null;
    }
  }, [state]);
  const setState = useCallback((newState: Partial<IHookItemProviderState>, cb?: () => void) => {
    if (cb) {
      if (cbRef.current) {
        const oldCb = cbRef.current;
        cbRef.current = () => {
          oldCb();
          cb();
        };
      } else {
        cbRef.current = cb;
      }
    }
    setStateBase({
      ...state,
      ...newState,
    });
  }, [state]);

  // NOW THAT WE KNOW THE INITIAL STATE WE CAN CHECK THE REQUEST MANAGER
  // AND THROW THE ERROR IN CASE OF SSR
  if (root.root.hasRequestManager()) {
    if (
      idef.isInSearchMode() &&
      options.automaticSearch
    ) {
      // cheesy way to get to the root
      const id = options.forId || null;
      const version = options.forVersion || null;
      if (root.root.needsRequestManagerSearch(idef, id, version, options.automaticSearch)) {
        throw new SSRError(async () => {
          return root.root.callRequestManagerSearch(idef, id, version, options.automaticSearch);
        });
      }
    } else if (
      state.loaded ||
      options.forId === null ||
      idef.isInSearchMode() ||
      idef.isExtensionsInstance() ||
      options.avoidLoading
    ) {
      // PASS;
    } else {
      const id = options.forId;
      const version = options.forVersion || null;

      const { requestFields } = getFieldsAndArgs({
        includeArgs: false,
        includeFields: true,
        includes: options.includes || {},
        properties: getPropertyListDefault(options.properties),
        itemDefinitionInstance: idef,
        forId: id,
        forVersion: version,
      });

      // let's check if what we have loaded this already as part of the search records
      // we have loaded, when there are search records this mean that the search loader
      // will have loaded these results in the state
      if (
        searchContext &&
        searchContext.searchRecords &&
        searchContext.searchRecords.find(
          (s) =>
            s.id === id &&
            s.version === version &&
            s.type === idef.getQualifiedPathName(),
        ) &&
        requestFieldsAreContained(requestFields, searchContext.searchFields)
      ) {
        // no need to load they are already in memory and the collector
        return null;
      }

      // cheesy way to get to the root
      if (root.root.needsRequestManager(idef, id, version, requestFields)) {
        throw new SSRError(async () => {
          await root.root.callRequestManager(
            idef,
            id,
            version,
            requestFields,
          );
        });
      }
    }
  }


  // alwyas up to date options and state
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const stateRef = useRef(state);
  stateRef.current = state;
  const idefRef = useRef(idef);
  idefRef.current = idef;
  const setStateRef = useRef(setState);
  setStateRef.current = setState;
  const tokenDataRef = useRef(tokenData);
  tokenDataRef.current = tokenData;
  const locationRef = useRef(location);
  locationRef.current = location;
  const localeDataRef = useRef(localeData);
  localeDataRef.current = localeData;

  // refs
  // unlike the class this is used as reference, so it is always needed
  const internalUUIDRef = useRef(uuid.v4());
  const blockIdCleanRef = useRef(null as string);
  const isUnmountedRef = useRef(false);
  const isCMountedRef = useRef(false);
  const mountCbsRef = useRef([] as Array<() => void>);
  const repairCorruptionTimeoutRef = useRef(null as NodeJS.Timer);
  const reloadListenerTimeoutRef = useRef(null as NodeJS.Timer);
  const updateTimeoutRef = useRef(null as NodeJS.Timer);
  const automaticSearchTimeoutRef = useRef(null as NodeJS.Timer);
  const lastLoadingForIdRef = useRef(null as string);
  const lastLoadingForVersionRef = useRef(null as string);
  const lastLoadValuePromiseIsResolvedRef = useRef(true);
  const lastLoadValuePromiseRef = useRef(null as Promise<void>);
  const lastLoadValuePromiseResolveRef = useRef(null as () => void);
  const changedSearchListenerLastCollectedSearchIdRef = useRef(null as { id: string });
  const preventSearchFeedbackOnPossibleStaleDataRef = useRef(false);
  const submitBlockPromisesRef = useRef([] as Array<Promise<any>>);
  const reloadNextSearchRef = useRef(false);
  const initialAutomaticNextSearchRef = useRef(false);
  const lastUpdateIdRef = useRef<number>();
  const storeStateTimeoutRef = useRef(null as NodeJS.Timer);
  const internalSearchDestructionMarkersRef = useRef<Array<[string, string, string, [string, string, string], [string, string]]>>([]);
  const consumableQsStateRef = useRef(null as any);
  const consumeQsStateTimeoutRef = useRef(null as NodeJS.Timer);

  // functions
  const reloadListenerHook = useCallback(() => {
    reloadListener(
      idefRef.current,
      optionsRef.current,
      isCMountedRef.current,
      mountCbsRef,
      reloadListenerHook,
      reloadListenerTimeoutRef,
      loadValueHook,
    )
  }, []);

  const changeListenerHook = useCallback((repairCorruption?: boolean) => {
    changeListener(
      idefRef.current,
      optionsRef.current,
      setStateRef.current,
      isUnmountedRef,
      isCMountedRef,
      mountCbsRef,
      repairCorruptionTimeoutRef,
      lastLoadValuePromiseIsResolvedRef.current,
      lastLoadValuePromiseRef.current,
      changeListenerHook,
      reloadListenerHook,
      repairCorruption,
    );
  }, []);

  const loadListenerHook = useCallback(async () => {
    return await loadListener(
      idefRef.current,
      optionsRef.current,
      stateRef.current,
      setStateRef.current,
      isUnmountedRef,
      isCMountedRef,
      mountCbsRef,
      changeListenerHook,
      loadListenerHook,
    );
  }, []);

  const changeSearchListenerHook = useCallback(async () => {
    changeSearchListener(
      idefRef.current,
      optionsRef.current,
      changedSearchListenerLastCollectedSearchIdRef,
      mountCbsRef,
      isUnmountedRef.current,
      isCMountedRef.current,
      changeSearchListenerHook,
      setStateRef.current,
    );
  }, []);

  const onSearchReloadHook = useCallback(async (arg: IRemoteListenerRecordsCallbackArg) => {
    return await onSearchReload(
      idefRef.current,
      stateRef.current,
      preventSearchFeedbackOnPossibleStaleDataRef,
      reloadNextSearchRef,
      searchHook,
      arg,
    );
  }, []);

  const dismissSearchResultsHook = useCallback(() => {
    return dismissSearchResults(
      idefRef.current,
      dataContext.remoteListener,
      stateRef.current,
      setStateRef.current,
      isUnmountedRef.current,
      onSearchReloadHook,
    );
  }, []);

  const poke = useCallback((elements: IPokeElementsType) => {
    if (isUnmountedRef.current) {
      return;
    }

    setStateRef.current({
      pokedElements: elements,
    });
  }, []);

  const unpoke = useCallback(() => {
    if (isUnmountedRef.current) {
      return;
    }
    setStateRef.current({
      pokedElements: {
        properties: [],
        includes: {},
        policies: [],
      },
    });
  }, []);

  const internalDataProviderForAnalyticsHook = useCallback(() => {
    const generalData = genericAnalyticsDataProvider() as any;
    generalData.id = options.forId;
    generalData.version = options.forVersion || null;
    generalData.type = idef.getQualifiedPathName();
    return generalData;
  }, [
    options.forId,
    options.forVersion,
    idef,
  ]);

  const injectSubmitBlockPromiseImmutable = useCallback((p: Promise<any>) => {
    submitBlockPromisesRef.current.push(p);
  }, []);

  const onConnectStatusChangeHook = useCallback(() => {
    return onConnectStatusChange(
      optionsRef.current,
      dataContext.remoteListener,
      stateRef.current,
      searchHook,
      loadValueHook,
    );
  }, []);

  const basicFnsRetrieverImmutable = useCallback(() => {
    return {
      clean: cleanHook,
      delete: deleteHook,
      poke: poke,
      reload: reloadHook,
      search: searchHook,
      submit: submitHook,
      unpoke: unpoke,
    } as IBasicFns;
  }, []);

  const loadStateFromFileAtHook = useCallback(async (
    stateFile: File | Blob,
    id: string,
    version?: string,
    specificProperties?: string[],
    specificIncludes?: { [includeId: string]: string[] },
  ) => {
    return await loadStateFromFileAt(
      idefRef.current,
      stateFile,
      id,
      version,
      specificProperties,
      specificIncludes,
    );
  }, []);

  const loadStateFromFileHook = useCallback((stateFile: File | Blob, specificProperties?: string[], specificIncludes?: { [includeId: string]: string[] }) => {
    loadStateFromFileAtHook(stateFile, this.props.forId || null, this.props.forVersion || null, specificProperties, specificIncludes);
  }, []);

  const downloadStateAtHook = useCallback(async (
    id: string,
    version: string,
    specificProperties?: string[],
    specificIncludes?: { [includeId: string]: string[] },
  ) => {
    return await downloadStateAt(
      idefRef.current,
      lastLoadValuePromiseIsResolvedRef.current,
      lastLoadValuePromiseRef.current,
      id,
      version,
      specificProperties,
      specificIncludes,
    );
  }, []);

  const downloadStateHook = useCallback((specificProperties?: string[], specificIncludes?: { [includeId: string]: string[] }) => {
    return downloadStateAtHook(this.props.forId || null, this.props.forVersion || null, specificProperties, specificIncludes)
  }, []);

  const loadValueHook = useCallback((denyCaches?: boolean) => {
    return loadValue(
      idefRef.current,
      optionsRef.current,
      stateRef.current,
      setStateRef.current,
      dataContext.remoteListener,
      lastLoadingForIdRef,
      lastLoadingForVersionRef,
      lastLoadValuePromiseIsResolvedRef,
      lastLoadValuePromiseRef,
      lastLoadValuePromiseResolveRef,
      isUnmountedRef,
      tokenDataRef.current.token,
      localeDataRef.current.language,
      lastUpdateIdRef,
      internalUUIDRef.current,
      searchContext,
      changeListenerHook,
      denyCaches,
    );
  }, []);

  // EMULATE OF CONSTRUCTOR
  const isConstruct = useRef(true);
  useEffect(() => {
    isConstruct.current = false;
  }, []);
  if (isConstruct.current) {
    // first we setup the listeners, this includes the on change listener that would make
    // the entire app respond to actions, otherwise the fields might as well be disabled
    // we do this here to avoid useless callback changes as the listeners are not ready
    installSetters(idef, options, isCMountedRef.current, this.search);
    installPrefills(idef, options, location);

    if (typeof document !== "undefined") {
      setupListeners(
        idef,
        options,
        dataContext.remoteListener,
        changeListenerHook,
        loadListenerHook,
        changeSearchListenerHook,
        reloadListenerHook,
        internalUUIDRef.current,
      );
      blockCleanup(
        blockIdCleanRef,
        idef,
        options,
      );
    }
  }

  // EMULATE OF MOUNT
  useEffect(() => {
    onMount(idefRef.current, optionsRef.current, state, setState, dataContext.remoteListener,
      isCMountedRef,
      mountCbsRef,
      changedSearchListenerLastCollectedSearchIdRef,
      initialAutomaticNextSearchRef,
      isUnmountedRef,
      internalUUIDRef.current,
      lastUpdateIdRef,
      basicFnsRetrieverImmutable,
      onConnectStatusChangeHook,
      onSearchReloadHook,
      searchHook,
      loadValueHook,
      changeListenerHook,
    );

    // EMULATE OF UNMOUNT
    return () => {
      willUnmount(
        idefRef.current,
        optionsRef.current,
        stateRef.current,
        setStateRef.current,
        dataContext.remoteListener,
        isUnmountedRef,
        blockIdCleanRef,
        internalSearchDestructionMarkersRef,
        isCMountedRef.current,
        changeListenerHook,
        loadListenerHook,
        changeSearchListenerHook,
        reloadListenerHook,
        onSearchReloadHook,
        onConnectStatusChangeHook,
        searchHook,
        internalUUIDRef.current,
        internalUUIDRef.current,
      );
    }
  }, []);

  // EMULATE OF DID UPDATE
  useEffect(() => {
    const prevOptions = options;
    const prevState = state;
    const prevIdef = idef;
    const prevTokenData = tokenData;

    return () => {
      // should shouldComponentUpdate be here?
      didUpdate(
        prevIdef,
        idefRef.current,
        prevOptions,
        prevState,
        optionsRef.current,
        prevTokenData,
        tokenDataRef.current,
        stateRef.current,
        setStateRef.current,
        blockIdCleanRef,
        storeStateTimeoutRef,
        internalSearchDestructionMarkersRef,
        isCMountedRef,
        internalUUIDRef.current,
        locationRef.current,
        dataContext.remoteListener,
        isUnmountedRef,
        lastUpdateIdRef,
        searchHook,
        loadValueHook,
        reloadListenerHook,
        loadListenerHook,
        changeListenerHook,
        changeSearchListenerHook,
        onSearchReloadHook,
        basicFnsRetrieverImmutable,
      );
    }
  }, [tokenData, idef, options, state]);

  const onPropertyRestoreHook = useCallback((property: PropertyDefinition | string | IPropertyCoreProps) => {
    return onPropertyRestore(
      idefRef.current,
      optionsRef.current,
      stateRef.current,
      lastUpdateIdRef,
      updateTimeoutRef,
      automaticSearchTimeoutRef,
      preventSearchFeedbackOnPossibleStaleDataRef,
      consumableQsStateRef,
      consumeQsStateTimeoutRef,
      locationRef.current,
      (currentUpdateId: number) => {
        setStateToCurrentValueWithExternalChecking(
          idefRef.current,
          setStateRef.current,
          optionsRef.current,
          isUnmountedRef,
          lastUpdateIdRef,
          currentUpdateId,
          changeListenerHook,
        );
      },
      searchHook,
      // typescript bug
      property as any,
    );
  }, [])

  // START COPY/PASTE AND MODIFYING TO ADAPT TO A HOOK
  // =============================================================================

  // CUSTOMS FOR THIS ALONE

  const getValueFor = useCallback((idOrBase: string | IPropertyBasePropsWInclude) => {
    if (idOrBase === null || typeof idOrBase === "undefined") {
      return null;
    } else if (typeof idOrBase === "string") {
      const pDef = idef.getPropertyDefinitionFor(idOrBase, true);
      return pDef.getCurrentValue(options.forId || null, options.forVersion || null);
    } else {
      let actualId = idOrBase.id;
      if (idOrBase.searchVariant) {
        // for that we just get the prefix and add it
        actualId =
          PropertyDefinitionSearchInterfacesPrefixes[idOrBase.searchVariant.toUpperCase().replace("-", "_")] + idOrBase.id;
      }

      // now we need to check if this is a meta property such a created_at, edited_at, etc...
      const isMetaProperty = !!RESERVED_BASE_PROPERTIES_RQ[actualId];

      if (isMetaProperty) {
        if (actualId === "id") {
          return options.forId;
        } else if (actualId === "version") {
          return options.forVersion;
        } else {
          const internalValue = idef.getStateNoExternalChecking(options.forId || null, options.forVersion || null, true, [], {}, true);
          return (internalValue.rqOriginalFlattenedValue && internalValue.rqOriginalFlattenedValue[actualId]);
        }
      }

      const include = typeof idOrBase.include === "string" ? idef.getIncludeFor(idOrBase.include) : idOrBase.include;
      // and once we know that we can get the value, basically we
      // don't have a property definition if is a meta property, and we need to extract
      // it from the include if it's available
      const property = (
        include ?
          include.getSinkingPropertyFor(actualId) :
          (
            (idOrBase.policyType && idOrBase.policyName) ?
              idef
                .getPropertyDefinitionForPolicy(idOrBase.policyType, idOrBase.policyName, actualId) :
              idef
                .getPropertyDefinitionFor(actualId, true)
          )
      );

      return property.getCurrentValue(options.forId || null, options.forVersion || null);
    }
  }, [idef, options.forId, options.forVersion]) as <T>(pId: string | IPropertyBasePropsWInclude) => T;

  const getStateFor = useCallback((idOrBase: string | IPropertyBasePropsWInclude) => {
    if (idOrBase === null || typeof idOrBase === "undefined") {
      return null;
    } else if (typeof idOrBase === "string") {
      const pDef = idef.getPropertyDefinitionFor(idOrBase, true);
      return pDef.getStateNoExternalChecking(options.forId || null, options.forVersion || null, true);
    } else {
      let actualId = idOrBase.id;
      if (idOrBase.searchVariant) {
        // for that we just get the prefix and add it
        actualId =
          PropertyDefinitionSearchInterfacesPrefixes[idOrBase.searchVariant.toUpperCase().replace("-", "_")] + idOrBase.id;
      }

      const include = typeof idOrBase.include === "string" ? idef.getIncludeFor(idOrBase.include) : idOrBase.include;

      const property = (
        include ?
          include.getSinkingPropertyFor(actualId) :
          (
            (idOrBase.policyType && idOrBase.policyName) ?
              idef
                .getPropertyDefinitionForPolicy(idOrBase.policyType, idOrBase.policyName, actualId) :
              idef
                .getPropertyDefinitionFor(actualId, true)
          )
      );

      return property.getStateNoExternalChecking(options.forId || null, options.forVersion || null, true);
    }
  }, [idef, options.forId, options.forVersion]) as <T>(pId: string | IPropertyBasePropsWInclude) => IPropertyDefinitionState<T>;

  return {
    state,
    getValueForProperty: getValueFor,
    getStateForProperty: getStateFor,
  }
}