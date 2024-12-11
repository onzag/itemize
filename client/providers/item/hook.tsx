import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IActionResponseWithValue, IItemProviderProps, ILoadCompletedPayload, IPokeElementsType, SearchItemValueContext, getPropertyForSetter, resolveCoreProp } from ".";
import { useRootRetriever } from "../../components/root/RootRetriever";
import type Module from "../../../base/Root/Module";
import ItemDefinition, { IItemSearchStateType } from "../../../base/Root/Module/ItemDefinition";
import { IPropertyBaseProps, IPropertyCoreProps } from "../../components/property/base";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { PREFIX_GET, RESERVED_BASE_PROPERTIES_RQ } from "../../../constants";
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

interface IActualItemProviderState extends IItemSearchStateType {
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
  state: IActualItemProviderState;
  getStateForProperty<T>(pId: string | IPropertyBasePropsWInclude): IPropertyDefinitionState<T>;
  getValueForProperty<T>(pId: string | IPropertyBasePropsWInclude): T;
}


export function useItemProvider(options: IItemProviderOptions): IItemProviderHookElement {
  const root = useRootRetriever();
  const mod = typeof options.module === "string" ? root.root.registry[options.module] as Module : options.module;

  const searchContext = useContext(SearchItemValueContext);
  const dataContext = useContext(DataContext);

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
  const [stateInfo, setStateInfoOriginal] = useState<IActualItemProviderState>(() => {
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

  // used as an alternative to set state
  const setStateInfo = useCallback((value: Partial<IActualItemProviderState>) => {
    setStateInfoOriginal({
      ...stateInfo,
      ...value,
    });
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
  const blockCleanup = useCallback((options: IItemProviderOptions) => {
    if (options.forId) {
      if (!blockIdClean.current) {
        blockIdClean.current = uuid.v4();
      }
      idef.addBlockCleanFor(options.forId || null, options.forVersion || null, blockIdClean.current);
    }
  }, [idef]);
  const releaseCleanupBlock = useCallback((options: IItemProviderOptions) => {
    if (options.forId) {
      if (!blockIdClean.current) {
        blockIdClean.current = uuid.v4();
      }
      idef.removeBlockCleanFor(options.forId || null, options.forVersion || null, blockIdClean.current);
    }
  }, [idef]);

  // COPY FROM install setters and remove setters
  const isCMounted = useRef(false);
  useEffect(() => {
    isCMounted.current = true;
  }, []);
  const onPropertyEnforceOrClearFinal = useCallback((
    givenForId: string,
    givenForVersion: string,
    internal?: boolean,
  ) => {
    idef.triggerListeners(
      "change",
      givenForId || null,
      givenForVersion || null,
    );
    if (
      !internal &&
      options.automaticSearch &&
      !options.automaticSearch.clientDisabled &&
      !options.automaticSearchIsOnlyInitial &&
      isCMounted.current
    ) {
      // TODO
      // search(options.automaticSearch);
    }
  }, [options.automaticSearch, idef, ]);//search]);
  const onPropertyEnforce = useCallback((
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
    givenForId: string,
    givenForVersion: string,
    internal?: boolean,
    // doNotCleanSearchState?: boolean,
  ) => {
    const actualProperty = property instanceof PropertyDefinition ?
      property : idef.getPropertyDefinitionFor(resolveCoreProp(property), true);

    // this function is basically run by the setter
    // since they might be out of sync that's why the id is passed
    // the setter enforces values
    actualProperty.setSuperEnforced(givenForId || null, givenForVersion || null, value, this);
    // !doNotCleanSearchState && this.props.itemDefinitionInstance.cleanSearchState(this.props.forId || null, this.props.forVersion || null);
    onPropertyEnforceOrClearFinal(givenForId, givenForVersion, internal);
  }, [idef, onPropertyEnforceOrClearFinal]);
  const onPropertyClearEnforce = useCallback((
    property: PropertyDefinition | string | IPropertyCoreProps,
    givenForId: string,
    givenForVersion: string,
    internal?: boolean,
  ) => {
    const actualProperty = property instanceof PropertyDefinition ?
      property : idef.getPropertyDefinitionFor(resolveCoreProp(property), true);
    // same but removes the enforcement
    actualProperty.clearSuperEnforced(givenForId || null, givenForVersion || null, this);
    // this.props.itemDefinitionInstance.cleanSearchState(this.props.forId || null, this.props.forVersion || null);
    onPropertyEnforceOrClearFinal(givenForId, givenForVersion, internal);
  }, [idef, onPropertyEnforceOrClearFinal])
  const installSetters = useCallback((options: IItemProviderOptions) => {
    if (options.setters) {
      options.setters.forEach((setter) => {
        const property = getPropertyForSetter(setter, idef);
        onPropertyEnforce(property, setter.value, options.forId || null, options.forVersion || null, true);
      });
    }
  }, [idef, onPropertyEnforce]);
  const removeSetters = useCallback((options: IItemProviderOptions) => {
    if (options.setters) {
      options.setters.forEach((setter) => {
        const property = getPropertyForSetter(setter, idef);
        onPropertyClearEnforce(property, options.forId || null, options.forVersion || null, true);
      });
    }
  }, [idef, onPropertyClearEnforce]);

  // COPY FROM prefills
  const installPrefills = useCallback((options: IItemProviderOptions) => {
    if (options.prefills) {
      options.prefills.forEach((prefill) => {
        const property = getPropertyForSetter(prefill, idef);
        property.setCurrentValue(
          options.forId || null,
          options.forVersion || null,
          prefill.value,
          null,
        );
      });
    }

    // syncing from the query string in a cheap way
    if (options.queryStringSync && options.queryStringSync.length) {
      // grabbing the property to sync in there
      const propertiesToSync = (
        idef.isInSearchMode() ?
          getPropertyListForSearchMode(
            options.queryStringSync || [],
            idef.getStandardCounterpart()
          ) : getPropertyListDefault(options.queryStringSync)
      )

      // using the search params to parse the information there
      const searchParamsParsed = new URLSearchParams(location.search);

      // and now we can sync if we find a value
      propertiesToSync.forEach((p) => {
        // check for it
        const valueInQueryString = searchParamsParsed.get(p);
        // we got something
        if (valueInQueryString) {
          // try to synchornize it
          try {
            const valueParsed = JSON.parse(valueInQueryString);
            const property = idef.getPropertyDefinitionFor(p, true);
            property.setCurrentValue(
              options.forId || null,
              options.forVersion || null,
              valueParsed,
              null,
            );
          } catch {
          }
        }
      });
    }

    if (options.prefills || (options.queryStringSync && options.queryStringSync.length)) {
      // !doNotCleanSearchState && props.itemDefinitionInstance.cleanSearchState(props.forId || null, props.forVersion || null);
      idef.triggerListeners(
        "change",
        options.forId || null,
        options.forVersion || null,
      );
    }
  }, [idef, location.search]);

  // COPY FROM constructor
  const isConstruct = useRef(true);
  useEffect(() => {
    isConstruct.current = false;
  }, []);
  if (isConstruct.current) {
    installSetters(options);
    installPrefills(options);

    if (typeof document !== "undefined") {
      // TODO
      // setupListeners();
      blockCleanup(options);
    }
  }

  // COPY FROM loadValue
  const lastLoadingForId = useRef<string>(null);
  const lastLoadingForVersion = useRef<string>(null);
  const lastLoadValuePromiseIsResolved = useRef(false);
  const lastLoadValuePromise = useRef<Promise<void>>(null);
  const lastLoadValuePromiseResolve = useRef<() => void>(null);
  const isUnmounted = useRef(false);
  useEffect(() => {
    return () => {
      isUnmounted.current = true;
    }
  }, []);
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

  // // TODO
  // useEffect(() => {
  //   idef.addListener("change", options.forId, options.forVersion, onPropertyValuesChangedForceUpdate);
  //   idef.addListener("load", options.forId, options.forVersion, forceUpdate);
  //   if (idef.isInSearchMode()) {
  //     idef.addListener("search-change", options.forId, options.forVersion, forceUpdate);
  //   }
  //   idef.addListener("reload", options.forId, options.forVersion, forceUpdate);

  //   return () => {
  //     idef.removeListener("change", options.forId, options.forVersion, onPropertyValuesChangedForceUpdate);
  //     idef.removeListener("load", options.forId, options.forVersion, forceUpdate);
  //     if (idef.isInSearchMode()) {
  //       idef.removeListener("search-change", options.forId, options.forVersion, forceUpdate);
  //     }
  //     idef.removeListener("reload", options.forId, options.forVersion, forceUpdate);
  //   }
  // }, [idef, options.forId, options.forVersion]);

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