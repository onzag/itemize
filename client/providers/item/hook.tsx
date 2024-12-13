import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IActionCleanOptions, IActionDeleteOptions, IActionResponseWithSearchResults, IActionSearchOptions, IActionSubmitOptions, IActionSubmitResponse,
  IBasicFns, IItemAnalyticsProps, IItemContextType, IItemProviderProps, IPokeElementsType, ItemContext, SearchItemValueContext } from ".";
import { useRootRetriever } from "../../components/root/RootRetriever";
import type Module from "../../../base/Root/Module";
import ItemDefinition, { IItemSearchStateType, IItemStateType, IPolicyStateType } from "../../../base/Root/Module/ItemDefinition";
import { IPropertyBaseProps, IPropertyEntryProps, IPropertyViewProps } from "../../components/property/base";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import Include, { IncludeExclusionState } from "../../../base/Root/Module/ItemDefinition/Include";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import {
  getFieldsAndArgs, getPropertyListDefault,
} from "../../internal/rq-client-util";
import { requestFieldsAreContained } from "../../../rq-util";
import { DataContext } from "../../../client/internal/providers/appdata-provider";
import { EndpointErrorType } from "../../../base/errors";
import uuid from "uuid";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { useLocationRetriever } from "../../../client/components/navigation/LocationRetriever";
import { TokenContext } from "../../../client/internal/providers/token-provider";
import { LocaleContext } from "../../../client/internal/providers/locale-provider";
import { ConfigContext } from "../../../client/internal/providers/config-provider";
import { blockCleanup, changeListener, changeSearchListener, cleanWithProps, del, didUpdate,
  dismissDeleteError, dismissDeleted, dismissLoadError, dismissSearchError,
  dismissSearchResults, dismissSubmitError, dismissSubmitted, downloadStateAt, getDerived,
  installPrefills, installSetters, loadListener, loadStateFromFileAt, loadValue, onConnectStatusChange,
  onIncludeSetExclusionState, onMount, onPropertyChange, onPropertyClearEnforce, onPropertyEnforce, onPropertyRestore,
  onSearchReload, reloadListener, search, setStateToCurrentValueWithExternalChecking, setupInitialState,
  setupListeners, submit, willUnmount } from "./util";
import { IRemoteListenerRecordsCallbackArg } from "../../../client/internal/app/remote-listener";
import { genericAnalyticsDataProvider } from "../../../client/components/analytics/util";
import { IPropertyCoreProps } from "../../components/property/base";
import { useFunctionalHit } from "../../../client/components/analytics/Hit";
import { useFunctionalTimetrack } from "../../../client/components/analytics/Timetrack";
import { IPropertyEntryRendererProps } from "../../../client/internal/components/PropertyEntry";
import Entry from "../../../client/components/property/Entry";
import View from "../../../client/components/property/View";
import { IPropertyViewRendererProps } from "../../../client/internal/components/PropertyView";

export interface IItemProviderOptions extends Omit<IItemProviderProps, 'mountId' | 'loadUnversionedFallback' | 'analytics'> {
  module: string | Module;
  suppressWarnings?: boolean;
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
  context: IItemContextType;

  getStateForProperty<T>(pId: string | IPropertyBaseProps): IPropertyDefinitionState<T>;
  getValueForProperty<T>(pId: string | IPropertyBaseProps): T;
  getEntryForProperty(options: IPropertyEntryProps<IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>): React.ReactNode;
  getViewForProperty(options: IPropertyViewProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>>): React.ReactNode;
  setValueForProperty(property: PropertyDefinition | string | IPropertyCoreProps, value: PropertyDefinitionSupportedType, internalValue: any): void;
  enforceValueOnProperty(property: PropertyDefinition | string | IPropertyCoreProps, value: PropertyDefinitionSupportedType): void;
  clearEnforcementOnProperty(property: PropertyDefinition | string | IPropertyCoreProps): void;
  restoreProperty(property: PropertyDefinition | string | IPropertyCoreProps): void;

  hooks: {
    /**
     * When providing analytics in the options you should also call this hook in order
     * to ensure they are properly setup, otherwise analytics will not function
     * 
     * @returns 
     */
    useAnalytics: () => void;
    /**
     * Actually only provides the unversioned if
     * the current is not found, otherwise it will provide
     * id: null, version: "__UNVERSIONED__" this will ensure
     * that the unversioned only loads if the versioned is not found
     * 
     * it has to do this when using hooks
     * 
     * @returns 
     */
    useUnversioned: () => IItemProviderHookElement;
  }
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

  const alwaysUpToDateStateRef = useRef(state);
  alwaysUpToDateStateRef.current = null;

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
    const newValue = {
      ...alwaysUpToDateStateRef.current,
      ...newState,
    };
    alwaysUpToDateStateRef.current = newValue;
    setStateBase(newValue);
  }, []);

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
        // PASS
      } else if (root.root.needsRequestManager(idef, id, version, requestFields)) {
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
  const activeSubmitPromiseRef = useRef(null as Promise<{ response: IActionSubmitResponse, options: IActionSubmitOptions }>);
  const activeSubmitPromiseAwaiterRef = useRef(null as string);
  const activeSearchPromiseRef = useRef(null as Promise<{ response: IActionResponseWithSearchResults, options: IActionSearchOptions }>);
  const activeSearchPromiseAwaiterRef = useRef(null as string);
  const activeSearchOptionsRef = useRef(null as IActionSearchOptions);

  // functions
  const reloadListenerHook = useCallback(() => {
    return reloadListener(
      idefRef.current,
      optionsRef.current,
      isCMountedRef.current,
      mountCbsRef,
      reloadListenerHook,
      reloadListenerTimeoutRef,
      () => {
        loadValueHook(true)
      },
    )
  }, []);

  const changeListenerHook = useCallback((repairCorruption?: boolean) => {
    return changeListener(
      idefRef.current,
      optionsRef.current,
      setState,
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
    return loadListener(
      idefRef.current,
      optionsRef.current,
      stateRef,
      setState,
      isUnmountedRef,
      isCMountedRef,
      mountCbsRef,
      changeListenerHook,
      loadListenerHook,
    );
  }, []);

  const changeSearchListenerHook = useCallback(async () => {
    return changeSearchListener(
      idefRef.current,
      optionsRef.current,
      changedSearchListenerLastCollectedSearchIdRef,
      mountCbsRef,
      isUnmountedRef.current,
      isCMountedRef.current,
      changeSearchListenerHook,
      setState,
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
      setState,
      isUnmountedRef.current,
      onSearchReloadHook,
    );
  }, []);

  const pokeHook = useCallback((elements: IPokeElementsType) => {
    if (isUnmountedRef.current) {
      return;
    }

    setState({
      pokedElements: elements,
    });
  }, []);

  const unpokeHook = useCallback(() => {
    if (isUnmountedRef.current) {
      return;
    }
    setState({
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
      poke: pokeHook,
      reload: loadValueHook,
      search: searchHook,
      submit: submitHook,
      unpoke: unpokeHook,
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
    return loadStateFromFileAtHook(stateFile, optionsRef.current.forId || null, optionsRef.current.forVersion || null, specificProperties, specificIncludes);
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
    return downloadStateAtHook(optionsRef.current.forId || null, optionsRef.current.forVersion || null, specificProperties, specificIncludes)
  }, []);

  const loadValueHook = useCallback((denyCaches?: boolean) => {
    return loadValue(
      idefRef.current,
      optionsRef.current,
      stateRef,
      setState,
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
          setState,
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
  }, []);

  const onPropertyChangeHook = useCallback((
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) => {
    return onPropertyChange(
      idefRef.current,
      optionsRef.current,
      stateRef,
      lastLoadValuePromiseRef.current,
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
          setState,
          optionsRef.current,
          isCMountedRef,
          lastUpdateIdRef,
          currentUpdateId,
          changeListenerHook,
        );
      },
      searchHook,
      // typescript bug
      property as any,
      value,
      internalValue,
    );
  }, []);

  const onPropertyEnforceHook = useCallback((
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
    givenForId: string,
    givenForVersion: string,
  ) => {
    return onPropertyEnforce(
      idefRef.current,
      optionsRef.current,
      isCMountedRef.current,
      property as any,
      value,
      givenForId,
      givenForVersion,
      searchHook,
      internalUUIDRef.current,
    );
  }, []);

  const onPropertyEnforceHookForClient = useCallback((
    property: PropertyDefinition | string | IPropertyCoreProps,
    value: PropertyDefinitionSupportedType,
  ) => {
    return onPropertyEnforce(
      idefRef.current,
      optionsRef.current,
      isCMountedRef.current,
      property as any,
      value,
      optionsRef.current.forId,
      optionsRef.current.forVersion,
      searchHook,
      internalUUIDRef.current,
    );
  }, []);

  const onPropertyClearEnforceHook = useCallback((
    property: PropertyDefinition | string | IPropertyCoreProps,
    givenForId: string,
    givenForVersion: string,
  ) => {
    return onPropertyClearEnforce(
      idefRef.current,
      optionsRef.current,
      isCMountedRef.current,
      property as any,
      givenForId,
      givenForVersion,
      searchHook,
      internalUUIDRef.current,
    );
  }, []);

  const onPropertyClearEnforceHookForClient = useCallback((
    property: PropertyDefinition | string | IPropertyCoreProps,
  ) => {
    return onPropertyClearEnforce(
      idefRef.current,
      optionsRef.current,
      isCMountedRef.current,
      property as any,
      optionsRef.current.forId,
      optionsRef.current.forVersion,
      searchHook,
      internalUUIDRef.current,
    );
  }, []);

  const onIncludeSetExclusionStateHook = useCallback((
    include: Include,
    state: IncludeExclusionState,
  ) => {
    return onIncludeSetExclusionState(
      idefRef.current,
      optionsRef.current,
      lastUpdateIdRef,
      updateTimeoutRef,
      (currentUpdateId: number) => {
        setStateToCurrentValueWithExternalChecking(
          idefRef.current,
          setState,
          optionsRef.current,
          isUnmountedRef,
          lastUpdateIdRef,
          currentUpdateId,
          changeListenerHook,
        );
      },
      include,
      state,
    );
  }, []);

  const deleteHook = useCallback((options: IActionDeleteOptions = {}) => {
    return del(
      idefRef.current,
      optionsRef.current,
      stateRef,
      setState,
      isUnmountedRef,
      blockIdCleanRef,
      tokenDataRef.current.token,
      localeDataRef.current.language,
      dataContext.remoteListener,
      options,
    );
  }, []);

  const cleanHook = useCallback((
    options: IActionCleanOptions,
    state: "success" | "fail",
    avoidTriggeringUpdate?: boolean,
  ) => {
    return cleanWithProps(
      idefRef.current,
      optionsRef.current,
      isUnmountedRef.current,
      blockIdCleanRef.current,
      options,
      state,
      setState,
      avoidTriggeringUpdate,
    );
  }, []);

  const submitHook = useCallback((options: IActionSubmitOptions) => {
    return submit(
      idefRef.current,
      optionsRef.current,
      stateRef,
      setState,
      activeSubmitPromiseRef,
      activeSearchPromiseAwaiterRef,
      submitBlockPromisesRef,
      isUnmountedRef,
      lastLoadValuePromiseRef,
      blockIdCleanRef,
      config,
      tokenDataRef.current.token,
      localeDataRef.current.language,
      dataContext.remoteListener,
      options,
    );
  }, []);

  const searchHook = useCallback((options: IActionSearchOptions) => {
    return search(
      idefRef.current,
      optionsRef.current,
      options,
      stateRef,
      setState,
      initialAutomaticNextSearchRef,
      reloadNextSearchRef,
      preventSearchFeedbackOnPossibleStaleDataRef,
      activeSearchPromiseAwaiterRef,
      activeSearchPromiseRef,
      activeSearchOptionsRef,
      activeSubmitPromiseAwaiterRef,
      internalSearchDestructionMarkersRef,
      isUnmountedRef,
      blockIdCleanRef,
      tokenDataRef.current.token,
      localeDataRef.current.language,
      dataContext.remoteListener,
      locationRef.current,
      onSearchReloadHook,
      changeSearchListenerHook,
    );
  }, []);

  const dismissLoadErrorHook = useCallback(() => {
    dismissLoadError(
      isUnmountedRef.current,
      setState,
    );
  }, []);
  const dismissDeleteErrorHook = useCallback(() => {
    dismissDeleteError(
      isUnmountedRef.current,
      setState,
    );
  }, []);
  const dismissSubmitErrorHook = useCallback(() => {
    dismissSubmitError(
      isUnmountedRef.current,
      setState,
    );
  }, []);
  const dismissSubmittedHook = useCallback(() => {
    dismissSubmitted(
      isUnmountedRef.current,
      setState,
    );
  }, []);
  const dismissDeletedHook = useCallback(() => {
    dismissDeleted(
      isUnmountedRef.current,
      setState,
    );
  }, []);
  const dismissSearchErrorHook = useCallback(() => {
    dismissSearchError(
      isUnmountedRef.current,
      setState,
    );
  }, []);

  const injectSubmitBlockPromiseHook = useCallback((p: Promise<any>) => {
    submitBlockPromisesRef.current.push(p);
  }, []);

  // LIFECYCLE

  // EMULATE OF CONSTRUCTOR
  const isConstruct = useRef(true);
  useEffect(() => {
    isConstruct.current = false;
  }, []);
  if (isConstruct.current) {
    // first we setup the listeners, this includes the on change listener that would make
    // the entire app respond to actions, otherwise the fields might as well be disabled
    // we do this here to avoid useless callback changes as the listeners are not ready
    installSetters(idef, options, isCMountedRef.current, searchHook, internalUUIDRef.current);
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
    onMount(idefRef.current, optionsRef.current, stateRef, setState, dataContext.remoteListener,
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
        setState,
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
      didUpdate(
        prevIdef,
        idefRef.current,
        prevOptions,
        prevState,
        optionsRef.current,
        prevTokenData,
        tokenDataRef.current,
        stateRef,
        setState,
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
        internalUUIDRef.current,
      );
    }
  }, [tokenData, idef, options, state]);

  // START COPY/PASTE AND MODIFYING TO ADAPT TO A HOOK
  // =============================================================================

  // CUSTOMS FOR THIS ALONE

  const getValueFor = useCallback((idOrBase: string | IPropertyBaseProps) => {
    const state = getStateFor(idOrBase);
    return state?.value;
  }, []) as <T>(pId: string | IPropertyBaseProps) => T;

  const getStateFor = useCallback((idOrBase: string | IPropertyBaseProps) => {
    if (idOrBase === null || typeof idOrBase === "undefined") {
      return null;
    } else if (typeof idOrBase === "string") {
      const state = stateRef.current.itemState.properties.find((p) => p.propertyId === idOrBase);
      if (!state) {
        if (process.env.NODE_ENV === "development" && !optionsRef.current.suppressWarnings) {
          console.warn(
            "Possibly unwanted behaviour, you attempted to read a property " +
            idOrBase +
            " but it has not been loaded on this context, if you wish to ignore this, use suppressWarnings={true}"
          );
        }
        return null;
      }
      return state;
    } else {
      let actualId = idOrBase.id;
      if (idOrBase.searchVariant) {
        // for that we just get the prefix and add it
        actualId =
          PropertyDefinitionSearchInterfacesPrefixes[idOrBase.searchVariant.toUpperCase().replace("-", "_")] + idOrBase.id;
      }

      const policyType = idOrBase.policyType;
      const policyName = idOrBase.policyName;

      const includeId = idOrBase.include;

      if ((policyType || policyName) && includeId) {
        console.error(
          "Unwanted behaviour you tried to read a policy type/name property with an include",
        );
        return null;
      }

      if ((policyType && !policyName) || (policyName && !policyType)) {
        console.error(
          "Unwanted behaviour you need to specify both policy type and policy name",
        );
        return null;
      }

      if (includeId) {
        const stateInclude = stateRef.current.itemState.includes.find((i) => i.includeId === includeId);

        if (!stateInclude) {
          if (process.env.NODE_ENV === "development" && !optionsRef.current.suppressWarnings) {
            console.warn(
              "Possibly unwanted behaviour, you attempted to read a property in an include " +
              includeId +
              " but it has not been loaded on this context, if you wish to ignore this, use suppressWarnings={true}"
            );
          }
          return null;
        } else {
          const state = stateInclude.itemState.properties.find((p) => p.propertyId === actualId);
          if (!state) {
            if (process.env.NODE_ENV === "development" && !optionsRef.current.suppressWarnings) {
              console.warn(
                "Possibly unwanted behaviour, you attempted to read a property " +
                idOrBase + " within the include " + includeId +
                " but it has not been loaded on this context, if you wish to ignore this, use suppressWarnings={true}"
              );
            }
            return null;
          }
          return state;
        }
      } else if (!policyType) {
        const state = stateRef.current.itemState.properties.find((p) => p.propertyId === actualId);
        if (!state) {
          if (process.env.NODE_ENV === "development" && !optionsRef.current.suppressWarnings) {
            console.warn(
              "Possibly unwanted behaviour, you attempted to read a property " +
              idOrBase +
              " but it has not been loaded on this context, if you wish to ignore this, use suppressWarnings={true}"
            );
          }
          return null;
        }
        return state;
      } else {
        const stateOfPolicy = stateRef.current.itemState.policies[policyType] as IPolicyStateType;
        const stateArray = stateOfPolicy && stateOfPolicy[policyName];
        const state = stateArray && stateArray.find((v) => v.propertyId === actualId);
        if (!state) {
          if (process.env.NODE_ENV === "development" && !optionsRef.current.suppressWarnings) {
            console.warn(
              "Possibly unwanted behaviour, you attempted to read a property " +
              idOrBase + " with policy type " + policyType + " and a type " + policyType +
              " but it has not been loaded on this context, if you wish to ignore this, use suppressWarnings={true}"
            );
          }
          return null;
        }

        return state;
      }
    }
  }, []) as <T>(pId: string | IPropertyBaseProps) => IPropertyDefinitionState<T>;

  // PRETENDING TO DO RENDER
  const useUnversioned = useCallback(() => {
    const newOptions: IItemProviderOptions = {
      ...options,
      forVersion: null,
    };

    const willLoadUnversioned = (
      options.forId &&
      options.forVersion &&
      state.notFound
    );

    if (!willLoadUnversioned) {
      newOptions.forId = null;
      newOptions.forVersion = "__UNVERSIONED__";
    };

    return useItemProvider(newOptions);
  }, [options, state.notFound]);

  const useAnalytics = useCallback((analyticsOptions: IItemAnalyticsProps = {
    enabled: true,
    offlineTimeTrackId: "item",
  }) => {
    const actualEnabled = analyticsOptions.enabled && state.loaded && !state.notFound && options.forId;

    const context = idef.getQualifiedPathName() + "." + options.forId + "." + (options.forVersion || "");

    useFunctionalHit({
      trackId: analyticsOptions.offlineHitTrackId,
      enabled: actualEnabled && !!analyticsOptions.offlineHitTrackId,
      context: context,
      dataGenerator: internalDataProviderForAnalyticsHook,
      weight: analyticsOptions.weight,
      trackOffline: true,
      trackAnonymous: analyticsOptions.trackAnonymous,
    });

    useFunctionalHit({
      trackId: analyticsOptions.onlineHitTrackId,
      enabled: actualEnabled && !!analyticsOptions.onlineHitTrackId,
      context: context,
      dataGenerator: internalDataProviderForAnalyticsHook,
      weight: analyticsOptions.weight,
      trackOffline: true,
      trackAnonymous: analyticsOptions.trackAnonymous,
    });

    useFunctionalTimetrack({
      trackId: analyticsOptions.offlineTimeTrackId,
      enabled: actualEnabled && !!analyticsOptions.offlineTimeTrackId,
      context: context,
      dataGenerator: internalDataProviderForAnalyticsHook,
      trackOffline: true,
      trackAnonymous: analyticsOptions.trackAnonymous,
    });

    useFunctionalTimetrack({
      trackId: analyticsOptions.onlineTimeTrackId,
      enabled: actualEnabled && !!analyticsOptions.onlineTimeTrackId,
      context: context,
      dataGenerator: internalDataProviderForAnalyticsHook,
      trackOffline: true,
      trackAnonymous: analyticsOptions.trackAnonymous,
    });
  }, [idef, state.loaded, state.notFound, options.forId]);

  const context: IItemContextType = useMemo(() => ({
    idef: idef,
    state: state.itemState,
    // typescript bugs
    onPropertyChange: onPropertyChangeHook as any,
    onPropertyRestore: onPropertyRestoreHook as any,
    onIncludeSetExclusionState: onIncludeSetExclusionStateHook,
    onPropertyEnforce: onPropertyEnforceHook as any,
    onPropertyClearEnforce: onPropertyClearEnforceHook as any,
    notFound: state.notFound,
    blocked: state.isBlocked,
    blockedButDataAccessible: state.isBlockedButDataIsAccessible,
    loadError: state.loadError,
    loading: state.loading,
    loaded: state.loaded,
    holdsRemoteState: !!state.itemState.rqOriginalFlattenedValue,
    submitError: state.submitError,
    submitting: state.submitting,
    submitted: state.submitted,
    deleteError: state.deleteError,
    deleting: state.deleting,
    deleted: state.deleted,
    searchError: state.searchError,
    searching: state.searching,
    searchRecords: state.searchRecords,
    searchResults: state.searchResults,
    searchLimit: state.searchLimit,
    searchCount: state.searchCount,
    searchOffset: state.searchOffset,
    searchId: state.searchId,
    searchWasRestored: state.searchWasRestored,
    searchOwner: state.searchOwner,
    searchLastModified: state.searchLastModified,
    searchShouldCache: state.searchShouldCache,
    searchFields: state.searchFields,
    searchRequestedProperties: state.searchRequestedProperties,
    searchRequestedIncludes: state.searchRequestedIncludes,
    searchEngineEnabled: state.searchEngineEnabled,
    searchEngineEnabledLang: state.searchEngineEnabledLang,
    searchEngineUsedFullHighlights: state.searchEngineUsedFullHighlights,
    searchEngineHighlightArgs: state.searchEngineHighlightArgs,
    searchHighlights: state.searchHighlights,
    searchMetadata: state.searchMetadata,
    highlights: options.highlights,
    pokedElements: state.pokedElements,
    submit: submitHook,
    reload: loadValueHook,
    delete: deleteHook,
    clean: cleanHook,
    search: searchHook,
    forId: options.forId || null,
    forVersion: options.forVersion || null,
    dismissLoadError: dismissLoadErrorHook,
    dismissSubmitError: dismissSubmitErrorHook,
    dismissSubmitted: dismissSubmittedHook,
    dismissDeleteError: dismissDeleteErrorHook,
    dismissDeleted: dismissDeletedHook,
    dismissSearchError: dismissSearchErrorHook,
    dismissSearchResults: dismissSearchResultsHook,
    poke: pokeHook,
    unpoke: unpokeHook,
    remoteListener: dataContext.remoteListener,
    injectSubmitBlockPromise: injectSubmitBlockPromiseHook,
    downloadState: downloadStateHook,
    downloadStateAt: downloadStateAtHook,
    loadStateFromFile: loadStateFromFileHook,
    loadStateFromFileAt: loadStateFromFileAtHook,
  }), [
    idef,
    state.itemState,
    state.notFound,
    state.isBlocked,
    state.isBlockedButDataIsAccessible,
    state.loadError,
    state.loading,
    state.loaded,
    !!state.itemState.rqOriginalFlattenedValue,
    state.submitError,
    state.submitting,
    state.submitted,
    state.deleteError,
    state.deleting,
    state.deleted,
    state.searchError,
    state.searching,
    state.searchRecords,
    state.searchResults,
    state.searchLimit,
    state.searchCount,
    state.searchOffset,
    state.searchId,
    state.searchWasRestored,
    state.searchOwner,
    state.searchLastModified,
    state.searchShouldCache,
    state.searchFields,
    state.searchRequestedProperties,
    state.searchRequestedIncludes,
    state.searchEngineEnabled,
    state.searchEngineEnabledLang,
    state.searchEngineUsedFullHighlights,
    state.searchEngineHighlightArgs,
    state.searchHighlights,
    state.searchMetadata,
    options.highlights,
    state.pokedElements,
    options.forId || null,
    options.forVersion || null,
  ]);

  const getEntryFor = useCallback((
    options: IPropertyEntryProps<IPropertyEntryRendererProps<PropertyDefinitionSupportedType>>,
  ) => {
    return (
      <ItemContext.Provider value={context}>
        <Entry {...options} />
      </ItemContext.Provider>
    );
  }, [context]);

  const getViewFor = useCallback((
    options: IPropertyViewProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>>,
  ) => {
    return (
      <ItemContext.Provider value={context}>
        <View {...options} />
      </ItemContext.Provider>
    );
  }, [context]);

  return {
    state,

    getValueForProperty: getValueFor,
    getStateForProperty: getStateFor,
    getEntryForProperty: getEntryFor,
    getViewForProperty: getViewFor,
    setValueForProperty: onPropertyChangeHook,
    enforceValueOnProperty: onPropertyEnforceHookForClient,
    restoreProperty: onPropertyRestoreHook,
    clearEnforcementOnProperty: onPropertyClearEnforceHookForClient,

    context,

    hooks: {
      useUnversioned,
      useAnalytics,
    }
  }
}