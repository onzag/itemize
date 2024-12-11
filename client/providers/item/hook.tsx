import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IActionResponseWithValue, IItemProviderProps, ILoadCompletedPayload, IPokeElementsType, LOAD_TIME, SSR_GRACE_TIME, SearchItemValueContext, getPropertyForSetter, resolveCoreProp } from ".";
import { useRootRetriever } from "../../components/root/RootRetriever";
import type Module from "../../../base/Root/Module";
import ItemDefinition, { IItemSearchStateType } from "../../../base/Root/Module/ItemDefinition";
import { IPropertyBaseProps, IPropertyCoreProps } from "../../components/property/base";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { DESTRUCTION_MARKERS_LOCATION, ENDPOINT_ERRORS, MEMCACHED_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_UNMOUNT_DESTRUCTION_MARKERS_LOCATION, MEMCACHED_UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION, PREFIX_GET, RESERVED_BASE_PROPERTIES_RQ, SEARCH_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_DESTRUCTION_MARKERS_LOCATION, UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION } from "../../../constants";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import PropertyDefinition, { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
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
  // itemState: IItemStateType;
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
  const root = useRootRetriever();
  const mod = typeof options.module === "string" ? root.root.registry[options.module] as Module : options.module;

  const searchContext = useContext(SearchItemValueContext);
  const dataContext = useContext(DataContext);

  // hack to update the options in real time in the ref object
  const activeOptions = useRef(options);
  activeOptions.current = options;

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

  // START COPY/PASTE AND MODIFYING TO ADAPT TO A HOOK
  // =============================================================================

  // COPY OF setupInitialState
  const [stateInfo, setStateInfoOriginal] = useState<IHookItemProviderState>(() => {
    // the value might already be available in memory, this is either because it was loaded
    // by another instance or because of SSR during the initial render
    const memoryLoaded = !!(options.forId && idef.hasAppliedValueTo(
      options.forId || null, options.forVersion || null,
    ));
    let memoryLoadedAndValid = false;
    // by default we don't know
    let isNotFound = false;
    let isBlocked = false;
    let isBlockedButDataIsAccessible = false;
    if (memoryLoaded) {
      const appliedRQValue = idef.getRQAppliedValue(
        options.forId || null, options.forVersion || null,
      );
      // this is the same as for loadValue we are tyring to predict
      const { requestFields } = getFieldsAndArgs({
        includeArgs: false,
        includeFields: true,
        uniteFieldsWithAppliedValue: true,
        includes: options.includes || {},
        properties: getPropertyListDefault(options.properties),
        itemDefinitionInstance: idef,
        forId: options.forId || null,
        forVersion: options.forVersion || null,
      });
      // this will work even for null values, and null requestFields
      memoryLoadedAndValid = (
        appliedRQValue &&
        requestFieldsAreContained(requestFields, appliedRQValue.requestFields)
      );
      isNotFound = memoryLoadedAndValid && appliedRQValue.rawValue === null;
      isBlocked = !isNotFound && !!appliedRQValue.rawValue.blocked_at;
      isBlockedButDataIsAccessible = isBlocked && !!appliedRQValue.rawValue.DATA;
    }

    let searchWasRestored: "NO" | "FROM_STATE" | "FROM_LOCATION" = "NO";
    let searchState: IItemSearchStateType = {
      searchError: null,
      searching: false,
      searchResults: null,
      searchRecords: null,
      searchLimit: null,
      searchOffset: null,
      searchCount: null,
      searchId: null,
      searchOwner: null,
      searchLastModified: null,
      searchParent: null,
      searchCacheUsesProperty: null,
      searchShouldCache: false,
      searchFields: null,
      searchRequestedIncludes: {},
      searchRequestedProperties: [],
      searchEngineEnabled: false,
      searchEngineEnabledLang: null,
      searchEngineUsedFullHighlights: null,
      searchEngineHighlightArgs: null,
      searchHighlights: {},
      searchMetadata: null,
      searchCachePolicy: "none",
      searchListenPolicy: "none",
      searchOriginalOptions: null,
      searchListenSlowPolling: false,
    };
    const searchStateComplex = idef.getSearchState(
      options.forId || null, options.forVersion || null,
    );
    if (searchStateComplex) {
      searchState = searchStateComplex.searchState;

      const state = searchStateComplex.state;
      idef.applyState(
        options.forId || null,
        options.forVersion || null,
        state,
      );

      searchWasRestored = "FROM_STATE";
    }

    // so the initial setup
    return {
      // DOES NOT EXIST IN HOOK MODE
      // itemState: ActualItemProvider.getItemStateStatic(props),
      // and we pass all this state
      isBlocked,
      isBlockedButDataIsAccessible,
      notFound: isNotFound,
      loadError: null,
      // loading will be true if we are setting up with an id
      // as after mount it will attempt to load such id, in order
      // to avoid pointless refresh we set it up as true from
      // the beggining
      loading: memoryLoadedAndValid ? false : (options.avoidLoading ? false : !!options.forId),
      // loaded will be whether is loaded or not only if there is an id
      // otherwise it's technically loaded
      loaded: options.forId ? memoryLoadedAndValid : true,

      submitError: null,
      submitting: false,
      submitted: false,

      deleteError: null,
      deleting: false,
      deleted: false,

      ...searchState,
      searchWasRestored,

      pokedElements: {
        properties: [],
        includes: {},
        policies: [],
      },
    };
  });

  const stateInfoCb = useRef<() => void>(null);

  useEffect(() => {
    if (stateInfoCb.current) {
      stateInfoCb.current();
      stateInfoCb.current = null;
    }
  }, [stateInfo]);

  // used as an alternative to set state
  const setStateInfo = useCallback((value: Partial<IHookItemProviderState>, cb?: () => void) => {
    setStateInfoOriginal({
      ...stateInfo,
      ...value,
    });

    if (cb) {
      stateInfoCb.current = cb;
    }
  }, [stateInfo]);

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
      stateInfo.loaded ||
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

  const [, setNVar] = useState(0);

  const onPropertyValuesChangedForceUpdate = useCallback(() => {
    // Force a re-render by updating the state
    setNVar((v) => v + 1);
  }, []);

  const location = useLocationRetriever();

  // COPY FROM blockCleanup
  const blockIdClean = useRef<string>(null);

  // COPY FROM install setters and remove setters
  const isCMounted = useRef(false);
  const mountCbFns = useRef([]);
  const changedSearchListenerLastCollectedSearchId = useRef(null as { id: string });
  const initialAutomaticNextSearch = useRef(false);

  // COPY FROM prefills
  

  // COPY FROM constructor
  const isConstruct = useRef(true);
  useEffect(() => {
    isConstruct.current = false;
  }, []);
  if (isConstruct.current) {
    installSetters(options);
    installPrefills(options);

    if (typeof document !== "undefined") {
      setupListeners();
      blockCleanup(blockIdClean, idef, options);
    }
  }

  // COPY FROM loadValue
  const lastLoadingForId = useRef<string>(null);
  const lastLoadingForVersion = useRef<string>(null);
  const lastLoadValuePromiseIsResolved = useRef(false);
  const lastLoadValuePromise = useRef<Promise<void>>(null);
  const lastLoadValuePromiseResolve = useRef<() => void>(null);
  const isUnmounted = useRef(false);

  
  const loadValueCompleted: (value: ILoadCompletedPayload) => IActionResponseWithValue = useCallback((value: ILoadCompletedPayload) => {
    // basically if it's unmounted, or what we were updating for does not match
    // what we are supposed to be updating for, this basically means load value got called once
    // again before the previous value managed to load, this can happen, when switching forId and/or
    // for version very rapidly
    const shouldNotUpdateState =
      isUnmounted.current ||
      value.id !== lastLoadingForId.current ||
      value.version !== lastLoadingForVersion.current;

    // return immediately
    if (shouldNotUpdateState) {
      lastLoadValuePromiseIsResolved.current = true;
      lastLoadValuePromiseResolve.current();

      const result = {
        value: value.value,
        error: value.error,
        cached: value.cached,
        id: value.id,
        version: value.version,
      };
      options.onLoad && options.onLoad(result);
      return result;
    }

    // so once everything has been completed this function actually runs per instance
    if (value.error) {
      // if we got an error we basically have no value
      !isUnmounted.current && setStateInfo({
        // set the load error and all the logical states, we are not loading
        // anymore
        loadError: value.error,
        loaded: false,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        notFound: false,
        loading: false,
      });

      // load later when connection is available
      // unnecessary this is done already by the connection state listener
      // using the load error
      // if (
      //   !isUnmounted.current &&
      //   value.error.code === ENDPOINT_ERRORS.CANT_CONNECT &&
      //   !options.doNotAutomaticReloadIfCantConnect
      // ) {
      //   options.remoteListener.addOnConnectOnceListener(this.loadValue);
      // }
      // otherwise if there's no value, it means the item is not found
    } else if (!value.value) {
      // we mark it as so, it is not found
      !isUnmounted.current && setStateInfo({
        loadError: null,
        notFound: true,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        loading: false,
        loaded: true,
      });
    } else if (value.value) {
      // otherwise if we have a value, we check all these options
      !isUnmounted.current && setStateInfo({
        loadError: null,
        notFound: false,
        isBlocked: !!value.value.blocked_at,
        isBlockedButDataIsAccessible: value.value.blocked_at ? !!value.value.DATA : false,
        loading: false,
        loaded: true,
      });
    }

    lastLoadValuePromiseIsResolved.current = true;
    lastLoadValuePromiseResolve.current();

    // now we return
    const result = {
      value: value.value,
      error: value.error,
      cached: value.cached,
      id: value.id,
      version: value.version,
    };
    options.onLoad && options.onLoad(result);
    return result;
  }, [])
  const loadValue = useCallback(async (denyCaches?: boolean) => {
    const forId = options.forId;
    const forVersion = options.forVersion || null;

    lastLoadingForId.current = forId;
    lastLoadingForVersion.current = forVersion;

    // we don't use loading here because there's one big issue
    // elements are assumed into the loading state by the constructor
    // if they have an id
    if (!forId || options.searchCounterpart) {
      if ((stateInfo.loading || stateInfo.loaded || stateInfo.loadError) && !isUnmounted.current) {
        setStateInfo({
          loadError: null,
          loaded: false,
          notFound: false,
          loading: false,
          isBlocked: false,
          isBlockedButDataIsAccessible: false,
        });
      }
      return null;
    }

    // We get the request fields that we are going to use
    // in order to load the value, we use the optimizers
    // so as to request only what is necessary for it to be populated
    // there is however one thing, different optimizers might have been
    // used accross the application, and two components with different
    // optimizations might have been used at the same time for the
    // same id
    const { requestFields } = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      uniteFieldsWithAppliedValue: true,
      includes: options.includes || {},
      properties: getPropertyListDefault(options.properties),
      itemDefinitionInstance: idef,
      forId: forId,
      forVersion: forVersion,
    });

    // the reason why we use deny cache here is simple
    // the search context is a form of a memory cache, it might be loading
    // still when for some reason it was asked to reload, I can think of a extreme case
    // when the client loads from memory, a reload is requested, but the search conxtext hasn't
    // released yet the value
    if (
      !denyCaches &&
      !options.doNotUseMemoryCache &&
      searchContext &&
      searchContext.currentlySearching.find(
        (s) =>
          s.id === forId &&
          s.version === forVersion &&
          s.type === idef.getQualifiedPathName(),
      ) &&
      requestFieldsAreContained(requestFields, searchContext.searchFields)
    ) {
      // now we wait for the search loader to trigger the load event
      if (!isUnmounted.current) {
        setStateInfo({
          loading: true,
          loaded: false,
        });
      }
      return null;
    }

    options.onWillLoad && options.onWillLoad();

    // we wil reuse the old promise in case
    // there's an overlapping value being loaded
    // the old call won't trigger the promise
    // as it won't match the current signature
    if (lastLoadValuePromiseIsResolved.current) {
      lastLoadValuePromise.current = new Promise((resolve) => {
        lastLoadValuePromiseResolve.current = resolve;
      });
      lastLoadValuePromiseIsResolved.current = false;
    }

    const qualifiedName = idef.getQualifiedPathName();

    let currentMetadata: ICacheMetadataMatchType;
    let denyMemoryCache: boolean = false;
    let denyCacheWorker: boolean = false;
    if (
      !denyCaches &&
      !options.doNotUseMemoryCache &&
      options.longTermCachingMetadata &&
      // no polyfilling for loading value and related meatadat
      CacheWorkerInstance.isSupportedAsWorker
    ) {
      currentMetadata = await CacheWorkerInstance.instance.readMetadata(
        PREFIX_GET + qualifiedName,
        forId,
        forVersion || null,
      );

      if (!equals(options.longTermCachingMetadata, currentMetadata) && options.longTermCachingMetadataMismatchAction) {
        // we deny the memory cache because we are now unsure of whether
        // the value held in memory is valid due to the metadata
        // as this value might have come from the cache when it was loaded
        // with such unmatching metadata
        denyMemoryCache = true;
        denyCacheWorker = true;
      }
    }

    if (!denyCaches && !denyMemoryCache && !options.doNotUseMemoryCache) {
      // Prevent loading at all if value currently available and memoryCached
      const appliedRQValue = idef.getRQAppliedValue(
        forId, forVersion,
      );
      if (
        appliedRQValue &&
        requestFieldsAreContained(requestFields, appliedRQValue.requestFields)
      ) {
        // if (window.TESTING && process.env.NODE_ENV === "development") {
        //   this.mountOrUpdateIdefForTesting(true);
        // }

        if (options.static !== "TOTAL") {
          dataContext.remoteListener.requestFeedbackFor({
            itemDefinition: idef.getQualifiedPathName(),
            id: forId,
            version: forVersion || null,
          });
        }
        // in some situations the value can be in memory but not yet permanently cached
        // (eg. when there is a search context)
        // and another item without a search context attempts to load the value this will
        // make it so that when we are exiting the search context it caches
        let cached: boolean = false;
        if (
          CacheWorkerInstance.isSupportedAsWorker &&
          options.longTermCaching &&
          !searchContext
        ) {
          if (appliedRQValue.rawValue) {
            try {
              cached = await CacheWorkerInstance.instance.mergeCachedValue(
                PREFIX_GET + qualifiedName,
                forId,
                forVersion || null,
                appliedRQValue.rawValue,
                appliedRQValue.requestFields,
              );
            } catch { }
          } else {
            try {
              cached = await CacheWorkerInstance.instance.setCachedValue(
                PREFIX_GET + qualifiedName,
                forId,
                forVersion || null,
                null,
                null,
              );
            } catch { }
          }
        }

        return loadValueCompleted({
          value: appliedRQValue.rawValue,
          error: null,
          cached,
          id: forId,
          version: forVersion,
        });
      }
    }
  }, [
    idef,
    searchContext,
    options.forId,
    options.forVersion,
    stateInfo.loaded,
    stateInfo.loading,
    stateInfo.loadError,
    options.includes,
    options.properties,
    options.doNotUseMemoryCache,
    options.static,
    options.longTermCachingMetadata,
    loadValueCompleted,
  ]);

  const onConnectStatusChange = useCallback(() => {
    const isConnected = !dataContext.remoteListener.isOffline();
    if (isConnected) {
      if (
        stateInfo.loadError &&
        stateInfo.loadError.code === ENDPOINT_ERRORS.CANT_CONNECT &&
        !options.doNotAutomaticReloadIfCantConnect
      ) {
        loadValue();
      }
      if (
        stateInfo.searchError &&
        stateInfo.searchError.code === ENDPOINT_ERRORS.CANT_CONNECT &&
        !options.doNotAutomaticReloadSearchIfCantConnect
      ) {
        search(stateInfo.searchOriginalOptions);
      }
    }
  }, [
    dataContext.remoteListener,
    loadValue,
    search,
    stateInfo.searchError,
    stateInfo.loadError,
    options.doNotAutomaticReloadIfCantConnect,
    stateInfo.searchOriginalOptions,
  ]);

  const markSearchForDestruction = useCallback(async (
    type: "by-parent" | "by-owner" | "by-owner-and-parent" | "by-property",
    qualifiedName: string,
    owner: string,
    parent: [string, string, string],
    property: [string, string],
    unmount: boolean,
    unmark: boolean,
  ) => {
    if (typeof document === "undefined") {
      return;
    }

    if (CacheWorkerInstance.instance) {
      await CacheWorkerInstance.instance.waitForInitializationBlock();
    }

    const locationMemcached =
      unmount ? MEMCACHED_UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION : MEMCACHED_SEARCH_DESTRUCTION_MARKERS_LOCATION;
    const locationReal =
      unmount ? UNMOUNT_SEARCH_DESTRUCTION_MARKERS_LOCATION : SEARCH_DESTRUCTION_MARKERS_LOCATION;

    (window as any)[locationMemcached] =
      (window as any)[locationMemcached] ||
      JSON.parse(localStorage.getItem(locationReal) || "{}");
    let changed = false;

    if (unmark) {
      if (!(window as any)[locationMemcached][qualifiedName]) {
        // already not there
      } else {
        const foundValueIndex = (window as any)[locationMemcached][qualifiedName]
          .findIndex((m: [string, string, [string, string, string], [string, string]]) =>
            m[0] === type && equals(m[1], owner, { strict: true }) && equals(m[2], parent, { strict: true }) && equals(m[3], property, { strict: true }));
        if (foundValueIndex !== -1) {
          changed = true;
          (window as any)[locationMemcached][qualifiedName].splice(foundValueIndex, 1);
        }
      }
    } else {
      if (!(window as any)[locationMemcached][qualifiedName]) {
        (window as any)[locationMemcached][qualifiedName] = [
          [type, owner, parent, property],
        ];
        changed = true;
      } else {
        if (
          !(window as any)[locationMemcached][qualifiedName]
            .find((m: [string, string, [string, string, string], [string, string]]) =>
              m[0] === type && equals(m[1], owner, { strict: true }) && equals(m[2], parent, { strict: true }) && equals(m[3], property, { strict: true }))
        ) {
          changed = true;
          (window as any)[locationMemcached][qualifiedName].push([type, owner, parent, property]);
        }
      }
    }

    if (changed) {
      localStorage.setItem(locationReal, JSON.stringify((window as any)[locationMemcached]));
    }
  }, []);

  // LIFECYCLE

  useEffect(() => {
    // COPY from componentDidMount
    isCMounted.current = true;
    mountCbFns.current.forEach((c) => c());
    dataContext.remoteListener.addConnectStatusListener(this.onConnectStatusChange);

    // now we retrieve the externally checked value
    if (idef.containsAnExternallyCheckedProperty() && options.enableExternalChecks) {
      this.setStateToCurrentValueWithExternalChecking(null);
    }

    const listenersSetup = () => {
      const currentSearch = this.state;

      // when we have a search that was done during SSR and was not stored
      // somewherue in our stuff, we don't want to request feedback
      // when we jst loaded the app because then it makes no sense
      // as the information should be up to date
      const shouldRequestFeedback = currentSearch.searchId === "SSR_SEARCH" && !options.automaticSearchNoGraceTime ? (
        (new Date()).getTime() - LOAD_TIME > SSR_GRACE_TIME
      ) : true;

      searchListenersSetup(
        currentSearch,
        shouldRequestFeedback,
      );
    };

    let searchWasRedone = false;
    if (options.automaticSearch && !options.automaticSearch.clientDisabled) {
      // the search listener might have triggered during the mount callback,
      // which means this function won't see the new state and won't trigger
      // automatic search so we use this variable to check it
      const searchIdToCheckAgainst = changedSearchListenerLastCollectedSearchId.current ?
        changedSearchListenerLastCollectedSearchId.current.id : stateInfo.searchId;

      if (
        // no search id at all, not in the state, not on the changed listener, nowhere
        (!searchIdToCheckAgainst) ||
        // search is forced and we didn't load from location
        (options.automaticSearchForce && this.state.searchWasRestored !== "FROM_LOCATION") ||
        // cache policies searches that have been resolved by SSR need to be redone
        // this is only relevant during mount of course
        // the reason is that the cache may have changes or not be inline with whatever
        // was calculated from the server side
        // that's the issue with ssrEnabled searches that are also cache
        (searchIdToCheckAgainst === "SSR_SEARCH" && options.automaticSearch.cachePolicy !== "none") ||
        (searchIdToCheckAgainst === "SSR_SEARCH" && options.automaticSearch.ssrRequestedProperties)
      ) {
        // this variable that is passed into the search is used to set the initial
        // state in case it needs to be saved in the history
        searchWasRedone = true;
        (async () => {
          try {
            initialAutomaticNextSearch.current = true;
            await this.search(options.automaticSearch);
          } catch (err) {
            console.error(err);
            // setup listeners just in case
            // for a failed search
            listenersSetup();
          }
        })();
      }
    }

    return () => {
      isUnmounted.current = true;
      releaseCleanupBlock();
      unSetupListeners();
      removeSetters();
      runDismountOn();
      this.props.remoteListener.removeConnectStatusListener(this.onConnectStatusChange);

      if (window.TESTING && process.env.NODE_ENV === "development") {
        const mountItem = window.TESTING.mountedItems.find(m => m.instanceUUID === this.internalUUID);
        if (mountItem) {
          mountItem.unmountTime = (new Date()).toISOString();
        }
      }

      this.removeDoubleSlotter();
    }
  }, []);

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
    state: stateInfo,
    getValueForProperty: getValueFor,
    getStateForProperty: getStateFor,
  }
}